import Footer from "@/app/_components/footer/footer";
import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProtectedSiteHeader />
      {children}
      <Footer />
    </>
  );
}
