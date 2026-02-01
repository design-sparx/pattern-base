import { notFound } from 'next/navigation';
import { categories, getPatternsByCategory, getCategoryById } from '@/data/patterns';
import { PatternCard } from '@/components/common/pattern-card';
import { CategoryNav } from '@/components/common/category-nav';

interface Props {
  params: { category: string };
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryById(params.category);
  if (!category) notFound();

  const categoryPatterns = getPatternsByCategory(category.id);

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {category.icon} {category.name}
      </h1>
      <p className="text-gray-600 mb-6">{category.description}</p>

      <CategoryNav categories={categories} activeCategoryId={category.id} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryPatterns.map((p) => (
          <PatternCard key={p.id} pattern={p} />
        ))}
      </div>
    </div>
  );
}
