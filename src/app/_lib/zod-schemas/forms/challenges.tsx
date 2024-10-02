import { z } from "zod";

export const difficulty = ["easy", "medium", "hard"] as const;
export type TDifficulty = (typeof difficulty)[number];

function isValidHeader(header: string) {
  const match = header.match(/(\w+)\((.*)\)/);
  const validParams = [
    "int",
    "intArr",
    "string",
    "stringArr",
    "double",
    "doubleArr",
    "char",
    "charArr",
  ];

  if (match) {
    const title = match[1];
    const params = match[2];

    if (title && !params) return true;
    if (params!.split(" ").length % 2 != 0) return false;

    // eslint-disable-next-line prefer-const
    let paramTypes: string[] = [];
    // eslint-disable-next-line prefer-const
    let paramNames: string[] = [];

    params?.split(", ").forEach((param) => {
      const [type, name] = param.split(" ");
      paramTypes.push(type!);
      paramNames.push(name!);
    });

    //check title and param names unique
    if (paramNames.includes(title!)) return false;

    // check valid params
    if (paramTypes.length !== paramNames.length) return false;

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < paramTypes.length; i++) {
      // check valid param types
      if (!validParams.includes(paramTypes[i]!)) {
        return false;
        // check unique param names
      } else if (new Set(paramNames).size !== paramNames.length) {
        return false;
      }
    }

    return true;
  }
  return false;
}

// Form Schema
export const CreateChallengeFormSchema = z.object({
  title: z.string().min(1, "A title is required."),
  difficulty: z.enum(difficulty),
  description: z.string().min(1, "Cannot leave field empty."),
  function_header: z.string().refine((val) => isValidHeader(val), {
    message: "Function header not valid.",
  }),
  example_input: z.string().min(1, "Cannot leave field empty."),
  example_output: z.string().min(1, "Cannot leave field empty."),
  explanation: z.string().min(1, "Cannot leave field empty."),
  testcase_input_1: z.string().min(1, "Cannot leave field empty."),
  testcase_output_1: z.string().min(1, "Cannot leave field empty."),
  testcase_input_2: z.string().min(1, "Cannot leave field empty."),
  testcase_output_2: z.string().min(1, "Cannot leave field empty."),
});

export type TCreateChallengeFormSchema = z.infer<
  typeof CreateChallengeFormSchema
>;
