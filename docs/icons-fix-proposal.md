# EDGE-DS — Icons Component — Step 2 Proposal

**Status:** Proposal only. Nothing in this document has been built, renamed, rebound, or created in Figma or code. Everything below is a fully-specified plan for Step 3 to execute — where a name/token is "proposed," treat it as the literal target string; where something is marked **OPEN**, it is deliberately left for Igor's sign-off, not decided here.

**Source of truth for names/counts:** `docs/icons-audit.md` (Step 1, live-verified 2026-09-02).

**A note on source-icon existence:** for the ~92 new Filled/Outlined components proposed below, I've mapped each to its expected Material Symbols/`@mui/icons-material` source name from direct knowledge of that icon family's real naming conventions, and flagged every case where I have specific reason to doubt a clean 1:1 mapping (typos, MUI's own double-naming quirks, icons with no real Outlined/Filled counterpart at all). For the majority I have **not** individually confirmed each one exists in the current `@mui/icons-material` package version via a live fetch — Material Design's classic icon set covers nearly all common UI glyphs in every style, so the default assumption (source exists, same base name + style suffix) is reasonable, but I'd recommend Step 3 do a quick per-icon existence spot-check against `fonts.google.com/icons` or the installed package before drawing, rather than treating this table as guaranteed-available. Every icon I have a *specific* doubt about is called out individually below, not silently assumed.

---

## A. Filled/Outlined parity — full build list

### A1. The 82 Filled-only icons → build the missing `<Name>Outlined`

Default action for all rows below is **build `<Base>Outlined`**, source = same name + `Outlined` suffix, unless the Notes column says otherwise.

| Base name | Target component | Source (if different) | Notes |
|---|---|---|---|
| Work | WorkOutlined | — | |
| Wifi | WifiOutlined | — | |
| Warning | WarningOutlined | — | Distinct from `WarningAmber` (already has its own Outlined in the file) — no name clash. |
| ViewModule | ViewModuleOutlined | — | |
| ViewHeadline | ViewHeadlineOutlined | — | |
| UploadFile | UploadFileOutlined | — | |
| **StarOutline** | StarOutlineOutlined | — | **Flag:** base name already contains "Outline" as part of its identity (a distinct MUI icon, not a style marker) — the real Outlined sibling would be literally "StarOutlineOutlined." Recommend visually confirming this isn't near-identical to the Filled version before drawing; also Rating-specific (see StarHalf/StarBorder below) — recommend treating the whole Star-rating trio as a bundled decision, not built reflexively with the rest. |
| **StarHalf** | StarHalfOutlined | — | Rating-icon state, not general UI. Recommend deferring with StarOutline/StarBorder pending Igor's call on whether Rating's icon states need Outlined coverage at all. |
| **StarBorder** | StarBorderOutlined | — | Same Rating-family flag as above; `StarBorder` is already a hollow-star silhouette, so its "Outlined" sibling risks being visually redundant. |
| SkipPrevious | SkipPreviousOutlined | — | |
| SkipNext | SkipNextOutlined | — | |
| ShoppingCart | ShoppingCartOutlined | — | |
| Settings | SettingsOutlined | — | |
| Send | SendOutlined | — | |
| Search | SearchOutlined | — | |
| RemoveRedEye | RemoveRedEyeOutlined | — | Distinct concept from `EyeOffOutlined` already in the file — no clash. |
| Receipt | ReceiptOutlined | — | |
| QueryBuilder | QueryBuilderOutlined | — | |
| **PlayCircleOutline** | PlayCircleOutlineOutlined | — | Same "base name already contains Outline" flag as StarOutline — confirm visually before drawing. |
| PlayArrow | PlayArrowOutlined | — | |
| PhoneIphone | PhoneIphoneOutlined | — | |
| **Person** | PersonOutlined | — | MUI also ships a separately-named `PersonOutline` icon, visually near-identical to `PersonOutlined` in current Material Design — use `PersonOutlined` for suffix-convention consistency with the rest of this table, not the differently-named duplicate. |
| PersonAdd | PersonAddOutlined | — | |
| **People** | PeopleOutlined | — | Same duplicate-icon note as Person (`PeopleOutline` also exists as a separate name) — use `PeopleOutlined`. |
| **OpeninNew** | OpenInNewOutlined | — | **Flag, separate from this project's authorized scope:** the existing Filled name has a pre-existing capitalization typo (`Openin` should be `OpenIn`). The new Outlined component is named correctly here; the old Filled sibling's typo is a real, additional finding not yet authorized for a fix — flagging for a future decision, not touching it in this pass. |
| Notifications | NotificationsOutlined | — | |
| MoreVert | MoreVertOutlined | — | Visually subtle (dots) but a real distinct icon exists. |
| MoreHoriz | MoreHorizOutlined | — | Same subtle-visual-difference note. |
| Monitor | MonitorOutlined | — | |
| Menu | MenuOutlined | — | |
| **MailOutline** | MailOutlineOutlined | — | Same "base name already contains Outline" flag — `MailOutline` (open envelope) is a distinct MUI icon from `Mail` (closed envelope), both already correctly separate in this file's Filled family. Confirm visually before drawing. |
| Mail | MailOutlined | — | |
| Logout | LogoutOutlined | — | |
| Lock | LockOutlined | — | |
| LocationOn | LocationOnOutlined | — | |
| Layers | LayersOutlined | — | |
| Inbox | InboxOutlined | — | |
| Home | HomeOutlined | — | |
| FormatAlignLeft | FormatAlignLeftOutlined | — | |
| Folder | FolderOutlined | — | |
| FilterList | FilterListOutlined | — | |
| FileDownload | FileDownloadOutlined | — | |
| Favorite | FavoriteOutlined | — | |
| ExpandMore | ExpandMoreOutlined | — | |
| ExpandLess | ExpandLessOutlined | — | |
| Edit | EditOutlined | — | |
| Drafts | DraftsOutlined | — | |
| Download | DownloadOutlined | — | |
| Delete | DeleteOutlined | — | |
| FilterAlt | FilterAltOutlined | — | |
| Remove | RemoveOutlined | — | |
| **DragIndicator** | DragIndicatorOutlined | — | **Flag, lower confidence:** this is a dots-grid glyph; unsure a meaningfully distinct Outlined style exists in the source set. Recommend a quick existence check before drawing. |
| DateRange | DateRangeOutlined | — | |
| CreditCard | CreditCardOutlined | — | |
| ContentCut | ContentCutOutlined | — | |
| ContentCopy | ContentCopyOutlined | — | |
| Collections | CollectionsOutlined | — | |
| Cloud | CloudOutlined | — | |
| Close | CloseOutlined | — | |
| ChevronRight | ChevronRightOutlined | — | |
| ChevronLeft | ChevronLeftOutlined | — | |
| Check | CheckOutlined | — | |
| Cancel | CancelOutlined | — | |
| CalendarToday | CalendarTodayOutlined | — | |
| Cached | CachedOutlined | — | |
| Bluetooth | BluetoothOutlined | — | |
| BeachAccess | BeachAccessOutlined | — | |
| ArrowUpward | ArrowUpwardOutlined | — | |
| ArrowForward | ArrowForwardOutlined | — | |
| **ArrowDropUp** | ArrowDropUpOutlined | — | Small solid-triangle caret; flag as possibly visually near-identical to Filled. Low priority, build for completeness. |
| **ArrowDropDown** | ArrowDropDownOutlined | — | Same caret-glyph note as ArrowDropUp. |
| ArrowDownward | ArrowDownwardOutlined | — | |
| ArrowBack | ArrowBackOutlined | — | |
| Apartment | ApartmentOutlined | — | |
| Add | AddOutlined | — | |
| AccountCircle | AccountCircleOutlined | — | |
| **AccessTime** | AccessTimeOutlined | — | **Flag:** `AccessTimeFilled` (solid clock) and plain `AccessTime` (already an outline-style clock in Material Design) are two genuinely different existing MUI icons — the "true" outline counterpart to the *solid* clock may visually duplicate plain `AccessTime` rather than being a distinct third glyph. Recommend visual comparison before drawing to avoid a redundant asset. |
| SaveAlt | SaveAltOutlined | — | |
| ViewColumn | ViewColumnOutlined | — | |
| TableRows | TableRowsOutlined | — | |
| ViewStream | ViewStreamOutlined | — | |
| Feedback | FeedbackOutlined | — | |

**Count check:** 87 Filled − 4 clean pairs (SpaceDashboard, Photo, Info, CheckCircle) − 1 rename-only (Error) = **82 rows above.** ✓

### A2. The 10 Outlined-only icons → build the missing `<Name>Filled`

| Base name | Target component | Source (if different) | Notes |
|---|---|---|---|
| WarningAmber | WarningAmberFilled | — | Straightforward, real MUI icon exists. |
| Title | TitleFilled | — | |
| ContentPaste | ContentPasteFilled | — | |
| UnfoldMore | UnfoldMoreFilled | — | |
| SwapHoriz | SwapHorizFilled | — | |
| **EyeOff** | EyeOffFilled *(as-is)* or **VisibilityOffFilled** *(renamed)* | `VisibilityOff` if renamed | **OPEN — Igor's call, per your prompt.** `EyeOff` isn't a real Material Symbols name; MUI's actual icon is `VisibilityOff`. Recommendation: rename to `VisibilityOff`/`VisibilityOffOutlined` (rename the existing Outlined too) so the new Filled sibling can be sourced from a real MUI asset — matches Decision #1's intent (source real artwork, don't hand-draw). Keeping the `EyeOff` name would mean either hand-drawing a non-standard "EyeOffFilled" (contradicts Decision #1) or aliasing `VisibilityOff`'s real artwork under the EDGE-custom name. **Recommend renaming.** |
| **Globe** | GlobeFilled *(as-is)* or **PublicFilled** *(renamed)* | `Public` if renamed | **OPEN.** MUI's real equivalent of a plain globe glyph is `Public` (note: `Language` in MUI is a different glyph — a stylized "文A" character icon, not a globe — so `Public` is the correct visual match, not `Language`). **Recommend renaming to `Public`/`PublicOutlined`.** |
| **RotateCcw** | RotateCcwFilled *(as-is)* or renamed | `Replay` or `RotateLeft` if renamed | **OPEN, lower confidence than the two above.** MUI has two plausible matches depending on the existing artwork's exact silhouette — `Replay` (a full circular arrow, refresh/undo style) or `RotateLeft` (a bracket-and-arrow icon used for image/object rotation controls). I don't have a visual confirmation of which one `RotateCcwOutlined`'s actual glyph resembles from this pass. **Recommend a quick screenshot comparison in Step 3 before committing to either rename**, defaulting to keeping the EDGE name if neither matches cleanly. |
| **FileSpreadsheet** | FileSpreadsheetFilled *(as-is)* | — | **Flag:** no standard Material Symbols icon is named `FileSpreadsheet` — this looks like an EDGE-custom concept (spreadsheet file badge), closer in spirit to the Custom/EDGE bucket's `Excel` icon than to a real Material Symbols glyph. Recommend building the Filled sibling as a derived/hand-authored asset matching this file's existing Custom/EDGE file-badge style (e.g. `FilePDF`/`FilePPT`'s treatment) rather than sourcing from Material Symbols, since Decision #1's "source the official icon" instruction doesn't have a real target here. **This is an exception to Decision #1 worth Igor confirming**, not a silent default. |
| **FileOutput** | FileOutputFilled *(as-is)* | — | Same flag as FileSpreadsheet — no real Material Symbols icon by this name. Likely candidates for the underlying concept (`IosShare`, `FileUpload`, `Output`) don't match the "file with an output arrow" naming closely enough to assume a silent 1:1 swap. Recommend the same hand-authored/derived treatment as FileSpreadsheet, flagged for confirmation. |

### A3. The one naming defect — rename only, no new artwork

**`ErrorOutline` → `ErrorOutlined`.** This alone completes the `Error`/`ErrorOutlined` pair (matches existing `ErrorFilled`). No new component needed — just the rename.

### A4. `StarSharp` — options laid out, not decided (OPEN)

Per the report's §B7 finding: no `StarFilled`/`StarOutlined` exists anywhere, and the three Star-family icons that do exist (`StarOutlineFilled`, `StarHalfFilled`, `StarBorderFilled`) are Rating-specific *states*, not a plain base "Star" icon — none of them are a real sibling to `StarSharp`.

Options:
1. **Leave as a standalone legacy one-off** (lowest effort, no structural change; matches its current de facto status).
2. **Fold into the Outlined family** — but there is nothing to fold *into*, since no `StarOutlined` (the plain base-star concept) currently exists. This would really mean building a brand-new `StarFilled`/`StarOutlined` pair from scratch and then deciding whether `StarSharp` becomes a third sibling of that pair or is retired in favor of it.
3. **Treat Sharp as a genuine third parallel style family going forward** — but with a population of exactly one icon today, this only makes sense if there's a real intended future pipeline of Sharp-style icons; nothing in the file suggests that currently.

**My recommendation: Option 1** (leave as-is) unless Igor specifically wants a plain "Star" concept added to the Filled/Outlined system, in which case that should be scoped as its own small addition rather than retrofitted onto `StarSharp`. **Flagged OPEN per your instruction — not decided here.**

### A5. `Thumb_up` / `Thumb_down` — move out of Custom/EDGE, rename + rebuild

| Current | New Filled | New Outlined | Source notes |
|---|---|---|---|
| `Thumb_up` | `ThumbUpFilled` | `ThumbUpOutlined` | MUI also ships `ThumbUpAlt`/`ThumbUpAltOutlined` (alternate glyph) and `ThumbUpOffAlt` (a "not yet liked" diagonal-line variant) — **do not confuse these with the target.** `ThumbUp`/`ThumbUpOutlined` (no "Alt") is the correct standard pairing matching this file's plain-name convention. |
| `Thumb_down` | `ThumbDownFilled` | `ThumbDownOutlined` | Same family-name caution as above (`ThumbDownAlt`/`ThumbDownAltOutlined` exist as distinct icons — not the target). |

Both existing `Thumb_up`/`Thumb_down` Custom/EDGE components are retired (superseded by the new Filled pair); both move from the `<Custom>` Section into the `<Filled>`/`<Outlined>` Sections respectively.

### A6. Confirmed — no parity action needed

- **4 existing clean pairs** (already share a base name, already have both styles): `SpaceDashboard`, `Photo`, `Info`, `CheckCircle`.
- **Custom/EDGE icons confirmed single-weight by design, no Filled/Outlined action** (per report §B8, `Thumb_up`/`Thumb_down` excluded from this list since they're moving per A5, and `Help`/`Save` excluded per Decision #3 staying as-is): `FileXHTML`, `FilePDF`, `FilePPT`, `Excel`, `CSV`, `Upload`, `Up - EDGE`, `Equal - EDGE`, `Down - EDGE`, `Not Applicable-EDGE`, `Filter Dropdown - World Icon`, `Submit report`, `Convert`, `Restart`, `Verified Badge`, `UserSettings`, `ResetPassword`, `CleanInputs`.

---

## B. Custom/EDGE naming reconciliation

**Scope:** the ~20 Custom/EDGE icons remaining after `Thumb_up`/`Thumb_down` move out per A5. `Help` and `Save` are included below (they stay in this bucket per Decision #3, but still get evaluated for naming consistency since the reconciliation is meant to cover everyone left in the group).

**Proposed convention:** plain **PascalCase, no spaces, no hyphens, no underscores, no "- EDGE"/"(Custom)" suffix decoration** — i.e. align with the same bare-PascalCase style already used for every Filled/Outlined base name in this file, and consistent with the file's 2026-08-26 decision to drop MUI-style `<Name>` angle-bracket wrapping (this proposal doesn't reintroduce any bracket or decorative-suffix pattern). The section header itself (`CUSTOM / EDGE ICONS`) already conveys "this is custom" — repeating "EDGE" inside every individual icon name is redundant.

| Current name | Proposed new name | Change? | Notes |
|---|---|---|---|
| FileXHTML | FileXHTML *(unchanged)* | No — flagged | **Flag, don't guess silently:** unsure whether "XHTML" is intentional (a real file type) or a typo for "FileHTML"/"FileXML." Recommend Igor confirm intent before Step 3; leaving unchanged by default since guessing wrong would be worse than leaving it. |
| FilePDF | FilePDF | No | Already conforms. |
| FilePPT | FilePPT | No | Already conforms. |
| Help | Help | No | Stays in Custom/EDGE per Decision #3; already conforms. |
| Save | Save | No | Stays in Custom/EDGE per Decision #3; already conforms. |
| Upload | Upload | No | Already conforms. |
| Excel | Excel | No | Already conforms. |
| Up - EDGE | **TrendUp** | Yes | Based on the Step 1 fill-tree walk (a circle + directional arrow shape, dark teal), this reads as a trend/delta indicator, paired with Equal/Down below. **Flag for confirmation** — I haven't visually screenshotted this specific icon, only inspected its vector/fill structure. |
| Equal - EDGE | **TrendEqual** | Yes | Paired with TrendUp/TrendDown — same confirmation flag. |
| Down - EDGE | **TrendDown** | Yes | Same confirmation flag. |
| Not Applicable-EDGE | **NotApplicable** | Yes | Straightforward condensation, low ambiguity. |
| Filter Dropdown - World Icon | **WorldFilter** | Yes | Recommend dropping "Dropdown" and "Icon" as redundant descriptive cruft (this *is* an icon, living in an icon file; "Dropdown" describes a UI pattern, not the glyph's identity). **Flag for confirmation** — name change is more interpretive than the others in this table. |
| Submit report | **SubmitReport** | Yes | Simple PascalCase condensation, low ambiguity. |
| Convert | Convert | No | Already conforms. |
| Restart | Restart | No | Already conforms. |
| CSV | CSV | No | Already conforms (matches the acronym convention already used for PDF/PPT). |
| Verified Badge | **VerifiedBadge** | Yes | Simple PascalCase condensation, low ambiguity. |
| UserSettings | UserSettings | No | Already conforms. |
| ResetPassword | ResetPassword | No | Already conforms. |
| CleanInputs | CleanInputs | No | Already conforms. |

**Summary: 7 renames, 13 no-change, 1 flagged-ambiguous-default-no-change**, out of the 20 remaining after the Thumb move (14 unchanged + the 1 ambiguous FileXHTML = 15 "no rename" rows above, cross-check: 20 total rows − 7 renamed − 1 ambiguous-no-change = 12 clean no-change, plus FileXHTML makes 13 no-change total, plus the 7 renames = 20 ✓).

---

## C. Brand variant — architecture and token plan

### C1. Default fill token (makes today's raw black bindable)

**Propose:** `Components/Icon/Fill/Default`
- Collection: `EDGE palette`, Mode 1 (matches every other `Components/*` token in the file)
- Value: **literal** `rgba(0, 0, 0, 1)` — matches the current raw hardcoded black exactly, so binding to it changes nothing visually on day one.
- Scope: `["SHAPE_FILL"]` (binds to the nested vector's fill, not a frame/text fill)

**A choice worth Igor confirming explicitly:** this file already has `Semantic/Icon/Default` (used elsewhere, e.g. Toggle Button's `text/secondary`→`Semantic/Icon/Default` remap, at 70% opacity black per the migration log). I'm recommending a **new literal token that preserves the current 100%-opacity pure black**, rather than repointing every icon to alias `Semantic/Icon/Default` — aliasing there would visibly lighten every single icon in the system to 70% opacity, a real value change well beyond "make it bindable." If Igor would actually prefer icons to match the rest of the system's icon-opacity convention, that's a legitimate alternative — but it's a visual change, not a neutral one, so I'm flagging it rather than picking it silently.

### C2. Brand fill token

**Propose:** `Components/Icon/Fill/Brand`
- Collection: `EDGE palette`, Mode 1
- Value: **alias** → `Brand/Primary/500` (resolves through one more alias to `EDGE-Turquoise/500` → `#009F9B`, per the Step 1 report's C9 finding)
- Scope: `["SHAPE_FILL"]`

**Flagged plainly, per your instruction:** this would be the **first real alias-to-`Brand/Primary/500` binding anywhere in this file**. Nothing precedent-setting exists today — the Toggle Button case the pipeline previously assumed was precedent turned out to be two independently hand-picked literal colors (see Step 1 §C10). Treat this as new ground, not a continuation.

### C3. Switching mechanism — both consumption patterns

**Through the `<Icon>` wrapper (`6594:47648`):**
- Add a new variant property **`Color`** (`Default` / `Brand`) to the `<Icon>` `COMPONENT_SET`, alongside the existing `Size` property — 4 Size × 2 Color = 8 total variants (up from today's 4).
- Mechanism: since `<Icon>`'s glyph comes from its `Icon Instance` INSTANCE_SWAP slot (the wrapper doesn't own a fill of its own), each `Color=Brand` variant needs a **per-instance fill override** on the swapped-in icon's nested vector, bound to `Components/Icon/Fill/Brand` — reusing exactly the override mechanism already proven live on Toggle Button's icon instances (Step 1 §C11's last bullet).
- **A real mechanical dependency worth flagging before Step 3 relies on it:** Figma only reliably preserves an instance override across a swap-to-a-different-component when the override's target node path (e.g. the nested vector) has the **same name** in both the old and new swapped component. Step 1 sampled ~15 icons and found the nested vector consistently named "Vetor" (a recurring typo) across every one checked — encouraging, but that was a sample, not all 125. **Recommend Step 3 verify the nested-vector name is consistent across all 125 icons (old and newly-built) before depending on override-survives-swap behavior for the Brand toggle to work when a consumer changes which icon is plugged into the wrapper.**

**For direct-instance consumption (bypassing `<Icon>`, confirmed live in the file today):**
- Standalone icon masters have no property of their own to switch — a Color variant can't be added to a plain `COMPONENT` (only to a `COMPONENT_SET`).
- Propose: bind every master's own nested-vector fill to `Components/Icon/Fill/Default` (giving every icon a real, bindable, on-brand-neutral baseline instead of raw black). A consumer who needs the Brand look on a direct instance then manually overrides that specific instance's fill, binding it to `Components/Icon/Fill/Brand` — the same override mechanism as above, just applied by hand per-instance rather than via a variant control.
- **To be explicit, as your prompt asked:** this gives direct-instance consumers a Brand *option*, not a Brand *switcher*. There is no properties-panel toggle for a bare `WorkFilled` instance the way there would be for something built as a real variant set. That gap only closes if the restructuring in C4 below is pursued.

### C4. Flagged, not decided — restructuring standalone icons into real component sets (OPEN)

**The bigger alternative:** instead of ~103+ disconnected standalone components, restructure icon *concepts* into real `COMPONENT_SET`s — e.g. one `Work` set with `Style` (`Filled`/`Outlined`) and `Color` (`Default`/`Brand`) as true variant properties, matching how every other EDGE-DS component (Button, Checkbox, etc.) already works.

**Tradeoff:**
- **Pro:** a real, discoverable variant switcher in the properties panel for every icon, for both Style and Color, consistent with the rest of the design system's interaction model. One source of truth per icon concept instead of two-to-four unrelated standalone components that happen to share a naming convention.
- **Con:** a genuinely large restructuring, not a build-alongside addition. Only 4 icon concepts are already cleanly paired; every other concept would need brand-new component-set scaffolding built from scratch. Every *existing* instance of these icons elsewhere in the file (Toggle Button's icon instances, Stepper's `Step Icon`, the Documentation frame's own example swatches, etc.) currently references specific standalone components by ID — absorbing a standalone component into a new set via `combineAsVariants` generally preserves existing instance links in Figma, but changes what the properties panel shows for every one of those existing instances file-wide, which is a large blast radius to validate across components that are already closed/signed-off in the migration tracker.

**Recommendation:** treat this as its own future project, scoped with its own Step 1 discovery pass (which existing instances would be affected, whether `combineAsVariants` really does preserve every link cleanly at this scale) — **not** bundled into the current Filled/Outlined/Brand build. **Flagged OPEN per your instruction, not decided here.**

### C5. Custom/EDGE exclusion from Brand — confirmed

Per report §C12: all multi-color and single-purpose-badge Custom/EDGE icons are excluded from the Brand variant entirely — `FilePDF`, `FilePPT`, `FileXHTML`, `Excel`, `CSV`, the renamed `TrendUp`/`TrendEqual`/`TrendDown`, `NotApplicable`, `WorldFilter`, `SubmitReport`, `Convert`, `Restart`, `VerifiedBadge`, `UserSettings`, `ResetPassword`, `CleanInputs`, `Help`, `Save`, `Upload`. Forcing any of these to one flat Brand color would break their meaning (e.g. a solid-teal "PDF" badge stops reading as a PDF).

### C6. Exact tokens to create (for Step 3)

| Token name | Collection | Mode | Value | Scope |
|---|---|---|---|---|
| `Components/Icon/Fill/Default` | EDGE palette | Mode 1 | literal `rgba(0,0,0,1)` | `SHAPE_FILL` |
| `Components/Icon/Fill/Brand` | EDGE palette | Mode 1 | alias → `Brand/Primary/500` (`VariableID:203:2903`) | `SHAPE_FILL` |

No IDs exist yet for these — both are new. Real IDs will be assigned once Step 3 creates them; recommend Step 3 return them immediately for the migration-status doc entry.

---

## D. Utility/Non-Production enforcement

**The naming collision fix:** rename the 5 `_hidden` components to unique, individually identifiable, clearly-non-production names — e.g. `_NONPROD_Placeholder1` through `_NONPROD_Placeholder5` (keeps the underscore-prefix signal, fixes the identical-name collision, and the `NONPROD` token makes intent unambiguous if one is ever surfaced by accident).

**Whether it's mechanically possible to remove them from `<Icon>`'s instance-swap picker — checked, and no clean mechanism exists:** `preferredValues` only pins/promotes items to the *top* of the swap picker; it doesn't hide anything else, so populating it with a curated list (see below) makes good icons easier to find but does **not** prevent someone from scrolling to and selecting a utility placeholder. Figma's private-component naming convention (a leading `.` on the name) only affects visibility to *other files* consuming this one as a library — it has no effect on same-file instance-swap visibility, which is the actual risk here. **The only real backstop is structural: moving the 5 placeholders off the `Icons` canvas entirely** (e.g. into `🗄️ _Archive / Deprecated Docs`, or a new dedicated non-production page) so they no longer live alongside legitimate icons in search/swap UI at all. That's a bigger move than a rename — **flagging it as a recommendation, not folding it into the default plan, since it changes page structure and Igor should confirm it explicitly.**

**Curated `preferredValues`:** propose populating `<Icon>`'s `Icon Instance` property with the full list of legitimate icons post-rename — all 125 (87 Filled + 10 new Outlined-for-Filled-only... see recount below) explicitly excluding the 5 utility placeholders. Step 3 should populate this with resolved component keys once every rename/build lands, since keys will change as new components are created. (Post-build counts: Filled grows from 87 to ~89 net — see recount note below — Outlined grows from 15 to ~87, Sharp stays 1, Custom/EDGE nets to ~20 after the Thumb move-out and Thumb-pair addition to Filled/Outlined; exact final counts depend on the OPEN items above, particularly A4/StarSharp and whichever of the 3 OPEN Outlined-only renames Igor approves.)

**New default value for `Icon Instance`:** recommend **`HomeFilled`** — a universally recognizable, structurally permanent icon, unlikely to be affected by any of this proposal's open decisions (unlike `StarSharp`, whose disposition is still open per A4).

---

## E. Migration status doc entry (draft — not applied)

This is a draft of what would be added to `docs/EDGE-DS-Migration-Status.md` once Step 3's build lands. **Not written to that file yet** — for review only.

### Draft status-table row

```
| Icons | 🔄 In progress — Step 2 proposal reviewed, Step 3 build pending | Filled/Outlined parity build (82 new Outlined + up to 10 new Filled, exact count depends on open decisions), new Brand color variant (Components/Icon/Fill/Default + /Brand, first real alias to Brand/Primary/500 in the file), Custom/EDGE naming reconciliation, Utility/Non-Production naming-collision fix. See below. |
```

### Draft `### Icons — detail` section

```
### Icons — detail

**Bind-for-the-first-time project, not a retokenize.** Unlike every other component in this table, Icons had zero token bindings of any kind prior to this project — every icon's fill was raw, hardcoded, unbound black (or, for a handful of multi-color Custom/EDGE icons, several raw hardcoded colors). This project is the first time icon fill color becomes bindable at all, not a migration off a legacy MUI-palette binding.

**Filled/Outlined parity:** built [N] new Outlined components and [N] new Filled components to close the gap Step 1 found (only 4 clean pairs existed: SpaceDashboard, Photo, Info, CheckCircle). Fixed the ErrorOutline→ErrorOutlined naming defect, completing the Error pair with no new artwork. Moved Thumb_up/Thumb_down out of Custom/EDGE into the Filled/Outlined system as ThumbUpFilled/ThumbUpOutlined and ThumbDownFilled/ThumbDownOutlined. [Open items resolved: StarSharp's disposition — see A4; EyeOff/Globe/RotateCcw rename decisions — see A2.]

**New Brand color variant:** Components/Icon/Fill/Default (literal, matches pre-existing raw black) and Components/Icon/Fill/Brand (alias → Brand/Primary/500 — the first real alias to this token anywhere in the file) created. Color=Default/Brand added to the <Icon> wrapper's variant set alongside Size. Direct-instance consumers (bypassing the wrapper) get the Brand look via a manual per-instance override, not a variant switcher — flagged as a known gap, closeable only by the separate, not-yet-approved standalone-components-to-component-sets restructuring project.

**Custom/EDGE naming reconciliation:** renamed 7 of the remaining 20 Custom/EDGE icons to a consistent bare-PascalCase convention (Up - EDGE/Equal - EDGE/Down - EDGE → TrendUp/TrendEqual/TrendDown, Not Applicable-EDGE → NotApplicable, Filter Dropdown - World Icon → WorldFilter, Submit report → SubmitReport, Verified Badge → VerifiedBadge); 13 needed no change. FileXHTML left unchanged pending confirmation of intent (possible typo for FileHTML/FileXML).

**Utility/Non-Production fix:** renamed the 5 identically-named `_hidden` placeholders to unique `_NONPROD_Placeholder1..5` names. No structural mechanism exists in Figma to fully remove them from same-file instance-swap pickers short of moving them off the Icons canvas entirely — [state whether that move was also done, or left as a flagged-but-not-actioned recommendation].

**Known systemic gap this closes:** Icons' 100%-raw-fill state was flagged in the migration doc's "Known systemic gaps" section conceptually (zero-hardcode / unbound-fill pattern) — this project is the first time that gap is closed for any icon, via Components/Icon/Fill/Default becoming the real bound baseline.
```

---

## Open decisions needing Igor's sign-off before Step 3

1. **`StarSharp`'s disposition** (§A4) — leave as a standalone legacy one-off (my recommendation), retroactively pair with a new plain Star Filled/Outlined pair, or treat Sharp as an ongoing third style family.
2. **Whether to rename the 3 non-standard Outlined-only EDGE names to their real MUI equivalents** (§A2): `EyeOff`→`VisibilityOff` (recommended), `Globe`→`Public` (recommended), `RotateCcw`→`Replay` or `RotateLeft` (needs a visual check first, no confident recommendation yet).
3. **Whether `FileSpreadsheet` and `FileOutput`** (§A2) should be built as hand-authored/derived assets in this file's existing Custom/EDGE file-badge style, since neither has a real Material Symbols source to draw from.
4. **Whether to pursue the standalone-icons-to-component-sets restructuring** (§C4) as a separate future project — not part of this build regardless, but worth confirming it's on the radar.
5. **Icon fill default-token value** (§C1): keep the new `Components/Icon/Fill/Default` as a literal matching current pure black (recommended, zero visual change), or alias it to the existing `Semantic/Icon/Default` (70% opacity), which would visibly lighten every icon in the system.
6. **The 3 Custom/EDGE renames flagged as interpretive** (§B): `TrendUp`/`TrendEqual`/`TrendDown` for the "- EDGE" trio (based on an unconfirmed visual read), `WorldFilter` for the Filter Dropdown icon, and whether `FileXHTML` is intentional or a typo.
7. **Whether to physically move the 5 Utility/Non-Production placeholders off the Icons canvas** (§D) as the only real structural fix to the swap-picker exposure risk, beyond the recommended rename.
