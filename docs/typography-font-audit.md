# Typography Font-Family Audit — Roboto → Open Sans (Step 1: Discovery)

**Status:** Discovery only. Nothing in Figma or code was changed as part of this pass. This document is the input to a separate Step 2 (the actual swap), which happens only after Igor has reviewed this report and answered the open questions in §5.

**Date:** 2026-08-31
**Scope:** Every page in the Figma file `EDGE Design System - New` (`fLQNXhHQhKBZzWnJGtUcwn`), full subtree traversal per top-level frame — plus the entire MUI theme layer and broader codebase in this repo.

**Policy being audited against** (confirmed by Igor, 2026-08-31):
- **Montserrat** = headers only (page titles, section titles, card sub-headers).
- **Open Sans** = everything else, explicitly including labels (Badge, Alert, Chip, TextField, Button, table headers, form labels, helper/caption text, overline/eyebrow text, etc).
- **Roboto is not approved anywhere** — explicit token, explicit override, or silent inheritance of a Roboto default all count as findings.
- Anything else (Roboto Mono, Arial, Inter, etc.) is reported separately for a case-by-case call.

---

## 1. Summary counts

| | Figma | Code | Total |
|---|---|---|---|
| **Roboto locations** | 25 distinct patterns (styled + manual; representative counts range from single nodes to 300+ instances of one pattern) | **0** — theme's root `typography.fontFamily` already overrides MUI's Roboto default to Open Sans (`src/theme/brandTheme.ts:365`), and no literal `"Roboto"` (non-mono) string exists anywhere in `src/` | **25** |
| **Other non-approved-font locations** | 6 distinct patterns (2× Roboto Mono, 2× Inter, 1× Arial, plus the legacy `typography/H4` Roboto style counted in the Roboto table) | 3 (all Roboto Mono, all in `DocUI.tsx`) | **9** |
| **Confirmed-compliant, for scale** | 4 core shared text styles (`heading-md`, `body-md`, `overline`, `body-sm`) + 2 foundation-table styles, used file-wide (`body-sm` alone: 2,167 instances on the Table page, 934 on Data Grid) | 10 custom `edgeTypography` variants + ~15 components resolving to Open Sans/Montserrat (explicit or inherited) + ~117 of ~120 hardcoded doc-chrome hits | — |

**Headline finding:** the codebase is already almost entirely clean — someone already de-Robotoed the theme root. The Roboto problem is concentrated almost entirely in Figma. That inverts the usual "code catches up to Figma" direction for several specific roles (see §4).

---

## 2. Roboto findings

### 2a. Figma

