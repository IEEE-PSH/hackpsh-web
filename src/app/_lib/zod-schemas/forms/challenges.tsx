import { RefinementCtx, z } from "zod";

export const difficulty = ["easy", "medium", "hard"] as const;
export type TDifficulty = (typeof difficulty)[number];

export const functionTypes = [
  "int",
  "intArr",
  "double",
  "doubleArr",
  "string",
  "stringArr",
  "boolean",
  "void",
  "any",
  "anyArr",
  "dict",
] as const;
export type TFunctionTypes = (typeof functionTypes)[number];

export const paramTypes = [
  "int",
  "intArr",
  "double",
  "doubleArr",
  "string",
  "stringArr",
  "boolean",
  "any",
  "anyArr",
  "dict",
] as const;
export type TParamTypes = (typeof paramTypes)[number];

export const functionTypeMapping: Record<
  (typeof functionTypes)[number],
  string
> = {
  int: "int",
  intArr: "vector<int>",
  double: "double",
  doubleArr: "vector<double>",
  string: "string",
  stringArr: "vector<string>",
  boolean: "bool",
  void: "void",
  any: "UNUSABLE",
  anyArr: "UNUSABLE",
  dict: "UNUSABLE",
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
    points: z.coerce.number().default(0),
    description: z.string().min(1, "Cannot leave field empty."),
    languages: z.string().min(1, "At least one language is required."),
    function_header: z.string(),
    example_input: z.string().default(""),
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
    // check valid header
    if (!isValidHeader(data, ctx)) {
      ctx.addIssue({
        code: "custom",
        path: ["function_header"],
        message: "Function header is not valid.",
      });
    }

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

function isValidLiteral(literal: string, type: string): boolean {
  if (type === "void" || type === "any") {
    return true;
  } else if (
    type === "stringArr" ||
    type === "intArr" ||
    type === "doubleArr" ||
    type === "anyArr"
  ) {
    if (literal.startsWith("[") && literal.endsWith("]")) return true;
  } else if (type === "dict") {
    if (literal.startsWith("{") && literal.endsWith("}")) return true;
  } else if (type === "int" || type === "double") {
    if (!isNaN(Number(literal))) return true;
  } else if (type === "boolean") {
    if (literal === "true" || literal === "false") return true;
  } else if (type === "string") return true;
  return false;
}

// check if output matches function header return type
function isValidOutput(data: TCreateChallengeFormSchema, output: string) {
  const regex = /^\s*(\w+|\w+\[\])\s+\w+\s*\(/;
  const match = data.function_header.match(regex);

  if (!match) return false;
  const type = match[1]!.trim();

  if (type === "void" || type === "any") return true;
  if (output.split("\n").length > 1) return false;

  output = output.trim();
  return isValidLiteral(output, type);
}

//check is input matches param types
function isValidInput(data: TCreateChallengeFormSchema, input: string) {
  const paramTypes = getParamTypes(data.function_header);
  if (paramTypes.length === 0 && input.trim() === "") return true;
  if (paramTypes.length === 0 && input.trim() !== "") return false;
  if (paramTypes.length > 0 && input.trim() === "") return false;
  const inputs = input.split("\n");
  if (paramTypes.length !== inputs.length) return false;

  for (let i = 0; i < paramTypes.length; i++) {
    const type = paramTypes[i];
    const input = inputs[i]?.trim();
    if (isValidLiteral(input!, type!) === false) return false;
  }

  return true;
}

// get param types in the form of ["string", "intArr"]
export function getParamTypes(header: string) {
  const regex = /\(([^)]*)\)/;
  const match = header.match(regex);
  if (!match || match[1] === "") return [];
  const params = match[1]!.split(",").map((param) => param.trim());
  return params.map((param) => param.split(" ")[0]!);
}

// check valid header
function isValidHeader(data: TCreateChallengeFormSchema, ctx: RefinementCtx) {
  const match = data.function_header.match(/(\w+)\s+(\w+)\((.*)\)/);
  if (!match) return false;

  const functionType = match[1] as TFunctionTypes;
  const functionTitle = match[2];
  const params = match[3];

  if (
    data.languages.includes("cpp") &&
    (functionType === "dict" ||
      functionType === "any" ||
      functionType === "anyArr")
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["languages"],
      message: "C++ cannot be used with dict, any, or anyArr.",
    });
  } else if (data.languages.includes("javascript") && functionType === "dict") {
    ctx.addIssue({
      code: "custom",
      path: ["languages"],
      message: "Javascript cannot be used with dict.",
    });
  }

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
  for (const type of types) {
    if (!paramTypes.includes(type as TParamTypes)) return false;
    if (
      data.languages.includes("cpp") &&
      (type === "dict" || type === "any" || type === "anyArr")
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["languages"],
        message: "C++ cannot be used with dict, any, or anyArr.",
      });
      return false;
    }
  }

  return true;
}

function isValidName(name: string): boolean {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(name);
}
