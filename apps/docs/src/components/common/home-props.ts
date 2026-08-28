import type { PatternMeta } from "@patternbase/core";

export interface StatsStripItem {
  value: string;
  label: string;
}

export interface StatsStripProps {
  items?: StatsStripItem[];
}

export interface Principle {
  label: string;
  title: string;
  body: string;
}

export interface OriginManifestoProps {
  id?: string;
  kicker?: string;
  title?: string;
  description?: string;
  shapeofHref?: string;
  shapeofLabel?: string;
  principles?: Principle[];
}

export interface CategoryIndexProps {
  categories?: Array<{
    id: string;
    name: string;
    description: string;
    count: number;
  }>;
  getHref?: (id: string) => string;
}

export interface FeaturedPatternsProps {
  patterns?: PatternMeta[];
  getHref?: (slug: string, category: string) => string;
}
