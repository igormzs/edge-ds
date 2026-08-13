# EDGE-DS Color, Palette & Token Deep Audit

**Built 2026-08-12.** Scope: every color-bearing layer of the system — Figma's `EDGE palette` and `MUI palette` variable collections (file `EDGE Design System - New` / library `EDGE-DS - Documentation`, fileKey `fLQNXhHQhKBZzWnJGtUcwn`) cross-checked directly against `src/theme/brandTheme.ts`. Triggered by an explicit ask: developers are starting to consume colors *now*, and the deliverable needs to be correct and free of hidden MUI coupling, not just "good enough."

**Bottom line up front: this is not yet bulletproof, and it is not yet MUI-independent.** The Figma side (`EDGE palette`) is in genuinely good shape structurally. The code side (`brandTheme.ts`) is the weak link — it is still, today, built directly on top of MUI's own stock color library, not an EDGE-owned one. That is the single biggest thing to fix before telling developers "these are our colors."

---

## 1. What's actually solid (don't rebuild this)

- **Three-tier model is real and mostly followed:** `Brand/*` → `Semantic/*` → `Components/{Name}/*`, confirmed by direct inspection of dozens of live variables, not just the doc that describes it.
- **`Brand/Primary/*` and `Brand/Secondary/*` are full, real 10-step ramps** (50/100/200/300/400/500/600/700/800/900), each with dedicated `active`/`subtle` extensions in code (`colors.edgeTurquoise`, `colors.edgeBlue`). This is the pattern every other color family should be following and isn't yet (see §3).
- **`Semantic/Status/*` is a genuinely complete family**: `Error/Warning/Info/Success` each have `Main`, `Text`, `Icon`, `Border` — plus a `Neutral` status variant (`Border`, `Text`) for the true-grey status case the dev guide already documents. This is good, real coverage, not a partial build.
- **`Semantic/Surface/*`, `Semantic/Border/*`, `Semantic/Overlay/*`, `Semantic/State/*` all resolved as expected** (`Paper`, `Default`, `Subtle`, `Disabled`, `Divider`, `Focus`, `Strong`, `Subtle`, `Scrim`, `Hover`, `Active`, `Disabled`) — this is the tier developers will reach for most, and it's populated.
- **Component-level token discipline is real, not cosmetic** — spot-checked `<Chip>`'s full master (896 nodes, confirmed "fully migrated" in project history) directly via `get_variable_defs`: every one of its 32 color bindings across 7 colors × 2 variants resolves to a named `Components/Chip/*` token, zero raw unnamed fills. When this project says a component is migrated, that claim held up under direct re-verification.
- **The `docs/color-tokens-guide.md` mental model (three tiers, "pick by name not by tier") is the right teaching frame** — keep it, just patch the two inaccuracies in §4 below.

---

## 2. Critical gap #1 — the code is still MUI's color library wearing an EDGE label

This is the top priority. `src/theme/brandTheme.ts` line 3:

```ts
import { red, blue, amber, grey, blueGrey, green, lightBlue, orange } from '@mui/material/colors';
```

...and then, line 219:

```ts
export const colors = {
  red, blue, amber, grey, blueGrey, green, lightBlue, orange,   // <- raw MUI, unmodified
  edgeTurquoise: { /* ...real, owned, 10-step ramp... */ },
  edgeBlue: { /* ...real, owned, 10-step ramp... */ },
  overlay: { /* ... */ },
};
```

`colors` is described in the code's own comment as a "Unified Color Warehouse," implying everything downstream is deliberately sourced. In reality it's two different things stapled together: two real EDGE-owned scales, and eight entire MUI stock palettes passed through with no ownership at all. Then the theme's actual palette pulls straight from the MUI half for every status color:

