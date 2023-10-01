import { UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <h1 className="text-xl">Onboarding</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
