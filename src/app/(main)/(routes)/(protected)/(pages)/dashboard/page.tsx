import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/app/_components/ui/hover-card";
import { Separator } from "@/app/_components/ui/separator";
import { serverTRPC } from "@/app/_trpc/server";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { ChevronRight, CircleHelp, Info } from "lucide-react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | HackPSH",
  description: "Overview your progress within the competition.",
};

export default async function DashboardPage() {
  const supabase = composeServerComponentClient();

  const user = await getUser(supabase);
  const {
    team_name,
    team_join_code,
    team_total_points,
    team_members,
    team_points,
  } = await serverTRPC.user.get_user_team_info.query({
    user_uuid: user.id,
  });

  const { user_display_name } =
    await serverTRPC.user.get_user_dropdown_info.query({ user_uuid: user.id });

  return (
    <div className="container grid max-w-5xl grid-cols-1 gap-y-8">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col space-y-4">
          <Card>
            <CardContent className="grid grid-cols-1 p-6">
              <p className="text-3xl font-semibold ">{user_display_name}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="grid grid-cols-1 p-6">
              <p className="text-md text-muted-foreground">Team</p>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-semibold ">{team_name}</p>
                <ChevronRight className="text-muted-foreground transition hover:translate-x-1 hover:cursor-pointer hover:text-foreground" />
              </div>

              <Separator className="mb-2 mt-4" />

              <p className="text-md text-muted-foreground">Points</p>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <p className="w-fit">{team_total_points}</p>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="m-0 border-0 bg-transparent p-0 shadow-none"
                  >
                    <p>
                      ({team_points}+{team_total_points - team_points!})
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Separator className="mb-2 mt-4" />
              <p className="text-md text-muted-foreground">Members</p>
              {team_members.map((member, i) => (
                <p key={`member-${i}`}>{member.user_display_name}</p>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="grid grid-cols-1 p-0"></CardContent>
        </Card>
      </div>
    </div>
  );
}
