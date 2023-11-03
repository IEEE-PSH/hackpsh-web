import { z } from "zod";

export const JoinTeamSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  team_join_code: z.string().min(1, "Team Join Code is at least 6 characters."),
});
