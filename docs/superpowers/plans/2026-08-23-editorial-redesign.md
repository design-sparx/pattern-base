# Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/`, `/patterns`, `/patterns/[category]` in an editorial-minimal Mantine-native style, merge `/about` into home, and split chrome via Next.js route groups — per `docs/superpowers/specs/2026-08-23-editorial-redesign-design.md`.

**Architecture:** Root layout slims to providers/fonts only; `(shell)` route group keeps `AppShellLayout` for `patterns/**`; `(home)` group gets minimal editorial chrome. All styling through Mantine props, responsive values, `visibleFrom`/`hiddenFrom`, and Styles API — zero CSS Modules, zero inline `style`.

**Tech Stack:** Next.js 16 App Router, Mantine v7 (`@mantine/core`), `next/font/google`, TypeScript strict.

**Working rules for this repo (from AGENTS.md + experience):**

- PowerShell 5.1: NEVER chain with `&&`. Use `cmd1; if ($?) { cmd2 }` or separate calls with `workdir`.
- Pre-commit runs prettier + FULL `pnpm lint` (~2–3 min cold). Always `timeout: 600000` on commits. Never skip hooks.
- NEVER stage/commit: `apps/docs/next-env.d.ts`, `apps/docs/src/data/snippet-templates.ts`, `.kilo/`, `.lavish/`, `opencode.json`, `docs/superpowers/plans/2026-08-19-refactor-snippets-to-full-implementations.md`.
- Import order (lint-enforced): externals → relative → `@/` aliases; named specifiers lowercase-first. Prettier reformats staged md/ts files — re-read after commits if editing again.
- Docs has NO `type-check` script. Verify types with `pnpm exec tsc --noEmit` inside `apps/docs` (workdir param).
- Framework packages resolve from `dist` — run `pnpm build` once before the first docs build if dist is stale (it currently isn't; Task 4's build covers it).
- Conventional commits, subject lowercase. Tests exist only in `packages/core` — this plan verifies via `tsc --noEmit` + `pnpm lint` + targeted `pnpm build`, plus a manual browser pass in the final task.

---

### Task 1: Fonts, theme body swap, editorial utilities

**Files:**

- Modify: `apps/docs/src/app/layout.tsx`
- Modify: `apps/docs/src/app/theme.ts`
- Modify: `apps/docs/src/app/globals.css`

- [ ] **Step 1: Swap font loading in `src/app/layout.tsx`**

Replace the `next/font/google` import block and font constants (keep everything else in the file):

```tsx
import {
  Fraunces,
  Geist_Mono as geistMonoFont,
  Inter,
  Space_Grotesk as spaceGroteskFont,
} from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
```

Update the `<html>` className (delete the `geist` constant entirely):

