import "@/app/globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "@/app/_components/theme-provider";
import { Toaster } from "@/app/_components/ui/toaster";
import ReactQueryProvider from "@/app/_trpc/react";
import { headers } from "next/headers";

const font = GeistSans;

export const metadata: Metadata = {
  title: "HackPSH",
  description: "Built with love by PSH IEEE",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/brand.svg" />
      </head>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          storageKey="hackpsh-theme"
        >
          <ReactQueryProvider headers={headers()}>              
            {children}
          </ReactQueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
