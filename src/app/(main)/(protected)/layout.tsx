import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ProtectedSiteHeader />
      <div className="pb-[15rem]">{children}</div>
    </div>
  );
}
