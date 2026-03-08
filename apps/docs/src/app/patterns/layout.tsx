import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | AI Vory",
    default: "Patterns | AI Vory",
  },
  description:
    "Browse all 54 AI UX patterns across 5 categories: Prompt Actions, Wayfinders, Tuners, Governors, and Trust Builders.",
};

export default function PatternsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
