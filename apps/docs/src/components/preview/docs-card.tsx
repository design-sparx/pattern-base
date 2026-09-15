import { IconBulb, IconCircleCheck, IconTarget } from "@tabler/icons-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PatternExplanation } from "@/data/pattern-explanations";

/** A related pattern resolved to a route; `href` is absent when unresolved. */
export interface RelatedPatternLink {
  label: string;
  href?: string;
}

interface DocsCardProps {
  explanation: PatternExplanation;
  relatedLinks: readonly RelatedPatternLink[];
}

const sectionIconClasses =
  "bg-primary/10 text-primary flex items-center justify-center rounded-md p-1";

export function DocsCard({
  explanation,
  relatedLinks,
}: Readonly<DocsCardProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Docs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {explanation.overview}
          </p>

          {explanation.variants.length ? (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <div className={sectionIconClasses}>
                  <IconBulb size={14} />
                </div>
                <h4 className="text-sm font-semibold">Variants</h4>
              </div>
              <ul className="text-muted-foreground space-y-1 text-sm">
                {explanation.variants.map((v) => (
                  <li key={v.title}>
                    <b className="text-foreground">{v.title}</b> —{" "}
                    {v.description}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {explanation.useCases.length ? (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <div className={sectionIconClasses}>
                  <IconTarget size={14} />
                </div>
                <h4 className="text-sm font-semibold">Use Cases</h4>
              </div>
              <ul className="text-muted-foreground space-y-1 text-sm">
                {explanation.useCases.map((uc) => (
                  <li key={uc}>{uc}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {explanation.bestPractices.length ? (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <div className={sectionIconClasses}>
                  <IconCircleCheck size={14} />
                </div>
                <h4 className="text-sm font-semibold">Best Practices</h4>
              </div>
              <ul className="text-muted-foreground space-y-1 text-sm">
                {explanation.bestPractices.map((bp) => (
                  <li key={bp}>{bp}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {relatedLinks.length ? (
            <div>
              <h4 className="text-sm font-semibold">Related Patterns</h4>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {relatedLinks.map((link) =>
                  link.href ? (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="bg-muted text-foreground hover:bg-primary/10 hover:text-primary inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium no-underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span
                      key={link.label}
                      className="text-muted-foreground bg-muted/60 inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium"
                    >
                      {link.label}
                    </span>
                  ),
                )}
              </div>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
