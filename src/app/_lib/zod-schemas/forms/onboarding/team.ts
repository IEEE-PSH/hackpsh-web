import { z } from "zod";

export const CreateTeamFormSchema = z.object({
  team_name: z
    .string()
    .min(5, "Please provide a team name that is at least 5 characters."),
});

export const JoinTeamFormSchema = z.object({
  team_join_code: z
    .string()
    .min(7, "Please provide a team join code is at least 7 characters."),
});

export type TCreateTeamForm = z.infer<typeof CreateTeamFormSchema>;
export type TJoinTeamForm = z.infer<typeof JoinTeamFormSchema>;
