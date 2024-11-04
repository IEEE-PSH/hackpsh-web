import { z } from "zod";

export const UpdateEventDetailsSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  event_date: z.string(),
  event_start_hour: z.number(),
  event_duration: z.number(),
  event_challenges_enabled: z.boolean(),
  event_team_creation_enabled: z.boolean(),
});
