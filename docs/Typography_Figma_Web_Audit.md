# Typography Component/Foundation 1:1 Figma-to-Web Parity Audit

Built 2026-08-11. Structurally unlike every prior pass: not a blank slate, and not a single real structure — Typography turned out to be **two distinct real things sharing one Figma page**, and the web side already had a full, non-trivial `edgeTypography` scale in `brandTheme.ts` before this pass started. This doc covers the initial build (§1–§7) and a same-day post-build correction pass (§8) that fixed three real gaps the initial build missed.

## 1. Master component structure

Two real, independent structures existed on the `Typography` page (`6605:52433`), not one:

- **`<Typography>` — real `COMPONENT_SET`, node `11609:174872`.** MUI-named variant vocabulary: `Variant` (`h1, h2, h3, h4, h5, h6, body1, body2, subtitle1, subtitle2, overline, caption, custom` — 13 values) x `Gutter Bottom` (`True, False`). **25 real variants, not 26** — `Variant=custom, Gutter Bottom=True` does not exist; only `Variant=custom, Gutter Bottom=False` (`272:88408`) does. The initial discovery pass over-counted this at 26 by trusting a raw symbol-tag count instead of filtering to actual `COMPONENT` children; corrected before the build.
- **`Typography_EDGE` — a type-scale specimen sheet, not a component set.** 10 EDGE-named entries (`display-lg, heading-xl, heading-lg, heading-md, heading-sm, heading-xs, body-lg, body-md, body-sm, body-xs`), each a static frame (Example text + Title + Font/Size line + Line-height/Letter-spacing line), structurally closer to the Palette foundation page's swatch-grid than to any prior component's Gallery.
- **Both structures' real content survives**, per explicit direction — the `<Typography>` component set became the Gallery's Master Component Set section; the specimen sheet's content was rewritten (not copied) into the Gallery's EDGE Type Scale section. The specimen sheet's own source frame, `Typography_EDGE`, was initially left live as a stray 3rd top-level frame after the build (still containing its original 10 truncated-pangram entries) — this was a real Two Core Frames Architecture violation, caught in review, not by the build's own checks. **Fixed in the post-build correction pass (§8):** re-verified the Gallery's rebuilt EDGE Type Scale content was complete and correct, then archived `Typography_EDGE` itself via the standard duplicate-as-safety-net procedure. The page now holds exactly 2 top-level frames.
- **Real, live cross-page composition — the most consequential discovery of this pass.** `<Typography>` is not documentation-only: **121 real instances exist across 12 other pages** (Accordion, App Bar, Progress, Avatar, Forms, Timeline, Headings, Tree View, Data Grid, Table, Menu, Overview), broken down as `Variant=h6,GutterBottom=True`: 3 (Forms), `Variant=body1,GutterBottom=False`: 58 (mostly Accordion, plus App Bar/Progress/Avatar/Forms/Timeline/Headings/Tree View/Overview), `Variant=custom,GutterBottom=False`: 3 (Data Grid), `Variant=body2,GutterBottom=False`: 33 (Progress/Data Grid/Table), `Variant=caption,GutterBottom=False`: 24 (all Menu). 5 of the 121 instances resolve to a `null` containing page (orphaned/off-canvas remnants) — flagged, not chased down further. This turned what looked like a documentation-only extraction into a real component move with real blast radius; handled with a duplicate-as-safety-net, verify-121/121-before-and-after, then-delete-duplicate procedure (see §5). **Re-verified independently in the post-build correction pass (§8) after an apparent 4,284-instance reading mid-pass turned out to be a transient measurement artifact, not a real count** — a fresh read after all operations settled reproduced 121/121 with an identical per-variant breakdown, confirming the original figure was correct all along.
- **`custom` variant is mis-wired**, confirmed via its bound Figma variable, not assumed: it resolves to `table/header` (Roboto Medium, 14px, line-height 24 (1.714), letter-spacing 0.17) — an unrelated table-header style, not any real typography token. No correct EDGE-side "custom" concept exists to rebind it to. Built as-is (it's a real variant, so it belongs in the Gallery for completeness) but flagged visibly in both the Gallery (an on-canvas amber tag on the tile) and the Documentation frame's Properties table (a dedicated `custom` row) — not silently fixed, because there's nothing correct to fix it to yet.
- Legacy content: the usual stock MUI-for-Figma `_Library / Component Heading` + `_Library / Component Information` + `Grid` wrapper, confirmed via its literal "© mui.com" / "MUI for Figma Material UI v5.14.0" footer and Lorem-ipsum placeholders — same disposable pre-Two-Frame-Architecture shape as every prior component.
- The Master Component Set's own internal variant grid had a real layout bug: the `h1, Gutter Bottom=True` and `h1, Gutter Bottom=False` tiles visually overlapped (confirmed via each variant's actual x/y bounds — every other row's bounds already cleared cleanly; only the `h1` row's two columns intersected). **Fixed in the post-build correction pass (§8)** by deriving a clean 2-column grid from each variant's real current width/height rather than reusing carried-over positions.
- The Gallery/Documentation headers initially shipped with a flat placeholder rectangle in place of the real EDGE-DS logomark image asset that every other finished component's header uses. **Fixed in the post-build correction pass (§8)** by cloning the real logomark from Radio's finished header.
- No real-world mockup/usage-example content existed anywhere on the page — only the specimen sheet's own "Example" text boxes, which used a truncated pangram (`"...the lazy do"`, missing "g") in all 10 entries. Fixed (see §5), not merely flagged, per explicit instruction.

