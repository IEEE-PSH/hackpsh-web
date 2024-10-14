"use client";
import { trpc } from "@/app/_trpc/react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { siteConfig } from "@/app/_config/site";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
          const isChallengesEnabled = await refetch();
          if (!isChallengesEnabled.data) {
            toast({
              variant: "default",
              title: "Challenges are now disabled.",
              duration: 4000,
            });

            if (pathname.startsWith(siteConfig.paths.solve))
              router.push(siteConfig.paths.challenges);
          } else {
            toast({
              variant: "default",
              title: "Challenges are now enabled.",
              duration: 4000,
            });
          }
          router.refresh();
        })();
      },
    );

    channel.subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [is_challenges_enabled, refetch, router, supabase]);

  return <></>;
}
