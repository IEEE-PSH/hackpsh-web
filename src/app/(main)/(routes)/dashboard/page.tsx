import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | HackPSH",
  description: "Overview your progress within the competition.",
}

export default function DashboardPage() {
  return (
    <div>
      <ProtectedSiteHeader />
      <p className="m-10 text-3xl font-bold text-center">Dashboard</p>
    </div>
  );
}
