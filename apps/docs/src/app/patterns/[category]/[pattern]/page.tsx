import { notFound } from 'next/navigation';
import Link from 'next/link';
import { patterns, categories, getCategoryById, getPatternBySlug } from '@/data/patterns';
import { ComponentPreview } from '@/components/preview/component-preview';

interface Props {
  params: { category: string; pattern: string };
}

export function generateStaticParams() {
  return patterns.map((p) => ({
    category: p.category,
    pattern: p.slug,
  }));
}

export default function PatternPage({ params }: Props) {
  const pattern = getPatternBySlug(params.pattern);
  const category = getCategoryById(params.category);

  if (!pattern || !category) notFound();

  return (
    <div className="p-8 max-w-5xl">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/patterns" className="hover:text-gray-700 no-underline text-gray-500">
          Patterns
        </Link>
        <span>/</span>
        <Link
          href={`/patterns/${category.id}`}
          className="hover:text-gray-700 no-underline text-gray-500"
        >
          {category.name}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{pattern.name}</span>
      </nav>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{pattern.name}</h1>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
            {category.name}
          </span>
        </div>
        <p className="text-gray-600 text-lg">{pattern.description}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {pattern.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <ComponentPreview patternId={pattern.id} />
    </div>
  );
}
