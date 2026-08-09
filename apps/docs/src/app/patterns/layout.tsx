import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | PatternBase",
    default: "Patterns | PatternBase",
  },
  description:
    "Browse all 54 AI UX patterns across 5 categories: Prompt Actions, Wayfinders, Tuners, Governors, and Trust Builders.",
};

export default function PatternsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
