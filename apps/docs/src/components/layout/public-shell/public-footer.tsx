import { IconSparkles } from "@tabler/icons-react";
import Link from "next/link";

import { getNavCategories } from "@/lib/public-shell";

const resources = [
  { label: "About", href: "/about", external: false },
  { label: "Contact", href: "/contact", external: false },
  { label: "Changelog", href: "/changelog", external: false },
  { label: "Privacy", href: "/privacy", external: false },
  { label: "Patterns index", href: "/patterns", external: false },
  {
    label: "GitHub",
    href: "https://github.com/kelvink96/pattern-base",
    external: true,
  },
];

export function PublicFooter() {
  const categories = getNavCategories();
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-background border-t">
      <div className="app-container grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="text-foreground flex items-center gap-2">
            <IconSparkles
              size={22}
              className="text-primary"
              aria-hidden="true"
            />
            <span className="font-bold">PatternBase</span>
          </Link>
          <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-relaxed">
            An open-source React component library codifying 54 AI UX patterns
            into production-ready components for four UI libraries.
          </p>
        </div>

        <div>
          <h3 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            Patterns
          </h3>
          <ul className="mt-4 space-y-2.5">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={cat.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            Resources
          </h3>
          <ul className="mt-4 space-y-2.5">
            {resources.map((res) => (
              <li key={res.label}>
                {res.external ? (
                  <a
                    href={res.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {res.label}
                  </a>
                ) : (
                  <Link
                    href={res.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {res.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-border border-t">
        <div className="app-container text-muted-foreground flex flex-col items-center justify-between gap-2 py-4 text-xs sm:flex-row">
          <p>© {year} PatternBase</p>
          <p>Built with shadcn/ui</p>
        </div>
      </div>
    </footer>
  );
}
