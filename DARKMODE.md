# Dark Mode Implementation Checklist

## Phase 1 — Docs Preview Toggle

> Goal: when the user toggles dark mode in the docs header, the component preview area reflects it.
> The docs already has `useMantineColorScheme` + `toggleColorScheme` wired in the header. Mantine's `colorScheme` is the source of truth.

**File: `apps/docs/src/components/preview/component-preview.tsx`**

- [x] Import `useMantineColorScheme` from `@mantine/core`
- [x] Import `ConfigProvider, theme as antdTheme` from `antd`
- [x] Call `const { colorScheme } = useMantineColorScheme()` inside the component
- [x] Wrap the Bootstrap preview render with `<div data-bs-theme={colorScheme}>...</div>`
- [x] Wrap the Ant Design preview render with `<ConfigProvider theme={{ algorithm: colorScheme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm }}>...</ConfigProvider>`
- [ ] Verify: toggle dark mode in docs header, both Bootstrap and Ant Design previews update

---

## Phase 2 — Bootstrap: Replace Hardcoded Colors

> Goal: custom inline styles that bypass Bootstrap's theming system must use Bootstrap CSS variables so they respond to `data-bs-theme`.
> Bootstrap 5.3+ CSS variables reference: `var(--bs-border-color)`, `var(--bs-emphasis-color)`, `var(--bs-secondary-color)`, `var(--bs-success-bg-subtle)`, `var(--bs-success-border-subtle)`, `var(--bs-purple)`, `var(--bs-primary)`, `var(--bs-warning)`, `var(--bs-success)`.

**File: `packages/bootstrap/src/components/color/color.tsx`**

- [x] `"2px solid #111"` → `"2px solid var(--bs-emphasis-color)"`
- [x] `"1px solid #ced4da"` → `"1px solid var(--bs-border-color)"`

**File: `packages/bootstrap/src/components/restructure/restructure.tsx`**

- [x] `background: "#f0fff4"` → `background: "var(--bs-success-bg-subtle)"`
- [x] `border: "1px solid #c6f6d5"` → `border: "1px solid var(--bs-success-border-subtle)"`

**File: `packages/bootstrap/src/components/stream-of-thought/stream-of-thought.tsx`**

- [x] `thinking` color `#8b5cf6` → `var(--bs-purple)`
- [x] `action` color `#3b82f6` → `var(--bs-primary)`
- [x] `tool_call` color `#f59e0b` → `var(--bs-warning)`
- [x] `result` color `#10b981` → `var(--bs-success)`
- [x] Timestamp/meta color `#6b7280` (x2) → `var(--bs-secondary-color)`

---

## Phase 3 — Ant Design: Replace Hardcoded Colors with Design Tokens

> Goal: replace all hardcoded hex values with Ant Design v5 design tokens via `theme.useToken()`.
> Pattern per component: add `const { token } = theme.useToken()` at the top of the component function, then substitute.
> Token reference: `token.colorSuccess`, `token.colorError`, `token.colorPrimary`, `token.colorBorder`, `token.colorBorderSecondary`, `token.colorBgLayout`, `token.colorBgContainer`, `token.colorText`, `token.colorTextSecondary`, `token.colorTextTertiary`, `token.colorSuccessBg`, `token.colorSuccessBorder`, `token.colorWhite`.

**File: `packages/antd/src/components/action-plan/action-plan.tsx`**

- [x] Add `const { token } = theme.useToken()` (move status icon map inside component)
- [x] `#52c41a` → `token.colorSuccess`
- [x] `#ff4d4f` → `token.colorError`
- [x] `#8c8c8c` → `token.colorTextTertiary`

**File: `packages/antd/src/components/attachments/attachments.tsx`**

- [x] Add `const { token } = theme.useToken()`
- [x] `#d9d9d9` → `token.colorBorder`

**File: `packages/antd/src/components/citation/citation.tsx`**

