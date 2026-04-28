import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import figma from '@figma/code-connect';

/**
 * FAB Connection
 * Maps the Figma "FAB" component set to MUI Fab.
 * Figma: https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=6556:38207
 */
figma.connect(
  Fab,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=6556:38207',
  {
    props: {
      variant: figma.enum('Form', {
        Circular: 'circular',
        Extended: 'extended',
      }),
      size: figma.enum('Size', {
        Large: 'large',
        Medium: 'medium',
        Small: 'small',
      }),
      color: figma.enum('Color', {
        Primary: 'primary',
        Secondary: 'secondary',
        Error: 'error',
        Success: 'success',
        Info: 'info',
        Warning: 'warning',
      }),
    },
    example: ({ variant, size, color }) => (
      <Fab variant={variant} size={size} color={color}>
        <AddIcon />
        {variant === 'extended' && 'ADD ITEM'}
      </Fab>
    ),
  }
);
