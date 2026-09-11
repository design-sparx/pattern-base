"use client";

import { Home, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-violet-600 dark:text-violet-400">
          404
        </h1>
        <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Page not found
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <Home size={14} />
              Go home
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/patterns/open-input">
              <Search size={14} />
              Browse patterns
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
