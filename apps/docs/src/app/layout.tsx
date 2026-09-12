import type { Metadata } from "next";
import { Inter, Manrope, Space_Mono } from "next/font/google";

import "./globals.css";

import { SpotlightProvider } from "@/components/layout/spotlight-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"], variable: "--font-family" });
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-family-heading",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-family-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://patternbase.dev"),
  title: "PatternBase Docs",
  description: "Design system documentation for PatternBase",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable} ${spaceMono.variable}`}
    >
      <body>
        <TooltipProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            <SpotlightProvider>{children}</SpotlightProvider>
          </ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
