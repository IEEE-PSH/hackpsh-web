import { ModeToggle } from "@/app/_components/ui/mode-toggle";
import SignOutButton from "@/app/_components/ui/sign-out-button";
import { MainNav } from "@/app/_components/nav/main-nav";
import Navbar from "@/app/_components/nav/navbar";
import { SiteHeader } from "@/app/_components/nav/site-header";

export default function Page() {
  return (
    <div>
      <SiteHeader />
      <Navbar />
      <h1 className="text-xl">Dashboard</h1>
      <ModeToggle />
      <SignOutButton />
    </div>
  );
}
