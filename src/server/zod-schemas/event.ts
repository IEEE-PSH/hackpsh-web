import { z } from "zod";

export const UpdateEventDetailsSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  event_date: z.string(),
  event_start_hour: z.number().min(0).max(24),
  event_end_hour: z.number().min(0).max(24),
});
