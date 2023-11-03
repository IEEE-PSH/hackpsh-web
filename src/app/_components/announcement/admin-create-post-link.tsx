import { siteConfig } from "@/app/_config/site";
import { cn } from "@/app/_lib/client-utils";
import { serverTRPC } from "@/app/_trpc/server";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import { Button } from "../ui/button";
import Link from "next/link";

type AdminCreatePostLinkProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export async function AdminCreatePostLink({ className }: AdminCreatePostLinkProps) {
  const supabase = composeServerComponentClient();
  try {
    const user = await getUser(supabase);
    const { get_user_role } = await serverTRPC.user.get_user_role.query({
      user_uuid: user.id
    });

    if (get_user_role === "admin") {
      return (
        <Button className={cn("h-8 mr-4 font-semibold", className)} suppressHydrationWarning asChild>
          <Link href={siteConfig.paths.create_post} scroll={false}>
            <span>Create Post</span>
          </Link>
        </Button>
      )
    }
  } catch (error) {
    console.log(error);
  }
}