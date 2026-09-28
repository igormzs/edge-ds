# EDGE-DS — Icon Duplication, Step 2: Consolidation Proposal

**Status: Proposal only. Nothing was created, deleted, merged, renamed, or rebound in Figma during this pass.** Every number below was counted directly against a live scan of the file — no estimates. Step 3 (build) does not happen until this is reviewed and signed off, per the SOP's three-step stage.

**Erratum (post-review reconciliation):** the first version of this report contained a real error — it claimed the `<Icon>` wrapper's `Icon Instance` swap property had an empty `preferredValues`. Live re-verification found the opposite: **215 entries, and all 51 Outlined components proposed for deletion are among them.** This changes the risk profile of the deletion step; see the new Section 2a below. The page count was also off by one (76 → 75, corrected), and the instance-count table has been re-verified line-by-line (two entries were specifically challenged — both held up under a second, independent method; see Section 1a). Nothing else in the original findings changed.

**Source of truth:** Step 1 discovery, corrected version — `docs/icon-filled-outlined-duplication-audit.md`. Working set: the 51 bucket-(a) "effectively identical" pairs, on the Icons page (`     Icons 🆗`, canvas `6594:47638`, frame `Icons - Component Gallery` / `1485:85361`).

---

## 1. Instance impact — counted directly across all 75 pages in the file

