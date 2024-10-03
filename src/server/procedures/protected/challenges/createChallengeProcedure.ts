import { createChallenge } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import { createChallengeSchema } from "@/server/zod-schemas/challenges";

export default protectedProcedure
  .input(createChallengeSchema)
  .mutation(async ({ ctx, input }) => {
    await createChallenge(
      ctx.db,
      input.user_uuid,
      input.title,
      input.difficulty,
      input.description,
      input.function_header,
      input.example_input,
      input.example_output,
      input.explanation,
      input.test_cases,
    );

    return {
      create_challenge: true,
    };
  });
