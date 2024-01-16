import Footer from "@/app/_components/footer/footer";
import PublicSiteHeader from "@/app/_components/nav/public-site-header";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="min-h-screen flex flex-col relative">
        <PublicSiteHeader />
        <div className="pb-[15rem]">
          {children}
        </div>
        <Footer />
      </div>
  );
}
