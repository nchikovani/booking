import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import Divider from '@mui/material/Divider';
import { useBlocker } from 'react-router-dom';
import type { Business } from '@entities/business';
import { UnsavedChangesDialog } from '@shared/ui/UnsavedChangesDialog';
import { validateEmail } from '@shared/lib/validation/email';
import { validateWebsite } from '@shared/lib/validation/website';
import { mapBusinessToFormValues } from '../model/mappers';
import type { BusinessFormValues } from '../model/types';
import { useDeleteBusinessImageMutation } from '../model/useDeleteBusinessImageMutation';
import { useDeleteBusinessLogoMutation } from '../model/useDeleteBusinessLogoMutation';
import { useSaveBusinessMutation } from '../model/useSaveBusinessMutation';
import { useUploadBusinessImageMutation } from '../model/useUploadBusinessImageMutation';
import { useUploadBusinessLogoMutation } from '../model/useUploadBusinessLogoMutation';
import { BusinessContactsSection } from './BusinessContactsSection';
import { BusinessPhotosSection } from './BusinessPhotosSection';
import { BusinessPrimaryFieldsSection } from './BusinessPrimaryFieldsSection';

type Props = {
  businessId: string;
  business: Business;
};

function readApiText(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

export function BusinessSettingsForm({ businessId, business }: Props) {
  const mappedBusinessValues = useMemo(() => mapBusinessToFormValues(business), [business]);
  const [values, setValues] = useState<BusinessFormValues>(mappedBusinessValues);
  const [initialValues, setInitialValues] = useState<BusinessFormValues>(mappedBusinessValues);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [editedAfterSubmit, setEditedAfterSubmit] = useState({ email: false, website: false });
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingLeaveAction, setPendingLeaveAction] = useState<(() => void) | null>(null);

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const websiteInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setValues(mappedBusinessValues);
    setInitialValues(mappedBusinessValues);
  }, [mappedBusinessValues]);

  const saveMutation = useSaveBusinessMutation({
    businessId,
    onSaved: (savedValues) => {
      setValues(savedValues);
      setInitialValues(savedValues);
    },
  });
  const uploadLogoMutation = useUploadBusinessLogoMutation(businessId);
  const uploadImageMutation = useUploadBusinessImageMutation(businessId);
  const deleteLogoMutation = useDeleteBusinessLogoMutation(businessId);
  const deleteImageMutation = useDeleteBusinessImageMutation(businessId);

  const hasChanges = useMemo(
    () =>
      Object.keys(values).some(
        (key) =>
          values[key as keyof BusinessFormValues] !==
          initialValues[key as keyof BusinessFormValues],
      ),
    [initialValues, values],
  );

  const blocker = useBlocker(hasChanges);

  useEffect(() => {
    if (blocker.state !== 'blocked') return;
    setPendingLeaveAction(() => () => blocker.proceed?.());
    setShowUnsavedDialog(true);
  }, [blocker]);

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasChanges) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [hasChanges]);

  const emailError =
    submitAttempted && !editedAfterSubmit.email
      ? values.email.trim()
        ? validateEmail(values.email)
        : null
      : null;
  const websiteError =
    submitAttempted && !editedAfterSubmit.website ? validateWebsite(values.website) : null;

  const onFieldChange =
    (field: keyof BusinessFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = event.target.value;
      setValues((prev) => ({ ...prev, [field]: nextValue }));
      if (submitAttempted && (field === 'email' || field === 'website')) {
        setEditedAfterSubmit((prev) => ({ ...prev, [field]: true }));
      }
    };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);
    setEditedAfterSubmit({ email: false, website: false });

    const nextEmailError = values.email.trim() ? validateEmail(values.email) : null;
    const nextWebsiteError = validateWebsite(values.website);
    if (nextEmailError || nextWebsiteError) {
      const firstInvalidInput = nextEmailError ? emailInputRef.current : websiteInputRef.current;
      if (firstInvalidInput) {
        firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalidInput.focus();
      }
      return;
    }

    if (!hasChanges || saveMutation.isPending) return;
    void saveMutation.mutateAsync(values);
  };

  const logoBusy = uploadLogoMutation.isPending || deleteLogoMutation.isPending;
  const imageBusy = uploadImageMutation.isPending || deleteImageMutation.isPending;
  const logoUrl = readApiText(business.logoUrl);
  const imageUrl = readApiText(business.imageUrl);

  return (
    <form id="business-settings-form" onSubmit={onSubmit} className="flex flex-col gap-6 p-6 md:p-8">
      <BusinessPhotosSection
        logoUrl={logoUrl}
        imageUrl={imageUrl}
        logoBusy={logoBusy}
        imageBusy={imageBusy}
        onUploadLogo={async (file) => {
          await uploadLogoMutation.mutateAsync(file);
        }}
        onUploadImage={async (file) => {
          await uploadImageMutation.mutateAsync(file);
        }}
        onDeleteLogo={async () => {
          await deleteLogoMutation.mutateAsync();
        }}
        onDeleteImage={async () => {
          await deleteImageMutation.mutateAsync();
        }}
      />

      <Divider />

      <BusinessPrimaryFieldsSection values={values} onFieldChange={onFieldChange} />

      <BusinessContactsSection
        values={values}
        emailError={emailError}
        websiteError={websiteError}
        emailInputRef={emailInputRef}
        websiteInputRef={websiteInputRef}
        onFieldChange={onFieldChange}
      />

      <UnsavedChangesDialog
        open={showUnsavedDialog}
        onStay={() => {
          setShowUnsavedDialog(false);
          setPendingLeaveAction(null);
          blocker.reset?.();
        }}
        onLeave={() => {
          setShowUnsavedDialog(false);
          pendingLeaveAction?.();
          setPendingLeaveAction(null);
        }}
      />
    </form>
  );
}
