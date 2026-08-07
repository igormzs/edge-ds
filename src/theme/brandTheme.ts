import { createTheme, alpha } from '@mui/material/styles';
import type { CSSProperties } from 'react';
import { red, blue, amber, grey, blueGrey, green, lightBlue, orange } from '@mui/material/colors';

const MONTSERRAT = '"Montserrat", sans-serif';
const OPEN_SANS = '"Open Sans", sans-serif';

/**
 * EDGE typography scale — single source of truth.
 * Montserrat for headings/display; Open Sans for body text.
 */
export const edgeTypography = {
  'display-lg': {
    fontFamily: MONTSERRAT,
    fontSize: 96,
    fontWeight: 700,
    lineHeight: 1.167,
    letterSpacing: -1.44,
  },
  'heading-xl': {
    fontFamily: MONTSERRAT,
    fontSize: 60,
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: -0.9,
  },
  'heading-lg': {
    fontFamily: MONTSERRAT,
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: -0.48,
  },
  'heading-md': {
    fontFamily: MONTSERRAT,
    fontSize: 34,
    fontWeight: 600,
    lineHeight: 1.235,
    letterSpacing: -0.34,
  },
  'heading-sm': {
    fontFamily: MONTSERRAT,
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.33,
    letterSpacing: -0.12,
  },
  'heading-xs': {
    fontFamily: MONTSERRAT,
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: -0.1,
  },
  'body-lg': {
    fontFamily: OPEN_SANS,
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 1.56,
    letterSpacing: 0,
  },
  'body-md': {
    fontFamily: OPEN_SANS,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: 0,
  },
  'body-sm': {
    fontFamily: OPEN_SANS,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: 0.06,
  },
  'body-xs': {
    fontFamily: OPEN_SANS,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: 0.48,
  },
} as const satisfies Record<string, CSSProperties>;

/** Figma `button/label-*` — semi-bold uppercase labels derived from the body scale. */
const buttonLabelSm: CSSProperties = {
  ...edgeTypography['body-xs'],
  fontWeight: 600,
  letterSpacing: 0.6,
  textTransform: 'uppercase',
};
const buttonLabelMd: CSSProperties = {
  ...edgeTypography['body-sm'],
  fontWeight: 600,
  letterSpacing: 0.7,
  textTransform: 'uppercase',
};
const buttonLabelLg: CSSProperties = {
  ...edgeTypography['body-md'],
  fontWeight: 600,
  letterSpacing: 0.8,
  textTransform: 'uppercase',
};

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    filters: true;
  }
}

declare module '@mui/material/Accordion' {
  interface AccordionPropsVariantOverrides {
    filters: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    icon: true;
  }
}

declare module '@mui/material/styles' {
  interface PaletteColor {
    active: string;
    subtle: string;
  }
  interface SimplePaletteColorOptions {
    active?: string;
    subtle?: string;
  }

  interface TypeAction {
    disabledBackground: string;
  }

  interface Palette {
    surface: {
      default: string;
      paper: string;
      disabled: string;
      subtle: string;
    };
  }
  interface PaletteOptions {
    surface?: {
      default?: string;
      paper?: string;
      disabled?: string;
      subtle?: string;
    };
  }

  interface TypographyVariants {
    'display-lg': CSSProperties;
    'heading-xl': CSSProperties;
    'heading-lg': CSSProperties;
    'heading-md': CSSProperties;
    'heading-sm': CSSProperties;
    'heading-xs': CSSProperties;
    'body-lg': CSSProperties;
    'body-md': CSSProperties;
    'body-sm': CSSProperties;
    'body-xs': CSSProperties;
  }

  interface TypographyVariantsOptions {
    'display-lg'?: CSSProperties;
    'heading-xl'?: CSSProperties;
    'heading-lg'?: CSSProperties;
    'heading-md'?: CSSProperties;
    'heading-sm'?: CSSProperties;
    'heading-xs'?: CSSProperties;
    'body-lg'?: CSSProperties;
    'body-md'?: CSSProperties;
    'body-sm'?: CSSProperties;
    'body-xs'?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'display-lg': true;
    'heading-xl': true;
    'heading-lg': true;
    'heading-md': true;
    'heading-sm': true;
    'heading-xs': true;
    'body-lg': true;
    'body-md': true;
    'body-sm': true;
    'body-xs': true;
  }
}

// 1. Unified Color Warehouse
// We merge MUI standard palettes and EDGE custom scales here.
export const colors = {
  red,
  blue,
  amber,
  grey,
  blueGrey,
  green,
  lightBlue,
  orange,
  edgeTurquoise: {
    50: '#e0f3f2',
    100: '#b3e0df',
    200: '#80cccc',
    300: '#07bebe',
    400: '#26b2af',
    500: '#009f9b',
    600: '#00918c',
    700: '#00807b',
    800: '#006f6a',
    900: '#005d60',
    subtle: '#ecfdfe', // Figma/Shared/Subtle
    active: '#0e837d', // Figma/Shared/Active
  },
  edgeBlue: {
    50: '#eceff1',
    100: '#cfd8dc',
    200: '#b0bec5',
    300: '#90a4ae',
    400: '#78909c',
    500: '#5e6e7d',
    600: '#515f6c',
    700: '#455a64',
    800: '#323940',
    900: '#263238',
  },
  overlay: {
    scrim: 'rgba(0, 0, 0, 0.5)', // Semantic/Overlay/Scrim, aliased by Components/Backdrop/Fill/Default
    scrimBlur: 'rgba(0, 0, 0, 0.25)', // Components/Backdrop/Fill/Blur (literal, no Brand-tier black primitive to alias)
    invertedScrim: 'rgba(255, 255, 255, 0.6)', // Components/Backdrop/Fill/Inverted (literal, RGB matches Brand/White but alpha differs)
  },
};

