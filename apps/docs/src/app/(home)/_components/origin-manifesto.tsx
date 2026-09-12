"use client";

import type { OriginManifestoProps } from "./home-props";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { patterns } from "@/data/patterns";

const DEFAULT_PRINCIPLES = [
  {
    label: "P—01",
    title: "Multi-framework",
    body: "Bootstrap, Ant Design, Mantine, and shadcn/ui implementations behind identical prop interfaces.",
  },
  {
    label: "P—02",
    title: "Copy-paste ready",
    body: "Every pattern ships with a live preview and framework-specific snippet. The code is yours.",
  },
  {
    label: "P—03",
    title: "Fully typed",
    body: "Strict TypeScript across packages so all four frameworks stay behaviorally in sync.",
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
  return (
    <section id={id} className="bg-muted py-12 md:py-16">
      <div className="app-container">
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
        <p className="text-muted-foreground mt-3 leading-relaxed">
          {patterns.length} interaction patterns from shapeof.ai, each
          implemented as one typed React component across Bootstrap, Ant Design,
          Mantine, and shadcn/ui — so you can switch UI stacks without rewriting
          your AI features.
        </p>
      </div>
      <div className="app-container mt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {principles.map((principle) => (
            <Card key={principle.label} variant="solid" className="h-full">
              <CardHeader>
                <span className="text-primary font-mono text-xs">
                  {principle.label}
                </span>
                <CardTitle className="text-base font-semibold">
                  {principle.title}
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {principle.body}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
