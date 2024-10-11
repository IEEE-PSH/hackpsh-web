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
} from "./runCodeProcedure";
import { TRPCError } from "@trpc/server";
import { getParamTypes } from "@/app/_lib/zod-schemas/forms/challenges";

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
    const functionsToExecute = [];
    const paramTypes = getParamTypes(challengeData!.challenge_function_header);
    const headerType = challengeData!.challenge_function_header.split(" ")[0];

    for (const testCase of testCases) {
      const func = fillFunctionCall(
        tempHeader,
        input.language,
        testCase.test_case_input,
        paramTypes,
      );
      if (headerType === "void") {
        functionsToExecute.push(`${func}`);
      } else functionsToExecute.push(`print(${func})`);
    }
    const boilerPlate = "\n" + functionsToExecute.join("\n");

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: "python",
          version: "3.10.0",
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

        const stdOutputs = data.run.stdout.split("\n");

        //tomfoolery goin on ere; not actually
        const outputLengths: number[] = [];
        for (const testCase of testCases) {
          const outputs = testCase.test_case_output.split("\n");
          outputLengths.push(outputs.length);
        }

        const stdOuts: string[] = [];
        for (const n of outputLengths) {
          const temp: string[] = [];
          for (let i = 0; i < n; i++) {
            temp.push(stdOutputs.shift()!);
          }
          stdOuts.push(temp.join("\n"));
        }
        console.log(stdOuts);
        console.log(expectedOutputs);

        let passCount = 0;
        for (let i = 0; i < expectedOutputs.length; i++)
          if (expectedOutputs[i] === stdOuts[i]) passCount++;

        if (data.run.code === 0 && passCount === expectedOutputs.length) {
          await solveChallenge(ctx.db, input.challenge_id, input.user_uuid);
          return {
            type: "success",
            output: `Passed ${passCount}/${expectedOutputs.length} hidden testcases. ✔️`,
          };
        } else {
          return {
            type: "error",
            output: `Passed ${passCount}/${expectedOutputs.length} hidden testcases. ❌`,
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
        message: "The executor has encountered some issues.",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  });
