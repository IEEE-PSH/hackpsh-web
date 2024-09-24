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
  const data = await serverTRPC.user.get_all_users.query();

  const supabase = composeServerComponentClient();
  //fix propdrilling user
  const user = await getUser(supabase);

  return (
    <div className="container">
      <UserTable data={data} userUUID={user.id} />
    </div>
  );
}