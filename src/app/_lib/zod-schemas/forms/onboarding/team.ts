import { z } from "zod";

export const CreateTeamFormSchema = z.object({
  team_name: z.string(),
});

export const JoinTeamFormSchema = z.object({
  team_join_code: z.string().min(1, "Team Join Code is at least 7 characters."),
});

export type TCreateTeamForm = z.infer<typeof CreateTeamFormSchema>;
export type TJoinTeamForm = z.infer<typeof JoinTeamFormSchema>;
