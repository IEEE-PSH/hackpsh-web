import Footer from "@/app/_components/footer/footer";
import ProtectedSiteHeader from "@/app/_components/nav/protected-site-header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="container max-w-xl py-16">{children}</div>;
}
