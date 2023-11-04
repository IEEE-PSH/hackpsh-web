import { z } from "zod";

export const JoinTeamSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  team_join_code: z.string().min(7, "Team Join Code is at least 7 characters."),
});
