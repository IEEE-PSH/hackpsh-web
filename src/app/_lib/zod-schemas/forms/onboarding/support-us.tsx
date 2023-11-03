import { z } from "zod";

export const SupportUsFormSchema = z.object({
  be_officer: z.boolean(),
  type_officer: z.enum(["administrative", "technical", "both"]),
});

export type THelpForm = z.infer<typeof SupportUsFormSchema>;