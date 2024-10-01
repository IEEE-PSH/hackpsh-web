"use client";

import { getUser } from "@/shared/supabase/auth";
import {
  type TCreateAnnouncementForm,
  CreateAnnouncementFormSchema,
} from "@/app/_lib/zod-schemas/forms/announcements";
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
import { useForm } from "react-hook-form";
import { Icons } from "../ui/icons";
import { cn } from "@/app/_lib/client-utils";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { Info } from "lucide-react";
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
import { TCreateChallengeFormSchema } from "@/app/_lib/zod-schemas/forms/challenges";

type CreateAnouncementFormProps = React.HTMLAttributes<HTMLDivElement>;

export function CreateChallengeForm({
  className,
  ...props
}: CreateAnouncementFormProps) {
  const form = useForm<TCreateChallengeFormSchema>({
    resolver: zodResolver(CreateChallengeForm),
  });
  const router = useRouter();

  const announcementMutation =
    trpc.announcements.create_announcement_post.useMutation({
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Announcement Created!",
          description: "You have successfully created an announcement.",
          duration: 4000,
        });
        router.replace("/announcements");
        router.refresh();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Oops, Something Went Wrong!",
          description:
            "If you've encountered an issue, please contact our event administrators for assistance. We apologize for any inconvenience and will resolve it promptly.",
          duration: 6000,
        });
      },
    });

  async function onSubmit(values: TCreateAnnouncementForm) {
    try {
      const supabase = createClientComponentClient();
      const user = await getUser(supabase);

      await announcementMutation.mutateAsync({
        author_uuid: user.id,
        title: values.title,
        content: values.content,
      });
    } catch (err: unknown) {
      console.log(err);
    }
  }

  const [isExample, setIsExample] = useState(false)
  const exampleFields = {
    title: "Sum of Array",
    description: "Add all integers of the array given its size.",
    function_header: "arraySum(int n, intArr nums)",
    example_input: `4\n1 4 3 2`,
    example_output: "10",
    explanation: "The array has 4 integers. 1+4+3+2=10, so the output is 10.",
    testcase_input_1: `2\n2 3`,
    testcase_output_1: "5",
    testcase_input_2: `5\n1 1 1 1 10`,
    testcase_output_2: "14"
  }

  return (
    <div className={cn("grid-gap-6", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6"
        >
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">Challenge Info</h1>
            <div className="flex items-center space-x-2">
              <Label>Example placeholders</Label>
              <Switch checked={isExample} onCheckedChange={setIsExample} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={isExample?exampleFields.title : ""}
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
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a difficulty" />
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
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={isExample?exampleFields.description:""}
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
            name="function_header"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">
                  <span>Function Header</span>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Info className="ml-2 h-4 w-4" />
                    </HoverCardTrigger>
                    <HoverCardContent className="space-y-2 font-normal flex flex-col">
                    <p className="underline">Format:</p>
                      <p>
                        functionName(string paramName1, int paramName2)
                      </p>
                      <p className="underline">Valid parameter types:</p>
                      <p>
                        int, intArr, double, doubleArr, string, stringArr, char,
                        charArr
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={isExample? exampleFields.function_header:""}
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
            name="example_input"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Example Input</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={isExample?exampleFields.example_input:""}
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
                  <Input
                    placeholder={isExample?exampleFields.example_output:""}
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
            name="explanation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Explanation</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={isExample?exampleFields.explanation:""}
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
          <h1 className="mb-6 text-2xl font-semibold">Testcases</h1>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="grid gap-y-4">
              <FormField
                control={form.control}
                name="testcase_input_1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Input #1</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={isExample?exampleFields.testcase_input_1:""}
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
                name="testcase_output_1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Output #1</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={isExample?exampleFields.testcase_output_1:""}
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-y-4">
              <FormField
                control={form.control}
                name="testcase_input_2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Input #2</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={isExample?exampleFields.testcase_input_2:""}
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
                name="testcase_output_2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Output #2</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={isExample?exampleFields.testcase_output_2:""}
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 sm:flex sm:space-x-4">
            <Button
              type="button"
              onClick={() => router.back()}
              variant="navigation"
              className="ml-auto w-full justify-end px-8 sm:w-auto"
              disabled={form.formState.isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="ml-auto w-full px-8 sm:w-auto"
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