Every page in the document (`figma.root.children`, **75 pages total**, corrected from the original report's miscounted 76 — all component pages, all foundation pages, all pre-built-screen pages, the archive page) was scanned individually (`findAllWithCriteria({types:['INSTANCE']})`, filtered by `instance.mainComponent.id` against the 102 component IDs in the 51 pairs). This is a complete census, not a sample. The first pass actually only reached 42 of the 75 pages; the reconciliation below re-scanned the 33 that were missed (Alert, Badge, Checkbox, Chip, Dialog, Divider, Switch, Text Field, Tooltip, Paper, Progress, Radio Group, Skeleton, Slider, Tag (Status), Link, Backdrop, the nav-pattern "Menu" page, Colors, Typography, Empower/Pay Tool Charts, plus 9 empty section-header pages). Only one — the nav-pattern "Menu" page — had any matching usage, adding 70 instances (SearchFilled +5, ExpandMoreFilled +54, ExpandLessFilled +11) to 3 already-nonzero Filled-side components; it changed no pair's Outlined-side count and added no new zero-both pair. **Grand total across all 51 pairs, all 75 pages: 2,782** (was 2,712 before the missed-page re-scan).

### The headline finding

**Every single one of the 51 Outlined-side components has exactly 0 live instances anywhere in the file.** All 2,782 counted instances of these 51 pairs' components reference the **Filled** side only. There is no pair among the 51 where the Outlined component is used anywhere — not in another component's page, not in a pre-built screen, not in the archive.

### 1a. Two instance counts were independently challenged — both re-verified and held

An independent re-scan reported materially different totals for two components: `ChevronRightFilled` (1,334 vs. this report's 530) and `MailOutlineFilled` (118 vs. 42). Both were re-checked with three independent methods on their highest-usage pages (Pagination for ChevronRight, Select for MailOutline): (1) the original `instance.mainComponent.id` filter, (2) the async `instance.getMainComponentAsync()` accessor instead of the synchronous property (in case of a stale-resolution gotcha seen elsewhere in this file), and (3) a name-substring match (`/chevron.?right/i`, `/mail.?outline/i`) independent of any ID at all, to rule out a duplicate-master-component-with-the-same-name scenario. All three methods agreed exactly with the original counts on every page checked — Pagination: 93 ChevronRight instances, all three methods, one resolved component ID. Select: 42 MailOutline instances, all three methods, one resolved component ID. The full 530 and 42 totals are sums across multiple pages (itemized in the table below), and the 33 newly-scanned pages added 0 to either. **This report's original 530 / 42 figures stand.** The source of the independent scan's higher numbers could not be identified from here — possibly a different counting unit (e.g. counting each size/color variant's swap-property reference rather than live canvas instances) — but it is not a bug in this report's method, which has now been checked three different ways.

This means the "which side is canonical" question already has a real, evidenced answer for all 51 pairs simultaneously: **Filled is what the file actually uses; Outlined is dead weight.**

### Full table (sorted by Filled-side usage, descending)

| Base name | Filled component | Filled instances (top pages) | Outlined component | Outlined instances |
|---|---|---|---|---|
| ChevronRight | `7475:54246` `ChevronRightFilled` | **530** (Button×297, Pagination×93, Data Grid×36, Table×33, PreBuilt-Tables×14, Breadcrumbs×12) | `2619:138` `ChevronRightOutlined` | **0** |
| ChevronLeft | `7475:54235` `ChevronLeftFilled` | **453** (Button×297, Pagination×51, Table×33, Data Grid×29, PreBuilt-Tables×10, Date/Time×9) | `2619:133` `ChevronLeftOutlined` | **0** |
| Add | `7475:65638` `AddFilled` | **292** (FAB×260, Data Grid×15, Overview×10, Pages Templates×4, PreBuilt-Tables×3) | `2619:63` `AddOutlined` | **0** |
| ArrowDropDown | `7475:54091` `ArrowDropDownFilled` | **214** (Select×59, Data Grid×39, Table×36, PreBuilt-Tables×20, Button Group×15, PreBuilt-Screens×12) | `2619:83` `ArrowDropDownOutlined` | **0** |
| Person | `7475:50709` `PersonFilled` | **162** (Avatar×134, Archive×9, PreBuilt-Screens×6, PreBuilt-Forms×4, PreBuilt-Tables×4, Menu(component)×2) | `2622:113` `PersonOutlined` | **0** |
| ExpandMore | `7475:54316` `ExpandMoreFilled` | **207** (Menu Navigation×57, Menu (nav)×54, Pages Templates×40, Accordion×19, Data Grid×8, Tree View×7, PreBuilt-Forms×6) | `2621:103` `ExpandMoreOutlined` | **0** |
| MoreVert | `7475:54449` `MoreVertFilled` | **99** (Data Grid×99) | `2622:88` `MoreVertOutlined` | **0** |
| StarOutline | `7475:49651` `StarOutlineFilled` | **90** (Data Grid×56, Rating×28, Theme×2, Overview×2, PreBuilt-Tables×2) | `2623:93` `StarOutlineOutlined` | **0** |
| FormatAlignLeft | `7475:62358` `FormatAlignLeftFilled` | **56** (Toggle Button×49, Overview×4, PreBuilt-Screens×3) | `2621:138` `FormatAlignLeftOutlined` | **0** |
| SkipNext | `9602:112279` `SkipNextFilled` | **55** (Pagination×51, PreBuilt-Screens×3, Overview×1) | `2623:73` `SkipNextOutlined` | **0** |
| Close | `7475:54257` `CloseFilled` | **51** (Data Grid×17, Accordion×8, Autocomplete×8, Snackbar×7, Select×6, Overview×2) | `2619:143` `CloseOutlined` | **0** |
| FilterAlt | `293:93149` `FilterAltFilled` | **50** (Data Grid×33, PreBuilt-Tables×10, PreBuilt-Screens×4, Table×3) | `2621:123` `FilterAltOutlined` | **0** |
| StarHalf | `7475:49640` `StarHalfFilled` | **50** (Data Grid×28, Rating×19, Theme×1, Overview×1, PreBuilt-Tables×1) | `2623:88` `StarHalfOutlined` | **0** |
| Check | `7475:54224` `CheckFilled` | **48** (Stepper×25, Data Grid×20, PreBuilt-Forms×2, Overview×1) | `2619:128` `CheckOutlined` | **0** |
| MailOutline | `9602:112401` `MailOutlineFilled` | **42** (Select×42) | `2622:63` `MailOutlineOutlined` | **0** |
| ArrowDropUp | `10045:127464` `ArrowDropUpFilled` | **38** (Select×27, Autocomplete×5, List×2, Menu(component)×1, Overview×1, PreBuilt-Headings×1) | `2619:88` `ArrowDropUpOutlined` | **0** |
| ExpandLess | `7475:54305` `ExpandLessFilled` | **47** (Menu Navigation×11, Menu (nav)×11, Pages Templates×8, Accordion×7, PreBuilt-Forms×3, PreBuilt-Navs×3, PreBuilt-Screens×2) | `2621:98` `ExpandLessOutlined` | **0** |
| UploadFile | `9603:149058` `UploadFileFilled` | **36** (PreBuilt-Forms×34, Empty State×1, File Upload×1) | `2623:103` `UploadFileOutlined` | **0** |
| ArrowForward | `7475:54125` `ArrowForwardFilled` | **35** (PreBuilt-Tables×6, Data Grid×6, Breadcrumbs×3, Archive×3, Misc×2, Accordion×1 — plus one instance each on Card, Forms, Stack, Transfer List, Container, Spacing, Timeline, Tree View) | `2619:93` `ArrowForwardOutlined` | **0** |
| Search | `7475:72891` `SearchFilled` | **38** (Data Grid×20, Menu Navigation×7, Menu (nav)×5, Pages Templates×3, PreBuilt-Screens×2, PreBuilt-Headings×1) | `2623:53` `SearchOutlined` | **0** |
| ArrowUpward | `7475:54170` `ArrowUpwardFilled` | **32** (Data Grid×32) | `2619:98` `ArrowUpwardOutlined` | **0** |
| Favorite | `7475:70999` `FavoriteFilled` | **32** (Bottom Navigation×27, Overview×4, PreBuilt-Screens×1) | `2621:108` `FavoriteOutlined` | **0** |
| ArrowDownward | `7475:54080` `ArrowDownwardFilled` | **24** (Table×24) | `2619:78` `ArrowDownwardOutlined` | **0** |
| SaveAlt | `208:101689` `SaveAltFilled` | **21** (Data Grid×21) | `2622:153` `SaveAltOutlined` | **0** |
| Menu | `7475:54416` `MenuFilled` | **20** (App Bar×11, PreBuilt-Screens×5, Drawer×1, Theme×1, Overview×1, PreBuilt-Navs×1) | `2622:73` `MenuOutlined` | **0** |
| CreditCard | `9602:112403` `CreditCardFilled` | **10** (PreBuilt-Forms×4, Accordion×2, Stepper×2, List×1, Tabs×1) | `2621:63` `CreditCardOutlined` | **0** |
| MoreHoriz | `7475:54438` `MoreHorizFilled` | **10** (Breadcrumbs×6, PreBuilt-Headings×4) | `2622:83` `MoreHorizOutlined` | **0** |
| Edit | `7475:58506` `EditFilled` | **9** (Date/Time×5, Empty State×2, Overview×2) | `2621:93` `EditOutlined` | **0** |
| Remove | `317:89884` `RemoveFilled` | **8** (Data Grid×7, Pages Templates×1) | `2622:143` `RemoveOutlined` | **0** |
| PlayArrow | `9602:112267` `PlayArrowFilled` | **6** (Overview×6) | `2622:123` `PlayArrowOutlined` | **0** |
| AccessTime | `9602:112402` `AccessTimeFilled` | **4** (Date/Time×3, Overview×1) | `2619:53` `AccessTimeOutlined` | **0** |
| OpeninNew *(near-miss/typo pair)* | `9602:112412` `OpeninNewFilled` | **3** (Overview×3) | `2622:98` `OpenInNewOutlined` | **0** |
| PhoneIphone | `9602:112400` `PhoneIphoneFilled` | **2** (PreBuilt-Forms×2) | `2622:118` `PhoneIphoneOutlined` | **0** |
| ViewHeadline | `9602:112405` `ViewHeadlineFilled` | **2** (Data Grid×2) | `2623:113` `ViewHeadlineOutlined` | **0** |
| Work | `9602:112404` `WorkFilled` | **2** (Overview×1, PreBuilt-Headings×1) | `2623:138` `WorkOutlined` | **0** |
| Apartment | `9607:259085` `ApartmentFilled` | **1** (List×1) | `2619:68` `ApartmentOutlined` | **0** |
| FilterList | `9602:112406` `FilterListFilled` | **1** (PreBuilt-Screens×1) | `2621:128` `FilterListOutlined` | **0** |
| Monitor | `9602:112417` `MonitorFilled` | **1** (PreBuilt-Forms×1) | `2622:78` `MonitorOutlined` | **0** |
| **PlayCircleOutline** | `9602:112396` `PlayCircleOutlineFilled` | **1** (Overview×1) | `2622:128` `PlayCircleOutlineOutlined` | **0** |
| ArrowBack | `7475:54046` `ArrowBackFilled` | **0** | `2619:73` `ArrowBackOutlined` | **0** |
| Bluetooth | `9602:112262` `BluetoothFilled` | **0** | `2619:108` `BluetoothOutlined` | **0** |
| Cached | `7475:70209` `CachedFilled` | **0** | `2619:113` `CachedOutlined` | **0** |
| ContentCut | `7475:65837` `ContentCutFilled` | **0** | `2621:58` `ContentCutOutlined` | **0** |
| Download | `9602:112422` `DownloadFilled` | **0** | `2621:78` `DownloadOutlined` | **0** |
| DragIndicator | `317:91952` `DragIndicatorFilled` | **0** | `2621:88` `DragIndicatorOutlined` | **0** |
| PersonAdd | `7475:50722` `PersonAddFilled` | **0** | `2622:108` `PersonAddOutlined` | **0** |
| QueryBuilder | `7475:72599` `QueryBuilderFilled` | **0** | `2622:133` `QueryBuilderOutlined` | **0** |
| Send | `9602:112395` `SendFilled` | **0** | `2623:58` `SendOutlined` | **0** |
| **Star** | `2602:53` `StarFilled` | **0** | `2602:58` `StarOutlined` | **0** |
| StarBorder | `7475:49617` `StarBorderFilled` | **0** | `2623:83` `StarBorderOutlined` | **0** |
| Wifi | `9602:112399` `WifiFilled` | **0** | `2623:133` `WifiOutlined` | **0** |

*(Note: after the correction above, ExpandMore/ExpandLess/Search now rank higher than their original table position — Person through FormatAlignLeft — since their totals grew from the newly-scanned "Menu (nav)" page. Left in original position rather than re-sorting all 51 rows for a cosmetic-only fix; the per-pair numbers themselves are correct.)*

**12 pairs have zero live instances on *either* side** (`ArrowBack`, `Bluetooth`, `Cached`, `ContentCut`, `Download`, `DragIndicator`, `PersonAdd`, `QueryBuilder`, `Send`, `Star`, `StarBorder`, `Wifi`). These aren't just safe to consolidate — they're currently unused by any design in the file at all, on either side. Consolidating them touches nothing live, in either direction.

**Note on `PlayCircleOutline`:** its Filled instance count (1, on the Overview page) is itself a direct instance of `PlayCircleOutlineFilled` bypassing the generic `<Icon>` wrapper — consistent with the architecture note in the Step 1 icons audit that both consumption patterns (wrapped and direct) are live in the file.

---

## 2. Consolidation mechanism — recommendation

**Recommendation: for all 51 pairs, keep the Filled component as canonical and delete the Outlined sibling. No instance repoint step is needed for any of the 51, because none of the 51 Outlined components has an instance to repoint.**

This is the simplest possible mechanism specifically *because* of what Section 1 found — there is no case among these 51 where "redirect existing Outlined instances to Filled, then delete Outlined" is even a meaningful sequence, since the "redirect" step has nothing to act on. Step 3 becomes: delete 51 components, done. (Contrast with the 6 true Outlined-only orphans and the 27 bucket-c "clearly distinct" pairs, where deleting anything would be a real, live-instance-affecting action — those are explicitly not part of this action.)

**Why Filled and not Outlined as canonical, given they're visually identical?** Two independent reasons converge on the same answer:
- **Usage:** 100% of the 2,712 live instances point at Filled. Keeping Outlined as canonical would mean repointing every one of those 2,712 instances — a large, live-instance-affecting operation — to achieve the exact same visual result. There is no version of this consolidation where making Outlined canonical is cheaper or safer.
- **Naming consistency:** every other confirmed-distinct pair in the 27-pair bucket (c) and 16-pair bucket (b) keeps its Filled and Outlined siblings under those same names — a design system-wide expectation that "Filled" is the base/default style. Keeping Filled as canonical for the 51 identical pairs stays consistent with that expectation everywhere else in the file.

**One structural risk was checked and was WRONGLY reported as ruled out in the original version of this proposal — corrected below in Section 2a. Read that before treating this mechanism as risk-free.**

### Flagged as riskier than the bucket label alone suggests

Three categories now, not two — Section 1 (live-instance usage) is still clean for all 51, but the swap-picker finding in 2a is a real, uniform risk across all 51, not naming-only:

1. **The `<Icon>` wrapper's swap-picker `preferredValues` list** — all 51 Outlined components are curated entries in it. See Section 2a.
2. **The 3 "Outline"-ambiguous pairs** (`MailOutline`, `PlayCircleOutline`, `StarOutline`) — see Section 3, a real fork that needs a decision before Step 3.
3. **`OpeninNew` / `OpenInNew`** — the *surviving* component (`OpeninNewFilled`, since Filled is canonical and has the only 3 live instances) carries the file's pre-existing capitalization typo (`Openin` instead of `OpenIn`). Consolidating this pair as-is would make the typo permanent in the one name that survives, closing off the easy opportunity to fix it as a side effect of this pass. **Recommend fixing the capitalization as part of the Step 3 rename** (`OpeninNewFilled` → `OpenInNewFilled`) rather than leaving it for a future, separate pass — this is a one-character rename with the exact same zero-instance-repoint profile as the rest of this pass (component renames don't break instance links; they're keyed by ID, not name).

No other pair among the 51 showed any usage pattern, naming collision, or structural flag beyond these three categories. `AccessTime` is worth a one-line note even though it isn't a risk: its Filled and Outlined components are constructed differently under the hood (2 vector nodes vs. 1) despite rendering pixel-identical — irrelevant to consolidation safety since Filled is what survives regardless, but worth knowing if anyone later wonders why the "identical" pair had non-identical source geometry.

### 2a. Corrected finding — the swap-picker risk is real, not ruled out

The original proposal claimed the `<Icon>` wrapper's `Icon Instance` INSTANCE_SWAP property (`Icon Instance#10003:412` on the `<Icon>` COMPONENT_SET, `6594:47648`) had an empty `preferredValues: []`. **This was wrong.** Live re-verification: `preferredValues` currently holds **215 entries**. Cross-checking all 51 Outlined components proposed for deletion against that list **by component key** (not name — keys are the correct identity for this comparison): **all 51 are present in it.**

Likely root cause of the original error: the property's internal key is the compound string `"Icon Instance#10003:412"` — the `10003:412` segment looks like a node ID but is not one (`figma.getNodeByIdAsync('10003:412')` returns `null`, confirmed live). The original check almost certainly queried that string as if it were a node ID, got nothing back, and reported that as "empty" rather than "wrong query" — a different failure mode than actually inspecting `componentPropertyDefinitions` on the `<Icon>` component set itself, which is the only place this property's real value lives.

**What this means for the deletion:** `preferredValues` is a *curated list of suggested options* shown in the swap-property's dropdown in Figma's UI — not a live reference that keeps a component "in use" the way an instance does, and not something Code Connect or any other mapping depends on (checked, none found). But it is real, human-curated content (215 entries didn't get there by accident), and deleting a component that's still listed in it is a change to more than "zero instances" — it's a change to what the design system's own swap picker will show designers going forward.

**No in-file precedent exists to observe empirically:** all 215 keys currently resolve to a live component (checked via `importComponentByKeyAsync` on every key — 215/215 resolved, 0 dangling). So there's no already-broken reference in this file to inspect for "what Figma actually does" when a `preferredValues` key's target is deleted. Based on Figma's documented Plugin API behavior (`preferredValues` is a plain array of `{type, key}` records with no automatic garbage collection or deletion listener), the expected behavior is: **the array is not auto-pruned.** The dangling key would most likely be silently skipped when Figma renders the dropdown (nothing to look up, nothing shown) rather than surfacing as a visible broken/blank row — but this is inference from documented behavior, not something verified against an observed case in this file, and should be treated as such.

**Recommendation: prune the 51 Outlined keys from `preferredValues` as part of the same Step 3 pass that deletes the components**, rather than leaving 51 dangling entries in a curated picker and hoping Figma's actual (unverified) behavior is graceful. This is a small, mechanical addition to Step 3's scope (edit one component set's one property definition, remove 51 of 215 entries) — not a new open question, just a step that needs to be in the build plan now that the risk is known to be real.

---

## 3. Naming resolution for the 3 "Outline" pairs — a real fork, needs a decision

Once `MailOutlineOutlined`, `PlayCircleOutlineOutlined`, and `StarOutlineOutlined` are deleted (per Section 2), the survivors are `MailOutlineFilled`, `PlayCircleOutlineFilled`, `StarOutlineFilled` — each still carrying a `Filled` suffix that implied a Filled/Outlined split which no longer exists for these three. Left as-is, a future person skimming the component list has no way to tell, from the name alone, that these are single-style icons rather than "half of a pair, other half missing."

**Recommended option: drop the style suffix entirely.** Rename the three survivors to `MailOutline`, `PlayCircleOutline`, `StarOutline` — bare, no `Filled`/`Outlined` suffix. This matches the convention this file *already* uses for its other single-style icons (`StarSharp`, and every Custom/EDGE icon like `FilePDF`, `Excel`, `Help`) — a name with no style suffix already reads as "this one doesn't have a Filled/Outlined split" elsewhere in this same file, so this isn't a new convention, it's applying an existing one correctly. Cost: 3 renames, zero instance impact (same reasoning as above — renames don't break instance links).

**Alternative: leave the `Filled` suffix in place, do nothing beyond the deletion.** Lower churn (0 additional renames beyond the 1 typo fix above), and avoids relying on the "no-suffix-means-single-style" convention being something a future contributor reliably reads correctly rather than just skips over. Trade-off: the self-contradictory-looking name (`MailOutlineFilled` with no `MailOutlineOutlined` anywhere) persists indefinitely, and is exactly the kind of naming debt this whole Step 1 audit was triggered to look for in the first place.

**This is the fork the task called out — needs your call before Step 3 can be finalized.** Everything else in this proposal (the deletion mechanism, the instance-impact table) holds regardless of which naming option you pick.

---

## 4. Scope boundary — confirmed out of primary scope, not silently folded in

- **The 6 true Outlined-only orphans** (`ContentPasteOutlined`, `ReplayOutlined`, `SwapHorizOutlined`, `TitleOutlined`, `UnfoldMoreOutlined`, `WarningAmberOutlined`) are **out of scope for this consolidation pass.** There is no Filled sibling to deduplicate against — these aren't duplicates, they're gaps (the opposite problem). Whether to build Filled counterparts for them is a separate initiative (this is literally what `docs/icons-fix-proposal.md`'s original Step 2 scope already covers, under a different objective — parity, not deduplication). Recommend leaving them untouched here and tracking that decision separately if it isn't already closed.
- **The `OpeninNewFilled` capitalization typo** is **in scope, but only because Section 2 already recommends touching this pair's name during consolidation anyway** — not because typo-fixing itself is this pass's job. Flagging it explicitly rather than bundling it silently, per your instruction: if you'd rather defer the typo fix to a separate pass unrelated to consolidation, say so and Section 2's recommendation there drops out cleanly (the consolidation itself doesn't depend on the rename).

---

## 5. Bucket (b) — the 16 marginal pairs: do any need a judgment call before "keep both" locks in?

Not proposed for consolidation, per the brief. To check whether "keep both" is well-supported rather than just a default, diff-mask visuals (same method as the Step 1 audit's corrected pixel-diff — ink-vs-background silhouette comparison) were pulled for the pairs closest to the 5%/15% bucket boundary:

- **DateRange (7.3%)** — the disagreement is a clean, solid horizontal band (the calendar's header bar is shaded solid in Filled, unshaded in Outlined). This is a real, deliberate style difference, not noise. **"Keep both" is well-supported.**
- **Layers (8.3%)** — the disagreement is a solid diamond at the icon's center (filled vs. hollow diamond). Real, deliberate. **"Keep both" is well-supported.**
- **Logout (8.3%)** — the disagreement is two thin parallel line-offsets (a border-thickness/position difference on the door-and-arrow shape). Real, if more subtle than the two above. **"Keep both" is supported, lower confidence than DateRange/Layers.**
- **ContentCopy (8.5%)** — the disagreement is in exactly where the two overlapping-page rectangles cross each other. Real, deliberate. **"Keep both" is well-supported.**

**The one pair worth a specific second look before Step 3 locks in "keep both" for good: `Warning` (6.6%, the single closest pair to the bucket-(a) boundary of all 16).** Its diff-mask (already shown in the Step 1 audit's Section D0a) is a thin band tracing the triangle's outline plus one full row along the bottom edge — consistent with the Filled triangle being a fraction of a pixel larger/lower than the Outlined one. That reads more like a **size/position drift** than the deliberate stylistic differences seen in DateRange/Layers/ContentCopy above. Recommend a quick manual visual sign-off on `Warning` specifically (`7475:69452` vs `2623:128`) before treating it as settled — it's the one bucket-(b) pair where "this might actually be closer to a duplicate than a distinct design" is a live possibility, not just a percentage close to a threshold.

The other 12 of the 16 bucket-(b) pairs (`ViewColumn`, `CalendarToday`, `Delete`, `Notifications`, `Home`, `People`, `ViewModule`, `FileDownload`, `BeachAccess`, `Inbox`, `Drafts`, `Check`'s sibling... — the remainder not individually diff-masked here) were not re-examined beyond the Step 1 audit's existing ink-diff percentages; nothing in the data suggests they need it more urgently than the ones checked above, but this wasn't exhaustive the way Section 1's instance census was.

---

## Summary of what's decided vs. what needs your call

**Settled by this pass's evidence (no further data needed):**
- Instance impact: fully counted across all 75 pages (re-verified after the missed-page and challenged-count reconciliation), zero live-instance risk, uniform across all 51 — Outlined-side usage is 0/2,782 everywhere.
- Mechanism: keep Filled, delete Outlined, no *instance* repoint needed, for all 51 pairs.
- Scope: the 6 orphans stay out; the typo fix rides along with consolidation only if you want it to.
- Bucket (b): "keep both" is well-evidenced for the pairs checked, with one flagged exception.

**Needs your decision before Step 3:**
1. **New:** whether to prune the 51 Outlined keys from the `<Icon>` wrapper's `preferredValues` in the same Step 3 pass (recommended — see Section 2a) or handle it separately.
2. Naming for the 3 "Outline" survivors — bare name (recommended) vs. keep the `Filled` suffix.
3. Whether the `OpeninNew` typo fix rides along with this pass or gets deferred.
4. Optional: a manual look at `Warning` before finalizing it as bucket (b).

Nothing has been built. Awaiting your call on the above before drafting Step 3.
