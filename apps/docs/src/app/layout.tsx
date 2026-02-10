import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";

import { theme } from "./theme";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import { AppShellLayout } from "@/components/layout/app-shell-layout";
import { SpotlightProvider } from "@/components/layout/spotlight-provider";

export const metadata: Metadata = {
  title: "AI Vory - AI UX Pattern Library",
  description:
    "A multi-framework component library for AI user experience patterns based on shapeof.ai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <SpotlightProvider />
          <AppShellLayout>{children}</AppShellLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
