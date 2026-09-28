# Typography Font-Family Fix — Wave 2, Step 2 (Proposal)

**Status:** Proposal only. Nothing in Figma or code was changed. Follows `docs/typography-font-audit-wave2.md` (Wave 2 discovery). All numbers below are from a live, page-by-page re-enumeration performed 2026-08-31 — several earlier estimates were corrected in the process (see §3).

File: **EDGE Design System - New** (`fLQNXhHQhKBZzWnJGtUcwn`)
Scope: Roboto / Arial / Inter → Open Sans / Montserrat, everywhere Wave 1 didn't already reach.

**Locked decisions carried in from Igor's brief (not re-litigated here):** the remote-style-copy question is fully closed (a comprehensive 73-page, all-14-style recheck found exactly 54 remote-copy-bound nodes, all confined to the already-out-of-scope "Pages Templates" page — Wave 1 remains closed); Inter documentation-chrome is now in scope, target Open Sans; Date/Time and other Figma-only mockup surfaces get fixed like everything else (repo check confirmed zero `@mui/x-*` dependencies and zero real Arial/Inter usage in `src/` — the only "Arial" hit is an inert fallback after Open Sans in `brandTheme.ts`'s own font stack); "Add Characters" placeholders get fixed too, cheap and low-risk, unless a wider blast radius turns up.

---

## 1. Inter chrome pre-check

### 1.1 Exact per-page count

A full sweep of every in-scope page (73 pages minus "Pages Templates" and "🗄️ _Archive / Deprecated Docs") found Inter text on **19 pages, 765 nodes total** — not the ~1,700+ node / ~20-page rough estimate from the discovery report.

| Page | Inter nodes |
|---|---:|
| Breadcrumbs | 8 |
| Pagination | 79 |
| Accordion | 12 |
| App Bar | 13 |
| Avatar | 36 |
| Bottom Navigation | 14 |
| Button | 72 |
| Card | 34 |
| FAB - Floating Action Button | 53 |
| Forms (top-level component page) | 23 |
| Menu | 72 |
| Table | 120 |
| Text Field | 40 |
| Transfer List | 2 |
| Container | 7 |
| Spacing | 20 |
| Timeline | 21 |
| Tree View | 15 |
| Data Grid | 124 |
| **TOTAL** | **765** |

All other 52 in-scope pages returned zero Inter hits (3 spot-audited for every distinct font family in use, confirmed clean).

### 1.2 Role sampling

Sampled all 19 hit pages. Every sample is a documentation-chrome label (node name `Text` or `Axis Label`, content like `"Icon: True"`, `"Disabled: False"`, `"ENABLED"`, `"Large"`, `"Primary"`) — variant/property-combination axis labels inside component-gallery grids. **No heading-role outlier found.** The "label role, target Open Sans" decision holds uniformly.

### 1.3 Mechanism

100% manual, per-node `fontName` overrides. `textStyleId` is empty in all 765 nodes — no shared text style is involved anywhere in this cluster. **Step 3 must be a batch node-by-node script, not a style edit.**

### 1.4 Size/weight buckets (7 distinct, confirmed — not uniform)

