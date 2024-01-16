import PublicSiteHeader from "@/app/_components/nav/public-site-header";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners | HackPSH",
  description: "Our partners help us make this event! Please consider partnerring with us.",
}

export default function Page() {
  return (
    <div>
      <PublicSiteHeader />

      <p className="m-10 text-3xl font-bold text-center">Partners</p>
    </div>
  );
}
