import EventDetailsForm from "@/app/_components/forms/event-details-form";
import DeleteAllAnnouncementsDialog from "@/app/_components/settings/delete-all-announcements-dialog";
import DeleteAllParticipantsDialog from "@/app/_components/settings/delete-all-participants-dialog";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Label } from "@/app/_components/ui/label";
import { Separator } from "@/app/_components/ui/separator";
import { serverTRPC } from "@/app/_trpc/server";

export default async function Page() {
  const {
    event_date,
    event_start_hour,
    event_duration,
    event_challenges_enabled,
  } = await serverTRPC.event.get_event_details.query();

  return (
    <div className="grid grid-cols-1 gap-4 sm:container lg:grid-cols-2">
      <Card className="border-0 sm:border">
        <CardContent className="p-8">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Event Details
          </h1>
          <Separator className="my-4" />
          <EventDetailsForm
            eventDate={event_date}
            eventStartHour={event_start_hour}
            eventDuration={event_duration}
            eventChallengesEnabled={event_challenges_enabled}
          />
        </CardContent>
      </Card>
      <Card className="border-0 sm:border">
        <CardContent className="flex h-full flex-col p-8">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Danger Zone
          </h1>
          <Separator className="my-4" />
          <div className="flex flex-grow flex-col justify-between space-y-6">
            <div className="flex flex-col">
              <Label>Delete All Announcements</Label>
              <p className="mt-2 text-sm text-muted-foreground">
                This will remove all posts from the Announcements page.
              </p>
              <DeleteAllAnnouncementsDialog />
            </div>
            <div className="flex flex-col">
              <Label>Delete All Participants</Label>
              <p className="mt-2 text-sm text-muted-foreground">
                Delete all users with the participant role.
              </p>
              <DeleteAllParticipantsDialog />
            </div>
            <div className="flex flex-col">
              <Label>Delete All Teams (Not Yet Implemented)</Label>
              <p className="mt-2 text-sm text-muted-foreground">
                Delete all teams and their members. This is useful in resetting
                all users and teams before a new event.
              </p>
              <Button
                variant="secondary"
                className="ml-auto mt-6 w-full sm:w-auto"
                disabled={true}
              >
                Delete All Teams
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
