import type { Metadata } from "next";
import { Inter, Manrope, Space_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SpotlightProvider } from "@/components/layout/spotlight-provider";
import "./globals.css";

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
  title: "PatternBase Docs",
  description: "Design system documentation for PatternBase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${manrope.variable} ${spaceMono.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <SpotlightProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
