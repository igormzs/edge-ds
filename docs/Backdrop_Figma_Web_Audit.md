# Backdrop Component 1:1 Figma-to-Web Parity Audit

**Figma source:** `EDGE Design System - New` (`fLQNXhHQhKBZzWnJGtUcwn`), page `     Backdrop✅📃`, baseline component `Backdrop` (node `6643:52207`), documentation canvas `Backdrop - Documentation` (node `815:262127`, built from the master template `751:165195` then detached to nest the Token Matrix and callout content inside the Specs & Accessibility Notes card - see note in §5), referenced via `Backdrop.figma.tsx`.
**Web source:** `@mui/material/Backdrop` (stock MUI) + `src/theme/brandTheme.ts` (no `MuiBackdrop` entry exists in the `components` block - the web Backdrop renders with zero custom overrides, 100% stock MUI).
**Status:** 2026-07-21 - documentation canvas built (Visual Variants showcasing the real baseline component, Web Properties reference section, Key Props table, Token Matrix + "Figma Variant Refactor Pending" callout in Specs & Accessibility Notes). No fabricated Figma variant components were created - the underlying `Backdrop` component (`6643:52207`) is untouched. Orientation and Sizing sections hidden (not applicable to this component).

## 1. Master component structure

| Dimension | Figma | Web | Verdict |
| :--- | :--- | :--- | :--- |
| Node type | A bare `COMPONENT`: one `100x100` rectangle, no auto-layout, no children | `position: fixed`, full-viewport overlay (`inset: 0`) with a `children` slot | **Gap.** Figma has no auto-layout frame representing the fixed overlay/z-index stack; it is a static color swatch dropped into a demo composition, not a documented component in its own right. |
| Provenance | Untouched import from the MUI Community Figma library (the page still carries the original `© mui.com` / `MUI for Figma Material UI v5.14.0` footer text) | EDGE-DS-maintained `.tsx` styleguide page | The Figma asset was never adapted into an EDGE-DS-owned component the way Alert, Accordion, Autocomplete, etc. were. |
| Slot / content-container behavior | None - no slot node, no child-alignment rules | `children` render centered by default (`display: flex; align-items: center; justify-content: center` in MUI's base styles) inside the overlay | **Gap.** Nothing in Figma models where child content (e.g. a spinner or a Dialog) sits relative to the backdrop. |
| Scroll lock on `body` | N/A (static tool) | **Not provided by `<Backdrop>` itself.** Scroll lock is a `Modal`/`Dialog`/`Drawer` behavior (`disableScrollLock` prop on those components) - a bare `<Backdrop open>` does not lock scroll on its own | Documented explicitly in the new page's Accessibility section so consumers don't assume a standalone Backdrop is safe to use for a true modal without wrapping it in `Modal`. |

## 2. Design tokens & theme variables

| Token | Figma value | Web value | Verdict |
| :--- | :--- | :--- | :--- |
| Overlay color/opacity | `components/backdrop/fill` = `rgba(0, 0, 0, 0.5)` (identical in both `Light` and `Dark` modes, `MUI palette` collection) | MUI's stock default, hardcoded in `@mui/material/Backdrop` styles: `rgba(0, 0, 0, 0.5)` | **Visually matches, but coincidentally.** `brandTheme.ts` never reads `components/backdrop/fill` or defines an equivalent CSS variable - the web value is MUI's out-of-the-box default, not a value sourced from the Figma token. If either side changes independently (e.g. Figma's token gets restyled for a brand refresh), the two will silently drift with nothing to catch it. |
| Backdrop blur | **Does not exist.** No blur property, effect, or variable on the Figma component | **Does not exist either**, but is achievable ad hoc via `sx={{ backdropFilter: 'blur(4px)' }}` - no first-class prop, no design token backs a specific blur radius | **Gap on both sides**, but asymmetric: Web can express it per-instance with zero design-system support; Figma cannot express it at all. Recommend a future `blur-sm` / `backdrop-blur` token (flagged, not created in this pass - no reliable "official blur value" exists to standardize on yet). |
| Transitions (duration/easing) | N/A - Figma is a static canvas; no motion tokens are modeled here, consistent with how every other component's docs treat this (a platform limitation, not a gap) | `transitionDuration = { enter: 225, exit: 195 }` (MUI default, `Fade` easing) | Not a discrepancy - expected asymmetry, not flagged as a gap. |

## 3. Variants & states

| Requested axis | Figma | Web | Verdict |
| :--- | :--- | :--- | :--- |
| Visibility (`Visible` / `Hidden`) | No variant property - the node is always "on" | `open` boolean prop controls mount/unmount + fade transition | **Gap.** No way to preview a "Hidden" state in Figma; it's implicit (the layer would just be toggled off/deleted). |
| Style variants - Default (Dark Scrim) | The one thing the component does render | `open` with no other props - default `rgba(0,0,0,0.5)` | Matches (see §2). |
| Style variants - Blur / Frost | Not representable (no blur token/effect) | `sx={{ backdropFilter: 'blur(Npx)' }}` | **Gap**, Web-only capability. |
| Style variants - Transparent / Click-catcher | Not representable as a distinct variant | `invisible` boolean prop - renders a fully transparent backdrop that still captures pointer events (used for click-outside-to-close patterns without a visible scrim) | **Gap**, Web-only capability. This is the one requested variant that already has a clean, dedicated MUI prop. |
| Style variants - Inverted / Light Scrim | Not representable | `sx={{ backgroundColor: 'rgba(255,255,255,0.6)' }}` override | **Gap**, Web-only capability, no dedicated prop (achieved via `sx`, same as Blur/Frost). |
| Interactivity - Dismissible vs. Persistent | Not representable (no boolean/variant property) | Consumer-controlled: passing `onClick` makes it dismissible; omitting it makes it persistent. Not a prop on `Backdrop` itself, but a usage pattern | Not really a Figma "gap" so much as a modeling choice - documented as a usage pattern in the new page rather than expected as a Figma toggle. |

## 4. Root cause

The Figma "component" was never actually built out for EDGE-DS. It's the raw MUI Community library asset, left as-is inside an example composition (a mock dialog-over-backdrop scene, complete with the original MUI Figma-kit attribution footer) rather than promoted to a documented, variant-ized part of the system the way `Button`, `Alert`, `Accordion`, and the navigation components were. Every other component in this system that has a real Style Variants / States section in its docs also has a real Figma variant set backing it; Backdrop does not yet have that variant set to draw from.

## 5. Recommendation / what was built

The Figma documentation canvas (`815:262127`) is now built on the `     Backdrop✅📃` page, but it does **not** fabricate illustrative Figma swatches for variants that don't structurally exist. It showcases the one real baseline component (`6643:52207`) in the Visual Variants section, hides Orientation/Sizing (not applicable), and uses plain reference content - not fake variant instances - for the Web Properties, Token Matrix, and "Figma Variant Refactor Pending" callout.

**Master-template link note:** the canvas was originally instantiated from `751:165195` (per `docs/DOCUMENTATION_STANDARDS.md`), then detached to a plain frame on 2026-07-21 so the Token Matrix and callout content could be nested directly inside the Specs & Accessibility Notes card - Figma's plugin API refuses `appendChild` into any frame nested inside a live instance, and the Specs card has no slot to receive new content (unlike Visual Variants/Orientation/Sizing/Interactive States, which do). Detaching only affected this one page; the shared master (`751:165195`) and every other component's documentation canvas built from it are untouched. The tradeoff: this page will no longer auto-inherit future structural changes to the master (e.g. a new note-slot addition) the way a live instance would - if the master gains a real "additional notes" slot down the line, this page would need that section rebuilt by hand.

Recommended follow-up, when there's appetite for it: build a real `Backdrop` variant set in Figma (`Style` = Default / Blur / Transparent / Inverted, `Visibility` = Visible / Hidden), bind its fill to `components/backdrop/fill` (already correct at `rgba(0,0,0,0.5)`), and then replace the Visual Variants section's single baseline instance with the real variant matrix. Until that variant set exists, the canvas correctly documents what's real today rather than inventing structure to match code.
