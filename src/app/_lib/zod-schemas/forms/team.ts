import { z } from "zod";

export const CreateTeamFormSchema = z.object({
  team_name: z.string().min(1, "Cannot leave field empty."),
  team_join_code: z.string().default(""),
});

export const JoinTeamFormSchema = z.object({
  team_join_code: z.string().default(""),
});

export type TCreateTeamForm = z.infer<typeof CreateTeamFormSchema>;
export type TJoinTeamForm = z.infer<typeof JoinTeamFormSchema>;