| Bucket (family\|style\|size) | Count | Pages | Role | Proposed Open Sans target |
|---|---:|---|---|---|
| Inter \| Medium \| 12 | 640 | all 19 (dominant) | `"Property: value"` labels | Open Sans **SemiBold** 12 (Open Sans has no Medium; SemiBold matches Wave 1's Medium→SemiBold convention) |
| Inter \| Semi Bold \| 9 | 45 | Button (33), FAB (12) | sub-value labels ("Primary", "Neutral", "Error") | Open Sans **SemiBold** 9 |
| Inter \| Regular \| 9 | 45 | Button (27), FAB (18) | sub-value labels ("Large/Medium/Small") | Open Sans Regular 9 |
| Inter \| Bold \| 11 | 16 | Button (5), FAB (11) | ALL-CAPS category header ("ENABLED"/"HOVERED") | Open Sans Bold 11 |
| Inter \| Bold \| 13 | 14 | Button (3), FAB (11) | ALL-CAPS category header ("CONTAINED"/"OUTLINED") | Open Sans Bold 13 |
| Inter \| Bold \| 10 | 4 | Button only | secondary ALL-CAPS axis row | Open Sans Bold 10 |
| Inter \| Regular \| 10 | 1 | FAB only | one footnote annotation | Open Sans Regular 10 |
| **TOTAL** | **765** | | | |

**Open question:** create new sibling shared styles (e.g. `Documentation/Axis Label`, `Documentation/Axis Category`) for these 765 nodes for future maintainability, or apply the manual family/weight swap and leave them unbound as today? Both are cheap at script time; style-creation is more maintainable long-term. No file precedent either way — see §5.

---

## 2. Cluster-by-cluster enumeration and remediation proposal

### 2.1 "↳ Forms" pre-built screen

**Reconciled count: 121 nodes** (was ~116 — see §3).

| Bucket | Count | Content sample |
|---|---:|---|
| Roboto Regular 48 | 1 | "Let's build relationships, not just businesses." |
| Roboto Regular 16 | 30 | testimonial byline + upload-widget micro-copy |
| Roboto Regular 14 | 71 | upload-widget status text |
| Roboto Regular 12 | 4 | legal/consent text |
| Roboto Regular 4 | 15 | "Add Characters" placeholders (folds into §2.5) |

**Marketing headline check (screenshotted):** sits alone, white-on-teal, 48px, sole focal element of a "WelcomeBoard" hero panel — reads unambiguously as a heading. Recommend `typography/heading-lg` (Montserrat SemiBold, exact 48px match), not Open Sans.

**Shared-style check:** every node has `textStyleId: ""` — pure unstyled manual overrides throughout, not stale style bindings.

Proposed fixes:
- Headline (`9415:95318`) → `typography/heading-lg`
- Testimonial byline (Regular 16, e.g. `9415:95337`) → `typography/body-md`
- Upload-widget secondary copy (Regular 16, e.g. `9390:94020`) → `typography/body-md`
- Upload-widget status text (Regular 14, e.g. `9384:94009`) → `typography/body-sm`
- Legal text (Regular 12, e.g. `9411:94650`) → `input/helper` (fits a disclaimer sitting under a form control)
- Add Characters (15 nodes) → see §2.5

### 2.2 Date/Time calendar

**Reconciled count: 132 nodes (34 Roboto + 98 Arial) — exact match to estimate.**

All nodes sit under frames named "Native / Chrome date picker" — a mockup of a browser-native date/time input fallback. `datePicker/currentMonth` exists but is unused on this page and doesn't size-match the 12px month header (using it would visually enlarge the header and break the native-mockup illusion).

| Bucket | Count | Role | Proposed fix |
|---|---:|---|---|
| Arial Bold 12 | 2 | month header ("September 2020") | manual Open Sans Bold 12 — no shared style fits at this size |
| Arial Regular 12 | 96 | weekday letters + day-number grid | rebind to `input/label` (exact size/weight match) |
| Roboto Regular 12 | 2 | "Today" button | rebind to `input/label` |
| Roboto Regular 14 | 24 | hour/minute option lists | rebind to `typography/body-sm` |
| Roboto Bold 14 | 8 | selected hour/minute/AM-PM | manual Open Sans Bold 14 — no shared 14px-Bold style exists |

### 2.3 Cover status legend

**Reconciled count: 4 nodes** (resolves a "4 vs 5" discrepancy from an earlier pass — see §3). All Roboto Regular 24px, manual.

| Node ID | Text | Context |
|---|---|---|
| `4:6` | "DESIGN DONE" | master variant, Type=DONE |
| `4:11` | "IN REVIEW" | master variant, Type=IN REVIEW |
| `4:16` | "IN PROGRESS" | master variant, Type=WIP |
| `I4:40;4:16` | "IN PROGRESS" | live on-canvas instance override |

No existing shared style matches 24px Regular (`chip/label` is 13px; `typography/heading-sm` is 24px but Montserrat SemiBold — wrong register for a status legend). Proposed: manual family swap only, Roboto Regular 24 → Open Sans Regular 24, all 4 nodes.

### 2.4 Paper / Progress table headers

**Reconciled count: 8 nodes (4 + 4) — exact match.**

| Page | Node IDs | Text |
|---|---|---|
| Paper | `1570:207`–`1570:210` | Prop / Type / Default / Description |
| Progress | `1612:42`–`1612:45` | Prop / Type / Default / Description |

`table/header` (Open Sans SemiBold 14, fixed in Wave 1) size-matches exactly (14px = 14px); weight shifts Medium→SemiBold, consistent with the convention used everywhere else. Proposed: **rebind all 8 nodes to `table/header`.** (A separate `Documentation/Table/Header` style exists at 12px Bold — doesn't size-match, not proposed here.)

### 2.5 "Add Characters" placeholders

**Reconciled live total (in-scope): 32 nodes** (Progress 14, ↳Forms 15, Stepper 2, Overview 1 — Archive's ~9 stays out of scope, unrecounted). See §3 for reconciling two conflicting prior breakdowns.

All are Figma's own auto-generated empty-text-slot placeholder (zero actual characters), Roboto Regular 4px, manual.

**Visual-impact check:** at 4px this is functionally invisible regardless of font — the only reason to fix it is so content typed into that slot in the future inherits Open Sans instead of silently falling back to Roboto.

**Blast-radius check:** several nodes (e.g. `6586:47003`, `6586:46936`, `6586:46971`) sit inside main component definitions themselves (`<Progress> | Linear`, etc.), not just instances. However, since the affected property is only the *default formatting of an empty slot*, no currently-visible instance is affected — any instance with real typed content already overrides this default. **Net risk: low.** Recommend a single batch script, Open Sans Regular across all 32 nodes.

### 2.6 ~13 one-off locations

**Reconciled to exactly 13 real nodes** (an earlier "14" resolves to 13 once the Miscellaneous branding block is correctly counted at 6, not 7 — see §3).

**a) ↳ Headings — 2 "Instance Slot" nodes**: `I9137:89599;11385:162051;10020:109863`, `I9114:89415;11496:181412;10020:109863` — Roboto Regular 12. 6 sibling nodes on the same page are already correctly Open Sans Regular 12. Fix: match siblings (family swap only).

**b) ↳ Screens — 1 "Latest Jobs" node**: `7566:51675` — Roboto Regular 24, manual. 2 sibling "Latest Jobs" nodes are correctly bound to `typography/heading-sm`. Fix: rebind this node to `typography/heading-sm` to match siblings — high-confidence, exact size match.

**c) 🎭 Miscellaneous — MUI-for-Figma branding block (6 nodes, not 7 — see §3)**:

