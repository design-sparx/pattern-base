"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { patterns } from "@/data/patterns";

const totalPatterns = patterns.length;

interface Resource {
  id: string;
  type: string;
  title: string;
  excerpt: string;
  meta: string;
  href: string;
  external?: boolean;
}

interface FeaturedResourcesProps {
  resources?: Resource[];
}

const DEFAULT_RESOURCES: Resource[] = [
  {
    id: "releases",
    type: "CHANGELOG",
    title: "PatternBase on GitHub",
    excerpt: "Releases, changelog, and the roadmap for the library.",
    meta: "github.com/kelvink96/pattern-base/releases",
    href: "https://github.com/kelvink96/pattern-base/releases",
    external: true,
  },
  {
    id: "source",
    type: "SOURCE",
    title: "Open source",
    excerpt: "MIT-licensed code across four framework packages.",
    meta: "github.com/kelvink96/pattern-base",
    href: "https://github.com/kelvink96/pattern-base",
    external: true,
  },
  {
    id: "taxonomy",
    type: "TAXONOMY",
    title: "The shapeof.ai taxonomy",
    excerpt: "The research these patterns were distilled from.",
    meta: "shapeof.ai",
    href: "https://www.shapeof.ai",
    external: true,
  },
  {
    id: "index",
    type: "INDEX",
    title: "Pattern index",
    excerpt: `All ${totalPatterns} patterns across five categories.`,
    meta: "/patterns",
    href: "/patterns",
  },
];

export function FeaturedResources({
  resources = DEFAULT_RESOURCES,
}: FeaturedResourcesProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {resources.map((resource) => (
        <Card
          key={resource.id}
          className="border-border bg-background hover:border-primary h-full p-5 transition-colors"
        >
          <Badge variant="outline" className="mb-3 font-mono text-[10px]">
            {resource.type}
          </Badge>
          <h3 className="text-sm font-semibold">{resource.title}</h3>
          <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
            {resource.excerpt}
          </p>
          {resource.external ? (
            <a
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary mt-3 block font-mono text-xs no-underline hover:underline"
            >
              {resource.meta} ↗
            </a>
          ) : (
            <Link
              href={resource.href}
              className="text-primary mt-3 block font-mono text-xs no-underline hover:underline"
            >
              {resource.meta}
            </Link>
          )}
        </Card>
      ))}
    </div>
  );
}
