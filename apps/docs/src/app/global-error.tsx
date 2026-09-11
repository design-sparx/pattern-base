"use client";

import { IconHome, IconRefresh } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div
          className="flex items-center justify-center p-4 md:p-8"
          style={{ minHeight: "100vh" }}
        >
          <div className="text-center">
            <h1 className="text-6xl font-extrabold text-red-600 md:text-8xl">
              500
            </h1>
            <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Application error
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              A critical error occurred in the root layout. Please try
              refreshing the page.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button onClick={reset}>
                <IconRefresh size={14} />
                Try again
              </Button>
              <Button variant="secondary" asChild>
                <a href="/">
                  <IconHome size={14} />
                  Go home
                </a>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
