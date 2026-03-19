import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@repo/ui';
import '@repo/ui/theme/variables.css';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
