import { difficulty } from "@/app/_lib/zod-schemas/forms/challenges";
import { z } from "zod";

export const createChallengeSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  title: z.string().min(1, "A title is required."),
  points: z.number().min(1, "Cannot leave field empty."),
  difficulty: z.enum(difficulty),
  languages: z.string().min(1, "At least one language is requried."),
  description: z.string().min(1, "Cannot leave field empty."),
  function_header: z.string().min(1, "Cannot leave field empty."),
  example_input: z.string().default(""),
  example_output: z.string().min(1, "Cannot leave field empty."),
  explanation: z.string().min(1, "Cannot leave field empty."),
  test_cases: z.array(
    z.object({
      input: z.string().default(""),
      output: z.string().min(1, "Cannot leave field empty."),
    }),
  ),
});

export const updateChallengeSchema = z.object({
  user_uuid: z.string().uuid("Please provide a valid UUID."),
  title: z.string().min(1, "A title is required."),
  points: z.number().min(1, "Cannot leave field empty."),
  difficulty: z.enum(difficulty),
  description: z.string().min(1, "Cannot leave field empty."),
  languages: z.string().min(1, "At least one language is required."),
  function_header: z.string().min(1, "Cannot leave field empty."),
  example_input: z.string().default(""),
  example_output: z.string().min(1, "Cannot leave field empty."),
  explanation: z.string().min(1, "Cannot leave field empty."),
  test_cases: z.array(
    z.object({
      input: z.string().default(""),
      output: z.string().min(1, "Cannot leave field empty."),
    }),
  ),
  challenge_id: z.coerce.number(),
});

export const LookupChallengeSchema = z.object({
  challenge_id: z.coerce.number(),
});

export const LookupTestCasesSchema = z.object({
  challenge_uuid: z.string().uuid("Please provide a valid UUID."),
});

export const isSolvedChallengeSchema = z.object({
  challenge_id: z.coerce.number(),
  user_uuid: z.string().uuid("Please provide a valid UUID."),
});

export const languages = ["cpp", "javascript", "python"] as const;
export type TLanguages = (typeof languages)[number];

export const runCodeSchema = z.object({
  code_string: z.string(),
  challenge_id: z.coerce.number(),
  challenge_header: z.string(),
  language: z.enum(languages),
});

export const submitCodeSchema = z.object({
  code_string: z.string(),
  challenge_id: z.coerce.number(),
  challenge_header: z.string(),
  language: z.enum(languages),
  user_uuid: z.string().uuid("Please provide a valid UUID."),
});
