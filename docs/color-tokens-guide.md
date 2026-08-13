# EDGE-DS Color Tokens: A Guide for Developers

**Audience:** engineers consuming EDGE-DS in application code (not the Figma migration process — see `docs/figma-component-structure.md` for that).

**Goal:** understand *why* colors are structured the way they are, and how to pick the right one when building a component or a page.

---

## 0. Figma is the source of truth — always

Every color and token in EDGE-DS originates in Figma. `brandTheme.ts`, Storybook, and any other code-side representation exist to *reflect* Figma — never to define it, and never to correct it.

**If Figma and code ever disagree, the fix follows Figma's value. Never the reverse.** Don't "fix" a Figma variable to match a value that happens to already be in code, and don't treat a code comment, a hardcoded swatch, or `brandTheme.ts` itself as evidence that Figma is wrong. When you find a divergence: check what Figma actually resolves to first, then bring code into line with it.

This applies to reading this project's own history, too — any past entry that reads as "correcting" a Figma value to match code should be understood as a mistake to avoid repeating, not a precedent. `brandTheme.ts` has never been, and should never become, the reference used to judge whether a Figma value is right.

---

## 1. The core idea: three tiers, never skip one

Every color in EDGE-DS — in Figma and in code — lives in one of three tiers. Each tier only ever points *down* to the one below it. Nothing in a finished component should ever be a raw hex value.

```
Brand/*              Raw brand primitives.
                      "What color is our teal?" — one answer, one place.
                      e.g. Brand/Primary/500, Brand/Secondary/500, Brand/White

Semantic/*            Purpose-based tokens that alias Brand primitives.
                      "What color is body text?" — not "what color is grey/900?"
                      e.g. Semantic/Text/Primary, Semantic/Surface/Paper,
                           Semantic/Status/Error/Text, Semantic/Border/Divider

Components/{Name}/*   Component-scoped tokens that alias Semantic (or occasionally
                      Brand) tokens.
                      "What color is a Chip's Primary filled background?"
                      e.g. Components/Chip/Primary/Filled/BG/Default
```

**Why it matters as a dev:** if the brand teal ever changes, it changes in exactly one place (`Brand/Primary/500`) and flows downward automatically through every `Semantic/*` and `Components/*` token that aliases it. You should never need to know the hex value of anything — only its *name*, because the name tells you its purpose.

**The rule:** pick the token whose *name* matches what you're doing, not the tier that happens to be "closest" or easiest to reach. Need a component-specific color? Look for a `Components/*` token first. Building something generic (a custom surface, a piece of body copy)? Reach for `Semantic/*`. Only reach for `Brand/*` directly if you are the one defining a new Semantic or Component token — application code almost never does this.

---

## 2. How this maps into our actual code

Figma's three tiers have a direct, deliberate parallel in `src/theme/brandTheme.ts`. If you've understood the Figma structure above, you already understand the code:

| Figma tier | Code equivalent | What it looks like |
|---|---|---|
| `Brand/*` | the `colors` object — a "unified color warehouse" merging stock MUI palettes (`red`, `blue`, `grey`, `amber`, `green`...) with our own custom scales (`edgeTurquoise`, `edgeBlue`) | `colors.edgeTurquoise[500]` |
| `Semantic/*` | `baseTheme.palette.*` — MUI's theme palette, populated from `colors` | `theme.palette.primary.main`, `theme.palette.text.primary`, `theme.palette.surface.default` |
| `Components/{Name}/*` | `brandTheme`'s per-component `styleOverrides` (`MuiButton`, `MuiChip`, `MuiBadge`, `MuiAlert`, ...) — these reference `baseTheme.palette.*`, never raw hex | `containedPrimary: { backgroundColor: baseTheme.palette.primary.main }` |

```
Brand/*             →  colors.edgeTurquoise / colors.edgeBlue / colors.red / ...
Semantic/*           →  baseTheme.palette.{primary,text,surface,action,divider,...}
Components/{Name}/*  →  brandTheme.components.Mui{Name}.styleOverrides
```

### What this means day to day

- **Building a page or a one-off layout?** Use `theme.palette.*` (the Semantic tier) via `sx` or `styled()`. e.g. `sx={{ color: 'text.secondary', bgcolor: 'surface.subtle' }}`.
- **Building or modifying an EDGE-DS component itself?** Its colors belong in `brandTheme.ts`'s `components.Mui{Name}.styleOverrides`, referencing `baseTheme.palette.*` — never a literal hex, never a raw MUI import color used directly.
- **Never write a hex code inline in application code.** If you don't see a token that fits, that's a signal to raise it (see §4), not to hardcode.

---

## 3. Quick reference

