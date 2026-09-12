export function Footer() {
  return (
    <footer className="border-border bg-background supports-[backdrop-filter]:bg-background/60 flex h-14 shrink-0 items-center justify-between rounded-2xl border px-4 shadow-sm backdrop-blur-xl">
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
    </footer>
  );
}
