import type { Metadata } from "next";

import { CategoryIndex } from "@/components/home/category-index";
import { FeaturedResources } from "@/components/home/featured-resources";
import { FeaturedSection } from "@/components/home/featured-section";
import { HomeAnnouncement } from "@/components/home/home-announcement";
import { OriginManifesto } from "@/components/home/origin-manifesto";
import { StatsStrip } from "@/components/home/stats-strip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { patterns } from "@/data/patterns";

const totalPatterns = patterns.length;

export const metadata: Metadata = {
  title: "PatternBase — AI UX Pattern Library",
  description: `An open-source React component library codifying ${totalPatterns} AI UX patterns from shapeof.ai into production-ready components for Bootstrap, Ant Design, Mantine, and shadcn/ui.`,
};

export default function HomePage() {
  return (
    <>
      <HomeAnnouncement />

      <div className="mx-auto max-w-7xl px-4 pb-12 pt-16 md:pb-12 md:pt-20 lg:pt-20">
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
          implemented for Bootstrap, Ant Design, Mantine, and shadcn/ui. Browse
          them here, copy them into your product.
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
        <div className="mx-auto max-w-7xl px-4 py-6">
          <StatsStrip />
        </div>
      </section>

      {/* Featured */}
      <section className="border-border border-t" id="featured">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-14">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <Badge variant="outline" className="mb-2 font-mono">
                Featured patterns
              </Badge>
              <h2 className="text-2xl font-semibold tracking-tight">
                Start here
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                The most impactful AI UX patterns to explore first
              </p>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <a href="/patterns">View all {totalPatterns} →</a>
            </Button>
          </div>

          <FeaturedSection />
        </div>
      </section>

      {/* Browse by intent */}
      <section className="border-border border-t">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-14">
          <div className="flex items-start gap-10">
            <div className="hidden w-52 shrink-0 lg:block">
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                On this page
              </p>
              <nav className="mt-3 flex flex-col gap-0.5">
                <a
                  className="border-primary text-primary border-l-2 px-3 py-1 text-xs"
                  href="#featured"
                >
                  Featured patterns
                </a>
                <a
                  className="text-muted-foreground hover:border-primary hover:text-foreground border-l-2 border-transparent px-3 py-1 text-xs"
                  href="#browse"
                >
                  Browse by intent
                </a>
                <a
                  className="text-muted-foreground hover:border-primary hover:text-foreground border-l-2 border-transparent px-3 py-1 text-xs"
                  href="#about"
                >
                  About the library
                </a>
                <a
                  className="text-muted-foreground hover:border-primary hover:text-foreground border-l-2 border-transparent px-3 py-1 text-xs"
                  href="#resources"
                >
                  Resources
                </a>
              </nav>
            </div>
            <div className="flex-1" id="browse">
              <Badge variant="outline" className="mb-2 font-mono">
                Browse by intent
              </Badge>
              <h2 className="text-2xl font-semibold tracking-tight">
                Find what you need
              </h2>
              <div className="mt-6">
                <CategoryIndex />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Origin */}
      <OriginManifesto id="about" />

      {/* Resources */}
      <section className="border-border border-t" id="resources">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-14">
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
