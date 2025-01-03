import TeamSettings from "@/app/_components/settings/team-settings";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { siteConfig } from "@/app/_config/site";
import { serverTRPC } from "@/app/_trpc/server";
import { createClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import Link from "next/link";

export default async function Page() {
  const supabase = createClient();
  const user = await getUser(supabase);

  const { is_on_team } = await serverTRPC.user.is_on_team.query({
    user_uuid: user.id,
  });

  if (is_on_team) {
    const { is_team_leader } = await serverTRPC.user.is_team_leader.query({
      user_uuid: user.id,
    });
    return <TeamSettings userUUID={user.id} isTeamLeader={is_team_leader!} />;
  }

  return (
    <div className="grid max-w-5xl gap-4 sm:container">
      <Card>
        <CardContent className="flex h-full items-center justify-between gap-4 p-6 text-sm">
          <p className="text-md text-muted-foreground">
            You must be part of a team to view or edit team details.
          </p>
          <Link href={siteConfig.paths.join_team}>
            <Button variant="outline" className="w-32">
              Join a team
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