| Page/Component | Role | Node ID / Style ID | How set | Notes |
|---|---|---|---|---|
| ~50+ pages (nearly every component Documentation frame, Table, Data Grid, User management, Overview, Typography, Archive) | Table header (Prop/Type/Default columns; real grid headers) | `S:d5c8dbb42687d950e44dc4f636a2c124cf2b46cb` (`table/header`) | Shared style, Roboto Medium 14 | Previously treated as a pre-cleared/known finding — under the new policy it's explicitly in-scope as a label and not pre-cleared. |
| Chip page (✅ migrated), Overview, Accordion, Paper, Card, User management, Data Grid, Archive (135–345 instances) | Chip's own rendered label | `S:3e029a9450b65835fd1f9f2d4679a9fe38e2ebc0` (`chip/label`) | Shared style, Roboto Regular 13 | **Chip's page is marked ✅ migrated, but its label style is still Roboto** — contradicts migration status. |
| Badge page (✅ migrated), Overview, Data Grid, Archive | Badge's own rendered label | `S:d0841fb3cf8f5f8f7547445baaf392592070c938` (`badge/label`) | Shared style, Roboto Medium 12 | Same pattern as Chip. |
| Tooltip page (✅ migrated), Overview, FAB, Archive | Tooltip's own rendered label | `S:7d1aa064fd5f6496950f7ca7efe7b0677577bd70` (`tooltip/label`) | Shared style, Roboto Medium 10 | Same pattern as Chip. |
| Avatar, Badge, Overview, Bottom Navigation, Card, Drawer, List, Rating, Job directory | Avatar initials text | `S:f7789e5d8dd2f8502bdaae22e3f7bb8e7da3c692` (`avatar/initials`) | Shared style, Roboto Regular 20 | Avatar page itself isn't marked ✅ in the tracker. |
| Text Field, Select, Autocomplete, Stepper, Checkbox, Form Elements, Data Grid, Archive, Headings, Navs, Tables | Form field floating label | `S:167f11358cff405898910a8d597fd893898af9f8` (`input/label`) | Shared style, Roboto Regular 12 | Widespread; squarely a "label" under the new policy. |
| Same set as above | Form field value/placeholder | `S:7d5aba13de51bf1fa07fc7efcc16c1ca6fec362d` (`input/value`) | Shared style, Roboto Regular 16 | |
| Checkbox, Paper, Switch, Stepper, Card, Archive, Data Grid, Tabs, Stack, Headings | Helper/caption text under form fields | `S:a4fbe553e19fab7517b6cc6d4fffb4d177df0e26` (`input/helper`) | Shared style, Roboto Regular 12 | Explicitly named in policy as in-scope. |
| Overview, Select, Autocomplete, Menu, Data Grid, Archive, Headings | Menu/dropdown item label | `S:7530939f90d1d6153fe10cda11e12ab067bc15ae` (`menu/itemDefault`) | Shared style, Roboto Regular 16 | |
| Menu page | Dense menu item label | `S:c837f25f591bd60e0b4aab19bce6b8ba5bbfb3bb` (`menu/itemDense`) | Shared style, Roboto Regular 14 | |
| ~40+ pages — recurring "Subheader" node in a boilerplate scaffold block | List subheader label | `S:84df198f9ff2a659aa2d85766d79241fa450656a` (`list/subheader`) | Shared style, Roboto Medium 14 | Part of the same recurring scaffold block as the `_library/heading` finding in §3a — see open question in §5. |
| Bottom Navigation, Overview, Drawer, Date/Time | Bottom-nav active tab label | `S:e7cfe3e3c120040eb734ef7f5ad5d7983b8130fe` (`bottomNavigation/activeLabel`) | Shared style, Roboto Regular 14 | Not clear this component exists in code — see §5. |
| Data Grid | Column aggregation header label ("Sum") | `S:003278c4ed9079d3914e7f25d8f76fc5220c74c3` (`dataGrid/aggregationColumnHeaderLabel`) | Shared style, Roboto Medium 12 | Table-header-adjacent role; MUI X, not confirmed in code. |
| Overview, Date/Time | Date picker "current month" header | `S:b30f134415d80c9627e2b34a0982871248ee3e3a` (`datePicker/currentMonth`) | Shared style, Roboto Medium 16 | |
| Archive ("Duplicate libraries") | Legacy H4 heading | `S:559a0cd32ff15cd9ac2755006a4656f33ca5f3d8,4504:6` (`typography/H4`) | Shared style, Roboto Regular 34 | Leftover imported style from an old MUI kit; archived context only. |
| ~45+ pages — one per page, e.g. Link `I1508:85220;7432:48719`, AppBar, Card, Data Grid, Timeline, Tree View | Recurring doc-template footer "Link" text | Manual override, no style | Manual, Roboto Regular 14 | Nearly every page's template-footer Link node manually overrides Roboto instead of using the real `<Link>` component's Open Sans style — despite Link being marked ✅ migrated. |
| Text Field Component Gallery (~90 instances), Overview, Archive | Scaled-instance label/value text | Manual override | Manual, Roboto at fractional sizes (7.67–13.82px) | Looks like leftover from a scale-tool resize that didn't reapply the current text style. |
| Badge, Progress, Stepper, Screens, Archive | Micro annotation "Add Characters" | Manual override | Manual, Roboto Regular 4px | Very small — likely non-user-facing; confirm visibility before treating as a real defect. |
| Cover ("IN PROGRESS" chip), Screens ("Latest Jobs") | Cover-page / prebuilt-screen heading | Manual override | Manual, Roboto Regular 24 | Decorative cover art / one prebuilt-screen mockup, not a live DS component. |
| Paper, Progress (Documentation "Prop"/"Type"/"Default" header cells) | Table header, visually identical to `table/header` | Manual override | Manual, Roboto Medium 14 | Same visual result as the shared style but structurally a manual override — can't be bulk-fixed by a style swap alone. |
| Pages Templates ("Comparison data list: 2022") | Legacy screen mockup text | Manual override | Manual, Roboto Bold 16 | Legacy/pre-EDGE-DS page. |
| Date/Time (`<MobileDatePicker>` calendar, "Tu" cell) | Calendar day cell | Manual override | Manual, Roboto Bold 14 | Sits alongside the Arial weekday/day-number text on the same calendar (§3a) — a real, current (non-archived) gap. |
| Theme/Spacing ("When you should use Spacing?") | Heading, partial run | `11488:167517` | Manual, Roboto Medium 20, co-existing with a correct Montserrat SemiBold 20 run on the *same node* | Mixed-run text node — one character range is correct, another isn't. |
| Overview → "Getting Started" frame | Onboarding body copy / one heading | e.g. `914:92305`, `916:91251`, `11619:151317` | Manual, Roboto Regular 12/16/24 | Live, current-facing onboarding content, not archived. |
| Miscellaneous → "_Library / Cover" frame | Cover art (legacy MUI-for-Figma plugin cover) | e.g. `7852:80304-80307`, `107:58820` | Manual, Roboto Black/Bold/Medium, 36–109px | Leftover plugin cover art, not an EDGE-DS artifact. |

