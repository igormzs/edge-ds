# Select / MenuItem Component 1:1 Figma-to-Web Parity Audit

**Built 2026-08-12.** Covers two real masters: `<Select>` (its own page) and `<MenuItem>` (master lives on the `Menu` page, rebound here because Select's Gallery and Autocomplete's Documentation frame both compose real instances of it). Neither had any prior web presence, Figma documentation pass, or audit doc before this one.

## 1. Master component structure

`<Select>` is a real `COMPONENT_SET`, node `6570:41424`, confirmed via `mainComponent.parent` resolution (not assumed from naming). **72 real variants**, variant props `Variant` (`Standard`/`Filled`/`Outlined`) × `Size` (`Medium`/`Small`, no `Large`) × `State` (`Enabled`/`Disabled`/`Error`/`Focused`/`Hovered`) × `Has Value` (`True`/`False`), plus `Active` (`True`/`False`, only ever paired with `State=Focused`, representing the open-menu sub-state). Full base grid (60) + Active=True sub-grid (12) = 72, zero gaps.

`<MenuItem>` is a real `COMPONENT_SET`, node `6576:50735`, on a separate page, `Menu` (`6576:50713`). **24 of 32 possible variants**, props `Small Screen` × `Dense` × `Dis. Gutters` × `State` (`Enabled`/`Hovered`/`Selected`/`Disabled`). The entire `Small Screen=True, Dense=True` combination is missing for both `Dis. Gutters` values (8 variants) — real, confirmed gap, not fabricated, not built this pass.

## 2. Shared-master relationships (confirmed, not assumed)

Both masters are composed live, cross-page, by Autocomplete's own `Autocomplete - Documentation` frame — the same class of dependency as Paper→Drawer/Dialog and List→Drawer:

- 8 `<Select>` instances across Autocomplete's "Grouped/Categorized Options," "Sizing & Variants," and "States & Interactivity" sections all resolve (`mainComponent.parent.id`) to `6570:41424`.
- 7 `<MenuItem>` instances in the same "Grouped Menu List" sub-frame all resolve to `6576:50735`.

**Post-build cascade re-verification (not assumed):** re-resolved all 8 Select instances and all 7 MenuItem instances after the token rebind and after archiving legacy content — all still resolve to the correct masters. Directly inspected one Select instance's and one MenuItem instance's (Hovered-state) bound fills and confirmed the new `Components/Select/*` and `Components/MenuItem/Hover/BG` tokens are present with zero edits made to Autocomplete's own frame.

**Pre-existing Autocomplete bug found, not fixed:** the two `<ListSubheader>` instances in that same "Grouped Menu List" resolve to an **orphaned** component (`1163:85025`, `.parent === null`, absent from a tree-walk of the Autocomplete page) — not List's real, already-migrated `<ListSubheader>` master (`6645:59769`, correctly parented on the List page). This is Autocomplete's own defect, out of scope for this pass; noted here for whoever revisits Autocomplete.

## 3. Dead content removed: the `AutocompleteTag`/`<Chip>` subtree

Investigated before touching anything. All 72 Select variants contained an identical `Input > Content > AutocompleteTag > <Chip>` path with exactly 3 nested `<Chip>` instances each (216 total). Findings:

- Present in **100% of variants** (all 72), including `Has Value=False` ones — ruled out "shows only when a value is selected."
- Always the same 2 static Chip variants (`Filled`/`Outlined`, `Color=Default`, `State=Enabled`) regardless of the parent Select's own Variant/State/Error/Disabled — ruled out "reflects Select's own state."
- The `AutocompleteTag` wrapper's `visible` property was `false` in every sampled instance — the content never rendered, in any variant.
- 2 of the 3 chips per variant sat at the identical `(x, y)` — overlapping if ever shown.

