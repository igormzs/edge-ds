import { createTheme } from '@mui/material/styles';

const brandTheme = createTheme({
  palette: {
    primary: {
      main: '#009f9b',
      dark: '#00918c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#5e6e7d',
      dark: '#515f6c',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      dark: '#c62828',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ef6c00',
      contrastText: '#ffffff',
    },
    info: {
      main: '#0057b2',
      dark: '#0d47a1',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32',
      dark: '#1b5e20',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#00000099',
      disabled: '#00000061',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      300: '#e0e0e0',
      400: '#bdbdbd',
    },
    divider: '#0000001f',
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
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true, // Button.EDGE is flat — no shadow in Figma
      },
      styleOverrides: {
        root: {
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 600,
          textTransform: 'uppercase',
          borderRadius: 4,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
          '&:active': { boxShadow: 'none' },
          '&:focus-visible': { boxShadow: 'none' },
        },

        // ── Sizes: from Figma ─────────────────────────────────────────────
        sizeSmall: {
          fontSize: '0.75rem',    // 12px — button/label-sm
          letterSpacing: '0.6px',
          padding: '10px 16px',
          height: 40,
          lineHeight: 1.66,
        },
        sizeMedium: {
          fontSize: '0.875rem',   // 14px — button/label-md
          letterSpacing: '0.7px',
          padding: '10px 16px',
          height: 44,
          lineHeight: 1.43,
        },
        sizeLarge: {
          fontSize: '1rem',       // 16px — button/label-lg
          letterSpacing: '0.8px',
          padding: '12px 16px',
          height: 48,
          lineHeight: 1.5,
        },

        // ── Variant colours ───────────────────────────────────────────────
        containedPrimary: {
          backgroundColor: '#009f9b',
          color: '#ffffff',
          '&:hover': { backgroundColor: '#00918c' },
          '&:active': { backgroundColor: '#0e837d' },
          '&.Mui-disabled': {
            backgroundColor: '#e0e0e0 !important' as unknown as string,
            color: '#9e9e9e !important' as unknown as string,
          },
        },
        containedSecondary: {
          backgroundColor: '#5e6e7d',
          color: '#ffffff',
          '&:hover': { backgroundColor: '#515f6c' },
          '&.Mui-disabled': {
            backgroundColor: '#e0e0e0 !important' as unknown as string,
            color: '#9e9e9e !important' as unknown as string,
          },
        },
        outlinedPrimary: {
          borderColor: '#009f9b',
          color: '#009f9b',
          borderWidth: '1px',
          '&:hover': {
            backgroundColor: 'rgba(0,159,155,0.06)',
            borderColor: '#00918c',
            borderWidth: '1px',
          },
          '&.Mui-disabled': {
            borderColor: '#e0e0e0',
            color: '#9e9e9e',
            borderWidth: '1px',
          },
        },
        outlinedSecondary: {
          borderColor: '#5e6e7d',
          color: '#5e6e7d',
          borderWidth: '1px',
          '&:hover': {
            backgroundColor: 'rgba(94,110,125,0.06)',
            borderWidth: '1px',
          },
          '&.Mui-disabled': {
            borderColor: '#e0e0e0',
            color: '#9e9e9e',
            borderWidth: '1px',
          },
        },
        textPrimary: {
          color: '#009f9b',
          '&:hover': { backgroundColor: 'rgba(0,159,155,0.06)' },
          '&.Mui-disabled': { color: '#9e9e9e' },
        },

        // ── Icon sizing ───────────────────────────────────────────────────
        startIcon: {
          '& > *:nth-of-type(1)': { fontSize: '1.25rem' },
        },
        endIcon: {
          '& > *:nth-of-type(1)': { fontSize: '1.25rem' },
        },
      },
    },
  },
});

export default brandTheme;