```tsx
className={`${fraunces.variable} ${inter.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
```

- [ ] **Step 2: Point body font at Inter in `src/app/theme.ts`**

```ts
fontFamily:
  'var(--font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
```

(`headings.fontFamily` and `fontFamilyMonospace` stay untouched.)

- [ ] **Step 3: Append editorial utilities to `src/app/globals.css`**

```css
/* Editorial typography utilities (editorial redesign) */
.editorial-display {
  font-family: var(--font-display), Georgia, serif;
  letter-spacing: -0.01em;
}

.editorial-kicker {
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
}
```

- [ ] **Step 4: Verify**

Run (workdir `apps/docs`): `pnpm exec tsc --noEmit` → expected: no errors.
Run (repo root): `pnpm lint` → expected: 0 errors (pre-existing warnings OK).

- [ ] **Step 5: Commit**

```bash
git add apps/docs/src/app/layout.tsx apps/docs/src/app/theme.ts apps/docs/src/app/globals.css
git commit -m "feat(docs): load fraunces and inter, swap body font"
```

---

### Task 2: FEATURED_SLUGS data export

**Files:**

- Modify: `apps/docs/src/data/patterns.ts`

- [ ] **Step 1: Add export at the bottom of `patterns.ts`** (after `getCategoryById`). Curated six spanning all five categories; descriptions come from the real `PatternMeta` data, not the illustrative mockup copy:

```ts
export const FEATURED_SLUGS = [
  "open-input",
  "suggestions",
  "citation",
  "parameter-control",
  "regenerate",
  "data-ownership",
] as const;
```

- [ ] **Step 2: Verify**

Run (workdir `apps/docs`): `pnpm exec tsc --noEmit` → expected: clean.

- [ ] **Step 3: Commit**

```bash
git add apps/docs/src/data/patterns.ts
git commit -m "feat(docs): add featured slugs for homepage"
```

---

### Task 3: Shared atoms — InstallPill and PatternIndexRow

**Files:**

- Create: `apps/docs/src/components/common/install-pill.tsx`
- Create: `apps/docs/src/components/common/pattern-index-row.tsx`

- [ ] **Step 1: Create `install-pill.tsx`** (client — CopyButton needs state)

```tsx
"use client";

import { Code, CopyButton, Group, UnstyledButton } from "@mantine/core";

interface InstallPillProps {
  command: string;
}

export function InstallPill({ command }: InstallPillProps) {
  return (
    <Group
      gap="xs"
      wrap="nowrap"
      bd="1px solid var(--mantine-color-default-border)"
      bdrs="md"
      px="sm"
      py={7}
      bg="var(--mantine-color-body)"
    >
      <Code ff="mono" fz="xs" bg="transparent" c="inherit">
        {command}
      </Code>
      <CopyButton value={command}>
        {({ copied, copy }) => (
          <UnstyledButton
            onClick={copy}
            fz="xs"
            fw={600}
            c="var(--mantine-color-violet-filled)"
          >
            {copied ? "Copied!" : "Copy"}
          </UnstyledButton>
        )}
      </CopyButton>
    </Group>
  );
}
```

- [ ] **Step 2: Create `pattern-index-row.tsx`** (shared by both browse pages)

Numbered hairline row. Hover states live entirely in the Styles API (nested selectors on plain classes). Columns: number + name always; description/tags appear from `lg`. Bottom hairline comes from each row's `borderTop` (first row's line doubles as the header separator).

```tsx
import { Grid, Group, Pill, Text, UnstyledButton } from "@mantine/core";
import Link from "next/link";

import type { PatternMeta } from "@patternbase/core";

interface PatternIndexRowProps {
  pattern: PatternMeta;
  index: number;
}

export function PatternIndexRow({ pattern, index }: PatternIndexRowProps) {
  return (
    <UnstyledButton
      component={Link}
      href={`/patterns/${pattern.category}/${pattern.slug}`}
      w="100%"
      px="md"
      py="sm"
      styles={{
        root: {
          borderTop: "1px solid var(--mantine-color-default-border)",
          "&:hover": {
            backgroundColor:
              "light-dark(var(--mantine-color-violet-0), var(--mantine-color-violet-9))",
            "& .pb-row-name": {
              color: "var(--mantine-color-violet-filled)",
            },
            "& .pb-row-arrow": { opacity: 1 },
          },
          "& .pb-row-arrow": { opacity: 0, transition: "opacity 120ms ease" },
        },
      }}
    >
      <Grid columns={12} gutter="md" align="center">
        <Grid.Col span={{ base: 2, lg: 1 }}>
          <Text ff="mono" fz="xs" c="dimmed" aria-hidden>
            {String(index + 1).padStart(3, "0")}
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 10, lg: 4 }}>
          <Text className="pb-row-name" fw={600} fz="md">
            {pattern.name}
          </Text>
        </Grid.Col>
        <Grid.Col span={5} visibleFrom="lg">
          <Text fz="sm" c="dimmed" truncate>
            {pattern.description}
          </Text>
        </Grid.Col>
        <Grid.Col span={2} visibleFrom="lg">
          <Group gap={4} justify="flex-end" wrap="nowrap">
            {pattern.tags.slice(0, 2).map((tag) => (
              <Pill key={tag} fz="xs" c="dimmed">
                {tag}
              </Pill>
            ))}
            <Text
              className="pb-row-arrow"
              c="var(--mantine-color-violet-filled)"
              fw={700}
            >
              →
            </Text>
          </Group>
        </Grid.Col>
      </Grid>
    </UnstyledButton>
  );
}
```

- [ ] **Step 3: Verify**

Run (workdir `apps/docs`): `pnpm exec tsc --noEmit` → expected: clean (components unused so far — ESLint only flags unused locals _within_ files, not unused modules).

- [ ] **Step 4: Commit**

```bash
git add apps/docs/src/components/common/install-pill.tsx apps/docs/src/components/common/pattern-index-row.tsx
git commit -m "feat(docs): add install pill and pattern index row primitives"
```

---

### Task 4: Route-group skeleton (URLs unchanged, app still green)

**Files:**

- Create: `apps/docs/src/app/(shell)/layout.tsx`
- Move: `apps/docs/src/app/patterns/**` → `apps/docs/src/app/(shell)/patterns/**`
- Modify: `apps/docs/src/app/layout.tsx`
- Create: `apps/docs/src/app/(home)/layout.tsx`
- Move: `apps/docs/src/app/page.tsx` → `apps/docs/src/app/(home)/page.tsx`

- [ ] **Step 1: Create `(shell)/layout.tsx`**

```tsx
import { AppShellLayout } from "@/components/layout/app-shell-layout";

export default function ShellLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppShellLayout>{children}</AppShellLayout>;
}
```

- [ ] **Step 2: Move the patterns tree with git (preserves history)**

```bash
git mv apps/docs/src/app/patterns apps/docs/src/app/(shell)/patterns
```

PowerShell: quote the paths — parentheses are special:

```powershell
git mv "apps/docs/src/app/patterns" "apps/docs/src/app/(shell)/patterns"
```

- [ ] **Step 3: Slim the root layout — remove `AppShellLayout`**

In `src/app/layout.tsx`: delete the imports of `AppShellLayout` and replace the body wrapper so `<MantineProvider>` renders skip-link, `SpotlightProvider`, then `{children}` directly:

```tsx
<MantineProvider theme={theme} defaultColorScheme="auto">
  <a href="#main-content" className="skip-link">
    Skip to content
  </a>
  <SpotlightProvider />
  {children}
</MantineProvider>
```

Note: `#main-content` skip target moves into the two group layouts (Steps 4 & 5 keep it working).

- [ ] **Step 4: Create `(home)/layout.tsx`** — minimal editorial chrome, no AppShell. Footer flows naturally (landing page is tall; no sticky-footer machinery):

```tsx
import { Anchor, Box, Button, Container, Group, Text } from "@mantine/core";
import Link from "next/link";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Box component="header" bd="0 0 1px var(--mantine-color-default-border)">
        <Container size="xl">
          <Group justify="space-between" h={60} wrap="nowrap">
            <Anchor component={Link} href="/" underline="never">
              <Text fw={700} fz="lg" c="inherit">
                Pattern
                <Text span c="var(--mantine-color-violet-filled)" inherit>
                  Base
                </Text>
              </Text>
            </Anchor>
            <Group gap="lg" visibleFrom="sm">
              <Anchor component={Link} href="/patterns" fz="sm" c="dimmed">
                Patterns
              </Anchor>
              <Anchor href="#about" fz="sm" c="dimmed">
                Origin
              </Anchor>
              <Anchor
                href="https://github.com/design-sparx/patternbase"
                target="_blank"
                fz="sm"
                c="dimmed"
              >
                GitHub ↗
              </Anchor>
            </Group>
            <Anchor href="#install" visibleFrom="sm">
              <Button color="dark" radius="xl" size="compact-sm">
                Get started
              </Button>
            </Anchor>
          </Group>
        </Container>
      </Box>
      <Box component="main" id="main-content">
        {children}
      </Box>
      <Box component="footer" bd="1px 0 0 var(--mantine-color-default-border)">
        <Container size="xl">
          <Group justify="space-between" py="md">
            <Text fz="xs" c="dimmed">
              © PatternBase — MIT licensed
            </Text>
            <Group gap="md">
              <Anchor
                href="https://www.shapeof.ai"
                target="_blank"
                fz="xs"
                c="dimmed"
              >
                shapeof.ai
              </Anchor>
              <Anchor
                href="https://github.com/design-sparx/patternbase"
                target="_blank"
                fz="xs"
                c="dimmed"
              >
                GitHub
              </Anchor>
              <Anchor
                href="https://www.npmjs.com/search?q=%40patternbase"
                target="_blank"
                fz="xs"
                c="dimmed"
              >
                npm
              </Anchor>
            </Group>
          </Group>
        </Container>
      </Box>
    </>
  );
}
```

- [ ] **Step 5: Move the homepage**

```powershell
git mv "apps/docs/src/app/page.tsx" "apps/docs/src/app/(home)/page.tsx"
```

(The old client page still renders under the new chrome — replaced wholesale in Task 6.)

- [ ] **Step 6: Verify build (66 pages, URLs unchanged)**

Run (repo root): `pnpm build` → expected: success, **66** static pages, routes listed as `/`, `/patterns`, `/patterns/[category]`, `/patterns/[category]/[pattern]`, `/about`.

- [ ] **Step 7: Commit**

```bash
git add apps/docs/src/app
git commit -m "refactor(docs): split chrome into home and shell route groups"
```

---

### Task 5: Home section components

**Files:**

- Create: `apps/docs/src/components/home/stats-strip.tsx`
- Create: `apps/docs/src/components/home/featured-patterns.tsx`
- Create: `apps/docs/src/components/home/category-index.tsx`
- Create: `apps/docs/src/components/home/origin-manifesto.tsx`
- Create: `apps/docs/src/components/home/install-section.tsx`

All server components (no `"use client"`).

- [ ] **Step 1: Create `stats-strip.tsx`** — `Grid.Col` `withBorder` gives responsive hairlines natively:

```tsx
import { Grid, Text, Title } from "@mantine/core";

import { patterns } from "@/data/patterns";

const items = [
  { value: String(patterns.length), label: "AI UX Patterns" },
  { value: "3", label: "UI Frameworks" },
  { value: "100%", label: "TypeScript" },
  { value: "MIT", label: "Open Source" },
];

export function StatsStrip() {
  return (
    <Grid columns={12} gutter={0}>
      {items.map((item) => (
        <Grid.Col
          key={item.label}
          span={{ base: 6, md: 3 }}
          withBorder
          px="xl"
          py="lg"
        >
          <Title order={3} className="editorial-display" fw={400} fz="xxxl">
            {item.value}
          </Title>
          <Text fz="xs" tt="uppercase" c="dimmed" mt={4}>
            {item.label}
          </Text>
        </Grid.Col>
      ))}
    </Grid>
  );
}
```

- [ ] **Step 2: Create `featured-patterns.tsx`**

```tsx
import { Grid, Text, Title, UnstyledButton } from "@mantine/core";
import Link from "next/link";

import {
  FEATURED_SLUGS,
  getCategoryById,
  getPatternBySlug,
  patterns,
} from "@/data/patterns";

export function FeaturedPatterns() {
  const featured = FEATURED_SLUGS.map(getPatternBySlug).filter(
    (p): p is NonNullable<typeof p> => p !== undefined,
  );

  return (
    <Grid columns={12} gutter={0}>
      {featured.map((pattern) => {
        const category = getCategoryById(pattern.category);
        return (
          <Grid.Col
            key={pattern.id}
            span={{ base: 12, xs: 6, md: 4 }}
            withBorder
          >
            <UnstyledButton
              component={Link}
              href={`/patterns/${pattern.category}/${pattern.slug}`}
              h="100%"
              w="100%"
              p="xl"
              styles={{
                root: {
                  "& .pb-feature-go": {
                    opacity: 0,
                    transition: "opacity 120ms ease",
                  },
                  "&:hover": {
                    backgroundColor:
                      "light-dark(var(--mantine-color-violet-0), var(--mantine-color-violet-9))",
                    "& .pb-feature-go": { opacity: 1 },
                  },
                },
              }}
            >
              <Text fz="xs" c="dimmed" className="editorial-kicker">
                {category?.name ?? pattern.category}
              </Text>
              <Title order={3} className="editorial-display" fw={500} mt={8}>
                {pattern.name}
              </Title>
              <Text fz="sm" c="dimmed" mt={6} lh={1.55}>
                {pattern.description}
              </Text>
              <Text
                className="pb-feature-go"
                fz="sm"
                fw={600}
                c="var(--mantine-color-violet-filled)"
                mt={14}
              >
                Open pattern →
              </Text>
            </UnstyledButton>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
```

(`patterns` import is intentionally present — used implicitly? No: remove it. Final import line is `FEATURED_SLUGS, getCategoryById, getPatternBySlug` only. ESLint `noUnusedLocals` would flag it otherwise.)

- [ ] **Step 3: Create `category-index.tsx`**

```tsx
import {
  Divider,
  Grid,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import Link from "next/link";

import { categories, getPatternsByCategory } from "@/data/patterns";

export function CategoryIndex() {
  return (
    <Stack gap={0}>
      {categories.map((category, i) => (
        <Stack key={category.id} gap={0}>
          <UnstyledButton
            component={Link}
            href={`/patterns/${category.id}`}
            py="lg"
            px="md"
            styles={{
              root: {
                "&:hover": {
                  "& .pb-cat-name": {
                    color: "var(--mantine-color-violet-filled)",
                  },
                },
              },
            }}
          >
            <Grid columns={12} gutter="md" align="baseline">
              <Grid.Col span={{ base: 2, sm: 1 }}>
                <Text ff="mono" fz="sm" c="dimmed">
                  {String(i + 1).padStart(2, "0")}
                </Text>
              </Grid.Col>
              <Grid.Col span={{ base: 10, sm: 4 }}>
                <Title
                  order={3}
                  className="editorial-display pb-cat-name"
                  fw={500}
                >
                  {category.name}
                </Title>
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 5 }} order={{ base: 3, sm: 2 }}>
                <Text fz="sm" c="dimmed">
                  {category.description}
                </Text>
              </Grid.Col>
              <Grid.Col
                span={{ base: 12, sm: 2 }}
                order={3}
                ta={{ base: "left", sm: "right" }}
              >
                <Text ff="mono" fz="sm" c="dimmed">
                  {getPatternsByCategory(category.id).length} patterns
                </Text>
              </Grid.Col>
            </Grid>
          </UnstyledButton>
          {i < categories.length - 1 && <Divider />}
        </Stack>
      ))}
    </Stack>
  );
}
```

- [ ] **Step 4: Create `origin-manifesto.tsx`** — absorbs `/about` origin prose + 3 condensed pillars:

```tsx
import {
  Anchor,
  Box,
  Container,
  Grid,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";

const principles = [
  {
    label: "P—01",
    title: "Multi-framework",
    body: "React Bootstrap, Ant Design, and Mantine implementations behind identical prop interfaces.",
  },
  {
    label: "P—02",
    title: "Copy-paste ready",
    body: "Every pattern ships with a live preview and framework-specific snippet. The code is yours.",
  },
  {
    label: "P—03",
    title: "Fully typed",
    body: "Strict TypeScript across packages so all three frameworks stay behaviorally in sync.",
  },
];

export function OriginManifesto() {
  return (
    <Box id="about" bg="dark.7" c="gray.2" py={{ base: "xl", md: 72 }}>
      <Container size="md">
        <Text fz="xs" c="violet.3" className="editorial-kicker">
          Where it comes from
        </Text>
        <Title
          order={2}
          className="editorial-display"
          fw={350}
          fs="italic"
          mt="md"
          lh={1.25}
        >
          We took shapeof.ai&apos;s taxonomy of AI product UX and turned it into
          production-ready React components.
        </Title>
        <Text c="gray.4" mt="md" lh={1.75}>
          Every pattern is derived from research across leading AI products,
          then built{" "}
          <Anchor href="https://www.shapeof.ai" target="_blank" c="violet.3">
            shapeof.ai
          </Anchor>{" "}
          style on top of your UI library&apos;s primitives — so patterns
          inherit your theme, tokens, and design system instead of fighting
          them.
        </Text>
      </Container>
      <Container size="lg" mt="xl">
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
          {principles.map((principle) => (
            <Box key={principle.label}>
              <Text ff="mono" fz="xs" c="violet.3">
                {principle.label}
              </Text>
              <Title order={4} mt={6}>
                {principle.title}
              </Title>
              <Text fz="sm" c="gray.5" mt={6} lh={1.6}>
                {principle.body}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
```

Note: `Grid` import is NOT used in this component — final import is `Anchor, Box, Container, SimpleGrid, Text, Title`.

- [ ] **Step 5: Create `install-section.tsx`**

```tsx
import { Code, Grid, Text, Title } from "@mantine/core";

export function InstallSection() {
  return (
    <Grid align="center" gutter="xl">
      <Grid.Col span={{ base: 12, md: 7 }}>
        <Title
          order={2}
          className="editorial-display"
          fw={380}
          fz={{ base: 28, md: 38 }}
        >
          Drop a pattern into your product{" "}
          <Text span inherit fs="italic" c="var(--mantine-color-violet-filled)">
            this afternoon.
          </Text>
        </Title>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 5 }}>
        <Code block fz="sm" lh={1.9}>
          {
            "# pick your framework\npnpm add @patternbase/bootstrap\npnpm add @patternbase/antd\npnpm add @patternbase/mantine"
          }
        </Code>
      </Grid.Col>
    </Grid>
  );
}
```

- [ ] **Step 6: Verify**

Fix Step 2/4 imports as noted. Run (workdir `apps/docs`): `pnpm exec tsc --noEmit` → clean. Run `pnpm lint` → 0 errors.

- [ ] **Step 7: Commit**

```bash
git add apps/docs/src/components/home
git commit -m "feat(docs): add editorial home section components"
```

---

### Task 6: Compose the landing page, absorb /about, add redirect

**Files:**

- Rewrite: `apps/docs/src/app/(home)/page.tsx`
- Delete: `apps/docs/src/app/about/page.tsx`
- Modify: `apps/docs/next.config.mjs`

- [ ] **Step 1: Rewrite `(home)/page.tsx`** (server component — replaces the moved "use client" page entirely):

```tsx
import type { Metadata } from "next";
import {
  Anchor,
  Box,
  Button,
  Container,
  Group,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";

import { CategoryIndex } from "@/components/home/category-index";
import { FeaturedPatterns } from "@/components/home/featured-patterns";
import { InstallSection } from "@/components/home/install-section";
import { OriginManifesto } from "@/components/home/origin-manifesto";
import { StatsStrip } from "@/components/home/stats-strip";
import { InstallPill } from "@/components/common/install-pill";

export const metadata: Metadata = {
  title: "PatternBase — AI UX Pattern Library",
  description:
    "An open-source React component library codifying 54 AI UX patterns from shapeof.ai into production-ready components for Bootstrap, Ant Design, and Mantine.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Container size="lg" pt={{ base: "xl", md: 80 }} pb="xl">
        <Text
          fz="xs"
          c="var(--mantine-color-violet-filled)"
          className="editorial-kicker"
        >
          An open-source component library
        </Text>
        <Title
          order={1}
          className="editorial-display"
          fw={350}
          fz={{ base: 38, md: 62 }}
          lh={1.05}
          mt="md"
          maw={760}
        >
          The missing UX patterns for{" "}
          <Text span inherit fs="italic" c="var(--mantine-color-violet-filled)">
            AI products,
          </Text>{" "}
          ready to ship.
        </Title>
        <Text c="dimmed" fz="lg" mt="md" maw={520} lh={1.65}>
          Fifty-four interaction patterns distilled from shapeof.ai — each
          implemented for Bootstrap, Ant Design, and Mantine. Study them here,
          copy them into your product.
        </Text>
        <Group gap="md" mt="xl" wrap="nowrap">
          <Button component={Link} href="/patterns" color="violet" radius="xl">
            Browse patterns
          </Button>
          <Anchor
            href="#about"
            c="inherit"
            fw={600}
            fz="md"
            underline="not-underlined"
          >
            Read the approach ↓
          </Anchor>
          <Box ml="auto" visibleFrom="md">
            <InstallPill command="pnpm add @patternbase/mantine" />
          </Box>
        </Group>
      </Container>

      {/* Stats */}
      <StatsStrip />

      {/* Featured */}
      <Container size="lg" pt="xl">
        <Group justify="space-between" align="baseline" mb="md">
          <Title order={2} className="editorial-display" fw={450} fz={28}>
            Featured patterns
          </Title>
          <Anchor
            href="/patterns"
            fz="sm"
            fw={600}
            c="var(--mantine-color-violet-filled)"
          >
            View all 54 →
          </Anchor>
        </Group>
        <FeaturedPatterns />
      </Container>

      {/* Category index */}
      <Container size="lg" pt="xl" pb="xl">
        <Title order={2} className="editorial-display" fw={450} fz={28} mb="md">
          Browse by intent
        </Title>
        <CategoryIndex />
      </Container>

      {/* Origin (absorbs /about) */}
      <OriginManifesto />

      {/* Install */}
      <Container size="lg" id="install" py={{ base: "xl", md: 72 }}>
        <InstallSection />
      </Container>
    </>
  );
}
```

- [ ] **Step 2: Delete the about route**

```powershell
git rm "apps/docs/src/app/about/page.tsx"
```

- [ ] **Step 3: Add the redirect in `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@patternbase/core",
    "@patternbase/bootstrap",
    "@patternbase/antd",
    "@patternbase/mantine",
  ],
  async redirects() {
    return [{ source: "/about", destination: "/#about", permanent: true }];
  },
};

