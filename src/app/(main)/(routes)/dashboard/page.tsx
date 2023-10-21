import { ModeToggle } from "@/app/_components/ui/mode-toggle";
import SignOutButton from "@/app/_components/ui/sign-out-button";

export default function Page() {
  return (
    <div>
      <h1 className="text-xl">Dashboard</h1>
      <ModeToggle />
      <SignOutButton />
    </div>
  )
}
