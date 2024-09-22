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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/combo-scroll-popover";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { trpc } from "@/app/_trpc/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getUser } from "@/shared/supabase/auth";
import { toast } from "@/app/_components/ui/use-toast";
import { Switch } from "../ui/switch";
import { SettingsFormSchema, type TSettingsForm } from "@/app/_lib/settings";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { TEventDetailsForm } from "@/app/_lib/event-details";

const dbTime = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24,
];

export default function UserSettingsForm() {
  const supabase = createClientComponentClient();

  // Form Definition
  const form = useForm<TEventDetailsForm>({
    resolver: zodResolver(SettingsFormSchema),
    // defaultValues: {
    //   event_date
    // },
  });

  const router = useRouter();

  const updateSettingsMutation = trpc.event.update_event_details.useMutation({
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Event Details Updated!",
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

  async function onSubmit(values: TEventDetailsForm) {
    try {
      const user = await getUser(supabase);

      await updateSettingsMutation.mutateAsync({
        user_uuid: user.id,
        event_date: values.event_date,
        event_start_hour: values.event_start_hour,
        event_end_hour: values.event_end_hour,
      });
    } catch (err: unknown) {
      console.log(err);
      // TODO: Add Logger to capture browser api submission errors
    }
  }

  function getReadableHour(hour: number) {
    let calc, period;
    if (hour < 13) {
      if (hour == 0) calc = 12;
      else calc = hour;
      period = "AM";
    } else {
      calc = hour - 12;
      period = "PM";
    }
    return calc + ":00 " + period;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardContent className="p-8">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Event Details
          </h1>
          <Separator className="my-4" />
          <Form {...form}>
            <form id="eventDetailsForm" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-8">
                <FormField
                  control={form.control}
                  name="event_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                "test" //change
                              ) : (
                                <span>Select a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        This determines the date of the event.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="event_start_hour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <Select>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>

                        <SelectContent>
                          <ScrollArea className="h-80">
                            <SelectGroup>
                              {dbTime.map((time) => (
                                <SelectItem key={time} value={String(time)}>
                                  {getReadableHour(time)}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="event_end_hour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <Select>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>

                        <SelectContent>
                          <ScrollArea className="h-80">
                            <SelectGroup>
                              {dbTime.map((time) => (
                                <SelectItem key={time} value={String(time)}>
                                  {getReadableHour(time)}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="ml-auto w-32"
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
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-8">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Database
          </h1>
          <Separator className="my-4" />
        </CardContent>
      </Card>
    </div>
  );
}