### 2b. Code

**No Roboto findings.** `src/theme/brandTheme.ts:365` sets the theme's top-level `typography.fontFamily` to Open Sans (not MUI's stock `'"Roboto", "Helvetica", "Arial", sans-serif'`), and this propagates through MUI's `createTypography()` to every variant that isn't individually re-specified (confirmed directly against `node_modules/@mui/material/styles/createTypography.js`). No literal `"Roboto"` (non-mono) string exists anywhere in `src/`, and no Roboto font file is even loaded (`src/app/layout.tsx:21-26` loads only Montserrat and Open Sans from Google Fonts).

This means the original assumption behind this audit — "no override in code silently means Roboto" — does **not** hold for this codebase. It already holds for Figma.

---

## 3. Other-font findings (not Montserrat, Open Sans, or Roboto)

### 3a. Figma

| Page/Component | Role | Node ID / Style ID | How set | Notes |
|---|---|---|---|---|
| 30+ Documentation frames (Badge, Divider, Alert, Chip, Dialog, Skeleton, Stepper, Text Field, Tooltip, etc.) | Prop/Type value cells in Key Props tables | No shared style | Manual, **Roboto Mono** Regular 12/13/14 | **Reconfirmed as the primary Roboto Mono location — likely intentional monospace exception**, matching the code side's identical pattern (§3b). Recommend leaving alone unless Igor decides otherwise. |
| ~40+ pages — recurring "Title" node in a boilerplate scaffold block (paired with `list/subheader`, `input/helper`, a "© mui.com" caption, and the manual-Roboto "Link" footer from §2a) | Unclear — reads as leftover MUI-for-Figma plugin metadata/attribution block | `S:b72985247b5605ee1e3599d923ca4cf34fa534da` (`_library/heading`) | Shared style, **Roboto Mono Medium 64** | **Corrects a "known fact"**: Roboto Mono is not confined to Prop/Type cells. This is a different role, size, and mechanism. This traversal used the Plugin API, which includes hidden layers — visibility was not checked per node, so confirm whether this cluster is actually on-canvas before treating it as live (see §5). |
| Button, FAB, Checkbox, Radio, Switch (variant-grid documentation chrome, "Axis Label" nodes) | Documentation-chrome annotation labels | e.g. Button `1038:576`–`1039:584` | Manual, **Inter** Bold/Semi Bold/Regular, 9–13px | Chrome/annotation text, not component content. |
| Dozens of pages — generic "Text" nodes, up to 981× on Archive; also AppBar, Bottom Navigation, Card, Avatar, Form Elements, Timeline, Tree View | Unclear — looks like a hidden watermark/plugin-inspection artifact | e.g. `166:70695`, `642:155489` | Manual, **Inter** Medium 12 | Same hidden-layer caveat — extremely high counts and generic naming suggest not user-facing; verify visibility before treating as a defect. |
| Archive MUI ("Title" node) | Heading | `854:266587` | Manual, **Inter** Semi Bold 24 | Archived legacy content only. |
| Date/Time (`<MobileDatePicker>` calendar: weekday headers, day numbers, month/year label) | Calendar body text | e.g. `6569:39495`, `6569:39502` | Manual, **Arial** Bold/Regular 12 | Real, current (non-archived) component gap. |

