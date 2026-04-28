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