export default nextConfig;
```

- [ ] **Step 4: Verify**

Run (repo root): `pnpm build` → expected: success, **65** static pages, and `/about` listed in the redirects table in the build output. If the hash destination errors at config load, fall back to keeping a one-line `src/app/(shell)/…`? No — correct fallback is `source: "/about.php"`-style is irrelevant; hash destinations ARE supported; if genuinely blocked, change destination to `/` and add `id="about"` scroll handling — record actual outcome in commit body if deviating.

Also spot-check: `grep -r "use client" apps/docs/src/app/\(home\)` → expected: no matches (page + layout are server components).

- [ ] **Step 5: Commit**

```bash
git add apps/docs/src/app apps/docs/next.config.mjs
git commit -m "feat(docs): editorial landing page absorbs about route"
```

---

### Task 7: /patterns editorial index

**Files:**

- Create: `apps/docs/src/components/browse/patterns-index.tsx`
- Rewrite: `apps/docs/src/app/(shell)/patterns/page.tsx`
- Modify: `apps/docs/src/data/patterns.ts` (add helper)

- [ ] **Step 1: Add grouping helper to `patterns.ts`** (bottom of file):

```ts
export function getFilteredPatterns(
  patternsToFilter: PatternMeta[],
  query: string,
  tag: string,
): PatternMeta[] {
  const q = query.toLowerCase();
  return patternsToFilter.filter(
    (p) =>
      (tag === "all" || p.tags.includes(tag)) &&
      (p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))),
  );
}
```

- [ ] **Step 2: Create `patterns-index.tsx`** (the one client island on browse pages — owns search state):

```tsx
"use client";

