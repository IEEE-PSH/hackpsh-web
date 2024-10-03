import { z } from "zod";

export const difficulty = ["easy", "medium", "hard"] as const;
export type TDifficulty = (typeof difficulty)[number];

export const paramTypes = [
  "int",
  "intArr",
  "string",
  "stringArr",
  "double",
  "doubleArr",
  "char",
  "charArr",
] as const;

export type TParamTypes = (typeof paramTypes)[number];

export const paramTypeMapping: Record<(typeof paramTypes)[number], string> = {
  int: "int",
  intArr: "vector<int>",
  string: "string",
  stringArr: "vector<string>",
  double: "double",
  doubleArr: "vector<double>",
  char: "char",
  charArr: "vector<char>",
} as const;

export type TParamTypeMapping = typeof paramTypeMapping;

function isValidHeader(header: string) {
  const match = header.match(/(\w+)\s+(\w+)\((.*)\)/);

  if (match) {
    const functionType = match[1] as TParamTypes;
    const functionTitle = match[2];
    const params = match[3];

    if (!paramTypes.includes(functionType)) return false;

    if (functionType && functionTitle && !params) return true;
    // if (params!.split(" ").length % 2 != 0) return false; //??

    // eslint-disable-next-line prefer-const
    let types: string[] = [];
    // eslint-disable-next-line prefer-const
    let names: string[] = [];

    params?.split(", ").forEach((param) => {
      const [type, name] = param.split(" ");
      types.push(type!);
      names.push(name!);
    });

    // check functionTitle and param names unique
    if (names.includes(functionTitle!)) return false;

    // check valid params
    if (types.length !== names.length) return false;

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < types.length; i++) {
      // check valid param types
      if (!paramTypes.includes(types[i]! as TParamTypes)) {
        return false;
        // check unique param names
      } else if (new Set(names).size !== names.length) {
        return false;
      }
    }

    return true;
  }
  return false;
}

// Form Schema
export const CreateChallengeFormSchema = z.object({
  title: z.string().min(1, "Cannot leave field empty."),
  difficulty: z.enum(difficulty),
  description: z.string().min(1, "Cannot leave field empty."),
  function_header: z.string().refine((value) => isValidHeader(value), {
    message: "Function header not valid.",
  }),
  example_input: z.string().min(1, "Cannot leave field empty."),
  example_output: z.string().min(1, "Cannot leave field empty."),
  explanation: z.string().min(1, "Cannot leave field empty."),
  test_cases: z.array(
    z.object({
      input: z.string().min(1, "Cannot leave field empty."),
      output: z.string().min(1, "Cannot leave field empty."),
    }),
  ),
});

export type TCreateChallengeFormSchema = z.infer<
  typeof CreateChallengeFormSchema
>;
