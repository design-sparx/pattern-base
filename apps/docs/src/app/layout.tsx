import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import {
  Fraunces,
  Geist_Mono as geistMonoFont,
  Inter,
  Space_Grotesk as spaceGroteskFont,
} from "next/font/google";

import { theme } from "./theme";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import { AppShellLayout } from "@/components/layout/app-shell-layout";
import { SpotlightProvider } from "@/components/layout/spotlight-provider";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
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

const BASE_URL = "https://patternbase.dev";

export const metadata: Metadata = {
  title: {
    template: "%s | PatternBase",
    default: "PatternBase - AI UX Pattern Library",
  },
  description:
    "A multi-framework component library for AI user experience patterns. 54 battle-tested patterns for Bootstrap, Ant Design, and Mantine.",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PatternBase",
    title: "PatternBase - AI UX Pattern Library",
    description:
      "54 battle-tested AI UX patterns for React — implemented in Bootstrap, Ant Design, and Mantine.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "PatternBase — AI UX Pattern Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PatternBase - AI UX Pattern Library",
    description:
      "54 battle-tested AI UX patterns for React — implemented in Bootstrap, Ant Design, and Mantine.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
      className={`${fraunces.variable} ${inter.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
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
