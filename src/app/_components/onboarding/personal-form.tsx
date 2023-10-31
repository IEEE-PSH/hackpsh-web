"use client";

import { cn } from "@/app/_lib/client-utils";
import {
  PersonalFormSchema,
  type TMajor,
  type TPersonalForm,
} from "@/app/_lib/zod-schemas/onboarding";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/app/_components/ui/input";
import { Button, buttonVariants } from "@/app/_components/ui/button";
import { Icons } from "@/app/_components/ui/icons";
import {
  Select as SelectContainer,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/_components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import FormStep from "@/app/_components/onboarding/form-step";
import { useRouter } from "next/navigation";
import SignOutButton from "@/app/_components/ui/sign-out-button";

export default function PersonalForm() {
  // Form Definition
  const form = useForm<TPersonalForm>({
    resolver: zodResolver(PersonalFormSchema),
  });

  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/require-await
  async function onSubmit(values: TPersonalForm) {
    console.log(values.user_display_name);
    console.log(values.user_class_year)
    console.log(values.user_major)
    router.replace("/onboarding/helpus");
  }

  const classYear = [
    "N/A",
    "Middle School",
    "High School",
    "Freshman",
    "Sophmore",
    "Junior",
    "Senior",
    "Graduate",
    "Post Graduate",
  ];
  const classYearSelects: Array<unknown> = [];
  classYear.forEach((year) =>
    classYearSelects.push(
      <SelectItem value={year.toLowerCase().replace(" ", "_")}>
        {year}
      </SelectItem>,
    ),
  );
  const majors = [
    "N/A",
    "Accounting",
    "American Studies",
    "Biobehavioral Health",
    "Biology",
    "Civil Engineering",
    "Communication Sciences and Disorders",
    "Communications",
    "Computer Science",
    "Criminal Justice",
    "Cybersecurity Analytics and Operations",
    "Electrical Engineering",
    "Electrical Engineering Technology",
    "Elementary Education",
    "English",
    "Enterprise Technology Integration",
    "Finance",
    "Health Policy and Administration",
    "Human Capital Management",
    "Human Development and Family Studies",
    "Human-Centered Design and Development",
    "Humanities",
    "Information Sciences and Technology",
    "Information Systems",
    "Kinesiology",
    "Management",
    "Marketing",
    "Mathematical Sciences",
    "Mechanical Engineering",
    "Mechanical Engineering Technology",
    "Nursing (Second Degree)",
    "Political Science",
    "Project and Supply Chain Management",
    "Psychology",
    "Public Policy",
    "Science",
    "Secondary Education English",
    "Secondary Education Mathematics",
    "Secondary Education Social Studies",
    "Security and Risk Analysis",
    "Sociology",
    "Structural Design & Construction Engineering Technology",
  ];
  const items: Array<{ label: string; value: TMajor }> = [];
  majors.forEach((major) =>
    items.push({
      label: major,
      value: major.toLowerCase().replace(" ", "_") as TMajor,
    }),
  );

  return (
    <div className="mt-[25vh] flex flex-col items-center">
      <div className={cn("w-[23rem]")}>
        <FormStep step="1" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <p className=" text-center text-2xl font-bold tracking-tight">
              Tell Us About Yourself
            </p>
            <FormField
              control={form.control}
              name="user_display_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-muted-foreground"
                      id="username"
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
              name="user_class_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Year</FormLabel>
                  <FormControl>
                    <SelectContainer
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Class Year"
                          className="text-muted-foreground"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {classYear.map((year, i) => (
                          <SelectItem
                            key={"select-" + i}
                            value={year.toLowerCase().replace(" ", "_")}
                          >
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectContainer>
                  </FormControl>
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
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-0 min-w-full justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                            {field.value
                              ? items.find((item) => item.value === field.value)
                                  ?.label
                              : "Select major"}
                          </p>

                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className=" p-0">
                      <Command>
                        <CommandInput placeholder="Search major..." />
                        <ScrollArea className="h-[14rem] w-full rounded-md border">
                          <CommandEmpty>No major found.</CommandEmpty>
                          <CommandGroup>
                            {items.map((item) => (
                              <CommandItem
                                value={item.value}
                                key={item.value}
                                onSelect={() => {
                                  form.setValue("user_major", item.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    item.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {item.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" grid w-full grid-cols-2 gap-4">
              <SignOutButton
                type="button"
                className={`w-full ${buttonVariants({ variant: "default" })}`}
              />

              <Button
                type="submit"
                className=" w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}