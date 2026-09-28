# Typography Font-Family Audit — Wave 2, Step 1 (Discovery)

**Status:** Discovery only. Nothing in Figma was changed. This is a follow-up to Wave 1 (which closed 14 shared text styles + a defined set of manual overrides, fully built and independently verified — see `docs/typography-font-audit.md` and `docs/typography-font-fix-proposal.md`) covering the Roboto/other-font surface that turned up during Wave 1's build-verification pass but was explicitly out of scope for it.

**File:** `EDGE Design System - New` (`fLQNXhHQhKBZzWnJGtUcwn`)
**Policy:** Montserrat = headers only. Open Sans = everything else (including labels). Roboto not approved anywhere. Roboto Mono in Prop/Type value-cell pairs on component Documentation frames = confirmed permanent exception, not re-flagged. Anything else (Arial, Inter, etc.) reported separately.

---

## 1. Method note

- Tool: `mcp__figma-remote__use_figma` (Plugin API), per the `figma-use` skill. `whoami` confirmed a live, correctly-authenticated Bridge connection before starting, and a subsequent full 73-page listing (`figma.root.children`) succeeded cleanly.
- **Page count confirmed live:** 73 top-level pages. 9 are empty section-header pages (skipped after confirming emptiness). The remaining 64 pages were each traversed via a **manual recursive walk over `.children`** (never `findAll()`).
- **Hidden-layer handling:** every node's `.visible` was checked explicitly, combined with the accumulated visibility of every ancestor down from the page. **Result: every single flagged node across all 64 pages resolved `visible: true`, full ancestor chain included** — everything found is live on-canvas content, not hidden/dead scaffold.
- Font resolution used `getStyledTextSegments(['fontName','textStyleId','fontSize'])` per text node, so mixed-run text is caught per-segment.
- **Style-resolution deep-dive:** for the 14 shared text styles Wave 1 closed, `figma.getLocalTextStylesAsync()` was queried directly to check the current, authoritative font of each style.

---

## 2. Summary table

