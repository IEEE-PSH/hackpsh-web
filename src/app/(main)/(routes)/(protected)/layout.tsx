import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <ProtectedSiteHeader />
      <div className="my-8">{children}</div>
    </div>
  );
}
