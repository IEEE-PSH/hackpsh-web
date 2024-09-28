import { z } from "zod";

export const JoinTeamSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  team_join_code: z
    .string()
    .min(7, "Please provide a team join dode is at least 7 characters."),
});

export const CreateTeamSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  team_name: z
    .string()
    .min(5, "Please provide a team name of at least 5 characters."),
});

export const UpdateTeamSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  team_uuid: z.string().uuid("Please provide a valid UUID."),
  team_points_additive: z.number().default(0),
});
