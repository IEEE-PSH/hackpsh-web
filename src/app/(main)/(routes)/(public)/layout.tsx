import Footer from "@/app/_components/footer/footer";
import PublicSiteHeader from "@/app/_components/nav/public-site-header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-screen pr-[calc(100vw-100%)]">
      <PublicSiteHeader />
      <div className="w-full pb-[24.25rem] sm:pb-[16.25rem]">
        <div className="-mt-16 h-16 w-full bg-background" />
        {children}
      </div>
      <Footer />
    </div>
  );
}
