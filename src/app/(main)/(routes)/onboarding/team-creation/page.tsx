import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import TeamFormWrapper from "@/app/_components/onboarding/team-form-wrapper"
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding | Team Creation | HackPSH",
  description: "Create or Join a Team!",
}

export default function Page() {
  return (
    <>
      <ProtectedSiteHeader />
      <div className="container relative flex-col items-center justify-center space-y-6">
        <h1 className="mt-10 mb-10 text-3xl font-bold text-center">Team Creation</h1>
        <TeamFormWrapper />
      </div>
    </>
  )
}