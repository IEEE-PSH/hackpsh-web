import createContactPostProcedure from "../procedures/protected/contact/createContactPostProcedure";
import { createTRPCRouter } from "../trpc";

export const contactRouter = createTRPCRouter({
  create_contact_post: createContactPostProcedure,
});
