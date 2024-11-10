import { z } from "zod";

export const JoinTeamSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  team_name: z.string().min(1, "Cannot leave field empty."),
  team_join_code: z.string(),
});

export const CreateTeamSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  team_name: z.string().min(1, "Cannot leave field empty."),
  team_join_code: z.string(),
});

export const UpdateTeamSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  team_uuid: z.string().uuid("Please provide a valid UUID."),
  team_points_additive: z.number().default(0),
});

export const UpdateTeamLeaderSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  is_team_leader: z.boolean(),
  target_uuid: z.string().uuid("Please provide a valid UUID."),
});
