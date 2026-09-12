import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Privacy Policy | PatternBase",
  description:
    "How PatternBase handles data on the documentation site and in its open-source packages.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | PatternBase",
    description:
      "How PatternBase handles data on the documentation site and in its open-source packages.",
    url: "/privacy",
    siteName: "PatternBase",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | PatternBase",
    description:
      "How PatternBase handles data on the documentation site and in its open-source packages.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="app-container pb-12 pt-16 md:pb-16 md:pt-20 lg:pt-20">
      <Badge variant="outline" className="font-mono">
        Privacy Policy
      </Badge>
      <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight">
        Privacy Policy
      </h1>
      <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed">
        Last updated: 2026
      </p>

      <div className="mt-10 max-w-3xl space-y-10">
        <section>
          <h2 className="text-xl font-semibold tracking-tight">Overview</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            PatternBase is an open-source project. This policy covers the
            documentation website at patternbase.dev and the{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 text-sm">
              @patternbase/*
            </code>{" "}
            npm packages.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            Information this site collects
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            The documentation site is a static site. It does not use cookies,
            run analytics scripts, embed third-party trackers, or require an
            account. Pages are generated ahead of time and served without
            storing anything about you. As with any website, the hosting
            provider&apos;s servers may automatically log standard request
            metadata (such as IP address, user agent, and requested URLs) for
            operational and security purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            Information the npm packages collect
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            The PatternBase packages are UI components only. They run inside
            your application and do not transmit data back to PatternBase, the
            authors, or any third-party server. Any data your application
            handles remains under your control and subject to your own privacy
            practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            Open-source contributions
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            If you contribute to the PatternBase repositories, your GitHub
            username, email address (as configured by GitHub), and the content
            of your contributions become public as part of the open-source
            project.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            Third-party links
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            The site links to external services such as GitHub and shapeof.ai.
            Those services operate under their own privacy policies; we are not
            responsible for their practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">
            Changes and contact
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            We may update this policy as the project evolves. If you have
            questions about it, raise them on the PatternBase issue tracker.
          </p>
        </section>
      </div>
    </div>
  );
}