import {
  Box,
  Container,
  Group,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

import { PatternIndexRow } from "@/components/common/pattern-index-row";
import { categories, getFilteredPatterns, patterns } from "@/data/patterns";

const TAG_FILTERS = [
  "all",
  "prompt",
  "generation",
  "transparency",
  "control",
  "trust",
];

export function PatternsIndex() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");

  const filtered = getFilteredPatterns(patterns, query, tag);

  return (
    <Container size="lg" py="xl">
      <Title
        order={1}
        className="editorial-display"
        fw={380}
        fz={{ base: 34, md: 46 }}
      >
        All patterns
      </Title>
      <Text c="dimmed" fz="md" mt="xs">
        Fifty-four AI UX patterns across five categories. Scan by name, filter
        by intent.
      </Text>

      <Group gap="md" mt="lg" mb="xl" align="center">
        <TextInput
          placeholder="Filter patterns…"
          leftSection={<IconSearch size={16} />}
          w={{ base: "100%", sm: 300 }}
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          aria-label="Filter patterns by name or keyword"
        />
        <Group gap={6}>
          {TAG_FILTERS.map((t) => (
            <UnstyledButton
              key={t}
              onClick={() => setTag(t)}
              px="sm"
              py={4}
              bdrs="xl"
              fz="xs"
              fw={500}
              bd={
                tag === t
                  ? "1px solid var(--mantine-color-text)"
                  : "1px solid var(--mantine-color-default-border)"
              }
              bg={tag === t ? "var(--mantine-color-text)" : "transparent"}
              c={tag === t ? "var(--mantine-color-body)" : "dimmed"}
            >
              {t}
            </UnstyledButton>
          ))}
        </Group>
      </Group>

      <Text fz="sm" c="dimmed" mb="md">
        {filtered.length} pattern{filtered.length === 1 ? "" : "s"}
      </Text>

      {categories.map((category) => {
        const rows = filtered.filter((p) => p.category === category.id);
        if (rows.length === 0) return null;
        return (
          <Box key={category.id} mb="xl">
            <Group gap="sm" align="baseline" mb="xs">
              <Title order={3} className="editorial-display" fw={550} fz="lg">
                {category.name}
              </Title>
              <Text ff="mono" fz="xs" c="dimmed">
                {rows.length} patterns
              </Text>
            </Group>
            {rows.map((pattern, i) => (
              <PatternIndexRow key={pattern.id} pattern={pattern} index={i} />
            ))}
          </Box>
        );
      })}
    </Container>
  );
}
```

- [ ] **Step 3: Rewrite `(shell)/patterns/page.tsx`** as a thin server wrapper (keeps the layout metadata file beside it):

```tsx
import { PatternsIndex } from "@/components/browse/patterns-index";

