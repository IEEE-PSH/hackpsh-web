import { SignIn, UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <h1 className="text-xl">Dashboard</h1>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
