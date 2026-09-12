import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories, patterns } from "@/data/patterns";

const totalPatterns = String(patterns.length);
const totalCategories = String(categories.length);

export const metadata: Metadata = {
  title: "About | PatternBase",
  description: `PatternBase codifies ${totalPatterns} AI UX patterns from shapeof.ai into production-ready, copy-paste React components for Bootstrap, Ant Design, Mantine, and shadcn/ui.`,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | PatternBase",
    description: `PatternBase codifies ${totalPatterns} AI UX patterns from shapeof.ai into production-ready React components across four UI libraries.`,
    url: "/about",
    siteName: "PatternBase",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | PatternBase",
    description: `PatternBase codifies ${totalPatterns} AI UX patterns from shapeof.ai into production-ready React components across four UI libraries.`,
  },
};

export default function AboutPage() {
  return (
    <>
      <div className="app-container pb-12 pt-16 md:pb-16 md:pt-20 lg:pt-20">
        <Badge variant="outline" className="font-mono">
          About
        </Badge>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          The AI UX patterns you need, already built.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
          PatternBase is an open-source React component library that turns
          shapeof.ai&apos;s taxonomy of AI product UX into {totalPatterns}{" "}
          ready-to-use interaction patterns, each implemented for Bootstrap, Ant
          Design, Mantine, and shadcn/ui.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" className="rounded-full" asChild>
            <a href="/patterns">Browse patterns</a>
          </Button>
        </div>
      </div>

      <section className="border-border border-t">
        <div className="app-container py-12 md:py-14">
          <Badge variant="outline" className="mb-2 font-mono">
            What it is
          </Badge>
          <h2 className="text-2xl font-semibold tracking-tight">
            One typed interface, four UI libraries
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            Every pattern ships as a self-contained, fully typed React
            component. The prop interface is defined once in{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 text-sm">
              @patternbase/core
            </code>{" "}
            and implemented identically across four framework packages — so you
            can switch UI stacks without rewriting your AI features. Patterns
            build on each library&apos;s own primitives, inheriting your theme,
            tokens, and design system instead of fighting them.
          </p>
        </div>
      </section>

      <section className="border-border border-t">
        <div className="app-container py-12 md:py-14">
          <Badge variant="outline" className="mb-2 font-mono">
            The patterns
          </Badge>
          <h2 className="text-2xl font-semibold tracking-tight">
            {totalPatterns} patterns across {totalCategories} categories
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/patterns/${cat.id}`}
                className="border-border bg-card hover:border-primary/60 hover:bg-accent group rounded-lg border p-5 no-underline transition-colors"
              >
                <span className="text-xl" aria-hidden="true">
                  {cat.icon}
                </span>
                <h3 className="text-foreground mt-3 font-semibold">
                  {cat.name}
                </h3>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  {cat.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border border-t">
        <div className="app-container pb-12 pt-12 md:pb-16 md:pt-14">
          <Badge variant="outline" className="mb-2 font-mono">
            Origin
          </Badge>
          <h2 className="text-2xl font-semibold tracking-tight">
            Built from a shared taxonomy
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            The pattern set is distilled from research across leading AI
            products, starting from the{" "}
            <a
              href="https://www.shapeof.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              shapeof.ai
            </a>{" "}
            taxonomy. PatternBase follows the same open-source ethos: MIT
            licensed, TypeScript-first, and free to copy into your product.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-full" asChild>
              <a
                href="https://github.com/kelvink96/pattern-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
