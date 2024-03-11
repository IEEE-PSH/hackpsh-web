import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen">
      <ProtectedSiteHeader />
      {children}
    </div>
  );
}
