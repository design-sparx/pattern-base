import { Box, ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { theme } from "./theme";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
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
          <Header />
          <Sidebar />
          <Box
            component="main"
            style={{
              marginLeft: "var(--sidebar-width)",
              marginTop: "var(--header-height)",
              minHeight: "calc(100vh - var(--header-height))",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box style={{ flex: 1 }}>{children}</Box>
            <Footer />
          </Box>
        </MantineProvider>
      </body>
    </html>
  );
}
