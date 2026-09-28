# Pay Tool: Manual Follow-ups Checklist

**Date:** 2026-09-23. **File:** EDGE Empower® Pay Tool. **Scope:** the two pages `🚀 Latest Features shipped` and `✅ Implemented | Production`, plus the local components they use.
Everything automatable is done (see [pay-tool-typography-audit.md](pay-tool-typography-audit.md) §8–9). This file lists what's left: **(1)** manual Cmd+B fixes, **(2)** design decisions, **(3)** the legacy component inventory. Every ID links straight to the layer in Figma.

---

## 1. Cmd+B overrides to toggle off (42 + 2 related)

**What these are:** text that uses the right EDGE-DS style, but where someone pressed **Cmd+B** (bold on/off) on top of it. Figma keeps that toggle when a style is applied, and the plugin API can't clear it.

**How to fix:** select the text layer (or several at once) and press **Cmd+B** once. The weight snaps back to the style.
**Tip:** the 25 Section Title headings are all in the same state, so multi-select them (e.g. with *Select matching layers*) and press Cmd+B once for all of them.

### 🚀 Latest Features shipped → [Profile & Settings - New Page](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-19789) (12)
`typography/body-xs-italic`, currently Regular italic

| # | Text | Layer |
|---|---|---|
| 1 | Super User | [1538:19979](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-19979) |
| 2 | User | [1538:19981](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-19981) |
| 3 | User | [1538:20003](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20003) |
| 4 | User | [1538:20009](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20009) |
| 5 | User | [1538:20015](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20015) |
| 6 | User | [1538:20027](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20027) |
| 7 | Super User | [1538:20182](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20182) |
| 8 | User | [1538:20184](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20184) |
| 9 | User | [1538:20206](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20206) |
| 10 | User | [1538:20215](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20215) |
| 11 | User | [1538:20224](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20224) |
| 12 | User | [1538:20239](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20239) |

