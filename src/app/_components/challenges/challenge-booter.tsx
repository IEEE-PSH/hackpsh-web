"use client";
import { trpc } from "@/app/_trpc/react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { siteConfig } from "@/app/_config/site";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "../ui/button";

/*
this notifies users when challenges are enabled/disabled
users will be booted off challenges if they are disabled
*/
export default function ChallengeBooter() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const { data: is_challenges_enabled, refetch: refetchChallengeStatus } =
    trpc.event.is_challenges_enabled.useQuery();
  const { data: is_team_creation_enabled, refetch: refetchTeamCreationStatus } =
    trpc.event.is_team_creation_enabled.useQuery();
  const pathname = usePathname();

  const [oldTeamCreationStatus, setOldTeamCreationStatus] = useState<
    boolean | null
  >(null);
  //useState to only toast if is_challenges_enabled is different
  const [oldChallengeStatus, setOldChallengeStatus] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    const channel = supabase.channel("event").on(
      "postgres_changes",
      {
        event: "*",
        schema: "app_schema",
        table: "app_event",
      },
      () => {
        void (async () => {
          router.refresh();
          if (pathname === siteConfig.paths.event) return;

          //toast if challenge status different
          const isChallengesEnabled = await refetchChallengeStatus();
          if (isChallengesEnabled.data !== oldChallengeStatus) {
            setOldChallengeStatus(isChallengesEnabled.data!);

            if (!isChallengesEnabled.data) {
              toast({
                variant: "default",
                title: "Challenges are now disabled.",
                duration: 6000,
              });

              if (pathname.startsWith(siteConfig.paths.challenge)) {
                router.push(siteConfig.paths.dashboard);
              }
            } else {
              const enabledToast = toast({
                variant: "default",
                title: "Challenges are now enabled.",
                duration: 6000,
                action: pathname.startsWith(siteConfig.paths.dashboard) ? (
                  <></>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      router.push(siteConfig.paths.dashboard);
                      enabledToast.dismiss();
                    }}
                  >
                    View
                  </Button>
                ),
              });
            }
          }
        })();

        void (async () => {
          router.refresh();
          if (pathname === siteConfig.paths.event) return;

          //toast if team creation status different
          const isTeamCreationEnabled = await refetchTeamCreationStatus();
          if (isTeamCreationEnabled.data !== oldTeamCreationStatus) {
            setOldTeamCreationStatus(isTeamCreationEnabled.data!);

            if (!isTeamCreationEnabled.data) {
              toast({
                variant: "default",
                title: "Team creation is now disabled.",
                duration: 6000,
              });
            } else {
              const enabledToast = toast({
                variant: "default",
                title: "Team creation is now enabled.",
                duration: 6000,
                action: pathname.startsWith(siteConfig.paths.join_team) ? (
                  <></>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      router.push(siteConfig.paths.join_team);
                      enabledToast.dismiss();
                    }}
                  >
                    View
                  </Button>
                ),
              });
            }
          }
        })();
      },
    );

    channel.subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [
    is_challenges_enabled,
    is_team_creation_enabled,
    refetchTeamCreationStatus,
    refetchChallengeStatus,
    router,
    supabase,
    pathname,
  ]);

  return <></>;
}
