import getParamTypes from "@/app/_lib/zod-schemas/forms/challenges";
import { getChallenge } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import {
  runCodeSchema,
  type TLanguages,
} from "@/server/zod-schemas/challenges";
import { TRPCError } from "@trpc/server";

export type TSubmitData = {
  type: "valid" | "success" | "error";
  output: string;
};

// FORMAT
export function formatFunctionCall(header: string) {
  const match = header.match(/^\s*(\w+)\s+(\w+)\s*\((.*)\)\s*$/);
  const functionName = match![2];
  const params = match![3];

  const replacedParams = params!
    .split(",")
    .map(() => ".")
    .join(", ");

  return `${functionName}(${replacedParams})`;
}

// FILL
// addSum(a, n)
export function fillFunctionCall(
  header: string,
  language: TLanguages,
  exampleInputs: string,
  paramTypes: string[],
) {
  const inputs = exampleInputs.split("\n");
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i]!;
    if (language == "cpp") {
      let newInput = input;

      //change python/javascript array to cpp array
      const regex = /^\[\s*(-?\d+(\s*,\s*-?\d+)*)?\s*\]$/;
      if (regex.test(input)) {
        const temp = input.slice(1, -1).split(",");
        newInput = `{${temp.join(", ")}}`;
      }
      header = header.replace(".", newInput);
    } else {
      header = header.replace(".", formatInput(input, paramTypes[i]!));
    }
  }

  return header;
}

export function formatInput(input: string, type: string): string {
  if (type === "string") {
    return `"${input}"`;
  }
  return input;
}

export default protectedProcedure
  .input(runCodeSchema)
  .query(async ({ ctx, input }) => {
    const challengeData = await getChallenge(ctx.db, input.challenge_id);
    const exampleInputs = challengeData?.challenge_example_input;
    const headerType = challengeData!.challenge_function_header.split(" ")[0];
    const tempHeader = formatFunctionCall(
      challengeData!.challenge_function_header,
    );

    const paramTypes = getParamTypes(challengeData!.challenge_function_header);
    const headerToExecute = fillFunctionCall(
      tempHeader,
      input.language,
      exampleInputs!,
      paramTypes as string[],
    );

    let boilerPlate = `\nprint(${headerToExecute})`;
    if (headerType === "void") {
      boilerPlate = `\n${headerToExecute}`;
    }

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
      if (data.run.code == 0)
        return {
          type: "valid",
          output: data.run.stdout,
        };
      else
        return {
          type: "error",
          output: data.run.stderr,
        };
    } catch (error) {
      throw new TRPCError({
        message: "The executor has encountered some issues.",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  });

export type ExecutionResponse = {
  language: string;
  version: string;
  run: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
};
