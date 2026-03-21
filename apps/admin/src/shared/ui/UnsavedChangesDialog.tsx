import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { UiButton, tokens } from '@repo/ui';

type Props = {
  open: boolean;
  onStay: () => void;
  onLeave: () => void;
};

export function UnsavedChangesDialog({ open, onStay, onLeave }: Props) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onStay} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h4" color={tokens.color.textPrimary}>
          {t('shared.unsaved.title')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color={tokens.color.textSecondary}>
          {t('shared.unsaved.description')}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <UiButton type="button" uiVariant="secondary" onClick={onStay}>
          {t('shared.unsaved.stay')}
        </UiButton>
        <UiButton type="button" uiVariant="primary" onClick={onLeave}>
          {t('shared.unsaved.leave')}
        </UiButton>
      </DialogActions>
    </Dialog>
  );
}
