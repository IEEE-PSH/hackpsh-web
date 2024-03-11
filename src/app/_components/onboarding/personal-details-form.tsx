"use client";

import { cn } from "@/app/_lib/client-utils";
import {
  PersonalDetailsFormSchema,
  type TPersonalDetailsForm,
} from "@/app/_lib/zod-schemas/forms/onboarding/personal-details";
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
import { Input } from "../ui/input";
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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getUser } from "@/shared/supabase/auth";
import { toast } from "../ui/use-toast";

type OnboardingPersonalDetailsFormProps = React.HTMLAttributes<HTMLDivElement>;

export default function OnboardingPersonalDetailsForm({
  className,
  ...props
}: OnboardingPersonalDetailsFormProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  // Form Definition
  const form = useForm<TPersonalDetailsForm>({
    resolver: zodResolver(PersonalDetailsFormSchema),
  });

  const updatePersonalDetailsMutation =
    trpc.user.update_personal_details.useMutation({
      onSuccess: () => {
        router.push(siteConfig.paths.onboarding, { scroll: false });
      },
      onError: (error) => {
        toast({
          description: error.message,
          variant: "destructive",
          duration: 6000,
        });
      },
    });

  async function onSubmit(values: TPersonalDetailsForm) {
    try {
      const user = await getUser(supabase);

      await updatePersonalDetailsMutation.mutateAsync({
        user_display_name: values.user_display_name,
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
            name="user_display_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input
                    className="border-muted-foreground"
                    placeholder="CoolHacker123"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name. Please be appropriate.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
                        {field.value
                          ? dbSchoolYear
                              .find(
                                (school_year) => school_year === field.value,
                              )
                              ?.replace("_", " ")
                              .toLocaleUpperCase()
                          : "Select school year"}
                        <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
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
                        {field.value
                          ? dbMajors
                              .find((major_name) => major_name === field.value)
                              ?.replaceAll("_", " ")
                              .toLocaleUpperCase()
                          : "Select major"}
                        <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
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
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
            )}
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
}
