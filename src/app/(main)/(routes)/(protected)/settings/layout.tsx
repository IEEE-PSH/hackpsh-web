import SettingsNav from "@/app/_components/settings/settings-nav";
import { serverTRPC } from "@/app/_trpc/server";
import { composeServerComponentClient } from "@/server/lib/supabase/server";
import { getUser } from "@/shared/supabase/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);
  const { get_user_role } = await serverTRPC.user.get_user_role.query({
    user_uuid: user.id,
  });

  return (
    <div className="container max-w-5xl">
      <SettingsNav userRole={get_user_role} />
      {children}
    </div>
  );
}
