import EventDetailsForm from "@/app/_components/forms/event-details-form";
import { serverTRPC } from "@/app/_trpc/server";

export default async function Page() {
  const { event_date, event_start_hour, event_duration } =
    await serverTRPC.event.get_event_details.query();

  return (
    <div className="container my-4">
      <EventDetailsForm
        eventDate={event_date}
        eventStartHour={event_start_hour!}
        eventDuration={event_duration!}
      />
    </div>
  );
}
