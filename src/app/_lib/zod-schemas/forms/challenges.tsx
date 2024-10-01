import { z } from "zod";

export const difficulty = ["easy","medium","hard"] as const
export type TDifficulty = (typeof difficulty)[number]

// Form Schema
export const CreateChallengeFormSchema = z.object({
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
  testcase_output_2: z.string().min(1, "Cannot leave field empty.")

});

export type TCreateChallengeFormSchema= z.infer<typeof CreateChallengeFormSchema>;
