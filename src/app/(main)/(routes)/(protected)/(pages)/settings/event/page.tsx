import EventDetailsForm from "@/app/_components/forms/event-details-form";
import DeleteAllAnnouncementsDialog from "@/app/_components/settings/delete-all-announcements-dialog";
import DeleteAllChallengesDialog from "@/app/_components/settings/delete-all-challenges-dialog";
import DeleteAllParticipantsDialog from "@/app/_components/settings/delete-all-participants-dialog";
import DeleteAllTeamsDialog from "@/app/_components/settings/delete-all-teams-dialog";
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
    <div className="grid gap-4 sm:container">
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
          <div className="flex flex-grow flex-col justify-between space-y-4">
            <div className="flex flex-col justify-between gap-x-4 space-y-6 sm:flex-row sm:items-center sm:space-y-0">
              <div>
                <Label>Delete all announcements</Label>
                <p className="mt-2 text-sm text-muted-foreground">
                  Delete all posts from the Announcements page.
                </p>
              </div>
              <DeleteAllAnnouncementsDialog />
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col justify-between gap-x-4 space-y-6 sm:flex-row sm:items-center sm:space-y-0">
              <div>
                <Label>Delete all teams</Label>
                <p className="mt-2 text-sm text-muted-foreground">
                  Delete all teams. This will kick all members from teams.
                </p>
              </div>
              <DeleteAllTeamsDialog />
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col justify-between gap-x-4 space-y-6 sm:flex-row sm:items-center sm:space-y-0">
              <div>
                <Label>Delete all participants</Label>
                <p className="mt-2 text-sm text-muted-foreground">
                  Delete all users with the participant role.
                </p>
              </div>

              <DeleteAllParticipantsDialog />
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col justify-between gap-x-4 space-y-6 sm:flex-row sm:items-center sm:space-y-0">
              <div>
                <Label>Delete all challenges</Label>
                <p className="mt-2 text-sm text-muted-foreground">
                  Delete all challenges from the Challenges page.
                </p>
              </div>
              <DeleteAllChallengesDialog />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
