# [ARCHIVED - 2026-07] Backdrop legacy documentation

Archived 2026-07-21 as part of the EDGE-DS documentation pass that brought `Backdrop` up to the
current standard (`docs/DOCUMENTATION_STANDARDS.md` content requirements; the Figma canvas rebuild
itself was deferred, see `docs/Backdrop_Figma_Web_Audit.md`).

## What changed

No breaking prop changes. `Backdrop` is a stock, unmodified MUI component on the web side, and no
prop was renamed, removed, or given a new default. This was a documentation-coverage rebuild, not
a component API change:

- The legacy page (`backdrop-page.tsx`, archived here) documented one demo ("Example Usage") and a
  four-row Key Props table covering `open`, `onClick`, `sx`, `transitionDuration`.
- It did not document `invisible` (the transparent / click-catcher variant), had no Style Variants
  section (Default scrim, Blur/Frost, Transparent, Inverted), no Interactivity section
  (Dismissible vs. Persistent), no accessibility guidance, and no Figma/code token mapping.
- The new page (`src/app/styleguide/backdrop/page.tsx`) and the standalone reference doc
  (`docs/components/Backdrop.md`) close all of these gaps.

## Files archived here

- `[ARCHIVED - 2026-07] backdrop-page.tsx` - the pre-rebuild styleguide page.
- `[ARCHIVED - 2026-07] backdrop-figma-connect.tsx` - the pre-rebuild Code Connect mapping
  (functionally identical to the current one; archived for point-in-time reference only).

## Known token / parity gaps carried forward (not fixed by this pass)

See `docs/Backdrop_Figma_Web_Audit.md` for the full write-up. Summary:

1. The Figma "Backdrop" component (node `6643:52207`) is a raw, unmodified MUI Community library
   import - a flat rectangle with a single color fill and zero variant properties. It does not
   structurally support Style Variants, Visibility states, or Interactivity as real Figma variants.
2. `brandTheme.ts` has no `MuiBackdrop` override - the web scrim color happens to match Figma's
   `components/backdrop/fill` token (`rgba(0,0,0,0.5)`) only because both independently landed on
   MUI's stock default, not because either side reads the other's token.
3. No blur/frost design token exists anywhere in the system yet; the web "Blur/Frost" variant is
   applied ad hoc via `sx={{ backdropFilter: 'blur(...)' }}` with no backing token.
