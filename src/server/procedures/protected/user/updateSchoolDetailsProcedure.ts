import { updateUserSchoolDetails } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";
import { UpdateSchoolDetailsSchema } from "@/server/zod-schemas/user";

export default protectedProcedure
  .input(UpdateSchoolDetailsSchema)
  .mutation(async ({ ctx, input }) => {
    await updateUserSchoolDetails(
      ctx.db,
      input.user_uuid,
      input.user_school_year,
      input.user_major,
    );

    return {
      update_user_school_details: true,
    };
  });
