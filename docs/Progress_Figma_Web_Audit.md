# Progress Component 1:1 Figma-to-Web Parity Audit

**Figma source:** `EDGE Design System - New` (`fLQNXhHQhKBZzWnJGtUcwn`), page `     Progress` (`6586:46832`). Two real, independent `COMPONENT_SET`s sharing this one page, multi-master pattern (same precedent as Switch/FormControlLabel/FormGroup and FAB/SpeedDial): `<Progress> | Linear` (node `6586:46855`, `Type` x `Color` = `Determinate/Buffer/Indeterminate` x `Primary/Secondary/Inherit`, 9 variants, unchanged this pass) and `<Progress> | Circular` (node `6586:47016`, `Type` x `Color` x `Size` = `Determinate/Indeterminate` x `Primary/Secondary/Inherit` x `32px/16px`, 12 variants, doubled from 6 this pass). New `Progress - Component Gallery` frame (node `1611:720`) and new `Progress - Documentation` frame (node `1611:85546`), both built 2026-08-10.
**Web source:** no EDGE-specific Progress component exists. `CircularProgress` is used only as a raw `@mui/material` import inside Backdrop's Code Connect example and styleguide demo (`color="inherit"`); `LinearProgress` has zero usages anywhere in `src/`. No `MuiCircularProgress`/`MuiLinearProgress` `brandTheme.ts` entry exists, before or after this pass — not in scope (see §6).
**Status:** 2026-08-10, structural build and token migration both complete, including a same-day correction pass (§7) that fixed a real tier violation found during pre-commit verification. Real MUI coverage gaps (no status colors beyond Primary/Secondary/Inherit, no Circular Determinate/Indeterminate axis, Linear missing `Query`) were partially closed this pass — 5 status colors and the Circular axis were built; `Query` remains a disclosed, deferred gap.

## 1. Master component structure

| Dimension | Figma | Web | Verdict |
| :--- | :--- | :--- | :--- |
| Node type | Two real `COMPONENT_SET`s. Linear: `Type` x `Color`, 9 variants, structurally unchanged this pass (only rebound). Circular: `Type` x `Color` x `Size`, 12 variants — doubled this pass, `Type` is a wholly new axis | MUI's real `CircularProgress` (`variant`, `color`, `size`, `thickness`) and `LinearProgress` (`variant`, `color`) | **Both now model `variant`(`Type`) and `color`(`Color`) directly.** `thickness` has no Figma axis (fixed per size, matching the pre-existing convention). Linear's `variant` covers `determinate/buffer/indeterminate` but not `query` — disclosed, not built (§6). |
| Circular arc geometry | Rebuilt this pass as real `arcData` ELLIPSE nodes (percent-accurate sweep), replacing the pre-existing hand-drawn `VECTOR` path found at Step 1. Determinate = fixed 75% illustrative sweep from 12 o'clock; Indeterminate = an offset ~252° sweep, structurally distinct, implying motion the same way Linear's own Indeterminate does (two flanking bars vs. one continuous fill) | N/A (CSS animation, not representable statically) | **Confirmed before building:** Linear's own Indeterminate variant carries zero annotation of any kind (`description` is an empty string on all 3 checked variants; the only in-component text layer has `fills: []`, invisible). Circular's new Indeterminate was built to match that same no-annotation convention exactly, not to invent a new one. This remains an open, project-wide question — no shipped EDGE-DS component has yet established a real convention for annotating animated states on a static canvas. |
| Circular percentage label | A `<Typography>` "body1"/"body2" instance nested in each variant, `characters` overridden per variant. **Self-correction:** Step 1's discovery report incorrectly described this as hidden by default on Circular — it is genuinely `visible: true`. Corrected this pass: the 3 new Determinate 32px variants now read `"75%"` (was a stale `"99%"` inherited from the clone source); the 3 Indeterminate 32px variants have the label switched to `visible: false`, since an unknown-duration spinner should not display a specific percentage | N/A — real MUI has no built-in label; this is a bespoke Figma addition | **Two real, disclosed corrections**, not silent — see §4. |
| Linear Buffer geometry | Two layered fills confirmed: a solid leading `Progress` bar, plus a nested `Buffer` frame built from 5 small tiled 4x4 rectangles at 60% node-opacity, 8px apart — a legitimate static rendering of MUI's own largely-static dashed buffer-track pattern, not a duplication bug (verified by x-position tiling, not assumed) | MUI's real `buffer` variant: a solid bar + a lighter secondary bar + a static dashed leading edge | **Correctly represented**, unchanged this pass (rebind only). |
| Legacy wrapper | Present, same `_Library / Component Heading` + `Grid` shape as every prior pre-2026-08 component page, both masters nested inside two `Container` sections in one shared legacy frame | N/A | **Archived.** See §5. |

