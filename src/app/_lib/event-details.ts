import { z } from "zod";

//fix types
export const EventDetailsFormSchema = z.object({
  event_date: z.date(),
  event_start_hour: z.string(),
  event_duration: z.string(),
});

export type TEventDetailsFormSchema = z.infer<typeof EventDetailsFormSchema>;
