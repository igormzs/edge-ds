# Pay Tool — Typography Audit (Step 1: discovery)

**Date:** 2026-09-23
**File:** EDGE Empower® Pay Tool (`3IfyrignyrbGV1YP9cqLLA`)
**Scope:** 2 pages only: `🚀 Latest Features shipped` (1538:15936) and `✅ Implemented | Production` (100:32348)
**Method:** Read-only Plugin API scan. Every text run (`getStyledTextSegments`) was compared against its bound text style. Style keys were matched against the EDGE-DS Documentation file (`fLQNXhHQhKBZzWnJGtUcwn`) to tell EDGE-DS styles apart from legacy ones. Counts are split into **authored** (text placed directly in the file) and **in instance** (text inside a component instance, possibly inherited from its main component).
**Status:** Discovery only. Nothing in the Pay Tool file was changed.
**Update 2026-09-23:** decisions made, and the styles were built in EDGE-DS: `body-md-bold`, `body-sm-bold`, `body-xs-regular`, `body-xs-italic` (all emphasis at SemiBold 600; `-bold` means SemiBold). See [Typography_Figma_Web_Audit.md](Typography_Figma_Web_Audit.md) §11. Rebinding in this file is still pending.

---

## 1. Headline numbers

| | Latest Features | Implemented / Prod | **Total** |
|---|---|---|---|
| Text runs | 2,445 | 2,156 | **4,601** |
| Bound to a text style | 1,920 (78.5%) | 1,829 (84.8%) | **3,749 (81.5%)** |
| Unstyled (raw font) | 525 | 327 | **852 (18.5%)** |
| Weight overrides on a style | 231 | 209 | **440 (11.7% of styled runs)** |
| Font-size overrides | 0 | 0 | **0** |
| Font-family overrides | 0 | 0 | **0** |

**No legacy text styles are in use.** Every style bound on these two pages resolves to an EDGE-DS library style (matched by key). Legacy typography appears as *unstyled* text instead (section 4).

For comparison, the EDGE-DS Documentation file has 18 weight overrides in 17,265 runs (0.1%). The Pay Tool product file overrides weight roughly 100× more often.

---

## 2. Weight overrides (text style kept, weight changed)

| Style (base weight) | Overridden to | Authored | In instance | **Total** | Typical content |
|---|---|---|---|---|---|
| body-sm (Regular 14) | **Bold** | 46 | 129 | **175** | Card titles ("Country-level pay gap analysis"), counters ("2 / 9") |
| body-xs (SemiBold 12) | **Regular** | 34 | 76 | **110** | Mostly input labels ("Access Token", "Subject") in the legacy input component |
| body-md (Regular 16) | **Bold** | 96 | 0 | **96** | Inline emphasis inside sentences ("**Drag and drop** or **Browse**") |
| heading-sm (SemiBold 24) | **Bold** | 15 | 30 | **45** | Section headings |
| body-xs (SemiBold 12) | Italic | 12 | 0 | 12 | Meta text |
| body-md (Regular 16) | Bold Italic | 2 | 0 | 2 | |

**The body family accounts for 395 of 440 overrides (90%).** This confirms the hypothesis that the body styles are where alternate weights are needed.

### What each pattern actually needs

- **body-sm → Bold (175):** a real missing style. It's used as a small title or label that needs more weight.
- **body-xs → Regular (110):** mostly *the wrong style was picked*. These are input labels, and `input/label` (Open Sans Regular 12) already exists. After rebinding, a real body-xs-Regular need remains (see unstyled Regular 12 in section 4).
- **body-md → Bold (96):** inline emphasis, the Figma equivalent of `<strong>` in a paragraph. **This is an acceptable override** by industry practice; nobody creates a style for bold words mid-sentence. A body-md SemiBold style is still justified by the 148 unstyled SemiBold 16 runs (section 4).
- **heading-sm → Bold (45):** designers want heading-sm heavier. This is either a style gap or a reason to revisit heading-sm's weight. Low priority.

### Weight choice to settle

The overrides go to **Bold (700)**, not SemiBold (600). EDGE-DS's own emphasis weight is SemiBold everywhere (body-lg, body-xs, heading-lg to heading-xs, button labels). Before building the alternate-weight styles, decide whether they should be:
- **SemiBold** (consistent with the DS; existing Bold overrides would get slightly lighter when rebound), or
- **Bold** (matches what designers already chose; adds a third body weight to the system).

---

## 3. Style usage (bound, both pages combined)

