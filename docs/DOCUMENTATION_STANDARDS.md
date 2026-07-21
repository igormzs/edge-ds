# EDGE-DS Documentation Standards
### Page ⇄ Canvas 1:1 Translation Law

**Status:** Ratified — established and verified against the `<ButtonGroup>` documentation page (`src/app/styleguide/components/button-group/page.tsx`) and its Figma twin (file `EDGE Design System - New`, page `Button Group`, master frame *"Button Group — Documentation"*).

This document is the single source of truth for how every component's **web styleguide page** and its **Figma documentation canvas** must be built so the two stay pixel-aligned. Any new component doc (website or Figma) must follow this structure exactly. If a future change breaks 1:1 parity, this file — not tribal memory — is what gets updated first.

---

## 1. Anatomy of the Figma Canvas Wrapper

Every component gets exactly **one master frame** simulating a browser viewport.

| Property | Value |
|---|---|
| Type | Frame, Auto-Layout `VERTICAL` |
| Width | `1440px` fixed (`1200px` acceptable for narrower components) |
| Height | `Hug contents` (`primaryAxisSizingMode: AUTO`) |
| Background | Light grey, `#F8FAFB` (`r:0.973 g:0.980 b:0.984`) |
| Item spacing (top level) | `0` — the master frame holds exactly two children (see below); all page-margin spacing lives one level down |
| Outer padding | `0` on the master itself — the top header must be able to bleed full-width |

### 1.1 Two, and only two, direct children

1. **Top Header — EDGE-DS** — full-bleed, dark, sits *outside* the page-margin system so it spans the entire 1440px width edge-to-edge, exactly like a real site's `<nav>`/`<header>`.
2. **Page Content** — an inner Auto-Layout wrapper that owns the single page margin for everything else.

> **Why two levels, not one:** if the master frame itself carried the lateral padding, the top header would get squeezed in from both sides too. Splitting "chrome" (top header) from "content" (everything else) is what lets the header bleed full-width while the content column gets proper margins — matching how real web layouts nest `<header>` outside a padded `<main>`.

### 1.2 "Top Header — EDGE-DS" (the chrome)

| Property | Value |
|---|---|
| Layout | Auto-Layout `HORIZONTAL` |
| Padding | `24px` vertical, `48px` horizontal |
| Background | Dark slate, `#262D33` (`r:0.149 g:0.176 b:0.204`) |
| Contents | Logomark (28×28, `cornerRadius: 8`, teal `#009F9B`) + "EDGE-DS" wordmark (Montserrat SemiBold 20px, bright teal `#079C9C`) stacked above a "Documentation" subtitle (bound to `Caption`, muted grey) |

### 1.3 "Page Content" (owns the page margin)

