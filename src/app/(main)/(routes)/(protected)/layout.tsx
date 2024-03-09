import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-screen pr-[calc(100vw-100%)]">
      <ProtectedSiteHeader />
      <div className="-mt-16 h-16 w-full bg-background" />
      {children}
    </div>
  );
}
