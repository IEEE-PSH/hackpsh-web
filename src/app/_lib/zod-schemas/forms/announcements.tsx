import { z } from "zod";

// Form Schema
export const CreateAnnouncementFormSchema = z.object({
  title: z.string().min(1, "A title is required."),
  message: z.string().min(1, "Cannot leave field empty."),
});

export type TCreateAnnouncementForm = z.infer<typeof CreateAnnouncementFormSchema>;
