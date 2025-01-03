"use client";

import { cn } from "@/app/_lib/client-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Icons } from "../ui/icons";
import { Button } from "../ui/button";
import { dbMajors, dbSchoolYear } from "@/db/drizzle/startup_seed";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/combo-scroll-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/app/_config/site";
import { trpc } from "@/app/_trpc/react";
import { getUser } from "@/shared/supabase/auth";
import { toast } from "../ui/use-toast";
import {
  SchoolDetailsFormSchema,
  type TSchoolDetailsForm,
} from "@/app/_lib/zod-schemas/forms/onboarding/school-details";
import { createClient } from "@/app/_lib/supabase/client";

type OnboardingSchoolDetailsFormProps = React.HTMLAttributes<HTMLDivElement>;

export default function OnboardingSchoolDetailsForm({
  className,
  ...props
}: OnboardingSchoolDetailsFormProps) {
  const router = useRouter();
  const supabase = createClient();

  // Form Definition
  const form = useForm<TSchoolDetailsForm>({
    resolver: zodResolver(SchoolDetailsFormSchema),
  });

  const updateSchoolDetailsMutation =
    trpc.user.update_school_details.useMutation({
      onSuccess: () => {
        router.push(siteConfig.paths.onboarding_support_us, { scroll: false });
      },
      onError: (error) => {
        toast({
          description: error.message,
          variant: "destructive",
          duration: 6000,
        });
      },
    });

  async function onSubmit(values: TSchoolDetailsForm) {
    try {
      const user = await getUser(supabase);

      await updateSchoolDetailsMutation.mutateAsync({
        user_school_year: values.user_school_year,
        user_major: values.user_major,
        user_uuid: user.id,
      });
    } catch (err: unknown) {
      console.log(err);
      // TODO: Add Logger to capture browser api submission errors
    }
  }

  return (
    <div className={cn("grid-gap-6", className)} {...props}>
      <Form {...form}>
        <form
          id="onboardingPersonalDetailsForm"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="user_school_year"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>School Year</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                          {field.value
                            ? dbSchoolYear
                                .find(
                                  (school_year) => school_year === field.value,
                                )
                                ?.replaceAll("_", " ")
                                .toLocaleUpperCase()
                            : "Select school year"}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search school year..." />
                      <CommandEmpty>
                        Cannot find provided school year.
                      </CommandEmpty>
                      <CommandGroup>
                        {dbSchoolYear.map((school_year) => (
                          <CommandItem
                            value={school_year}
                            key={school_year}
                            onSelect={() => {
                              form.setValue("user_school_year", school_year);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                school_year === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {school_year.replace("_", " ").toLocaleUpperCase()}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select a school year closest to your current academic status.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="user_major"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Major</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                          {field.value
                            ? dbMajors
                                .find(
                                  (major_name) => major_name === field.value,
                                )
                                ?.replaceAll("_", " ")
                                .toLocaleUpperCase()
                            : "Select major"}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="h-[350px] w-[400px] p-0">
                    <Command>
                      <CommandInput placeholder="Search majors..." />
                      <ScrollArea className="h-[350px]">
                        <CommandEmpty>Cannot find provided major.</CommandEmpty>
                        <CommandGroup>
                          {dbMajors.map((major_name) => (
                            <CommandItem
                              value={major_name}
                              key={major_name}
                              onSelect={() => {
                                form.setValue("user_major", major_name);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  major_name === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {major_name
                                .replaceAll("_", " ")
                                .toLocaleUpperCase()}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select a major that you are pursuing or the most interested
                  in.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
}
