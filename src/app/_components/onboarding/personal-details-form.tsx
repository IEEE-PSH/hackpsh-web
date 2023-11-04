"use client";

import { cn } from "@/app/_lib/client-utils";
import { PersonalDetailsFormSchema, type TPersonalDetailsForm } from "@/app/_lib/zod-schemas/forms/onboarding/personal-details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Icons } from "../ui/icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { dbMajors, dbSchoolYear } from "@/db/drizzle/startup_seed";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/combo-scroll-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

type OnboardingPersonalDetailsFormProps = React.HTMLAttributes<HTMLDivElement>;

export default function OnboardingPersonalDetailsForm({ className, ...props }: OnboardingPersonalDetailsFormProps) {
  // Form Definition
  const form = useForm<TPersonalDetailsForm>({
    resolver: zodResolver(PersonalDetailsFormSchema),
  });

  function onSubmit(values: TPersonalDetailsForm) {
    console.log(values.user_display_name);
    console.log(values.user_school_year);
    console.log(values.user_major);
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
                        className={cn("justify-between", !field.value && "text-muted-foreground")}
                      >
                        {field.value
                          ? dbSchoolYear.find(
                            (school_year) => school_year === field.value
                          )?.replace("_", " ").toLocaleUpperCase()
                          : "Select school year"}
                        <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search school year..." />
                      <CommandEmpty>Cannot find provided school year.</CommandEmpty>
                      <CommandGroup>
                        {dbSchoolYear.map((school_year) => (
                          <CommandItem
                            value={school_year}
                            key={school_year}
                            onSelect={() => {
                              form.setValue("user_school_year", school_year)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                school_year === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
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
                        className={cn("justify-between", !field.value && "text-muted-foreground")}
                      >
                        {field.value
                          ? dbMajors.find(
                            (major_name) => major_name === field.value
                          )?.replaceAll("_", " ").toLocaleUpperCase()
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
                                form.setValue("user_major", major_name)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  major_name === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {major_name.replaceAll("_", " ").toLocaleUpperCase()}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select a major that you are pursuing or the most interested in.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
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

// const router = useRouter();


// classYear.forEach((year) =>
//   classYearSelects.push(
//     <SelectItem value={year.toLowerCase().replace(" ", "_")}>
//       {year}
//     </SelectItem>,
//   ),
// );

// return (
//   <div className="mt-[25vh] flex flex-col items-center">
//     <div className={cn("w-[23rem]")}>
//       <FormStep step="1" />
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           <p className="text-2xl font-bold tracking-tight text-center ">
//             Tell Us About Yourself
//           </p>

//           <FormField
//             control={form.control}
//             name="user_class_year"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Class Year</FormLabel>
//                 <FormControl>
//                   <SelectContainer
//                     onValueChange={field.onChange}
//                     defaultValue={field.value ?? ""}
//                   >
//                     <SelectTrigger className="w-full">
//                       <SelectValue
//                         placeholder="Class Year"
//                         className="text-muted-foreground"
//                       />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {classYear.map((year, i) => (
//                         <SelectItem
//                           key={"select-" + i}
//                           value={year.toLowerCase().replaceAll(" ", "_")}
//                         >
//                           {year}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </SelectContainer>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="user_major"
//             render={({ field }) => (
//               <FormItem className="flex flex-col">
//                 <FormLabel>Major</FormLabel>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <FormControl>
//                       <Button
//                         variant="outline"
//                         role="combobox"
//                         className={cn(
//                           "w-0 min-w-full justify-between",
//                           !field.value && "text-muted-foreground",
//                         )}
//                       >
//                         <p className="overflow-hidden text-ellipsis whitespace-nowrap">
//                           {field.value
//                             ? items.find((item) => item.value === field.value)
//                               ?.label
//                             : "Select major"}
//                         </p>

//                         <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>
//                   <PopoverContent align="start" className="w-[23rem] p-0">
//                     <Command>
//                       <CommandInput placeholder="Search major..." />
//                       <ScrollArea className="h-[14rem] w-full rounded-md border">
//                         <CommandEmpty>No major found.</CommandEmpty>
//                         <CommandGroup>
//                           {items.map((item) => (
//                             <CommandItem
//                               value={item.value}
//                               key={item.value}
//                               onSelect={() => {
//                                 form.setValue("user_major", item.value);
//                               }}
//                             >
//                               <Check
//                                 className={cn(
//                                   "mr-2 h-4 w-4",
//                                   item.value === field.value
//                                     ? "opacity-100"
//                                     : "opacity-0",
//                                 )}
//                               />
//                               {item.label}
//                             </CommandItem>
//                           ))}
//                         </CommandGroup>
//                       </ScrollArea>
//                     </Command>
//                   </PopoverContent>
//                 </Popover>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="grid w-full grid-cols-2 gap-4 ">
//             <Link
//               className={cn(
//                 `w-full ${buttonVariants({ variant: "default" })}`,
//               )}
//               href="/"
//             >
//               Back
//             </Link>

//           </div>
//         </form>
//       </Form>
//     </div>
//   </div>
