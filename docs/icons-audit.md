# EDGE-DS — Icons Component — Step 1 Discovery Report

**Figma file:** `EDGE Design System - New`, fileKey `fLQNXhHQhKBZzWnJGtUcwn`
**Page:** `     Icons 🆗` (canvas `6594:47638`)
**Frames:** `Icons - Component Gallery` (`1485:85361`), `Icons - Documentation` (`1491:85067`)
**Status:** Read-only discovery only. Nothing in Figma or code was created, modified, or renamed during this pass. All findings below are re-derived live from the node structure, not estimated from a screenshot.

**Headline correction vs. the brief's rough pass:** the ~87/15/1/22/5 counts in the brief were exactly right. Everything else below — the architecture, the naming consistency, the fill-binding mechanism, and the Brand-token precedent — differs from what a naming-convention-only read would suggest, in ways that matter for scoping Step 2.

---

## A. Current component architecture

### A1 — Standalone components, not a shared variant set

Every individual icon (`WorkFilled`, `WarningAmberOutlined`, `StarSharp`, `FilePDF`, etc.) is its **own standalone `COMPONENT` node**, a direct sibling of other icons inside a plain `Swatch` frame — confirmed directly via `node.type` on 12 sampled nodes spanning all four families (`WorkFilled`, `WifiFilled`, `WarningAmberOutlined`, `ErrorOutline`, `StarSharp`, `FileXHTML`, `Excel`, plus 6 more in a second pass). None of them has a `COMPONENT_SET` parent, and none carries any `componentPropertyDefinitions` of its own (`{}` on every sample). "Icon Family - Filled / Outlined / Sharp" and "Custom / EDGE Icons" are **documentation-page groupings only** — plain frames with a text label and a rule, not real Figma variant groups. There is no `Style` variant property anywhere in the file for icons.

### A2 — The one real variant property lives on a separate wrapper component, not on the icons themselves

There is a genuine `COMPONENT_SET` in the "MASTER COMPONENT SET - `<ICON>`" section: **`<Icon>`** (`6594:47648`), with two component properties:

| Property | Type | Values |
|---|---|---|
| `Size` | VARIANT | `Medium`, `Large`, `Small`, `Inherit` (24px/32px/20px/16px respectively) |
| `Icon Instance` | INSTANCE_SWAP | default → `7475:49603` (`StarSharp`); `preferredValues: []` |

This `<Icon>` wrapper is a **generic slot**: it swaps in any of the standalone icon components above via instance-swap and sizes them via the `Size` variant. It's genuinely used in the Documentation frame's "In Context" card (two of five example swatches go through `<Icon>` at `Size=Large`/`Size=Small`). But the same card's other three examples (`HomeFilled`, `WarningAmberOutlined`, `Excel`) are used as **direct instances of the standalone icon components**, bypassing the wrapper entirely — so both consumption patterns are live in the file today, not just one. This matters for Section C below.

No `Color` or `State` property exists on `<Icon>` or on any individual icon component today.

### A3 — Naming convention: consistent in 3 of 4 groups, broken in the 4th

- **Filled (87/87):** 100% consistent `<Name>Filled`, no separators, no exceptions — including compound names like `StarOutlineFilled`, `PlayCircleOutlineFilled`, `MailOutlineFilled` (these embed "Outline" *inside* the Filled name; see B6).
- **Outlined (14/15 consistent):** `<Name>Outlined`, with exactly **one exception**: `ErrorOutline` is missing the trailing "d" that every other Outlined icon has. This isn't cosmetic — it's the one case that actually blocks clean base-name matching (see B6).
- **Sharp (1/1):** `StarSharp` — matches the `<Name>Sharp` pattern, but n=1 so this isn't really a *confirmed* convention, just an unfalsified one.
- **Custom / EDGE (badly inconsistent):** at least 5 distinct naming styles coexist with no shared rule:
  - PascalCase, no separator: `FileXHTML`, `FilePDF`, `FilePPT`, `Excel`, `CSV`, `UserSettings`, `ResetPassword`, `CleanInputs`, `Convert`, `Restart`
  - Title Case, single word: `Help`, `Save`, `Upload`
  - snake_case: `Thumb_down`, `Thumb_up`
  - `"Name - EDGE"` (spaced hyphen): `Up - EDGE`, `Equal - EDGE`, `Down - EDGE`
  - `"Name-EDGE"` (no space before hyphen) / multi-word with embedded hyphen: `Not Applicable-EDGE`, `Filter Dropdown - World Icon`
  - Plain sentence-case phrases: `Submit report`, `Verified Badge`
  
  **This is the group that will block a mechanical "give it a matching base name" pass** — it needs a real renaming decision before parity work, not just an addition of a suffix.