| Palette role | Code source | What this actually is |
|---|---|---|
| `error.main` | `colors.red[700]` | MUI's own red 700, unmodified |
| `error.dark` | `colors.red[800]` | MUI's own red 800 |
| `warning.main` | `colors.orange[800]` | MUI's own orange 800 |
| `success.main` | `colors.green[800]` | MUI's own green 800 |
| `success.dark` | `colors.green[900]` | MUI's own green 900 |
| `info.dark` | `colors.blue[900]` | MUI's own blue 900 |
| `text.disabled` | `colors.grey[500]` | MUI's own grey 500 |
| `grey` (whole palette) | `colors.grey` | MUI's grey scale, unmodified, exposed as `theme.palette.grey` |
| `action.selected/disabled/disabledBackground` | `colors.grey[100/500/300]` | MUI grey |
| `surface.default/disabled/subtle` | `colors.grey[50/300/100]` | MUI grey |

This isn't a one-off. A repo-wide scan of `brandTheme.ts` found **54 separate call sites** referencing `colors.{red,blue,green,amber,grey}[shade]` across the base palette and the per-component `styleOverrides` (Alert/Chip/Badge status-color blocks especially). None of them touch the new Figma `Brand/Error/500`, `Brand/Warning/500`, `Brand/Info/500`, `Brand/Success/500` primitives at all (see §3 — those primitives exist now but code was never updated to consume them).

**Why this matters concretely, not just philosophically:** if MUI ships a palette revision in a future major version (they have done this before — the v4→v5 grey/red scale shifted several shades), every status color and every neutral in this entire design system silently shifts with it, with zero signal in this codebase that anything changed. "Not attached to MUI" currently only holds for two colors out of the whole palette (teal and blue-grey). Everything else — error, warning, info, success, every grey, the divider, disabled states — is MUI's opinion, not EDGE's.

**Fix:** give every color family the same treatment `edgeTurquoise`/`edgeBlue` already got — a real, owned, named scale with explicit hex values (seeded from the *current* rendered values so nothing visually changes on ship day), then delete the `@mui/material/colors` import entirely. This is a mechanical, low-risk change: freeze current hex output first (screenshot/diff pass), replace `colors.red[700]` → `colors.edgeError[700]` (etc.) 1:1, confirm zero visual diff, then remove the import. I'd suggest doing this as its own PR before anything else in this doc, since every other fix downstream assumes this warehouse is trustworthy.

---

## 3. Critical gap #2 — status-color primitives exist in Figma now, but only as a single shade each

Good news first: the Brand-tier gap the project's own migration notes have flagged since Autocomplete (`Brand/*` only had `Primary`/`Secondary`/`White`) has been **partially closed** — `Brand/Error/500`, `Brand/Warning/500`, `Brand/Info/500`, `Brand/Success/500` now exist in the `EDGE palette` collection. This wasn't in any status doc I could find; worth someone updating the migration-status memory.

But: targeted lookups for `Brand/Error/700`, `/900`, and the equivalent Warning/Success shades all came back empty. **Only one shade per status color exists** — no ramp, unlike Primary/Secondary's real 10-step build. This is architecturally inconsistent, and it's not just a completeness gap — it's actively insufficient for what components need. Chip's own confirmed-migrated master needs *two* distinct reds (`#c62828` default, `#f44336` hover), *two* distinct ambers, blues, greens — i.e., every status family needs at least a default/hover pair, ideally more. With only one Brand-tier shade to alias from, Chip's `Components/Chip/{Status}/Filled/BG/{Default,Hover}` tokens have no primitive to point at for the second shade, so they (and Semantic/Status/* generally, based on every sample I pulled) are **unnamed literal hex values that happen to match MUI's own red/amber/blue/green 500/800 shades** — not aliases to anything EDGE owns. The three-tier "never skip a level, never hardcode" rule this file's own conventions insist on is being violated for literally every status color in the system, by design, because there's nothing to alias to.

**Fix:** build out `Brand/Error`, `Brand/Warning`, `Brand/Info`, `Brand/Success` (and ideally `Brand/Neutral`, see §4) to the same 50–900 ramp shape Primary/Secondary already have, seeded from the values already live in Chip's migrated master (they're real, already-in-use, already-approved shades — this is documentation, not new design work). Then rebind `Semantic/Status/*` to alias those ramps instead of standing as literals. This closes the single largest "why is this hardcoded" pattern recurring across every per-component migration entry in this project's history (Autocomplete, Badge, Checkbox, Radio, Select, List — every one of them hit this same wall independently and each shipped its own literal workaround because no primitive existed).

