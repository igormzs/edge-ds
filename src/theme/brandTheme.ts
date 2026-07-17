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
        label: {
          padding: 0,
        },
        sizeMedium: {
          height: 'auto',
          padding: '4px 12px',
        },
        sizeSmall: {
          height: 'auto',
          padding: '3px 8px',
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
  },
});

export default brandTheme;
