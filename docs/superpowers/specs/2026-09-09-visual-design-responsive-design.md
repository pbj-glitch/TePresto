# TePresto visual design & responsive layout

Date: 2026-09-09
Status: approved (sections reviewed with user in chat)

## Purpose

TePresto (Ionic + Angular, Capacitor mobile shell) is a neighborhood
item-lending app. Auth (`login`/`register`/`forgot-password`/`reset-password`)
and `home` already carry a deliberate coral (`#FF6B6B`) + blue (`#4A90E2`)
"friendly neighborhood" visual identity. `explore`, `history`, and
`add-post` are still untouched Ionic CLI stub pages (`<ion-title>explore</ion-title>`
placeholder content), `profile` is minimally styled, and the app has no
desktop/responsive handling — every page assumes a fixed phone width.

Goal: finish the app's visual design consistently across every page,
make it feel like a native mobile app, and make it usable on a PC-sized
browser window — **visual/layout work only**, no new backend
functionality.

## Scope

**In scope:**
- Design tokens (spacing/radius/shadow) layered on the existing theme.
- Two shared components (`item-card`, `category-chip`) built out from
  their current empty stubs and reused across pages.
- Full visual design for `explore`, `history`, `add-post`, `profile`
  using mock/placeholder data (no Supabase wiring).
- Consistent header/toolbar styling across all tab pages.
- A responsive "phone frame" behavior for desktop viewports.

**Out of scope (explicitly deferred):**
- Real data wiring for `explore` (filtering real items), `history`
  (real loan records), or `add-post` (actual submission/upload) —
  those pages get realistic mock content and stub interactions only.
- Any change to `login`/`register`/`forgot-password`/`reset-password`
  logic or `AuthService`/Supabase integration.
- Removing the unused `tab1`/`tab2`/`tab3` CLI leftovers (not
  referenced by any route) — out of scope, can be cleaned up separately.

## 1. Design tokens

Extend `src/theme/variables.scss` (which already defines the coral
primary / blue secondary / success palette) with additional CSS custom
properties, introduced as a `--tp-*` namespace so they're clearly
project-specific rather than Ionic's own tokens:

- `--tp-space-xs/sm/md/lg/xl` (e.g. 4/8/16/24/32px)
- `--tp-radius-sm/md/lg` (e.g. 8/16/24px)
- `--tp-card-shadow`, `--tp-card-border` (extracted from home's current
  `.product-card` values: `1px solid #f0f0f0`, no shadow — kept as-is,
  just named)
- `--tp-surface` (`#fafafa`, current card background), `--tp-text-muted`
  (maps to existing `--ion-color-medium` usage)

Existing pages (`login`, `register`, `forgot-password`,
`reset-password`, `home`, `tabs`) get their hardcoded values swapped for
these tokens where they match. This is a refactor, not a visual change
— screenshots before/after should look identical.

## 2. Shared components

`src/app/components/item-card/` and `src/app/components/category-chip/`
currently contain only CLI-generated placeholder markup (`item-card
works!`) and are unused. Build them into real components:

- **`item-card`**: inputs take an `Item` (from `item.model.ts`);
  renders the image, status badge, title, subtitle (distance + owner),
  rating, and guarantee price — matching `home.page.html`'s current
  inline card markup exactly, using the tokens from §1.
- **`category-chip`**: inputs take a label and a selected/active state;
  renders a pill-shaped filter chip using `--ion-color-primary` for the
  active state.

Refactor `home.page.html` to render `<app-item-card>` instead of its
inline `ion-card` markup (visual output unchanged). `explore` uses both
components directly.

## 3. Page content (mock data, no backend wiring)

- **Explore** (`explore.page.html`): a searchbar (matching home's
  style) + a horizontal scrollable row of `category-chip` filters
  (categories sourced from `ItemService`'s existing mock items, e.g.
  "Herramientas", "Electrónica") + a grid of `item-card`s. Filtering by
  chip/search text is client-side against `ItemService`'s existing mock
  array — no new service or Supabase call.
- **History** (`history.page.html`): a small local mock array of past
  loan/borrow activity (item title, counterpart name, date, status:
  `Devuelto` / `Activo` / `Atrasado`), rendered as list rows (not
  cards) grouped by date section — visually distinct from the
  browse/grid pages. Status shown via a colored dot or small badge
  reusing existing status-badge coloring conventions from `item-card`.
- **Add-post** (`add-post.page.html`): a form styled like the auth
  pages (floating-label `ion-input`s): title, category (`ion-select`),
  guarantee price, description (`ion-textarea`), and a tap-target photo
  placeholder tile (visual only — no file picker wiring). Submit button
  present but a no-op stub (e.g. logs to console or shows a disabled
  state) since posting isn't implemented yet.
- **Profile** (`profile.page.html`): keep the existing structure
  (avatar, name, email, logout button) restyled with §1 tokens to match
  the rest of the app, plus a static settings/menu list below it (e.g.
  "Mis publicaciones", "Ayuda") using `ion-list`/`ion-item` — links are
  inert placeholders, not routed.

## 4. Header/navigation consistency

Replace the default Ionic CLI header pattern currently in `explore`,
`history`, and `add-post` (plain `<ion-title>explore</ion-title>` plus
a redundant `collapse="condense"` large-title header) with the same
toolbar style `home.page.html` already uses: `<ion-toolbar
color="light">` with a bold, primary-colored `<ion-title>`, and proper
Spanish titles ("Explorar", "Historial", "Publicar"). The bottom tab
bar (`tabs.page.html`, with its coral FAB-style center button) is
already consistent and unchanged.

## 5. Full-width responsive layout for desktop

Revised after the first implementation pass: rather than a centered
"phone frame," the app uses the full viewport width on desktop. The
`home`/`explore` item grids use Ionic's built-in `ion-col` breakpoint
sizes (`size="6" sizeMd="4" sizeLg="3" sizeXl="2"`) so more cards fit
per row as the viewport widens — 2 columns on phones, up to 6 on large
desktops. Toolbars, the searchbar, and the bottom tab bar simply
stretch to the full width (no per-page changes needed there). Auth
pages, `add-post`, and `profile` already cap their own content at a
readable max-width (~360–420px) and center via `margin: 0 auto`, so
they don't need extra desktop handling. No global "phone frame"
container is used.

## Testing / verification

This is a visual/layout task — verified by running the dev server
(`ng serve` / `npm start`) and checking each page in a browser:

- Every page (auth pages, home, explore, history, add-post, profile)
  at phone width: consistent look, tokens applied, no regressions vs.
  current home/login appearance.
- Explore: search + chip filtering actually filters the mock grid.
- Desktop width (>768px): grids show additional columns (home,
  explore) and the rest of the app fills the width without clipping or
  breaking scrolling.
- Existing unit tests (`ng test` / vitest) continue to pass — no
  component logic is meaningfully changed, but `item-card`/
  `category-chip` get real (currently trivial/default) spec files
  updated to match their new templates if they fail.