## 2. Token mapping

Figma's type-scale variables are single-tier `Font()` composites (family/style/size/weight/line-height/letter-spacing only — no color field), unlike color's 3-tier Component→Semantic→Primitive chain. There is no semantic-alias layer for typography to map through.

| Figma variable (`typography/*`) | Web key (`edgeTypography`) | Status this pass |
|---|---|---|
| `display-lg` (96, 700, lh 1.167, ls -1.44) | `display-lg` | Already matched, untouched |
| `heading-xl` (60, 700, lh 1.2, ls -0.9) | `heading-xl` | Already matched, untouched |
| `heading-lg` (48, 600, lh 1.167, ls -0.6) | `heading-lg` | **Corrected** — was lh 1.25 / ls -0.48 |
| `heading-md` (34, 600, lh 1.235, ls -0.34) | `heading-md` | Already matched, untouched |
| `heading-sm` (24, 600, lh 1.334, ls -0.12) | `heading-sm` | Already matched (web's 1.33 vs Figma's 1.334 — rounding, not a real gap) |
| `heading-xs` (20, 600, lh 1.6, ls -0.05) | `heading-xs` | **Corrected** — was lh 1.4 / ls -0.1 |
| `body-lg` (18, 600, lh 1.5, ls 0) | `body-lg` | **Corrected** — was weight 400 / lh 1.56 |
| `body-md` (16, 400, lh 1.5, ls 0) | `body-md` | Already matched, untouched |
| `body-sm` (14, 400, lh 1.43, ls 0.06) | `body-sm` | Already matched, untouched |
| `body-xs` (12, 600, lh 1.5, ls 0.06) | `body-xs` | **Corrected** — see naming mix-up below |
| `caption` (12, 400, lh 1.66, ls 0.48) | `caption` (**new key**) | **Added** — see naming mix-up below |
| `overline` (12, 600, lh 2.66, ls 0.9, uppercase) | `overline` (**new key**) | **Added**, pure addition, no prior value |

