# Typography Font-Family Fix — Roboto → Open Sans / Montserrat (Step 2: Proposal)

**Status:** Proposal only. Nothing in Figma or code has been changed. This follows `docs/typography-font-audit.md` (Step 1 discovery, 2026-08-31) and carries forward the 9 locked decisions from Igor's Step 2 brief without re-litigating them. Step 3 (build) follows once this proposal is signed off.

---

## A. Pre-check results

### A1. Visibility check on the two uncertain clusters

**Result: both clusters are fully visible / live, not dead scaffold.** This overturns the discovery report's "possibly hidden" hypothesis for both.

- **The `_library/heading` scaffold cluster** (Title + Subheader + "© mui.com" caption + footer Link) was walked on App Bar, Card, Data Grid, and Table. Every node, and every ancestor up to the page root, reported `visible: true` on all four pages. **New finding not covered by the locked decisions**: this cluster is *live content sitting inside otherwise-already-migrated documentation frames* — not confined to an archived page. Structurally: `Title` (`_library/heading`) and the footer `Link` live together inside one `_Library / Component Heading` instance's `Heading`/`Footer` sub-frames; `Subheader` (`list/subheader`) lives in a sibling `_Library / Component Information` instance — both roll up under the same per-component documentation frame. **Scale correction**: this isn't one-per-page — Data Grid alone has 6 separate occurrences (one per sub-section: columns, rows, inline editing, quick filter, basics, root). The "~40+ pages" estimate in the discovery report likely undercounts total instances. **Exception**: the Link page itself does not carry this cluster at all — its one footer-Link-shaped node lives in a different structure (`REAL-WORLD USE CASE - Standalone Demo`).
- **Generic Inter "Text" nodes (Archive)** and **"Axis Label" Inter nodes (Button/FAB)**: also confirmed visible, not hidden. The Archive ones sit inside a section literally named "Archive MUI" on the `🗄️ _Archive / Deprecated Docs` page — i.e., out of scope by the existing "Archive MUI" exclusion in locked decision #6, no new question there. The Button/FAB Axis Labels are genuine rendered documentation-chrome on active, non-archived pages — **not addressed by any of the 9 locked decisions** (those covered Roboto findings + `h6` + the dead fallback + Getting Started + the two cosmetic defects + Data Grid/DatePicker/BottomNav Figma styles). Flagging as a separate, deferred item — Inter chrome labels are a different font family and a different kind of problem than this pass's scope; recommend leaving them out of Step 3 and handling in a dedicated follow-up.

