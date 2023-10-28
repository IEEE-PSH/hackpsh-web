import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import SignOutButton from "@/app/_components/ui/sign-out-button";

export default function Page() {
  return (
    <div>
      <ProtectedSiteHeader />
      <SignOutButton />
      <p className="m-10 text-center text-3xl font-bold">Dashboard</p>
    </div>
  );
}
