import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { spawn } from "child_process";
import { z } from "zod";

const testCodeSchema = z.object({
  codeString: z.string(),
});

const testCodeProcedure = publicProcedure
  .input(testCodeSchema)
  .query(async ({ input }) => {
    let result = {};
    // const testcases = ["John", "Bob"];
    // const testcasesJSONString = JSON.stringify(testcases);

    const boilerPlate = `\nprint(GetResult(1,2))`;
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn("python", [
        "-u",
        "-c",
        input.codeString + boilerPlate,
        // testcasesJSONString,
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

export const challengesRouter = createTRPCRouter({
  test_code: testCodeProcedure,
});
