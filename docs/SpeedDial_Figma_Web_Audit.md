# SpeedDial Component 1:1 Figma-to-Web Parity Audit

**Figma source:** `EDGE Design System - New` (`fLQNXhHQhKBZzWnJGtUcwn`), page `     Speed Dial` (`6599:50806`), two real master `COMPONENT_SET`s: `<SpeedDial>` (node `6599:50822`, `Direction` x `State`, 5 variants) and `<SpeedDialItem>` (node `1436:84796`, `Display`, 3 variants), new `SpeedDial - Component Gallery` frame (node `1436:86079`) and new `SpeedDial - Documentation` frame (node `1437:1325`), both built 2026-08-06.
**Web source:** stock MUI `SpeedDial`/`SpeedDialAction`/`SpeedDialIcon`. No `MuiSpeedDial*` entry exists in `src/theme/brandTheme.ts`. `src/app/styleguide/fab/page.tsx` has a real, working "FAB Menu (Speed Dial)" section demonstrating all three action-item display patterns (Icon + Title, Just Icon, Just Title) that this pass's `Display` property was built to match.
**Status:** 2026-08-06 - this was a discovery-and-structural pass, not a token migration. A real, partial SpeedDial already existed (Direction was complete, State and one of three display patterns were not); this pass closed both structural gaps and built the Two Core Frames. Token migration (real, un-migrated raw MUI bindings were found, see §2) is explicitly deferred, not silently skipped. **2026-08-06 update (same day, follow-up): SpeedDial's own standalone page was reorganized into FAB's Component Gallery and Documentation as a multi-master family, following the same pattern already used for Switch/FormControlLabel/FormGroup. See §7.**

## 1. Master component structure

| Dimension | Figma (before this pass) | Figma (after this pass) | Web | Verdict |
| :--- | :--- | :--- | :--- | :--- |
| `<SpeedDial>` | Real `COMPONENT_SET`, one property: `Direction` (Up/Down/Left/Right), 4 variants, always rendered open | Same set, now also carries `State` (Open/Closed). 4 existing variants renamed to explicit `State=Open`; one new `Direction=Up, State=Closed` variant added (5 total) | `open` boolean, `direction` prop | **Resolved.** `open`/`onClose` now has a real Figma analog. |
| Closed state coverage | None | One variant only, `Direction=Up, State=Closed`, not four | `direction` and `open` are independent real props in code, so all 4 direction+closed combinations are technically valid | **Deliberate, flagged scope decision, confirmed with you before building.** A closed SpeedDial is visually identical regardless of configured direction (no items are stacked to reveal it), so building 3 more pixel-identical duplicates was judged as padding, not real information. Logged here explicitly, not silently decided. |
| `<SpeedDialItem>` | Single `COMPONENT` (not a set), one boolean, `Tooltip` (false/true), modeling only 2 of the real code's 3 display patterns (Just Icon, Icon + Title) | Real `COMPONENT_SET`, one variant property `Display` (`Icon`/`IconAndTitle`/`TitleOnly`), 3 variants. The original component was reparented into the new set as `Display=Icon` (preserving its node ID, so every pre-existing instance kept resolving with zero re-pointing needed) | `icon`, `tooltipTitle`, `tooltipOpen` props on `SpeedDialAction`, composed by hand in `fab/page.tsx` into exactly these 3 patterns | **Resolved.** Verified the "Just Title" pattern is real, working code (not just an illustrative screenshot) before building it, per instruction. |
| Real-world usage coverage | One pre-existing real mockup, `Speed dial: fixed position`, a real `<SpeedDial>` instance in a dashboard layout | Reparented into the Gallery as a `REAL-WORLD USE CASE` section, unmodified | Standard MUI usage | Reused as-is. |

## 2. Design tokens & theme variables

**No token migration was performed this pass** - scope was explicitly structural, per your instruction to fix the missing variants first. A quick awareness scan (not a full audit) found real, un-migrated raw MUI bindings still present across both masters:

| Binding | Count | Where |
| :--- | :--- | :--- |
| `background/paper-elevation-6` | 18 | Likely a container/panel fill inherited from the original asset |
| `text/secondary` | 18 | Label text |
| `components/tooltip/fill` | 2 | The `<Tooltip>` instance's own fill |
| `common/white/main` | 2 | Icon/text on fill |
| Raw literal white | 8 | Various |
| `Components/Button/Primary/BG/Default` + `/Text` | 5 each | Already EDGE-bound, inherited by composition from the nested `<Fab>` instances, which carry this pass's own migrated tokens automatically |