## 2. Design tokens & theme variables

### Group A — 4 tokens, existing raw bindings rebound (5th, `secondary/main`, folds into Group B)

| Raw binding | Resolved value | New target | Verdict |
| :--- | :--- | :--- | :--- |
| `primary/main` | `#009f9b` | `Components/Progress/Primary/Track` -> `Brand/Primary/500` | Exact match, direct Brand-tier alias, same target Button's own `Primary/BG/Default` uses. |
| `text/primary` | `rgba(0,0,0,0.87)` | `Components/Progress/Inherit/Track` -> `Semantic/Text/Primary` (`#212121`) | Disclosed computed-equivalent match (flattened-on-white), same discipline already accepted on Alert and Paper. |
| `text/secondary` | `rgba(0,0,0,0.6)` | `Components/Progress/Label/Text` -> `Semantic/Text/Secondary` (`#616161`) | Disclosed near-match (~2% off), same class of deviation already accepted on Link's `Text/Inherit`. |
| `background/paper-elevation-0` | `#ffffff` | `Components/Progress/Shared/TrackOverlay` -> `Semantic/Surface/Paper` | Exact match, one shared token across all colors (genuinely color-agnostic role), not duplicated per status — matches the `Shared/*` naming convention already established (`Components/Button/Shared/Focus`, `Components/Fab/Shared/FocusRing`). |

Rebind: 63 Linear + 15 Circular fills/strokes, name-driven, zero real mismatches (all initially-flagged "mismatches" were the `Opacity` overlay layer, correctly universal across colors by design). 87 total mutations, 3 consecutive clean residual passes.

### Group B — 5 new status colors, proper Semantic tier (corrected same day, see §7)

| Status | Resolved value | Chain (final, post-correction) |
| :--- | :--- | :--- |
| Error | `#d32f2f` | `Components/Progress/Error/Track` -> `Semantic/Status/Error/Main` -> **`Brand/Error/500`** (new) -> `red/700` |
| Warning | `#ef6c00` | `Components/Progress/Warning/Track` -> `Semantic/Status/Warning/Main` -> **`Brand/Warning/500`** (new) -> `orange/800` |
| Info | `#0057b2` | `Components/Progress/Info/Track` -> `Semantic/Status/Info/Main` -> **`Brand/Info/500`** (new) -> `blue/700` |
| Success | `#2e7d32` | `Components/Progress/Success/Track` -> `Semantic/Status/Success/Main` -> **`Brand/Success/500`** (new) -> `green/800` |
| Neutral (rebind of existing "Secondary" variant) | `#5e6e7d` | `Components/Progress/Neutral/Track` -> `Semantic/Status/Neutral/Main` -> **`Brand/Secondary/500`** (existing, previously un-used for this purpose) -> `EDGE-Blue/500` |

**Naming note:** the existing "Color=Secondary" variant name was *not* renamed on the canvas — confirmed via Button's own already-migrated `<Button>` set, whose real `Color` variant literally keeps the value `"Secondary"` even fully migrated. Only the token is named `Neutral`, per convention. Rebinding "Secondary" to the Neutral-tier token is a rebind of what already existed, not a net-new axis value; the real new axis values are Error/Warning/Info/Success only.

