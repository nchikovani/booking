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
      dark: tokens.color.primaryDark,
      light: tokens.color.primaryLight,
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
    h1: { fontSize: '28px', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '18px', fontWeight: 600, lineHeight: 1.3 },
    body1: { fontSize: '14px', fontWeight: 500, lineHeight: 1.5 },
    body2: { fontSize: '14px', fontWeight: 400, lineHeight: 1.5 },
    caption: { fontSize: '13px', fontWeight: 500, lineHeight: 1.4 },
    overline: { fontSize: '12px', fontWeight: 400, lineHeight: 1.4 },
  },
  shape: {
    borderRadius: 8,
  },
});
