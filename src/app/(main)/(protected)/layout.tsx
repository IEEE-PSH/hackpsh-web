import Footer from "@/app/_components/footer/footer";
import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="min-h-screen flex flex-col relative">
        <ProtectedSiteHeader />
        <div className="pb-[15rem]">
          {children}
        </div>
        <Footer />
      </div>
  );
}