**Deliberately not reused:** Button's existing `Components/Button/{Status}/BG/Default` tokens were not used as Progress's alias target, per explicit instruction. Progress's tokens route through the new `Semantic/Status/{Status}/Main` tier instead. Migrating Button (and any other status-bearing component) onto this same Semantic tier is a separate, future, file-wide follow-up — flagged, not started.

## 3. Completeness: real gaps, disclosed

- **Linear's `Query` variant** (real MUI value) has no Figma variant built. Not part of this pass's confirmed scope.
- **No `thickness` axis** on Circular — fixed per size, matching the pre-existing (unchanged) convention.
- **Animation representation** remains an open, project-wide question (§1) — flagged, not resolved, consistent with the explicit instruction not to invent a new answer for Circular alone.
- **10 `<Skeleton>` `action/hover` bindings**, inside both real-world mockups, deliberately left un-migrated — `Semantic/State/Hover` resolves to a solid turquoise tint, nothing like the translucent shimmer `action/hover` actually renders; forcing it would be a real regression. Same exact class of residual already disclosed and accepted on Paper's own two mockups. Belongs to `<Skeleton>`'s own future token pass.

## 4. What was found (discovery, before and during the build)

- Both masters were real `COMPONENT_SET`s already (not single components), but Circular had no `Type` axis at all — a single static arc look, structurally unable to distinguish determinate from indeterminate.
- All 5 raw MUI-import bindings were genuinely raw MUI-import *names* (like Paper's pre-migration state), not raw hex — confirmed by direct binding inspection, not assumed.
- The `Progress: buffer` real-world mockup was misnamed: its actual composed instance was `<Progress> | Circular`, not a Linear/Buffer instance at all.
- Circular's percentage label was found genuinely visible by default (Step 1's report was wrong on this point — corrected here, see §1).
- Circular's arc was a hand-drawn `VECTOR` path, not a real arc — confirmed unsuitable for accurate re-percentaging, replaced with `arcData` ELLIPSE geometry (the same technique the pre-existing `Background` ring already correctly used).
- Button's page composes 18 real `<Progress> | Circular` instances (`Color=Primary, Size=16px`) for its `State=Loading` variant, all resolving cleanly to the real master — a genuine, pre-existing dependency, not introduced by this pass.
- **Pre-commit correction (§7):** verification found 4 of the 5 new `Semantic/Status/*/Main` tokens pointed directly at a raw, wholesale-imported Material Design color library (`material/colors` collection — 170 of 292 variables follow exact standard Material naming), a real §5.1 violation at the Semantic tier itself.

## 5. What was built

