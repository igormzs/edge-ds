# Backdrop

**Status:** Documented 2026-07-21. Web implementation is stable and unchanged (stock `@mui/material/Backdrop`, no breaking prop changes). A Figma documentation canvas now exists; the underlying Figma variant set is still a known gap - see [Figma & Code Tokens Matrix](#figma--code-tokens-matrix) and `docs/Backdrop_Figma_Web_Audit.md`.
**Web source:** `src/app/styleguide/backdrop/page.tsx` · **Code Connect:** `src/components/Backdrop.figma.tsx` · **Figma:** `EDGE Design System - New` (`fLQNXhHQhKBZzWnJGtUcwn`), page `     Backdrop✅📃`, baseline component `6643:52207`, documentation canvas `815:262127`.

---

## 1. Overview & Anatomy

Backdrop is the dimming layer used to bring emphasis to a particular element or region by fading
everything else behind it. It signals a state change in the application - most commonly loading,
or a modal/drawer taking over the interaction - and it's the layer that `Modal`, `Dialog`, and
`Drawer` all compose internally rather than something those components reimplement themselves.

**Primary use cases**

- Full-screen loaders (`Backdrop` + `CircularProgress`, used standalone, no Modal).
- The scrim behind a `Dialog` or `Modal` (composed automatically - you rarely instantiate this
  case directly).
- The scrim behind a temporary `Drawer`.
- A transparent click-catcher for dismissing menus/popovers without visually dimming the page.

**Anatomy** - Backdrop has no internal composed structure; it is best understood as a three-layer
stack rather than a component tree:

1. **App content** - stays mounted in the DOM behind the scrim, dimmed but (unless wrapped in a
   `Modal`) not made inert.
2. **Scrim / blur container** - a fixed, full-viewport layer, positioned above content via
   `z-index`. This is the actual `<Backdrop>` element.
3. **Centered content slot** - whatever is passed as `children`: a spinner for a loader, or a
   `Dialog`'s `<Paper>` when composed inside `Modal`.

---

## 2. Component API & Props Table

| Prop | Type | Default | Figma variant counterpart | Description |
| :--- | :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` (required) | **None.** No Visible/Hidden variant exists on the Figma component today. | Mounts the backdrop and fades it in/out. |
| `invisible` | `boolean` | `false` | **None.** | Renders a fully transparent backdrop that still captures pointer events - the *Transparent / click-catcher* variant. |
| `onClick` | `func` | - | **None.** | Click handler. Its presence is what makes a given usage *Dismissible*; omitting it makes it *Persistent*. |
| `transitionDuration` | `number \| { enter?: number, exit?: number }` | `{ enter: 225, exit: 195 }` | N/A (static canvas, expected asymmetry) | Fade transition timing, in milliseconds. |
| `children` | `ReactNode` | - | **None.** Figma's node has no content slot. | Content centered inside the overlay. |
| `component` | `ElementType` | `"div"` | N/A | Root element override. |
| `sx` | `SxProps<Theme>` | - | **None.** | System prop. Currently the *only* way to reach Blur/Frost and Inverted/Light Scrim - see below. |

### Style variants (usage patterns, not separate props)

| Variant | How it's achieved | Notes |
| :--- | :--- | :--- |
| Default (Dark Scrim) | `<Backdrop open={open} />` | Matches Figma's `components/backdrop/fill` token exactly (`rgba(0,0,0,0.5)`), see token matrix below. |
| Blur / Frost | `sx={{ backgroundColor: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(6px)' }}` | No dedicated prop or design token yet - ad hoc per usage. |
| Transparent / Click-catcher | `invisible` prop | Dedicated, first-class prop. |
| Inverted / Light Scrim | `sx={{ backgroundColor: 'rgba(255,255,255,0.6)' }}` | For dark-surface contexts. No dedicated prop or token. |

### Interactivity

| Pattern | How it's achieved |
| :--- | :--- |
| Dismissible | Pass an `onClick` handler (typically `() => setOpen(false)`). |
| Persistent / Modal-bound | Omit `onClick`; require an explicit action (e.g. a Cancel button, or `Modal`'s own `onClose`) to close. |

---

## 3. Figma & Code Tokens Matrix

| Property | Figma | Web | Status |
| :--- | :--- | :--- | :--- |
| Overlay color/opacity | `components/backdrop/fill` variable (`MUI palette` collection, Light & Dark modes identical) = `rgba(0, 0, 0, 0.5)` | MUI's stock hardcoded default = `rgba(0, 0, 0, 0.5)` | **Values match, but the wiring doesn't.** `brandTheme.ts` has no `MuiBackdrop` entry, so the web side isn't actually reading the Figma token - it's coincidentally the same because neither side has customized it yet. |
| Backdrop blur | No property or effect exists on the Figma node | `sx={{ backdropFilter: 'blur(Npx)' }}`, no standard radius | **Gap.** No design token backs any specific blur value on either side. |
| Transitions (duration/easing) | N/A - static canvas | `transitionDuration = { enter: 225, exit: 195 }` | Expected platform asymmetry, not a defect. |
| Z-index stacking | N/A | `theme.zIndex.modal` / `theme.zIndex.drawer + 1`, set per usage via `sx` | No dedicated backdrop-specific stacking token in `brandTheme.ts`. |
| Visibility / Style / Interactivity variants | **None exist.** The Figma component is a single, unmodified MUI Community library swatch with zero variant properties. | Fully expressed via `open`, `invisible`, `onClick`, and `sx` | **Structural gap**, not a value mismatch - see `docs/Backdrop_Figma_Web_Audit.md` for the full write-up and a proposed variant-set plan (deferred, not built this pass). |

---

## 4. Accessibility (a11y) Guidelines

A bare `<Backdrop>` is a purely visual/pointer-capture layer. It intentionally does **not**
provide modal-grade accessibility on its own - that behavior lives in `Modal`, `Dialog`, and
`Drawer`, which compose Backdrop internally. Reach for one of those whenever the content behind
the backdrop needs to become inert; use a standalone `<Backdrop>` only for non-modal cases like a
full-page loading state.

- **Focus management.** `Backdrop` does not trap focus inside its children or restore focus to
  the trigger element on close. `Modal` does both automatically. If you use Backdrop standalone,
  you are responsible for focus handling yourself (usually not needed for a loader with no
  focusable content).
- **ARIA attributes.** Backdrop carries no ARIA role - it's presentational
  (`aria-hidden` is not applied by Backdrop itself). `Modal` applies `aria-hidden` to sibling app
  content and `aria-modal="true"` to the dialog element. A standalone loading Backdrop should get
  its own `aria-live="polite"` region for the loading message, plus `aria-hidden` on sibling
  content if you want screen readers to skip it while loading.
- **Keyboard interaction (Escape).** Escape-to-close is handled by `Modal`'s `onClose` (fired with
  reason `"escapeKeyDown"`), not by Backdrop. A standalone Dismissible Backdrop only responds to
  pointer/touch via `onClick`; add your own `keydown` listener if Escape needs to close a
  non-Modal usage.
- **Scroll-lock mechanics.** Backdrop does not lock `body` scroll. `Modal` applies scroll lock
  automatically (disable via `disableScrollLock`). For a standalone full-screen Backdrop, lock
  scroll manually (e.g. toggle `overflow: hidden` on `document.body`) for the duration it's open.

---

## 5. Usage & Code Examples

### Basic usage

```tsx
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const [open, setOpen] = useState(false);

return (
  <div>
    <Button onClick={() => setOpen(true)}>Show Backdrop</Button>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={() => setOpen(false)}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </div>
);
```

### Customized backdrop - blur, transparent, inverted

```tsx
// Blur / Frost - no dedicated design token yet, applied via sx
<Backdrop
  open={open}
  sx={{
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(6px)',
  }}
/>

// Transparent / click-catcher - dedicated MUI prop, closes on outside click
// without ever painting a visible scrim
<Backdrop
  open={open}
  invisible
  onClick={() => setOpen(false)}
/>

// Inverted / light scrim - for dark-surface contexts
<Backdrop
  open={open}
  sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
/>
```

### Integration with Modal / Drawer

```tsx
// Backdrop rarely ships alone in production - Modal/Dialog/Drawer already
// compose it for you, and only THEY provide focus trapping, aria-hidden on
// the rest of the app, Escape-to-close, and scroll lock.
import Modal from '@mui/material/Modal';

<Modal
  open={open}
  onClose={() => setOpen(false)}
  slotProps={{
    backdrop: {
      sx: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    },
  }}
>
  <Box sx={{ /* positioned dialog content */ }}>
    ...
  </Box>
</Modal>
```

---

## References

- Legacy documentation: `docs/archive/components/backdrop/` (archived 2026-07-21).
- Full 1:1 parity audit: `docs/Backdrop_Figma_Web_Audit.md`.
- EDGE-DS documentation standard: `docs/DOCUMENTATION_STANDARDS.md`.
- Live styleguide page: `src/app/styleguide/backdrop/page.tsx`.
