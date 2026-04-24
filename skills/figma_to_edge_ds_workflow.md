# Skill: End-to-End Figma → EDGE DS Styleguide Workflow

## Overview
This skill documents the full process of taking a Figma component design and
producing a documented, deployed EDGE Design System page. Always read this skill
at the start of any "add/document component from Figma" task.

## Related Skills
- `figma_mcp_connection.md` — how to connect to the local Figma MCP server
- `edge_ds_component_page.md` — how to author a styleguide page

---

## Phase 1: Understand the Figma Structure

### 1.1 Open the Figma file
Each component page in the EDGE Design System Figma file typically has two layers:
- **`MUI original component`** — the baseline MUI Figma spec sheet showing all states
  and variants that ship with the MUI component.
- **`<ComponentName>_EDGE`** — the EDGE-customised version. This can be:
  - A visual override (different colours, radius, indicator position)
  - A brand-new layout pattern (e.g. Tabs_EDGE = vertical settings nav)
  - A subset of variants that EDGE uses

### 1.2 Use the Figma MCP to get structured data
Follow `figma_mcp_connection.md`. The `get_figma_data` call with `depth: 3` returns:
- Node names and types
- Fill colours (hex)
- Stroke widths and colours
- Typography (font family, weight, size, letter spacing)
- Spacing (padding, gap)
- Border radius

### 1.3 Use the Figma browser view as a supplement
When the MCP data is sparse or you need pixel-perfect visual reference, open the
Figma URL in a browser_subagent and take screenshots at various zoom levels:
- **11% zoom** — full page overview, layer structure visible
- **50% zoom** — see all states/variants at once
- **100% zoom** — read exact labels, check indicator positions, see state differences

### 1.4 Key things to extract
For every component, extract:

| Item | Where to look |
|---|---|
| Variant names & values | Layer panel → component set → property labels |
| States | Hover, Selected, Disabled, Focused sub-frames |
| Active/indicator colour | The coloured bar/underline/background on selected state |
| Text colours | Per-state text colour in design panel |
| Background fills | Panel or canvas hover for bg colour |
| Typography | Right panel: font name, weight, size, line height, tracking |
| Spacing | Right panel: padding top/right/bottom/left, gap |
| Border radius | Right panel: corner radius |
| Icon support | Whether the component accepts a leading/trailing icon |
| Orientation | Horizontal vs vertical layout |

---

## Phase 2: Map Figma → MUI Props & Theme Overrides

### 2.1 Identify the MUI component(s)
Most EDGE components directly wrap MUI components. Check:
- https://mui.com/material-ui/all-components/ for the full component list
- The Figma layer name usually matches the MUI component name

### 2.2 Map design decisions to code
| Figma finding | Code location |
|---|---|
| Changed indicator colour | `brandTheme.ts` → `MuiTabs.styleOverrides.indicator` |
| Changed text colour | `brandTheme.ts` → `MuiTab.styleOverrides.root['&.Mui-selected']` |
| Changed border radius | `brandTheme.ts` → `MuiComponent.styleOverrides.root.borderRadius` |
| New layout pattern (like vertical tabs) | `sx` prop in the doc page demo component |
| New variant not in MUI | TypeScript declaration merging + `variants` array in theme |

### 2.3 EDGE-specific conventions
- **Indicator colour**: always `primary.main` = `#009f9b`
- **Hover background (primary)**: `rgba(0,159,155,0.06)` i.e. `edgeTurquoise.subtle`
- **Text transform**: `none` for Tabs, Chips, and most interactive labels
- **Font weight selected**: `600` (Open Sans SemiBold)
- **Vertical indicator (Tabs_EDGE)**: moves to `left: 0`, width `3px`

---

## Phase 3: Author the Styleguide Page

See `edge_ds_component_page.md` for the full template.

### Quick section mapping from Figma to docs

| Figma content | Styleguide DocSection |
|---|---|
| Component set table (all variants/states) | "Basic …" + "States" sections |
| Variant: size=small/medium/large | "Sizes" section |
| Variant: color=primary/secondary/etc | "Semantic Colors" section |
| Variant: disabled | included in "States" |
| _EDGE layout (vertical nav, custom panel) | "ComponentName_EDGE" section |
| Props listed in Figma component props | "Key Props" PropsTable |
| Example usage patterns | "Usage" CodeBlock |

---

## Phase 4: Add Theme Overrides

Open `src/theme/brandTheme.ts`:
1. Add `Mui<ComponentName>` blocks **before** `MuiCheckbox` (maintains alpha order)
2. Reference `baseTheme.palette.*` and `baseTheme.typography.*` for all values
3. Never hard-code hex colours that already exist as palette tokens

---

## Phase 5: Build & Deploy

```bash
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
cd "/Users/IgorMenezes/AI Projects/EDGE DS"

# 1. Build first — catches TypeScript and parse errors before deploying
npm run build

# 2. If build passes, deploy to production
npx vercel --prod
```

URL: **https://edge-ds.vercel.app**

### Common build errors & fixes

| Error | Fix |
|---|---|
| `Expected ',', got 'ident'` | Apostrophe inside single-quoted string → use double quotes |
| `Type '...' is not assignable to type 'CSSObject'` | Wrap value in `as unknown as string` or use `sx` prop instead |
| `Module not found: '@mui/icons-material/...'` | Verify exact icon name at https://mui.com/material-ui/material-icons/ |

---

## EDGE Design System Figma File Reference

| Item | Value |
|---|---|
| File URL | `https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New` |
| File Key | `fLQNXhHQhKBZzWnJGtUcwn` |
| MCP server | `http://127.0.0.1:3845` |

### Node IDs for documented components

| Component | Figma node-id |
|---|---|
| Tabs | `6579-45052` |
| Checkbox | (see Figma pages list → Checkbox) |

> Add new component node IDs here as they are documented.
