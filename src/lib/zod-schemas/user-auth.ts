import { z } from "zod"

// Form Schema
export const UserAuthFormSchema = z.object({
  email: z.string().email("Please provide a valid email")
});
  
export type TUserAuthForm = z.infer<typeof UserAuthFormSchema>;  