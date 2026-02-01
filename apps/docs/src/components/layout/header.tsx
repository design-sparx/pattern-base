import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[var(--header-height)] border-b border-gray-200 bg-white z-50 flex items-center px-6">
      <Link href="/" className="text-xl font-bold text-gray-900 no-underline">
        AI Vory
      </Link>
      <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
        v0.1.0
      </span>

      <nav className="ml-8 flex gap-6">
        <Link href="/patterns" className="text-sm text-gray-600 hover:text-gray-900 no-underline">
          Patterns
        </Link>
        <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 no-underline">
          Pricing
        </Link>
      </nav>

      <div className="ml-auto">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700 no-underline"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
