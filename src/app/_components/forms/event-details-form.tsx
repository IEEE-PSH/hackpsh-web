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
} from "@/app/_components/ui/form";
import { Icons } from "@/app/_components/ui/icons";
import { Button } from "@/app/_components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/combo-scroll-popover";
import { CalendarIcon } from "lucide-react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { trpc } from "@/app/_trpc/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getUser } from "@/shared/supabase/auth";
import { toast } from "@/app/_components/ui/use-toast";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  EventDetailsFormSchema,
  type TEventDetailsFormSchema,
} from "@/app/_lib/event-details";

type EventDetailsFormProps = {
  eventDate: string;
  eventStartHour: number;
  eventDuration: number;
};

export default function EventDetailsForm({
  eventDate,
  eventStartHour,
  eventDuration,
}: EventDetailsFormProps) {
  const supabase = createClientComponentClient();

  // Form Definition
  const form = useForm<TEventDetailsFormSchema>({
    resolver: zodResolver(EventDetailsFormSchema),
    defaultValues: {
      event_date: new Date(eventDate),
      event_start_hour: eventStartHour.toString(),
      event_duration: eventDuration.toString(),
    },
  });

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

  async function onSubmit(values: TEventDetailsFormSchema) {
    try {
      const user = await getUser(supabase);

      //fix types
      await updateSettingsMutation.mutateAsync({
        user_uuid: user.id,
        event_date: values.event_date.toDateString(),
        event_start_hour: parseInt(
          values.event_start_hour as unknown as string,
        ),
        event_duration: parseInt(values.event_duration as unknown as string),
      });
    } catch (err: unknown) {
      console.log(err);
      // TODO: Add Logger to capture browser api submission errors
    }
  }

  const format_time_options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };

  return (
    <Form {...form}>
      <form
        id="eventDetailsForm"
        className="flex flex-col space-y-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="event_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        Intl.DateTimeFormat(
                          "en-US",
                          format_time_options,
                        ).format(field.value)
                      ) : (
                        <span>Select a date.</span>
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
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Set the day of the event.</FormDescription>
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
              <Select
                onValueChange={field.onChange}
                defaultValue={eventStartHour.toString()}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>

                <SelectContent>
                  <ScrollArea className="h-80">
                    <SelectGroup>
                      <SelectItem value="0">12:00 AM</SelectItem>
                      <SelectItem value="1">1:00 AM</SelectItem>
                      <SelectItem value="2">2:00 AM</SelectItem>
                      <SelectItem value="3">3:00 AM</SelectItem>
                      <SelectItem value="4">4:00 AM</SelectItem>
                      <SelectItem value="5">5:00 AM</SelectItem>
                      <SelectItem value="6">6:00 AM</SelectItem>
                      <SelectItem value="7">7:00 AM</SelectItem>
                      <SelectItem value="8">8:00 AM</SelectItem>
                      <SelectItem value="9">9:00 AM</SelectItem>
                      <SelectItem value="10">10:00 AM</SelectItem>
                      <SelectItem value="11">11:00 AM</SelectItem>
                      <SelectItem value="12">12:00 PM</SelectItem>
                      <SelectItem value="13">1:00 PM</SelectItem>
                      <SelectItem value="14">2:00 PM</SelectItem>
                      <SelectItem value="15">3:00 PM</SelectItem>
                      <SelectItem value="16">4:00 PM</SelectItem>
                      <SelectItem value="17">5:00 PM</SelectItem>
                      <SelectItem value="18">6:00 PM</SelectItem>
                      <SelectItem value="19">7:00 PM</SelectItem>
                      <SelectItem value="20">8:00 PM</SelectItem>
                      <SelectItem value="21">9:00 PM</SelectItem>
                      <SelectItem value="22">10:00 PM</SelectItem>
                      <SelectItem value="23">11:00 PM</SelectItem>
                      <SelectItem value="24">12:00 PM</SelectItem>
                    </SelectGroup>
                  </ScrollArea>
                </SelectContent>
              </Select>
              <FormDescription>
                Set a time for when the event will start.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="event_duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={eventDuration.toString()}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a duration" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="12">12 Hours</SelectItem>
                    <SelectItem value="24">24 Hours</SelectItem>
                    <SelectItem value="36">36 Hours</SelectItem>
                    <SelectItem value="48">48 Hours</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription>
                Set how long the event will last.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="ml-auto w-full sm:w-32"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Save
        </Button>
      </form>
    </Form>
  );
}
