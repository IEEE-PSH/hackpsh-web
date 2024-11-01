import ProtectedOnboardingSiteHeader from "@/app/_components/nav/protected-onboarding-site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <ProtectedOnboardingSiteHeader />
      <div className="container mt-16 max-w-xl">{children}</div>
    </div>
  );
}
