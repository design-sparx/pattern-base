import { IconArrowRight, IconSparkles } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { demoSuggestions } from "@/data/demo-data";

export function PromptComposerMock() {
  return (
    <div className="relative">
      <div className="bg-linear-to-br from-primary/15 via-primary/5 rounded-4xl absolute -inset-6 -z-10 to-transparent blur-2xl" />
      <div className="ring-foreground/5 rounded-4xl border-border bg-card overflow-hidden border shadow-sm ring-1">
        <div className="border-border flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-lg">
              <IconSparkles size={13} />
            </span>
            <span className="text-sm font-medium">PatternBase Studio</span>
          </div>
          <Badge variant="outline" className="rounded-full">
            suggestions · prompt actions
          </Badge>
        </div>
        <div className="p-4">
          <div className="border-border bg-muted/40 rounded-2xl border px-3 py-3">
            <p className="text-sm">Describe what you want to build…</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="bg-muted-foreground/40 size-1.5 rounded-full" />
              <span className="text-muted-foreground text-xs">
                Prompt-guided generation across 3 UI kits
              </span>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {demoSuggestions.map((suggestion) => (
              <span
                key={suggestion.id}
                className="border-border bg-background hover:border-primary/40 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors"
              >
                <span aria-hidden>{suggestion.icon}</span>
                {suggestion.title}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <IconSparkles size={12} />
              Open source · MIT
            </span>
            <Button size="sm" className="rounded-full" asChild>
              <a href="/patterns">
                Generate
                <IconArrowRight size={14} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
