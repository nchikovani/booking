import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { IMaskInput } from 'react-imask';
import Typography from '@mui/material/Typography';
import { tokens, UiInput } from '@repo/ui';
import type { BusinessFormValues } from '../model/types';

type PhoneMaskInputProps = {
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PhoneMaskInput = forwardRef<HTMLInputElement, PhoneMaskInputProps>(
  function PhoneMaskInput(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="+{0} 000 000 00 00[ 00][ 00]"
        definitions={{ 0: /\d/ }}
        inputRef={ref}
        overwrite={true}
        onAccept={(value: string) =>
          onChange({
            target: { value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      />
    );
  },
);

type Props = {
  values: BusinessFormValues;
  emailError: string | null;
  websiteError: string | null;
  emailInputRef: React.Ref<HTMLInputElement>;
  websiteInputRef: React.Ref<HTMLInputElement>;
  onFieldChange: (
    field: keyof BusinessFormValues,
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export function BusinessContactsSection({
  values,
  emailError,
  websiteError,
  emailInputRef,
  websiteInputRef,
  onFieldChange,
}: Props) {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-border-default bg-surface-bg p-5">
      <Typography variant="h4" color={tokens.color.textPrimary}>
        {t('settings.sections.contacts')}
      </Typography>
      <UiInput
        data-testid="settings-input-phone"
        label={t('settings.fields.phone')}
        value={values.phone}
        onChange={onFieldChange('phone')}
        placeholder={t('settings.placeholders.phone')}
        inputComponent={PhoneMaskInput as never}
        inputProps={{ inputMode: 'tel' }}
      />
      <UiInput
        data-testid="settings-input-email"
        label={t('settings.fields.email')}
        value={values.email}
        onChange={onFieldChange('email')}
        placeholder={t('settings.placeholders.email')}
        error={Boolean(emailError)}
        helperText={emailError ? t(`settings.validation.email.${emailError}`) : ''}
        slotProps={{ htmlInput: { ref: emailInputRef } }}
      />
      <UiInput
        data-testid="settings-input-website"
        label={t('settings.fields.website')}
        value={values.website}
        onChange={onFieldChange('website')}
        placeholder={t('settings.placeholders.website')}
        error={Boolean(websiteError)}
        helperText={websiteError ? t(`settings.validation.website.${websiteError}`) : ''}
        slotProps={{ htmlInput: { ref: websiteInputRef } }}
      />
      <UiInput
        data-testid="settings-input-telegram"
        label={t('settings.fields.telegram')}
        value={values.telegram}
        onChange={onFieldChange('telegram')}
        placeholder={t('settings.placeholders.telegram')}
      />
      <UiInput
        data-testid="settings-input-vk"
        label={t('settings.fields.vk')}
        value={values.vk}
        onChange={onFieldChange('vk')}
        placeholder={t('settings.placeholders.vk')}
      />
      <UiInput
        data-testid="settings-input-youtube"
        label={t('settings.fields.youtube')}
        value={values.youtube}
        onChange={onFieldChange('youtube')}
        placeholder={t('settings.placeholders.youtube')}
      />
    </section>
  );
}
