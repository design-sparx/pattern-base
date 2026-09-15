"use client";

export function PreviewSkeleton() {
  return (
    <div className="min-h-[220px] space-y-4 p-4">
      <div className="bg-muted h-4 w-3/4 animate-pulse rounded-sm" />
      <div className="bg-muted h-[120px] w-full animate-pulse rounded-md" />
    </div>
  );
}
