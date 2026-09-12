"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { patterns } from "@/data/patterns";

const totalPatterns = patterns.length;

interface HomeAnnouncementProps {
  text?: string;
  linkText?: string;
  linkHref?: string;
}

export function HomeAnnouncement({
  text = `All ${totalPatterns} patterns ship for Bootstrap, Ant Design, Mantine, and shadcn/ui`,
  linkText = "Explore patterns",
  linkHref = "/patterns",
}: HomeAnnouncementProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="border-border bg-primary relative overflow-hidden border-b">
      <div className="text-primary-foreground app-container flex items-center justify-center gap-2 py-2 text-xs font-medium">
        <span className="relative flex h-2 w-2">
          <span
            className="bg-primary-foreground/70 absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite" }}
          />
          <span className="bg-primary-foreground relative inline-flex h-2 w-2 rounded-full" />
        </span>
        <span>{text}</span>
        <Link href={linkHref} className="underline">
          {linkText}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setVisible(false);
          }}
          className="text-primary-foreground hover:bg-primary-foreground/10 h-5 w-5 rounded-full p-0"
        >
          ×
        </Button>
      </div>
    </div>
  );
}