---

## 4. Critical gap #3 — still no neutral/grey/black Brand primitive at all

This is a pre-existing, previously-documented gap (see project memory) — confirmed still open today, and confirmed to be **actively growing**, not stable. Every one of these real, currently-shipping tokens carries some form of the same disclaimer in its own description field, found via direct lookup:

- `Components/List/ListItem/Hover` — *"Literal value, no existing Brand/Black primitive to alias against"*
- `Components/List/ListItem/Focus` — same disclaimer, plus explicitly *not* shared with the numerically-identical `Semantic/Border/Divider` because they're different visual roles
- `Components/Radio/Icon/Default` — *"no Brand-tier neutral primitive exists to alias through"*
- `Components/Backdrop/Fill/Blur`, `/Inverted` (referenced from code comments) — same class

Every future component that needs a neutral (non-brand-colored) icon, border, or overlay hits this same wall and mints its own one-off literal. That's not a bug in any single component — it's the predictable output of not having the primitive. Right now there is no single place that says "this is EDGE's black" or "this is EDGE's grey scale" — Figma has a slowly-growing pile of independently-declared black-at-N% literals, and code (§2) just imports MUI's `grey` wholesale instead.

**Fix:** add `Brand/Neutral/{50...900}` (or `Brand/Black` + opacity-scale, whichever the design ramp already implies from the literals in use — `#000000` at 4%/6%/9%/12%/23%/38%/42%/70% opacity steps are already de facto standardized across List/Select/Input/MenuItem/Radio) as a real primitive family, then retrofit the existing literal tokens to alias it. This is the same fix as §3, same shape, different color family — worth doing in the same pass since both are "we kept hardcoding because nothing existed to point at."

---

## 5. Gap #4 — two live variable collections, and developers can't tell them apart at a glance

The file still carries a full second collection, `MUI palette`, published in the *same* library (`EDGE-DS - Documentation`) as the clean `EDGE palette` collection — confirmed live: `primary/main`, `primary/dark`, `text/primary`, `text/secondary`, `text/disabled`, and a full `background/paper-elevation-0` through `-13`+ ladder all still resolve today.

Per this project's own migration tracker, only roughly half of ~40 components have been fully migrated off this legacy collection as of the last status update. That means for any component a developer opens that *hasn't* had its pass yet, Dev Mode / Code Connect will hand them a `MUI palette`-collection variable — and it is visually and nominally indistinguishable from an `EDGE palette` one unless you specifically check the collection name in the panel. `text/primary` (legacy) and `Semantic/Text/Primary` (clean) render identically today, so nothing *looks* wrong — but only one of them is the token that's supposed to survive long-term, and a developer with no context has no way to know which is which.

**Fix, in order of effort:** (1) at minimum, rename the legacy collection to something unambiguous like `⚠️ MUI palette (legacy, being migrated off)` so it's self-flagging in every picker; (2) better, hide it from publishing/consumption once the remaining components are migrated, so it stops being visible to consuming files entirely; (3) track a hard completion date so "developers starting now" aren't building against a moving target that's silently deprecated under them component-by-component.

---

## 6. Gap #5 — `Documentation/*` tokens live in the same collection as real product tokens

`Documentation/Header/BG`, `/Surface/Page`, `/Text/Muted`, `/Border/Subtle`, `/Flag/Warning-Text` are real, confirmed tokens in the `EDGE palette` collection — but they exist purely to skin the Figma Gallery/Documentation *pages themselves* (dark headers, muted captions on the internal spec sheets), not anything that ships in the product. They sit in the exact same namespace, same collection, same picker as `Semantic/*` and `Components/*`. A developer skimming the token list with no context could reasonably mistake `Documentation/Text/Muted` for a legitimate app-level "muted text" semantic token — it isn't; `Semantic/Text/Secondary`/`Tertiary` are the real ones for that.