- **Token creation:** 14 variables in the initial pass (5 `Semantic/Status/*/Main` + 9 `Components/Progress/*`), plus 4 more (`Brand/Error/500`, `Brand/Warning/500`, `Brand/Info/500`, `Brand/Success/500`) in the same-day correction pass (§7). All `ALL_SCOPES`, matching the file's existing convention.
- **Token rebind:** 87 mutations across Linear + Circular (§2), plus 9 nested-instance "body2" label overrides that reverted to raw `text/primary` after the component sets were reparented into the Gallery (a real instance of the flaky nested-instance-override behavior documented in this project's own methodology, §7.13) — caught by the final sweep and re-fixed.
- **Circular Determinate/Indeterminate axis:** 6 -> 12 variants. All 12 arcs rebuilt as real `arcData` ellipses. Screenshot-verified before and after.
- **Mockups:** `Progress: circular loading card` (renamed from the mismatched `Progress: buffer`). New `Progress: linear buffer` — a CSV bulk-import card ("Uploaded — 4.2 of 6.8 MB" / "Verified rows — 12,406 of 18,900") composing two real Buffer instances (Primary + Neutral), same Topbar-anchored context as the existing mockup. Both live as `REAL-WORLD USE CASE` sections inside the Gallery frame, matching Paper's own precedent (mockups live in Gallery, not Documentation).
- **Legacy cleanup:** duplicated the legacy `Progress` frame in place as a safety net, reparented both real masters out of the original directly into the new Gallery. 3 consecutive clean manual recursive-walk passes (172 instances checked each time) confirmed zero unresolved references before archiving the emptied original to `_Archive / Progress / 2026-08-10`, locked. The safety duplicate was discarded once verification succeeded — it never became load-bearing.
- **`Progress - Component Gallery`:** Top Header and Gallery Header cloned directly from Paper's verified reference (per explicit instruction, not re-derived from the written spec), retexted. Two `MASTER COMPONENT SET` sections (Linear, Circular), axis labels read off each set's real, live grid coordinates (Linear: `Type` rows at y=24/76/128, `Color` columns in real order Primary/Inherit/Secondary at x=45.5/336.5/627.5, not alphabetical — confirmed directly, not assumed). Both real-world mockups folded in as `REAL-WORLD USE CASE` sections.
- **`Progress - Documentation`:** Top Header and Intro Block cloned directly from Paper's verified reference. Full section backbone: Visual Variants (5 illustrative instances spanning both masters), Sizing (Circular's 32px/16px), Anatomy & Token Architecture, Usage Guidelines & Accessibility, Key Props Table (5 rows: `variant`, `color`, `value`, `size`, `thickness`), Specs & Accessibility Notes (last, covering the animation-annotation open question, the two label self-corrections, the mockup rename/build, the legacy archive, and the Button dependency).
- **Final chrome sweep (applying the lesson from Paper's own correction pass, done as part of this build rather than a later fix):** found and bound the Gallery frame's own background, both mockup wrappers' pre-existing raw `background/default`/`background/paper-elevation-1` bindings (pre-existing legacy debt, not introduced this pass, propagated into the new mockup's cloned Topbar), and 74 unbound literal `#ffffff` fills inside the masters' own internal frames (`ProgressContainer`, `Buffer`, component roots, `Ring`, `min-width`) — a broader class than the original Group A scope, found via this final sweep and bound to `Semantic/Surface/Paper`, matching Paper's own exact precedent for this class of residual.

## 6. Button dependency: baseline deviation, documented

**What was supposed to happen:** screenshot Button's 18 loading-state instances as a pre-migration baseline, before touching any Progress token.

**What happened instead:** the token creation/rebind ran first, before the baseline screenshot was taken. This was a real process miss, not a deliberate choice.

**Why this is an accepted substitute, not a redo:** verification was performed a different way at every checkpoint instead — `mainComponent`-resolution checks (confirming all 18 instances still resolve to the real, live master, both immediately after the rebind and again after the Gallery-frame reparenting) plus exact-hex-chain resolution (confirming `Components/Progress/Primary/Track` resolves to the identical `#009f9b` the raw `primary/main` binding supplied before). A pixel-level before/after diff would trivially show zero change given a value-identical token swap — the underlying math is sound, so redoing the screenshot retroactively would not surface anything the resolution checks didn't already prove. Flagged here as a real process note: **future passes should capture the pre-migration baseline before the first token mutation, not rely on post-hoc resolution checks**, even when the math makes the outcome predictable, since the predictability itself isn't verifiable after the fact without the baseline to compare against.

**Not done:** no `MuiCircularProgress`/`MuiLinearProgress` `brandTheme.ts` entry was created — outside this pass's confirmed scope. Button's own loading spinner has no `loadingIndicator` slot override today, so a future global `MuiCircularProgress` entry could cascade into it. Flagged for direct verification whenever that entry is created; not checked further here since it doesn't exist yet.

## 7. Same-day correction: Semantic/Status tier Brand-primitive violation

