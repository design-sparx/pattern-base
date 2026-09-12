import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact | PatternBase",
  description:
    "Get in touch with the PatternBase team — report issues, request features, or ask questions on GitHub.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | PatternBase",
    description:
      "Get in touch with the PatternBase team — report issues, request features, or ask questions on GitHub.",
    url: "/contact",
    siteName: "PatternBase",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | PatternBase",
    description:
      "Get in touch with the PatternBase team — report issues, request features, or ask questions on GitHub.",
  },
};

export default function ContactPage() {
  return (
    <div className="app-container pb-12 pt-16 md:pb-16 md:pt-20 lg:pt-20">
      <Badge variant="outline" className="font-mono">
        Contact
      </Badge>
      <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight">
        Get in touch
      </h1>
      <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
        The best way to reach the PatternBase maintainers is through the GitHub
        issue tracker. Whether you found a bug, want a new pattern, or have a
        question about the library, open an issue and we&apos;ll take it from
        there.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button size="lg" className="rounded-full" asChild>
          <a
            href="https://github.com/kelvink96/pattern-base/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open an issue
          </a>
        </Button>
        <Button variant="outline" size="lg" className="rounded-full" asChild>
          <a
            href="https://github.com/kelvink96/pattern-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit GitHub
          </a>
        </Button>
      </div>

      <div className="mt-14 max-w-3xl">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="border-border bg-card rounded-lg border p-5">
            <h2 className="font-semibold">Report a bug</h2>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              Share what you expected, what happened, and a minimal reproduction
              if you can.
            </p>
          </div>
          <div className="border-border bg-card rounded-lg border p-5">
            <h2 className="font-semibold">Request a pattern</h2>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              Missing an AI UX pattern? Suggest it and explain the use case it
              solves.
            </p>
          </div>
          <div className="border-border bg-card rounded-lg border p-5">
            <h2 className="font-semibold">Ask a question</h2>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              Not sure how to use a component? Open an issue and we&apos;ll help
              you get unstuck.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
