"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "../ui/button";
import { siteConfig } from "@/app/_config/site";

/*
this notifies users if a new announcement is posted
*/
export default function AnnouncementNotifer() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const pathname = usePathname();

  useEffect(() => {
    const channel = supabase.channel("announcement").on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "app_schema",
        table: "app_announcement",
      },
      () => {
        router.refresh();
        if (pathname === siteConfig.paths.create_post) {
          router.push(siteConfig.paths.announcements);
          return;
        }

        const announcementToast = toast({
          variant: "default",
          title: "A new announcement was created.",
          duration: 6000,
          action: (
            <Button
              variant="outline"
              onClick={() => {
                router.push(siteConfig.paths.announcements);
                announcementToast.dismiss();
              }}
            >
              View
            </Button>
          ),
        });
      },
    );

    channel.subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [router, supabase, pathname]);

  return <></>;
}
