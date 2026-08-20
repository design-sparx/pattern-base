import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono as geistMonoFont,
  Space_Grotesk as spaceGroteskFont,
} from "next/font/google";

import { theme } from "./theme";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import { AppShellLayout } from "@/components/layout/app-shell-layout";
import { SpotlightProvider } from "@/components/layout/spotlight-provider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = geistMonoFont({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const spaceGrotesk = spaceGroteskFont({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PatternBase - AI UX Pattern Library",
  description:
    "A multi-framework component library for AI user experience patterns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="PatternBase" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <SpotlightProvider />
          <AppShellLayout>{children}</AppShellLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