| Property | Value |
|---|---|
| Layout | Auto-Layout `VERTICAL` |
| Padding | `40px` top, `120px` bottom (extra breathing room after the final section — raised from `40px` on 2026-07-15 for the master template), **`48px` left/right** (the page margin — `64px` is acceptable for wider layouts, but must match whatever the Top Header visually implies) |
| Item spacing | `64px` between every direct child (Title Intro Block, each Section Wrapper) |
| Width | `Fill container` (spans the master frame's full 1440px) |
| Background | none (transparent — the master frame's grey shows through) |

**Rule:** no other frame in the whole page should apply its own lateral inset. The page margin exists in exactly one place. If a child needs to look inset, that's what the *Card* padding (§2.2) is for, not a second page-level padding.

---

## 2. Section Blocks (the "Section Wrapper")

Every section (Visual Variants, Orientation, Sizing, Interactive States, Key Props, Specs & Accessibility Notes) is one **Section Wrapper**, and every Section Wrapper has exactly the same two-child anatomy.

| Property | Value |
|---|---|
| Layout | Auto-Layout `VERTICAL` |
| Background | **None** — `fills: []`, fully transparent |
| Width | `Fill container` (spans Page Content's inner width) |
| Item spacing | `20px` between Child 1 (Title Row) and Child 2 (Card) |

### 2.1 Child 1 — The Title Row

The section title sits **outside and above** the white card, directly on the page's grey background — never inside the card.

| Property | Value |
|---|---|
| Layout | Auto-Layout `HORIZONTAL`, `counterAxisAlignItems: CENTER` |
| Width | `Fill container` |
| Item spacing | `8px` between the title text and the divider line |
| Title text | **UPPERCASE**, bound to the `Overline` text style (see §3) |
| Divider | A 1px-tall rectangle, fill `#000000` at `8%` opacity, `layoutSizingHorizontal: FILL` so it auto-stretches to consume all remaining row width and touch the right edge — this means it automatically shortens or lengthens based on the title's character count, no manual resizing ever needed |

### 2.2 Child 2 — The Component Container Card

| Property | Value |
|---|---|
| Background | Solid white, `#FFFFFF` |
| Border | `1px` solid, `#000000` at `8%` opacity (**no drop shadow** — matches the live site's `<Paper elevation={0}>`, border-only) |
| Corner radius | `8px` |
| Inner padding | `28px` on all sides (anywhere in the `24–32px` range is acceptable; 28px is what's currently built) |
| Width | `Fill container` (matches the Title Row above it, so both align to the exact same left/right edge — this is the "invisible alignment grid" that makes the whole page feel gridded) |
| Content | The live, interactive component instances / matrices / tables for that section |

---

## 3. Typography — Zero Hardcoded Text Properties

**Every text layer in the documentation canvas must be bound to an official Figma Text Style via `textStyleId`** (not merely styled to *look* the same). A raw/unlinked text node — even if its font, size, and color happen to match — fails this standard. When selecting a compliant text node in Figma, the Properties panel must show the linked style name and an active link icon, never editable raw font fields.

| Role | Token | Real style spec |
|---|---|---|
| Page Title | `Heading/Medium` | Montserrat SemiBold, 34px, letterSpacing `-0.34px`, lineHeight `123.5%` |
| Section Headers (all-caps) | `Overline` | Open Sans SemiBold, 12px, letterSpacing `0.9px`, lineHeight `266%`, `textCase: UPPER`, muted slate `#5E6E7D` |
| Body paragraphs / descriptive copy | `Body/Medium` | Open Sans Regular, 16px, lineHeight `150%` |
| Component sub-labels / captions | `Caption` | Open Sans Regular, 12px, letterSpacing `0.48px`, lineHeight `166%`, grey `#9E9E9E` |
| Metadata / badges (e.g. "MUI Docs ↗") | `Body/Extra-Small` | Open Sans SemiBold, 12px |
| Table headers (Prop / Type / Default / Description) | `Table/Header` | Roboto Medium, 14px, letterSpacing `0.17px` |
| Specs paragraphs & table body cells | `Body/Small` | Open Sans Regular, 14px, letterSpacing `0.06px`, lineHeight `143%` |

**Fill color is independent of the text style** — `textStyleId` only governs font family/weight/size/spacing/line-height/case. Each role above still needs its color set explicitly per the palette (e.g. `Overline` titles and `Body/Medium` descriptions both use muted slate `#5E6E7D`; captions use lighter grey `#9E9E9E`; table "Prop" values use teal `#009F9B`). Binding the style does not remove the need to also bind or set the correct fill.

### 3.1 Known, deliberate exception

There is currently **no official EDGE monospace/code text style** in the library. Inline "code" values (e.g. the `Prop`/`Type` mono badges in a Key Props table, like `variant`, `"contained" | "outlined"`) are left as literal Roboto Mono rather than force-bound to an unrelated token. **Action item:** create an official `typography/code` (or `mono/inline`) style, then migrate these nodes to it. Until that exists, this is the one sanctioned gap in the "zero hardcoded" rule.

### 3.2 Known deviation from the live website's literal CSS

The live website's `DocSection`/`PageHeader`/`PropsTable` components (in `src/components/DocUI.tsx`) use **hardcoded inline `sx` values**, not the official Figma text style tokens — e.g. the real `DocSection` title is Montserrat Bold 13px with an 8px gap, not Open Sans SemiBold 12px at 266% line-height like the `Overline` token. This standard **intentionally prioritizes binding to the official token** over matching that literal inline CSS number-for-number, per explicit design-system direction. The visual result reads as equivalent at a glance; a strict pixel-diff between the Figma canvas and the rendered website will show minor (1–2px) typographic deltas as a result. This is accepted, not a bug.

---

## 4. Page Order (top → bottom)

Every component documentation canvas — Figma and website alike — follows this exact section order. Do not reorder, and do not add a `Usage`/code-block section to the Figma canvas (the website may keep one; the canvas replaces it with the Key Props table, per §4.6).

1. **Top Dark Header** — EDGE-DS logo + "Documentation" subtitle (§1.2). Full-bleed, outside the page margin.
2. **Title Intro Block** (a.k.a. Page Header) — component name (`Heading/Medium`) + a top-right "`{Library} Docs ↗`" badge (`Body/Extra-Small`, teal-bordered pill) in a space-between row, followed by a description paragraph (`Body/Medium`, muted slate, ~1000px max width).
3. **Visual Variants** — the full variant matrix (color × variant × orientation, etc.), *including* any hybrid/composite sub-groups (e.g. "Hybrid Compositions — Icon + Button layouts") nested inside this same Section Wrapper as a labeled sub-block, not a separate top-level section.
4. **Orientation** — every supported orientation (horizontal/vertical, etc.), each labeled with a `Caption`-bound sub-label.
5. **Sizing** — every supported size (small/medium/large), each labeled.
6. **Interactive States** — trimmed to the states that are visually distinguishable and meaningful on a static canvas: `Default`, `Disabled`, and any compound interaction pattern the component supports (e.g. a split-button trigger). Do not include simulated `Hover`/`Active` states that require a live cursor to demonstrate — they add noise without adding information on a static canvas.
7. **Key Props Table** — see §4.6.
8. **Specs & Accessibility Notes** — the last section, always. Plain-text callouts (teal `Body/Extra-Small` sub-headings + `Body/Small` explanatory paragraphs) covering: geometry/sizing rules, corner-radius or divider-token rules, and accessibility requirements (ARIA roles, labels, focus behavior).

### 4.1 The Key Props Table

Replaces the website's `Usage` code-block section on the Figma canvas only (the website keeps its code snippet; Figma does not reproduce code blocks). Structure:

- A bordered, rounded (`8px`) table frame, Auto-Layout `VERTICAL`, `strokeWeight: 1`, border `#000000` at 8% opacity.
- Header row: light grey background (`#F8FAFB`), columns **Prop | Type | Default | Description**, text bound to `Table/Header`.
- One data row per prop, each row bordered on top only (so rows read as a ruled table, not a boxed grid). Columns:
  - **Prop** — Roboto Mono (see §3.1 exception), teal `#009F9B`.
  - **Type** — Roboto Mono (see §3.1 exception), muted slate `#5E6E7D`.
  - **Default** — `Body/Small`, grey `#9E9E9E`.
  - **Description** — `Body/Small`, near-black `#212121`.
- Column widths: `Prop` fixed ~180px, `Type` fixed ~340px, `Default` fixed ~100px, `Description` set to `Fill container` (absorbs any remaining row width responsively).

---

## 5. Figma Automation Notes (for whoever builds the next one)

These are hard-won lessons from building this standard the first time — read before writing a script that restructures an existing section.

1. **Sections/Frames, not Sections-the-Figma-object.** Figma's native "Section" node has no Auto-Layout support. Every structural block in this spec is a `FRAME` with `layoutMode` set, never a `SECTION`.
2. **`layoutSizingHorizontal/Vertical = 'FILL'` only works after the node is already parented inside an Auto-Layout frame.** Append first, set sizing second — never the reverse.
3. **Never flip a frame's `layoutMode` while it still holds children whose original absolute (x, y) you need to preserve.** The instant `layoutMode` changes to `VERTICAL`/`HORIZONTAL`, Figma immediately reflows every current child to Auto-Layout rules — reading `child.x`/`child.y` even one line later returns the *new*, reflowed values, not the originals. **Capture every coordinate you'll need into plain variables *before* touching the parent's `layoutMode`.**
4. **Treat script failures as non-atomic.** A script that throws partway through may still have partially executed (created/moved/resized nodes) up to the failure point — don't assume a clean rollback. Re-inspect the actual node tree after any error before retrying, and clean up stray/duplicate nodes (e.g. an orphaned empty "Card") before re-running.
5. **Re-derive layout after any font-size change.** A caption or paragraph that grows from 10px→12px or 11px→14px will not automatically avoid its neighbors if they were positioned with hardcoded absolute offsets. Recompute column/row positions from each node's actual post-change `.width`/`.height` — never assume the old spacing still fits.
6. Card width should always equal the Section Wrapper's Fill width (i.e. Page Content's inner content width, currently `1440 − 48 − 48 = 1344px`). If a row of instances doesn't fit at that width with the section's original gap, tighten the gap — don't widen the card past the page margin.

---

## 6. Checklist — Applying This Standard to a New Component

- [ ] Master frame created at 1440px width, light grey background, Hug height.
- [ ] Top Header (full-bleed, dark, logo + subtitle) as the master's first child.
- [ ] Page Content wrapper as the master's second child, owning the single 48px page margin.
- [ ] Title Intro Block: title (`Heading/Medium`) + docs-link badge (`Body/Extra-Small`) + description (`Body/Medium`).
- [ ] One Section Wrapper per section in the §4 order — no more, no fewer, no reordering.
- [ ] Every Section Wrapper: transparent background, Title Row (Overline + auto-stretching divider) above a white bordered Card (8px radius, no shadow, ~28px padding).
- [ ] Every text node bound via `textStyleId` to the table in §3 — zero raw/unlinked text nodes except the flagged mono-token exception.
- [ ] Key Props table present, styled per §4.1, positioned directly before Specs & Accessibility Notes.
- [ ] Specs & Accessibility Notes is the final section.
- [ ] Full-frame screenshot re-scan taken and visually diffed against this spec before calling the page done.
