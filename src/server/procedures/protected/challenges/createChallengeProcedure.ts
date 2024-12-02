import { createChallenge } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import { createChallengeSchema } from "@/server/zod-schemas/challenges";

// remove unnecessary spaces unless it is part of a string
export function formatLiteral(input: string): string {
  input = input.trim();
  const isArrayOrDict =
    (input.startsWith("[") && input.endsWith("]")) ||
    (input.startsWith("{") && input.endsWith("}"));
  if (isArrayOrDict) {
    return input.replace(/'[^']*'|(\s+)/g, (match, group1) => {
      if (match.startsWith("'") && match.endsWith("'")) {
        return match;
      }
      return group1 ? "" : match;
    });
  }
  return input;
}

export function formatInputs(input: string): string {
  return input.split("\n").map(formatLiteral).join("\n");
}

export function formatOutputs(output: string): string {
  return formatLiteral(output).trim();
}

export default protectedProcedure
  .input(createChallengeSchema)
  .mutation(async ({ ctx, input }) => {
    const newInputs = formatInputs(input.example_input);
    const newOutputs = formatOutputs(input.example_output);
    const newTestcases = [];
    for (const testCase of input.test_cases) {
      newTestcases.push({
        input: formatInputs(testCase.input),
        output: formatOutputs(testCase.output),
      });
    }

    await createChallenge(
      ctx.db,
      input.user_uuid,
      input.title,
      input.difficulty,
      input.points,
      input.description,
      input.languages,
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
