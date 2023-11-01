import { CreateUserSchema } from "@/server/zod-schemas/user";
import { createUser } from "@/server/dao/user";
import { protectedProcedure } from "@/server/trpc";

export default protectedProcedure
  .input(CreateUserSchema)
  .mutation(async ({ ctx, input }) => {
    await createUser(ctx.db, input.user_uuid, input.user_email_address);

    return {
      create_user: true,
    };
  });
