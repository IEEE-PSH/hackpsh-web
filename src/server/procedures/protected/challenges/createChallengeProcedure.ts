import { createChallenge } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import { createChallengeSchema } from "@/server/zod-schemas/challenges";

export default protectedProcedure
  .input(createChallengeSchema)
  .query(async ({ ctx, input }) => {
      await createChallenge(ctx.db, input.user_uuid, input.title, input.difficulty, input.description, input.function_header, input.example_input, input.example_output, input.explanation, input.testcase_input_1, input.testcase_output_1, input.testcase_input_2, input.testcase_output_2)

      return {
        create_challenge:true
      }
    });
