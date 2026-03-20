import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import { UiButton, tokens } from '@repo/ui';

const COVER_ASPECT_RATIO = '15 / 10';

type Props = {
  logoUrl: string;
  imageUrl: string;
  logoBusy: boolean;
  imageBusy: boolean;
  onUploadLogo: (file: File) => Promise<void>;
  onUploadImage: (file: File) => Promise<void>;
  onDeleteLogo: () => Promise<void>;
  onDeleteImage: () => Promise<void>;
};

export function BusinessPhotosSection({
  logoUrl,
  imageUrl,
  logoBusy,
  imageBusy,
  onUploadLogo,
  onUploadImage,
  onDeleteLogo,
  onDeleteImage,
}: Props) {
  const { t } = useTranslation();
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [isLogoDragOver, setIsLogoDragOver] = useState(false);
  const [isCoverDragOver, setIsCoverDragOver] = useState(false);

  const pickImageFile = (files: FileList | File[] | null | undefined): File | null => {
    if (!files?.length) return null;
    const file = Array.isArray(files) ? files[0] : files.item(0);
    if (!file) return null;
    return file.type.startsWith('image/') ? file : null;
  };

  const onDragOver = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const onLogoFileSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = pickImageFile(event.target.files);
    if (!file) return;
    await onUploadLogo(file);
    event.target.value = '';
  };

  const onImageFileSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = pickImageFile(event.target.files);
    if (!file) return;
    await onUploadImage(file);
    event.target.value = '';
  };

  const onLogoDrop = async (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setIsLogoDragOver(false);
    if (logoBusy) return;
    const file = pickImageFile(event.dataTransfer.files);
    if (!file) return;
    await onUploadLogo(file);
  };

  const onImageDrop = async (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setIsCoverDragOver(false);
    if (imageBusy) return;
    const file = pickImageFile(event.dataTransfer.files);
    if (!file) return;
    await onUploadImage(file);
  };

  return (
    <section className="flex flex-col gap-4">
      <Typography variant="h4" color={tokens.color.textPrimary}>
        {t('settings.photos.title')}
      </Typography>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 rounded-xl border border-border-default bg-surface-bg p-5">
          <Typography variant="body2" color={tokens.color.textPrimary}>
            {t('settings.photos.logo')}
          </Typography>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-24 w-24 shrink-0 cursor-copy items-center justify-center overflow-hidden rounded-full border border-dashed border-border-default bg-surface-elevated transition-colors ${
                  logoBusy ? 'opacity-70' : ''
                }`}
                style={isLogoDragOver ? { borderColor: tokens.color.textPrimary } : undefined}
                onDragOver={onDragOver}
                onDragEnter={() => setIsLogoDragOver(true)}
                onDragLeave={() => setIsLogoDragOver(false)}
                onDrop={(event) => void onLogoDrop(event)}
              >
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={t('settings.photos.logoPreviewAlt')}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <PortraitOutlinedIcon sx={{ color: tokens.color.textTertiary, fontSize: 28 }} />
                )}
              </div>
              <Typography variant="caption" color={tokens.color.textSecondary}>
                {logoUrl ? t('settings.photos.logoPreviewAlt') : t('settings.photos.emptyLogo')}
              </Typography>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <UiButton
                type="button"
                uiVariant="secondary"
                startIcon={<CloudUploadOutlinedIcon />}
                onClick={() => logoInputRef.current?.click()}
                loading={logoBusy}
                disabled={logoBusy}
              >
                {t('settings.actions.upload')}
              </UiButton>
              <UiButton
                type="button"
                uiVariant="ghost"
                startIcon={<DeleteOutlineOutlinedIcon />}
                onClick={() => void onDeleteLogo()}
                disabled={!logoUrl || logoBusy}
              >
                {t('settings.actions.delete')}
              </UiButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-border-default bg-surface-bg p-5">
          <div className="flex flex-wrap items-center gap-3">
            <Typography variant="body2" color={tokens.color.textPrimary}>
              {t('settings.photos.cover')}
            </Typography>
            <div className="flex flex-wrap items-center gap-2 sm:ml-auto sm:justify-end">
              <UiButton
                type="button"
                uiVariant="secondary"
                startIcon={<CloudUploadOutlinedIcon />}
                onClick={() => imageInputRef.current?.click()}
                loading={imageBusy}
                disabled={imageBusy}
              >
                {t('settings.actions.upload')}
              </UiButton>
              <UiButton
                type="button"
                uiVariant="ghost"
                startIcon={<DeleteOutlineOutlinedIcon />}
                onClick={() => void onDeleteImage()}
                disabled={!imageUrl || imageBusy}
              >
                {t('settings.actions.delete')}
              </UiButton>
            </div>
          </div>
          <div
            className={`flex w-full max-w-[540px] cursor-copy items-center justify-center overflow-hidden rounded-lg border border-dashed border-border-default bg-surface-elevated transition-colors ${
              imageBusy ? 'opacity-70' : ''
            }`}
            style={
              isCoverDragOver
                ? { aspectRatio: COVER_ASPECT_RATIO, borderColor: tokens.color.textPrimary }
                : { aspectRatio: COVER_ASPECT_RATIO }
            }
            onDragOver={onDragOver}
            onDragEnter={() => setIsCoverDragOver(true)}
            onDragLeave={() => setIsCoverDragOver(false)}
            onDrop={(event) => void onImageDrop(event)}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={t('settings.photos.coverPreviewAlt')}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <ImageOutlinedIcon sx={{ color: tokens.color.textTertiary, fontSize: 28 }} />
                <Typography variant="caption" color={tokens.color.textSecondary}>
                  {t('settings.photos.emptyCover')}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>

      <input
        ref={logoInputRef}
        hidden
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(event) => void onLogoFileSelected(event)}
      />
      <input
        ref={imageInputRef}
        hidden
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(event) => void onImageFileSelected(event)}
      />
    </section>
  );
}
