"use client";

export function PreviewSkeleton() {
  return (
    <div className="min-h-[220px] space-y-4 p-4">
      <div className="h-4 w-3/4 animate-pulse rounded-sm bg-gray-200 dark:bg-gray-700" />
      <div className="h-[120px] w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}
