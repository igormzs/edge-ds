import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import figma from '@figma/code-connect';

/**
 * Dialog Connection
 * Maps the Figma "Dialog" component set to MUI Dialog.
 * Figma: https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=6586:47137
 */
figma.connect(
  Dialog,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=6586:47137',
  {
    props: {
      open: figma.boolean('Open'),
    },
    example: ({ open }) => (
      <Dialog open={open}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is a description of the dialog content. It can contain text, forms, or other components.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>Cancel</Button>
          <Button variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>
    ),
  }
);
