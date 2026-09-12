import { categories, patterns } from "@/data/patterns";

const BASE_URL = "https://patternbase.dev";

function buildLlmsTxt(): string {
  const lines: string[] = [];
  lines.push("# PatternBase");
  lines.push("");
  lines.push(
    "> PatternBase is an open-source React component library codifying 54 AI UX patterns from shapeof.ai into production-ready components for four UI libraries: Bootstrap, Ant Design, Mantine, and shadcn/ui.",
  );
  lines.push("");
  lines.push(
    "Every pattern is a self-contained, fully typed React component with an identical prop interface across all four libraries. The docs site provides live previews and copy-paste snippets for each pattern.",
  );
  lines.push("");
  lines.push("## Getting started");
  lines.push("");
  lines.push(
    `- [Installation](https://patternbase.dev#install): npm packages for each framework`,
  );
  lines.push(
    `- [Browse all patterns](${BASE_URL}/patterns): every pattern with a live workbench`,
  );
  lines.push("");
  lines.push("## Pattern categories");
  lines.push("");
  for (const cat of categories) {
    lines.push(`### ${cat.name}`);
    lines.push("");
    lines.push(cat.description);
    lines.push("");
    lines.push(
      `- [${cat.name}](${BASE_URL}/patterns/${cat.id}): ${cat.description}`,
    );
    lines.push("");
    const catPatterns = patterns.filter((p) => p.category === cat.id);
    for (const p of catPatterns) {
      lines.push(
        `- [${p.name}](${BASE_URL}/patterns/${p.category}/${p.slug}): ${p.description}`,
      );
    }
    lines.push("");
  }
  lines.push("## Repository");
  lines.push("");
  lines.push(
    "[GitHub](https://github.com/kelvink96/pattern-base): source code for all packages",
  );
  return lines.join("\n");
}

export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
