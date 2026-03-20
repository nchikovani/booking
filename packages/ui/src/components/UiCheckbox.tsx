import { forwardRef } from 'react';
import MuiCheckbox, { type CheckboxProps } from '@mui/material/Checkbox';
import { tokens } from '../theme/tokens';

export type UiCheckboxProps = CheckboxProps;

const checkboxSx = {
  p: 0.5,
  '& .MuiSvgIcon-root': {
    fontSize: 20,
    borderRadius: '4px',
  },
  color: tokens.color.borderDefault,
  '&.Mui-checked': {
    color: 'primary.main',
  },
  '&.Mui-disabled': {
    color: tokens.color.borderDefault,
  },
} as const;

/** Чекбокс по design-system.pen (20×20, скругление 4px). Подпись — через `FormControlLabel` в форме. */
export const UiCheckbox = forwardRef<HTMLButtonElement, UiCheckboxProps>(function UiCheckbox(
  { sx, ...rest },
  ref,
) {
  const userSx = sx;

  return (
    <MuiCheckbox
      ref={ref}
      disableRipple
      color="primary"
      {...rest}
      sx={[checkboxSx, ...(Array.isArray(userSx) ? userSx : userSx ? [userSx] : [])]}
    />
  );
});
