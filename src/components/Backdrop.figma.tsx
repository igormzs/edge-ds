import { Backdrop, CircularProgress } from '@mui/material';
import figma from '@figma/code-connect';

/**
 * Backdrop Connection
 * Maps the Figma "Backdrop" component to MUI Backdrop.
 * Figma component: https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=6643:52207
 * Full documentation canvas (page "     Backdrop✅📃", frame "Backdrop - Documentation"):
 * https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=815:262127
 *
 * Scope note (2026-07-21): the Figma "Backdrop" component (6643:52207) is an unmodified MUI
 * Community library import - a flat rectangle with a single color fill and no variant
 * properties. `Open` is the only real property to map. Web-only capabilities with no Figma
 * counterpart yet - `invisible` (Transparent / click-catcher), blur/frost via `sx`, inverted
 * light-scrim via `sx`, `transitionDuration` - are documented on the canvas above (Web
 * Properties + Token Matrix sections) and in src/app/styleguide/backdrop/page.tsx +
 * docs/Backdrop_Figma_Web_Audit.md, instead of being faked here. Revisit this file once a real
 * Style/Visibility variant set exists in Figma (see the canvas's "Figma Variant Refactor
 * Pending" callout).
 */
figma.connect(
  Backdrop,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=6643:52207',
  {
    props: {
      open: figma.boolean('Open'),
    },
    example: ({ open }) => (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    ),
  }
);
