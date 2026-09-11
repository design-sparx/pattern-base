"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
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
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <AlertTriangle size={40} className="text-orange-500" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Failed to load pattern
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          This pattern could not be rendered. The component may have an
          incompatible dependency or a rendering error.
        </p>
        {error.digest && (
          <code className="w-full rounded-md border border-gray-200 bg-gray-50 p-2 text-xs dark:border-gray-700 dark:bg-gray-800">
            {error.digest}
          </code>
        )}
        <Button variant="secondary" onClick={reset}>
          <RefreshCw size={14} />
          Try again
        </Button>
      </div>
    </div>
  );
}
