import { patterns, categories } from '@/data/patterns';
import { PatternCard } from '@/components/common/pattern-card';
import { CategoryNav } from '@/components/common/category-nav';

export default function PatternsPage() {
  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">All Patterns</h1>
      <p className="text-gray-600 mb-6">
        Browse all {patterns.length} AI UX patterns across {categories.length} categories.
      </p>

      <CategoryNav categories={categories} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patterns.map((p) => (
          <PatternCard key={p.id} pattern={p} />
        ))}
      </div>
    </div>
  );
}
