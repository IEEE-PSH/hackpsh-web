import { z } from "zod";

export const CreateAnnouncementPostSchema = z.object({
  author_uuid: z.string().uuid("Please provide a valid UUID."),
  content: z.string().min(1, "Content must at least have a single character"),
});