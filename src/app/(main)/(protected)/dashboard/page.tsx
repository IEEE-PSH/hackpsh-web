import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | HackPSH",
  description: "Overview your progress within the competition.",
};

export default function DashboardPage() {
  return (
    <div>
      <div className="mt-14 flex w-full flex-col items-center justify-center">
        <p className="mb-10 text-center text-3xl font-bold tracking-tight">
          Dashboard
        </p>
      </div>
    </div>
  );
}
