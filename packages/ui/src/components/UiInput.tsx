import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput, { type OutlinedInputProps } from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { useId, type InputHTMLAttributes, type Ref, type ReactNode } from 'react';
import { tokens } from '../theme/tokens';

export type UiInputProps = Omit<OutlinedInputProps, 'notched'> & {
  label?: ReactNode;
  helperText?: ReactNode;
  slotProps?: {
    /** Пропсы нативного <input> элемента (аналог TextField.slotProps.htmlInput). */
    htmlInput?: InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> };
  };
};

const inputSx = {
  minHeight: 44,
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: tokens.color.borderDefault,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: tokens.color.borderStrong,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'primary.main',
  },
  '&.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: 'error.main',
  },
  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: tokens.color.borderDefault,
  },
  '&.Mui-disabled': {
    backgroundColor: tokens.color.surfaceElevated,
  },
} as const;

/**
 * Поле ввода с лейблом над полем (design: admin.pen).
 * Лейбл статичен, не плавает — высота 44px, скругление 8px, отступы 12px.
 */
export function UiInput({ ref, id, label, helperText, error, sx, slotProps, ...rest }: UiInputProps) {
  const generatedId = useId();
  const resolvedId = id ?? generatedId;
  const { ref: inputRef, ...nativeInputProps } = slotProps?.htmlInput ?? {};

  return (
    <FormControl fullWidth error={error}>
      {label != null && (
        <Typography
          component="label"
          htmlFor={resolvedId}
          sx={{
            display: 'block',
            mb: 1,
            fontSize: 13,
            fontWeight: 500,
            lineHeight: 1.4,
            color: tokens.color.textPrimary,
          }}
        >
          {label}
        </Typography>
      )}
      <OutlinedInput
        ref={ref}
        id={resolvedId}
        error={error}
        notched={false}
        inputRef={inputRef}
        inputProps={{
          'aria-invalid': error ? true : undefined,
          ...nativeInputProps,
        }}
        sx={[inputSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
        {...rest}
      />
      {helperText != null && helperText !== '' && (
        <FormHelperText sx={{ mx: 0 }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
