# EDGE-DS Migration Status

Tracks the MUI-palette → EDGE-palette Figma token migration, component by component. This is the repo-visible counterpart to Claude's private cross-session memory notes — update both together whenever a component's status changes. This file is intentionally a summary (current state + key decisions); the detailed blow-by-blow history, gotchas, and full audit trail live in Claude's memory and in this directory's per-component `*_Figma_Web_Audit.md` files where they exist.

Canonical SOP: [`figma-component-structure.md`](./figma-component-structure.md) (component migration workflow, token-tier rules, Two-Frame Architecture) and [`web-component-page-pattern.md`](./web-component-page-pattern.md) (paired web styleguide pattern).

**Figma file:** `EDGE Design System - New`, fileKey `fLQNXhHQhKBZzWnJGtUcwn`.

**Standing rule:** Figma is the source of truth for tokens/colors — code (`brandTheme.ts`, Storybook) must always be brought to match Figma's live values, never the reverse.

**Standing gotcha:** never trust an old "✅ / Locked" mark on a page as proof of full migration completeness without re-verifying live — this has been wrong more than once on this project.

---

## Status

| Component | Status | Notes |
|---|---|---|
| Button | ✅ Migrated | `Inherit` variant fixed during ButtonGroup pass |
| ButtonGroup | ✅ Migrated | |
| Autocomplete | ✅ Migrated | Gallery + Documentation built; one deferred sub-issue: `<Chip>`'s own close-icon fill (closed later, during Chip's migration) |
| Badge | ✅ Migrated | Two master sets (standalone + with-instance) |
| Chip | ✅ Migrated | Root tokens were already migrated pre-session; `<Avatar>`/`CancelFilled` sub-instance gaps closed |
| Dialog | ✅ Migrated | Composite: DialogTitle/DialogContent/DialogActions/Dialog Elements/Dialog root, all closed. New token: `Semantic/Border/Divider` |
| Divider | ✅ Migrated | Reused `Semantic/Border/Divider` from Dialog's pass |
| Colors/Typography foundations | ✅ Migrated | Documentation rebuilt; `orange/900` data bug fixed; `warning.main` amber/orange cross-component bug fixed; zero-hardcode doc-chrome audit closed |
| Select | ✅ Migrated | Documentation/Border/Subtle resolution recorded |
| Skeleton | ✅ Migrated | Two-Frame Architecture built, token gap closed |
| Slider | ✅ Migrated | Two-Frame Architecture built, MuiSlider overrides added |
| Snackbar | ✅ Migrated | `<SnackbarContent>` documented as peer section to `<Snackbar>`; **known issue, not yet fixed:** its Documentation frame's Anatomy & Token Architecture prose is leftover Checkbox copy, needs a content-only fix |
| **Stepper** | 🟡 In progress — Tranche 1 of 3 done | See below |
| Menu / MenuItem | ⏸️ Paused | Discovery found 3 confusingly-similar page names; paused to prioritize Stepper. Resume by re-running Step 1 page-collision check before continuing. |
| Checkbox, Radio, Switch, Chip (Avatar), Alert, Paper, Skeleton | ✅ Migrated (earlier work, pre-dates the current session sequence) | |

### Stepper — tranche detail

Structurally the most complex family tackled so far: 5 real component structures (`Step Icon`, `<Step>`, `<MobileStepper>`, `<DesktopStepper>`, `<Stepper>`), split into 3 gated tranches rather than one combined pass, given real architecture issues found (not just token gaps).

- **Tranche 1 — `Step Icon` + `<Step>`: ✅ Done, independently verified.**
  - Both fully retokenized off `MUI palette`. Two new shared tokens created: `Semantic/Status/Error/Default` (alias → `Brand/Error/700`) and `Semantic/Status/Info/Default` (alias → `Brand/Info/700`) — named `/Default` since neither existing `/Main` (500-tier) nor `/Icon` (800-tier) role matched the required `/700` value. Warning recolored to `Brand/Warning/800` for cross-component consistency with Alert/Chip/Badge (a deliberate value change, not a byte-match to the old raw value). `Semantic/Status/Success/Icon` reused as-is (exact match).
  - Real independent bug fixed: `Text=Left, State=Info`'s icon was wrongly bound to `primary/main` (teal) while `Text=Center` was correctly blue — both now identical.
  - Icon-mechanism decision: kept as intentional two-tier design (`Step Icon` = numbered-circle/checkmark only; Error/Warning/Info/Success keep splicing in Alert/Chip/Badge-style status icons rather than folding into `Step Icon`) — documented explicitly as by-design in `<Step>`'s Documentation frame.
  - Active-state icon confirmed to need no new variant — it's the same `State=Default` master as Inactive, differentiated only by a per-instance fill-color override (confirmed via Figma's own `overrides` API, no other property differs).
  - New frames: `<Step> - Component Gallery` and `<Step> - Documentation`, with `Step Icon` folded in as a peer `MASTER COMPONENT SET` section (matching the `<Snackbar>`/`<SnackbarContent>` precedent — a sub-component exclusive to one parent gets a peer section, not its own standalone page).
  - Legacy scaffold frame deliberately **not archived yet** — still holds `<Stepper>`, `<MobileStepper>`, `<DesktopStepper>` until Tranches 2–3 reparent their own pieces out.
- **Tranche 2 — `<Stepper>`: 🟡 Step 2 (proposal) in progress.** Known open items: 12 of 16 variants exist (missing all 4 `Small Screen=true × Alignment=Vertical` combos); one step position (`6576:51147`, inside variant `6576:51136`) is wired to an orphaned legacy `Step` component set rather than the current `<Step>`; only ~2 of ~30+ step positions across all 12 variants are real `<Step>` instances, the rest are hand-baked duplicate frames — composition-fix approach (rebuild to real instances vs. minimal fix) is under proposal. A `<Stepper>`-specific connector token (`components/stepper/connector`) is under investigation for a likely direct alias to `Neutral/Grey/400`.
- **Tranche 3 — `<MobileStepper>` + `<DesktopStepper>`: ⏳ Not started.** Expected to be mostly mechanical token work; family-wide Two-Frame Architecture close-out (final legacy scaffold archival) happens here once all three tranches are done.

---

## Known systemic gaps (not component-specific)

- **No spacing/sizing token bindings anywhere in the file.** A real `Sizing/1`–`12` (8px scale) collection exists but is never bound to any padding/gap property in any component or documentation frame checked so far. Deliberately deferred to its own future project, not picked up opportunistically.
- **`Brand/*` primitive tier has no neutral/grey/black family** beyond `White` — components needing a non-brand-colored icon/text have had to alias to `Neutral/*` (a separate tier that was closed 2026-08-12) or, in rare cases, hardcode with an explicit flagged exception.
- **Documentation-chrome zero-hardcode rule**: any Gallery/Documentation frame chrome (labels, captions, wrapper backgrounds) authored during a migration must bind to real tokens, never literal hex — violations get audited and fixed (see Colors foundations' zero-hardcode pass) rather than left silently in place.
