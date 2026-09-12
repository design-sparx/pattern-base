export function Footer() {
  return (
    <footer className="border-t border-gray-200 py-4 dark:border-gray-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <p
          className="text-xs text-gray-400"
          style={{ opacity: 0.6, letterSpacing: "0.03em" }}
        >
          PatternBase v0.1.0
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/kelvink96/pattern-base"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
