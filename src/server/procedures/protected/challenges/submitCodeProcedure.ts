import {
  getChallenge,
  getTestCases,
  solveChallenge,
} from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import { submitCodeSchema } from "@/server/zod-schemas/challenges";
import {
  type ExecutionResponse,
  fillFunctionCall,
  formatFunctionCall,
  languagePreset,
} from "./runCodeProcedure";
import { TRPCError } from "@trpc/server";
import { getParamTypes } from "@/app/_lib/zod-schemas/forms/challenges";
import { isChallengesEnabled } from "@/server/dao/event";
import { formatLiteral } from "./createChallengeProcedure";

export default protectedProcedure
  .input(submitCodeSchema)
  .query(async ({ ctx, input }) => {
    const challengeData = await getChallenge(ctx.db, input.challenge_id);
    const testCases = await getTestCases(ctx.db, challengeData!.challenge_uuid);
    const exampleTestCase = {
      test_case_input: challengeData!.challenge_example_input,
      test_case_output: challengeData!.challenge_example_output,
    };
    testCases.push(exampleTestCase);

    const tempHeader = formatFunctionCall(
      challengeData!.challenge_function_header,
    );
    const funcsToExecute = [];
    const paramTypes = getParamTypes(challengeData!.challenge_function_header);
    const headerType = challengeData!.challenge_function_header.split(" ")[0];

    for (const testCase of testCases) {
      const funcToExecute = fillFunctionCall(
        tempHeader,
        input.language,
        testCase.test_case_input,
        paramTypes,
      );
      if (headerType === "void") {
        if (input.language === "cpp") {
          funcsToExecute.push(`${funcToExecute}; cout<<endl;`);
        } else {
          funcsToExecute.push(`${funcToExecute}`);
        }
      } else {
        if (input.language === "python") {
          funcsToExecute.push(`print(${funcToExecute})`);
        } else if (input.language === "cpp") {
          funcsToExecute.push(`cout<<${funcToExecute}<<endl;`);
        } else {
          funcsToExecute.push(`console.log(${funcToExecute})`);
        }
      }
    }
    const funcsToExecuteString = funcsToExecute.join("\n");
    let boilerPlate = "\n" + funcsToExecuteString;
    if (input.language === "cpp") {
      if (
        headerType === "intArr" ||
        headerType === "stringArr" ||
        headerType === "doubleArr"
      ) {
        boilerPlate = `template<typename T>ostream& operator<<(ostream& os, const vector<T>& vec) {os << "{";for (size_t i = 0;i < vec.size(); ++i) {os << vec[i]; if (i != vec.size() - 1) os << ", ";}os << "}";return os;}int main() {${funcsToExecuteString};return 0;}`;
      } else boilerPlate = `int main(){${funcsToExecuteString}}`;
    }

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: languagePreset[input.language]!.language,
          version: languagePreset[input.language]!.version,
          files: [
            {
              content: input.code_string + boilerPlate,
            },
          ],
        }),
      });

      const data = (await response.json()) as ExecutionResponse;
      if (data.run.code == 0) {
        const expectedOutputs = [];
        for (const testCase of testCases) {
          const out = testCase.test_case_output;
          expectedOutputs.push(out);
        }

        // reformat output because piston api prints arrays with extra spacing
        // const stdOutputs = data.run.stdout.split("\n");

        //QUICK FIX: piston api returns arrays with new lines if too long; consider refactoring this
        let stdOutputs: string[] = [];
        if (input.language === "cpp") stdOutputs = data.run.stdout.split("\n");
        else
          stdOutputs = data.run.stdout
            .replace(/[\[\{]\s*([\s\S]*?)\s*[\]\}]/g, (match, content) => {
              return (
                match[0]! +
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                content.replace(/\n/g, " ").trim() +
                match[match.length - 1]
              );
            })
            .split("\n");

        const outputLengths: number[] = [];
        for (const testCase of testCases) {
          const outputs = testCase.test_case_output.split("\n");
          outputLengths.push(outputs.length);
        }

        let stdOuts: string[] = [];
        for (const n of outputLengths) {
          const temp: string[] = [];
          for (let i = 0; i < n; i++) {
            temp.push(formatLiteral(stdOutputs.shift()!));
          }
          stdOuts.push(temp.join("\n"));
        }

        //convert language stdouts to match test case inputs/outputs
        if (input.language === "cpp") {
          if (headerType === "intArr" || headerType === "doubleArr")
            stdOuts = stdOuts.map((stdOut) => {
              return `[${stdOut.slice(1, -1).replace(/,/g, ",")}]`;
            });
          else if (headerType === "stringArr") {
            stdOuts = stdOuts.map((stdOut) => {
              return `[${stdOut
                .slice(1, -1)
                .split(",")
                .map((item) => `'${item}'`)
                .join(",")}]`;
            });
          } else if (headerType === "boolean")
            stdOuts = stdOuts.map((stdOut) => {
              return String(stdOut === "1");
            });
        } else if (input.language === "python") {
          if (headerType === "boolean") {
            stdOuts = stdOuts.map((stdOut) => {
              return stdOut.toLowerCase();
            });
          }
        }

        const maxOutputs = Math.max(expectedOutputs.length, stdOuts.length);
        let passCount = 0;
        for (let i = 0; i < maxOutputs; i++)
          if (expectedOutputs[i] === stdOuts[i]) passCount++;

        if (passCount === expectedOutputs.length) {
          //only solveChallenge if challenges are enabled; officers and admins can still check test cases
          const is_challenges_enabled = await isChallengesEnabled(ctx.db);
          if (is_challenges_enabled) {
            await solveChallenge(
              ctx.db,
              input.challenge_id,
              input.user_uuid,
              input.code_string,
              input.language,
            );
          }

          return {
            type: "success",
            output: `Passed ${passCount}/${expectedOutputs.length} testcases. ✔️`,
          };
        } else {
          return {
            type: "error",
            output: `Passed ${passCount}/${expectedOutputs.length} testcases. ❌`,
          };
        }
      } else {
        return {
          type: "error",
          output: "Code failed to compile. 😔",
        };
      }
    } catch (error) {
      throw new TRPCError({
        message: "The database has encountered some issues.",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  });

export type TSubmitData = {
  type: "valid" | "success" | "error";
  output: string;
};
