import { dbMajors, dbRole, dbSchoolYear } from "@/db/drizzle/startup_seed";
import { z } from "zod";

export const AccountSettingsFormSchema = z.object({
  user_first_name: z.string().min(1, { message: "Cannot leave field empty." }),
  user_last_name: z.string().min(1, { message: "Cannot leave field empty." }),
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
  user_role: z.enum(dbRole),
});

export type TAccountSettingsForm = z.infer<typeof AccountSettingsFormSchema>;

export const UpdateUserRoleFormSchema = z.object({
  user_role: z.enum(dbRole),
});

export type TUpdateUserRoleFormSchema = z.infer<
  typeof UpdateUserRoleFormSchema
>;