| I need... | Use this (code) | Figma equivalent |
|---|---|---|
| Brand teal (primary actions) | `theme.palette.primary.main` | `Brand/Primary/500` → `Semantic/*` |
| Secondary brand blue-grey | `theme.palette.secondary.main` | `Brand/Secondary/500` |
| Default body text | `theme.palette.text.primary` | `Semantic/Text/Primary` |
| Muted/secondary text | `theme.palette.text.secondary` | `Semantic/Text/Secondary` |
| Disabled text | `theme.palette.text.disabled` | `Semantic/Text/Disabled` |
| Page background | `theme.palette.background.default` | `Semantic/Surface/Default` |
| Card/panel background | `theme.palette.background.paper` / `theme.palette.surface.paper` | `Semantic/Surface/Paper` |
| A subtle/tinted surface | `theme.palette.surface.subtle` | `Semantic/Surface/Subtle` |
| Divider / hairline border | `theme.palette.divider` | `Semantic/Border/Divider` |
| Hover overlay | `theme.palette.action.hover` | `Semantic/State/Hover` |
| Focus ring/overlay | `theme.palette.action.focus` | `Semantic/State/Focus` |
| Status color (error/warning/info/success) | `theme.palette.{error,warning,info,success}.main` | `Semantic/Status/{Status}/*` |
| A specific component's own color (e.g. Chip's outlined border) | Look in `brandTheme.ts` under that component's `styleOverrides` first | `Components/{Name}/*` |

---

## 4. The five status names — use exactly these

Across both Figma and code, "status" colors always use this exact vocabulary. Note that MUI's own `secondary` is **not** part of this family — it's a distinct brand color, not a neutral status.

| Status | MUI palette slot |
|---|---|
| Error | `error` |
| Warning | `warning` |
| Info | `info` |
| Success | `success` |
| Neutral | *(rare — a true neutral/grey status, distinct from `secondary`)* |

`Primary` (brand teal) and `Secondary` (brand blue-grey) are the two brand colors, handled separately from the five-status family above.

---

## 5. Two things worth knowing before you go looking for a color

**We're mid-migration off a legacy "MUI palette" Figma collection onto the clean "EDGE palette" collection.** If you're implementing a component and its Figma file still shows raw MUI-collection bindings (not `Brand/Semantic/Components` tokens), that component hasn't been migrated yet — don't treat its current raw values as the target spec. Check with design or the migration tracker before matching pixel-for-pixel.

**A fourth tier exists alongside Brand/Semantic/Components: `Neutral/*`.** As of 2026-08-12, EDGE-DS has a dedicated neutral-primitive tier — `Neutral/Grey/50` through `Neutral/Grey/900`, plus `Neutral/Black` and four discrete alpha steps (`Neutral/Black/12`, `/25`, `/50`, `/70`, the exact set already in use — not a free-opacity escape hatch). It's named `Neutral/*`, not `Brand/*`, deliberately: these are utility greys, not brand-identity colors, and `Brand/*` stays reserved for the real brand palette (`Primary`, `Secondary`, `White`). Every `Semantic/*` token that used to be a literal or that borrowed a raw grey from an ungoverned foreign collection now aliases one of these instead — same rule as everywhere else: reach for the named tier, never a literal.

One known drift, deliberately left alone rather than folded into that migration: `Semantic/Text/Secondary` in Figma resolves to a solid `#616161`, while `theme.palette.text.secondary` in code is `rgba(0, 0, 0, 0.6)` (≈`#666666`) — close, but not identical. This predates the `Neutral/*` work and wasn't fixed alongside it on purpose (fixing it would shift every instance of secondary text in Figma slightly darker, and that's a real visual change, not a structural rename). Flagged here so it isn't mistaken for settled; don't "fix" one side to match the other without a deliberate decision first.

**`Icon`-named tokens are also used for background-fill roles — this is intentional, established precedent, not a naming accident.** Chip and Badge both alias their `Filled/BG/Default` (background fill) tokens to `Semantic/Status/{Status}/Icon`, e.g. `Components/Chip/Error/Filled/BG/Default → Semantic/Status/Error/Icon`. There's no dedicated "Fill" or "Surface" role token in the `Semantic/Status/*` family today, so `Icon` — the closest-matching saturated status color already in the tier — gets reused for both jobs. If a third component adopts the same pattern, that's the trigger to revisit minting a real `Semantic/Status/{Status}/Fill` (or `/Surface`) token instead of continuing to overload `Icon`; not before.

---

## 6. Do / Don't

**Do**
- Reach for `theme.palette.*` before anything else.
- Search `brandTheme.ts` for an existing `Components/*`-equivalent override before adding a new one-off style.
- Ask design/check the Figma file when a token doesn't seem to exist yet — it may be a genuine gap, not something to invent.

**Don't**
- Hardcode a hex value in application code (`color: '#212121'`) — even if you found that exact value used elsewhere, use the token, not the literal.
- Import a raw MUI color (`grey[900]`) directly in a component's styling unless you're inside `brandTheme.ts` itself defining a new token.
- Assume a component's current Figma binding is "the truth" if it still points at the legacy `MUI palette` collection — that's an open migration item, not a target to replicate.

---

## 7. Where to look next

- `src/theme/brandTheme.ts` — the actual source of truth for every color used in code.
- `docs/figma-component-structure.md` §5 — the full token-hierarchy rules used when migrating a component's Figma tokens (more detail than this guide, aimed at whoever's doing the Figma-side migration work).
- `docs/web-component-page-pattern.md` — how a component's styleguide page should be documented once its tokens are settled.
