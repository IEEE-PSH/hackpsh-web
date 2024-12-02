"use client";

import { getUser } from "@/shared/supabase/auth";
import { trpc } from "@/app/_trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";
import { useFieldArray, useForm } from "react-hook-form";
import { Icons } from "../ui/icons";
import { cn } from "@/app/_lib/client-utils";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { CirclePlus, Info, Trash } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useState } from "react";
import {
  CreateChallengeFormSchema,
  type TCreateChallengeFormSchema,
} from "@/app/_lib/zod-schemas/forms/challenges";
import { Card } from "../ui/card";
import { type TEditChallengeData } from "@/server/dao/challenges";
import { type TDifficulties } from "@/db/drizzle/startup_seed";
import ChallengeDeleteDialog from "../challenges/challenge-delete-dialog";
import Link from "next/link";
import { languages, type TLanguages } from "@/server/zod-schemas/challenges";
import { Checkbox } from "../ui/checkbox";

type CreateChallengeFormProps = React.HTMLAttributes<HTMLDivElement>;
type EditChallengeFormProps = {
  challengeData: TEditChallengeData;
};

export function EditChallengeForm({
  challengeData,
  className,
  ...props
}: CreateChallengeFormProps & EditChallengeFormProps) {
  const challenge = challengeData.challenge;
  const testcases = challengeData.testcases;
  const form = useForm<TCreateChallengeFormSchema>({
    resolver: zodResolver(CreateChallengeFormSchema),
    defaultValues: {
      title: challenge?.challenge_title,
      description: challenge?.challenge_description,
      languages: challenge?.challenge_languages,
      difficulty: challenge?.challenge_difficulty as TDifficulties,
      points: challenge?.challenge_points,
      function_header: challenge?.challenge_function_header,
      example_input: challenge?.challenge_example_input,
      example_output: challenge?.challenge_example_output,
      explanation: challenge?.challenge_explanation,
      test_cases: testcases.map((testcase) => ({
        input: testcase.test_case_input,
        output: testcase.test_case_output,
      })),
    },
  });
  const router = useRouter();

  const challengeMutation = trpc.challenges.update_challenge.useMutation({
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Challenge updated.",
        duration: 4000,
      });
      router.back();
      router.refresh();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error.message,
        duration: 6000,
      });
    },
  });

  async function onSubmit(values: TCreateChallengeFormSchema) {
    try {
      const supabase = createClientComponentClient();
      const user = await getUser(supabase);

      await challengeMutation.mutateAsync({
        user_uuid: user.id,
        title: values.title,
        difficulty: values.difficulty,
        points: values.points,
        description: values.description,
        languages: values.languages,
        function_header: values.function_header,
        example_input: values.example_input,
        example_output: values.example_output,
        explanation: values.explanation,
        test_cases: values.test_cases,
        challenge_id: challenge!.challenge_id,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  const [isExample, setIsExample] = useState(false);
  const exampleFields = {
    title: "Sum of Arrays",
    description: "Add all integers of the array given its size.",
    points: "200",
    function_header: "int arraysSum(intArr a, intArr b)",
    example_input: `[1, 3]\n[5, 5]`,
    example_output: "14",
    explanation:
      "If you add up all the integers in the arrays, you get 1+3+5+5=14, so the return is 14.",
  };

  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "test_cases",
  });

  function addTestcase() {
    append({ input: "", output: "" });
  }

  function removeTestcase(i: number) {
    remove(i);
  }

  function updateLanguages(language: TLanguages) {
    let languagesArray: string[] = [];
    const supportedLanguages = form.getValues("languages");
    if (supportedLanguages.length > 0)
      languagesArray = supportedLanguages.split(",");

    if (languagesArray.includes(language))
      languagesArray = languagesArray.filter((lang) => lang !== language);
    else languagesArray.push(language);

    const tempString = languagesArray.sort().join(",");

    form.setValue("languages", tempString);
  }

  return (
    <div className={cn("grid-gap-6", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6"
        >
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold">Challenge Info</h1>
            <div className="flex items-center space-x-2">
              <Label>Example placeholders</Label>
              <Switch checked={isExample} onCheckedChange={setIsExample} />
            </div>
          </div>

          <div className="grid grid-cols-4 grid-rows-2 gap-x-4 gap-y-6 lg:grid-rows-1">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-4 row-span-1 flex-grow lg:col-span-2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={isExample ? exampleFields.title : ""}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem className="col-span-2 lg:col-span-1">
                  <FormLabel>Difficulty</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={
                      challenge!.challenge_difficulty as TDifficulties
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem className="col-span-2 lg:col-span-1">
                  <FormLabel>Points</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={isExample ? exampleFields.points : ""}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={isExample ? exampleFields.description : ""}
                    className="h-36 resize-none"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Supported Languages</FormLabel>
                <div className="flex space-x-4">
                  {languages.map((language) => (
                    <div key={language} className="flex space-x-2 align-middle">
                      <Checkbox
                        id={language}
                        className="border-input"
                        checked={field.value?.includes(language)}
                        onCheckedChange={() => updateLanguages(language)}
                      />
                      <Label htmlFor={language}>
                        {language === "python"
                          ? "Python"
                          : language === "cpp"
                            ? "C++"
                            : "Javascript"}
                      </Label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="function_header"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">
                  <span>Function Header</span>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Info className="ml-2 h-4 w-4" />
                    </HoverCardTrigger>
                    <HoverCardContent className="flex flex-col space-y-2 font-normal">
                      <p className="underline">Format:</p>
                      <p>type functionName(type param1, type param2)</p>
                      <p className="underline">Function types:</p>
                      <p>
                        void, boolean, int, intArr, double, doubleArr, string,
                        stringArr, boolean, void, any, anyArr, dict
                      </p>
                      <p className="underline">Param types:</p>
                      <p>
                        int, intArr, double, doubleArr, string, stringArr,
                        boolean, any, anyArr, dict
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={isExample ? exampleFields.function_header : ""}
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="example_input"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Example Input</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={isExample ? exampleFields.example_input : ""}
                      className="resize-none"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="example_output"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Example Output</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder={
                        isExample ? exampleFields.example_output : ""
                      }
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="explanation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Explanation</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={isExample ? exampleFields.explanation : ""}
                    className="resize-none"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />

          <div className="mb-6 flex flex-row items-center">
            <h1 className=" text-lg font-semibold">Test cases</h1>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Info className="ml-2 h-4 w-4" />
              </HoverCardTrigger>
              <HoverCardContent className="flex flex-col space-y-2 text-sm font-normal">
                <p>
                  These are hidden test cases. The application will use the
                  example test case and hidden test cases to check users{"'"}{" "}
                  programs.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>

          <div className="grid gap-4">
            {fields.map((testCase, i) => (
              <div key={testCase.id} className="flex items-center space-x-4">
                <FormField
                  control={form.control}
                  name={`test_cases.${i}.input`}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Input #{i + 1}</FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`test_cases.${i}.output`}
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Output #{i + 1}</FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => removeTestcase(i)}
                  className="mt-8"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button
            onClick={() => addTestcase()}
            variant="ghost"
            asChild
            className="flex h-20 cursor-pointer items-center justify-center p-0"
          >
            <Card className="flex items-center p-0">
              <CirclePlus className="mr-4" />
              <span>Add testcase</span>
            </Card>
          </Button>

          <div className="grid grid-cols-3 gap-x-4 sm:flex">
            <Button
              type="button"
              variant="navigation"
              className="ml-auto flex w-full justify-items-end px-8 text-end sm:w-auto"
              disabled={form.formState.isSubmitting}
              asChild
            >
              <Link
                href="#"
                onClick={() => {
                  router.back();
                }}
              >
                Cancel
              </Link>
            </Button>
            <ChallengeDeleteDialog
              challengeId={challengeData.challenge!.challenge_id}
            />
            <Button
              type="submit"
              className="w-full px-8 sm:w-auto"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
