"use client";

import { IconAlertTriangle, IconRefresh } from "@tabler/icons-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface PatternErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PatternError({
  error,
  reset,
}: Readonly<PatternErrorProps>) {
  useEffect(() => {
    console.error("Pattern page error:", error);
  }, [error]);

  return (
    <div className="app-container py-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <IconAlertTriangle size={40} className="text-destructive" />
        <h3 className="text-foreground text-xl font-semibold">
          Failed to load pattern
        </h3>
        <p className="text-muted-foreground">
          This pattern could not be rendered. The component may have an
          incompatible dependency or a rendering error.
        </p>
        {error.digest ? (
          <code className="border-border bg-muted w-full rounded-md border p-2 text-xs">
            {error.digest}
          </code>
        ) : null}
        <Button variant="secondary" onClick={reset}>
          <IconRefresh size={14} />
          Try again
        </Button>
      </div>
    </div>
  );
}
