import { type Metadata } from "next";
import { serverTRPC } from "@/app/_trpc/server";
import UserTable from "@/app/_components/settings/user-table";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "User Settings | HackPSH",
  description: "View and modify users.",
};

export default async function UsersPage() {
  const data = await serverTRPC.user.get_all_users.query();
  return (
    <div className="container">
      <UserTable data={data} />
    </div>
  );
}
