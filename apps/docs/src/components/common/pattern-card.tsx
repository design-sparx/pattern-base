import Link from 'next/link';
import type { PatternMeta } from '@ai-ui/core';

interface PatternCardProps {
  pattern: PatternMeta;
}

export function PatternCard({ pattern }: PatternCardProps) {
  return (
    <Link
      href={`/patterns/${pattern.category}/${pattern.slug}`}
      className="block border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all no-underline"
    >
      <h3 className="text-base font-semibold text-gray-900 mb-1">{pattern.name}</h3>
      <p className="text-sm text-gray-600 mb-3">{pattern.description}</p>
      <div className="flex flex-wrap gap-1">
        {pattern.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
