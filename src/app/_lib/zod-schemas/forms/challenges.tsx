import { z } from "zod";

export const difficulty = ["easy", "medium", "hard"] as const;
export type TDifficulty = (typeof difficulty)[number];

export const functionTypes = [
  "int",
  "intArr",
  "string",
  "stringArr",
  "double",
  "doubleArr",
  "char",
  "charArr",
  "boolean",
  "void",
] as const;
export type TFunctionTypes = (typeof functionTypes)[number];

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

export const functionTypeMapping: Record<
  (typeof functionTypes)[number],
  string
> = {
  int: "int",
  intArr: "vector<int>",
  string: "string",
  stringArr: "vector<string>",
  double: "double",
  doubleArr: "vector<double>",
  char: "char",
  charArr: "vector<char>",
  boolean: "bool",
  void: "void",
} as const;
export type TFunctionTypeMapping = typeof functionTypeMapping;

export type TCreateChallengeFormSchema = z.infer<
  typeof CreateChallengeFormSchema
>;
// Form Schema
export const CreateChallengeFormSchema = z
  .object({
    title: z.string().min(1, "Cannot leave field empty."),
    difficulty: z.enum(difficulty),
    points: z.coerce.number().min(1, "Cannot leave field empty."),
    description: z.string().min(1, "Cannot leave field empty."),
    function_header: z.string().refine((value) => isValidHeader(value), {
      message: "Function header not valid.",
    }),
    example_input: z.string().min(1, "Cannot leave field empty."),
    example_output: z.string().min(1, "Cannot leave field empty."),
    explanation: z.string().min(1, "Cannot leave field empty."),
    test_cases: z.array(
      z.object({
        input: z.string(),
        output: z.string().min(1, "Cannot leave field empty."),
      }),
    ),
  })
  .superRefine((data, ctx) => {
    // check valid test case inputs and outputs
    if (!isValidInput(data, data.example_input)) {
      ctx.addIssue({
        code: "custom",
        path: ["example_input"],
        message: "Input does not match header param types.",
      });
    }
    for (let i = 0; i < data.test_cases.length; i++) {
      if (!isValidInput(data, data.test_cases[i]!.input)) {
        ctx.addIssue({
          code: "custom",
          path: [`test_cases.${i}.input`],
          message: "Input does not match header param types.",
        });
      }
      if (!isValidOutput(data, data.test_cases[i]!.output)) {
        ctx.addIssue({
          code: "custom",
          path: [`test_cases.${i}.output`],
          message: "Output does not match header return type.",
        });
      }
    }
    if (!isValidOutput(data, data.example_output)) {
      ctx.addIssue({
        code: "custom",
        path: ["example_output"],
        message: "Output does not match header return type.",
      });
    }
  });

// check if output matches function header return type
function isValidOutput(data: TCreateChallengeFormSchema, output: string) {
  const regex = /^\s*(\w+|\w+\[\])\s+\w+\s*\(/;
  const match = data.function_header.match(regex);

  if (!match) return false;

  // this is return type
  const type = match[1]!.trim();

  if (type === "void") return true;
  if (output.split("\n").length > 1) return false;

  output = output.trim();
  // check arrays
  if (
    type === "stringArr" ||
    type === "intArr" ||
    type === "charArr" ||
    type === "doubleArr"
  ) {
    if (!output.startsWith("[") || !output.endsWith("]")) {
      return false;
    }
    // check numbers
  } else if (type === "int" || type === "double") {
    if (isNaN(Number(output))) return false;
    // check strings
  } else if (type === "boolean" && !(output === "true" || output === "false"))
    return false;
  return true;
}

//check is input matches param types
function isValidInput(data: TCreateChallengeFormSchema, input: string) {
  const paramTypes = getParamTypes(data.function_header);
  const inputs = input.split("\n");
  if (paramTypes.length !== inputs.length) return false;

  for (let i = 0; i < paramTypes.length; i++) {
    const type = paramTypes[i];
    const input = inputs[i]?.trim();
    //check arrays
    if (
      type === "stringArr" ||
      type === "intArr" ||
      type === "charArr" ||
      type === "doubleArr"
    ) {
      if (!input!.startsWith("[") || !input!.endsWith("]")) {
        return false;
      }
      // check numbers
    } else if (type === "int" || type === "double") {
      if (isNaN(Number(input))) return false;
      // check strings
    } else return true;
  }

  return true;
}

// get param types in the form ["string", "intArr"]
export function getParamTypes(header: string) {
  const regex = /\(([^)]*)\)/;
  const match = header.match(regex);
  if (!match) return [];
  const params = match[1]!.split(",").map((param) => param.trim());
  return params.map((param) => param.split(" ")[0]!);
}

// check valid header
function isValidHeader(header: string) {
  const match = header.match(/(\w+)\s+(\w+)\((.*)\)/);
  if (!match) return false;

  const functionType = match[1] as TFunctionTypes;
  const functionTitle = match[2];
  const params = match[3];

  if (!functionTypes.includes(functionType)) return false;

  if (functionType && functionTitle && !params) return true;
  if (params!.split(" ").length % 2 != 0) return false;

  const types: string[] = [];
  const names: string[] = [];

  params?.split(", ").forEach((param) => {
    const [type, name] = param.split(" ");
    types.push(type!);
    names.push(name!);
  });

  // check param names
  if (names.includes(functionTitle!)) return false;
  if (types.length !== names.length) return false;
  if (new Set(names).size !== names.length) return false;
  for (const name of names) if (!isValidName(name)) return false;

  // check param types
  for (const type of types)
    if (!paramTypes.includes(type as TParamTypes)) return false;

  return true;
}

function isValidName(name: string): boolean {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(name);
}
