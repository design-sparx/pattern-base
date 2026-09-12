export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="app-container flex h-14 items-center justify-between">
        <p className="text-muted-foreground text-xs tracking-[0.03em] opacity-80">
          PatternBase v0.1.0
        </p>
        <a
          href="https://github.com/kelvink96/pattern-base"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground text-xs"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
