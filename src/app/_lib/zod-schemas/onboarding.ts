import { z } from "zod"

// Form Schema
export const OnboardingFormSchema = z.object({
  user_display_name: z.string()
                .min(5, { message: "Display Name must be 5 or more characters long." })
                .max(30, { message: "Display Name must be fewer than 30 characters long."}),
  user_class_year: z.union([
    z.literal("middle_school"),
    z.literal("high_school"),
    z.literal("freshman"),
    z.literal("sophmore"),
    z.literal("junior"),
    z.literal("senior"),
    z.literal("graduate"),
    z.literal("post_graduate"),
  ])
});

export type TOnboardingForm = z.infer<typeof OnboardingFormSchema>;