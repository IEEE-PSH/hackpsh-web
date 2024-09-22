import { dbMajors, dbSchoolYear } from "@/db/drizzle/startup_seed";
import { z } from "zod";

export const SettingsFormSchema = z.object({
  user_display_name: z
    .string()
    .min(5, { message: "Display Name must be 5 or more characters long." })
    .max(30, {
      message: "Display Name must be fewer than 30 characters long.",
    }),
  user_school_year: z.enum(dbSchoolYear),
  user_major: z.enum(dbMajors),
  user_support_administrative: z.boolean(),
  user_support_technical: z.boolean(),
});

export type TSettingsForm = z.infer<typeof SettingsFormSchema>;