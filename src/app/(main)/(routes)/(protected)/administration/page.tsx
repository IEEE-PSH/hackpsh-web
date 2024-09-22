import AdminSettingsForm from "@/app/_components/administration/admin-settings-form";
import { serverTRPC } from "@/app/_trpc/server";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";

export default async function Page() {
  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);

  const { event_date, event_start_hour, event_duration } =
    await serverTRPC.event.get_event_details.query();

  return (
    <div className="container my-4">
      <AdminSettingsForm
        eventDate={event_date}
        eventStartHour={event_start_hour!}
        eventDuration={event_duration!}
      />
    </div>
  );
}
