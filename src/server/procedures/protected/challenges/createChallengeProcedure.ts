import { getParamTypes } from "@/app/_lib/zod-schemas/forms/challenges";
import { createChallenge } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import { createChallengeSchema } from "@/server/zod-schemas/challenges";

function formatInputs(input: string, types: string[]): string {
  let newInput = "";

  const inputsArray = input.split("\n");
  for (let i = 0; i < inputsArray.length; i++) {
    const currentInput = inputsArray[i];
    const type = types[i];
    //format arrays with proper spacing
    if (
      type === "stringArr" ||
      type === "intArr" ||
      type === "charArr" ||
      type === "doubleArr"
    ) {
      const trimmedInput = currentInput!.replace(/\[\s*/, "[").replace(/\s*\]/, "]");
      newInput += trimmedInput.replace(/,\s*/g, ", ").replace(/\s*,/g, ",") + "\n";
    } else {
      newInput += currentInput?.trim() + "\n";
    }
  }
  
  return newInput.trim();
}

//void functions not yet considered
function formatOutput(output:string, header:string):string{
  const regex = /^\s*(\w+|\w+\[\])\s+\w+\s*\(/;
  const match = header.match(regex);

  // this is return type
  const type = match![1]!.trim();
  if (type === "void") return output;
  // convert array
  if (
    type === "stringArr" ||
    type === "intArr" ||
    type === "charArr" ||
    type === "doubleArr"
  ) {
    const newOutput = output.replace(/\[\s*/, "[").replace(/\s*\]/, "]");
    return newOutput.replace(/,\s*/g, ", ").replace(/\s*,/g, ",") + "\n";
    // check numbers
  } else if (type === "int" || type === "double") {
    if (isNaN(Number(output))) return output;
    // check strings
  } else if (type === "boolean" && (output === "true" || output === "false"))
    return output;
  return output;
}

export default protectedProcedure
  .input(createChallengeSchema)
  .mutation(async ({ ctx, input }) => {
    const paramTypes:string[] = getParamTypes(input.function_header)
    const newInput = formatInputs(input.example_input, paramTypes)
    const newOutput = formatOutput(input.example_output, input.function_header)

    await createChallenge(
      ctx.db,
      input.user_uuid,
      input.title,
      input.difficulty,
      input.points,
      input.description,
      input.function_header,
      newInput,
      newOutput,
      input.explanation,
      input.test_cases,
    );

    return {
      create_challenge: true,
    };
  });
