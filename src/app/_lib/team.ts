import { z } from "zod";

export const UpdateTeamFormSchema = z.object({
  team_points_additive: z.coerce.number(),
});

export type TUpdateTeamFormSchema = z.infer<typeof UpdateTeamFormSchema>;
