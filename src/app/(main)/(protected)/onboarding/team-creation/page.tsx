import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import TeamFormWrapper from "@/app/_components/onboarding/team-form-wrapper";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding | Team Creation | HackPSH",
  description: "Create or Join a Team!",
};

export default function Page() {
  return (
    <>
      <div className="container relative flex-col items-center justify-center space-y-6 md:max-w-3xl">
        <h1 className="mb-10 mt-10 text-center text-3xl font-bold">
          Team Creation
        </h1>
        <TeamFormWrapper />
      </div>
    </>
  );
}
