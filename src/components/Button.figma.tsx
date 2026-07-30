import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import figma from '@figma/code-connect';

/**
 * Button Connection
 * Maps the Figma `<Button>` component set (Size x Color x State x Variant,
 * 297 real variants - see the "Button - Component Gallery" frame) to MUI
 * Button.
 *
 * `State` is not a code prop - it mixes two real props (Disabled, Loading)
 * with two pure CSS pseudo-states (Hovered, Focused) that need no prop at
 * all, so it's mapped twice below: once to derive `disabled`, once to
 * derive `loading`. `Inherit` and `Inherit (white)` are two Figma variants
 * for the same `color="inherit"` code prop - the "(white)" variant only
 * exists to preview Inherit legibly against a dark surface in Figma, it is
 * not a separate code value.
 *
 * `fullWidth` has no Figma-side representation (no variant/property drives
 * it), so it is intentionally left unmapped here rather than faked.
 *
 * Figma: https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=6543:36744
 */
figma.connect(
  Button,
  'https://www.figma.com/design/fLQNXhHQhKBZzWnJGtUcwn/EDGE-Design-System---New?node-id=6543:36744',
  {
    props: {
      variant: figma.enum('Variant', {
        Contained: 'contained',
        Outlined: 'outlined',
        Text: 'text',
      }),
      color: figma.enum('Color', {
        Primary: 'primary',
        Secondary: 'secondary',
        Error: 'error',
        Warning: 'warning',
        Info: 'info',
        Success: 'success',
        Inherit: 'inherit',
        'Inherit (white)': 'inherit',
      }),
      size: figma.enum('Size', {
        Large: 'large',
        Medium: 'medium',
        Small: 'small',
      }),
      disabled: figma.enum('State', {
        Enabled: false,
        Hovered: false,
        Focused: false,
        Disabled: true,
        Loading: false,
      }),
      loading: figma.enum('State', {
        Enabled: false,
        Hovered: false,
        Focused: false,
        Disabled: false,
        Loading: true,
      }),
      startIcon: figma.boolean('Start Icon', {
        true: <SendIcon />,
        false: undefined,
      }),
      endIcon: figma.boolean('End Icon', {
        true: <DownloadIcon />,
        false: undefined,
      }),
      label: figma.textContent('Label'),
    },
    example: ({ variant, color, size, disabled, loading, startIcon, endIcon, label }) => (
      <Button
        variant={variant}
        color={color}
        size={size}
        disabled={disabled}
        loading={loading}
        startIcon={startIcon}
        endIcon={endIcon}
      >
        {label}
      </Button>
    ),
  }
);
