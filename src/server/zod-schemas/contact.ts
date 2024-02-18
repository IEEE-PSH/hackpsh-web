import { z } from "zod";

export const CreateContactPostSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email("Email must be valid"),
  content: z.string().min(1, "Content must at least have a single character"),
});
