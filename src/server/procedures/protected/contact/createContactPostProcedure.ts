import { createContactPost } from "@/server/dao/contact";
import { publicProcedure } from "@/server/trpc";
import { CreateContactPostSchema } from "@/server/zod-schemas/contact";

export default publicProcedure
  .input(CreateContactPostSchema)
  .mutation(async ({ ctx, input }) => {
    await createContactPost(
      ctx.db,
      input.first_name,
      input.last_name,
      input.email,
      input.content,
    );

    return {
      create_contact_post: true,
    };
  });
