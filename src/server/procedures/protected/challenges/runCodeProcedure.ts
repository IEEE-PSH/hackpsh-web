/* eslint-disable prefer-const */
import { getChallenge } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import { testCodeSchema } from "@/server/zod-schemas/challenges";
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
        tempHeader = tempHeader.replace(".", newExampleInput);
      } else {
        tempHeader = tempHeader.replace(".", exampleInput);
      }
      headerToExecute = tempHeader;
    }

    //only supports python for now
    const boilerPlate = `\nprint(${headerToExecute})`;

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
        if (code === 0) {
          resolve({
            type: "valid",
            output: stdData,
          });
        } else {
          resolve({
            type: "error",
            output: stdData,
          });
        }
      });

      pythonProcess.on("error", (err) => {
        reject({
          type: "system_error",
          output: `Failed to run Python process: ${err.message}`,
        });
      });
    });
  });
