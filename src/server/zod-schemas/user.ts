import { dbMajors, dbSchoolYear } from "@/db/drizzle/startup_seed";
import { z } from "zod";

export const CreateUserSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  user_email_address: z.string().email("Please provide a valid email address."),
});

export const LookupUserSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
});

export const UpdateUserPersonalDetailsSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  user_display_name: z
    .string()
    .min(5, { message: "Display Name must be 5 or more characters long." })
    .max(30, {
      message: "Display Name must be fewer than 30 characters long.",
    }),
  user_school_year: z.enum(dbSchoolYear),
  user_major: z.enum(dbMajors),
});
