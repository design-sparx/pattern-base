import Link from 'next/link';
import type { CategoryInfo } from '@ai-ui/core';

interface CategoryNavProps {
  categories: CategoryInfo[];
  activeCategoryId?: string;
}

export function CategoryNav({ categories, activeCategoryId }: CategoryNavProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link
        href="/patterns"
        className={`px-3 py-1.5 rounded-full text-sm font-medium no-underline ${
          !activeCategoryId
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/patterns/${cat.id}`}
          className={`px-3 py-1.5 rounded-full text-sm font-medium no-underline ${
            activeCategoryId === cat.id
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {cat.icon} {cat.name}
        </Link>
      ))}
    </div>
  );
}
