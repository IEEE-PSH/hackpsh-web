import Footer from "@/app/_components/footer/footer";
import PublicSiteHeader from "@/app/_components/nav/public-site-header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <PublicSiteHeader />
      <div className="pb-[26.5rem] sm:pb-[16.25rem]">{children}</div>
      <Footer />
    </div>
  );
}
