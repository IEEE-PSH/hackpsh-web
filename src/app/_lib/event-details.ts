import { z } from "zod";

//fix types
export const EventDetailsFormSchema = z.object({
  event_date: z.date(),
  event_start_hour: z.string(),
  event_duration: z.string(),
  event_challenges_enabled: z.boolean(),
});

export type TEventDetailsFormSchema = z.infer<typeof EventDetailsFormSchema>;
