import { z } from "zod";

export const CreateUserSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  user_email_address: z.string().email("Please provide a valid email address."),
});

export const LookupUserSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
});
