"use client";

import { useTheme } from "next-themes";

import styles from "@/components/common/editorial.module.css";
import type { OriginManifestoProps } from "@/components/common/home-props";

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
    <section
      id={id}
      className={`${isDark ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"} py-12 md:py-[72px]`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <span
          className={`${styles.editorialKicker} ${isDark ? "text-violet-400" : "text-violet-600"}`}
        >
          {kicker}
        </span>
        <h2
          className={`${styles.editorialDisplay} mt-4 text-4xl font-light italic leading-tight`}
        >
          {title}
        </h2>
        <p
          className={`mt-4 leading-relaxed ${isDark ? "text-gray-400" : "text-gray-700"}`}
        >
          {description}{" "}
          <a
            href={shapeofHref}
            target="_blank"
            rel="noopener noreferrer"
            className={isDark ? "text-violet-400" : "text-violet-600"}
          >
            {shapeofLabel}
          </a>{" "}
          style on top of your UI library&apos;s primitives — so patterns
          inherit your theme, tokens, and design system instead of fighting
          them.
        </p>
      </div>
      <div className="mx-auto mt-6 max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle.label} className="sm:col-span-1">
              <span
                className={`font-mono text-xs ${isDark ? "text-violet-400" : "text-violet-600"}`}
              >
                {principle.label}
              </span>
              <h4
                className={`mt-1.5 ${isDark ? "text-gray-200" : "text-gray-900"}`}
              >
                {principle.title}
              </h4>
              <p
                className={`mt-1.5 text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {principle.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
