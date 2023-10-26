import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
import SignOutButton from "@/app/_components/ui/sign-out-button";

export default function Page() {
  return (
    <div>
      <ProtectedSiteHeader />
      <SignOutButton />
    </div>
  );
}