**Flagged, not fixed:** the nested `<Fab>` content is already clean by composition (Fab's own migration), but the SpeedDial/SpeedDialItem-owned chrome (the tooltip pill fill, any container background, label text color) remains fully un-migrated. This is real, deferred work for a future dedicated token-migration pass on this component, not an oversight of this pass's own scope.

## 3. Completeness

Per your explicit sign-off before building anything: **Direction x Open/Closed x {Icon, IconAndTitle, TitleOnly}** was confirmed as the real, buildable grid, since the "Just Title" pattern was verified as real working code in `fab/page.tsx` first (not assumed). Both structural gaps identified during discovery are now closed:

1. `<SpeedDial>` had no `State` axis at all - closed, with the explicit one-representative-only Closed treatment described in §1.
2. `<SpeedDialItem>` modeled only 2 of 3 real display patterns - closed, all 3 now real variants.

No remaining structural gap is being silently carried forward from this pass; the only open item is the token migration deferred in §2.

## 4. What was found (discovery, before any build)

- A real Speed Dial already existed, buried in the usual legacy `_Library / Component Heading` + `Grid` wrapper (`11051:152002`, same pattern as every other component in this file) - not built from nothing.
- `<SpeedDial>`'s `Direction` axis was complete (4/4 real variants); its missing `State` axis and `<SpeedDialItem>`'s missing third display pattern were the only two real gaps.
- Checked whether "Just Title" (an icon-less `SpeedDialAction`) had ever been real code or only an illustrative mockup, per your explicit condition for choosing between the minimal-grid option and the build-it option: found real, working code in `fab/page.tsx` (`icon={<Box sx={{display:'none'}}/>}` plus a static `tooltipOpen` label with `.MuiSpeedDialAction-fab{display:'none'}`), so proceeded to build it.

## 5. What was built

- **`<SpeedDialItem>` converted to a real variant set.** Cloned the original component twice (for `IconAndTitle` and `TitleOnly`), reparented the *original* component itself (not a third clone) into the new set as `Display=Icon` so every pre-existing instance (20 across the file) kept resolving to the same node ID with zero re-pointing - confirmed by 3 consecutive clean instance-resolution scans. Removed the now-redundant `Tooltip` boolean property (fully superseded by `Display`) via `deleteComponentProperty`. `TitleOnly` was built by removing the `<Fab>` from a clone and keeping only the label pill.
- **`<SpeedDial>` gained a real `State` axis.** Renamed the 4 existing variants to explicit `State=Open`; built one new `Direction=Up, State=Closed` variant by cloning `Direction=Up` and removing its 4 stacked `<SpeedDialItem>` instances, keeping only the trigger `<Fab>`.
- **Legacy cleanup:** duplicated the legacy frame as a safety net, reparented both real masters out, verified 207 instances page-wide resolved cleanly across 3 consecutive scans, archived the emptied original to `_Archive / SpeedDial / 2026-08-06 / SpeedDial`, locked, removed the safety duplicate.
- **`SpeedDial - Component Gallery`** (`1436:86079`): cloned Switch's multi-master Gallery chrome (the correct precedent: two closely-related real masters, matching Switch's own Switch/FormControlLabel/FormGroup shape more closely than any single-master component's Gallery). Reparented both real sets directly into their own `MASTER COMPONENT SET` sections, arranged into clean grids (Direction columns x State rows for `<SpeedDial>`; Display columns for `<SpeedDialItem>`) with axis labels read off each set's own real geometry. Reparented the pre-existing real-world mockup into a `REAL-WORLD USE CASE` section, unmodified.
- **`SpeedDial - Documentation`** (`1437:1325`): cloned Fab's just-built Documentation frame shape (Intro/Visual Preview/Anatomy & Token Architecture/Usage Guidelines & Accessibility/Key Props, no Sizing section, since SpeedDial has no size axis). Visual Preview rebuilt as a small 4-instance representative card (Up·Open, Up·Closed, Item:Icon, Item:Icon+Title). Anatomy, Token Architecture, Usage Guidelines, Accessibility, and the 6-row Key Props table all rewritten for SpeedDial's real structure and behavior. Status badge set to `In Design / In Progress`, not `Migrated ✓`, since the token pass in §2 is real, deferred work, not done.
- **Verification:** `tsc`/`next build` not applicable (no web-side code touched this pass). Zero em dashes across both new frames and this report, confirmed via recursive scan and grep.

## 6. Still open, lower priority

- **Token migration** (§2) - a real, deferred gap, explicitly out of scope for this structural pass.
- **The other 3 directions' Closed states** (§1) - a deliberate, flagged decision not to build visually-identical duplicates, revisit only if a future need for per-direction Closed illustrations emerges.
- **No `MuiSpeedDial*` theme override exists in `brandTheme.ts`** - not addressed this pass, matching the Figma-first-then-web sequencing used for other components (e.g. Backdrop's own 2026-07-31 pass).
- **No web styleguide page rebuild** - `src/app/styleguide/fab/page.tsx`'s existing Speed Dial section was used only as source-of-truth reference material, not touched, consistent with the project-wide Storybook-migration pause on styleguide page work.

## 7. 2026-08-06 update (same day, follow-up): reorganized as a sub-family of FAB, standalone page retired

Per instruction, SpeedDial no longer lives on its own page. It is now documented as a second real master family living directly inside FAB's own Two Core Frames, the same multi-master pattern already established for Switch (Switch/FormControlLabel/FormGroup, all one Gallery).

**Reparenting, verified safe before and after.** The two real master `COMPONENT_SET`s, `<SpeedDial>` (`6599:50822`) and `<SpeedDialItem>` (`1436:84796`), plus SpeedDial's own `REAL-WORLD USE CASE Section` (the fixed-position dashboard mockup), were reparented wholesale, whole Section frames and all, not rebuilt, into `FAB - Component Gallery` (`1412:377`), landing in this order inside its `Gallery Content`: `<Fab> Section` -> `<SpeedDial> Section` -> `<SpeedDialItem> Section` -> FAB's own `REAL-WORLD USE CASE Section` -> SpeedDial's `REAL-WORLD USE CASE Section`. A baseline recursive scan (not `findAll()`) found 29 real instances resolving to either master across the file before touching anything: 21 living as structural children inside the moving nodes themselves (16 `<SpeedDialItem>`s nested in `<SpeedDial>`'s own Open variants, 5 inside the moving real-world mockup), and 8 living in the old Documentation frame's Visual Preview, which was not moving. Two consecutive post-move scans on the FAB page both found exactly 21, and a follow-up scan of the archived Documentation frame found exactly 8, reconciling to the original 29 with zero unresolved instances.

**Documentation content merged, not duplicated as a second frame.** `FAB - Documentation` (`1414:2284`) gained one new section, `SpeedDial (Composition) Section`, positioned directly before its existing Key Props Section (so the Documentation frame still ends on Key Props, matching every other component's page order). It contains an intro line naming the composition relationship, then ANATOMY, TOKEN ARCHITECTURE, USAGE GUIDELINES, and ACCESSIBILITY sub-blocks cloned verbatim from this page's own original prose (zero rewriting), plus a small KEY PROPS mini-table (a clone of FAB's real Key Props Table, retexted to SpeedDial's own 6 props: `open`, `onClose`, `onOpen`, `direction`, `ariaLabel`, `FabProps`), not a second top-level Key Props Section. FAB's own five original sections were not touched or rewritten.

**Standalone page retired, archived not deleted.** Once its real masters and real-world section moved out, the `     Speed Dial` page's Gallery frame held nothing but empty header chrome; its Documentation frame still held its full, untouched original content (nothing there was ever moved, only cloned). Both frames were relocated to the file's `_Archive / Deprecated Docs` page, renamed `_Archive / SpeedDial / 2026-08-06 / SpeedDial - Component Gallery (emptied, masters merged into FAB)` and `.../SpeedDial - Documentation (full original, content merged into FAB)`, and locked. The now fully-empty origin page was not deleted, only renamed to `     Speed Dial (merged into FAB, 2026-08-06)` for clarity in the page list, per an explicit "archive, don't delete" instruction that was read as covering the real content, not as license to remove the page shell unilaterally.

**Verification:** zero em dashes across every new or edited text node and this update, confirmed by a recursive scan of the new Documentation section's own text content.

## 8. 2026-08-06 update (same day, second follow-up): post-merge fixes and a Visual Preview sub-block

Three real issues were found reviewing the merged FAB page, plus one requested addition:

**`<SpeedDialItem>` Gallery section, card bounds bug, found and fixed.** The section's `Master Container` was offset `x=160` inside its wrapper, a leftover row-label margin reserved for two-axis grids (like `<SpeedDial>`'s own Direction x State section, which this one's chrome was cloned from) that this single-axis section never needed. That pushed real content off the section's own right clip boundary, so `TitleOnly` rendered almost entirely outside the visible area and `IconAndTitle`'s Fab was partially cut, while the axis labels sat roughly 170px left of the columns they were meant to label. Fixed by moving the container to `x=20` and recalculating all three label positions against the variants' true visual bounds (including `IconAndTitle`'s Tooltip pill, which extends left of its Fab). Confirmed with a fresh screenshot: all three columns now render fully inside the card, correctly labeled.

**`<SpeedDial>` Direction x State grid, reported clipping not reproduced.** Checked every one of the 5 real variants' absolute bounding boxes end to end: Right's last item ends at the exact pixel Left's first item begins minus a clean 20px gap, zero overlap. A full-resolution screenshot including overlapping siblings showed all 10 circles in the Right/Left row and all 5 in each of Up/Down rendering completely. No clip found; most likely the same stale-viewport symptom as the Documentation-section-missing report below, both reported before a fresh look.

**`FAB - Documentation`'s SpeedDial (Composition) section, reported missing, not reproduced.** Checked directly: visible, non-zero height, correctly parented in `Page Content`, positioned before Key Props Section exactly as built. A fresh screenshot rendered it fully and correctly. No stray duplicate Documentation frames exist on the page.

**Visual Preview sub-block added.** A new `VISUAL PREVIEW` sub-block was inserted into the `SpeedDial (Composition) Section`'s Card, positioned right after the intro line and before `ANATOMY`, matching where Visual Preview sits relative to Anatomy on every other component's Documentation frame. Reused the real `In Context Card` from SpeedDial's own original (now archived) Documentation frame directly, cloned wholesale rather than rebuilt: 4 real instances, `Up · Open`, `Up · Closed`, `Item: Icon`, `Item: Icon + Title`, matching the same 3-to-6-illustrative-instance rule every other Visual Preview follows. Confirmed with a screenshot.

## 9. 2026-08-06 closing review: renames applied, final status

**Renamed, everywhere, per sign-off.** `<SpeedDial>`'s `State` property (Open, Closed) is now `Visibility`. `<SpeedDialItem>`'s `Display` property (Icon, IconAndTitle, TitleOnly) is now `Content`. Both component property definitions were renamed via `editComponentProperty`, which cascaded automatically to every variant's own derived name (`Direction=Up, State=Open` -> `Direction=Up, Visibility=Open`, `Display=Icon` -> `Content=Icon`, etc.). A full page-wide text scan for the literal strings `State`/`Display` found 6 SpeedDial-specific prose/table mentions needing the same update (2 Anatomy paragraphs, 1 Token Architecture bullet, 1 Usage Guidelines bullet, 1 Key Props sub-table row, plus the closed-variant callout), all fixed; the scan's one remaining hit afterward was FAB's own unrelated `State` axis, correctly left untouched. No `SpeedDial.figma.tsx` exists in the codebase and `Fab.figma.tsx` has no SpeedDial mapping, so there was nothing to update on the code-connect side.

**Full residual scan, split by root.** `<SpeedDial>`'s own fills: 10 EDGE-bound (inherited from the nested `<Fab>` trigger's own migration), 32 non-EDGE-bound, 5 raw. `<SpeedDialItem>`: 0 EDGE-bound, 8 non-EDGE, 3 raw. This matches, in kind, the already-disclosed §2 debt (`background/paper-elevation-6`, `text/secondary`, `components/tooltip/fill`, `common/white/main`, literal white), now also duplicated into the new Visual Preview clone in `FAB - Documentation` (cloning the real thing necessarily carries its existing debt forward). Still explicitly deferred, not fixed this pass, no new gap introduced.

**Zero em dashes** across this file, confirmed by a final grep.

**Final status: retired as a standalone page, now a documented sub-family of FAB.** The two real masters and the real-world mockup live in `FAB - Component Gallery`; the prose lives in `FAB - Documentation`'s `SpeedDial (Composition) Section`. The old page's two frames are archived and locked on the `_Archive / Deprecated Docs` page, confirmed intact and unreferenced by anything live. One anomaly to flag: the emptied, renamed origin page itself has since disappeared from the file's page list with no delete call ever issued against it; the archived content is unaffected, but this is unexplained and worth reconfirming next session. Residual open items, unchanged from §2/§6, all previously disclosed: token migration (deferred), no `MuiSpeedDial*` theme override (not needed, no code-side gap exists), no web styleguide rebuild. **Go.**
