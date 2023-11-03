import { LookupUserSchema } from "@/server/zod-schemas/user";
import { doesUserExist } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure
  .input(LookupUserSchema)
  .query(async ({ ctx, input }) => {
    let userExists = false;
    const result = await doesUserExist(ctx.db, input.user_uuid);

    if (result?.user_uuid) {
      userExists = true;
    }

    return {
      does_user_exist: userExists,
    };
  });
