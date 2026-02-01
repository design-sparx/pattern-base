'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories, getPatternsByCategory } from '@/data/patterns';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-[var(--header-height)] bottom-0 w-[var(--sidebar-width)] border-r border-gray-200 bg-white overflow-y-auto p-4">
      <nav>
        <Link
          href="/patterns"
          className={`block px-3 py-2 rounded-md text-sm font-medium mb-2 ${
            pathname === '/patterns'
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          All Patterns
        </Link>

        {categories.map((cat) => {
          const catPatterns = getPatternsByCategory(cat.id);
          const isActive = pathname.includes(`/patterns/${cat.id}`);

          return (
            <div key={cat.id} className="mb-3">
              <Link
                href={`/patterns/${cat.id}`}
                className={`block px-3 py-2 rounded-md text-sm font-semibold ${
                  isActive ? 'text-blue-700' : 'text-gray-900'
                }`}
              >
                {cat.icon} {cat.name}
              </Link>
              <div className="ml-2">
                {catPatterns.map((p) => (
                  <Link
                    key={p.id}
                    href={`/patterns/${cat.id}/${p.slug}`}
                    className={`block px-3 py-1.5 rounded-md text-sm ${
                      pathname === `/patterns/${cat.id}/${p.slug}`
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        <div className="border-t border-gray-200 mt-4 pt-4">
          <Link
            href="/pricing"
            className={`block px-3 py-2 rounded-md text-sm ${
              pathname === '/pricing'
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Pricing
          </Link>
        </div>
      </nav>
    </aside>
  );
}
