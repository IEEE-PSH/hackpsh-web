import { updateChallenge } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import { updateChallengeSchema } from "@/server/zod-schemas/challenges";
import { formatInputs, formatOutputs } from "./createChallengeProcedure";

export default protectedProcedure
  .input(updateChallengeSchema)
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

    await updateChallenge(
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
      input.challenge_id,
    );
    return {
      create_challenge: true,
    };
  });