**Conclusion: leaked, inert template content** (almost certainly inherited from Autocomplete's own tag-rendering structure — Select's and Autocomplete's masters share the `6570:` ID prefix range), not a deliberate design choice. Removed: **72 `AutocompleteTag` wrapper frames, 216 nested `<Chip>` instances**, confirmed by a manual recursive walk (not `findAll()`) at 0 residual across 3 consecutive passes. The 2 Chip-token bindings this subtree used (`Components/Chip/Default/Filled/BG/Default`, `Components/Chip/Default/Outlined/Border`) dropped out of scope entirely along with it — no rebind needed, no dangling reference left.

## 4. Token migration

### 4.1 New tokens created (10)

| Token | Kind | Value / alias |
|---|---|---|
| `Components/Select/Label/Focus` | alias | → `Brand/Primary/500` |
| `Components/Select/Icon/Disabled` | literal | `#000000 @ 38%` |
| `Components/Input/Standard/Border/Default` | literal | `#000000 @ 42%` |
| `Components/Input/Standard/Border/Hover` | literal | `#000000` (solid) |
| `Components/Input/Filled/Fill/Default` | literal | `#000000 @ 6%` |
| `Components/Input/Filled/Fill/Hover` | literal | `#000000 @ 9%` |
| `Components/Input/Outlined/Border/Default` | literal | `#000000 @ 23%` |
| `Components/Input/Outlined/Border/Hover` | literal | `#000000` (solid) |
| `Components/MenuItem/Hover/BG` | literal | `#000000 @ 4%` |
| `Components/MenuItem/Selected/BG` | alias + custom opacity | → `Brand/Primary/300`, paint opacity `0.04` |

Created in the `EDGE palette` collection, single mode, `scopes: ['ALL_SCOPES']` — matching this file's existing convention, not a narrower one imposed unilaterally.

**`Components/Input/*` is a reusable foundation, not a Select-scoped detail.** No `Components/Input/*` tier existed anywhere in the file before this pass. TextField's own eventual migration should alias onto these 6 tokens rather than re-deriving the same six border/fill values independently — same framing as Progress's `Semantic/Status/*` tier becoming the reusable foundation for future status-bearing components.

**Corrected during this pass, not built as originally proposed:** `background/paper-elevation-8`/`-0` were initially slated to route through `Semantic/Elevation/8`/`Semantic/Elevation/0`. Verified directly against the live variable set: no such variable exists — `Semantic/Elevation/1-24` (from Paper's pass) is an **Effect Style** (drop-shadow) tier, a different Figma primitive that a `fills` array cannot bind to. Paper's own actual precedent rebound the equivalent fill variables to `Semantic/Surface/Paper`, an exact value match here too (`#ffffff` both sides) — used that instead.

### 4.2 Rebind results

**`<Select>` master:** 407 mutations across 1,171 nodes (post-Chip-removal tree). 3 consecutive clean residual passes, 0 raw MUI-import bindings remaining except the one binding that was already migrated pre-pass (`Semantic/Border/Divider`, untouched, correct).

**`<MenuItem>` master:** 36 mutations on the first pass (18 `text/primary`, 6 `action/hover`, 6 `primary/hover`, 6 `text/disabled`). The first residual check surfaced a real gap the original discovery data missed: **24 more `text/secondary` bindings**, on nested `<Typography>` instance overrides (a `caption` sub-node, id format `I…;…` confirming per-instance override) — the same flaky nested-instance-override class already documented on this project (Progress §7.13). Rebound to `Semantic/Text/Secondary` (matching the existing text-token precedent) on the second attempt; 3 consecutive clean passes after, 0 residuals, 313 total nodes stable across repeats. **Total MenuItem mutations: 60.**

Full mapping (role → raw source → target):

| Component | Role | Raw source | Target | New? |
|---|---|---|---|---|
| Select | Value text | `text/primary` | `Semantic/Text/Primary` | No |
| Select | Unfocused label | `text/secondary` | `Semantic/Text/Secondary` | No |
| Select | Disabled label/placeholder | `text/disabled` | `Semantic/Text/Disabled` | No |
| Select | Focused label (fill) | `primary/main` | `Components/Select/Label/Focus` | Yes |
| Select | Focused border (stroke) | `primary/main` | `Semantic/Border/Focus` | No |
| Select | Error label + border | `error/main` | `Semantic/Status/Error/Main` | No |
| Select | Dropdown icon | `action/active` | `Semantic/Icon/Default` | No |
| Select | Disabled dropdown icon | `action/disabled` | `Components/Select/Icon/Disabled` | Yes |
| Select | Nested `<Paper>`/label-container fill | `background/paper-elevation-{8,0}` | `Semantic/Surface/Paper` | No (corrected target) |
| Select | Standard border default/hover | `components/input/standard/{enabledBorder,hoverBorder}` | `Components/Input/Standard/Border/{Default,Hover}` | Yes |
| Select | Filled fill default/hover | `components/input/filled/{enabledFill,hoverFill}` | `Components/Input/Filled/Fill/{Default,Hover}` | Yes |
| Select | Outlined border default/hover | `components/input/outlined/{enabledBorder,hoverBorder}` | `Components/Input/Outlined/Border/{Default,Hover}` | Yes |
| MenuItem | Label text | `text/primary` | `Semantic/Text/Primary` | No |
| MenuItem | Disabled label text | `text/disabled` | `Semantic/Text/Disabled` | No |
| MenuItem | Nested Typography caption | `text/secondary` | `Semantic/Text/Secondary` | No |
| MenuItem | Hovered row fill | `action/hover` | `Components/MenuItem/Hover/BG` | Yes |
| MenuItem | Selected row fill | `primary/hover` | `Components/MenuItem/Selected/BG` | Yes |

## 5. Figma structure built

`Select - Component Gallery` (`1744:1547`) and `Select - Documentation` (`1745:1542`) — the only two top-level frames left on the page, confirmed by direct read after archiving.

**Gallery:** Top Header cloned from Link's verified reference (em dash form), Gallery Header, and a Master Container holding the **real, reparented** `<Select>` `COMPONENT_SET` (not a rebuild from instances) — 4 real column groupings (`Medium`/`Small` × `Closed`/`Open`) and 10 real row-group labels (`State` × `Has Value`, computed from the set's own child coordinates, not fabricated) plus 2 labels for the smaller Open-state column groups. Reparenting confirmed non-destructive: the real-world mockup's own `<Select>` instance and all 8 of Autocomplete's resolved correctly before and after.

**Documentation:** full section backbone — Intro Block (badges: Components / Migrated ✓ / MUI Docs ↗), Visual Variants (6 representative instances), Sizing (Medium/Small), Interactive States (5 states), Anatomy & Token Architecture, Usage Guidelines & Accessibility, Key Props (8 rows), Real-World Use Case (the pre-existing `▶️ Select: menu interaction` mockup folded in as its own section), Specs & Accessibility Notes (final). One self-caught visual bug fixed before calling it done: the Visual Variants "Focused, Open" sample's own overflowing dropdown content visually collided with its caption in this small-preview context (the Gallery frame already documents the Open state at full size) — swapped for a closed Focused sample instead.

**Legacy cleanup**, duplicate-as-safety-net procedure: the original top-level `Select` frame was cloned in place first; the **real** master was then reparented out of the **original** (preserving every existing instance's node-ID resolution, confirmed after); the now-emptied original (`_Library`/`Grid` scaffolding + the legacy 124-cell hand-built `Instances` grid + its `Labels` annotation frame), the original standalone real-world mockup frame (now cloned into Documentation), and the pre-reparent safety-net duplicate were all moved and locked on the `🗄️ _Archive / Deprecated Docs` page (renamed `_Archive / Select / 2026-08-12`, three separate frames) rather than deleted.

## 6. Web side

No prior web presence at all: zero `<Select` usage (grep-confirmed, the only match was a code comment), zero `MuiSelect`/`MuiMenuItem` `brandTheme.ts` entries, zero `Select.figma.tsx`/`MenuItem.figma.tsx` Code Connect files.

Checked directly against `node_modules/@mui/material` v7.3.9 before writing anything, same discipline as every prior component:

- **`OutlinedInput.js`/`FilledInput.js`/`Input.js`:** 4 of the 6 new `Components/Input/*` values are byte-exact stock MUI defaults (`rgba(0,0,0,0.23)` outlined-default, `rgba(0,0,0,0.06)`/`0.09` filled default/hover, `rgba(0,0,0,0.42)` standard-default). The remaining 2 hover-border values differ only between Figma's literal `#000000` and this theme's `text.primary` (`#212121`, what MUI's stock hover actually references) — an imperceptible delta, no override added.
- **`palette.primary.main`/`palette.error.main`:** already `colors.edgeTurquoise[500]`/`colors.red[700]`, exact matches to `Brand/Primary/500`/`Semantic/Status/Error/Main` — MUI's stock focused-label/border and error-label/border styling (which reference these palette roles directly) already render correctly with zero override.
- **`SelectInput.js`/`NativeSelectInput.js`:** stock dropdown-icon color is `theme.palette.action.active`/`.disabled` — but this theme's own `action.active`/`.disabled` are customized (teal / opaque grey) for other components' sake, not Figma's translucent-black icon values. Real, verified delta — added a scoped `MuiSelect.styleOverrides.icon` override (`Semantic/Icon/Default` default, `Components/Select/Icon/Disabled` via `.MuiSelect-disabled`).
- **`MenuItem.js`:** stock hover/selected key off `action.hover`/`alpha(primary.main, action.selectedOpacity)`, both teal-tinted in this theme, not Figma's approved black-4%/teal-300-at-4% values (a different shade+opacity than List's own `Components/List/ListItem/Selected`, correctly kept distinct). Added a scoped `MuiMenuItem.styleOverrides.root` override, same scoping rationale `MuiListItem` already established (don't leak a component-specific value into the shared global `action.hover`/`.selected` other components depend on). Base label text color already matches (`text.primary` === `Semantic/Text/Primary`); disabled state's opacity-based dimming was judged close enough to Figma's discrete `Semantic/Text/Disabled` swap not to need forcing.

**Regression check on MenuItem's one real usage** (ButtonGroup's `SplitButtonDemo`, `src/app/styleguide/components/button-group/page.tsx`): it does set `selected` on the active save-option `MenuItem`. Confirmed this override visibly changes that dropdown's hover/selected tint (previously the default teal-500-at-8%/`action.hover`, now the Figma-approved black-4%/teal-300-at-4%) — a deliberate, disclosed visual change tied to the token migration, not a functional regression.

`tsc --noEmit` clean after the `brandTheme.ts` edit. No styleguide page built, per the ongoing Storybook pause. No Code Connect file created for either component (out of scope, matches the deferred-Icon.figma.tsx precedent).

## 7. Flagged, not fixed (design-owned or explicitly deferred)

- **8 missing `<MenuItem>` variants** (`Small Screen=True, Dense=True`, all 4 states, both `Dis. Gutters` values) — real Figma gap, not built.
- **Orphaned `<ListSubheader>` in Autocomplete's Documentation frame** (§2) — pre-existing Autocomplete bug, surfaced by this pass, not this component's responsibility to fix.
- **`Menu` page has no Two-Frame Architecture build of its own** — only `<MenuItem>`'s own master tokens were rebound in place, per explicit scope boundary; the page's Gallery/Documentation pass (and its other content — 2 more Select/Autocomplete-interaction mockups, a live `<Menu>` instance, a `_Custom Components` section) remains fully out of scope, same precedent as Rating leaving Icons' own page structure untouched while still rebinding the specific icon masters it needed.
- **Select's "Open" variants render a hand-illustrated static dropdown** ("Menu Item" placeholder rows), not real nested `<MenuItem>` instances — observed during Gallery-frame screenshot verification. Not a defect (this master was never meant to render a live popped-open menu), just a factual note for anyone expecting to find live MenuItem instances inside Select's own master tree.
- **Three archived frames on `_Archive / Deprecated Docs`**, not one — the legacy `_Library`/Grid scaffolding, the original (now-duplicated-into-Documentation) real-world mockup, and the pre-reparent safety-net backup. Kept all three per "archive, don't delete" rather than deleting the now-redundant safety-net copy once the reparent was confirmed safe.
