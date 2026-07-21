// [ARCHIVED - 2026-07] Snapshot of Backdrop.figma.tsx before the 2026-07-21 documentation pass.
// Superseded by: src/components/Backdrop.figma.tsx
// Reason: kept as a point-in-time reference for what the Code Connect mapping looked like
// before the props table was expanded (invisible, transitionDuration, children). The Figma-side
// binding itself (node-id 6586:47112 / component 6643:52207, prop "Open") is unchanged, since
// the underlying Figma component still has no additional variant properties to map. See
// docs/Backdrop_Figma_Web_Audit.md for the full gap analysis.

import { Backdrop, CircularProgress } from '@mui/material';
import figma from '@figma/code-connect';

/**
 * Backdrop Connection
 * Maps the Figma "Backdrop" component to MUI Backdrop.
 * Figma: https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=6586:47112
 */
figma.connect(
  Backdrop,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=6586:47112',
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