### A4 — The 5 Utility/Non-Production icons: excluded by convention only, not by any structural mechanism

All 5 are literally named `_hidden` at the component-layer level (identical name across all 5 — a latent collision risk if any is ever promoted), distinguished only by their documentation label text (`_hidden-1 (placeholder)` … `_hidden-5 (placeholder)`) and by living inside a frame explicitly labeled `"UTILITY / NON-PRODUCTION (5, excluded from consumer use)"`.

Checked directly: **`node.visible` is `true` on all 5** — they are not Figma-hidden layers. There is no component property, no hidden-layer status, and no publish-scope restriction enforcing the exclusion. The boundary is pure documentation convention (an underscore prefix + a labeled section) — nothing stops a consumer from finding and inserting `_hidden-3 (placeholder)` from the assets/insert panel today. Worth flagging as a real, currently-unenforced risk, independent of the Filled/Outlined/Brand work.

---

## B. Filled/Outlined parity gap — exact enumeration

### B5 — Complete literal lists

**Filled (87):** WorkFilled, WifiFilled, WarningFilled, ViewModuleFilled, ViewHeadlineFilled, UploadFileFilled, StarOutlineFilled, StarHalfFilled, StarBorderFilled, SpaceDashboardFilled, SkipPreviousFilled, SkipNextFilled, ShoppingCartFilled, SettingsFilled, SendFilled, SearchFilled, RemoveRedEyeFilled, ReceiptFilled, QueryBuilderFilled, PlayCircleOutlineFilled, PlayArrowFilled, PhotoFilled, PhoneIphoneFilled, PersonFilled, PersonAddFilled, PeopleFilled, OpeninNewFilled, NotificationsFilled, MoreVertFilled, MoreHorizFilled, MonitorFilled, MenuFilled, MailOutlineFilled, MailFilled, LogoutFilled, LockFilled, LocationOnFilled, LayersFilled, InfoFilled, InboxFilled, HomeFilled, FormatAlignLeftFilled, FolderFilled, FilterListFilled, FileDownloadFilled, FavoriteFilled, ExpandMoreFilled, ExpandLessFilled, ErrorFilled, EditFilled, DraftsFilled, DownloadFilled, DeleteFilled, FilterAltFilled, RemoveFilled, DragIndicatorFilled, DateRangeFilled, CreditCardFilled, ContentCutFilled, ContentCopyFilled, CollectionsFilled, CloudFilled, CloseFilled, ChevronRightFilled, ChevronLeftFilled, CheckFilled, CheckCircleFilled, CancelFilled, CalendarTodayFilled, CachedFilled, BluetoothFilled, BeachAccessFilled, ArrowUpwardFilled, ArrowForwardFilled, ArrowDropUpFilled, ArrowDropDownFilled, ArrowDownwardFilled, ArrowBackFilled, ApartmentFilled, AddFilled, AccountCircleFilled, AccessTimeFilled, SaveAltFilled, ViewColumnFilled, TableRowsFilled, ViewStreamFilled, FeedbackFilled

**Outlined (15):** WarningAmberOutlined, SpaceDashboardOutlined, PhotoOutlined, InfoOutlined, ErrorOutline *(naming exception — see B6)*, TitleOutlined, ContentPasteOutlined, CheckCircleOutlined, UnfoldMoreOutlined, SwapHorizOutlined, EyeOffOutlined, GlobeOutlined, RotateCcwOutlined, FileSpreadsheetOutlined, FileOutputOutlined