**Open item requiring Igor's call before Step 3** (since it wasn't anticipated by the locked decisions, which assumed this cluster would turn out to be dead): what should happen to the `_library/heading` Title (Roboto Mono Medium 64px) itself? It is not one of the 14 shared styles in scope (decision #5), and it's a different Roboto Mono usage than the Prop/Type value-cell exception locked in by decision #2 — a giant 64px "Title" paired with "© mui.com" attribution text reads as leftover MUI-for-Figma plugin branding, not real EDGE-DS content, despite being live. Two options: (a) leave its font untouched since it's out of the locked scope either way and treat it as a future removal/archival candidate, or (b) fold it into this pass and convert to Open Sans/Montserrat like everything else. **Recommendation: (a)** — don't retokenize plugin-attribution cruft, flag it for a future "remove leftover plugin scaffold" cleanup instead. This doesn't block anything else in this proposal: the `Subheader` role in the same cluster is `list/subheader`, already locked in scope regardless (§B), and the footer `Link` fix (§C) is also independently locked in and unaffected by this open item.

### A2. Chip / Badge / Link tracker reconciliation

Corrects the premise in the Step 2 brief: **Badge and Chip are already tracked** in `docs/EDGE-DS-Migration-Status.md` — both have one-line `✅ Migrated` rows in the main Status table (they just don't have a dedicated `### <Component> — detail` subsection, unlike Stepper/TextField/Toggle Button/Tooltip, which are the only four components with expanded write-ups). **Link is not mentioned anywhere in the file** — not in the Status table, not as a detail section — even though it's referenced only in `MEMORY.md`'s migration-status summary line. So: Badge and Chip's tracker rows will need their notes amended once this fix lands (their `chip/label`/`badge/label` typography gap contradicts their "✅ Migrated" status, same as the standing "don't trust old ✅ marks without re-verifying" gotcha already written into that file). Link has no row to correct — it would need a first-time entry added. Per Igor's instruction, this reconciliation is **flagged as a Step 4 follow-up, not done now.**

---

## B. Before/after table — 14 shared Figma text styles

All 14 were re-verified live against the file; every value matches the Step 1 report exactly, no drift.

| Style | Style ID | Current | Proposed | Notes |
|---|---|---|---|---|
| `table/header` | `S:d5c8dbb42687d950e44dc4f636a2c124cf2b46cb` | Roboto **Medium** 14 | Open Sans **SemiBold (600)** 14 | **Weight flag**: see note below the table — Open Sans has no native Medium(500), recommend SemiBold(600) not a literal "Medium" match. |
| `chip/label` | `S:3e029a9450b65835fd1f9f2d4679a9fe38e2ebc0` | Roboto Regular 13 | Open Sans Regular 13 | Straight family swap. Aside: code's live Chip actually renders at 14px (inherits `body-sm`) — a pre-existing 13px-vs-14px Figma/code size gap, unrelated to font family, not proposed to change here. |
| `badge/label` | `S:d0841fb3cf8f5f8f7547445baaf392592070c938` | Roboto **Medium** 12 | Open Sans **SemiBold (600)** 12 | Same weight flag as `table/header`. |
| `tooltip/label` | `S:7d1aa064fd5f6496950f7ca7efe7b0677577bd70` | Roboto **Medium** 10 | Open Sans **SemiBold (600)** 10 | Same weight flag. |
| `avatar/initials` | `S:f7789e5d8dd2f8502bdaae22e3f7bb8e7da3c692` | Roboto Regular 20 | Open Sans Regular 20 | Straight swap. Avatar isn't tracked in the migration doc at all — separate pre-existing gap, not blocking this fix. |
| `input/label` | `S:167f11358cff405898910a8d597fd893898af9f8` | Roboto Regular 12 | Open Sans Regular 12 | Straight swap. |
| `input/value` | `S:7d5aba13de51bf1fa07fc7efcc16c1ca6fec362d` | Roboto Regular 16 | Open Sans Regular 16 | Straight swap. |
| `input/helper` | `S:a4fbe553e19fab7517b6cc6d4fffb4d177df0e26` | Roboto Regular 12 | Open Sans Regular 12 | Straight swap. |
| `menu/itemDefault` | `S:7530939f90d1d6153fe10cda11e12ab067bc15ae` | Roboto Regular 16 | Open Sans Regular 16 | Straight swap. |
| `menu/itemDense` | `S:c837f25f591bd60e0b4aab19bce6b8ba5bbfb3bb` | Roboto Regular 14 | Open Sans Regular 14 | Straight swap. |
| `list/subheader` | `S:84df198f9ff2a659aa2d85766d79241fa450656a` | Roboto **Medium** 14 | Open Sans **SemiBold (600)** 14 | Same weight flag. Fix this style regardless of the A1 open item on its sibling `_library/heading` — they're independent styles. |
| `bottomNavigation/activeLabel` | `S:e7cfe3e3c120040eb734ef7f5ad5d7983b8130fe` | Roboto Regular 14 | Open Sans Regular 14 | Straight swap. Figma-only per decision #9 — no `@mui/x` component exists in code. |
| `dataGrid/aggregationColumnHeaderLabel` | `S:003278c4ed9079d3914e7f25d8f76fc5220c74c3` | Roboto **Medium** 12 | Open Sans **SemiBold (600)** 12 | Same weight flag. Figma-only per decision #9. |
| `datePicker/currentMonth` | `S:b30f134415d80c9627e2b34a0982871248ee3e3a` | Roboto **Medium** 16 | Open Sans **SemiBold (600)** 16 | Same weight flag. Figma-only per decision #9. |

**Weight flag, applies to the 6 rows marked above:** Open Sans as loaded in this system (Google Fonts weights 400/600 per `layout.tsx:21-26`; typical Open Sans family ships Regular/SemiBold/Bold, no native Medium/500) has no direct equivalent to Roboto's Medium(500). Recommend mapping all "Roboto Medium" → **Open Sans SemiBold (600)**, not a literal weight-500 "Open Sans Medium" (which may not exist as an installable style in Figma's font picker either). This matches `brandTheme.ts`'s own established convention of using Open Sans SemiBold(600) as its medium-emphasis tier (`subtitle2`, `body-xs`, `overline` all use `fontWeight: 600`) — i.e. this isn't a new precedent, it's applying the existing one. Confirm in Step 3 that Figma's local font list actually offers "Open Sans SemiBold" before applying (Montserrat SemiBold is already used file-wide via `heading-md` etc., so the SemiBold static style should already be installed/available).

**Since these are shared styles, editing each one's definition once propagates to every instance across every page that references it — no per-instance work needed for this table (per locked decision #5).**

---

## C. Remediation plan — manual (non-shared-style) overrides

### C1. Recurring template-footer "Link" text (~45+ occurrences, confirmed structurally consistent)

**Proposed fix:** rebind each to the real `<Link>` component's own style, `typography/body-md` (`S:97973a3f36c08cb5c83ee6f068bbdb0786d0faba`, Open Sans Regular 16) — not a new manual fix. This is literally the style the master `<Link>` component (`6574:50682` → variant `7432:48718` → text node `7432:48719`) already uses; every footer instance is an override of that same master text node with an emptied `textStyleId`, so rebinding restores it to the master's own correct value rather than inventing something new.

Confirmed sample node IDs (10, across 5 pages) — a Step 3 build script should enumerate the full set programmatically (search all pages for TEXT nodes named "Link" with empty `textStyleId` and font Roboto, via manual recursive walk per the findAll() gotcha, not by hand-listing every one):

| Page | Node ID |
|---|---|
| App Bar | `I11048:147681;10988:150235;7432:48719` |
| Card | `I11048:147857;10988:150235;7432:48719` |
| Data Grid (root) | `I11039:148519;10988:150235;7432:48719` |
| Data Grid: columns | `I285:89639;10988:150235;7432:48719` |
| Data Grid: rows | `I305:102165;10988:150235;7432:48719` |
| Data Grid: inline editing | `I285:89660;10988:150235;7432:48719` |
| Data Grid: quick filter | `I270:88772;10988:150235;7432:48719` |
| Data Grid: basics | `I285:89618;10988:150235;7432:48719` |
| Table | `I11033:145731;10988:150235;7432:48719` |
| Link (own gallery demo) | `I1508:85220;7432:48719` |

Note: these sit inside the `_Library / Component Heading` "Footer" sub-frame flagged as likely plugin scaffold in §A1. Fixing just the font here is safe and non-destructive regardless of what's later decided about that broader cluster.

### C2. TextField Component Gallery scaled-instance nodes

**Correction to the discovery report's estimate**: found **96 matching nodes** (not ~90), and their fractional sizes cluster into exactly **two** recurring values — `8.573304176330566` and `11.431072235107422` — not a continuous 7.67–13.82px spread as the original report implied within the frame searched (worth a final check in Step 3 for the wider range elsewhere on the page before finalizing a build script's matching logic).

