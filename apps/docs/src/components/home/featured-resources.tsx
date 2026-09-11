"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Resource {
  id: string;
  type: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
}

interface FeaturedResourcesProps {
  resources?: Resource[];
}

const DEFAULT_RESOURCES: Resource[] = [
  {
    id: "1",
    type: "UPDATES",
    title: "PatternBase v0.2.0 Released",
    excerpt:
      "New streaming output patterns and improved context window components.",
    date: "Aug 2026",
    href: "#",
  },
  {
    id: "2",
    type: "ANNOUNCEMENT",
    title: "shadcn/ui Integration Complete",
    excerpt: "All 54 patterns now have official shadcn/ui implementations.",
    date: "Jul 2026",
    href: "#",
  },
  {
    id: "3",
    type: "TUTORIAL",
    title: "Building AI Chat Interfaces",
    excerpt:
      "A practical guide to implementing multi-turn conversation patterns.",
    date: "Jun 2026",
    href: "#",
  },
  {
    id: "4",
    type: "PATTERN",
    title: "Error Boundary Deep Dive",
    excerpt: "Handling failures gracefully in AI-powered applications.",
    date: "May 2026",
    href: "#",
  },
];

export function FeaturedResources({
  resources = DEFAULT_RESOURCES,
}: FeaturedResourcesProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {resources.map((resource) => (
        <Link key={resource.id} href={resource.href}>
          <Card className="border-border bg-background hover:border-primary h-full transition-colors">
            <Badge variant="outline" className="mb-3 font-mono text-[10px]">
              {resource.type}
            </Badge>
            <h3 className="text-sm font-semibold">{resource.title}</h3>
            <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
              {resource.excerpt}
            </p>
            <p className="text-primary mt-3 font-mono text-xs">
              {resource.date}
            </p>
          </Card>
        </Link>
      ))}
    </div>
  );
}
