import { ModeToggle } from "@/app/_components/ui/mode-toggle";
import SignOutButton from "@/app/_components/ui/sign-out-button";
import Navbar from "@/app/_components/nav/navbar";

export default function Page() {
  return (
    <div>
      <Navbar />
      <h1 className="text-xl">Dashboard</h1>
      <ModeToggle />
      <SignOutButton />
    </div>
  );
}
