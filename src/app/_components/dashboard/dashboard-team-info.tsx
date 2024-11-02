import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Card, CardContent } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronRight } from "lucide-react";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { serverTRPC } from "@/app/_trpc/server";
import { Button } from "../ui/button";
import Link from "next/link";
import { siteConfig } from "@/app/_config/site";

export default async function DashboardTeamInfo() {
  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);

  const { is_on_team } = await serverTRPC.user.is_on_team.query({
    user_uuid: user.id,
  });

  if (is_on_team) {
    const { team_name, team_total_points, team_points } =
      await serverTRPC.user.get_user_team_info.query({
        user_uuid: user.id,
      });
    return (
      <Card>
        <CardContent className="grid grid-cols-3 p-6 text-sm">
          <div className="col-span-2">
            <p className="text-md text-muted-foreground">Team</p>
            <div className="flex items-center justify-between">
              <p className="w-fit text-xl font-semibold">{team_name}</p>
            </div>
          </div>

          <div>
            <p className="text-md text-muted-foreground">Points</p>
            <div className="flex items-center justify-between">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <p className="w-fit text-xl font-semibold">
                      {team_total_points}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="m-0 border-0 bg-transparent p-0 shadow-none"
                  >
                    <p>
                      ({team_points}+{team_total_points - team_points})
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Link href={siteConfig.paths.join_team}>
                <ChevronRight className="text-muted-foreground transition hover:translate-x-1 hover:cursor-pointer hover:text-foreground" />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="flex h-full items-center justify-between gap-4 p-6 text-sm">
        <p className="text-md text-muted-foreground">
          You must be on a team to participate in challenges.
        </p>
        <Link href={siteConfig.paths.join_team}>
          <Button variant="outline" className="w-32">
            Join a team
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
