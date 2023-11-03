import { z } from "zod";

const UserClassYear = z.union([
  z.literal("middle_school"),
  z.literal("high_school"),
  z.literal("freshman"),
  z.literal("sophmore"),
  z.literal("junior"),
  z.literal("senior"),
  z.literal("graduate"),
  z.literal("post_graduate"),
]);

export type TUserClassYear = z.infer<typeof UserClassYear>;

const UserMajor = z.union([
  z.literal("a_major"),
  z.literal("another_major"),
]);

export type TUserMajor = z.infer<typeof UserMajor>;

export const PersonalDetailsFormSchema = z.object({
  user_display_name: z
    .string()
    .min(5, { message: "Display Name must be 5 or more characters long." })
    .max(30, {
      message: "Display Name must be fewer than 30 characters long.",
    }),
  user_class_year: UserClassYear,
  user_major: UserMajor,
});

export type TPersonalDetailsForm = z.infer<typeof PersonalDetailsFormSchema>;