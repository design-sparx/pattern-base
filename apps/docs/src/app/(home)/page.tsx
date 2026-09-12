import type { Metadata } from "next";

import { FeaturedResources } from "./_components/featured-resources";
import { FeaturedSection } from "./_components/featured-section";
import { HomeAnnouncement } from "./_components/home-announcement";
import { OriginManifesto } from "./_components/origin-manifesto";
import { StatsStrip } from "./_components/stats-strip";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { patterns } from "@/data/patterns";

const totalPatterns = patterns.length || 0;

const siteDescription = `Copy-paste React components for ${totalPatterns.toString()} AI UX patterns from shapeof.ai — built on Bootstrap, Ant Design, Mantine, and shadcn/ui.`;

export const metadata: Metadata = {
  title: "PatternBase — AI UX Pattern Library",
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PatternBase — AI UX Pattern Library",
    description: siteDescription,
    url: "/",
    siteName: "PatternBase",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo-transparent.png",
        width: 2000,
        height: 971,
        alt: "PatternBase — AI UX Pattern Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PatternBase — AI UX Pattern Library",
    description: siteDescription,
    images: ["/logo-transparent.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <HomeAnnouncement />

      <div className="app-container pb-12 pt-16 md:pb-12 md:pt-20 lg:pt-20">
        <Badge variant="outline" className="font-mono">
          &lt;AI UX Pattern Library /&gt;
        </Badge>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          The missing UX patterns for{" "}
          <span className="bg-linear-to-r from-primary to-[oklch(0.6_0.2_290)] bg-clip-text text-transparent">
            AI products
          </span>
          , ready to ship.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
          {totalPatterns} interaction patterns distilled from shapeof.ai — each
          implemented for Bootstrap, Ant Design, Mantine, and shadcn/ui. Every
          pattern ships as a self-contained React component with one typed props
          interface across all four libraries, so you can switch UI stacks
          without rewriting your AI features. Browse them here, copy them into
          your product.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" className="rounded-full" asChild>
            <a href="/patterns">Browse patterns</a>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full" asChild>
            <a href="#about">Read the approach</a>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <section className="border-border border-t">
        <div className="app-container py-6">
          <StatsStrip />
        </div>
      </section>

      {/* Featured */}
      <section className="border-border border-t" id="featured">
        <div className="app-container py-12 md:py-14">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <Badge variant="outline" className="mb-2 font-mono">
                Featured patterns
              </Badge>
              <h2 className="text-2xl font-semibold tracking-tight">
                Start here
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                The most impactful AI UX patterns to explore first — spanning
                prompt actions, wayfinders, tuners, governors, and trust
                builders.
              </p>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <a href="/patterns">View all {totalPatterns} →</a>
            </Button>
          </div>

          <FeaturedSection />
        </div>
      </section>

      {/* Origin */}
      <OriginManifesto id="about" />

      {/* Resources */}
      <section className="border-border border-t" id="resources">
        <div className="app-container py-12 md:py-14">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <Badge variant="outline" className="mb-2 font-mono">
                Resources
              </Badge>
              <h2 className="text-2xl font-semibold tracking-tight">
                Where to go next
              </h2>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <a
                href="https://github.com/kelvink96/pattern-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit GitHub →
              </a>
            </Button>
          </div>
          <FeaturedResources />
        </div>
      </section>
    </>
  );
}
