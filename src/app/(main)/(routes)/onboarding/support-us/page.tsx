import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import SupportUsForm from "@/app/_components/onboarding/support-us";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding | Support Us | HackPSH",
  description: "Help us make our event better!",
}

export default function Page() {
  return (
    <>
      <ProtectedSiteHeader />
      <div className="container relative flex-col items-center justify-center space-y-6">
        <h1 className="mt-10 mb-10 text-3xl font-bold text-center">Support IEEE!</h1>
        <SupportUsForm />
      </div>
    </>
  )
}