import { z } from "zod";

export const PersonalDetailsFormSchema = z.object({
  user_first_name: z.string().min(1, { message: "Cannot leave field empty." }),
  user_last_name: z.string().min(1, { message: "Cannot leave field empty." }),
  user_display_name: z
    .string()
    .min(5, { message: "Display Name must be 5 or more characters long." })
    .max(30, {
      message: "Display Name must be fewer than 30 characters long.",
    }),
});

export type TPersonalDetailsForm = z.infer<typeof PersonalDetailsFormSchema>;
