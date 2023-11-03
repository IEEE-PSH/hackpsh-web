"use client";

import { cn } from "@/app/_lib/client-utils";
import { PersonalDetailsFormSchema, type TPersonalDetailsForm } from "@/app/_lib/zod-schemas/forms/onboarding/personal-details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Icons } from "../ui/icons";
import { Button } from "../ui/button";

type OnboardingPersonalDetailsFormProps = React.HTMLAttributes<HTMLDivElement>;

export default function OnboardingPersonalDetailsForm({ className, ...props }: OnboardingPersonalDetailsFormProps) {
  // Form Definition
  const form = useForm<TPersonalDetailsForm>({
    resolver: zodResolver(PersonalDetailsFormSchema),
  });

  function onSubmit(values: TPersonalDetailsForm) {
    console.log(values.user_display_name);
    console.log(values.user_class_year);
    console.log(values.user_major);
  }

  return (
    <div className={cn("grid-gap-6", className)} {...props}>
      <Form {...form}>
        <form
          id="onboardingPersonalDetailsForm"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
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

// const classYear = [
//   "N/A",
//   "Middle School",
//   "High School",
//   "Freshman",
//   "Sophmore",
//   "Junior",
//   "Senior",
//   "Graduate",
//   "Post Graduate",
// ];
// const classYearSelects: Array<unknown> = [];
// classYear.forEach((year) =>
//   classYearSelects.push(
//     <SelectItem value={year.toLowerCase().replace(" ", "_")}>
//       {year}
//     </SelectItem>,
//   ),
// );
// const majors = [
//   "N/A",
//   "Accounting",
//   "American Studies",
//   "Biobehavioral Health",
//   "Biology",
//   "Civil Engineering",
//   "Communication Sciences and Disorders",
//   "Communications",
//   "Computer Science",
//   "Criminal Justice",
//   "Cybersecurity Analytics and Operations",
//   "Electrical Engineering",
//   "Electrical Engineering Technology",
//   "Elementary Education",
//   "English",
//   "Enterprise Technology Integration",
//   "Finance",
//   "Health Policy and Administration",
//   "Human Capital Management",
//   "Human Development and Family Studies",
//   "Human-Centered Design and Development",
//   "Humanities",
//   "Information Sciences and Technology",
//   "Information Systems",
//   "Kinesiology",
//   "Management",
//   "Marketing",
//   "Mathematical Sciences",
//   "Mechanical Engineering",
//   "Mechanical Engineering Technology",
//   "Nursing (Second Degree)",
//   "Political Science",
//   "Project and Supply Chain Management",
//   "Psychology",
//   "Public Policy",
//   "Science",
//   "Secondary Education English",
//   "Secondary Education Mathematics",
//   "Secondary Education Social Studies",
//   "Security and Risk Analysis",
//   "Sociology",
//   "Structural Design & Construction Engineering Technology",
// ];
// const items: Array<{ label: string; value: TMajor }> = [];
// majors.forEach((major) =>
//   items.push({
//     label: major,
//     value: major.toLowerCase().replaceAll(" ", "_") as TMajor,
//   }),
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
//             name="user_display_name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Display Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     className="border-muted-foreground"
//                     placeholder="CoolHacker123"
//                     {...field}
//                     value={field.value ?? ""}
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   This is your public display name. Please be appropriate.
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
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

//             <Button
//               type="submit"
//               className="w-full "
//               disabled={form.formState.isSubmitting}
//             >
//               {form.formState.isSubmitting && (
//                 <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
//               )}
//               Next
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   </div>
