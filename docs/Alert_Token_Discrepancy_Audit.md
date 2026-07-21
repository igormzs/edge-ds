# Alert Component Token & Color Discrepancy Audit

**Scope:** Standard (light) variant, all four severities (Success, Info, Warning, Error)
**Figma source:** `EDGE Design System - New` (`fLQNXhHQhKBZzWnJGtUcwn`), page `Alert`, `SEVERITIES` section, live instances of the real `<Alert>` component (verified via Desktop Bridge, node fills read directly)
**Web source:** `src/theme/brandTheme.ts` (palette) + installed `@mui/material/Alert/Alert.js` (styling formula). No `MuiAlert` entry exists in `brandTheme.ts`'s `components` block, so the web Alert renders with **zero custom overrides** — 100% stock MUI computation.
**Status:** No canvas edits made. Analysis only, per your instruction.

## 1. Token & HEX comparison

| Severity | Property | Figma Value / Token | Web Value / Token | Delta / Observation |
| :--- | :--- | :--- | :--- | :--- |
| Success | Background | `#c8e6c9` (`components/alert/success/background` → `green/100`) | `#eef5ef` (computed: `lighten(palette.success.light, 0.9)`) | Figma is a flat swatch step; Web is a 90%-toward-white blend. Figma reads visibly greener/darker. |
| Success | Text | `#1b5e20` (`components/alert/success/color` → `green/900`) | `#233c24` (computed: `darken(palette.success.light, 0.6)`) | Both dark green, close in value; Figma is a touch more saturated. Minor drift. |
| Success | Icon | `#2e7d32` (`success/main` → `green/800`) | `#2e7d32` (`palette.success.main` = `green[800]`) | **Exact match.** |
| Info | Background | `#bbdefb` (`components/alert/info/background` → `blue/100`) | `#ebf2f9` (computed: `lighten(palette.info.light, 0.9)`) | Same pattern — Figma swatch vs. Web blend. Largest visual gap of the four (info.main is a saturated custom blue, `#0057b2`). |
| Info | Text | `#0d47a1` (`components/alert/info/color` → `blue/900`) | `#14304d` (computed: `darken(palette.info.light, 0.6)`) | Figma's `blue/900` is a brighter, more saturated navy than Web's near-black-blue. |
| Info | Icon | `#0057b2` (`info/main`, variable named `blue/700` but its stored value has been overridden to the brand's custom info color) | `#0057b2` (`palette.info.main`, set explicitly in `brandTheme.ts`) | **Exact match** — confirms the override was applied correctly for icon, but the same override was never propagated to the background/text tokens. |
| Warning | Background | `#ffe0b2` (`components/alert/warning/background` → `orange/100`) | `#fef3eb` (computed: `lighten(palette.warning.light, 0.9)`) | Same swatch-vs-blend pattern. |
| Warning | Text | `#ef6c00` (`components/alert/warning/color`, name implies `orange/900` but **renders as `orange/800`**, i.e. identical to the icon) | `#613714` (computed: `darken(palette.warning.light, 0.6)`) | Two issues stacked here: the swatch-vs-blend drift, **plus** an internal Figma bug — Warning's text token resolves to the same value as its icon token, unlike Success/Info/Error where text and icon are visibly distinct shades. |
| Warning | Icon | `#ef6c00` (`warning/main` → `orange/800`) | `#ef6c00` (`palette.warning.main` = `orange[800]`) | **Exact match.** |
| Error | Background | `#fecdd2` (`components/alert/error/background` → `red/100`, ~`#ffcdd2` canonical, 1-unit rounding) | `#fceeee` (computed: `lighten(palette.error.light, 0.9)`) | Same swatch-vs-blend pattern. |
| Error | Text | `#b71c1c` (`components/alert/error/color` → `red/900`) | `#582424` (computed: `darken(palette.error.light, 0.6)`) | Figma's `red/900` is a vivid brick red; Web's is a muted, near-neutral dark red. |
| Error | Icon | `#d32f2f` (`error/main` → `red/700`) | `#d32f2f` (`palette.error.main` = `red[700]`) | **Exact match.** |
| All | Border (standard variant) | N/A — no stroke on any Standard instance | N/A — MUI's `standard` variant sets no border | Not applicable to this variant; flagged only for completeness. |

## 2. Root cause analysis

**This is not a hardcoded-color problem, and it is not a dark-mode leak.** I confirmed via the Desktop Bridge that every Standard-variant Alert instance is bound to a named variable in the `MUI palette` collection (not a raw/detached fill), and that the collection's active mode is `Light` — the rendered hex values match the Light-mode branch of every variable's `valuesByMode` exactly, ruling out an accidental Dark-mode binding. There's also no alpha/opacity involved: every fill is `opacity: 1`, solid. So the three hypotheses in the brief (hardcoded palette, dark-mode leak, alpha mismatch) are all ruled out by direct inspection.

The actual cause is a **methodology mismatch between the two environments**:

Figma's `components/alert/{severity}/background` and `/color` tokens are bound to fixed steps on the raw MUI color ramp — step **100** for background, step **900** for text, on the 50–900 scale (`green/100`, `blue/100`, `orange/100`, `red/100` for background; `green/900`, `blue/900`, `orange/900`, `red/900` for text). These are static swatches chosen once and pinned into the token graph.

The web implementation never pins a swatch at all. `brandTheme.ts` only defines `main` (and `dark` for three of the four colors) per severity — it never sets `.light`. MUI's `createTheme` auto-derives the missing `.light` shade as `lighten(main, 0.2)` at runtime, and then `Alert.js` derives the actual rendered background/text from *that* derived shade: `backgroundColor = lighten(light, 0.9)` and `color = darken(light, 0.6)`. Two chained percentage-blends against white/black, starting from an auto-computed intermediate — nothing in that chain touches a fixed swatch step.

Because MUI's blend formula lightens 90% of the way to white, its output is always going to land much closer to white than any 100-level swatch on a 50–900 ramp, regardless of which brand colors are involved. That's the entire discrepancy: **Figma encodes "Alert color" as a token position on a fixed scale; Web encodes it as a formula over the brand's main color.** They were never going to agree unless someone deliberately reconciled them, and nothing in either codebase currently does that.

One secondary, unrelated bug surfaced during inspection: Warning's text token (`components/alert/warning/color`) renders identically to Warning's icon token (`orange/800`, `#ef6c00`) instead of the darker `orange/900` its name implies. Every other severity has a clearly distinct text vs. icon shade; Warning does not. This looks like a stale/misrouted variable alias inside the `MUI palette` collection itself, independent of the Figma-vs-Web question — worth a quick fix regardless of which remediation direction you pick below.

## 3. Proposed remediation plan (not yet executed)

Two directions get you to 1:1 parity; they produce visually different results, so the choice is a design call, not just an engineering one:

**Option A — Make Figma match the Web formula (recommended if Web is the source of truth).** Compute `lighten(main, 0.2)` → `lighten(that, 0.9)` for background and `darken(that, 0.6)` for text, per severity, and set those as new static values on the *existing* semantic tokens (`components/alert/{severity}/background` / `/color`) — same token names, corrected values, so nothing that already consumes them needs to change. This keeps the icon tokens (`success/main`, `info/main`, etc.) untouched since those already match exactly. New values, computed above: Success bg `#eef5ef` / text `#233c24`; Info bg `#ebf2f9` / text `#14304d`; Warning bg `#fef3eb` / text `#613714`; Error bg `#fceeee` / text `#582424`.

**Option B — Make Web match Figma's swatch convention (recommended if the more saturated look is actually the desired brand direction, and Web silently drifted from it).** Add an explicit `MuiAlert` entry to `brandTheme.ts`'s `components` block with `styleOverrides.standardSuccess/Info/Warning/Error`, hardcoding `backgroundColor`/`color` to the `X/100` / `X/900` swatch values Figma already uses. This is the smaller code change but means Alert would be the one MUI component in the system that doesn't use the dynamic-lighten pattern.

Either way, the same-pass fix for the Warning text/icon collision (from section 2) should happen alongside: re-point `components/alert/warning/color`'s alias to the swatch that actually matches its name (`orange/900`) rather than whatever it's currently resolving to.

I have not touched the canvas or the theme file. Let me know which direction you want (or a hybrid), and I'll execute it.
