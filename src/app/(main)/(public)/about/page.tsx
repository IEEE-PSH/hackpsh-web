import PublicSiteHeader from "@/app/_components/nav/public-site-header";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "About | HackPSH",
  description: "Learn what HackPSH Is about!",
};

export default function Page() {
  return (
    <div>
      <p className="m-10 text-center text-3xl font-bold">About</p>
    </div>
  );
}