| Cluster | Page(s) | Count found | Shared style / Manual | Disposition | Reconciliation vs. original Step 1 report |
|---|---|---|---|---|---|
| Roboto Mono in Prop/Type cells | ~45 Documentation pages | ~500+ nodes | Manual, Roboto Mono Regular 12–14 | Confirmed permanent exception — not flagged. | Same as original §3a finding; reconfirmed everywhere. |
| Inter doc-chrome "Axis Label" / boilerplate | Far wider than reported: ~20 pages | ~1,700+ nodes (rough estimate; precisely re-counted at 765/19 pages in the Wave 2 proposal, see below) | Manual, Inter Medium/SemiBold/Bold/Regular 9–13px | (b) Documentation-chrome annotation, not live content. | Major expansion of original finding (originally named only Button/FAB/Checkbox/Radio/Switch). |
| Cover status-legend | Cover | 4 (later confirmed exactly 4, see proposal) | Manual, Roboto Regular 24 | (a) Live cover-page content — correct to Open Sans. | Same cluster as original "IN PROGRESS chip text" finding — undercounted there. |
| Paper/Progress header cells | Paper, Progress | 8 (4 each: Prop/Type/Default/Description) | Manual override, visually matches `table/header` style | (a) Live Documentation-frame content. | Same cluster, precisely counted; "Description" is a 4th cell the original report never named. |
| "Add Characters" placeholder | Progress, Archive, ↳ Forms, Stepper, Overview | 36 (later reconciled to 32 in-scope, see proposal) | Manual, Roboto Regular 4px — Figma's own empty-text-layer placeholder | (b) Definitively non-user-facing. | Expansion, not re-count — original cited "~17." |
| ↳ Forms pre-built screen | ↳ Forms | 116 (later reconciled to 121) | All manual, no shared style | (a) Live pre-built screen mockup. | Matches prior-verification's "~121" closely. |
| Date/Time calendar — Roboto | Date / Time | 34 | Manual, Roboto Bold/Regular 12–14 | (a) Live MUI-X mockup — correct to Open Sans. | Original "one stray Roboto Bold cell" was a representative example, not a full count. |
| Date/Time calendar — Arial | Date / Time | 98 | Manual, Arial Regular/Bold 12 | (a) Live MUI-X mockup. | Unchanged from original report, now precisely counted. |
| MUI-for-Figma branding lockup | 🎭 Miscellaneous | 7 (later reconciled to 6 real branding nodes, see proposal) | Manual, Roboto Black/Bold/Medium/Regular 34–109px | (b) Legacy plugin cover art. | Exact match to the "~13 one-offs" cluster. |
| Instance Slot placeholders | ↳ Headings | 2 | Manual, Roboto Regular 12 | (b) Plugin-scaffold slot label. | Exact match to the "~13 one-offs" cluster. |
| "Latest Jobs" heading | ↳ Screens | 1 | Manual, Roboto Regular 24 | (a) Live pre-built screen. | Exact match to the "~13 one-offs" cluster. |
| Overview extras | Overview | 3–4 | Manual, Roboto Regular 4 / Regular 48 / Light 96 | Mixed — see proposal. | Exact match to the "~13 one-offs" cluster. |
| Overview "Getting Started" residual copy | Overview | 1 (`914:91251`) | Manual, Roboto Regular 16 | (a) Live onboarding copy. | Shrunk finding — 2 of the original 3 cited IDs were already fixed. |
| **Pages Templates — stale remote style** | Pages Templates | 14 (confirmed real via direct spot-check after an initial contradictory automated re-check) | Bound to a REMOTE (library-published) copy of `input/label`, still Roboto Regular 12 | (a) Live legacy-screen content, but root cause is structural. | Genuinely new finding. **Later fully resolved**: a comprehensive 73-page recheck found exactly 54 remote-copy-bound nodes total, all confined to this page — confirmed out of scope per Wave 1's own archive exclusion, Wave 1 remains closed. |
| Archive — Link footer pattern | Archive | 22 | Manual, Roboto Regular 14, name "Link" | (a) matches the ~45-page recurring doc-template footer-Link finding. | Same cluster as original report — Archive's share of it. |
| Archive — misc (Duplicate buttons, `typography/H4`, Inter headers, MUI Title) | Archive | ~19 | Mixed | (b) Archived/legacy — expected, out of scope. | Mostly new minor findings, all correctly out of scope. |

---

## 3. Answers to the original clarification questions

1. **↳ Forms enumeration:** live, actively-composed pre-built screen content (file-upload widget, passwordless-login form, one marketing headline) — not scaffold. Recommend (a) correct to Open Sans (headline itself later reclassified as a heading in the Wave 2 proposal).
2. **Date/Time gap explanation:** not a side effect of Wave 1's `datePicker/currentMonth` style fix — that's a different, shared-style node. The 34+98 figure reflects manual overrides on individual hour/minute/day-number/AM-PM/Today cells that the original report only sampled one example of. The Arial weekday/day-number content is unchanged from the original report, just newly precisely counted.
3. **Cover legend overlap:** same cluster as the original "one" finding — a 4-node status-legend cluster that was undercounted.
4. **Paper/Progress overlap:** same 8-node set; "Description" is a previously-unnamed 4th header cell alongside Prop/Type/Default.
5. **Add Characters recount:** a real expansion, not just a recount — Badge and ↳ Screens (named in the original report) now show zero instances, while ↳ Forms (never mentioned) has 10–15. All confirmed non-user-facing (4px, empty text slot).

---

## 4. Open questions carried into the Step 2 proposal

1. Scope of the remote-style problem for the other 13 Wave 1 styles (later fully resolved — see summary table above).
2. Pages Templates disposition (legacy page — remained out of scope).
3. The Inter doc-chrome cluster's scope (later locked in as in-scope for Wave 2, target Open Sans).
4. Add Characters — leave as-is or fix (later locked in as "fix, low risk").
5. Date/Time and Data Grid code-parity (later confirmed: zero `@mui/x-*` dependencies, Figma-only mockups).

See `docs/typography-font-fix-proposal-wave2.md` for the resolved proposal.
