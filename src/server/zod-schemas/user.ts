import {
  dbMajors,
  dbOnboardingPhases,
  dbSchoolYear,
  dbRole,
} from "@/db/drizzle/startup_seed";
import { z } from "zod";

export const CreateUserSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  user_email_address: z.string().email("Please provide a valid email address."),
});

export const LookupUserSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
});

export const LookupUsersFromRoleSchema = z.object({
  role: z.enum(dbRole),
});

export const UpdateUserRoleSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  target_uuid: z.string().uuid("Please provide a valid UUID."),
  target_role: z.enum(dbRole),
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

export const UpdateUserSupportSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  user_support_administrative: z.boolean(),
  user_support_technical: z.boolean(),
});

export const UpdateUserSettingsSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
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

export const DeleteUserSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  target_uuid: z.string().uuid("Please provide a valid UUID."),
});

export const ValidUserProfileAfterOnboardingSchema = z.object({
  user_display_name: z.string(),
  user_team_uuid: z.string().uuid(),
  user_school_year: z.enum(dbSchoolYear),
  user_major: z.enum(dbMajors),
  user_support_administrative: z.boolean(),
  user_support_technical: z.boolean(),
});

export const UpdateUserOnboardingPhaseSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  user_onboarding_phase: z.enum(dbOnboardingPhases),
});

export const UpdateUserOnboardingStatusSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  user_onboarding_complete: z.boolean(),
});
