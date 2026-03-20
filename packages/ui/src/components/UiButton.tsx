import CircularProgress from '@mui/material/CircularProgress';
import MuiButton, { type ButtonProps } from '@mui/material/Button';
import { tokens } from '../theme/tokens';

export type UiButtonVariant = 'primary' | 'secondary' | 'action' | 'ghost';

export type UiButtonProps = Omit<ButtonProps, 'variant'> & {
  /** Вариант из design-system.pen (не путать с MUI `variant`). */
  uiVariant?: UiButtonVariant;
  /** Блокировка и индикатор загрузки. */
  loading?: boolean;
};

function mapUiVariant(uiVariant: UiButtonVariant): Pick<ButtonProps, 'variant' | 'color'> {
  switch (uiVariant) {
    case 'primary':
      return { variant: 'contained', color: 'primary' };
    case 'secondary':
      return { variant: 'contained', color: 'inherit' };
    case 'action':
      return { variant: 'contained', color: 'primary' };
    case 'ghost':
      return { variant: 'text', color: 'primary' };
    default:
      return { variant: 'contained', color: 'primary' };
  }
}

/** Primary / Action: cornerRadius 10, padding 12×24 (pen). Secondary: заливка surface elevated, radius 8. Ghost: 13px / 500, radius 8. */
function variantSx(uiVariant: UiButtonVariant): ButtonProps['sx'] {
  switch (uiVariant) {
    case 'primary':
      return {
        borderRadius: '10px',
        fontSize: 14,
        fontWeight: 600,
        boxShadow: 'none',
        '&:hover': { boxShadow: 'none' },
      };
    case 'action':
      return {
        borderRadius: '10px',
        fontSize: 14,
        fontWeight: 500,
        py: 1.25,
        px: 2,
        minHeight: 40,
        boxShadow: 'none',
        '&:hover': { boxShadow: 'none' },
      };
    case 'secondary':
      return {
        borderRadius: 1,
        fontSize: 14,
        fontWeight: 500,
        py: 1,
        px: 2,
        minHeight: 40,
        boxShadow: 'none',
        backgroundColor: tokens.color.surfaceElevated,
        color: tokens.color.textPrimary,
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: tokens.color.borderDefault,
        },
        '&:active': {
          backgroundColor: tokens.color.borderStrong,
        },
        '&.Mui-disabled': {
          opacity: 0.5,
          backgroundColor: tokens.color.surfaceElevated,
          color: tokens.color.textTertiary,
        },
      };
    case 'ghost':
      return {
        borderRadius: 1,
        fontSize: 13,
        fontWeight: 500,
        py: 1,
        px: 1.5,
        minHeight: 'auto',
        color: tokens.color.primary,
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      };
    default:
      return null;
  }
}

/**
 * Кнопка по макетам design-system.pen (Buttons) и экранов входа/регистрации admin.pen.
 */
export function UiButton({
  ref,
  uiVariant = 'primary',
  loading = false,
  disabled,
  children,
  sx,
  ...rest
}: UiButtonProps) {
  const mapped = mapUiVariant(uiVariant);
  const isDisabled = Boolean(disabled || loading);

  return (
    <MuiButton
      ref={ref}
      {...mapped}
      {...rest}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      sx={[variantSx(uiVariant), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
      {...(loading
        ? {
            endIcon:
              rest.endIcon ??
              (uiVariant === 'action' ? undefined : (
                <CircularProgress color="inherit" size={18} aria-hidden />
              )),
          }
        : {})}
    >
      {loading && uiVariant === 'action' ? (
        <>
          <CircularProgress color="inherit" size={18} sx={{ mr: 1 }} aria-hidden />
          {children}
        </>
      ) : (
        children
      )}
    </MuiButton>
  );
}
