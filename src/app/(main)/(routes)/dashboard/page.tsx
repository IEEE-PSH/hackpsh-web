import { ModeToggle } from "@/components/ui/mode-toggle";
import SignOutButton from "@/components/ui/sign-out-button";

export default function Page() {
  return (
    <div>
      <h1 className="text-xl">Dashboard</h1>
      <ModeToggle />
      <SignOutButton />
    </div>
  )
}
