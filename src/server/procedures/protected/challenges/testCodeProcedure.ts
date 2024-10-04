/* eslint-disable prefer-const */
import { getChallenge } from "@/server/dao/challenges";
import { publicProcedure } from "@/server/trpc";
import { testCodeSchema } from "@/server/zod-schemas/challenges";
import { spawn } from "child_process";

export const languages = ["python", "cpp", "javascript"] as const;
export type TLanguages = (typeof languages)[number];

//python header
function formatHeader(header: string) {
  const match = header.match(/^\s*def\s+(\w+)\s*\((.*)\)\s*$/);
  const functionName = match![1];
  const params = match![2];

  const replacedParams = params!
    .split(",")
    .map(() => "p")
    .join(", ");

  return `${functionName}(${replacedParams})`;
}

// const testCases: TestCases = await getTestCases(
//   ctx.db,
//   challengeData!.challenge_uuid,
// );
// let headersToExecute = [];
// if (input.language == "python") {
//   const formattedHeader = formatPythonHeader(input.challenge_header);
//   for (const testCase of testCases) {
//     const inputs = testCase.test_case_input.split("\n");
//     let tempHeader = formattedHeader;
//     for (const input of inputs) tempHeader = tempHeader.replace("p", input);
//     headersToExecute.push(tempHeader);
//   }
//   console.log(headersToExecute);
// }

export const testCodeProcedure = publicProcedure
  .input(testCodeSchema)
  .query(async ({ ctx, input }) => {
    //get header to execute
    const challengeData = await getChallenge(ctx.db, input.challenge_id);
    const exampleInputs = challengeData?.challenge_example_input;

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
    console.log(headerToExecute);

    let result = {};

    //only supports python for now
    const boilerPlate = `\nprint(${headerToExecute})`;
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn("python", [
        "-u",
        "-c",
        input.code_string + boilerPlate,
      ]);

      pythonProcess.stdout.on("data", (data: Buffer) => {
        result = {
          type: "valid",
          output: data.toString().trim(),
        };
      });

      pythonProcess.stderr.on("data", (data: Buffer) => {
        result = {
          type: "error",
          output: data.toString().trim(),
        };
      });

      // resolve Promise with result
      pythonProcess.on("close", (code) => {
        resolve(result);
        // if (code === 0) {
        //   resolve(result);
        // } else {
        //   reject(new Error(`Python process exited with code ${code}`));
        // }
      });
    });
  });
