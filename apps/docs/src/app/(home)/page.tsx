import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import styles from "@/components/common/editorial.module.css";
import { CategoryIndex } from "@/components/home/category-index";
import { FeaturedPatterns } from "@/components/home/featured-patterns";
import { OriginManifesto } from "@/components/home/origin-manifesto";
import { StatsStrip } from "@/components/home/stats-strip";

export const metadata: Metadata = {
  title: "PatternBase — AI UX Pattern Library",
  description:
    "An open-source React component library codifying 54 AI UX patterns from shapeof.ai into production-ready components for Bootstrap, Ant Design, and shadcn/ui.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-20 md:pb-12 md:pt-20 lg:pt-20">
        <p
          className={`${styles.editorialKicker} text-xs text-violet-600 dark:text-violet-400`}
        >
          An open-source component library
        </p>
        <h1
          className={`${styles.editorialDisplay} mt-4 text-4xl font-extralight leading-tight md:text-5xl lg:text-6xl`}
          style={{ maxWidth: "48rem" }}
        >
          The missing UX patterns for{" "}
          <span className="font-normal italic text-violet-600 dark:text-violet-400">
            AI products,
          </span>{" "}
          ready to ship.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed">
          Fifty-four interaction patterns distilled from shapeof.ai — each
          implemented for Bootstrap, Ant Design, and shadcn/ui. Study them here,
          copy them into your product.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <a href="/patterns">
            <Button
              variant="default"
              size="lg"
              className="rounded-full bg-violet-700 text-white hover:bg-violet-800 dark:bg-violet-600 dark:hover:bg-violet-500"
            >
              Browse patterns
            </Button>
          </a>
          <a
            href="#about"
            className="text-sm font-semibold text-violet-600 dark:text-violet-400"
          >
            Read the approach ↓
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto max-w-7xl px-4 pt-16">
        <StatsStrip />
      </div>

      {/* Featured */}
      <div className="mx-auto max-w-7xl px-4 pt-16">
        <div className="mb-6 flex items-center justify-between">
          <h2
            className={`${styles.editorialDisplay} text-2xl font-extralight md:text-3xl`}
          >
            Featured patterns
          </h2>
          <a
            href="/patterns"
            className="text-sm font-semibold text-violet-600 dark:text-violet-400"
          >
            View all 54 →
          </a>
        </div>
        <FeaturedPatterns />
      </div>

      {/* Category index */}
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-16">
        <h2
          className={`${styles.editorialDisplay} mb-6 text-2xl font-extralight md:text-3xl`}
        >
          Browse by intent
        </h2>
        <CategoryIndex />
      </div>

      {/* Origin (absorbs /about) */}
      <OriginManifesto />
    </>
  );
}