export default function PatternsPage() {
  return <PatternsIndex />;
}
```

- [ ] **Step 4: Verify**

Run (workdir `apps/docs`): `pnpm exec tsc --noEmit` → clean. Run `pnpm build` → success, 65 pages.

- [ ] **Step 5: Commit**

```bash
git add apps/docs/src/components/browse apps/docs/src/app apps/docs/src/data/patterns.ts
git commit -m "feat(docs): editorial index for patterns browse page"
```

---

### Task 8: Category page + cleanup of retired components

**Files:**

- Rewrite: `apps/docs/src/app/(shell)/patterns/[category]/page.tsx`
- Delete: `apps/docs/src/components/common/category-nav.tsx`
- Delete: `apps/docs/src/components/common/pattern-card.tsx`

- [ ] **Step 1: Verify the retired components are truly unreferenced**

```
rg -l "category-nav|CategoryNav|pattern-card|PatternCard" apps/docs/src
```

Expected: only the files being rewritten/deleted themselves. If anything else matches, stop and reconcile before deleting.

- [ ] **Step 2: Rewrite `[category]/page.tsx`** (server, SSG preserved, switcher via conditional props):

```tsx
import type { Metadata } from "next";
import {
  Anchor,
  Box,
  Container,
  Divider,
  Group,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PatternIndexRow } from "@/components/common/pattern-index-row";
