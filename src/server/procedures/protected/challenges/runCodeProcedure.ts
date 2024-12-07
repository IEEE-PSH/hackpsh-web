import {
  getParamTypes,
  TFunctionTypes,
} from "@/app/_lib/zod-schemas/forms/challenges";
import { getChallenge } from "@/server/dao/challenges";
import { protectedProcedure } from "@/server/trpc";
import {
  runCodeSchema,
  type TLanguages,
} from "@/server/zod-schemas/challenges";
import { TRPCError } from "@trpc/server";
import { formatLiteral } from "./createChallengeProcedure";

export const languagePreset: Record<
  string,
  { language: string; version: string }
> = {
  python: { language: "python", version: "3.10.0" },
  cpp: { language: "cpp", version: "10.2.0" },
  javascript: { language: "javascript", version: "18.15.0" },
};

// FORMAT
export function formatFunctionCall(header: string) {
  const match = header.match(/^\s*(\w+)\s+(\w+)\s*\((.*)\)\s*$/);
  const functionName = match![2];
  const params = match![3];

  const replacedParams = params!
    .split(",")
    .map(() => ".")
    .join(", ");

  return `${functionName}(${replacedParams})`;
}

// FILL
// addSum(a, n)
export function fillFunctionCall(
  header: string,
  language: TLanguages,
  exampleInputs: string,
  paramTypes: string[],
) {
  const regex =
    /^\[\s*(?:(?:"[^"]*"|-?\d+\.\d*|-?\d+|'[^']*'|true|false|null)(\s*,\s*(?:"[^"]*"|-?\d+\.\d*|-?\d+|'[^']*'|true|false|null))*)?\s*\]$/;
  const inputs = exampleInputs.split("\n");

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i]!;
    // convert test case bracket arrays to braces for C++
    if (language === "cpp" && regex.test(input)) {
      const temp = input.slice(1, -1).split(",");
      const newInput = `{${temp.join(",").replaceAll(`'`, `"`)}}`;
      console.log(newInput);
      header = header.replace(".", newInput);
      // convert test case booleans to capitalized for Python
    } else if (language === "python" && paramTypes[i] === "boolean")
      header = header.replace(
        ".",
        input.charAt(0).toUpperCase() + input.slice(1),
      );
    else header = header.replace(".", formatInput(input, paramTypes[i]!));
  }
  return header;
}

export function formatInput(input: string, type: string): string {
  if (type === "string") {
    return `"${input}"`;
  }
  return input;
}

export default protectedProcedure
  .input(runCodeSchema)
  .query(async ({ ctx, input }) => {
    const challengeData = await getChallenge(ctx.db, input.challenge_id);
    const exampleInputs = challengeData?.challenge_example_input;
    const headerType = challengeData!.challenge_function_header.split(" ")[0];
    const tempHeader = formatFunctionCall(
      challengeData!.challenge_function_header,
    );

    const paramTypes = getParamTypes(challengeData!.challenge_function_header);
    const funcToExecute = fillFunctionCall(
      tempHeader,
      input.language,
      exampleInputs!,
      paramTypes,
    );

    //get proper boilerplate
    let boilerPlate = "";
    if (headerType === "void") {
      if (input.language === "cpp")
        boilerPlate = `int main(){${funcToExecute};}`;
      else boilerPlate = `\n${funcToExecute}`;
    } else {
      if (input.language === "python")
        boilerPlate = `\nprint(${funcToExecute})`;
      else if (input.language === "cpp") {
        if (
          headerType === "intArr" ||
          headerType === "stringArr" ||
          headerType === "doubleArr"
        )
          boilerPlate = `template<typename T>ostream& operator<<(ostream& os, const vector<T>& vec) {os << "{";for (size_t i = 0;i < vec.size(); ++i) {os << vec[i]; if (i != vec.size() - 1) os << ", ";}os << "}";return os;}int main() {cout <<${funcToExecute}<< endl;return 0;}`;
        else boilerPlate = `int main(){cout<<${funcToExecute};}`;
      } else {
        boilerPlate = `console.log(${funcToExecute})`;
      }
    }

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: languagePreset[input.language]!.language,
          version: languagePreset[input.language]!.version,
          files: [
            {
              content: input.code_string + boilerPlate,
            },
          ],
        }),
      });
      const data = (await response.json()) as ExecutionResponse;

      //format stdout accordingly for users to see
      let formattedLiteral = formatLiteral(data.run.stdout);
      if (input.language === "cpp" && headerType === "stringArr") {
        formattedLiteral = formattedLiteral.replace(/([a-zA-Z0-9_]+)/g, '"$1"');
      }

      if (data.run.code == 0) {
        return {
          type: "valid",
          output: formattedLiteral,
        };
      } else
        return {
          type: "error",
          output: data.run.stderr,
        };
    } catch (error) {
      throw new TRPCError({
        message: "The executor has encountered some issues.",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  });

export type ExecutionResponse = {
  language: string;
  version: string;
  run: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
};
