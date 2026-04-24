import { createTheme, alpha } from '@mui/material/styles';
import { red, blue, amber, grey, blueGrey, green, lightBlue, orange } from '@mui/material/colors';

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
  interface Palette {
    surface: {
      default: string;
      paper: string;
      disabled: string;
    };
  }
  interface PaletteOptions {
    surface?: {
      default?: string;
      paper?: string;
      disabled?: string;
    };
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
    surface: {
      default: colors.grey[50], // Semantic/Surface/Default -> fafafa
      paper: '#ffffff',
      disabled: colors.grey[300], // e0e0e0
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: 60,
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: -0.9,
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: 34,
      fontWeight: 600,
      lineHeight: 1.235,
      letterSpacing: -0.34,
    },
    h5: {
      fontFamily: '"Montserrat", sans-serif',
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.33,
      letterSpacing: -0.12,
    },
    body1: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: 0,
    },
    body2: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: 0.06,
    },
    subtitle2: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 12,
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: 0.06,
    },
    button: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.43,
      letterSpacing: 0.7,
      textTransform: 'uppercase',
    },
    caption: {
      fontFamily: '"Open Sans", sans-serif',
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: 0.48,
    },
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
          fontFamily: baseTheme.typography.button.fontFamily,
          fontWeight: baseTheme.typography.button.fontWeight,
          textTransform: 'uppercase',
          borderRadius: baseTheme.shape.borderRadius,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
          '&:active': { boxShadow: 'none' },
          '&:focus-visible': { boxShadow: 'none' },
        },
        sizeSmall: {
          fontSize: '0.75rem',
          letterSpacing: '0.6px',
          padding: `${baseTheme.spacing(1.25)} ${baseTheme.spacing(2)}`,
          height: 40,
          lineHeight: 1.66,
        },
        sizeMedium: {
          fontSize: '0.875rem',
          letterSpacing: '0.7px',
          padding: `${baseTheme.spacing(1.25)} ${baseTheme.spacing(2)}`,
          height: 44,
          lineHeight: 1.43,
        },
        sizeLarge: {
          fontSize: '1rem',
          letterSpacing: '0.8px',
          padding: `${baseTheme.spacing(1.5)} ${baseTheme.spacing(2)}`,
          height: 48,
          lineHeight: 1.5,
        },
        sizeIcon: {
          width: 44,
          height: 44,
          borderRadius: '50%',
          minWidth: 0,
          padding: 0,
          '& > *:nth-of-type(1)': { fontSize: '1.25rem' },
        },
        containedPrimary: {
          backgroundColor: baseTheme.palette.primary.main,
          color: baseTheme.palette.primary.contrastText,
          '&:hover': { backgroundColor: baseTheme.palette.primary.dark },
          '&:active': { backgroundColor: colors.edgeTurquoise.active },
          '&.Mui-disabled': {
            backgroundColor: `${baseTheme.palette.grey[300]} !important` as unknown as string,
            color: `${baseTheme.palette.text.disabled} !important` as unknown as string,
          },
        },
        containedSecondary: {
          backgroundColor: baseTheme.palette.secondary.main,
          color: baseTheme.palette.secondary.contrastText,
          '&:hover': { backgroundColor: baseTheme.palette.secondary.dark },
          '&.Mui-disabled': {
            backgroundColor: `${baseTheme.palette.grey[300]} !important` as unknown as string,
            color: `${baseTheme.palette.text.disabled} !important` as unknown as string,
          },
        },
        outlinedPrimary: {
          borderColor: baseTheme.palette.primary.main,
          color: baseTheme.palette.primary.main,
          borderWidth: '1px',
          '&:hover': {
            backgroundColor: colors.edgeTurquoise.subtle,
            borderColor: baseTheme.palette.primary.dark,
            borderWidth: '1px',
          },
          '&:active': {
            borderColor: colors.edgeTurquoise.active,
            color: colors.edgeTurquoise.active,
            borderWidth: '1px',
          },
          '&.Mui-disabled': {
            borderColor: baseTheme.palette.grey[300],
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
            borderColor: baseTheme.palette.grey[300],
            color: baseTheme.palette.text.disabled,
            borderWidth: '1px',
          },
        },
        textPrimary: {
          color: baseTheme.palette.primary.main,
          '&:hover': { backgroundColor: colors.edgeTurquoise.subtle },
          '&:active': { color: colors.edgeTurquoise.active },
          '&.Mui-disabled': { color: baseTheme.palette.text.disabled },
        },
        textSecondary: {
          color: baseTheme.palette.secondary.main,
          '&:hover': { backgroundColor: alpha(baseTheme.palette.secondary.main, 0.06) },
          '&.Mui-disabled': { color: baseTheme.palette.text.disabled },
        },
        startIcon: {
          '& > *:nth-of-type(1)': { fontSize: '1.25rem' },
        },
        endIcon: {
          '& > *:nth-of-type(1)': { fontSize: '1.25rem' },
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
            backgroundColor: 'transparent',
            border: 'none',
            '&.Mui-expanded': {
              border: `1px solid ${baseTheme.palette.divider}`,
              backgroundColor: baseTheme.palette.background.paper,
            },
            '& .MuiAccordionSummary-root': {
              padding: `${baseTheme.spacing(1)} ${baseTheme.spacing(2)}`,
              backgroundColor: baseTheme.palette.grey[100],
              borderRadius: 8,
            },
            '&.Mui-expanded .MuiAccordionSummary-root': {
              borderBottom: `1px solid ${baseTheme.palette.divider}`,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
            '& .MuiAccordionSummary-content .MuiTypography-root': {
              fontFamily: baseTheme.typography.body1.fontFamily,
              fontWeight: 700,
              fontSize: '14px',
              color: baseTheme.palette.primary.dark, // 00918c map
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
            fontFamily: baseTheme.typography.body1.fontFamily,
            fontWeight: 400,
            fontSize: '16px',
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
          borderRadius: 4,
          '&.Mui-checked': {
            color: baseTheme.palette.primary.main,
          },
          '&.MuiCheckbox-indeterminate': {
            color: baseTheme.palette.primary.main,
          },
          '&:hover': {
            backgroundColor: alpha(baseTheme.palette.primary.main, 0.04),
          },
        },
        colorPrimary: {
          '&.Mui-checked': {
            color: baseTheme.palette.primary.main,
          },
        },
      },
    },
  },
});

export default brandTheme;
