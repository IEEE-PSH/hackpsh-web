import { z } from "zod";

export const SupportUsFormSchema = z.object({
  user_support_administrative: z.boolean(),
  user_support_technical: z.boolean(),
});

export type TSupportUsForm = z.infer<typeof SupportUsFormSchema>;
