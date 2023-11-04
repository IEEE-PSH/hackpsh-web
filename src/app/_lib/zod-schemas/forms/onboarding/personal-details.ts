import { dbMajors, dbSchoolYear } from "@/db/drizzle/startup_seed";
import { z } from "zod";

export const PersonalDetailsFormSchema = z.object({
  user_display_name: z
    .string()
    .min(5, { message: "Display Name must be 5 or more characters long." })
    .max(30, {
      message: "Display Name must be fewer than 30 characters long.",
    }),
  user_school_year: z.enum(dbSchoolYear),
  user_major: z.enum(dbMajors),
});

export type TPersonalDetailsForm = z.infer<typeof PersonalDetailsFormSchema>;
