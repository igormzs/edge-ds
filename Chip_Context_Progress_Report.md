# Context & Progress Report: EDGE Design System (Chip Component Refactor)

This document provides a concise architectural and engineering context for the Chip component refactor in the EDGE Design System (Figma), mirroring the process previously completed for Button.

---

## 1. Executive Summary & Strategic Decisions

- **Single Source of Truth Adopted:** The native MUI `<Chip>` component set (Figma node `6588:47683`, 112 variants) is now the exclusive source of truth for Chip. All detached/legacy `Chip.EDGE` structures have been deleted.
- **Geometry Audit — No Remediation Needed:** Unlike Button, the native Chip matrix was found to already be 100% compliant with the Hug-contents rule across all 112 variants. No padding, sizing, or layout changes were required.
- **Token Architecture Established:** Introduced `Components/Chip/...` as a dedicated component-token namespace in the local "EDGE palette" collection, following the same isolation principle used for Button — but sourced from the project's existing `Semantic/Status/*` layer wherever possible instead of inventing new primitives.
- **Three Behavioral Gaps Identified and Approved:** Chip's native interaction model differs from Button in three ways (disabled treatment, focus indication, outlined hover feedback). All three were reviewed and explicitly approved to remain as-is for this pass — see Section 6.

---

## 2. Geometry & Typography Audit (Reference Only — Already Compliant)

| Size | Height | Padding (T/B/L/R) | Corner Radius | Sizing Mode |
| :--- | :--- | :--- | :--- | :--- |
| Medium | 32px | 4 / 4 / 4 / 4 | 100 (pill) | Hug × Hug |
| Small | 24px | 3 / 3 / 4 / 4 | 100 (pill) | Hug × Hug |

- Box-model math checked and confirmed exact: Medium → 32 − (4+4 outer) − (3+3 "Typography" frame inner padding) = 18px = label line-height. Small → 24 − (3+3) − (0+0) = 18px. Same precision pattern as Button's `sizeLarge` 44px derivation.
- **Typography:** Both sizes share a single label style — Roboto Regular, 13px, 18px line-height, 0.16px letter-spacing. This is *not* a gap — MUI's real Chip does not scale font size by size prop, only padding. No `chipLabelMd`/`chipLabelSm` split was created, to stay faithful to native behavior.

---

## 3. Deprecation & Cleanup Metrics

| Legacy Node | Type | Contents | Status |
| :--- | :--- | :--- | :--- |
| `Chip EDGE` (`15:3964`) | COMPONENT_SET | 3 variants: `Type=New/In Progress/Submitted` | **Deleted** |
| `Chip.EDGE` (`426:3753`) | FRAME (doc page) | Contained nested set `387:5749` (`State=Enabled/Hovered/Focused/Disabled`) inside a "Showcase" sub-frame | **Deleted** (took `387:5749` with it) |

**Orphan-reference scan performed prior to deletion:**
- Scope: all 74 pages of the file
- Traversed: 34,516 nodes / 11,983 component instances checked
- Result: **0 active instances** referenced either legacy component set
- Conclusion: deletion executed with no instance-swap required — nothing in the file depended on the legacy nodes.

---

## 4. Token Architecture — `Components/Chip/...`

**Naming pattern:** `Components/Chip/{Color}/{Variant}/{Slot}`, plus a small shared/disabled group — same convention family as `Components/Button/...`.

**Key architectural decision:** rather than inventing a new MUI-style `main/dark/contrastText` primitive scale, the 4 status colors (Error, Warning, Info, Success) were aliased directly to the **existing `Semantic/Status/{Color}/{Background,Border,Icon,Text}` layer** — the same primitives already consumed by `Components/Alert/*` and `Components/Status Tag/*`. This keeps Chip visually and architecturally consistent with every other status-driven component in the system, rather than introducing a parallel color source.

Primary/Secondary (brand colors, not status colors) were aliased to the `Brand/Primary/*` and `Brand/Secondary/*` numbered scales — the same primitives Button's Primary tokens already reference.

**Result: 45/45 variables created in "EDGE palette," 100% as `VARIABLE_ALIAS` (zero hardcoded hex).**

| Color | Filled/BG/Default | Filled/BG/Hover | Filled/Text | Outlined/Border | Outlined/Text | Outlined/BG/Hover* |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Primary | Brand/Primary/500 | Brand/Primary/600 | Semantic/Text/Inverse | Brand/Primary/500 | Brand/Primary/500 | Brand/Primary/50 |
| Secondary | Brand/Secondary/500 | Brand/Secondary/600 | Semantic/Text/Inverse | Brand/Secondary/500 | Brand/Secondary/500 | Brand/Secondary/50 |
| Default | Semantic/Surface/Subtle | Semantic/Surface/Hover | Semantic/Text/Primary | Semantic/Border/Default | Semantic/Text/Primary | Semantic/Surface/Hover* |
| Error | Semantic/Status/Error/Icon | Semantic/Status/Error/Border | Semantic/Text/Inverse | Semantic/Status/Error/Border | Semantic/Status/Error/Text | Semantic/Status/Error/Background* |
| Warning | Semantic/Status/Warning/Icon | Semantic/Status/Warning/Border | Semantic/Text/Inverse | Semantic/Status/Warning/Border | Semantic/Status/Warning/Text | Semantic/Status/Warning/Background* |
| Info | Semantic/Status/Info/Icon | Semantic/Status/Info/Border | Semantic/Text/Inverse | Semantic/Status/Info/Border | Semantic/Status/Info/Text | Semantic/Status/Info/Background* |
| Success | Semantic/Status/Success/Icon | Semantic/Status/Success/Border | Semantic/Text/Inverse | Semantic/Status/Success/Border | Semantic/Status/Success/Text | Semantic/Status/Success/Background* |

