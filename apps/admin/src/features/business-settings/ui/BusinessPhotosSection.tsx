import { useTranslation } from 'react-i18next';
import { PhotoUploadCard } from '@shared/ui/PhotoUploadCard';

const COVER_ASPECT_RATIO = '2 / 1';

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

  return (
    <section className="flex flex-col gap-4">
      <PhotoUploadCard
        title={t('settings.photos.logo')}
        supportText='Поддерживаются PNG, JPG и WEBP'
        images={logoUrl ? [{ imageUrl: logoUrl }] : []}
        busy={logoBusy}
        onUpload={onUploadLogo}
        onDelete={async () => {
          await onDeleteLogo();
        }}
        renderImage={(imageSrc) => (
          <div className="flex h-full w-full items-center justify-center p-2">
            <img
              src={imageSrc}
              alt={t('settings.photos.logoPreviewAlt')}
              className="h-full rounded-full border border-border-default object-cover shadow-sm"
            />
          </div>
        )}
      />
      <PhotoUploadCard
        title={t('settings.photos.cover')}
        supportText='Поддерживаются PNG, JPG и WEBP'
        images={imageUrl ? [{ imageUrl }] : []}
        busy={imageBusy}
        onUpload={onUploadImage}
        onDelete={async () => {
          await onDeleteImage();
        }}
        renderImage={(imageSrc) => (
          <div className="h-full" style={{ aspectRatio: COVER_ASPECT_RATIO }}>
            <img src={imageSrc} alt={t('settings.photos.coverPreviewAlt')} className="h-full w-full object-cover" />
          </div>
        )}
      />
    </section>
  );
}
