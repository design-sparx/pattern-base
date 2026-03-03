# Repository Guidelines

## Project Structure & Module Organization

- Main app code lives in `app/` (including API routes such as `app/api/...`).
- Reusable UI is in `components/` and shared layout shells in `layouts/`.
- Data model and DB artifacts are in `prisma/` (for example, `prisma/schema.prisma`).
- Legacy or integration-specific code appears under `src/` (for example, `src/webparts/...`).
- Keep feature logic close to its route/component; move cross-feature utilities into shared modules only when reused.

## Build, Test, and Development Commands

- `pnpm build`: production build.
- `pnpm run lint`: run lint checks.
- `pnpm run typecheck`: run TypeScript type checks.
- `npm run format`: apply formatting.
- `npm run format:check`: verify formatting without edits.
- `npm run fix`: apply auto-fixes (lint/style where configured).
- `pnpm exec prisma generate`: regenerate Prisma client after schema changes.

Run commands from the repository root (`D:\works\design-sparx\ai-vory`).

## Coding Style & Naming Conventions

- Use TypeScript-first patterns and keep strict typing clean (`typecheck` must pass).
- Follow ESLint + Prettier output; do not hand-format against tool output.
- Indentation: 2 spaces; keep lines readable and avoid deeply nested logic.
- Naming:
  - Components/layouts: `PascalCase` file and symbol names.
  - Variables/functions: `camelCase`.
  - Constants/env keys: `UPPER_SNAKE_CASE`.
  - Route folders/files should follow framework routing conventions in `app/`.

## Testing Guidelines

- At minimum, run `pnpm run lint` and `pnpm run typecheck` before opening a PR.
- For API/database changes, regenerate Prisma client and verify affected flows locally.
- Name tests to describe behavior (for example, `creates organization when input is valid`).
- Keep tests close to changed code where the project supports colocated tests.

## Commit & Pull Request Guidelines

- Use clear, imperative commit messages (example: `fix: validate org slug in create route`).
- Keep commits focused; avoid mixing refactors with behavior changes.
- PRs should include:
  - What changed and why.
  - Linked issue/task.
  - Screenshots for UI changes.
  - Notes on schema/env changes and rollout impact.

## Security & Configuration Tips

- Never commit secrets; use environment variables and local `.env` files.
- Treat `prisma/schema.prisma` and API route changes as high-impact; review for auth, validation, and data exposure.