**Proposed fix:** rebind each node to the correct shared style by role — `input/label` for Label-role nodes, `input/value` for Value-role nodes — rather than preserving the fractional override. These instances sit inside a scaled-down parent (from a resize/scale-tool operation), so Figma should continue rendering them at the visually-scaled size automatically once rebound to the style's true base size (12px/16px), the same way every other scaled child in that instance already does. **Verify this assumption directly in Step 3** before treating it as guaranteed — screenshot before/after on a sample.

Common container for build-time enumeration: `Text Field - Component Gallery` (`2129:6`) → `Page Content` (`2129:12`) → `Master Container` (`2129:18`). Two sub-families exist inside it: the Multiline `<TextField>` set instances (chain includes `7551:51690`) and a second, single-line TextField set prefixed `I2160:...` whose component-set ID wasn't fully resolved this pass — resolve it in Step 3.

Sample IDs (Label/Value pairs): `I7553:51178;6570:48836`/`I7553:51178;6570:48839`, `I7553:52655;6570:48836`/`:48839`, `I7553:52695;6570:48836`/`:48839`, `I7553:53258;6570:48223`/`:48220`, `I7553:53262;6570:48223`/`:48220`.

### C3. Getting Started onboarding copy (Overview page)

| Node | Current | Role | Proposed |
|---|---|---|---|
| `914:92305` | Open Sans Regular 16 base, one manual-Roboto substring ("theme object") | Body copy | Rebind whole node to `typography/body-md` (size/weight already consistent throughout — only the one substring's family is wrong; a full rebind both fixes the bug and removes the manual override entirely, consistent with the C1/C2 pattern of preferring a shared-style rebind over a narrower manual patch) |
| `916:91251` | Same pattern (substring "modes for variables.") | Body copy | Same fix: rebind to `typography/body-md` |
| `11619:151317` | Fully manual, Roboto Regular 24, no bound style ("How To Insert Components to Your Design Files") | **Recommended: subsection heading** — not visually confirmed via screenshot this pass, flagged as a recommendation not a hard fact | Likely target: `typography/heading-sm` (Montserrat SemiBold 24 — matches this node's existing 24px size exactly, and is the same style used for "Document title" role elsewhere in the file per the Step 1 page-shell description). **This style's own ID wasn't captured in either verification pass — resolve it and take a screenshot to confirm the heading classification before applying, as the first action in Step 3 for this node.** |

### C4. Cosmetic defects (both reconfirmed exactly as described in Step 1)

| Node | Current | Fix |
|---|---|---|
| `381:82534` (Cover page) | Bound to `typography/heading-md` (Montserrat SemiBold 34) but rendered with a manual weight override of Regular | Clear the manual weight override so it inherits the style's true SemiBold(600), matching every other `heading-md` usage file-wide |
| `11488:167517` (Theme/Spacing page) | Mixed run: "When you should use Spacin" = correct Montserrat SemiBold 20; "g?" = manual Roboto Medium 20 | Apply Montserrat SemiBold 20 to the "g?" character range only, matching the rest of the node |

---

## D. Code changes

Both re-verified directly against the live repo this pass — exact, no drift from what's below.

### D1. `h6` remap — `src/theme/brandTheme.ts`

Confirmed via `grep -rn 'variant="h6"' src/` (excluding `/styleguide`) that this repo has zero explicit `variant="h6"` usages outside the styleguide docs — the only live consumer is MUI's own `DialogTitle` internals (hardcoded to `variant="h6"`), used today only in `src/components/Dialog.figma.tsx` (Code Connect mapping) and `src/app/styleguide/dialog/page.tsx`. No regression risk elsewhere.

```diff
     h1: edgeTypography['display-lg'],
     h3: edgeTypography['heading-lg'],
     h5: edgeTypography['heading-sm'],
+    h6: edgeTypography['heading-xs'],
     body1: edgeTypography['body-md'],
     body2: edgeTypography['body-sm'],
```
(`brandTheme.ts:372-376`; `heading-xs` = Montserrat SemiBold 20, `brandTheme.ts:47-53` — already defined, no new token needed.)

### D2. Dead `, monospace` fallback cleanup (3 spots, pure cleanup, no visual change since Open Sans always loads first)

```diff
--- src/app/styleguide/page.tsx:59
-              fontFamily: '"Open Sans", monospace',
+              fontFamily: '"Open Sans"',
```

```diff
--- src/app/styleguide/foundations/palette/page.tsx:58
-          <Typography sx={{ color: isDark ? '#fff' : '#000', fontSize: 13, fontWeight: 700, fontFamily: '"Open Sans", monospace' }}>
+          <Typography sx={{ color: isDark ? '#fff' : '#000', fontSize: 13, fontWeight: 700, fontFamily: '"Open Sans"' }}>
```

```diff
--- src/app/styleguide/foundations/palette/page.tsx:63
-           <Typography sx={{ fontFamily: '"Open Sans", monospace', fontSize: 11, color: '#212121', fontWeight: 600 }}>
+           <Typography sx={{ fontFamily: '"Open Sans"', fontSize: 11, color: '#212121', fontWeight: 600 }}>
```

---

## Summary of what needs Igor's sign-off before Step 3

1. **New item from A1**: disposition of the `_library/heading` Title (Roboto Mono 64px) itself — recommend leaving untouched as a future plugin-scaffold removal candidate, not retokenizing it now. Doesn't block anything else.
2. **New item from A1**: Inter documentation-chrome axis labels (Button/FAB/Checkbox/Radio/Switch) are live but outside all 9 locked decisions — recommend deferring to a separate pass.
3. **Weight substitution in §B**: Roboto Medium → Open Sans **SemiBold(600)**, not a literal "Medium," for 6 of the 14 styles (`table/header`, `badge/label`, `tooltip/label`, `list/subheader`, `dataGrid/aggregationColumnHeaderLabel`, `datePicker/currentMonth`) — confirm this substitution before Step 3 edits the styles.
4. **C3's `11619:151317`** needs a screenshot + `typography/heading-sm` style-ID lookup as the first Step 3 action before its heading classification is locked in.
5. Everything else in §B, §C, and §D is ready to build as specified, pending the above.