⚠️ After the toggle these become **SemiBold Italic** (the style's weight), slightly heavier than today. The designer made them lighter on purpose. If you want them to stay Regular italic, tell me and they can go to a new `body-xs-regular-italic` style instead.

### 🚀 Latest Features shipped → [Filters on Outlier Analysis table](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20408) (3)
`typography/body-sm`, currently Bold, inside the legacy `Accordion_EDGE - Filters` instances

| # | Text | Layer |
|---|---|---|
| 1 | Filters applied | [1538:20431](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20431) |
| 2 | Filters applied | [1538:20455](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20455) |
| 3 | Filters applied | [1538:20488](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20488) |

Result: Regular. If it should stay emphasised, switch the style to `body-sm-bold` after toggling. Better still, replace the legacy accordion (§3).

### 🚀 Latest Features shipped → [Pay Gap Remediation Plan](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-23608) (7)
`typography/heading-sm` in **Section Title** instances, currently Bold

| # | Text | Layer |
|---|---|---|
| 1 | Remediation planning | [1844:23626](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-23626) |
| 2 | Remediation planning | [1844:23776](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-23776) |
| 3 | Overview | [1844:23905](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-23905) |
| 4 | Remediation scenarios | [1844:23932](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-23932) |
| 5 | Overview | [1844:23988](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-23988) |
| 6 | Remediation planning | [1844:24023](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-24023) |
| 7 | Inputs | [1844:24172](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-24172) |

### 🚀 Latest Features shipped → [Pay Gap Remediation Plan](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-23608) (1)
`typography/body-md`, currently Bold and underlined (a link)

| # | Text | Layer |
|---|---|---|
| 1 | 18 | [1844:23907](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-23907) |

Toggle only the bold and keep the underline.

### ✅ Implemented | Production → [RESULTS](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1224-8967) (18)
`typography/heading-sm` in **Section Title** instances, currently Bold

| # | Text | Layer |
|---|---|---|
| 1 | EU Pay Transparency | [1538:14670](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-14670) |
| 2 | EU Pay Transparency | [1538:14945](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-14945) |
| 3 | EU Pay Transparency Reporting | [833:5803](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=833-5803) |
| 4 | Remediation planning | [1844:16496](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-16496) |
| 5 | Overview | [1844:16625](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-16625) |
| 6 | Remediation scenarios | [1844:16652](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-16652) |
| 7 | Overview | [1844:16708](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-16708) |
| 8 | CSRD Reporting | [784:6506](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=784-6506) |
| 9 | CSRD Reporting | [1538:14507](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-14507) |
| 10 | Summary statistics | [784:6386](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=784-6386) |
| 11 | Additional statistics | [784:6419](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=784-6419) |
| 12 | Summary statistics | [784:6451](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=784-6451) |
| 13 | Additional statistics | [784:6437](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=784-6437) |
| 14 | Summary statistics | [925:5964](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=925-5964) |
| 15 | Additional statistics | [925:5975](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=925-5975) |
| 16 | Summary statistics | [1224:9517](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1224-9517) |
| 17 | Additional statistics | [1224:9528](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1224-9528) |
| 18 | Employee-level results | [784:6500](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=784-6500) |

### ✅ Implemented | Production → [RESULTS](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1224-8967) (1)
`typography/body-md`, currently Bold and underlined (a link)

| # | Text | Layer |
|---|---|---|
| 1 | 18 | [1844:16627](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-16627) |

Toggle only the bold and keep the underline.

**Total: 42 Cmd+B toggles** (Latest Features 23, Implemented 19).

### Related, but not a Cmd+B case (2)
On ✅ Implemented | Production → [SETUP](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1224-8966): the bullet glyphs "•" at [122:6329](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=122-6329) and [122:6344](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=122-6344) use `body-md` with a **Bold Italic** font override. That's a real font change, not the Cmd+B toggle, and there's no Bold Italic style. **Decision D12** below.

---

## 2. Design decisions for you

None of these have an EDGE-DS equivalent that would keep the design unchanged. Suggested options are in the right-hand column.

| # | What | Where | Count | Options |
|---|---|---|---|---|
| D1 | Filter / remediation labels: Open Sans SemiBold 12 at **220% line height** (26.4px). `body-xs` is 150% (18px) | 🚀 Latest Features shipped: [Filters on Outlier Analysis table](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20408) (12 + 4 inside [Filters Accordion.PayTool](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20667)), [Pay Gap Remediation Plan](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-23608) (8). ✅ Implemented | Production: [RESULTS](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1224-8967) (8, e.g. [1844:16663](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-16663)). Also inside the **Filters Accordion.PayTool** main component | 32 | (a) apply `body-xs` and keep the row height with auto-layout padding/min-height, or (b) keep as it is |
| D2 | "EDGE Empower® Pay Tool" / "Latest updates in…" in Montserrat SemiBold 24 at 116.7% or 150% line height (`heading-sm` is 133.4%) | 🚀 Latest Features shipped: [Login Page](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-16721), [New login](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-19211), [1538:19511](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-19511), [What's new](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-18952), [1538:19172](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-19172). ✅ Implemented | Production: [ACCESS](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=444-9046), [SETUP](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1479-12316), [1479:12536](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1479-12536) | 8 | Apply `heading-sm` (±4px per line); probably fine |
| D3 | "Welcome to the EDGE Empower® Pay Tool": Montserrat **Medium 40** (off-scale) | 🚀 Latest Features shipped: [Country or Global-level](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-16840) (8, e.g. [1538:16849](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-16849)). ✅ Implemented | Production: [ACCESS](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1224-8965) (7, e.g. [1224:8974](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1224-8974)) | 15 | `heading-md` (34 SemiBold) or `heading-lg` (48 SemiBold) |
| D4 | "Table of content": Montserrat Medium 36 | 🚀 Latest Features shipped: [1538:17485](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-17485) in [New instructions](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-17478) | 1 | `heading-md` |
| D5 | Table-of-contents links: Montserrat **Regular 22**, underlined | 🚀 Latest Features shipped: [1538:17487](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-17487) to [1538:17494](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-17494) in [New instructions](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-17478) | 8 | `body-xl` (Open Sans Regular 20) + underline; Montserrat is for headings only |
| D6 | What's-new item titles: Montserrat SemiBold **18** at 160% (off-scale) | 🚀 Latest Features shipped: [What's new - Modal](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-18847) (5, e.g. [1538:18959](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-18959)). ✅ Implemented | Production: [SETUP](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1224-8966) (5, e.g. [1479:12323](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1479-12323)) | 10 | `heading-xs` (Montserrat SemiBold 20) or `body-lg` (Open Sans SemiBold 18) |
| D7 | "EDGE Empower® Pay Tool - Terms & Conditions": Montserrat SemiBold **30** | ✅ Implemented | Production: [1224:9129](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1224-9129) in ACCESS | 1 | `heading-md` (34) |
| D8 | Giant labels: Montserrat Bold **800** ("Latest updates") and **400** ("Oldest", "Newest") | 🚀 Latest Features shipped: [1538:18512](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-18512), [1538:27489](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-27489), [1538:27491](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-27491) ("Oldest -> Newest" frames) | 3 | Looks like canvas annotation, not UI. Leave it, or move it to a doc/annotation style |
| D9 | "You will log in as: Company XYZ…": Open Sans Regular/Bold **10** (below the 12px minimum) | 🚀 Latest Features shipped: [1538:16869](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-16869), [1538:16875](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-16875), [1538:17014](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-17014), [1538:17020](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-17020). ✅ Implemented | Production: [1041:5886](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1041-5886), [1041:5892](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1041-5892) | 6 layers | `body-xs-regular` + `body-xs` (12px), or keep 10px as an exception |
| D10 | Input-tab instructions list: Open Sans Regular/Bold 14 at **125%** line height (`body-sm` is 143%) | 🚀 Latest Features shipped: [1538:18694](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-18694) in [Redesign of the input tab](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-18517) | 1 layer (14 runs) | `body-sm` + `body-sm-bold` (+2.5px per line) |
| D11 | **16px italic**: "List of users", "Active licenses" (Montserrat SemiBold Italic 16); "Edition / License Key / Start at • Expires at" (Open Sans SemiBold Italic 16) | 🚀 Latest Features shipped: [1538:19965](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-19965), [1538:20161](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20161). ✅ Implemented | Production: [122:6320](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=122-6320), [6:12782](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=6-12782), [122:6325](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=122-6325), [122:6328](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=122-6328), [122:6337](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=122-6337), [122:6340](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=122-6340), [122:6343](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=122-6343) | 9 | Shrink to `body-xs-italic` (12), or add a `body-md-italic` style |
| D12 | Bullet "•" in body-md with a Bold Italic override | ✅ Implemented | Production: [122:6329](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=122-6329), [122:6344](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=122-6344) | 2 | Reset to plain `body-md` (the bullet becomes Regular) |
| D13 | Progress value "75%": Open Sans **Regular 18** (body-lg is SemiBold) | 🚀 Latest Features shipped: [1538:16839](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-16839) (Exporting Progress Modal). ✅ Implemented | Production: [1224:9647](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1224-9647) | 2 | `body-lg` (becomes SemiBold) or `body-xl` (20) |
| D14 | "Placeholder for the gif": Open Sans SemiBold 24 | ✅ Implemented | Production: [1041:6025](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1041-6025), [1041:6108](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1041-6108), [1041:6191](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1041-6191) | 3 | Placeholder text; delete or ignore |
| D15 | Underlined / ALL-CAPS text (a style would strip the underline or caps) | ✅ Implemented | Production: "here" link [686:8794](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=686-8794); TOC "Overview 1.1. Gender Salary and Pay gap…" [269:5910](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=269-5910), [925:5943](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=925-5943), [1224:9496](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1224-9496) | 4 | Apply the style, then re-add the underline or caps by hand (acceptable link/caps overrides) |
| D16 | "®" glyphs with their own font: Montserrat Medium 48 (inside titles) and Open Sans Regular 15 caps (Section Title + a Button) | 🚀 Latest Features shipped/✅ Implemented | Production: 33 × Medium 48 (e.g. [1538:17756](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-17756), [1154:12824](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1154-12824)); 5 × Regular 15 (e.g. [784:6338](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=784-6338), [686:8456](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=686-8456)). Also in the **Section Title** main component | 38 | Harmless: the ® is deliberately lighter. Leave it, or bind it to the parent title's style |
| D17 | Filter dropdown option labels (Open Sans Regular 16) inherited from the legacy remote `Filter dropdown` | 🚀 Latest Features shipped: [Filters on Outlier Analysis table](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20408) (15, e.g. [1538:20425](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20425)) | 15 | Fixed automatically if the component is replaced (§3) |
| D18 | **Clipped buttons: "LOG OUT" and "CONFIRM"** show as "OG OUT" / "ONFIRM". The label sits in a 51px "Base" frame inside an 83px `<Button>` that clips (pre-existing, not a typography issue) | 🚀 Latest Features shipped: `<Button>` [1538:16850](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-16850) and [1538:16911](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-16911) in [Country or Global-level](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-16840) | 2 | Reset the instance's size/layout overrides, or swap it for a fresh `<Button>` |

---

## 3. Legacy component inventory

Counts are **top-level instances** on the two pages (nested instances in brackets). Local components all live on the page `🧩 Customised components`.

### 3a. Not from EDGE-DS (remote, from a library that is not EDGE-DS): replace

Verified by component key: none of these exist in the EDGE-DS file (checked the Icons, Alert, Accordion, File Upload, Select and Stepper pages), and `Alert_EDGE` doesn't appear in any currently published library search.

| Component | Instances | Where | Sample | EDGE-DS replacement |
|---|---|---|---|---|
| Alert_EDGE | 11 | 🚀 Latest Features shipped: [Profile & Settings - New Page](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-19789) (4). ✅ Implemented | Production: [TRIAL VERSION](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=347-22514) (7) | [1538:20135](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20135), [1462:13234](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1462-13234) | `<Alert>` |
| Filter dropdown | 15 | 🚀 Latest Features shipped: [Filters on Outlier Analysis table](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20408) | [1538:20425](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20425) | `<Select>` / `<Menu>` (check the pattern) |
| Accordion_EDGE - Filters | 3 | 🚀 Latest Features shipped: [Filters on Outlier Analysis table](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20408) | [1538:20431](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-20431) | `<Accordion>`, or the local Filters Accordion.PayTool |
| FileUploadRounded (icon) | 8 | 🚀 Latest Features shipped: [Redesign of the input tab](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-18517) (6). ✅ Implemented | Production: SETUP (1), TRIAL VERSION (1) | [1538:18583](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-18583), [1247:8802](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1247-8802) | `<Icon>` + an EDGE-DS upload icon |
| ThumbDownRounded / ThumbUpAltRounded / WarningAmberRounded (icons) | 1 each | 🚀 Latest Features shipped: [Feedback Icon](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-16735) | [1538:16756](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-16756), [1538:16757](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-16757), [1538:16760](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1538-16760) | `<Icon>` + EDGE-DS icons |

### 3b. Local to Pay Tool (`🧩 Customised components`): candidates to replace with, or promote into, EDGE-DS

| Component | Main | On these pages | Where | Note |
|---|---|---|---|---|
| Header | [532:4992](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=532-4992) | 57 (93 file-wide) | Most frames on both pages | Typography now fixed. Contains `Connection tag` (57 nested). Compare with EDGE-DS `<AppBar>` |
| Footer | [1154:8087](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1154-8087) | 32 (51 file-wide) | Modal for new inputs, Redesign of the input tab, What's new, Profile & Settings, SETUP | Typography fixed |
| Variable Card | [92:14491](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=92-14491) | 126 | Modal for new inputs, What's new, Profile & Settings (P1); SETUP, TRIAL VERSION (P2) | May duplicate the EDGE-DS **Pay Tool Cards** set. Contains local `Tag` (130 nested); EDGE-DS now has its own `Tag` |
| Section Title | [784:6316](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=784-6316) | 38 | Pay Gap Remediation Plan (P1); RESULTS (P2) | Its instances carry the Cmd+B overrides in §1 |
| Filters Accordion.PayTool | [1488:8224](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1488-8224) | 2 | Filters on Outlier Analysis table | Holds the 220% labels (D1) |
| Edit Variable - Modal | [100:39687](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=100-39687) | 2 | SETUP | Compare with `<Dialog>` |
| Tag/New Variable Card | [92:16395](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=92-16395) | 1 | SETUP | Compare with EDGE-DS Pay Tool Cards (Add Custom Variable Card) |
| Tag | [91:10209](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=91-10209) | 0 (130 nested) | Inside Variable Card | EDGE-DS `Tag` exists now |
| Connection tag | [1442:8559](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1442-8559) | 0 (57 nested) | Inside Header | Compare with `<Status Tag>` / `<Chip>` |

### 3c. EDGE-DS but out of date or used directly

| Component | Instances | Where | Action |
|---|---|---|---|
| `_hidden` (an older published name of the EDGE-DS `_NONPROD_Placeholder2/4` icon) | 86 top-level (+77 nested) | 🚀 Latest Features shipped: [Pay Gap Remediation Plan](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-23608) (70, e.g. [1844:23669](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-23669)). ✅ Implemented | Production: RESULTS (16, e.g. [1844:16537](https://www.figma.com/design/3IfyrignyrbGV1YP9cqLLA/EDGE-Empower%C2%AE-Pay-Tool?node-id=1844-16537)) | Accept the EDGE-DS library update (Assets panel → Updates). These are placeholder icons and probably should be real icons |
| EDGE-DS icons placed directly, not via `<Icon>`: `CheckCircleFilled`, `InfoOutlined` | 14 + 6 | 🚀 Latest Features shipped: Pay Gap Remediation Plan, What's new. ✅ Implemented | Production: RESULTS, SETUP | Optional: wrap in `<Icon>` for size and color control |

> All other components on these pages (`<Icon>`, `<Tab>`, `<Button>`, `<TextField>`, `<FormControlLabel>`, `<Chip>`, `<Divider>`, `<Backdrop>`, Slider parts, `<Status Tag>`, `<Select>`, `<Switch>`, `<Alert>`, `<Fab>`, `<Avatar>`, `<Tooltip>`, `<DesktopDatePicker>`, `Step`, `Step Icon`, and the named EDGE-DS icons) are current EDGE-DS components.
