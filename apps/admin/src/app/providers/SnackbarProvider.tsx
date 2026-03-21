import { SnackbarProvider as NotistackSnackbarProvider, MaterialDesignContent } from 'notistack';
import { styled } from '@mui/material/styles';
import { tokens } from '@repo/ui';

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent': {
    borderRadius: '10px',
    boxShadow: 'none',
    '& #notistack-snackbar': {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
  '&.notistack-MuiContent-success': {
    color: tokens.color.textPrimaryInverted,
    backgroundColor: tokens.color.surfaceElevatedInverted,
  },
}));

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotistackSnackbarProvider
      maxSnack={3}
      autoHideDuration={3500}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      Components={{
        default: StyledMaterialDesignContent,
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
      }}
    >
      {children}
    </NotistackSnackbarProvider>
  );
};
