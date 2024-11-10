import { type Metadata } from "next";
import { serverTRPC } from "@/app/_trpc/server";
import UserTable from "@/app/_components/settings/user-table";
import { getUser } from "@/shared/supabase/auth";
import { composeServerComponentClient } from "@/server/lib/supabase/server";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "User Settings | HackPSH",
  description: "View and modify users.",
};

export default async function UsersPage() {
  const data = await serverTRPC.user.get_users.query();

  const supabase = composeServerComponentClient();
  const user = await getUser(supabase);

  const userData = await serverTRPC.user.get_user_info.query({
    user_uuid: user.id,
  });

  return (
    <div className="container max-w-5xl">
      <UserTable
        data={data.filter((user) => user.user_role === "participant")}
        userData={userData}
      />
    </div>
  );
}
