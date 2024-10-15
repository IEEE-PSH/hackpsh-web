import "@/app/globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/app/_components/ui/toaster";
import ReactQueryProvider from "@/app/_trpc/react";
import { headers } from "next/headers";
import NextTopLoader from "nextjs-toploader";

const font = GeistSans;

export const metadata: Metadata = {
  title: "HackPSH",
  description: "Built with love by PSH IEEE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/brand.svg" />
      </head>
      <body className={font.className}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          storageKey="hackpsh-theme"
        >
          <ReactQueryProvider headers={headers()}>
            <NextTopLoader
              color="hsl(var(--primary))"
              showSpinner={false}
              height={3}
            />
            {children}
          </ReactQueryProvider>
          <Toaster />
        </NextThemesProvider>
      </body>
    </html>
  );
}
