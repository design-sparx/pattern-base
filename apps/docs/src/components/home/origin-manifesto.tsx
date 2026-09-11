"use client";

import { useTheme } from "next-themes";

import type { OriginManifestoProps } from "@/components/common/home-props";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const DEFAULT_PRINCIPLES = [
  {
    label: "P—01",
    title: "Multi-framework",
    body: "Bootstrap, Ant Design, and shadcn/ui implementations behind identical prop interfaces.",
  },
  {
    label: "P—02",
    title: "Copy-paste ready",
    body: "Every pattern ships with a live preview and framework-specific snippet. The code is yours.",
  },
  {
    label: "P—03",
    title: "Fully typed",
    body: "Strict TypeScript across packages so all three frameworks stay behaviorally in sync.",
  },
];

export function OriginManifesto({
  id = "about",
  kicker = "Where it comes from",
  title = "We took shapeof.ai's taxonomy of AI product UX and turned it into production-ready React components.",
  description = "Every pattern is derived from research across leading AI products, then built",
  shapeofHref = "https://www.shapeof.ai",
  shapeofLabel = "shapeof.ai",
  principles = DEFAULT_PRINCIPLES,
}: OriginManifestoProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section id={id} className="bg-muted py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <Badge variant="outline" className="mb-3 font-mono">
          {kicker}
        </Badge>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          {description}{" "}
          <a
            href={shapeofHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            {shapeofLabel}
          </a>{" "}
          style on top of your UI library&apos;s primitives — so patterns
          inherit your theme, tokens, and design system instead of fighting
          them.
        </p>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {principles.map((principle) => (
            <Card
              key={principle.label}
              className="border-border bg-background h-full"
            >
              <span className="text-primary font-mono text-xs">
                {principle.label}
              </span>
              <h4 className="mt-2 font-medium">{principle.title}</h4>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {principle.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
