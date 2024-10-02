import { difficulty } from "@/app/_lib/zod-schemas/forms/challenges";
import { z } from "zod";

export const createChallengeSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  title: z.string().min(1, "A title is required."),
  difficulty: z.enum(difficulty),
  description: z.string().min(1, "Cannot leave field empty."),
  function_header: z.string().min(1, "Cannot leave field empty."),
  example_input: z.string().min(1, "Cannot leave field empty."),
  example_output: z.string().min(1, "Cannot leave field empty."),
  explanation: z.string().min(1, "Cannot leave field empty."),
  testcase_input_1: z.string().min(1, "Cannot leave field empty."),
  testcase_output_1: z.string().min(1, "Cannot leave field empty."),
  testcase_input_2: z.string().min(1, "Cannot leave field empty."),
  testcase_output_2: z.string().min(1, "Cannot leave field empty."),
});

export const LookupChallengeSchema = z.object({
  challenge_id: z.number(),
});
