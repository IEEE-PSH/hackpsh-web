import Footer from "@/app/_components/footer/footer";
import PublicSiteHeader from "@/app/_components/nav/public-site-header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicSiteHeader />
      {children}
      <Footer />
    </>
  );
}
