import EventDetailsForm from "@/app/_components/forms/event-details-form";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { serverTRPC } from "@/app/_trpc/server";

export default async function Page() {
  const { event_date, event_start_hour, event_duration } =
    await serverTRPC.event.get_event_details.query();

  return (
    <div>
      <Card>
        <CardContent className="p-8">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Event Details
          </h1>
          <Separator className="my-4" />
          <EventDetailsForm
            eventDate={event_date}
            eventStartHour={event_start_hour}
            eventDuration={event_duration}
          />
        </CardContent>
      </Card>
    </div>
  );
}