**Sharp (1):** StarSharp

### B6 — The diff, by exact name

**Clean Filled+Outlined pairs that already exist (4):** `SpaceDashboard`, `Photo`, `Info`, `CheckCircle` — these already share a base name across both families and need no renaming, only the missing sibling built for every *other* icon.

**One conceptual pair blocked by a naming defect (1):** `ErrorFilled` / `ErrorOutline` — these are clearly meant to be the same icon's two styles, but `ErrorOutline` is missing the trailing "d" every other Outlined icon has (it should be `ErrorOutlined`). This is exactly the kind of "subtle spelling difference" the brief asked about, and it's real — this one needs a rename before it can be treated as a clean pair.

**Filled with no Outlined counterpart (82 of 87):** every Filled icon *except* the 4 clean pairs and `ErrorFilled` — i.e., the overwhelming majority, confirming the brief's expectation. Exact count: 87 − 4 − 1 = **82**.

**Outlined with no Filled counterpart (10 of 15):** `WarningAmberOutlined`, `TitleOutlined`, `ContentPasteOutlined`, `UnfoldMoreOutlined`, `SwapHorizOutlined`, `EyeOffOutlined`, `GlobeOutlined`, `RotateCcwOutlined`, `FileSpreadsheetOutlined`, `FileOutputOutlined`. Note `WarningAmberOutlined` is *not* the same icon as `WarningFilled` — "Warning" and "WarningAmber" are different base concepts in MUI's own icon set, so this isn't a near-miss like Error, it's a genuinely separate icon with no Filled sibling at all.

Several of these Outlined-only icons aren't standard MUI names to begin with (`EyeOff`, `Globe`, `RotateCcw`, `FileSpreadsheet`, `FileOutput`) — MUI's own equivalents would be `VisibilityOff`, `Public`/`Language`, `Replay`/`RotateLeft`, etc. Worth a decision in Step 2 on whether parity work targets these EDGE-custom names as-is or reconciles them to MUI's naming first.

### B7 — StarSharp: a genuine one-off, not a hidden pair