### 3b. Code

| Component/Location | Role | file:line | How set | Notes |
|---|---|---|---|---|
| `CodeBlock` | Full code-snippet display | `src/components/DocUI.tsx:137` | `'"Roboto Mono", "Courier New", monospace'` | **Likely intentional monospace exception** — matches the Figma-side props-table convention. |
| `PropsTable` prop-name cell | Inline `<code>` value display | `src/components/DocUI.tsx:219` | `'"Roboto Mono", monospace'` | **Likely intentional monospace exception** — this is precisely the Prop/Type value-cell case named in the policy. |
| `PropsTable` type cell | Inline `<code>` value display | `src/components/DocUI.tsx:230` | `'"Roboto Mono", monospace'` | Same as above, "Type" column. |

No other non-Montserrat/Open-Sans/Roboto families exist anywhere in the theme or broader codebase.

---

## 4. Figma/code parity gaps

Two distinct kinds of gap surfaced:

**A. Figma is Roboto, but code for the same role is already correctly Open Sans.** This is the inverse of the usual "bring code to match Figma" direction, and needs an explicit decision before Step 2:

| Role | Figma | Code | Notes |
|---|---|---|---|
| Chip label | Roboto (`chip/label`) | Open Sans (inherited from theme root — `MuiChip` has no `fontFamily` override at all) | Code is already correct; Figma's Chip page is marked ✅ migrated but wasn't. |
| Badge label | Roboto (`badge/label`) | Open Sans (explicit: `MuiBadge` sets `fontFamily: baseTheme.typography.body2.fontFamily`) | Same pattern. |
| Tooltip label | Roboto (`tooltip/label`) | Open Sans (inherited — `Tooltip.js` reads `theme.typography.fontFamily` directly) | Same pattern. |
| Form field label/value/helper | Roboto (`input/label`, `input/value`, `input/helper`) | Open Sans (`MuiTextField`/`InputBase`/`FormLabel`/`FormHelperText` all inherit `body1`/`caption`, both Open Sans) | Same pattern. |
| Menu item label | Roboto (`menu/itemDefault`, `menu/itemDense`) | Open Sans (`MuiMenuItem` inherits `body1`/`body2`) | Same pattern. |
| List subheader | Roboto (`list/subheader`) | Open Sans (`MuiListSubheader` inherits root `typography.fontFamily`) | Same pattern. |

If "Figma is source of truth" is applied literally, these would pull code backward toward Roboto — that's clearly not the intent here. Step 2 should update **Figma** to Open Sans for these roles, not touch code.