| Style | Authored | In instance | Total |
|---|---|---|---|
| typography/body-sm | 242 | 714 | 956 |
| typography/body-md | 373 | 392 | 765 |
| chip/label | 100 | 316 | 416 |
| button/label-md | 0 | 241 | 241 |
| input/label | 48 | 193 | 241 |
| typography/heading-xs | 66 | 138 | 204 |
| button/label-lg | 0 | 182 | 182 |
| typography/body-xs | 60 | 114 | 174 |
| input/value | 6 | 133 | 139 |
| typography/heading-lg | 88 | 0 | 88 |
| typography/heading-sm | 45 | 30 | 75 |
| alert/description | 0 | 67 | 67 |
| typography/body-lg | 57 | 0 | 57 |
| tooltip/label | 6 | 55 | 61 |
| button/label-sm | 0 | 33 | 33 |
| typography/caption | 0 | 12 | 12 |
| others (heading-md, overline-xs, avatar/initials, input/helper, alert/title, datePicker/currentMonth) | | | < 10 each |

---

## 4. Unstyled text (legacy typography)

852 runs have no text style. They fall into three groups:

### 4a. Same family, weight and size as an existing EDGE-DS style (NOT an exact match; see §8)

| Raw font | Runs | Should be |
|---|---|---|
| Open Sans SemiBold 12 | 124 | `typography/body-xs` |
| Open Sans Regular 16 | 44 | `typography/body-md` |
| Open Sans Regular 14 | 41 | `typography/body-sm` |
| Montserrat SemiBold 24 | 27 | `typography/heading-sm` |

> **Correction (2026-09-23, Step 2):** these match on family, weight and size only. Almost all use the legacy MUI letter spacing of **0.15px** (DS: 0 or 0.06px), and some use different line heights. Rebinding would shift text width by about 5px per 60 characters and could change line wraps. They are **not** zero-visual-change, so they were left as they are and flagged.

### 4b. Matches a *missing* weight variant (the evidence for new styles)

| Raw font | Runs | Would be served by |
|---|---|---|
| Open Sans SemiBold 16 | 148 | body-md SemiBold (e.g. "Organization Name") |
| Open Sans Regular 12 | 81 | body-xs Regular (description paragraphs: "Assess if there is equal pay…") |
| Open Sans Bold 12 | 45 | body-xs Bold |
| Open Sans SemiBold 14 / Bold 14 | 29 / 10 | body-sm SemiBold/Bold |
| Open Sans Regular 18 | 2 | body-lg Regular (weak evidence) |

### 4c. Off-scale or italic (legacy, needs a design decision)

| Raw font | Runs | Note |
|---|---|---|
| Open Sans SemiBold Italic 12 | 134 | Meta text: "License Key", "Start date • Expires date" |
| Open Sans Italic 12 | 73 | Same pattern |
| Open Sans SemiBold Italic 16 | 6 | |
| Montserrat Medium 40 | 19 | Legacy hero ("Welcome to the EDGE Empower® Pay Tool"); 40 isn't on the scale |
| Montserrat Medium 48 | 33 | Almost all are the "®" glyph inside a heading-lg title (a mixed run, harmless) |
| Montserrat SemiBold 18 | 10 | Off-scale |
| Montserrat Regular 22 | 8 | Off-scale |
| Open Sans Regular 15 | 5 | Off-scale |
| Open Sans Regular/Bold 10 | 12 | Below the scale (smallest body is 12) |
| Montserrat Bold 400 / 800 | 3 | Giant decorative numerals |

**Italic 12px shows up in about 220 runs** (207 unstyled + 12 overrides). EDGE-DS has no italic style. It needs a call: add a meta/italic caption style, or restyle this pattern in a non-italic DS style.

---

## 5. Recommendation for the body family (input to Step 2)

Evidence-backed alternate weights, strongest first:

| Proposed style | Evidence (overrides + unstyled) | Priority |
|---|---|---|
| body-sm at Bold/SemiBold (14) | 175 + 39 | **High** |
| body-md at SemiBold (16) | 148 unstyled (the 96 inline-bold overrides can stay as overrides) | **High** |
| body-xs at Regular (12) | 81 unstyled descriptions (the 110 overrides are mostly input labels → `input/label`) | **High** |
| body-lg at Regular (18) | 2 here + 2 in the DS file | Low: add only if the Empower 2.0 designs need it |
| Italic meta (12) | ~220 | Needs a design decision first |

**Naming:** use weight-literal suffixes (for example `body-sm-semibold`, `body-xs-regular`) rather than `-strong`/`-emphasis`. The base weights are inconsistent (body-lg and body-xs are SemiBold; body-md and body-sm are Regular), so a generic "emphasis" name would mean *lighter* on some sizes and *heavier* on others.

---

## 6. Components (not audited; noted for a later pass)

