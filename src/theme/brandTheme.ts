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
          props: { variant: 'filters' },
          style: {
            padding: 0,
            backgroundColor: baseTheme.palette.surface.default,
            border: 'none',
            borderRadius: 8,
            '&.Mui-expanded': {
              border: `1px solid ${baseTheme.palette.divider}`,
              backgroundColor: baseTheme.palette.background.paper,
            },
            '& .MuiAccordionSummary-root': {
              minHeight: 40,
              padding: `${baseTheme.spacing(1)} ${baseTheme.spacing(2)}`,
              backgroundColor: baseTheme.palette.surface.default,
              borderRadius: 8,
            },
            '&.Mui-expanded .MuiAccordionSummary-root': {
              minHeight: 40,
              backgroundColor: baseTheme.palette.surface.subtle,
              borderBottom: `1px solid ${baseTheme.palette.divider}`,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
            '& .MuiAccordionSummary-content .MuiTypography-root': {
              ...edgeTypography['body-sm'],
              fontWeight: 700,
              color: baseTheme.palette.primary.dark,
            },
            '& .MuiAccordionDetails-root': {
              padding: `${baseTheme.spacing(2)} ${baseTheme.spacing(1)}`,
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
  },
});

export default brandTheme;
