import ProtectedOnboardingSiteHeader from "@/app/_components/nav/protected-onboarding-site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <ProtectedOnboardingSiteHeader />
      <div className="container max-w-xl py-16">{children}</div>
    </div>
  );
}
