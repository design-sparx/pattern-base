# Repository Guidelines

PatternBase is a pnpm + Turborepo monorepo: 54 AI-UX pattern components (shapeof.ai patterns), each implemented with identical prop interfaces in four UI libraries, plus a Next.js docs site.

## Layout

- `packages/core` (`@patternbase/core`) — framework-agnostic types, hooks, utils. All shared prop interfaces live in `src/types/patterns.ts`. No UI, no framework imports.
- `packages/{antd,bootstrap,mantine,shadcn}` — same 54 patterns in each; must only use the host library's primitives (antd, react-bootstrap, @mantine/*, shadcn/ui) and keep prop parity with `core` and each other.
- `packages/shadcn` (`@patternbase/shadcn`) — shadcn/ui implementations. Primitives vendored in `src/components/ui/`, Tailwind v4 theme in `src/styles.css`, Radix + icons bundled by tsup.
- `packages/{eslint-config,vitest-config}` — private shared configs used by every package.
- `apps/docs` (`@patternbase/docs`) — Next.js 16.3.1 + Mantine UI docs site with live previews for all four frameworks.

## Commands (run from repo root)

- `pnpm build` / `pnpm clean` — turbo-cached.
- `pnpm dev` — persistent turbo task that builds `^build` deps first; scope with `--filter`.
- `pnpm lint` / `pnpm lint:fix` / `pnpm type-check` / `pnpm test` / `pnpm format` / `pnpm format:check`.
- One package: `pnpm test --filter=@patternbase/core -- --watch`.
- One test file, from inside that package: `pnpm exec vitest run src/utils/confidence.test.ts`.

## Gotchas

- `apps/docs` has no `type-check` or `test` script, so root `pnpm type-check`/`pnpm test` silently skip it. Check docs types with `pnpm exec tsc --noEmit` inside `apps/docs`.
- Framework deps (react, antd, react-bootstrap, @mantine/*) are peerDependencies externalized by tsup. shadcn/ui's Radix and icon deps are bundled by tsup; only `tailwindcss` is an external peer. Never import any framework deps into `@patternbase/core`.
- Docs resolves workspace packages from their `dist` via `next.config.mjs` `transpilePackages`, so run `pnpm build` before working against them in docs.
- Tests currently exist only in `packages/core/src/utils/__tests__/`.
- Snippets are auto-generated from actual component source files. Run `pnpm generate-snippets` inside `apps/docs` to regenerate. The generated file (`src/data/snippet-templates.ts`) is gitignored.

## Style & conventions

- Named exports only; component files `PascalCase`, hooks/utils `camelCase`; 2-space indent.
- Import order is lint-enforced (simple-import-sort): `node:` → externals → `@patternbase/*` → relative → CSS.
- Prettier: semicolons, double quotes, trailing commas. Don't hand-format against lint/prettier output.
- Strict TS (`noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`); typecheck must pass.

## Adding a pattern

1. `packages/core/src/types/patterns.ts` — prop interfaces; export from `packages/core/src/index.ts`.
2. `packages/{antd,bootstrap,mantine,shadcn}/src/components/<name>/` — implementation + `index.ts` barrel, then re-export from each package `src/index.ts`.
3. Docs app: metadata in `apps/docs/src/data/patterns.ts`; demo data in `data/demo-data.ts`; registry entry (bootstrap/antd/mantine/shadcn) in `src/lib/registry.tsx`; explanation in `data/pattern-explanations.ts`; prop table in `data/props-data.ts`. Snippets are auto-generated from component source files.

## Commits & verification

- Conventional commits (commitlint): header ≤100 chars, subject lowercase (`fix: ...`), types `feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert`.
- Pre-commit runs lint-staged prettier on staged files, then a full `pnpm lint` — keep commits small.
- Before a PR at minimum: `pnpm run lint` and `pnpm run type-check`, plus `pnpm build` for docs/runtime verification.
- `CLAUDE.md` has deeper docs-site architecture notes (pattern preview data flow, component structure) — cross-check both files when working in `apps/docs`.