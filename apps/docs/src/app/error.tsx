"use client";

import { IconAlertTriangle, IconRefresh } from "@tabler/icons-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: Readonly<ErrorPageProps>) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl rounded-lg border border-gray-200 p-6 shadow-sm md:p-8 dark:border-gray-700">
        <div className="flex flex-col items-center gap-4 text-center">
          <IconAlertTriangle size={48} className="text-orange-500" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Something went wrong
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            An unexpected error occurred while loading this page.
          </p>
          {error.digest && (
            <code className="w-full rounded-md border border-gray-200 bg-gray-50 p-2 text-xs dark:border-gray-700 dark:bg-gray-800">
              {error.digest}
            </code>
          )}
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={reset}>
              <IconRefresh size={14} />
              Try again
            </Button>
            <Button variant="ghost" asChild>
              <a href="/">Go home</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
