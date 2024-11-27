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

        //RECONSIDER THIS LINE
        // reformat output because piston api prints arrays with extra spacing
        const stdOutputs = data.run.stdout
          .replace("\n\n", "\n")
          .replace("\n\n", "\n")
          .replace("[ ", "[")
          .replace(" ]", "]")
          .split("\n");
        //tomfoolery goin on ere; not actually
        const outputLengths: number[] = [];
        for (const testCase of testCases) {
          const outputs = testCase.test_case_output.split("\n");
          outputLengths.push(outputs.length);
        }

        let stdOuts: string[] = [];
        for (const n of outputLengths) {
          const temp: string[] = [];
          for (let i = 0; i < n; i++) {
            temp.push(stdOutputs.shift()!);
          }
          stdOuts.push(
            temp.join("\n").replace(/\[\s+/g, "[").replace(/\s+\]/g, "]"), //remove piston spacing
          );
        }

        //convert cpp brace arrays to bracket arrays
        if (
          (input.language === "cpp" && headerType === "intArr") ||
          headerType === "stringArr" ||
          headerType === "doubleArr"
        ) {
          stdOuts = stdOuts.map((stdOut) => {
            return `[${stdOut.slice(1, -1).replace(/,/g, ",")}]`;
          });
        }

        const maxOutputs = Math.max(expectedOutputs.length, stdOuts.length);
        let passCount = 0;
        for (let i = 0; i < maxOutputs; i++)
          if (expectedOutputs[i] === stdOuts[i]) passCount++;

        if (data.run.code === 0 && passCount === expectedOutputs.length) {
          //only solveChallenge if challenges are disabled; officers and admins can still check test cases
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
            output: `Passed ${passCount}/${expectedOutputs.length} testcase${testCases.length !== 1 ? "s" : ""}. ✔️`,
          };
        } else {
          return {
            type: "error",
            output: `Passed ${passCount}/${expectedOutputs.length} testcase${testCases.length !== 1 ? "s" : ""}. ❌`,
          };
        }
      } else {
        return {
          type: "error",
          output: "Did you even test your code? 🤡",
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
