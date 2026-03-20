import { useTranslation } from 'react-i18next';
import { UiInput } from '@repo/ui';
import type { BusinessFormValues } from '../model/types';

type Props = {
  values: BusinessFormValues;
  onFieldChange: (
    field: keyof BusinessFormValues,
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export function BusinessPrimaryFieldsSection({ values, onFieldChange }: Props) {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-4">
      <UiInput
        data-testid="settings-input-name"
        label={t('settings.fields.name')}
        value={values.name}
        onChange={onFieldChange('name')}
        placeholder={t('settings.placeholders.name')}
      />
      <UiInput
        data-testid="settings-input-description"
        label={t('settings.fields.description')}
        value={values.description}
        onChange={onFieldChange('description')}
        placeholder={t('settings.placeholders.description')}
        multiline
        minRows={3}
      />
      <UiInput
        data-testid="settings-input-address"
        label={t('settings.fields.address')}
        value={values.address}
        onChange={onFieldChange('address')}
        placeholder={t('settings.placeholders.address')}
      />
    </section>
  );
}