Top-level instances only (nested instances skipped): 2,168 in total, 1,910 remote and 258 local.

**Remote, EDGE-DS naming (`<Name>`):** `<Icon>` 445, `<Tab>` 428, `<Button>` 246, `<TextField>` 183, `<FormControlLabel>` Checkbox/Radio 205, `<Chip>` 80, `<Divider>` 41, `<Backdrop>` 27, Slider parts, `<Status Tag>`, `<Select>`, `<Switch>`, `<Alert>`, `<Fab>`, `<Avatar>`, `<Tooltip>`, `<DesktopDatePicker>`, and others.

**Likely legacy, to verify:**
- Remote but *not* EDGE-DS naming: `_hidden` (86), `Filter dropdown` (15), `Alert_EDGE` (11), `Accordion_EDGE - Filters` (3), and raw icon components used directly (`CheckCircleFilled`, `FileUploadRounded`, `InfoOutlined`, `Thumb*`, `WarningAmberRounded`) instead of through `<Icon>`.
- Local to Pay Tool: `Variable Card` (126), `Header` (57), `Footer` (32), `Section Title` (38), `Filters Accordion.PayTool`, `Edit Variable - Modal`, `Tag/New Variable Card`. `Variable Card` may duplicate the EDGE-DS "Pay Tool Cards" set (Add Custom Variable Card), so check before any migration.
- The legacy input component whose labels use body-xs → Regular (section 2) is nested inside instances like `I1154:8088;1154:8085`. Main component `1154:8085` is worth checking.

---

## 7. Sample node IDs (for follow-up)

| Pattern | Page | Node |
|---|---|---|
| body-sm → Bold | Latest Features | `1538:16868` |
| body-xs → Regular (input label) | Latest Features | `I1538:17884;1154:8085` |
| body-md → Bold | Latest Features | `1538:18769` |
| body-xs → Italic | Latest Features | `1538:19979` |
| heading-sm → Bold | Implemented | `686:8791` |
| body-md → Bold Italic | Implemented | `122:6329` |


---

## 8. Step 2: rebind applied (2026-09-23)

**Rule:** a text run was rebound only when **every visual property** exactly matches the target `typography/*` style: family, weight, size, line height (normalised to px), letter spacing (normalised to px), case, decoration, and paragraph spacing/indent. The only exception was italic, by Igor's explicit instruction ("apply the italic token to all italic text that isn't using tokens"). Only core `typography/*` styles were used as targets, never component styles such as `input/label`.

**Instance safety:** text inside a component instance was edited only where its typography was already a local instance override. Text inherited from a main component was left alone on the page.

### Applied: 198 runs on these pages + 1 main component

| Change | Latest Features | Implemented | Visual impact |
|---|---|---|---|
| body-xs + Regular override → `body-xs-regular` | 43 (12 of them instance overrides) | 3 | None (identical properties) |
| Raw Open Sans SemiBold 14 (lh 143%, ls 0.06) → `body-sm-bold` | 3 | 1 | None |
| Raw Open Sans SemiBold Italic 12 → `body-xs-italic` | 83 | 51 | Letter spacing 0.15 → 0.06px (slightly tighter) |
| Raw Open Sans Italic 12 → `body-xs-italic` | 11 | 3 | Weight Regular → SemiBold, plus a line-height/spacing change |
| **Footer** main component (`1154:8087`, page 🧩 Customised components): body-xs + Regular → `body-xs-regular` | propagates to all 51 Footer instances | | None (identical properties, verified before applying) |

Verified with a separate read after applying: bindings persisted and 0 errors. A sample frame (Pre-Form Modal `1538:16736`) was checked visually and looks correct.

### Flagged for later (not changed)

| Item | Runs | Why not changed |
|---|---|---|
| **Header** main component (`532:4978`, 93 instances file-wide): "EDGE Gender-binary edition", raw Open Sans Italic 12, lh 14px | 57 on these pages | Inherited from a main component on another page, and the italic token would change weight (Regular→SemiBold) and line height (14→18px) in all 93 instances. Fix it in the main component deliberately. |
| `Edit Variable - Modal` main component, italic 12 | 2 | Same (inherited) |
| body-sm + **Bold** override | 175 | `body-sm-bold` is SemiBold 600, so rebinding makes it slightly lighter (a visual change) |
| body-md + **Bold** override | 98 | Same weight difference; mostly inline emphasis, which is acceptable to keep |
| heading-sm + **Bold** override | 45 | No Bold heading-sm style exists |
| body-xs + Italic (Regular italic on a styled run) | 12 | Already uses a token; the weight differs from `body-xs-italic` |
| body-md + Bold Italic | 2 | No equivalent |
| Italic 16px (Open Sans SemiBold Italic 16 ×6, Montserrat SemiBold Italic 16 ×3) | 9 | The italic token is 12px; applying it would shrink the text by 25% |
| Raw text matching family, weight and size but with different letter spacing or line height (§4a/§4b) | ~600 | Letter spacing 0.15px (legacy MUI) or a different line height, so not zero-visual-change |
| Off-scale raw text (§4c) | ~90 | No equivalent style |

