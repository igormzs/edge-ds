import { Divider } from '@mui/material';
import figma from '@figma/code-connect';

/**
 * Divider Connection
 * Maps the Figma "Divider" component set to MUI Divider.
 * Figma: https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=6589:48662
 */
figma.connect(
  Divider,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=6589:48662',
  {
    props: {
      orientation: figma.enum('Orientation', {
        Horizontal: 'horizontal',
        Vertical: 'vertical',
      }),
    },
    example: ({ orientation }) => (
      <Divider orientation={orientation} />
    ),
  }
);
