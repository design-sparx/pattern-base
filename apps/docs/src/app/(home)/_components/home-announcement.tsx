import Link from "next/link";

import { patterns } from "@/data/patterns";

const totalPatterns = patterns.length;

interface HomeAnnouncementProps {
  text?: string;
  linkHref?: string;
}

export function HomeAnnouncement({
  text = `All ${totalPatterns} patterns now ship for Bootstrap, Ant Design, Mantine & shadcn/ui`,
  linkHref = "/patterns",
}: HomeAnnouncementProps) {
  return (
    <Link
      href={linkHref}
      className="border-border bg-muted/50 hover:border-primary/40 hover:bg-muted group inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm transition-colors"
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span
          className="bg-primary absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite" }}
        />
        <span className="bg-primary relative inline-flex h-1.5 w-1.5 rounded-full" />
      </span>
      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
        {text}
      </span>
    </Link>
  );
}