### Suggested next steps
1. Decide whether the legacy **0.15px letter spacing** is intentional. If not, a single deliberate "accept the tiny tracking change" pass could rebind ~600 more runs (mainly body-md-bold, body-xs, body-xs-regular, body-md, body-sm).
2. Fix the **Header** main component's italic subtitle once (93 instances).
3. Decide Bold vs SemiBold for the 175 body-sm and 98 body-md Bold overrides (they would visibly lighten if moved to the `-bold` styles).

---

## 9. Step 3: tracking accepted + Bold→SemiBold (2026-09-23)

**Igor's decisions:** the legacy 0.15px letter spacing was never intentional, so normalise it to EDGE-DS. Bold is normalised to SemiBold (only SemiBold and Regular exist in the scale). The Header's "EDGE Gender-binary edition" line under "Organization Name" gets `body-xs-italic`.

**Rule used:** match on family + size + weight, with Bold treated as SemiBold. Italic 12px maps to `body-xs-italic`. Letter spacing is ignored. Line-height changes are allowed up to **2.5px**; larger ones are flagged. Underlined or ALL-CAPS runs are flagged (a style would strip that formatting). Remote-library components are not touched.

### Applied

| Where | Runs / nodes |
|---|---|
| Latest Features page | 383 runs in 295 text nodes |
| Implemented page | 294 runs in 201 text nodes |
| **Header** master (`532:4992`, 4 variants): "Organization Name" → `body-md-bold`, "EDGE Gender-binary edition" → `body-xs-italic` (forced past the line-height guard, approved) | 8 runs |
| **Section Title** master (`784:6316`): heading-sm + Bold → `heading-sm` | 3 |
| **Variable Card** master (`92:14491`) | 1 |
| **Filters Accordion.PayTool** master (`1488:8224`): "Selected filters" → `body-sm-bold` | 2 |
| **Edit Variable - Modal** master (`100:39687`): "*Drag & drop the allowed values…" → `body-xs-italic` | 2 |

Main-component fixes propagate to every instance file-wide, not only on these two pages. All masters are on `🧩 Customised components`.

### Result (same scan as §1)

| | Before | After |
|---|---|---|
| Latest Features: styled | 78.5% | **95.2%** |
| Implemented: styled | 84.8% | **97.0%** |
| Weight overrides (both pages) | 440 | **44** |

### Still flagged

| Item | Runs | Why / how to fix |
|---|---|---|
| **Semantic-weight overrides** (the rich-text Cmd+B bold/unbold) on top of a style: heading-sm + Bold in Section Title instances (25), body-xs-italic + Regular Italic on "Super User"/"User" labels (12), body-sm + Bold on "Filters applied" inside the remote `Accordion_EDGE - Filters` (3), body-md + Bold / Bold Italic (4) | 44 | Figma keeps `SEMANTIC_WEIGHT` overrides when a style is applied, and the Plugin API can't clear them. **Fix in the UI:** select the text and toggle bold off (Cmd+B), or reset the overrides from the text style menu. |
| Open Sans SemiBold 12 at **220%** line height (filter labels "Gender", "Level of responsibility"… in Filters Accordion) | 32 | Would shrink each line by 8.4px (26.4 → 18px); likely intentional spacing |
| Montserrat SemiBold 24 at a non-standard line height (117% / 150%) | 8 | 4px line-height change |
| Open Sans Regular/Bold 14 at 125% line height | 14 | 2.52px, just over the guard |
| Open Sans Regular 16 inside remote `Filter dropdown` | 15 | Remote library component; fix in its source library |
| Underlined / ALL-CAPS runs | ~6 | A style would remove the underline or caps |
| Italic 16px (Open Sans ×6, Montserrat ×3) | 9 | The italic token is 12px |
| No EDGE-DS equivalent: Montserrat Medium 40/48/36 (48 is mostly the "®" glyph), Montserrat Regular 22, Montserrat SemiBold 18/30, Open Sans Regular 15, Open Sans 10px, Open Sans Regular 18, Open Sans SemiBold 24, Montserrat Bold 400/800 | ~90 | Off-scale; needs a design decision per case |