**B. Code has a real gap that Figma wasn't specifically checked against.** `MuiDialogTitle` renders in Open Sans, not Montserrat, because MUI hardcodes `DialogTitle`'s variant to `h6`, and `brandTheme.ts` only remaps `h1`/`h3`/`h5` to Montserrat tiers (`h2`/`h4`/`h6`/`subtitle1` were left on the inherited Open Sans default). The app's own Dialog documentation page calls `DialogTitle` "a single text heading," and it's used live. This pass did not isolate what Figma's actual `<DialogTitle>` master uses for its own title text style — that needs a targeted check before deciding whether to remap `h6` in code or give `MuiDialogTitle` its own override (see §5).

---

## 5. Open questions for Igor

1. **Direction of fix for the "Figma-Roboto vs. code-already-Open-Sans" roles in §4A** (Chip, Badge, Tooltip labels; form field label/value/helper; menu items; list subheader) — confirm Step 2 updates Figma to match code here, not the reverse.
2. **Chip/Badge/Tooltip pages are marked ✅ migrated in `docs/EDGE-DS-Migration-Status.md`, but their label text styles are still Roboto.** Should the tracker be corrected now, and should these be treated as reopened/incomplete migrations rather than pure typography touch-ups?
3. **Roboto Mono** — for the Prop/Type value cells (Figma and code both use it identically): leave as-is, or replace with an Open-Sans-based mono stack? Same question for `DocUI.tsx`'s `CodeBlock`.
4. **The `_library/heading` (Roboto Mono 64px) cluster and the generic "Text"/"Axis Label" Inter nodes** (up to 981 instances, found via Plugin API which includes hidden layers) — need a Layers-panel visibility check before deciding whether these are live defects or dead MUI-for-Figma plugin scaffold content that should just be archived/deleted.
5. **The recurring template-footer "Link" manual-Roboto override** (~45+ pages) — is this part of the same leftover-plugin-scaffold block as #4 (and should be removed/archived rather than retokenized), or is it a distinct, real doc-chrome element that needs a proper fix?
6. **`MuiDialogTitle` / `h6` variant gap (§4B)** — should `h6` be remapped to a Montserrat `edgeTypography` tier (likely `heading-xs`) globally, or should `MuiDialogTitle` get its own override? Need to confirm what Figma's actual DialogTitle master uses first — this pass didn't isolate that specifically.
7. **`'"Open Sans", monospace'` fallback oddity** (`styleguide/page.tsx:59`, `foundations/palette/page.tsx:58,63`) — three spots display hex/weight values with an Open-Sans-first, monospace-fallback stack that never actually reaches monospace (Open Sans always loads). Looks like it was meant to render as monospace like the Prop/Type cells. Intentional or a slip?
8. **Data Grid, Date Picker, Bottom Navigation** (MUI X components) — are these actually implemented in code anywhere in this app, or are the Figma pages pure design mockups with no code counterpart yet? This affects whether Step 2 needs new `brandTheme.ts` component entries or is Figma-only for these.
9. **Date/Time `<MobileDatePicker>` calendar (Arial + one manual Roboto cell)** — real, current gap in Figma. Does a code implementation exist to check parity against, or is this Figma-only artwork that just needs a manual redraw?
10. **Cover-page `heading-md` weight anomaly** (node `381:82534`, Regular instead of SemiBold) and the **Theme/Spacing mixed-run node** (`11488:167517`, one correct Montserrat run + one manual Roboto run on the same text node) — both likely simple defects; confirm they should be normalized rather than left as-is.
11. **Live "Getting Started" onboarding copy on the Overview page** is entirely manual Roboto — confirm this is in scope for Step 2 rather than being separately reworked/rewritten later.
12. **Legacy/Archive pages** (Pages Templates, Archive MUI, Archive EDGE-DS, `_Library/Cover` plugin art) — skip entirely in Step 2 (recommended, since they're archived), or normalize for completeness anyway?