**Root cause.** During Group B token creation, `Semantic/Status/{Error,Warning,Info,Success}/Main` were aliased directly to raw material-palette swatches (`red/700`, `orange/800`, `blue/700`, `green/800`) instead of through a `Brand/*` primitive, and `Semantic/Status/Neutral/Main` was aliased directly to `EDGE-Blue/500` (a genuine custom EDGE swatch, but skipping the already-existing `Brand/Secondary/500` wrapper that aliases the identical value). Caught during Step 4 pre-commit verification, not before.

**Verification performed, directly, not from memory:**
- `material/colors` (the collection housing `red/700` etc.) confirmed to be a wholesale-imported Material Design library: 170 of its 292 variables follow the exact standard Material naming convention (`amber/50…900`, `blue/50…900`, etc.) — the same class of raw import as Paper's own flagged "MUI palette" collection, though a different collection ID.
- The same collection also holds 3 genuine custom EDGE swatch families (`EDGE-Turquoise`, `EDGE-Blue`, `EDGE-Red`) mixed into the raw import — confirmed by naming pattern, not collection membership, as the correct signal for "genuine Brand primitive" vs. "raw import."
- `EDGE-Red/*` (all 14 steps) checked against the Error value (`#d32f2f`) — no match at any step (closest, `EDGE-Red/500`, is `#ac0235`, a materially different crimson hue). No existing Brand-tier match for Error, Warning, Info, or Success.
- `Brand/Secondary/500` (existing, EDGE palette collection) confirmed to already alias `EDGE-Blue/500` exactly — missed in original Group B research, a real, fixable oversight for Neutral specifically.

**Correction applied.** Created 4 new Brand-tier primitives — `Brand/Error/500`, `Brand/Warning/500`, `Brand/Info/500`, `Brand/Success/500` — each aliasing the raw swatch that previously supplied the value directly, mirroring the exact existing `Brand/Primary/500 -> EDGE-Turquoise/500` / `Brand/Secondary/500 -> EDGE-Blue/500` shape. Re-pointed all 5 `Semantic/Status/*/Main` tokens (Error/Warning/Info/Success to their new Brand primitive, Neutral to the existing `Brand/Secondary/500`) — zero resolved-value drift confirmed by re-resolving the full chain for all 5 (`#d32f2f`, `#ef6c00`, `#0057b2`, `#2e7d32`, `#5e6e7d`, all unchanged). `Components/Progress/{Status}/Track` tokens needed no changes — they alias the Semantic tier, which now resolves through the corrected chain automatically.

**Verification after correction.** Full chain re-resolved for all 5 tokens and all 5 `Components/Progress/*/Track` tokens (now a 4-hop chain: Components -> Semantic -> Brand -> raw swatch). Screenshot of the Linear master confirmed zero visual change (expected, since only the alias target changed, not the resolved value). Residual sweep re-run across both frames: 0 unbound, 0 raw-MUI-palette bindings beyond the 10 already-disclosed `<Skeleton>` residuals (§3) — unchanged from before the correction, confirming it introduced no new residuals.

## 8. Still open, lower priority

- **Linear's `Query` variant** has no Figma equivalent. Not built this pass.
- **The animation-annotation question** (§1, §3) remains genuinely open project-wide, not just for Progress.
- **10 `<Skeleton>` `action/hover` bindings** (§3) remain disclosed, un-migrated debt belonging to Skeleton's own future token pass.
- **No `MuiCircularProgress`/`MuiLinearProgress` `brandTheme.ts` entry, no Code Connect files** (`Progress.figma.tsx` or split `CircularProgress.figma.tsx`/`LinearProgress.figma.tsx`) — neither was in scope for this pass, consistent with how most components, including Paper, shipped without them.
- **Button's future `loadingIndicator` cascade risk** (§6) — flagged, not yet checkable since no `MuiCircularProgress` entry exists.
- **No web styleguide page** was built, paused project-wide pending the Storybook migration, per the established 2026-08-05 process change.
