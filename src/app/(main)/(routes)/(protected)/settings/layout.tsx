import SettingsNav from "@/app/_components/settings/settings-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container max-w-5xl">
      <SettingsNav />
      {children}
    </div>
  );
}
