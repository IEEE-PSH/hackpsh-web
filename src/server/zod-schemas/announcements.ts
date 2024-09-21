import { z } from "zod";

export const CreateAnnouncementPostSchema = z.object({
  author_uuid: z.string().uuid("Please provide a valid UUID."),
  title: z.string().min(1, "Title must have at least a single character"),
  content: z.string().min(1, "Content must at least have a single character"),
});

export const LookupAnnouncementPostSchema = z.object({
  announcement_id: z.number(),
});