| Node ID | Text | Current |
|---|---|---|
| `7852:80304` | "MUI for Figma" | Roboto Black ~109.4px |
| `7852:80305` | "Material UI" | Roboto Medium ~48.6px |
| `7852:80307` | "+" | Roboto Black ~36.5px |
| `7852:80298` | "v5.14.0" | Roboto Bold ~42.5px |
| `7852:80323` | "Pro" | Roboto Bold ~42.5px |
| `107:58820` | "Release" | Roboto Black 38px |

All manual, all inside the decorative `_Library / Cover` splash frame (not live documentation). All weights exist natively in Montserrat. Fix: manual family swap to Montserrat, preserving each node's exact weight/size.

**FLAGGED, not part of this proposal — see §5**: `I11477:193526;10988:155022` ("Library Component Wall", a different frame — `_Library / Component Information`) is bound to `typography/heading-md` (Montserrat SemiBold 34) but **renders as Roboto Regular 34** — a stale/broken style binding, the same symptom as the remote-style-copy issue Wave 1 closed out as confined to Pages Templates. This is on a different page, outside that re-verified list. Not touched here pending Igor's call.

**d) Overview extras (4 nodes)**

| Node ID | Text/Role | Current | Proposed |
|---|---|---|---|
| `I11112:140875;6586:47003` | Add Characters | Roboto Regular 4 | folds into §2.5 |
| `10806:130304` | "Aa" heading-font specimen, 96px | Roboto Light 96 | Montserrat Light 96 |
| `10806:130306` | "Aa" body-font specimen, 48px | Roboto Regular 48 | Open Sans Regular 48 |
| `914:91251` | body paragraph, "Getting Started" frame | Roboto Regular 16 | `typography/body-md` |

The two "Aa" swatches sit beside an already-correct Montserrat/Open Sans type-ramp table inside a "Typography Preview" frame — read as a heading-font-vs-body-font specimen pair, but the mapping is inferred from size/position, not an explicit label — flagged as a judgment call in §5.

---

## 3. Reconciliation notes (every prior count discrepancy, resolved)

