import Link from 'next/link';
import { categories, patterns } from '@/data/patterns';

export default function HomePage() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Vory</h1>
        <p className="text-xl text-gray-600 mb-6">
          A multi-framework component library for AI user experience patterns.
          Built with Bootstrap and Ant Design, based on{' '}
          <a
            href="https://www.shapeof.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            shapeof.ai
          </a>{' '}
          patterns.
        </p>
        <div className="flex gap-3">
          <Link
            href="/patterns"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium no-underline hover:bg-blue-700"
          >
            Browse Patterns
          </Link>
          <Link
            href="/pricing"
            className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium no-underline hover:bg-gray-50"
          >
            Pricing
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">{patterns.length}</div>
          <div className="text-sm text-gray-600">AI UX Patterns</div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">2</div>
          <div className="text-sm text-gray-600">UI Frameworks</div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/patterns/${cat.id}`}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all no-underline"
          >
            <div className="text-2xl mb-2">{cat.icon}</div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">{cat.name}</h3>
            <p className="text-sm text-gray-600">{cat.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
