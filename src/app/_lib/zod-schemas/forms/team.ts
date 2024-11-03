import { z } from "zod";

export const CreateTeamFormSchema = z.object({
  team_name: z
    .string()
    .min(5, "Please provide a team name that is at least 5 characters."),
  team_join_code: z.string().min(1, "Cannot leave field empty."),
});

export const JoinTeamFormSchema = z.object({
  team_join_code: z.string().min(1, "Cannot leave field empty."),
});

export type TCreateTeamForm = z.infer<typeof CreateTeamFormSchema>;
export type TJoinTeamForm = z.infer<typeof JoinTeamFormSchema>;
