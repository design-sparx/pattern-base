# Mantine Migration Plan

Last updated: 2026-03-08

## Objective

Migrate UI surfaces to Mantine incrementally while preserving current behavior, strict typing, and production build stability.

## Scope

- Replace legacy/shared UI primitives with Mantine equivalents in `components/`, `layouts/`, and route UIs in `app/`.
- Align app-wide theming and layout patterns with Mantine provider setup.
- Keep API/data logic unchanged unless UI integration requires minimal contract updates.
- Treat integration-specific UI under `src/webparts/` as a separate migration batch.

## Workstreams

## WS1: Theme and Providers

- [ ] Verify `MantineProvider` placement at root app shell.
- [ ] Define/confirm shared design tokens in a single theme module.
- [ ] Standardize global spacing/typography/radius scales.
- [ ] Confirm color semantics for success/warning/error/info states.

## WS2: Shared UI Primitives

- [ ] Inventory base primitives currently used across features (buttons, inputs, modal, table, badges, alerts).
- [ ] Replace internal wrappers with Mantine-backed implementations while keeping existing prop contracts where feasible.
- [ ] Add compatibility notes for any breaking prop differences.

## WS3: Layout Migration

- [ ] Migrate shared shells in `layouts/` to Mantine layout primitives.
- [ ] Validate navigation/sidebar/header behavior across breakpoints.
- [ ] Verify spacing and scroll behavior parity.

## WS4: Route Migration (App Router)

- [ ] Migrate route UIs in `app/` batch-by-batch by traffic/priority.
- [ ] Preserve loading, empty, and error states.
- [ ] Verify forms and validation UX consistency after each batch.

## WS5: Legacy/Integration Surfaces

- [ ] Audit `src/webparts/` components and classify as migrate/retain/deprecate.
- [ ] Migrate only actively used integration surfaces.
- [ ] Defer low-value legacy screens until core app surfaces are complete.

## Phases

## Phase 1: Foundation (WS1)

- [ ] Confirm Mantine packages and versions in `package.json` and lock compatible versions.
- [ ] Set up/verify global Mantine provider at app root.
- [ ] Define shared theme tokens (colors, spacing, typography, radii).
- [ ] Add baseline styles and normalize usage guidance.

## Phase 2: Core Layouts and Primitives (WS2, WS3)

- [ ] Migrate shared shells in `layouts/`.
- [ ] Migrate high-traffic reusable components in `components/`.
- [ ] Ensure responsive behavior parity on mobile and desktop.

## Phase 3: Route-Level UI (WS4)

- [ ] Migrate route UIs in `app/` by priority.
- [ ] Validate form behavior, validation messages, and loading states.
- [ ] Verify accessibility basics (labels, focus flow, keyboard navigation).

## Phase 4: Legacy and Cleanup (WS5)

- [ ] Remove dead styles/components replaced by Mantine.
- [ ] Simplify duplicated UI utilities.
- [ ] Update internal docs and contribution notes.

## Validation Checklist

- [ ] `pnpm run lint` passes.
- [ ] `pnpm run type-check` passes.
- [ ] `pnpm build` passes.
- [ ] Critical user flows tested manually.
- [ ] No visual regressions in primary layouts/routes on desktop and mobile.

## Batch Tracker

## Batch A: Foundation

- [ ] Theme/provider setup complete.
- [ ] Global style baseline validated.

## Batch B: Shared Components

- [ ] Core primitives migrated in `components/`.
- [ ] Consumers updated without behavior regressions.
- [ ] Candidate files listed and prioritized.

Candidate files (`components/`):

- [ ] `<fill-after-scan>/Button*`
- [ ] `<fill-after-scan>/Input*`
- [ ] `<fill-after-scan>/Modal*`
- [ ] `<fill-after-scan>/Table*`
- [ ] `<fill-after-scan>/Form*`

## Batch C: Layouts

- [ ] Shells migrated in `layouts/`.
- [ ] Responsive checks complete.
- [ ] Candidate files listed and prioritized.

Candidate files (`layouts/`):

- [ ] `<fill-after-scan>/AppShell*`
- [ ] `<fill-after-scan>/Dashboard*`
- [ ] `<fill-after-scan>/Auth*`
- [ ] `<fill-after-scan>/Navigation*`
- [ ] `<fill-after-scan>/Header*`

## Batch D: App Routes

- [ ] Priority routes in `app/` migrated.
- [ ] Form and state UX validated.

## Batch E: Legacy Integrations

- [ ] Active surfaces in `src/webparts/` handled.
- [ ] Deprecated surfaces documented.

## Risks and Mitigations

- Styling regressions:
  - Mitigation: migrate in small batches and compare affected screens.
- Component behavior drift:
  - Mitigation: preserve prop contracts where possible and add focused tests.
- Timeline risk from broad scope:
  - Mitigation: prioritize high-impact routes first and defer low-value refactors.

## Change Log

- 2026-03-08: Initialized `MANTINE_PLAN.md` with phased migration checklist.
- 2026-03-08: Expanded into folder-based workstreams and execution batches.