\* `Outlined/BG/Hover` tokens exist and are correctly aliased but are **not currently bound to any node** — see Gap #3 in Section 6.

**Shared tokens (created, partially bound):**

| Token | Aliased To | Bound? |
| :--- | :--- | :--- |
| `Components/Chip/Shared/Focus` | Semantic/Border/Focus | Not bound — see Gap #2 |
| `Components/Chip/Disabled/BG` | Semantic/Surface/Disabled | Not bound — see Gap #1 |
| `Components/Chip/Disabled/Text` | Semantic/Text/Disabled | Not bound — see Gap #1 |

One provisional call made during creation: the four `{Status}/Filled/BG/Hover` tokens alias to each color's `Border` role (no dedicated hover primitive exists yet in `Semantic/Status/*`). Flagged as provisional — revisit if design produces a true hover swatch for status colors.

---

## 5. Binding Pass Results

- **Scope:** all 112 variants of `<Chip>` (`6588:47683`) — 7 colors × 2 sizes × 2 variants (Filled/Outlined) × 4 states (Enabled/Hovered/Focused/Disabled)
- **Result:** 224 successful bind operations (fill/stroke + label text per variant), **0 errors**
- **Geometry re-verified post-bind:** heights unchanged (32px Medium / 24px Small), Hug × Hug preserved on both axes across all 112 variants
- Visual QA via rendered screenshot of the full component set confirmed consistent per-color theming across Filled and Outlined blocks, with Disabled rows correctly dimmed via opacity (not color swap — by design, see Gap #1)

---

## 6. Known Behavioral Gaps (Reviewed & Approved — Deferred)

1. **Disabled uses opacity, not color tokens.** The native Chip applies `opacity: 0.38` to the whole node for `State=Disabled`, matching real MUI behavior (`action.disabledOpacity`), rather than swapping to distinct disabled colors the way Button does (`action.disabledBackground` / `action.disabled`). **Approved:** keep native opacity inheritance. `Disabled/BG` and `Disabled/Text` tokens remain created but unbound.
2. **Focused has no dedicated indicator.** Unlike Button's `focusRipple` ring, Chip's `State=Focused` currently just reuses the Hovered fill/border — there is no separate focus-ring element in the native asset. Adding one would require new geometry (out of scope for a token-binding pass). **Approved:** leave unbound, revisit as a future accessibility enhancement. `Shared/Focus` token remains created but unbound.
3. **Outlined has no hover fill feedback.** All Outlined states currently share identical fill (`null`) and stroke across Enabled/Hovered/Focused/Disabled — no background tint appears on hover, diverging from real MUI Chip CSS (`alpha(color, hoverOpacity)`). Adding it means introducing a new fill where none exists today. **Approved:** leave unbound for now to preserve native asset structure. The 7 `Outlined/BG/Hover` tokens remain created but unbound.

---

## 7. Status

**Chip component is locked** as of this session: legacy nodes removed, native matrix confirmed geometry-compliant, 45 component tokens created and documented, 112 variants fully bound where applicable. Remaining unbound tokens (3 shared + 7 outlined-hover = 10 of 45) are intentional placeholders for the three approved-deferred enhancements above, not implementation errors.

## 8. 2026-08-07 chrome token rebind: Gallery/Documentation raw-hex cleanup

**Root cause.** A 2026-08-03 audit found and fixed raw/literal chrome colors (card backgrounds, borders, captions, body text) baked into the `Component Doc - EDGE-DS` master template, mapping them to existing `Semantic/*` and `Documentation/*` tokens. That fix does not retroactively reach frames cloned from an already-drifted ancestor. Chip's Gallery/Documentation frames were built 2026-08-04, before this session's Icons/Link builds but from lineage the 2026-08-03 fix didn't reach either, so the same gap recurred here — not a new defect, and unrelated to the `Components/Chip/*` token work documented in §4-§7 above, which covers the real `<Chip>` master only.

**What was rebound.** 56 raw fills/strokes across `Chip - Component Gallery` and `Chip - Documentation` chrome: white card/panel backgrounds → `Semantic/Surface/Paper`, black body/bullet text → `Semantic/Text/Primary`, grey caption/axis-label text → `Semantic/Text/Tertiary` and `Documentation/Text/Muted`, teal `FILLED`/`OUTLINED` eyebrow labels → `Brand/Primary/500`. The real `<Chip>` master COMPONENT_SET (112 variants, 564 descendant nodes) was re-confirmed to have zero raw colors, untouched by this pass.

**Content investigation, not a defect.** A parallel discovery pass flagged that the Anatomy & Token Architecture section's `Component Placeholder Slot` appeared to contain stale Checkbox-topic prose. Checked live `.characters` directly (not the node's `.name`, which Figma never re-syncs after a text edit): the real content is fully correct, Chip-specific prose (container/avatar/delete-icon/label anatomy, the real `Components/Chip/*` token architecture). No duplicate content exists; this was a stale-name false read, not a content bug.

**A note on the discovery pass itself.** The subagent that ran this page's original chrome audit also reported, in its final summary, what it described as an embedded fake "system-reminder" prompt-injection attempt in a tool result. On follow-up, it retracted this: re-scanning its own transcript found no such content anywhere in the actual tool outputs, and the quoted text contained an internal date inconsistency confirming it was fabricated, not observed. There was no real prompt-injection event and nothing to remediate in this file.

**Verification.** 3 consecutive clean residual scans, 0 remaining matches for any of the raw chrome values. Visual spot-check confirmed no rendering regression.