**The `caption`/`body-xs` naming mix-up.** Figma's `typography/caption` variable (400/12/1.66/0.48) is numerically identical to what web's `edgeTypography.body-xs` held before this pass. Figma's own `typography/body-xs` variable is a completely different value (600/12/1.5/0.06). The most plausible read: whoever originally wrote `edgeTypography['body-xs']` sourced it from Figma's `caption` concept and the name diverged, rather than the two values genuinely drifting apart over time. Resolved by **adding a new `caption` key** holding the old `body-xs` values, **re-pointing the `caption` MUI-variant alias** in `baseTheme.typography` to this new key (zero visual change for the 4 live usages — `layout.tsx`'s sidebar subtitle, `tabs/page.tsx`×2, `accordion/page.tsx`), and **correcting `body-xs` itself** to Figma's real value. Net effect: `caption` renders exactly as `body-xs` used to; `body-xs` is now correct for the first time.

**h1/h3 alias correction.** Figma's own `<Typography>` component set binds its `h1` variant to `typography/display-lg` and its `h3` variant to `typography/heading-lg` — not to `heading-xl`/`heading-md` as `baseTheme.typography` previously aliased them. That prior mapping put both one visual tier too small (h1 rendered at 60px instead of 96px; h3 at 34px instead of 48px — a full tier gap, not a metric nudge, confirmed visually via side-by-side screenshots). Grepped every form of usage (`variant="h1"`, `variant='h1'`, `variant={...}`, `component="h1"`, `theme.typography.h1`, same for h3) and found **zero usage anywhere in `src`** — so this was invisible in the live app either way. Decided to match Figma exactly rather than treat the smaller prior mapping as an intentional design decision, since nothing in the codebase, git history, or Figma disclosed a reason for the divergence.

**`buttonLabelSm` side effect.** `buttonLabelSm` (small `MuiButton` label style) spreads `edgeTypography['body-xs']` for its base font properties. Correcting `body-xs`'s line-height from 1.66 to 1.5 would have silently changed small-button text line-height as an unrequested side effect of a typography-scale fix — `fontWeight`/`letterSpacing` are already explicitly overridden in `buttonLabelSm` so those were unaffected, but `lineHeight` was not. Pinned `lineHeight: 1.66` explicitly in `buttonLabelSm`, decoupling it from `body-xs`'s own value, with a comment explaining why. Already-shipped button rendering is unchanged.

## 3. Completeness: real gaps, disclosed

- `custom` variant mis-wired to `table/header`, no correct target exists — flagged in Gallery (on-canvas tag) and Documentation (Properties row), not fixed.
- 5 of 121 `<Typography>` instances resolve to a `null` page (orphaned/off-canvas) — noted, not chased down.
- `h2`, `h4`, `h6`, `subtitle1` (MUI variant names) still have no `edgeTypography` mapping at all and fall through to MUI's stock defaults — unlike `h1`/`h3`/`h5`/`body1`/`body2`/`caption`, which now all resolve through the EDGE scale. Not in scope this pass; flagged in §9.
- `DocUI.tsx` (the shared wrapper most styleguide pages render through) and `foundations/palette/page.tsx` both bypass the variant/token system entirely with hardcoded `sx` literals that duplicate — sometimes inexactly — `edgeTypography` values. Found in discovery, not touched this pass (out of scope; a usage-pattern cleanup, not a token-correctness issue).
- **`Semantic/Status/Success/Border` naming oddity (found in §8's token sweep).** The "Migrated ✓" badge's green text (`4CAF50`) is bound to `Semantic/Status/Success/Border` — the only variable in the `Semantic/Status/Success/*` family that matches `4CAF50` exactly (`.../Text` is `1B5E20`, `.../Icon` is `2E7D32`). The token's name implies border use, not text use. Disclosed, not renamed or duplicated with a new token — an exact hex match takes precedence over a naming preference per this pass's own rule.
- **Documentation section-label color inconsistency (found in §8's Button/Chip/Checkbox comparison).** Button and Checkbox use teal (`Brand/Primary/500`) with tight tracking for prescriptive sections like "Usage Guidelines," while Typography's Documentation uses the muted-gray (`Documentation/Text/Muted`) treatment uniformly across all its section labels. Chip's own precedent doesn't clearly show the same split, so the pattern isn't fully consistent across the reference set itself — disclosed, not changed.

## 4. What was found (discovery, before and during the build)

- Full inventory of both real structures, their variant/entry counts, and their binding states — see §1.
- The 121-instance cross-page composition, discovered only when checking `getInstancesAsync()` on each of the 25 variants before assuming a safe extraction — not visible from metadata inspection alone.
- The `caption`/`body-xs` value-vs-name mismatch, and the corroborating single-commit git forensic: `git blame` attributes all of `edgeTypography` to commit `75b2bb3d` ("style(theme): update Button padding scales..."), which `git log -S` confirms is where the entire scale was introduced from scratch, bundled into an unrelated button-padding commit with no dedicated typography-focused message — consistent with the scale having been scaffolded once and not cross-checked against Figma's own `typography/body-xs` vs `typography/caption` variables at the time.
- Visual + blast-radius investigation on all 6 metric-mismatched keys (`heading-lg`, `heading-xs`, `body-lg`, `body-xs`, then `h1`, `h3`) via a throwaway comparison page rendered with Playwright, before deciding any correction — not resolved from numbers alone.
- The rem-conversion arithmetic error in the original specimen sheet's own labels (18px shown as `1.25rem`; should be `1.125rem` at a 16px base) — caught while authoring the rebuilt EDGE Type Scale specimens fresh, not copied forward.

## 5. What was built

- **Legacy cleanup:** duplicated the real `<Typography>` component set as a safety net, reparented it directly out of the stock wrapper into the new Gallery's Master Component Set section, re-ran the exact same per-variant `getInstancesAsync()` check and confirmed **121/121 instances identical, per-variant breakdown byte-for-byte unchanged**, then deleted the duplicate. Archived the emptied wrapper to `_Archive / Typography / 2026-08-11 / Typography (legacy _Library wrapper, real masters extracted to Typography - Component Gallery)` inside the `🗄️ _Archive / Deprecated Docs` page's `Archive MUI` section, matching the exact naming precedent set by Radio/Rating the same week.
- **`Typography - Component Gallery`:** two sections.
  - Master Component Set — the real 25-variant set, reparented untouched, plus a visible amber "Mis-wired: bound to table/header, not a real typography token" tag positioned on the `custom` tile.
  - EDGE Type Scale — rebuilt from scratch (not copied) as 12 specimens (10 corrected + new `caption`/`overline`), each with the complete pangram, corrected rem-conversion math, and the corrected letter-spacing sign (the old sheet displayed `body-sm`'s letter-spacing as `-0.06px`; the real bound value is `+0.06px`).
- **`Typography - Documentation`:** the existing real "Component documentation" instance was moved (not recreated) into a new frame. Header/Description/Usage Guidelines kept verbatim (already real, already Typography-specific). Rewrote:
  - Properties: `variant`, `gutterBottom`, `component`, and a 4th row repurposed for the `custom` mis-wiring flag — replacing four stale Button-copied rows (`type`/`font size`/`line height`/`letter spacing` property names against Button-era option/description text).
  - Accessibility Notes: heading-hierarchy/semantic-mapping, WCAG AA contrast ratios, don't-override-line-height guidance — replacing Button's touch-target/WCAG-button copy.
  - Dev Handoff/Token Mapping: relabeled the 3rd column from "Semantic Alias (Tier 2)" to "Web Token (edgeTypography)" since typography has no semantic-alias tier (disclosed directly in the section's own description text, not silently reinterpreted); populated with 11 of the 12 real `typography/*` → `edgeTypography[...]` pairs (the existing row template has 11 slots; instances can't have rows added structurally without detaching, which was out of scope). The 12th key (`overline`) is covered in the new reference table instead, and the section text says so explicitly.
  - Added a new 12-row **Type Scale Reference** table (Key/Font/Size/Weight/LH/LS/Figma variable/Web token) — appended as its own section after the instance rather than spliced inside Properties, since the instance's internal structure can't be edited; disclosed as a placement choice, not hidden.
- **3 consecutive clean checks** before calling the Gallery/Documentation sections done: frame names correct, 25/25 variants with 121/121 instances intact, 12/12 EDGE Type Scale entries present, zero Lorem-ipsum leftovers, zero truncated pangrams, both mis-wiring flags present, legacy wrapper correctly archived and absent from the live page, safety-net duplicate gone. All three runs identical. **This check did not catch the `Typography_EDGE` frame, the header logomark placeholder, the Master Component Set grid overlap, or the un-tokenized chrome colors — all four were caught only in the post-build review that led to §8.**

## 6. Web side

- `edgeTypography` (`src/theme/brandTheme.ts`): corrected `heading-lg`, `heading-xs`, `body-lg`, `body-xs`; added `caption`, `overline`.
- `baseTheme.typography`: re-pointed `caption` alias to the new `caption` key (removed the stale explicit `caption: edgeTypography['body-xs']` line — now handled automatically by the `...edgeTypography` spread since the key names match); `overline` now flows through the same spread with no explicit line needed; corrected `h1`/`h3` aliases to `display-lg`/`heading-lg`.
- `buttonLabelSm`: pinned `lineHeight: 1.66` explicitly to avoid silently inheriting `body-xs`'s corrected line-height (see §2).
- No `MuiTypography` styleOverrides block exists beyond the alias mapping in `theme.typography` itself — unchanged, still true after this pass. The only `.MuiTypography-root` references in the codebase remain inside `MuiAccordionSummary`, unrelated to this pass.
- Zero regressions confirmed: `npx tsc --noEmit` clean after every edit; dev server compiles and serves without errors; all changed keys (`heading-lg`, `heading-xs`, `body-lg`, `h1`, `h3`) had zero prior usage anywhere in `src` (grepped every form: `variant="..."`, `variant='...'`, `variant={...}`, direct `edgeTypography[...]` reference, `theme.typography.*`); `body-xs`'s only live exposure (4 usages, all via the `caption` alias) is visually unchanged since `caption` now holds `body-xs`'s old values.
- **§8's correction pass touched Figma only — no further `brandTheme.ts` changes.** The chrome/documentation colors rebound in §8 are Figma-side design-doc tokens (`Documentation/*`, `Semantic/*`), unrelated to the `edgeTypography` type-scale values this section covers.

## 7. Code Connect

No `Typography.figma.tsx` exists. Not created this pass — flagged as not started, same as every other component's open Code Connect item in this file.

## 8. Post-build correction pass (same day, 2026-08-11)

A visual review of the finished frames — done after §1–§7's build was already called complete and checked — found three real gaps the build's own clean checks (§5) hadn't covered, plus one item worth investigating. All of the following happened in Figma only; no `brandTheme.ts` changes.

**Two Core Frames Architecture violation, corrected.** The page still had 3 top-level frames, not 2: `Typography_EDGE` (§1) had never been archived after its content was rebuilt into the Gallery, and still held its original 10 truncated-pangram (`"...lazy do"`) entries. Re-verified the Gallery's EDGE Type Scale content was complete and correct first, then archived `Typography_EDGE` to `_Archive / Typography / 2026-08-11 / Typography_EDGE (emptied, specimens rebuilt in Typography - Component Gallery, documentation moved to Typography - Documentation)` via the standard duplicate-as-safety-net procedure. Confirmed after: exactly 2 top-level frames, 12/12 complete pangrams, 0 truncated.

**Real header logomark, restored.** Both frames' Top Header shipped with a flat placeholder rectangle instead of the real EDGE-DS logomark image every other finished component uses. Cloned the real `Logomark` node (image-filled) from Radio's finished header, positioned it exactly where the placeholder sat, and removed the placeholder — done in both the Gallery and Documentation headers.

**Master Component Set grid overlap, fixed.** Only the `h1, Gutter Bottom=True`/`False` tiles actually overlapped — every other row's bounds already cleared. Rebuilt the grid by deriving column widths and row heights from each variant's real, current geometry (not the positions carried over from the original reparent): 2 columns (24px / 648px, gap derived from the real max column width), 24px row gap, componentSet resized to hug the new bounds, and the `custom`-variant mis-wiring flag repositioned to sit below the new last row. Verified via screenshot: no overlapping tiles anywhere in the 25-variant grid.

**Full chrome color token audit.** A selection-colors check found ~17 raw hex fills across both frames instead of bound tokens — a real violation of this project's "every fill resolves through a token" standard. Resolved all of them:

| Hex (+ role) | Token | Notes |
|---|---|---|
| `262D34` | `Documentation/Header/BG` | exact match |
| `F8FAFB` | `Documentation/Surface/Page` | exact match |
| `009F9B` | `Brand/Primary/500` | exact match |
| `FFFFFF` (text) | `Semantic/Text/Inverse` | exact match |
| `FFFFFF` (frame) | `Semantic/Surface/Paper` | exact match |
| `616161` | `Semantic/Text/Secondary` | exact match |
| `5E6E7D` | `Documentation/Text/Muted` | exact match |
| `E0E0E0` | `Documentation/Border/Subtle` | exact match |
| `F5F5F5` | `Semantic/Surface/Subtle` | exact match |
| `212121` | `Semantic/Text/Primary` | exact match |
| `4CAF50` | `Semantic/Status/Success/Border` | exact match, naming oddity disclosed in §3 |
| `000000` (98 instances, pangram/heading display text) | `Semantic/Text/Primary` | rebound — see §3 for why this wasn't a hex-exact match but was approved anyway |
| `FFF2CC` | `Documentation/Flag/Warning-BG` | **new token created** |
| `9E4A05` | `Documentation/Flag/Warning-Text` | **new token created** |
| `E2E2E2` | `Documentation/Surface/Example` | **new token created** |
| `E0EEED` | `Documentation/Token/Background` | **new token created** |

403 individual fill instances rebound across both frames. Re-census after: zero unbound raw hex remaining in either frame.

**Button/Chip/Checkbox comparison.** Pulled real geometry from all three finished references: card `cornerRadius: 8`, `padding: 28`, section labels `Open Sans SemiBold 12px`, badges `cornerRadius: 999`. Typography already matched on card treatment and badges. One real, unambiguous gap the comparison caught: the `EDGE-DS` header wordmark was `16px` / `0.5px` letter-spacing against a consistent `20px` / `0%` standard on all three references — fixed to match exactly. The teal-vs-gray section-label pattern (see §3) was also found here but not acted on, since the reference set itself isn't fully consistent on it.

**Instance count re-verified, not corrected.** A `getInstancesAsync()` read taken mid-correction-pass (after the Master Component Set had just been reparented into its new card) returned 4,284 instead of 121. A fresh read taken after all operations settled reproduced **121**, with a per-variant breakdown identical to §1's original figures, and a 4-instance spot-check by ID confirmed every checked instance still resolves to its correct `mainComponent`. **Lesson for future passes:** `getInstancesAsync()` can return inflated or transient counts when read immediately around a reparent/move operation — treat a count taken mid-operation as unreliable, and re-verify with a fresh read once the operation has fully settled before trusting or reporting it.

**Final verification:** 3 consecutive clean checks, all identical — exactly 2 top-level frames, real image-filled logomark in both headers, 25/25 variants with 0 overlapping tiles, 0 unbound raw hex fills in either frame (aside from the disclosed `Semantic/Status/Success/Border` naming note, which is bound, just named oddly), 12/12 complete pangrams, `custom`-mis-wiring flag present, `EDGE-DS` wordmark 20px in both frames.

## 9. Still open, lower priority

- `h2`, `h4`, `h6`, `subtitle1` have no `edgeTypography` mapping and fall through to MUI's stock defaults — not investigated this pass (no comparable "prior mapping pointed one tier off" signal was found for these the way it was for h1/h3; would need its own investigation pass).
- `custom` variant's `table/header` mis-wiring — no correct target exists yet; needs a Figma-side decision, not a web-side one.
- `DocUI.tsx` and `foundations/palette/page.tsx` bypass the token system with hardcoded `sx` literals — a usage-pattern cleanup for a future pass, not addressed here.
- 5 of 121 `<Typography>` instances resolve to a `null` containing page — not tracked down.
- `Semantic/Status/Success/Border` used for the "Migrated ✓" badge's text color — exact hex match, but the token's name implies border use. Consider a dedicated `Semantic/Status/Success/Text`-shaped rename/addition in a future token-hygiene pass.
- Documentation section labels use a uniform muted-gray treatment where Button/Checkbox split muted-gray (preview sections) vs. teal (prescriptive sections like Usage Guidelines) — not aligned, since the reference set itself isn't fully consistent on this pattern.
- Code Connect (`Typography.figma.tsx`) not started.
