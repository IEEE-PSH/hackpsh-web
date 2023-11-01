import PublicSiteHeader from "@/app/_components/nav/public-site-header";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "About | HackPSH",
  description: "Learn what HackPSH Is about!",
}

export default function AboutPage() {
  return (
    <div>
      <PublicSiteHeader />
      <p className="m-10 text-3xl font-bold text-center">About</p>
    </div>
  );
}
