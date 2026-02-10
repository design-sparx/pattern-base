"use client";

import { useEffect } from "react";

import { TableOfContents } from "./table-of-contents";

import { useAside } from "@/components/layout/aside-context";

interface AsideTocProps {
  items: { id: string; label: string }[];
}

export function AsideToc({ items }: AsideTocProps) {
  const { setContent } = useAside();

  useEffect(() => {
    setContent(<TableOfContents items={items} />);
    return () => {
      setContent(null);
    };
  }, [items, setContent]);

  return null;
}
