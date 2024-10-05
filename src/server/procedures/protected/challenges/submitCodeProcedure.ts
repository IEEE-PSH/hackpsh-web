/* eslint-disable prefer-const */
import {
  getChallenge,
  getTestCases,
  solveChallenge,
} from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import { submitCodeSchema } from "@/server/zod-schemas/challenges";
import { spawn } from "child_process";

export const languages = ["python", "cpp", "javascript"] as const;
export type TLanguages = (typeof languages)[number];

//format header to execute properly; same header for all used languages
function formatHeader(header: string) {
  const match = header.match(/^\s*def\s+(\w+)\s*\((.*)\)\s*$/);
  const functionName = match![1];
  const params = match![2];

  const replacedParams = params!
    .split(",")
    .map(() => ".")
    .join(", ");

  return `${functionName}(${replacedParams})`;
}

export default protectedProcedure
  .input(submitCodeSchema)
  .query(async ({ ctx, input }) => {
    //get header to execute
    const challengeData = await getChallenge(ctx.db, input.challenge_id);
    const exampleInputs = challengeData?.challenge_example_input;
    const testCases = await getTestCases(ctx.db, challengeData!.challenge_uuid);

    let tempHeader = formatHeader(input.challenge_header);
    let headerToExecute = "";
    for (const exampleInput of exampleInputs!.split("\n")) {
      if (input.language == "cpp") {
        let newExampleInput = exampleInput;

        //change python/javascript array to cpp array
        const regex = /^\[\s*(-?\d+(\s*,\s*-?\d+)*)?\s*\]$/;
        if (regex.test(exampleInput)) {
          const temp = exampleInput.slice(1, -1).split(",");
          newExampleInput = `{${temp.join(", ")}}`;
        }
        tempHeader = tempHeader.replace("p", newExampleInput);
      } else {
        tempHeader = tempHeader.replace("p", exampleInput);
      }
      headerToExecute = tempHeader;
    }

    let headers = [];
    let outputs = [];
    for (const testCase of testCases) {
      let inputs = testCase.test_case_input.split("\n");
      outputs.push(testCase.test_case_output);
      let tempHeader = headerToExecute;
      for (const input of inputs) {
        tempHeader = tempHeader.replace(".", input);
      }
      headers.push(`print(${tempHeader})`);
    }

    let headersToExecute = headers.join("\n");

    //only supports python for now
    const boilerPlate = `\n${headersToExecute}`;

    return new Promise((resolve, reject) => {
      const pythonProcess = spawn("python", [
        "-u",
        "-c",
        input.code_string + boilerPlate,
      ]);

      let stdData = "";
      pythonProcess.stdout.on("data", (data: Buffer) => {
        stdData = data.toString().trim();
      });

      pythonProcess.stderr.on("data", (data: Buffer) => {
        stdData = data.toString().trim();
      });

      pythonProcess.on("close", (code) => {
        const stdOutputs = stdData.split("\r\n");
        let count = 0;
        for (let i = 0; i < outputs.length; i++) {
          if (outputs[i] == stdOutputs[i]) count++;
        }

        let output;
        if (count == outputs.length) {
          output = `Passed ${count}/${outputs.length} hidden test cases. ✔️`;
          void solveChallenge(ctx.db, input.challenge_id, input.user_uuid);
          resolve({
            type: "success",
            output: output,
          });
        } else
          output = `Passed ${count}/${outputs.length} hidden test cases. ❌`;
        resolve({
          type: "error",
          output: output,
        });
      });
    });
  });
