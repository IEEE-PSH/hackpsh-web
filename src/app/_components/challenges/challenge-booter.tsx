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

  const { data: is_challenges_enabled, refetch } =
    trpc.event.is_challenges_enabled.useQuery();

  const pathname = usePathname();

  // useState to only toast if is_challenges_enabled is different
  const [previousStatus, setPreviousStatus] = useState<boolean | null>(null);

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

          const isChallengesEnabled = await refetch();

          if (isChallengesEnabled.data !== previousStatus) {
            setPreviousStatus(isChallengesEnabled.data!);

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
      },
    );

    channel.subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [is_challenges_enabled, refetch, router, supabase, pathname]);

  return <></>;
}
