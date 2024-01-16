import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | HackPSH",
  description: "Overview your progress within the competition.",
};

export default function DashboardPage() {
  return (
    <div>
      <p className="mb-10 text-center text-3xl font-bold">Dashboard</p>
    </div>
  );
}