import {
  categories,
  getCategoryById,
  getPatternsByCategory,
} from "@/data/patterns";

interface CategoryPageParams {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({
  params,
}: CategoryPageParams): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryById(categorySlug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageParams) {
  const { category: categorySlug } = await params;
  const category = getCategoryById(categorySlug);
  if (!category) notFound();

  const categoryPatterns = getPatternsByCategory(category.id);

  return (
    <Container size="lg" py="xl">
      <Text fz="sm" c="dimmed">
        <Anchor component={Link} href="/patterns" c="dimmed" underline="never">
          Patterns
        </Anchor>
        {" / "}
        <Text span c="var(--mantine-color-violet-filled)" fw={500}>
          {category.name}
        </Text>
      </Text>

      <Title
        order={1}
        className="editorial-display"
        fw={380}
        fz={{ base: 34, md: 46 }}
        mt="sm"
      >
        {category.name}
      </Title>
      <Text c="dimmed" fz="md" mt="xs">
        {category.description} — {categoryPatterns.length} patterns.
      </Text>

      <Group gap="xl" mt="lg" mb={-1} wrap="nowrap" visibleFrom="sm">
        {categories.map((c) => {
          const active = c.id === category.id;
          return (
            <Anchor
              key={c.id}
              component={Link}
              href={`/patterns/${c.id}`}
              fz="sm"
              underline="never"
              c={active ? "inherit" : "dimmed"}
              fw={active ? 600 : 400}
              pb={8}
              bd={
                active
                  ? "2px solid var(--mantine-color-violet-filled)"
                  : "2px solid transparent"
              }
            >
              {c.name} · {getPatternsByCategory(c.id).length}
            </Anchor>
          );
        })}
      </Group>
      <Divider />

      <Box mt="md">
        {categoryPatterns.map((pattern, i) => (
          <PatternIndexRow key={pattern.id} pattern={pattern} index={i} />
        ))}
      </Box>
    </Container>
  );
}
```

(Mobile: the switcher hides below `sm` — breadcrumb + back link cover navigation there; noted for manual QA.)

- [ ] **Step 3: Delete retired components**

```powershell
git rm "apps/docs/src/components/common/category-nav.tsx" "apps/docs/src/components/common/pattern-card.tsx"
```

- [ ] **Step 4: Verify**

Run (workdir `apps/docs`): `pnpm exec tsc --noEmit` → clean (catches any leftover imports). Run (repo root): `pnpm build` → success, 65 pages, all 5 `/patterns/<id>` prerendered.

- [ ] **Step 5: Commit**

```bash
git add apps/docs/src
git commit -m "feat(docs): editorial category pages and retire card components"
```

---

### Task 9: Full gates + interactive QA pass

- [ ] **Step 1: Run all gates from repo root**

```powershell
pnpm lint; if ($?) { pnpm type-check }; if ($?) { pnpm test }
```

Expected: lint clean (pre-existing warnings tolerated), type-check green (packages; docs covered separately), 26 core tests pass.

- [ ] **Step 2: Docs-specific type check + final build**

Workdir `apps/docs`: `pnpm exec tsc --noEmit` → clean.
Repo root: `pnpm build` → 65 pages, redirect entry present.

- [ ] **Step 3: Manual QA with agent-browser against the production build**

Start detached prod server on port 3100 (kill any stale listener first via `Get-NetTCPConnection -LocalPort 3100`), then verify with `cmd /c "agent-browser …"`:

- `/`: hero renders in Fraunces, install pill copies, `#about` anchor scrolls to dark band, footer links present, no sidebar.
- Dark mode toggle: stats hairlines/origin band/violet accents legible on `/`, `/patterns`, one category page.
- `/patterns`: typing filters groups; tag pill toggles; rows navigate to workbench.
- `/patterns/prompt-actions`: switcher underlines active, navigates between categories, rows numbered 001–013.
- Keyboard: Tab reaches nav links, pills, and rows; focus rings visible.
- 375px viewport: rows show number+name only; hero buttons wrap cleanly; switcher hidden.
- Workbench regression: open one pattern page, flip framework segmented control, confirm URL sync still works (body font is now Inter — glance for clipped labels).
- Kill the server afterward via port PID.

- [ ] **Step 4: Fix anything found, commit fixes individually**

Conventional commits (`fix(docs): …`).

---

## Self-Review Notes (already applied)

- Spec coverage: route groups (T4), fonts/theme (T1), FEATURED_SLUGS (T2), atoms (T3), all five home sections + absorbed About + redirect (T5–T6), both browse pages + retirements (T7–T8), verification incl. 65-page expectation (T6/T9). Sidebar-off-home and sidebar-on-browse fall out of the group layouts (T4). Dark mode via `light-dark()`/tokens throughout. A11y: aria-hidden index numbers (T3), labeled search input (T7), focus rings via Mantine defaults.
- Type consistency: `PatternMeta` imported from `@patternbase/core` in T3 matches `data/patterns.ts` usage; `getFilteredPatterns` signature matches its T7 call site; `FEATURED_SLUGS` consumed via `getPatternBySlug` returning `PatternMeta | undefined` with a type-guard filter.
- Known intentional deviations from the mockup (recorded here so QA doesn't "fix" them): stats strip uses `Grid.Col withBorder` framing instead of interior-only dividers; tag filters hidden below `lg` (single collapse point); mobile category switcher hidden below `sm`.