| Discrepancy | Prior figures | Live, reconciled answer | Root cause |
|---|---|---|---|
| Inter chrome total | "~1,700+ nodes across ~20 pages" | **765 nodes across 19 pages** | The node-count estimate significantly overstated; page-count estimate was accurate. Spot-audited 3 zero-hit pages for every font family in use — confirmed clean, not a blind spot. |
| ↳ Forms total | ~116 nodes | **121 nodes** | A Plugin API trap: `getStyledTextSegments` silently returns an empty array for zero-character text nodes, undercounting 5 of the Add-Characters nodes on this page until cross-checked with a direct property scan. |
| Add Characters: "36 total" vs. a separate "Progress 18/Stepper 2/Forms 15" breakdown | Two conflicting breakdowns | **Progress 14, ↳Forms 15, Stepper 2, Overview 1 → in-scope total 32** | Neither prior pass was fully right: the first undercounted Forms (10 vs true 15) via the same zero-character-segment bug above; the second's Progress figure of 18 could not be reproduced — an exhaustive, twice-validated scan of all 117 text nodes on the Progress page finds exactly 14. Treat "18" as stale. |
| Cover status legend: "4" vs "5" | Two prior passes disagreed | **4** | A full dump of all 24 text nodes on the Cover page finds exactly 4 Roboto nodes (3 master variants + 1 real instance override). No 5th status node exists under any plausible keyword. Treat "5" as an error in that earlier pass. |
| Miscellaneous branding block: "7-node" | Described as 7 nodes | **6 real branding nodes** | The 7th node counted earlier (`I11477:193526;10988:155022`, "Library Component Wall") lives in a different frame (`_Library / Component Information`, not `_Library / Cover`) and is a stale style-binding case, not branding copy. Excluding it makes the "~13 one-offs" total reconcile exactly (2 + 1 + 6 + 4 = 13). |

---

## 4. Before/after summary table

| Cluster | Node(s) / Style ID | Current | Proposed |
|---|---|---|---|
| Inter chrome | 765 nodes, 19 pages (§1.4) | Inter Medium/Bold/SemiBold/Regular, 9–13px, manual | Open Sans equivalents, same sizes; batch script; optional new `Documentation/Axis Label` style — Igor's call |
| ↳ Forms headline | `9415:95318` | Roboto Regular 48, manual | `typography/heading-lg` |
| ↳ Forms byline/body copy | ~106 nodes | Roboto Regular 12/14/16, manual | `input/helper` (12), `typography/body-sm` (14), `typography/body-md` (16) |
| Date/Time month header | `6569:39495` + 1 more | Arial Bold 12, manual | manual Open Sans Bold 12 |
| Date/Time weekday/day/Today | 98 nodes | Arial/Roboto Regular 12, manual | `input/label` |
| Date/Time time list | 24 nodes | Roboto Regular 14, manual | `typography/body-sm` |
| Date/Time selected time | 8 nodes | Roboto Bold 14, manual | manual Open Sans Bold 14 |
| Cover status legend | `4:6`, `4:11`, `4:16`, `I4:40;4:16` | Roboto Regular 24, manual | manual Open Sans Regular 24 |
| Paper/Progress table headers | 8 nodes | Roboto Medium 14, manual | `table/header` |
| Add Characters | 32 nodes | Roboto Regular 4, manual, zero-char | manual Open Sans Regular 4 |
| ↳ Headings Instance Slot | 2 nodes | Roboto Regular 12, manual | manual Open Sans Regular 12 |
| ↳ Screens Latest Jobs | `7566:51675` | Roboto Regular 24, manual | `typography/heading-sm` |
| Misc MUI branding block | 6 nodes | Roboto Black/Medium/Bold, various | manual Montserrat, same weight/size |
| Overview Aa specimens | 2 nodes | Roboto Light 96 / Regular 48 | manual Montserrat Light 96 / Open Sans Regular 48 |
| Overview "Getting Started" paragraph | `914:91251` | Roboto Regular 16, manual | `typography/body-md` |
| Misc "Library Component Wall" | `I11477:193526;10988:155022` | **Flagged, not proposed** — stale binding | Needs Igor's call |

---

## 5. Open questions / flags for Igor

1. **Inter chrome mechanism**: new `Documentation/Axis Label` shared style(s), or manual batch swap left unbound? Both viable; style-creation is a bigger design-system decision than a pure font swap.
2. **↳ Forms marketing headline**: confirmed via screenshot as heading-role — confirm `typography/heading-lg` reclassification before Step 3.
3. **Date/Time month header weight**: proposed manual Open Sans Bold 12 (no shared style at this size); confirm Bold vs. SemiBold, since the file's precedent is mixed (`Documentation/Table/Header` uses Bold, most UI labels use SemiBold).
4. **Overview "Aa" specimens**: the Montserrat-vs-Open-Sans mapping is inferred from size/position, not an explicit label — confirm intent before fixing.
5. **Stale style-binding outlier found outside Wave 1's scope** (`I11477:193526;10988:155022`, Miscellaneous page) — same symptom as the remote-style-copy bug Wave 1 closed out, but on a different page not in that re-verified list. Decide: Wave 1 follow-up, fold into Wave 2, or separate ticket. Not touched in this proposal.
6. **Add Characters blast radius**: several placeholders live inside main component definitions, not just instances. Risk assessed as low (no visible instance affected), flagged per the standing "surface it, don't assume" discipline.