// 2. Strict Semantic Mapping
const baseTheme = createTheme({
  palette: {
    primary: {
      main: colors.edgeTurquoise[500],
      dark: colors.edgeTurquoise[600],
      active: colors.edgeTurquoise.active,
      subtle: colors.edgeTurquoise.subtle,
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.edgeBlue[500],
      dark: colors.edgeBlue[600],
      contrastText: '#ffffff',
    },
    error: {
      main: colors.red[700],
      dark: colors.red[800],
      contrastText: '#ffffff',
    },
    warning: {
      main: colors.orange[800],
      contrastText: '#ffffff',
    },
    info: {
      main: '#0057b2', // from Figma variables
      dark: colors.blue[900],
      contrastText: '#ffffff',
    },
    success: {
      main: colors.green[800],
      dark: colors.green[900],
      contrastText: '#ffffff',
    },
    text: {
      primary: '#212121', // Semantic/Text/Primary
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: colors.grey[500], // Semantic/Text/Disabled -> #9e9e9e
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    grey: colors.grey,
    divider: 'rgba(0, 0, 0, 0.12)',
    action: {
      active: colors.edgeTurquoise.active,
      hover: alpha(colors.edgeTurquoise[300], 0.08),
      selected: colors.grey[100],
      disabled: colors.grey[500],
      disabledBackground: colors.grey[300],
      focus: alpha(colors.edgeTurquoise[300], 0.12),
    },
    surface: {
      default: colors.grey[50], // Semantic/Surface/Default -> fafafa
      paper: '#ffffff',
      disabled: colors.grey[300], // e0e0e0
      subtle: colors.grey[100],
    },
  },
  typography: {
    fontFamily: `${OPEN_SANS}, "Helvetica", "Arial", sans-serif`,
    ...edgeTypography,
    // Legacy MUI aliases — keep existing component overrides working
    h1: edgeTypography['heading-xl'],
    h3: edgeTypography['heading-md'],
    h5: edgeTypography['heading-sm'],
    body1: edgeTypography['body-md'],
    body2: edgeTypography['body-sm'],
    subtitle2: {
      fontFamily: OPEN_SANS,
      fontSize: 12,
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: 0.06,
    },
    button: {
      ...buttonLabelMd,
    },
    caption: edgeTypography['body-xs'],
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
});

const brandTheme = createTheme(baseTheme, {
  components: {
    // Page-level scrollbar hiding, scoped to the two real scrolling
    // regions in the app rather than a blanket `*` selector. `*` would
    // also silently reach into things like code blocks (CodeBlock's
    // horizontal-scroll <pre>) and any future component that legitimately
    // wants a visible scrollbar, and a universal selector with this many
    // `!important` declarations is expensive for the browser to match on
    // every element, every paint. `html`/`body` covers the app's one real
    // page-level scroll (the `main` content area has no overflow of its
    // own — it scrolls via body); the sidebar's own internal scroll region
    // is handled directly on that Box in styleguide/layout.tsx, since
    // that's a specific, identifiable element rather than an unknown one.
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          scrollbarWidth: 'none !important', // Firefox
          msOverflowStyle: 'none !important', // IE, Edge
        },
        'html::-webkit-scrollbar, body::-webkit-scrollbar': {
          display: 'none !important', // Chrome, Safari, Opera
          width: '0px !important',
          height: '0px !important',
          background: 'transparent !important',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          ...buttonLabelMd,
          borderRadius: baseTheme.shape.borderRadius,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
          '&:active': { boxShadow: 'none' },
          '&:focus-visible': { boxShadow: 'none' },
        },
        sizeSmall: {
          ...buttonLabelSm,
          padding: '4px 12px',
          '& .MuiButton-startIcon': {
            marginRight: baseTheme.spacing(1),
            marginLeft: 0,
          },
          '& .MuiButton-endIcon': {
            marginLeft: baseTheme.spacing(1),
            marginRight: 0,
          },
        },
        sizeMedium: {
          ...buttonLabelMd,
          padding: '8px 16px',
          '& .MuiButton-startIcon': {
            marginRight: baseTheme.spacing(1.25),
            marginLeft: 0,
          },
          '& .MuiButton-endIcon': {
            marginLeft: baseTheme.spacing(1.25),
            marginRight: 0,
          },
        },
        sizeLarge: {
          ...buttonLabelLg,
          padding: '10px 16px',
          '& .MuiButton-startIcon': {
            marginRight: baseTheme.spacing(1.25),
            marginLeft: 0,
          },
          '& .MuiButton-endIcon': {
            marginLeft: baseTheme.spacing(1.25),
            marginRight: 0,
          },
        },
        sizeIcon: {
          width: 44,
          height: 44,
          borderRadius: '50%',
          minWidth: 0,
          padding: 0,
          '& > *:nth-of-type(1)': { fontSize: '1.5rem' },
        },
        containedPrimary: {
          backgroundColor: baseTheme.palette.primary.main,
          color: baseTheme.palette.primary.contrastText,
          '&:hover': { backgroundColor: baseTheme.palette.primary.dark },
          '&:active': { backgroundColor: baseTheme.palette.primary.active },
          '&.Mui-disabled': {
            backgroundColor: `${baseTheme.palette.action.disabledBackground} !important` as unknown as string,
            color: `${baseTheme.palette.text.disabled} !important` as unknown as string,
          },
        },
        containedSecondary: {
          backgroundColor: baseTheme.palette.secondary.main,
          color: baseTheme.palette.secondary.contrastText,
          '&:hover': { backgroundColor: baseTheme.palette.secondary.dark },
          '&.Mui-disabled': {
            backgroundColor: `${baseTheme.palette.action.disabledBackground} !important` as unknown as string,
            color: `${baseTheme.palette.text.disabled} !important` as unknown as string,
          },
        },
        containedError: {
          backgroundColor: baseTheme.palette.error.main,
          color: baseTheme.palette.error.contrastText,
          '&:hover': { backgroundColor: baseTheme.palette.error.dark },
          '&.Mui-disabled': {
            backgroundColor: `${baseTheme.palette.action.disabledBackground} !important` as unknown as string,
            color: `${baseTheme.palette.text.disabled} !important` as unknown as string,
          },
        },
        containedWarning: {
          backgroundColor: baseTheme.palette.warning.main,
          color: baseTheme.palette.warning.contrastText,
          '&:hover': { backgroundColor: baseTheme.palette.warning.dark },
          '&.Mui-disabled': {
            backgroundColor: `${baseTheme.palette.action.disabledBackground} !important` as unknown as string,
            color: `${baseTheme.palette.text.disabled} !important` as unknown as string,
          },
        },
        containedInfo: {
          backgroundColor: baseTheme.palette.info.main,
          color: baseTheme.palette.info.contrastText,
          '&:hover': { backgroundColor: baseTheme.palette.info.dark },
          '&.Mui-disabled': {
            backgroundColor: `${baseTheme.palette.action.disabledBackground} !important` as unknown as string,
            color: `${baseTheme.palette.text.disabled} !important` as unknown as string,
          },
        },
        containedSuccess: {
          backgroundColor: baseTheme.palette.success.main,
          color: baseTheme.palette.success.contrastText,
          '&:hover': { backgroundColor: baseTheme.palette.success.dark },
          '&.Mui-disabled': {
            backgroundColor: `${baseTheme.palette.action.disabledBackground} !important` as unknown as string,
            color: `${baseTheme.palette.text.disabled} !important` as unknown as string,
          },
        },
        outlinedPrimary: {
          borderColor: baseTheme.palette.primary.main,
          color: baseTheme.palette.primary.main,
          borderWidth: '1px',
          '&:hover': {
            backgroundColor: baseTheme.palette.primary.subtle,
            borderColor: baseTheme.palette.primary.dark,
            borderWidth: '1px',
          },
          '&:active': {
            borderColor: baseTheme.palette.primary.active,
            color: baseTheme.palette.primary.active,
            borderWidth: '1px',
          },
          '&.Mui-disabled': {
            borderColor: baseTheme.palette.action.disabledBackground,
            color: baseTheme.palette.text.disabled,
            borderWidth: '1px',
          },
        },
        outlinedSecondary: {
          borderColor: baseTheme.palette.secondary.main,
          color: baseTheme.palette.secondary.main,
          borderWidth: '1px',
          '&:hover': {
            backgroundColor: alpha(baseTheme.palette.secondary.main, 0.06),
            borderWidth: '1px',
          },
          '&.Mui-disabled': {
            borderColor: baseTheme.palette.action.disabledBackground,
            color: baseTheme.palette.text.disabled,
            borderWidth: '1px',
          },
        },
        outlinedError: {
          borderColor: baseTheme.palette.error.main,
          color: baseTheme.palette.error.main,
          borderWidth: '1px',
          '&:hover': {
            backgroundColor: alpha(baseTheme.palette.error.main, 0.06),
            borderWidth: '1px',
          },
          '&.Mui-disabled': {
            borderColor: baseTheme.palette.action.disabledBackground,
            color: baseTheme.palette.text.disabled,
            borderWidth: '1px',
          },
        },
        outlinedWarning: {
          borderColor: baseTheme.palette.warning.main,
          color: baseTheme.palette.warning.main,
          borderWidth: '1px',
          '&:hover': {
            backgroundColor: alpha(baseTheme.palette.warning.main, 0.06),
            borderWidth: '1px',
          },
          '&.Mui-disabled': {
            borderColor: baseTheme.palette.action.disabledBackground,
            color: baseTheme.palette.text.disabled,
            borderWidth: '1px',
          },
        },
        outlinedInfo: {
          borderColor: baseTheme.palette.info.main,
          color: baseTheme.palette.info.main,
          borderWidth: '1px',
          '&:hover': {
            backgroundColor: alpha(baseTheme.palette.info.main, 0.06),
            borderWidth: '1px',
          },
          '&.Mui-disabled': {
            borderColor: baseTheme.palette.action.disabledBackground,
            color: baseTheme.palette.text.disabled,
            borderWidth: '1px',
          },
        },
        outlinedSuccess: {
          borderColor: baseTheme.palette.success.main,
          color: baseTheme.palette.success.main,
          borderWidth: '1px',
          '&:hover': {
            backgroundColor: alpha(baseTheme.palette.success.main, 0.06),
            borderWidth: '1px',
          },
          '&.Mui-disabled': {
            borderColor: baseTheme.palette.action.disabledBackground,
            color: baseTheme.palette.text.disabled,
            borderWidth: '1px',
          },
        },
        textPrimary: {
          color: baseTheme.palette.primary.main,
          '&:hover': { backgroundColor: baseTheme.palette.primary.subtle },
          '&:active': { color: baseTheme.palette.primary.active },
          '&.Mui-disabled': { color: baseTheme.palette.text.disabled },
        },
        textSecondary: {
          color: baseTheme.palette.secondary.main,
          '&:hover': { backgroundColor: alpha(baseTheme.palette.secondary.main, 0.06) },
          '&.Mui-disabled': { color: baseTheme.palette.text.disabled },
        },
        textError: {
          color: baseTheme.palette.error.main,
          '&:hover': { backgroundColor: alpha(baseTheme.palette.error.main, 0.06) },
          '&.Mui-disabled': { color: baseTheme.palette.text.disabled },
        },
        textWarning: {
          color: baseTheme.palette.warning.main,
          '&:hover': { backgroundColor: alpha(baseTheme.palette.warning.main, 0.06) },
          '&.Mui-disabled': { color: baseTheme.palette.text.disabled },
        },
        textInfo: {
          color: baseTheme.palette.info.main,
          '&:hover': { backgroundColor: alpha(baseTheme.palette.info.main, 0.06) },
          '&.Mui-disabled': { color: baseTheme.palette.text.disabled },
        },
        textSuccess: {
          color: baseTheme.palette.success.main,
          '&:hover': { backgroundColor: alpha(baseTheme.palette.success.main, 0.06) },
          '&.Mui-disabled': { color: baseTheme.palette.text.disabled },
        },
        startIcon: {
          '& > *:nth-of-type(1)': { fontSize: '1.5rem' },
        },
        endIcon: {
          '& > *:nth-of-type(1)': { fontSize: '1.5rem' },
        },
      },
    },
    MuiAccordion: {
      defaultProps: {
        disableGutters: true,
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: baseTheme.palette.surface.default,
          padding: baseTheme.spacing(3),
          '&:before': {
            display: 'none',
          },
          '&.Mui-disabled': {
            backgroundColor: baseTheme.palette.surface.disabled,
          },
        },
      },
      variants: [
        {
          // "filters" is intentionally a thin variant: it inherits the exact same
          // background, height, padding and border as a standard Accordion row
          // (see MuiAccordion.styleOverrides.root above) — the only difference is
          // the header label color, which uses the active brand teal token to
          // signal an "applied" state. Do not reintroduce custom background/
          // border/height overrides here; that was the legacy pattern this
          // variant replaced (see the Figma Accordion doc's FILTERS VARIANT
          // section, which is now built from the real Accordion + Chip
          // components rather than a bespoke layout).
          props: { variant: 'filters' },
          style: {
            '& .MuiAccordionSummary-content .MuiTypography-root': {
              color: baseTheme.palette.primary.active,
            },
          },
        },
      ],
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0,
          minHeight: 'auto',
          '&.Mui-expanded': {
            minHeight: 'auto',
          },
          '& .MuiAccordionSummary-content': {
            margin: 0,
            '&.Mui-expanded': {
              margin: 0,
            },
          },
        },
        content: {
          '& .MuiTypography-root': {
            ...edgeTypography['body-md'],
            color: baseTheme.palette.text.primary,
          },
          '&.Mui-disabled .MuiTypography-root': {
            color: baseTheme.palette.text.disabled,
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: `${baseTheme.spacing(3)} 0 0 0`,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          // keep indicator on primary color by default
        },
        indicator: {
          backgroundColor: baseTheme.palette.primary.main,
          height: 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: baseTheme.typography.button.fontFamily,
          fontWeight: 600,
          fontSize: '0.875rem',
          letterSpacing: 0.5,
          textTransform: 'none',
          color: baseTheme.palette.text.secondary,
          '&.Mui-selected': {
            color: baseTheme.palette.primary.main,
          },
          '&.Mui-disabled': {
            color: baseTheme.palette.text.disabled,
          },
          '&:hover': {
            color: baseTheme.palette.text.primary,
            opacity: 1,
          },
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: 'primary',
      },
      styleOverrides: {
        root: {
          width: 46,
          height: 46,
          padding: baseTheme.spacing(1.125),
          borderRadius: '50%',
          color: baseTheme.palette.text.primary,
          '& .MuiSvgIcon-root': {
            fontSize: 28,
          },
          '&.Mui-checked': {
            color: baseTheme.palette.primary.main,
          },
          '&.MuiCheckbox-indeterminate': {
            color: baseTheme.palette.primary.main,
          },
          '&:hover': {
            backgroundColor: baseTheme.palette.action.hover,
          },
          '&.Mui-focusVisible': {
            backgroundColor: baseTheme.palette.action.focus,
          },
          '&.Mui-disabled': {
            color: baseTheme.palette.text.disabled,
          },
        },
        sizeSmall: {
          width: 38,
          height: 38,
          padding: baseTheme.spacing(1.125),
          '& .MuiSvgIcon-root': {
            fontSize: 20,
          },
        },
        colorPrimary: {
          '&.Mui-checked': {
            color: baseTheme.palette.primary.main,
          },
          '&.MuiCheckbox-indeterminate': {
            color: baseTheme.palette.primary.main,
          },
        },
      },
    },
    // Custom Switch geometry, matching the EDGE-DS Figma `<Switch>` component
    // set rather than stock MUI's thin-track/small-thumb default. Figma spec
    // (docs/components/Switcher.md): Medium track 58x32, thumb 24x24, 4px
    // inset; Small track 44x22, thumb 18x18, 2px inset.
    //
    // Geometry mechanics (why these exact numbers): MUI's SwitchTrack is a
    // normal-flow flex child, so it always fills root's content box exactly
    // — root padding is set to 0 here so root === the visible track, with no
    // separate (larger) touch-target box. SwitchBase (the thumb's wrapper)
    // is absolutely positioned relative to root's outer edge (root padding
    // does NOT offset it — only switchBase's own padding does), and its
    // rendered box is a (thumb + 2×padding) square. For the thumb to look
    // correctly vertically centered and horizontally inset, that square's
    // side must equal the track height — which is exactly Figma's own
    // relationship (trackHeight = thumbSize + 2×inset: 32 = 24+2×4,
    // 22 = 18+2×2). The checked-state `translateX` distance is then simply
    // `trackWidth − trackHeight` (58−32=26, 44−22=22) so the thumb ends up
    // flush against the opposite edge, mirroring its flush-start rest
    // position. Verified against MUI's own Switch.js source before writing
    // these values, not guessed.
    MuiSwitch: {
      // Stock ripple disabled: hover/focus feedback is the circular Focus
      // Halo below instead, matching Figma's actual mechanism (confirmed
      // live against the file, not the "outline around the Track" the
      // Documentation frame's own copy currently — incorrectly — describes).
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          width: 58,
          height: 32,
          padding: 0,
          overflow: 'visible',
        },
        switchBase: {
          padding: 4,
          '&.Mui-checked': {
            transform: 'translateX(26px)',
          },
          // color="default" (base/unnamed) checked state: BOTH track and
          // thumb go near-black — this is the one specifically-Figma'd
          // exception (confirmed against the real component: the Default
          // color's checked knob is near-black, not white). Named colors
          // (colorPrimary, etc. below) override the thumb rule back to
          // white — MUI applies those slots after these root styles, same
          // resolution order stock Switch.js itself relies on, so the
          // override is reliable regardless of source order here.
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: colors.grey[900],
          },
          '&.Mui-checked .MuiSwitch-thumb': {
            backgroundColor: colors.grey[900],
          },
          // Disabled thumb/track are muted lighter greys regardless of
          // color/checked state, so a disabled switch reads as visibly
          // non-interactive rather than identical to an enabled one.
          '&.Mui-disabled .MuiSwitch-thumb': {
            backgroundColor: colors.grey[200],
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            backgroundColor: colors.grey[100],
            opacity: 1,
          },
          // Focus/Hover Halo: a circle centered behind the Knob, diameter
          // = knob size × 5/3 (24×5/3=40 Medium, 18×5/3=30 Small — exact
          // ratio read off the live Figma ellipse geometry, which is
          // identical at both sizes). Track color never changes on
          // hover/focus — verified via the file's own bound variables,
          // every Track fill (Track/Off, Track/Primary/On, etc.) resolves
          // identically across Enabled/Hovered/Focused. All interactive
          // feedback lives in this halo alone.
          //
          // Base (unchecked, or checked with color="default") halo is
          // black: 8% opacity on Hover, 12% on Focus — exact values read
          // from the Figma asset's own `fill-opacity` (not estimated).
          // Named colors (colorPrimary, etc. below) override both the
          // halo's color AND its opacity scale to 12%/20% for their
          // checked state — also read directly off the Figma asset
          // (Color=Primary, Checked=True: fill-opacity 0.12 Hovered,
          // 0.2 Focused).
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 40,
            height: 40,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#000000',
            opacity: 0,
            pointerEvents: 'none',
            transition: 'opacity 0.15s ease',
          },
          '&:hover::before': {
            opacity: 0.08,
          },
          '&.Mui-focusVisible::before': {
            opacity: 0.12,
          },
          '&.Mui-disabled::before': {
            opacity: '0 !important',
          },
        },
        thumb: {
          width: 24,
          height: 24,
          boxShadow: baseTheme.shadows[1],
          // Off-state (base) thumb fill: grey/50 (#fafafa), matching Figma's
          // `components/switch/knobFillEnabled` token exactly (confirmed
          // live against the file) — not pure white. Every checked named
          // color still overrides this back to pure `#ffffff` via the
          // colorX slots below (per explicit spec: Off = near-white
          // grey/50, checked-colored = pure white); `color="default"`
          // checked keeps the near-black exception via switchBase above.
          backgroundColor: colors.grey[50],
        },
        track: {
          borderRadius: 16,
          // Off-track fill: components/switch/slideFill → grey/400 (#bdbdbd).
          // Deliberately darker than Indeterminate's grey/300 (see
          // slideFillIndeterminate on the IndeterminateSwatch, page.tsx) —
          // Off is a real, determinate choice the user made, Indeterminate
          // is a lighter, "not yet decided" pre-interaction state that can
          // never be returned to once the user acts. slideFill previously
          // routed through Semantic/Surface/Disabled (grey/300) before this
          // flip; it now points directly at grey/400 instead, since "Off"
          // and "Disabled" are different concepts that only coincidentally
          // shared a color before.
          backgroundColor: colors.grey[400],
          opacity: 1, // solid fills throughout, not stock MUI's translucent black/38%
        },
        sizeSmall: {
          width: 44,
          height: 22,
          padding: 0,
          '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
              transform: 'translateX(22px)',
            },
            '&::before': {
              width: 30,
              height: 30,
            },
          },
          '& .MuiSwitch-thumb': {
            width: 18,
            height: 18,
          },
          '& .MuiSwitch-track': {
            borderRadius: 11,
          },
        },
        // Per-color checked-track fills — solid `main`, matching the
        // pattern already established for MuiButton/MuiChip in this theme
        // (resolved brand color, not stock MUI's translucent overlay).
        // Each named color slot also overrides the thumb rule back to white
        // for its checked state, and the Focus Halo's color + opacity scale
        // (12% Hover / 20% Focus, vs the neutral 8%/12% default) for its
        // checked state. `switchBase`'s own `'&.Mui-checked
        // .MuiSwitch-thumb'` rule (above) darkens the thumb for the
        // color="default" case — these slots are resolved AFTER root/base
        // styles by MUI's overridesResolver (ownerState.color !== 'default'
        // appends `styles['color' + capitalize(color)]` last), so this
        // reliably wins regardless of source order here.
        colorPrimary: {
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: baseTheme.palette.primary.main,
          },
          '&.Mui-checked .MuiSwitch-thumb': {
            backgroundColor: '#ffffff',
          },
          '&.Mui-checked::before': {
            backgroundColor: baseTheme.palette.primary.main,
          },
          '&.Mui-checked:hover::before': {
            opacity: 0.12,
          },
          '&.Mui-checked.Mui-focusVisible::before': {
            opacity: 0.2,
          },
        },
        colorSecondary: {
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: baseTheme.palette.secondary.main,
          },
          '&.Mui-checked .MuiSwitch-thumb': {
            backgroundColor: '#ffffff',
          },
          '&.Mui-checked::before': {
            backgroundColor: baseTheme.palette.secondary.main,
          },
          '&.Mui-checked:hover::before': {
            opacity: 0.12,
          },
          '&.Mui-checked.Mui-focusVisible::before': {
            opacity: 0.2,
          },
        },
        colorError: {
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: baseTheme.palette.error.main,
          },
          '&.Mui-checked .MuiSwitch-thumb': {
            backgroundColor: '#ffffff',
          },
          '&.Mui-checked::before': {
            backgroundColor: baseTheme.palette.error.main,
          },
          '&.Mui-checked:hover::before': {
            opacity: 0.12,
          },
          '&.Mui-checked.Mui-focusVisible::before': {
            opacity: 0.2,
          },
        },
        colorWarning: {
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: baseTheme.palette.warning.main,
          },
          '&.Mui-checked .MuiSwitch-thumb': {
            backgroundColor: '#ffffff',
          },
          '&.Mui-checked::before': {
            backgroundColor: baseTheme.palette.warning.main,
          },
          '&.Mui-checked:hover::before': {
            opacity: 0.12,
          },
          '&.Mui-checked.Mui-focusVisible::before': {
            opacity: 0.2,
          },
        },
        colorInfo: {
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: baseTheme.palette.info.main,
          },
          '&.Mui-checked .MuiSwitch-thumb': {
            backgroundColor: '#ffffff',
          },
          '&.Mui-checked::before': {
            backgroundColor: baseTheme.palette.info.main,
          },
          '&.Mui-checked:hover::before': {
            opacity: 0.12,
          },
          '&.Mui-checked.Mui-focusVisible::before': {
            opacity: 0.2,
          },
        },
        colorSuccess: {
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: baseTheme.palette.success.main,
          },
          '&.Mui-checked .MuiSwitch-thumb': {
            backgroundColor: '#ffffff',
          },
          '&.Mui-checked::before': {
            backgroundColor: baseTheme.palette.success.main,
          },
          '&.Mui-checked:hover::before': {
            opacity: 0.12,
          },
          '&.Mui-checked.Mui-focusVisible::before': {
            opacity: 0.2,
          },
        },
      },
    },
    // Stock MuiFormControlLabel has no real gap between the control and its
    // label - `marginLeft: -11`/`marginRight: 16` on the root only offset
    // the whole [control, label] unit externally, they don't sit *between*
    // the two. The apparent spacing pre-EDGE-DS came entirely from stock
    // MUI Switch's own 12px root padding (a bigger invisible touch-target
    // box); zeroing that padding in the MuiSwitch override above (to match
    // Figma's exact track geometry) collapsed it, so the label now needs an
    // explicit gap of its own. `gap` (not a one-sided margin) is used
    // because FormControlLabelRoot flips `flexDirection` per
    // labelPlacement (row / row-reverse / column / column-reverse) - a flex
    // `gap` inserts the same visual space between control and label
    // regardless of which side the label ends up on, matching the 8px
    // (`sizing/1`) token the Figma `Dual` variant already uses (see
    // FormControlLabel.tsx's `DualRoot`, itemSpacing note in
    // FormControlLabel.figma.tsx).
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          gap: baseTheme.spacing(1),
        },
      },
    },
    // Stock MuiFormGroup has no built-in spacing between stacked items (e.g.
    // a column of <FormControlLabel><Switch/></FormControlLabel> rows sit
    // flush against each other with zero gap). EDGE-DS default: 8px vertical
    // gap so items never touch/overlap - matches the spacing already used
    // elsewhere for control-adjacent elements (see FormControlLabel.tsx's
    // `dual` gap, also theme.spacing(1) = 8px).
    MuiFormGroup: {
      styleOverrides: {
        root: {
          gap: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        // Geometry: fully padding-driven, no fixed height — mirrors Figma's
        // `Hug contents` rule. MUI's default Chip uses a hardcoded height
        // (32/24) instead of vertical padding, so we unset it here and let
        // root padding + line-height determine the box, same as MuiButton.
        root: {
          height: 'auto',
          borderRadius: '100px',
          boxSizing: 'border-box',
        },
        // `.MuiChip-label` normally carries MUI's default horizontal padding
        // (12px/8px). We zero it out so root's padding below is the single
        // source of truth for spacing — avoids double horizontal padding.
        // Chips with a leading `avatar` or `icon` need that left padding
        // restored, though: MUI's own `.MuiChip-avatar`/`.MuiChip-icon`
        // ship a built-in negative right margin (-6px medium / -4px small)
        // that assumes the label still carries its native left padding to
        // net out to a small, intentional gap. With that padding zeroed
        // out here, the negative margin landed directly on top of the
        // label text instead — the same class of overlap as the
        // deletable-icon fix below, just on the leading edge.
        label: {
          padding: 0,
          '.MuiChip-avatar + &, .MuiChip-icon + &': {
            paddingLeft: '12px',
          },
        },
        sizeMedium: {
          height: 'auto',
          padding: '4px 12px',
          // Deletable chips (onDelete set → MUI's own `.MuiChip-deletable`
          // class) need the label's right edge pulled back in, because
          // `.MuiChip-deleteIcon` ships a built-in negative left margin
          // (~-6px) that assumes the label still carries its native
          // right padding. With that padding zeroed out above for the
          // common (non-deletable) case, the icon's negative margin was
          // landing directly on top of the label text — the "delete icon
          // overlaps chip label" bug reported in Autocomplete tag chips.
          // Restoring padding scoped to `.MuiChip-deletable` only fixes
          // the overlap without reintroducing the double-padding this
          // block was originally written to avoid.
          '&.MuiChip-deletable .MuiChip-label': {
            paddingRight: '10px',
          },
        },
        sizeSmall: {
          height: 'auto',
          padding: '3px 8px',
          '&.MuiChip-deletable .MuiChip-label': {
            paddingRight: '8px',
          },
          // Small avatar/icon use a smaller negative margin (-4px vs -6px);
          // this overrides the medium-sized restore above with equivalent
          // specificity via the extra `.MuiChip-sizeSmall` ancestor class.
          '& .MuiChip-avatar + .MuiChip-label, & .MuiChip-icon + .MuiChip-label': {
            paddingLeft: '8px',
          },
        },
        // Per-color mapping. MUI v7's ChipClasses has no combined
        // `filledError`/`outlinedError`-style slots beyond the deprecated
        // filledPrimary/filledSecondary/outlinedPrimary/outlinedSecondary,
        // so each color slot below targets both variants via the
        // `.MuiChip-filled` / `.MuiChip-outlined` classes that are always
        // present alongside it on the root element.
        colorDefault: {
          '&.MuiChip-filled': {
            backgroundColor: baseTheme.palette.surface.subtle,
            color: baseTheme.palette.text.primary,
            '&:hover': { backgroundColor: baseTheme.palette.action.hover },
          },
          '&.MuiChip-outlined': {
            borderColor: baseTheme.palette.divider,
            borderWidth: '1px',
            color: baseTheme.palette.text.primary,
            '&:hover': { backgroundColor: baseTheme.palette.action.hover },
          },
        },
        colorPrimary: {
          '&.MuiChip-filled': {
            backgroundColor: baseTheme.palette.primary.main,
            color: baseTheme.palette.primary.contrastText,
            '&:hover': { backgroundColor: baseTheme.palette.primary.dark },
          },
          '&.MuiChip-outlined': {
            borderColor: baseTheme.palette.primary.main,
            borderWidth: '1px',
            color: baseTheme.palette.primary.main,
            '&:hover': { backgroundColor: baseTheme.palette.primary.subtle },
          },
        },
        colorSecondary: {
          '&.MuiChip-filled': {
            backgroundColor: baseTheme.palette.secondary.main,
            color: baseTheme.palette.secondary.contrastText,
            '&:hover': { backgroundColor: baseTheme.palette.secondary.dark },
          },
          '&.MuiChip-outlined': {
            borderColor: baseTheme.palette.secondary.main,
            borderWidth: '1px',
            color: baseTheme.palette.secondary.main,
            '&:hover': { backgroundColor: alpha(baseTheme.palette.secondary.main, 0.08) },
          },
        },
        colorError: {
          '&.MuiChip-filled': {
            backgroundColor: baseTheme.palette.error.main,
            color: baseTheme.palette.error.contrastText,
            '&:hover': { backgroundColor: baseTheme.palette.error.dark },
          },
          '&.MuiChip-outlined': {
            borderColor: baseTheme.palette.error.main,
            borderWidth: '1px',
            color: baseTheme.palette.error.main,
            '&:hover': { backgroundColor: alpha(baseTheme.palette.error.main, 0.08) },
          },
        },
        colorWarning: {
          '&.MuiChip-filled': {
            backgroundColor: baseTheme.palette.warning.main,
            color: baseTheme.palette.warning.contrastText,
            '&:hover': { backgroundColor: baseTheme.palette.warning.dark },
          },
          '&.MuiChip-outlined': {
            borderColor: baseTheme.palette.warning.main,
            borderWidth: '1px',
            color: baseTheme.palette.warning.main,
            '&:hover': { backgroundColor: alpha(baseTheme.palette.warning.main, 0.08) },
          },
        },
        colorInfo: {
          '&.MuiChip-filled': {
            backgroundColor: baseTheme.palette.info.main,
            color: baseTheme.palette.info.contrastText,
            '&:hover': { backgroundColor: baseTheme.palette.info.dark },
          },
          '&.MuiChip-outlined': {
            borderColor: baseTheme.palette.info.main,
            borderWidth: '1px',
            color: baseTheme.palette.info.main,
            '&:hover': { backgroundColor: alpha(baseTheme.palette.info.main, 0.08) },
          },
        },
        colorSuccess: {
          '&.MuiChip-filled': {
            backgroundColor: baseTheme.palette.success.main,
            color: baseTheme.palette.success.contrastText,
            '&:hover': { backgroundColor: baseTheme.palette.success.dark },
          },
          '&.MuiChip-outlined': {
            borderColor: baseTheme.palette.success.main,
            borderWidth: '1px',
            color: baseTheme.palette.success.main,
            '&:hover': { backgroundColor: alpha(baseTheme.palette.success.main, 0.08) },
          },
        },
        // Disabled state intentionally has NO overrides here — per the Figma
        // gap analysis, Chip.Mui-disabled relies on MUI's native opacity
        // layer (action.disabledOpacity, 0.38) rather than swapped colors,
        // matching real MUI Chip behavior (unlike MuiButton, which does
        // swap to distinct disabled colors above).
      },
    },
    // Badge color tokens, migrated 2026-08-03 from the real Figma <Badge>
    // component set (Components/Badge/{Color}/BG/Default + /Text, plus a
    // standalone Border token), inserted next to MuiChip since Badge shares
    // the same brand-pair-plus-four-status color family shape. Primary and
    // Secondary alias Brand/Primary/500 and Brand/Secondary/500 directly
    // (same Chip precedent as MuiChip's colorPrimary/colorSecondary above,
    // kept as two literal brand colors rather than collapsed into Neutral).
    // Error/Warning/Info/Success alias Semantic/Status/{Status}/Icon, the
    // same ramp-800 tier already consumed by MuiAlert's filled variant and
    // MuiChip's Filled/BG/Default below, so colors.red/amber/blue/green[800]
    // is used directly rather than baseTheme.palette.{status}.main (which
    // diverges from the real Semantic/Status tier for warning/info, same
    // divergence already documented on MuiAlert above). Text on every
    // colored badge is Semantic/Text/Inverse (white). The Default (no
    // color) badge has no background token at all in Figma, just
    // Semantic/Text/Primary text on a transparent fill, an explicit
    // "flag it, keep it empty" decision made during the Figma migration
    // rather than fabricated to match stock MUI Badge's grey pill.
    MuiBadge: {
      styleOverrides: {
        badge: {
          // Components/Badge/Border, aliasing Brand/White: the 2px ring
          // that separates a colored badge from whatever it is anchored on,
          // present on every color in the real Figma "<Badge> | With
          // Instance" set.
          border: '2px solid #ffffff',
          fontFamily: baseTheme.typography.body2.fontFamily,
        },
        colorDefault: {
          backgroundColor: 'transparent',
          color: baseTheme.palette.text.primary,
        },
        colorPrimary: {
          backgroundColor: baseTheme.palette.primary.main,
          color: '#ffffff',
        },
        colorSecondary: {
          backgroundColor: baseTheme.palette.secondary.main,
          color: '#ffffff',
        },
        colorError: {
          backgroundColor: colors.red[800],
          color: '#ffffff',
        },
        colorWarning: {
          backgroundColor: colors.amber[800],
          color: '#ffffff',
        },
        colorInfo: {
          backgroundColor: colors.blue[800],
          color: '#ffffff',
        },
        colorSuccess: {
          backgroundColor: colors.green[800],
          color: '#ffffff',
        },
      },
    },
    // Alert color tokens, migrated 2026-07-29 from the legacy "MUI palette"
    // Figma collection onto Components/Alert/{Status}/* (Text, Icon, Border,
    // Background, BG/Default, BG/OnFill/Text), each aliasing the shared
    // Semantic/Status/{Status}/* tier — same tier Chip and Status Tag already
    // consume, so Alert's colors now intentionally match those components
    // (see docs/figma-component-structure.md §2.3 / the Alert migration
    // pass). Values below are that tier's real resolved hex, read directly
    // off the Figma variables, not approximated from stock MUI Alert colors.
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: baseTheme.shape.borderRadius,
          boxShadow: 'none',
          padding: '6px 16px',
        },
        icon: {
          fontSize: 22,
        },
        // Standard — light tint background, dark-on-tint text/icon.
        // Background: Semantic/Status/{Status}/Background (ramp step 100).
        // Text: Semantic/Status/{Status}/Text (ramp step 900).
        // Icon: Semantic/Status/{Status}/Icon (ramp step 800).
        standardError: {
          backgroundColor: colors.red[100],
          color: colors.red[900],
          '& .MuiAlert-icon': { color: colors.red[800] },
        },
        standardWarning: {
          backgroundColor: colors.amber[100],
          color: '#ff6f00',
          '& .MuiAlert-icon': { color: colors.amber[800] },
        },
        standardInfo: {
          backgroundColor: colors.blue[100],
          color: colors.blue[900],
          '& .MuiAlert-icon': { color: colors.blue[800] },
        },
        standardSuccess: {
          backgroundColor: colors.green[100],
          color: colors.green[900],
          '& .MuiAlert-icon': { color: colors.green[800] },
        },
        // Outlined — white/transparent background, 1px border at the ramp's
        // 500 step (Semantic/Status/{Status}/Border), text/icon same as Standard.
        outlinedError: {
          backgroundColor: 'transparent',
          border: `1px solid ${colors.red[500]}`,
          color: colors.red[900],
          '& .MuiAlert-icon': { color: colors.red[800] },
        },
        outlinedWarning: {
          backgroundColor: 'transparent',
          border: `1px solid ${colors.amber[500]}`,
          color: '#ff6f00',
          '& .MuiAlert-icon': { color: colors.amber[800] },
        },
        outlinedInfo: {
          backgroundColor: 'transparent',
          border: `1px solid ${colors.blue[500]}`,
          color: colors.blue[900],
          '& .MuiAlert-icon': { color: colors.blue[800] },
        },
        outlinedSuccess: {
          backgroundColor: 'transparent',
          border: `1px solid ${colors.green[500]}`,
          color: colors.green[900],
          '& .MuiAlert-icon': { color: colors.green[800] },
        },
        // Filled — solid ramp-800 background (Components/Alert/{Status}/BG/Default,
        // aliasing Semantic/Status/{Status}/Icon, matching Chip's Filled/BG/Default),
        // white text/icon/action on top (BG/OnFill/Text, aliasing Brand/White).
        filledError: {
          backgroundColor: colors.red[800],
          color: '#ffffff',
          '& .MuiAlert-icon': { color: '#ffffff' },
        },
        filledWarning: {
          backgroundColor: colors.amber[800],
          color: '#ffffff',
          '& .MuiAlert-icon': { color: '#ffffff' },
        },
        filledInfo: {
          backgroundColor: colors.blue[800],
          color: '#ffffff',
          '& .MuiAlert-icon': { color: '#ffffff' },
        },
        filledSuccess: {
          backgroundColor: colors.green[800],
          color: '#ffffff',
          '& .MuiAlert-icon': { color: '#ffffff' },
        },
      },
    },
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          ...edgeTypography['body-md'],
          fontWeight: 500,
          marginTop: 0,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        // The options dropdown (`.MuiAutocomplete-listbox`, wrapped in
        // `.MuiAutocomplete-paper`) renders inside a Popper that portals to
        // `document.body` by default — it is NOT a DOM descendant of the
        // Autocomplete root element, even though it's a descendant in the
        // React tree. Component-level `sx` selectors like `& .MuiAutocomplete-listbox`
        // compile to a scoped CSS rule (`.css-xxxx & .MuiAutocomplete-listbox`)
        // that only matches actual DOM descendants, so they silently never
        // apply to the portaled node — this is why the scrollbar kept
        // showing even after adding that rule to the doc page's `sx`.
        // Theme `styleOverrides` don't have this problem: MUI applies the
        // resulting class straight onto each slot's own DOM node wherever
        // it ends up rendering, portal or not. Fixing it here also means
        // every Autocomplete in the app gets the same treatment, not just
        // this doc page.
        paper: {
          overflow: 'hidden',
          scrollbarWidth: 'none !important', // Firefox
          '&::-webkit-scrollbar': {
            display: 'none !important', // Chrome, Safari, Opera
          },
        },
        listbox: {
          // Bounded height (rather than growing unbounded with the option
          // count) so the panel always scrolls internally instead of ever
          // pushing past the viewport edge — most visible at small window
          // sizes, where an unbounded listbox has more room to overflow.
          maxHeight: '40vh',
          overflowY: 'auto !important',
          scrollbarWidth: 'none !important', // Firefox
          msOverflowStyle: 'none !important', // IE, Edge
          '&::-webkit-scrollbar': {
            display: 'none !important', // Chrome, Safari, Opera
            width: '0px !important',
            height: '0px !important',
            background: 'transparent !important',
          },
        },
      },
    },
    MuiBackdrop: {
      defaultProps: {
        // Matches MUI's own stock default; named explicitly since Figma's
        // canvas is static and has no motion token to diverge from, so
        // there is nothing to override, only to make explicit.
        transitionDuration: { enter: 225, exit: 195 },
      },
      styleOverrides: {
        root: {
          // Default (Dark Scrim) style. Previously this was MUI's stock
          // hardcoded rgba(0,0,0,0.5), coincidentally identical to Figma's
          // token but not actually wired to it. Now sourced from
          // colors.overlay.scrim, matching Components/Backdrop/Fill/Default
          // (aliasing Semantic/Overlay/Scrim) on the Figma side.
          backgroundColor: colors.overlay.scrim,
        },
      },
    },
    // Fab's own migration (2026-08-05) found that MUI's stock Fab already
    // renders every bound color/state token correctly with zero
    // overrides: its generic `Object.entries(theme.palette)` variants loop
    // already produces Primary/Secondary/Error/Warning/Info/Success
    // background+text from palette.{color}, matching
    // Components/Button/{Primary,Neutral,Error,Warning,Info,Success},
    // which this same palette already backs (confirmed by direct hex
    // comparison when the 4 status colors' Figma variants were added
    // 2026-08-06, see FAB_Figma_Web_Audit.md), its base style's
    // grey[300]/grey.A100 background already matches
    // Components/Button/Inherit/BG/Default+Hover for both Default and
    // Inherit, and its disabled override already uses
    // action.disabled/action.disabledBackground, the same pair
    // Components/Button/Disabled/Text+BG alias. The one real gap is the
    // white focusRipple ring Figma's Focused state shows on every color,
    // which stock Fab has no visual equivalent for.
    MuiFab: {
      styleOverrides: {
        root: {
          [`&.Mui-focusVisible`]: {
            // Components/Fab/Shared/FocusRing, aliasing Semantic/Surface/Paper
            // (Brand/White), the same alias chain as Components/Switch/Knob/FocusRing.
            boxShadow: `0 0 0 3px #ffffff, ${baseTheme.shadows[6]}`,
          },
        },
      },
    },
    // Figma's <Link> master models Color=Primary*/Inherit as two real,
    // single-role tokens (no per-state color variation across
    // Enabled/Hovered/Focused) — see docs/Link_Figma_Web_Audit.md for the
    // Components/Link/* tier rationale versus Drawer/Icons' direct-to-Semantic
    // precedent.
    MuiLink: {
      defaultProps: {
        underline: 'always',
      },
      styleOverrides: {
        root: {
          // Components/Link/Text/Primary, aliasing Brand/Primary/500
          // (#009f9b, the same value as palette.primary.main).
          color: baseTheme.palette.primary.main,
        },
      },
      variants: [
        {
          props: { color: 'inherit' },
          style: {
            // Components/Link/Text/Inherit, aliasing Semantic/Text/Primary
            // (#212121, same as palette.text.primary). Disclosed as a near
            // match, not exact: Figma's source is a translucent black
            // rgba(0,0,0,0.87), this is its solid composited equivalent,
            // ~0.0006 delta.
            color: baseTheme.palette.text.primary,
          },
        },
      ],
    },
  },
});

export default brandTheme;
