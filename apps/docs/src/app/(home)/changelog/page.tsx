import { readFileSync } from "node:fs";
import path from "node:path";

import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Changelog | PatternBase",
  description:
    "Release history and commit log for PatternBase and its framework packages.",
  alternates: {
    canonical: "/changelog",
  },
  openGraph: {
    title: "Changelog | PatternBase",
    description:
      "Release history and commit log for PatternBase and its framework packages.",
    url: "/changelog",
    siteName: "PatternBase",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Changelog | PatternBase",
    description:
      "Release history and commit log for PatternBase and its framework packages.",
  },
};

interface ChangeLine {
  text: string;
  commitUrl?: string;
  commitHash?: string;
}

interface VersionSection {
  version: string;
  date: string;
  changes: ChangeLine[];
}

const VERSION_RE = /^##\s+(?:<small>)?([^(]+)\s*\(([^)]+)\)\s*(?:<\/small>)?$/;
const CHANGE_RE = /^-\s+(.+?)(?:\s+\(\[([^)]+)\]\(([^)]+)\)\))?\s*$/;

function parseChangelog(): VersionSection[] {
  const root = path.resolve(process.cwd(), "..", "..");
  const raw = readFileSync(path.join(root, "CHANGELOG.md"), "utf-8");
  const sections: VersionSection[] = [];
  let current: VersionSection | null = null;

  for (const line of raw.split("\n")) {
    const versionMatch = VERSION_RE.exec(line);
    if (versionMatch) {
      current = {
        version: versionMatch[1]?.trim() ?? "",
        date: versionMatch[2]?.trim() ?? "",
        changes: [],
      };
      sections.push(current);
      continue;
    }

    const changeMatch = CHANGE_RE.exec(line);
    if (!current || !changeMatch) continue;

    const commitUrl = changeMatch[3];
    current.changes.push({
      text: changeMatch[1]?.trim() ?? "",
      commitHash: commitUrl ? (changeMatch[2] ?? "") : undefined,
      commitUrl,
    });
  }

  return sections;
}

export default function ChangelogPage() {
  const sections = parseChangelog();

  return (
    <div className="app-container pb-12 pt-16 md:pb-16 md:pt-20 lg:pt-20">
      <Badge variant="outline" className="font-mono">
        Changelog
      </Badge>
      <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight">
        Changelog
      </h1>
      <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed">
        Releases and notable changes across PatternBase and its framework
        packages. Latest on top.
      </p>

      <div className="mt-10 max-w-3xl">
        {sections.length === 0 ? (
          <p className="text-muted-foreground">
            No releases yet. Check back soon.
          </p>
        ) : (
          sections.map((section) => (
            <section
              key={`${section.version}-${section.date}`}
              className="border-border border-b py-6"
            >
              <h2 className="text-xl font-semibold tracking-tight">
                {section.version}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {section.date}
              </p>
              <ul className="mt-4 space-y-2">
                {section.changes.map((change) => (
                  <li
                    key={`${section.version}-${change.text.slice(0, 32)}`}
                    className="text-muted-foreground text-sm leading-relaxed"
                  >
                    {change.text}
                    {change.commitUrl ? (
                      <>
                        {" "}
                        (
                        <a
                          href={change.commitUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline-offset-4 hover:underline"
                        >
                          {change.commitHash}
                        </a>
                        )
                      </>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
