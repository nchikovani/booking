import './mui-augmentation';
import { createTheme } from '@mui/material/styles';
import { tokens } from './tokens';

/**
 * MUI тема, привязанная к CSS-переменным из design-system.pen.
 * Переменные задаются в variables.css (:root и [data-theme="dark"]).
 */
export const theme = createTheme({
  cssVariables: {
    nativeColor: true, // Enables color-mix for CSS variables
  },
  palette: {
    primary: {
      main: tokens.color.primary,
    },
    error: {
      main: tokens.color.error,
    },
    background: {
      default: tokens.color.surfaceBg,
      paper: tokens.color.surfaceCard,
    },
    text: {
      primary: tokens.color.textPrimary,
      secondary: tokens.color.textSecondary,
      disabled: tokens.color.textTertiary,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '28px', fontWeight: 600, lineHeight: 1.2 },
    h2: { fontSize: '24px', fontWeight: 600, lineHeight: 1.2 },
    h3: { fontSize: '22px', fontWeight: 600, lineHeight: 1.3 },
    h4: { fontSize: '18px', fontWeight: 600, lineHeight: 1.3 },
    body1: { fontSize: '14px', fontWeight: 500, lineHeight: 1.5 },
    body2: { fontSize: '14px', fontWeight: 400, lineHeight: 1.5 },
    caption: { fontSize: '13px', fontWeight: 500, lineHeight: 1.4 },
    overline: { fontSize: '12px', fontWeight: 400, lineHeight: 1.4 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '10px',
          lineHeight: 1,
          minHeight: 44,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 10,
          paddingBottom: 10,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        input: {
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 12,
          paddingRight: 12,
          height: 20,
          fontSize: 14,
          fontWeight: 400,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: tokens.color.textSecondary,
          '&.Mui-focused': { color: tokens.color.primary },
          '&.Mui-error': { color: tokens.color.error },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: 4,
        },
      },
    },
  },
});
