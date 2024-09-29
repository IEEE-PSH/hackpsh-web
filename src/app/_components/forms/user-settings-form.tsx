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
} from "@/app/_components/ui/form";
import { Icons } from "@/app/_components/ui/icons";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  dbMajors,
  dbSchoolYear,
  type TUserMajor,
  type TUserSchoolYear,
} from "@/db/drizzle/startup_seed";
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
} from "@/app/_components/ui/combo-scroll-popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { trpc } from "@/app/_trpc/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getUser } from "@/shared/supabase/auth";
import { toast } from "@/app/_components/ui/use-toast";
import { Switch } from "../ui/switch";
import { SettingsFormSchema, type TSettingsForm } from "@/app/_lib/settings";
import { Separator } from "../ui/separator";
import { type TSupportUsForm } from "@/app/_lib/zod-schemas/forms/onboarding/support-us";
import { useRouter } from "next/navigation";

type UserSettingsFormProps = {
  userDisplayName: string | null;
  userEmailAddress: string | null;
  userSchoolYear: string | null;
  userMajor: string | null;
  userSupportAdministrative: boolean;
  userSupportTechnical: boolean;
  userTeamName: string | null;
};

export default function UserSettingsForm({
  userDisplayName,
  userEmailAddress,
  userSchoolYear,
  userMajor,
  userSupportAdministrative,
  userSupportTechnical,
  userTeamName,
}: UserSettingsFormProps) {
  const supabase = createClientComponentClient();

  // Form Definition
  const form = useForm<TSettingsForm>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: {
      user_display_name: userDisplayName!,
      user_school_year: dbSchoolYear.includes(userSchoolYear as TUserSchoolYear)
        ? (userSchoolYear as TUserSchoolYear)
        : undefined,

      user_major: dbMajors.includes(userMajor as TUserMajor)
        ? (userMajor as TUserMajor)
        : undefined,
      user_support_administrative: userSupportAdministrative,
      user_support_technical: userSupportTechnical,
    },
  });

  const router = useRouter();

  const updateSettingsMutation = trpc.user.update_user_settings.useMutation({
    onSuccess: () => {
      //refresh to repopulate values on cached pages
      router.refresh();
      toast({
        variant: "success",
        title: "Settings Saved!",
        duration: 4000,
      });
    },
    onError: (error) => {
      toast({
        description: error.message,
        variant: "destructive",
        duration: 6000,
      });
    },
  });

  async function onSubmit(values: TPersonalDetailsForm & TSupportUsForm) {
    try {
      const user = await getUser(supabase);

      await updateSettingsMutation.mutateAsync({
        user_uuid: user.id,
        user_display_name: values.user_display_name,
        user_school_year: values.user_school_year,
        user_major: values.user_major,
        user_support_administrative: values.user_support_administrative,
        user_support_technical: values.user_support_technical,
      });
    } catch (err: unknown) {
      console.log(err);
      // TODO: Add Logger to capture browser api submission errors
    }
  }
  return (
    <Form {...form}>
      <form
        id="onboardingPersonalDetailsForm"
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-8 lg:grid-cols-2"
      >
        <div>
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Personal Details
          </h1>
          <Separator className="my-4" />
          <div className="space-y-8">
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
                      value={field.value ?? userDisplayName ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name. Please be appropriate.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={true}
                  className="border-muted-foreground"
                  placeholder={userEmailAddress!}
                />
              </FormControl>
              <FormDescription>
                This is the email linked to your account. This cannot be
                changed.
              </FormDescription>
              <FormMessage />
            </FormItem>

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
                              {school_year
                                .replace("_", " ")
                                .toLocaleUpperCase()}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select a school year closest to your current academic
                    status.
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
                    <PopoverContent className="h-80 w-96 p-0">
                      <Command>
                        <CommandInput placeholder="Search majors..." />
                        <ScrollArea>
                          <CommandEmpty>
                            Cannot find provided major.
                          </CommandEmpty>
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
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Support Preferences
          </h1>
          <Separator className="my-4" />
          <div className="flex flex-grow flex-col">
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="user_support_administrative"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Administrative
                      </FormLabel>
                      <FormDescription>
                        Help us organize our social events, fundraising, and
                        better our social media!
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="ml-4"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user_support_technical"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Technical</FormLabel>
                      <FormDescription>
                        Help us innovate and develop hardware and software to
                        further our unique experiences! {userSupportTechnical}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="ml-4"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <h1 className="mt-8 text-2xl font-semibold leading-none tracking-tight">
              Team Details
            </h1>
            <Separator className="my-4" />
            <div className="flex h-full flex-grow flex-col space-y-8">
              <FormItem>
                <FormLabel>Team</FormLabel>
                <FormControl>
                  <Input
                    disabled={true}
                    className="border-muted-foreground"
                    placeholder={userTeamName!}
                  />
                </FormControl>
                <FormDescription>
                  This is the team linked to your account. This cannot be
                  changed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>
            <Button
              type="submit"
              className="ml-auto mt-6 w-full sm:w-32"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