**Fix:** no code impact (these were never meant to be consumed by the app), but worth a one-line callout in the developer-facing color guide: "if you see a `Documentation/*` token, it's Figma-internal chrome, not a product token — ignore it."

---

## 7. Gap #6 — `brandTheme.ts` isn't internally consistent about where a color "lives"

Some palette values are properly routed through the `colors` warehouse (`colors.edgeTurquoise[500]`, `colors.red[700]`, etc.); others are bare literals dropped straight into `baseTheme.palette` with a comment citing their Figma token instead of an actual named export:

```ts
text: {
  primary: '#212121',              // Semantic/Text/Primary
  secondary: 'rgba(0, 0, 0, 0.6)', // no Figma citation at all
  disabled: colors.grey[500],      // Semantic/Text/Disabled -> #9e9e9e
},
background: {
  default: '#ffffff',
  paper: '#ffffff',
},
divider: 'rgba(0, 0, 0, 0.12)',    // duplicates Semantic/Border/Divider by value, not by reference
info: { main: '#0057b2' },         // "from Figma variables" — a literal, not a warehouse entry
```

This means there is no single object a developer (or a build script) can import to get "just the EDGE colors" independent of MUI's `createTheme` machinery — the values are split between `colors.*` and scattered inline literals, and some of the most-used values in the entire app (body text color, page background, the divider) aren't named exports at all. It also means `Semantic/Border/Divider`'s Figma value and this `divider` literal can silently drift apart in the future with no compiler or lint signal, since nothing ties them together by reference.

**Fix:** once §2/§3/§4 give every color family a real home in `colors`, move every remaining bare literal in `baseTheme.palette` into `colors` too (e.g. `colors.edgeNeutral.text.primary`, `colors.edgeNeutral.divider`), so `colors` genuinely is the single warehouse it already claims to be in its own comment — and so it can be exported and consumed by non-MUI contexts (a design-token JSON export, a Tailwind config, a non-MUI micro-frontend) without dragging `createTheme` along for the ride. That last point is really what "not attached to MUI" should mean in practice: the *values* should be usable with zero MUI dependency, even though this particular app happens to consume them via MUI's theming API.

---

## 8. Two small doc corrections while this is fresh

`docs/color-tokens-guide.md` §5 currently says: *"There's currently a real gap in the `Brand/*` tier: no neutral/grey primitive family exists (only `Primary`, `Secondary`, and `White`)."* This is now half-stale — `Brand/Error/500`, `/Warning/500`, `/Info/500`, `/Success/500` exist (§3), even though they're single-shade and not yet wired as real aliases anywhere. Worth a quick edit so the guide doesn't undersell what's actually there, while still flagging the ramp-completeness gap accurately.

---

## 9. Recommended order of work

1. **§2 first, standalone PR:** replace the raw `@mui/material/colors` import with owned `edgeError`/`edgeWarning`/`edgeInfo`/`edgeSuccess`/`edgeNeutral` scales in `colors`, seeded 1:1 from current rendered values (zero visual diff). This is the load-bearing fix — everything else compounds on top of it.
2. **§3 + §4 together in Figma:** build the missing `Brand/{Error,Warning,Info,Success}` ramps and `Brand/Neutral` primitive, then rebind the existing literal `Semantic/*` and `Components/*` tokens that are currently flagged "no primitive to alias against" onto them.
3. **§7:** finish consolidating `brandTheme.ts`'s stray literals into `colors` once the primitives exist to back them.
4. **§5:** one-line clarification in the dev guide about `Documentation/*` tokens.
5. **§8:** patch the one stale sentence in `color-tokens-guide.md`.
6. **§6 (collection hygiene):** rename or restrict the legacy `MUI palette` collection once remaining component migrations land — lower urgency than 1–3, but it's the thing most likely to bite a developer picking a token blind today.

Steps 1–3 are what actually earns the word "bulletproof" — until then, roughly a third of this palette (every status color, every neutral) is MUI's design decision wearing EDGE's naming, one library upgrade away from moving without anyone noticing.
