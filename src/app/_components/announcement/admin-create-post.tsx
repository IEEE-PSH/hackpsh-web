import { serverTRPC } from "@/app/_trpc/server";
import { createClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";
import AdminCreatePostButton from "./admin-create-post-button";

type AdminCreatePostLinkProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default async function AdminCreatePostLink({
  className,
}: AdminCreatePostLinkProps) {
  const supabase = createClient();
  try {
    const user = await getUser(supabase);
    const { get_user_role } = await serverTRPC.user.get_user_role.query({
      user_uuid: user.id,
    });

    if (get_user_role === "admin" || get_user_role === "officer") {
      return <AdminCreatePostButton />;
    }
  } catch (error) {
    console.log(error);
  }
}
