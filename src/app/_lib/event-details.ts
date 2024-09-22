import { z } from "zod";

//fix types
export const EventDetailsFormSchema = z.object({
  event_date: z.string().min(5, { message: "Date must be valid." }),
  event_start_hour: z.number().min(0).max(24),
  event_end_hour: z.number().min(0).max(24),
});

export type TEventDetailsForm = z.infer<typeof EventDetailsFormSchema>;