- [x] Add `const { token } = theme.useToken()`
- [x] `#1890ff` (x3 — text color, border-left, background button) → `token.colorPrimary`
- [x] `#fafafa` → `token.colorBgLayout`
- [x] `#6b7280` → `token.colorTextSecondary`
- [x] `#fff` → `token.colorWhite`

**File: `packages/antd/src/components/chained-action/chained-action.tsx`**

- [x] Add `const { token } = theme.useToken()` (move status icon map inside component)
- [ ] `#52c41a` → `token.colorSuccess`
- [ ] `#ff4d4f` → `token.colorError`

**File: `packages/antd/src/components/color/color.tsx`**

- [x] Add `const { token } = theme.useToken()`
- [x] `#111` → `token.colorText`
- [x] `#d9d9d9` → `token.colorBorder`

**File: `packages/antd/src/components/controls/controls.tsx`**

- [x] Add `const { token } = theme.useToken()`
- [x] `#f0f0f0` → `token.colorBorderSecondary`

**File: `packages/antd/src/components/describe/describe.tsx`**

- [x] Add `const { token } = theme.useToken()`
- [x] `#fafafa` → `token.colorBgLayout`

**File: `packages/antd/src/components/gallery/gallery.tsx`**

- [x] Add `const { token } = theme.useToken()`
- [x] `#1677ff` → `token.colorPrimary`

**File: `packages/antd/src/components/inline-action/inline-action.tsx`**

- [x] Add `const { token } = theme.useToken()`
- [x] `#d9d9d9` → `token.colorBorder`

**File: `packages/antd/src/components/madlibs/madlibs.tsx`**

- [x] Add `const { token } = theme.useToken()`
- [x] `#fafafa` → `token.colorBgLayout`
- [x] `#d9d9d9` → `token.colorBorder`

**File: `packages/antd/src/components/memory/memory.tsx`**

- [x] Add `const { token } = theme.useToken()`
- [x] `#f0f0f0` → `token.colorBorderSecondary`

**File: `packages/antd/src/components/parameter-control/parameter-control.tsx`**

- [x] Add `const { token } = theme.useToken()`
- [x] `#999` → `token.colorTextSecondary`

**File: `packages/antd/src/components/references/references.tsx`**

- [x] Add `const { token } = theme.useToken()`
- [x] `#f0f0f0` → `token.colorBorderSecondary`

**File: `packages/antd/src/components/restructure/restructure.tsx`**

- [x] Add `const { token } = theme.useToken()`
- [x] `#f6ffed` (x2) → `token.colorSuccessBg`
- [x] `#b7eb8f` (x2) → `token.colorSuccessBorder`

**File: `packages/antd/src/components/stream-of-thought/stream-of-thought.tsx`**

- [x] Add `const { token } = theme.useToken()`
- [x] `#6b7280` (x2, Badge backgroundColor) → `token.colorTextSecondary`
- [x] `#f0f0f0` (x2, borderTop, border) → `token.colorBorderSecondary`
- [x] `#999` (pre color) → `token.colorTextTertiary`

**File: `packages/antd/src/components/synthesis/synthesis.tsx`**

- [x] Add `const { token } = theme.useToken()`
- [x] `#fafafa` → `token.colorBgLayout`

**File: `packages/antd/src/components/transform/transform.tsx`**

- [x] Add `const { token } = theme.useToken()`
- [x] `#d9d9d9` → `token.colorBorder`

**File: `packages/antd/src/components/variations/variations.tsx`**

- [x] Add `const { token } = theme.useToken()`
- [x] `#f0f0f0` → `token.colorBorderSecondary`
- [x] `#1890ff` (x2, borderColor) → `token.colorPrimary`

---

## Final Verification

- [x] `pnpm build` — no TypeScript errors
- [x] `pnpm lint` — no new lint errors introduced
- [ ] Manual smoke test: toggle dark mode in docs, walk through all 36 pattern previews checking for unthemed elements
- [ ] Check both Bootstrap and Ant Design tabs for each pattern in dark mode
