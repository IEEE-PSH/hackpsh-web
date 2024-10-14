import { getParamTypes } from "@/app/_lib/zod-schemas/forms/challenges";
import { createChallenge } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import { createChallengeSchema } from "@/server/zod-schemas/challenges";

export function formatInputs(input: string, types: string[]): string {
  let newInput = "";

  const inputsArray = input.split("\n");
  for (let i = 0; i < inputsArray.length; i++) {
    const currentInput = inputsArray[i]?.trim();
    const type = types[i];
    //format arrays with proper spacing
    if (
      type === "stringArr" ||
      type === "intArr" ||
      type === "charArr" ||
      type === "doubleArr"
    ) {
      const trimmedInput = currentInput!
        .replace(/\[\s*/, "[")
        .replace(/\s*\]/, "]");
      newInput +=
        trimmedInput.replace(/,\s*/g, ", ").replace(/\s*,/g, ",") + "\n";
    } else {
      newInput += currentInput?.trim() + "\n";
    }
  }

  return newInput.trim();
}

export function formatOutputs(output: string, header: string): string {
  const regex = /^\s*(\w+|\w+\[\])\s+\w+\s*\(/;
  const match = header.match(regex);

  // this is return type
  const type = match![1]!.trim();

  let newOutput = output;
  // convert arrays
  if (
    type === "stringArr" ||
    type === "intArr" ||
    type === "charArr" ||
    type === "doubleArr"
  ) {
    newOutput =
      output
        .replace(/\[\s*/, "[")
        .replace(/\s*\]/, "]")
        .replace(/,\s*/g, ", ")
        .replace(/\s*,/g, ",") + "\n";
  }
  return newOutput.trim();
}

export default protectedProcedure
  .input(createChallengeSchema)
  .mutation(async ({ ctx, input }) => {
    const paramTypes: string[] = getParamTypes(input.function_header);
    const newInputs = formatInputs(input.example_input, paramTypes);
    const newOutputs = formatOutputs(
      input.example_output,
      input.function_header,
    );
    const newTestcases = [];
    for (const testCase of input.test_cases) {
      newTestcases.push({
        input: testCase.input,
        output: formatOutputs(testCase.output, input.function_header),
      });
    }

    await createChallenge(
      ctx.db,
      input.user_uuid,
      input.title,
      input.difficulty,
      input.points,
      input.description,
      input.function_header,
      newInputs,
      newOutputs,
      input.explanation,
      newTestcases,
    );
    return {
      create_challenge: true,
    };
  });
