# EDGE-DS Figma Component Structure

**Status:** Ratified. Consolidates `docs/DOCUMENTATION_STANDARDS.md` (the Two-Frame Canvas Architecture, ratified 2026-07-27 against `<Switch>`) and `EDGE-DS-Component-Migration-Playbook.md` (the token migration workflow, validated on `<Button>`, 573 nodes, 0 regressions) into one canonical reference. Both source documents are archived at `docs/archive/process/`, read this file instead of either.

**Scope:** this file governs the **Figma side** of a component (token migration + the Figma documentation canvas). For the paired web styleguide page, see `docs/web-component-page-pattern.md`.

---

## 0. Two Core Frames Architecture

Every component's Figma page holds exactly **two top-level frames, placed side by side** (same `y`, `x` offset by the first frame's width plus a gap):

1. **`<ComponentName> - Component Gallery`**: a styled frame (dark Top Header, a `Gallery Header` intro block, see §1.4) wrapped directly **around the real, live `COMPONENT_SET` node(s)** — one `MASTER COMPONENT SET - <ComponentName> Section` per master the component owns (a component with related sub-components, e.g. Switch's Switch/FormControlLabel/FormGroup trio, gets one section each, all inside the same Gallery frame).
   - **The Gallery is not a grid of child instances. It IS the master, viewed directly.** Reparent the actual `COMPONENT_SET` node into the section's `Master Container` (a plain frame, `layoutMode: NONE`) — do not `createInstance()` a copy of every variant to rebuild the grid by hand. Figma already lays out a component set's variants in a grid from the set's own child `x`/`y` positions; the Gallery frame's job is to add chrome and axis-label annotations around that existing layout, never to reconstruct it from instances.
   - **Why this matters:** an instance-based reconstruction is a second, hand-maintained copy of the same 200+ variants the master already has — it drifts the moment the master changes (a new color, a restyled focus ring) and the Gallery silently goes stale. Reparenting the real set means the Gallery is always exactly current, by construction.
   - Reparenting a `COMPONENT_SET` (or any node) does not break existing instances anywhere in the file — Figma instances resolve by persistent node ID, not by tree position, so moving the master is always safe. Verify this after moving: re-check that pre-existing instances (in the Documentation frame's Visual Preview, or anywhere else in the file) still resolve to the moved set's ID.
   - Add axis-label text annotating the set's own native grid (`Overline`-weight major-axis labels, e.g. `PRIMARY`, `ENABLED`, positioned at each axis band's start/center; lighter sub-axis labels for a second variant property sharing the same axis) — labels are read off the set's actual child `x`/`y` coordinates (group children by shared `x` or `y`, don't assume a uniform spacing), not fabricated from the variant property list alone.
   - **Build only what's real.** Query the live component set's variant names first and confirm actual coverage before labeling an axis, do not fabricate a uniform grid assuming every axis combination exists. Note any gap you find (e.g. an Indeterminate or Disabled axis only built for one representative color, or a Loading state only built for one color), do not silently smooth it over.
   - Not width-constrained to 1440px like the Documentation frame, this is a visual browsing canvas, size it to whatever comfortably fits the real variant count.
   - A component's other real, live master sets that don't yet have their own full documentation pass (e.g. a closely-related component like Button's `<IconButton>`) still need a home once extracted from any legacy wrapper — park them in their own `MASTER COMPONENT SET - <Name> Section` inside the same Gallery frame, clearly labeled as out of scope for the current pass, rather than leaving them as a stray extra top-level frame or leaving them buried inside archived legacy chrome.

2. **`<ComponentName> - Documentation`**: the canonical text-based spec page, the single-column, 1440px, webpage-simulation frame described in full below (§1 to §4). Its "Visual Variants" section is a **small representative preview only** (3 to 6 illustrative instances covering the component's main states), it does not attempt to show every variant, that job belongs entirely to the Component Gallery frame.

---

## 1. Anatomy of the Documentation Frame Wrapper

Every component gets exactly **one master frame** simulating a browser viewport.

| Property | Value |
|---|---|
| Type | Frame, Auto-Layout `VERTICAL` |
| Width | `1440px` fixed (`1200px` acceptable for narrower components) |
| Height | `Hug contents` (`primaryAxisSizingMode: AUTO`) |
| Background | Light grey, `#F8FAFB` |
| Item spacing (top level) | `0`, the master frame holds exactly two children, all page-margin spacing lives one level down |
| Outer padding | `0` on the master itself, the top header must be able to bleed full-width |

### 1.1 Two, and only two, direct children

1. **Top Header - EDGE-DS**: full-bleed, dark, sits outside the page-margin system so it spans the entire width edge-to-edge, exactly like a real site's `<nav>`/`<header>`.
2. **Page Content**: an inner Auto-Layout wrapper that owns the single page margin for everything else.

Splitting "chrome" (top header) from "content" (everything else) is what lets the header bleed full-width while the content column gets proper margins, matching how real web layouts nest `<header>` outside a padded `<main>`.

### 1.2 "Top Header - EDGE-DS" (the chrome)

| Property | Value |
|---|---|
| Layout | Auto-Layout `HORIZONTAL` |
| Padding | `24px` vertical, `48px` horizontal |
| Background | Dark slate, `#262D33` |
| Contents | Logomark (28x28, cornerRadius 8, teal `#009F9B`) + "EDGE-DS" wordmark (Montserrat SemiBold 20px, bright teal `#079C9C`) stacked above a "Documentation" subtitle (`Caption`, muted grey) |

### 1.3 "Page Content" (owns the page margin)

| Property | Value |
|---|---|
| Layout | Auto-Layout `VERTICAL` |
| Padding | `40px` top, `120px` bottom, `48px` left/right (`64px` acceptable for wider layouts) |
| Item spacing | `64px` between every direct child (Title Intro Block, each Section Wrapper) |
| Width | `Fill container` (spans the master frame's full width) |
| Background | none, transparent, the master frame's grey shows through |

**Rule:** no other frame in the whole page applies its own lateral inset. The page margin exists in exactly one place. If a child needs to look inset, that is what the Card padding (§2.2) is for, not a second page-level padding.

### 1.4 The Intro Block (page header): "Document title" + "Title Group"

The first direct child of `Page Content` (Documentation frame) or `Gallery Content` (Component Gallery frame) is an intro block, `Intro Block` on the Documentation frame, `Gallery Header` on the Component Gallery frame. Same anatomy on both, ratified 2026-07-29 across ButtonGroup, Switch, and Button.

| Property | Value |
|---|---|
| Layout | Auto-Layout `VERTICAL` |
| Width | `Fill container` |
| Height | `Hug contents` |
| Item spacing | `48px` between its two children |
| Background | None, transparent (`fills: []`) |

**Gotcha:** `figma.createAutoLayout()` gives a brand-new frame a default solid white fill. `Intro Block`/`Gallery Header` and the nested `Title Group` are purely structural wrappers, same transparent-background rule as a Section Wrapper (§2), so that default white fill must be explicitly cleared (`node.fills = []`) right after creating them, never left in place.

Its two children, in order:

1. **`Document title`**: a small eyebrow label sitting above everything else. Literal text is `"Documentation"` on the Documentation frame, `"Component Gallery"` on the Gallery frame. Montserrat SemiBold, 24px, letterSpacing `-0.12px`, lineHeight `133.4%`, bound to `Semantic/Text/Secondary`.
2. **`Title Group`**: Auto-Layout `VERTICAL`, `Fill container` width, `Hug contents` height, `24px` item spacing, no fill, containing:
   - **`Title Row`**: the component's real name (e.g. `"Button"`, `"Switch"`, `"ButtonGroup"`), Montserrat SemiBold, 34px, letterSpacing `-0.34px`, lineHeight `123.5%`, bound to `Brand/Primary/500`. On the **Documentation frame only**, `Title Row` is Auto-Layout `HORIZONTAL` with `primaryAxisAlignItems: SPACE_BETWEEN`, pairing the title with a `Badges Row` (`8px` item spacing, three pill badges, `cornerRadius: 999`, no fill, colored stroke only): Category (e.g. `"Components"`), Status (`"Migrated ✓"` once the component's token audit is clean), and `"{Library} Docs ↗"`. **The Component Gallery frame omits `Badges Row` entirely**: the Gallery title sits alone, no tags.
   - **`Subtitle`**: the description paragraph (renamed from the older `Description` layer name), `Body/Medium`.

**Known naming inconsistency, flagged not silently fixed:** the outer intro-block wrapper is named `Intro Block` on Switch's and Button's Documentation frames but `Page Header` on ButtonGroup's (a pre-existing difference from before this pattern was ratified). Both hold the identical `Document title` + `Title Group` anatomy above; do not read the name difference as a structural difference.

---

## 2. Section Blocks (the "Section Wrapper")

Every section is one Section Wrapper, and every Section Wrapper has exactly the same two-child anatomy.

| Property | Value |
|---|---|
| Layout | Auto-Layout `VERTICAL` |
| Background | none, `fills: []`, fully transparent |
| Width | `Fill container` |
| Item spacing | `20px` between Child 1 (Title Row) and Child 2 (Card) |

### 2.1 Child 1: the Title Row

The section title sits outside and above the white card, directly on the page's grey background, never inside the card.

| Property | Value |
|---|---|
| Layout | Auto-Layout `HORIZONTAL`, `counterAxisAlignItems: CENTER` |
| Width | `Fill container` |
| Item spacing | `8px` between the title text and the divider line |
| Title text | UPPERCASE, bound to the `Overline` text style (§3) |
| Divider | 1px-tall rectangle, `#000000` at 8% opacity, `layoutSizingHorizontal: FILL` so it auto-stretches to the row's remaining width |

### 2.2 Child 2: the Component Container Card

| Property | Value |
|---|---|
| Background | Solid white, `#FFFFFF` |
| Border | `1px` solid, `#000000` at 8% opacity, no drop shadow, matches the live site's `<Paper elevation={0}>` |
| Corner radius | `8px` |
| Inner padding | `28px` on all sides (`24 to 32px` acceptable) |
| Width | `Fill container`, matches the Title Row above it |
| Content | The live, interactive component instances / matrices / tables for that section |

### 2.3 Bulleted Content Blocks: Anatomy, Token Architecture, Usage Guidelines, Accessibility

**Ratified 2026-07-29, retroactively confirmed already in place on `<Button>` and `<ButtonGroup>`, applied to `<Switch>` and `<Alert>` in the same pass.** These four text-heavy content types never render as one dense paragraph. Each is a labeled sub-block: a small heading (`Body/Extra-Small`, bound to `Brand/Primary/500`, e.g. `ANATOMY`, `TOKEN ARCHITECTURE`, `USAGE GUIDELINES`, `ACCESSIBILITY`) followed by one of two list container shapes, both Auto-Layout `VERTICAL`, `Fill container` width, no fill:

| Container | Name suffix | Item spacing | Bullet marker |
|---|---|---|---|
| Anatomy content | `... Paragraph Group` | `12px` | None — each element gets its own plain-prose paragraph, no leading glyph |
| Token Architecture / Usage Guidelines / Accessibility content | `... Bullet List` | `6px` | `"•  "` (bullet + two spaces) prefixed directly in the text node's `characters` |

Every list item is its own separate `TEXT` node (`Body/Small`, literal black fill, matching the existing `Body/Small` deviation noted in §3), never one node with embedded `\n` line breaks — this keeps each idea independently editable and lets the Auto-Layout `itemSpacing` control the gap, rather than blank lines baked into the string.

**Usage Guidelines & Accessibility split:** the section's outer title stays combined (`"Usage Guidelines & Accessibility"`), but the card's inner content is always two labeled sub-blocks in sequence — `USAGE GUIDELINES` heading + Bullet List, then `ACCESSIBILITY` heading + Bullet List — never one heading covering both. This mirrors the two-sub-block shape `Anatomy & Token Architecture` already uses (`ANATOMY` + Paragraph Group, then `TOKEN ARCHITECTURE` + Bullet List) and matches the split already ratified for the web pattern (`docs/web-component-page-pattern.md` §4).

**Older-architecture components without a `Usage Guidelines Section`** (e.g. `<ButtonGroup>`, which instead has a separate final `Specs & Accessibility Notes` section per the pre-matrix-card page order) still get the same bulleted-content treatment applied to whatever prose exists there — bullet the individual sub-headed paragraphs (`Corner radius`, `Sizing`, `Dividers`, etc.) the same way, without forcing an artificial `Usage Guidelines` split where no usage-guidance content actually exists. Don't force-fit a shape the section's real content doesn't have.

**Known bug pattern this catches:** a section's own title text can drift out of sync with its layer name after a copy-paste (confirmed on `<ButtonGroup>`'s `Specs & Accessibility Notes` header, whose text content read `"Usage Guidelines & Accessibility"` while the frame itself was named, and structured as, specs/accessibility content — fixed as part of this pass, not left silently).

---

## 3. Typography: Zero Hardcoded Text Properties

Every text layer in the documentation canvas must be bound to an official Figma Text Style via `textStyleId`, not merely styled to look the same. A raw/unlinked text node, even if its font, size, and color happen to match, fails this standard.

| Role | Token | Real style spec |
|---|---|---|
| Page Title | `Heading/Medium` | Montserrat SemiBold, 34px, letterSpacing `-0.34px`, lineHeight `123.5%` |
| Section Headers (all-caps) | `Overline` | Open Sans SemiBold, 12px, letterSpacing `0.9px`, lineHeight `266%`, `textCase: UPPER`, muted slate `#5E6E7D` |
| Body paragraphs / descriptive copy | `Body/Medium` | Open Sans Regular, 16px, lineHeight `150%` |
| Component sub-labels / captions | `Caption` | Open Sans Regular, 12px, letterSpacing `0.48px`, lineHeight `166%`, grey `#9E9E9E` |
| Metadata / badges | `Body/Extra-Small` | Open Sans SemiBold, 12px |
| Table headers | `Table/Header` | Roboto Medium, 14px, letterSpacing `0.17px` |
| Specs paragraphs & table body cells | `Body/Small` | Open Sans Regular, 14px, letterSpacing `0.06px`, lineHeight `143%` |

Fill color is independent of the text style, `textStyleId` only governs font family/weight/size/spacing/line-height/case. Each role above still needs its color set explicitly per the palette.

**Known, deliberate exception:** there is currently no official EDGE monospace/code text style in the library. Inline "code" values (Prop/Type mono badges) are left as literal Roboto Mono rather than force-bound to an unrelated token, until one is created.

**Known deviation from the live website:** the website's `DocSection`/`PageHeader`/`PropsTable` components use hardcoded inline `sx` values, not the official Figma text style tokens (e.g. the real `DocSection` title is Montserrat Bold 13px, not Open Sans SemiBold 12px like `Overline`). This standard intentionally prioritizes binding to the official token over matching that literal inline CSS number for number. The visual result reads as equivalent at a glance, a strict pixel diff will show minor deltas, this is accepted, not a bug.

---

## 4. Page Order (top to bottom)

Every component documentation canvas follows this exact section order. Do not reorder, and do not add a Usage/code-block section to the Figma canvas (the website may keep one, the canvas replaces it with the Key Props table).

1. **Top Dark Header**, full-bleed, outside the page margin.
2. **Intro Block** (see §1.4): a small `Document title` eyebrow label, then a `Title Group` pairing the component name + a top-right badge row (Category, Status, `"{Library} Docs ↗"`) with a description paragraph.
3. **Visual Variants**: a small representative preview, including any hybrid/composite sub-groups nested as a labeled sub-block, not a separate top-level section.
4. **Orientation** (if applicable): every supported orientation, each labeled.
5. **Sizing** (if applicable): every supported size, each labeled.
6. **Interactive States**: trimmed to states that are visually distinguishable on a static canvas (`Default`, `Disabled`, any compound interaction pattern). Do not include simulated Hover/Active states that require a live cursor, they add noise without adding information on a static canvas.
7. **Key Props Table**: see §4.1.
8. **Specs & Accessibility Notes**: always last. Plain-text callouts covering geometry/sizing rules, corner-radius or divider-token rules, and accessibility requirements.

**Open reconciliation item, flagged not silently resolved:** the live web pattern (`docs/web-component-page-pattern.md` §6) has since folded Sizing and Interactive States directly into a matrix-card Visual Preview, rather than keeping them as separate backbone sections. This Figma-side order above has not yet been updated to match. Treat the two documents as describing two platforms that are not currently 1:1 on this one point, until the Documentation frame is rebuilt to match.

### 4.1 The Key Props Table

Replaces the website's Usage code-block section on the Figma canvas only.

- A bordered, rounded (`8px`) table frame, Auto-Layout `VERTICAL`, `strokeWeight: 1`, border `#000000` at 8% opacity.
- Header row: light grey background (`#F8FAFB`), columns Prop, Type, Default, Description, bound to `Table/Header`.
- One data row per prop, bordered on top only. Prop is Roboto Mono, teal `#009F9B`. Type is Roboto Mono, muted slate `#5E6E7D`. Default is `Body/Small`, grey `#9E9E9E`. Description is `Body/Small`, near-black `#212121`, set to `Fill container`.

---

## 5. Token & Property Alignment: Strict 1:1 Figma-to-Code Binding

### 5.1 Token hierarchy (three tiers, never skip a tier)

```
Brand/*              raw brand primitives (Brand/Primary/500, Brand/White, ...)
Semantic/*           meaning-based tokens that alias Brand primitives
                     (Semantic/Text/Primary, Semantic/Status/Error/Text, Semantic/State/Hover, ...)
Components/{Name}/*  component-scoped tokens that alias Semantic (or occasionally Brand) tokens
                     (Components/Button/Primary/BG/Default, ...)
```

A finished component's fills/strokes/text should never point directly at the raw `MUI palette` collection or a hardcoded hex. Every `Components/{Name}/*` token resolves, via alias, up through `Semantic/*` to `Brand/*`.

### 5.2 Name-driven rebinding, not binding-driven

**The current variable binding on a node is not a trustworthy source of truth. The node's own declared intent, its variant name, its component props (`Color=`, `State=`, `Variant=`), is.** Derive the target token from what a node claims to be, not from what it happens to currently point to. Button's own migration found every `Color=Warning, State=Hovered` variant bound to `error/dark`, a pre-existing copy-paste bug, invisible until the raw bindings were inspected. A rebind driven by the variant's own declared name fixed it as a side effect, with zero extra work.

### 5.3 Status vocabulary (use exactly these five names)

| Status | Maps from (MUI) |
|---|---|
| `Error` | `error/*` |
| `Warning` | `warning/*` |
| `Info` | `info/*` |
| `Success` | `success/*` |
| `Neutral` | `secondary/*` (MUI's "secondary" color is a neutral grey-blue, not a second brand hue, always rename to `Neutral`) |

`Primary` is handled separately, it is the brand teal, not part of the five-status family.

### 5.4 Property/state suffix conventions

| Suffix | Meaning | Typical alias target |
|---|---|---|
| `BG/Default` | Solid fill, default/enabled state | `{status}/main` |
| `BG/Hover` | Solid fill, hovered state (Contained-style, darker) | `{status}/dark` |
| `BG/OnFill/Text` | Text/icon color on top of a solid `BG/Default` fill | `Brand/White` or applicable inverse-text token |
| `Text` | Colored text for Outlined/Text-style variants | `Semantic/Status/{Status}/Text` |
| `Border` | Outline/stroke for Outlined-style variants | `Semantic/Status/{Status}/Border` |
| `Outlined/BG/Hover` | Light background tint on hover for Outlined/Text variants, distinct from `BG/Hover` | `{status}/hover` translucent tint |

**Never reuse `BG/Hover` for two different visual roles.** A Contained variant's dark hover and an Outlined variant's light-tint hover need two distinct names.

`Disabled` is typically shared across all Color/Status values (confirmed on Button: all five status colors' Disabled state bound to the identical pair). When discovery data confirms a state is genuinely color-agnostic, use one shared token rather than five redundant per-status copies.

### 5.5 Illustrative example: 1:1 Figma variant to code prop binding

A verified, real example in this repo (`src/components/FormControlLabel.figma.tsx`): the Figma `<FormControlLabel> | Switch` component set's `Label Placement` variant property (`End | Bottom | Start | Top | Dual`) binds directly to the code's `labelPlacement` prop via `figma.enum(...)`, and the `Dual` variant's two nested text properties (`Label Left#854:0`, `Label Right#854:17`) bind to the code's `leftLabel`/`rightLabel` props via `figma.textContent(...)`. The Dual layout's `itemSpacing` is bound to the `sizing/1` variable (8px), the same value the code's `DualRoot` styled component hardcodes as `theme.spacing(1)`.

This is the standard every new component's Code Connect mapping should meet: every Figma variant property maps to exactly one code prop, every nested text property maps to exactly one string prop, and every spacing/padding variant is backed by the same numeric token on both sides (never a coincidentally-matching literal, see §5.6).

**Note on illustrative prop names:** this section previously referenced example prop names (`showSummary`, `showSubtitle`, `showAction`, `as`) that do not exist anywhere in this codebase today, they read as generic examples of boolean `show*` visibility toggles and a polymorphic `as` prop, a common pattern in other design systems, not a claim about a real EDGE-DS component. The verified real example above (`FormControlLabel`) replaces that placeholder so this document only asserts what has actually been checked against the repo.

### 5.6 Explicit gap and padding tokens, matching code

Where a Figma variant encodes a spacing/gap value, name it as an explicit token or variable (e.g. `sizing/1` = 8px) and confirm the code side references the identical numeric value, ideally via the same semantic name (`theme.spacing(1)`), not a coincidentally-equal magic number. See `docs/web-component-page-pattern.md` §5 for the `MuiFormGroup`/`MuiFormControlLabel` `gap: 8` theme overrides that this Figma `sizing/1` token corresponds to.

---

## 6. Step-by-Step Token Migration Workflow

### Step 1: Live Inspection & Discovery

Before touching anything, establish ground truth from the live file, never trust a prior report, a memory, or a summary of "what should be there."

1. Confirm the Figma bridge is actually live by running a real read call against a concrete node ID.
2. Locate the component set's real node ID via `get_metadata` or a discovery script (`search_design_system` returns library metadata, not resolved values or canvas node IDs).
3. Pull every current fill/stroke/text binding in the component set's subtree, grouped by bound variable name (not by node), so large dumps return aggregates instead of an unreadable per-node list.
4. Cross-check against the published library, library edits must be published before they are visible this way.

**Output:** a table of `{current MUI variable name} -> {count} -> {sample variant names}`, plus the component set's real node ID.

### Step 2: Gap Analysis & Token Scope

Classify every distinct binding found in Step 1:

| Classification | Meaning | Action |
|---|---|---|
| Already migrated | Already bound to a `Components/*` or `Semantic/*` token | No action |
| Alias-only gap | A `Semantic/*` token already exists | New `Components/{Name}/*` token, aliasing the existing Semantic token, never a duplicate |
| True gap | No Semantic-tier equivalent exists | New token, aliased to the raw `Brand/*` primitive that currently supplies the value |
| Ambiguous / conflicting | Same property name means different things in different contexts | Stop and flag to a human, do not guess a shared name across two different visual roles |

Always search for an existing `Semantic/Status/*` or sibling `Components/{OtherComponent}/*` precedent before proposing a new token.

**Output:** an exact mapping table (from current, to EDGE token) and an explicit UNMAPPED TOKENS list with a proposed name for each, ready for approval.

### Step 3: Token Creation & Approval

1. Present the mapping table and any new token names for sign-off before creating anything, naming and aliasing decisions are hard to walk back once dozens of nodes reference them.
2. Create every new token as an alias, never a fresh hardcoded hex, unless Step 2 genuinely found no existing primitive to point to.
3. Match the file's existing scope convention (e.g. `ALL_SCOPES`), do not impose a narrower convention unilaterally.
4. Verify zero naming collisions before creating, confirm every alias target resolves.

### Step 4: Automated Rebinding

1. Iterate the component set's own children, read each variant's name (not its current binding) to determine Color/State/Variant/Size, compute the target token from that declared identity.
2. Handle shared/generic states (typically Disabled) separately from per-status states, confirm via Step 1 data whether it is genuinely color-agnostic first.
3. Work in small, reversible batches, one script per structurally distinct group, not one script attempting the entire component at once.
4. Every rebind script returns counts per target token and the full list of mutated node IDs, this is the audit trail and the input to Step 5.
5. Re-run the Step 1 discovery query after each batch to confirm the remaining-binding count is shrinking as expected.

### Step 5: Visual Verification & Residual Handling

1. Screenshot the full component set and visually compare against the pre-migration appearance.
2. Run one final discovery pass for any remaining raw-palette-bound fills/strokes. Expect small residuals in nested instance overrides (icons, spinners, sub-components).
3. **Do not force nested-instance residuals.** If a node resists two independent mutation approaches, stop, document it as a named residual, note that it needs fixing at that sub-component's own source.
4. Explicitly list anything deferred rather than letting it disappear silently. A migration is done when the mapping table, the rebind, the verification, and the deferred list are all reported together, not just when the script stops erroring.

---

## 7. Figma Automation Gotchas (read before writing a script)

1. Figma's native "Section" node has no Auto-Layout support. Every structural block in this spec is a `FRAME` with `layoutMode` set, never a `SECTION`.
2. `layoutSizingHorizontal/Vertical = 'FILL'` only works after the node is already parented inside an Auto-Layout frame. Append first, set sizing second, never the reverse.
3. Never flip a frame's `layoutMode` while it still holds children whose original absolute `(x, y)` you need to preserve. Capture every coordinate you'll need into plain variables before touching the parent's `layoutMode`.
4. Treat script failures as non-atomic. A script that throws partway through may still have partially executed, re-inspect the actual node tree after any error before retrying.
5. Re-derive layout after any font-size change, recompute column/row positions from each node's actual post-change `.width`/`.height`, never assume old hardcoded offsets still fit.
6. Card width should always equal the Section Wrapper's Fill width. If a row of instances does not fit at that width with the section's original gap, tighten the gap, do not widen the card past the page margin.
7. `search_design_system` reflects the published library, not unpublished local edits. Publish in Figma Desktop and re-check before concluding something is missing.
8. A failing `get_variable_defs` call does not always mean the bridge is broken, it can mean no concrete node ID was resolved yet. Get a real node ID first, then retry.
9. `get_metadata` on large subtrees can exceed output limits and silently truncate. Prefer targeted read scripts that aggregate/group results server-side.
10. Nested instance overrides (icons, spinners) can resist mutation via both subtree traversal and direct addressing. Treat these as a distinct, smaller follow-up against the sub-component's own definition.
11. A component's "Color" prop can span multiple structurally different variant styles (Contained/Outlined/Text all sharing one enum). Audit all variant styles before assuming a single set of tokens covers it, the true node count is often 2 to 3 times the first estimate.
12. `node.findAll(() => true)` can silently under-traverse deeply-nested instance-swap children. Confirmed on ButtonGroup: `findAll()` returned 617 nodes and reported the migration complete, a manual recursive walk of `node.children` from the same root found 1037 nodes. **Always do the final residual check with a manual recursive walk, not `findAll()`.**
13. Even the manual recursive walk gives inconsistent node counts call to call on an unchanged tree (confirmed on Button: 2351, 2355, 2350, 2350 across four identical scans). Never trust a single "zero residual" read as final, re-run at least 2 to 3 times and require consecutive agreement, and where possible cross-check Figma's own "Selection colors" panel on the live selection.

---

## 8. Legacy Cleanup: Archive, Don't Delete

When a component's page already had a prior, ad-hoc Figma frame before this standard existed:

1. **Locate the legacy frame(s) first.** It may not be named predictably (Switch's legacy equivalent was found under the plain name `Switch`, an untouched MUI Community library import).
2. **Extract live master sets without breaking instance links.** If the real, current component set lives nested inside the legacy frame, the legacy frame cannot simply be deleted, the new Documentation/Gallery frames' instances resolve back to that nested master. Duplicate the legacy frame in place first, work from the duplicate, leave the original frame's master set untouched until the new frames' instances are confirmed to still resolve correctly.
3. **Recursive verification, zero unresolved instances.** Do the final "is anything still pointing at the old thing" check with a manual recursive walk, not a single `findAll()` call (see §7.12), and re-run it two to three times (see §7.13).
4. **Relocate, don't delete.** Move the deprecated frame to a dedicated `Archive / Deprecated Docs` page (create it fresh if it does not exist yet), rename it to `_Archive / {Component} / {date}`, and lock it. Deletion destroys history a future audit may need, archiving preserves it out of the way. This is the same principle applied to this repo's own deprecated process `.md` files, see `docs/archive/process/`.
5. **Report the full picture, not just "done."** State together what was archived, what was verified clean, and what (if anything) was deliberately left in place and why.

## 9. Principle: Flag, Don't Silently Fix

A Documentation frame's own descriptive text can go stale relative to the component it actually describes (a real example: a Documentation frame's Anatomy text once described "a solid outline traced around the Track's exact silhouette, added only on Focus," while the live component actually implements a Focus Halo behind the knob, present on both Hover and Focus). When this happens:

- Build the web (or the corrected Figma text, once approved) to match the **real, live component**, never the stale description.
- Report the discrepancy back explicitly rather than either silently propagating the stale text or silently editing Figma's copy without sign-off.
- The same rule applies to any other contradiction discovered between two sources of truth (a doc and the live file, two docs describing the same thing differently, a prop table and the actual shipped API): name the contradiction, state which side you built to match, and why, rather than quietly picking one.

---

## 10. Checklist: Applying This Standard to a New Component

- [ ] Master frame created at 1440px width, light grey background, Hug height.
- [ ] Top Header (full-bleed, dark, logo + subtitle) as the master's first child.
- [ ] Page Content wrapper as the master's second child, owning the single 48px page margin.
- [ ] Intro Block (§1.4): `Document title` eyebrow, then `Title Group` with title, docs-link badge, category/status badges, description.
- [ ] One Section Wrapper per section in the §4 order, no more, no fewer, no reordering.
- [ ] Every Section Wrapper: transparent background, Title Row (Overline + auto-stretching divider) above a white bordered Card.
- [ ] Every text node bound via `textStyleId` to the table in §3, zero raw/unlinked text nodes except the flagged mono-token exception.
- [ ] Anatomy, Token Architecture, Usage Guidelines, and Accessibility content built as labeled sub-blocks per §2.3 (Paragraph Group / Bullet List, one idea per node), Usage Guidelines split from Accessibility.
- [ ] Key Props table present, styled per §4.1, positioned directly before Specs & Accessibility Notes.
- [ ] Specs & Accessibility Notes is the final section.
- [ ] Component Gallery frame present alongside Documentation, wrapping the real `COMPONENT_SET`(s) directly (reparented, not rebuilt from `createInstance()` copies), built only from real, confirmed variant coverage.
- [ ] Every instance anywhere in either frame verified (by walking `instance.mainComponent.parent.id`) to resolve to the real, current master — zero orphan references to a legacy/imported library master.
- [ ] Token migration workflow (§6) completed: mapping table, new tokens approved and created, rebind executed in batches, visual verification done at least twice with consecutive agreement.
- [ ] Full-frame screenshot re-scan taken and visually diffed against this spec before calling the page done.

---

## Appendix: Known Open Items (flagged, not silently fixed)

- **Page-order divergence** between this document (§4) and the web pattern's folded Sizing/Interactive-States shape, see the note under §4.
- **No official EDGE monospace/code text style** exists yet (§3), inline code values remain the one sanctioned unlinked-text exception.
- Full per-component audit history (Chip, Pagination, Alert, Backdrop, Switcher) lives in their own files under `docs/` and the repo root, this document intentionally does not duplicate that history, it only consolidates the reusable process and structure rules.
