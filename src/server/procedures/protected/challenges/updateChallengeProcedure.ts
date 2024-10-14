import { getParamTypes } from "@/app/_lib/zod-schemas/forms/challenges";
import { updateChallenge } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import { updateChallengeSchema } from "@/server/zod-schemas/challenges";
import { formatInputs, formatOutputs } from "./createChallengeProcedure";

export default protectedProcedure
  .input(updateChallengeSchema)
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

    await updateChallenge(
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
      input.challenge_id,
    );
    return {
      create_challenge: true,
    };
  });