No `StarFilled` and no `StarOutlined` exist anywhere in the file. The Filled family does have `StarOutlineFilled`, `StarHalfFilled`, and `StarBorderFilled` — but these are three *different* rating-icon states (used for `<Rating>`'s half/full/empty star), not a "Star" base icon with Filled/Outlined siblings, so they don't resolve the gap. `StarSharp` currently has zero relationship to any of them beyond sharing the word "Star." Left for Igor/Step 2 to decide whether Sharp becomes a third parallel style family, gets folded into Outlined, or stays a legacy one-off — no structural blocker either way, since it's already a fully standalone component like everything else.

### B8 — Custom/EDGE icons: per-icon read on filled/outlined fit

| Icon | Filled/Outlined duality? | Notes |
|---|---|---|
| FileXHTML, FilePDF, FilePPT, Excel, CSV, FileSpreadsheet* | No | Multi-color compound glyphs (confirmed: `FilePDF`'s vector is raw red `#B71C1C`-ish, `FilePPT`'s is raw orange — see C12). A "filled vs. outlined" treatment doesn't map onto a file-type badge. |
| Help, Save | Arguably | Simple single-path glyphs; MUI ships `HelpOutline`/`Help` and `Save`/`SaveOutlined` pairs, so a real duality exists conceptually, it's just not built here. |
| Upload | No (different concept) | Distinct from `UploadFileFilled` already in the Filled family — a generic arrow-up glyph vs. an upload-a-file icon. |
| Thumb_down, Thumb_up | **Yes — real gap** | MUI ships `ThumbUp`/`ThumbUpOutlined` and `ThumbDown`/`ThumbDownOutlined` as standard pairs. These living in Custom rather than Filled/Outlined looks like a legacy pre-migration addition; they're strong candidates to actually move into the Filled/Outlined parity work rather than staying "custom." |
| Up - EDGE, Equal - EDGE, Down - EDGE, Not Applicable-EDGE | No | Single-purpose directional/comparison marks, genuinely single-weight by design. |
| Filter Dropdown - World Icon, Submit report, Convert, Restart, Verified Badge, UserSettings, ResetPassword, CleanInputs | No | Single-purpose compound or badge-style glyphs; no natural filled/outlined split. |

So the group is **not uniformly out of scope** — most are, but `Thumb_up`/`Thumb_down` (and arguably `Help`/`Save`) are real candidates the parity project should probably absorb rather than silently exclude the whole bucket.

---

## C. Brand variant feasibility

### C9 — `Brand/Primary/500`: full alias chain resolved

```
Brand/Primary/500  (EDGE palette collection, Mode 1)
  → alias → EDGE-Turquoise/500  (Colors collection, Mode 1)
    → literal RGBA(0, 159, 155, 255)  →  #009F9B
```
(raw values: r=0, g=0.6235294342041016, b=0.6078431606292725, a=1)

### C10 — Corrected precedent: the brief's assumption about Toggle Button doesn't hold as stated

The brief expected `Brand/Primary/500` to be already bound on Toggle Button's icon. Checked directly — it is **not**:

- `Components/ToggleButton/Icon/Selected` resolves to a **literal, non-aliased** value: `rgba(0,0,0,0.87)` — plain 87%-black, nothing to do with brand color.
- `Components/ToggleButton/BG/Selected` (the one the migration doc calls "brand-tinted") also resolves to a **literal, non-aliased** value: `rgba(7, 190, 190, 0.08)` — a hand-picked teal-ish color at 8% alpha that visually approximates the brand hue but is **not an alias to `Brand/Primary/500`** or to any other variable.

**There is currently no case anywhere checked in this file of a component variable being bound as a direct alias to `Brand/Primary/500`.** The existing "precedent" is softer than assumed: components that want a brand-flavored accent so far get there by hand-picking a literal color that looks similar, not by aliasing the real token. This is worth surfacing to Igor directly — Step 2's Brand variant would be the *first* real alias-to-`Brand/Primary/500` binding in the file, not a continuation of an existing pattern.

### C11 — How icon fill color is controlled today: raw and unbound, on the nested vector, not the component root

Sampled 15 icons across Filled, Outlined, Sharp, and Custom (via full fill-tree walks, not just top-level checks):

- Every **Filled/Outlined/Sharp** icon checked (`WorkFilled`, `WarningFilled`, `SearchFilled`, `ChevronRightFilled`, `AddFilled`, `SpaceDashboardOutlined`, `UnfoldMoreOutlined`, `StarSharp`) has an **empty `fills` array at the component root**; the actual visible color lives on a single nested `VECTOR` child named "Vetor" (sic — a recurring typo, same one already caught and fixed on Toggle Button per the migration log), and that vector's fill is **raw, hardcoded black `{r:0,g:0,b:0}`, `boundVariable: null`** in 100% of samples. Nothing is bound to any token anywhere in these families today.
- **Custom/EDGE** icons are more varied: some single-color ones follow the same raw-black pattern (`VerifiedBadge`, the vector inside `Thumb_up`). Multi-color ones (`FilePDF`, `FilePPT`, `Up - EDGE`) have **multiple raw hardcoded fills** across several nested vector/boolean-op layers (e.g., `FilePDF`'s body is raw `#B71C1C`-ish red).
- A handful of components (`FileXHTML`, `Excel`, `UnfoldMoreOutlined`, `FilePDF`, `FilePPT`) *do* have one bound fill — but it's on the component's own root/bounding-box shape, bound to **`Semantic/Surface/Paper`** (a white background/hit-area token), unrelated to the visible glyph color.
- One real binding mechanism *does* exist in the file already, just not on the masters: inside Toggle Button, the icon vector gets a **per-instance fill override** bound to `Components/ToggleButton/Icon/Selected` (confirmed via `boundVariables` on the live instance nodes, e.g. `I6601:50979;7475:62359`). So instance-level override-and-bind is a proven mechanism — it's just applied ad hoc per consuming component today, not centrally on the icon masters or the `<Icon>` wrapper.

### C12 — What would make a clean `Brand` variant awkward

1. **No fill is bound anywhere on the 103 Filled/Outlined/Sharp masters.** Adding a `Color=Default/Brand` variant that actually *works* means picking one of two structurally different paths: (a) bind every master's own vector fill to a new `Components/Icon/Default` token first (a real prerequisite migration, ~103 raw-black bindings to convert, unless done opportunistically), or (b) add the `Color` property only to the `<Icon>` wrapper (`6594:47648`) and drive it via instance-level fill overrides on the swapped-in icon — reusing the exact mechanism Toggle Button already uses. Path (b) is architecturally cheaper but only covers consumers who go through `<Icon>` — and as noted in A2, direct-instance consumption (bypassing the wrapper) is also live in the file today, so path (b) alone wouldn't give every icon usage a Brand option.
2. **Custom/EDGE multi-color icons don't have a single fill to recolor.** `FilePDF`, `FilePPT`, `Up - EDGE`, etc. have 2–3 independently-colored raw vector layers; forcing all of them to one flat Brand color would visually break their meaning (a red PDF badge turned solid teal stops reading as "PDF"). These should very likely be excluded from the Brand variant regardless of what Step 2 decides for Filled/Outlined/Sharp.
3. **The recurring "Vetor" typo** on the single-vector icons is cosmetic, not structural, but worth a mention since any bulk scripted pass touching these layers will want to know the child isn't consistently named "Vector."

---

## D. Tracking reconciliation

**Confirmed: Icons has no entry in `docs/EDGE-DS-Migration-Status.md`, under any name.** Checked the full Status table plus all prose sections — "icon" only appears in passing inside other components' own audit notes (e.g., `ChevronLeftFilled` instances inside Stepper's Tranche 4 writeup, `Components/ToggleButton/Icon/Selected`/`Icon/Disabled` tokens inside Toggle Button's detail section). None of these constitute Icons being tracked as its own component — it is genuinely untracked, not aliased or partially covered elsewhere. It should get its own row once Step 2 scopes real work.

Worth noting for that future row: unlike every other component in the tracked list, Icons has **zero token migration applied yet in any direction** — there's no `MUI palette`-era binding to retire here, because there was never a binding at all. This is a "bind for the first time" project, not a "retokenize an existing binding" project like the rest of the tracked list.

---

## Additional risks and inconsistencies noticed, not covered by the numbered questions

- **The `<Icon>` wrapper's `Icon Instance` property has an empty `preferredValues: []`.** With 87+15+1+22 = 125 real candidate icons and zero curation, anyone inserting a fresh `<Icon>` instance and opening the swap picker gets an unfiltered, unsorted list that includes the 5 `_hidden` placeholders (see A4) with nothing to distinguish them as excluded. This is the same enforcement gap as A4, surfaced a second way — via the wrapper's own picker, not just the assets panel.
- **`Icon Instance`'s default value is `StarSharp`** — the file's only Sharp-family icon is also the default example shown for the *entire* wrapper component. If Step 2 folds Sharp into Outlined or deprecates it, this default will need to be repointed to something that will keep existing after the change.
- **The Documentation frame's own "In Context Card"** mixes both consumption patterns (wrapped via `<Icon>` and direct instance) in one card without labeling which is which — worth a documentation-content fix in whatever pass eventually rebuilds this page, independent of the Filled/Outlined/Brand work itself.
- **All fill colors — including the "neutral default" black — are raw**, not just the ones that would need to become Brand-colored. So even without the Brand variant, there is a pre-existing zero-hardcode-doc-chrome-style gap sitting on every single icon glyph in the system: 100% of the ~103 Filled/Outlined/Sharp icons and most Custom/EDGE icons have never been bound to a token at all, on the component masters. Flagging this since it's the kind of systemic gap the migration-status doc already tracks for other components (see its "Known systemic gaps" section) and Icons should probably be added there regardless of what Step 2 decides about Brand specifically.
