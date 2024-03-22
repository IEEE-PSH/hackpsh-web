import Footer from "@/app/_components/footer/footer";
import PublicSiteHeader from "@/app/_components/nav/public-site-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicSiteHeader />
      {children}
      <Footer />
    </>
  );
}
