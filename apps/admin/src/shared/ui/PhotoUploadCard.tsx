import { useRef, useState, type ChangeEvent, type DragEvent, type ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { tokens } from '@repo/ui';

type PhotoUploadCardProps = {
  title: string;
  images: { imageUrl: string }[];
  busy: boolean;
  onUpload: (file: File) => Promise<void>;
  onDelete: (imageUrl: string) => Promise<void>;
  renderImage?: (imageUrl: string, index: number) => ReactNode;
  supportText?: string;
};

export function PhotoUploadCard({
  title,
  images,
  busy,
  onUpload,
  onDelete,
  renderImage,
  supportText,
}: PhotoUploadCardProps) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dragDepthRef = useRef(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewVersion, setPreviewVersion] = useState(0);

  const pickImageFile = (files: FileList | File[] | null | undefined): File | null => {
    if (!files?.length) return null;
    const file = Array.isArray(files) ? files[0] : files.item(0);
    if (!file) return null;
    return file.type.startsWith('image/') ? file : null;
  };

  const bumpPreviewVersion = () => {
    setPreviewVersion((prev) => prev + 1);
  };

  const handleUpload = async (file: File | null) => {
    if (!file) return;
    await onUpload(file);
    bumpPreviewVersion();
  };

  const onFileSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = pickImageFile(event.target.files);
    await handleUpload(file);
    event.target.value = '';
  };

  const onDragOver = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const onDragEnter = () => {
    dragDepthRef.current += 1;
    setIsDragOver(true);
  };

  const onDragLeave = () => {
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    if (dragDepthRef.current === 0) {
      setIsDragOver(false);
    }
  };

  const onDrop = async (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    dragDepthRef.current = 0;
    setIsDragOver(false);
    if (busy) return;
    const file = pickImageFile(event.dataTransfer.files);
    await handleUpload(file);
  };

  const getImageSrc = (url: string) => {
    if (!url) return url;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${previewVersion}`;
  };

  return (
    <article
      className={`flex h-full flex-col rounded-xl border border-dashed border-border-default bg-surface-bg p-4 transition-colors ${busy ? 'opacity-70' : ''}`}
      style={isDragOver ? { borderColor: tokens.color.textPrimary } : undefined}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={(event) => void onDrop(event)}
    >
      <div>
        <Typography variant="h4" color={tokens.color.textPrimary}>
          {title}
        </Typography>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-3 pt-3">
        <div className="flex min-w-0 items-center gap-3">
          <CloudUploadOutlinedIcon sx={{ color: tokens.color.textTertiary, fontSize: 34 }} />
          <div className="min-w-0">
            <Typography variant="body2" color={tokens.color.textPrimary}>
              <Trans
                i18nKey="shared.photoUpload.description"
                components={{
                  uploadButton: (
                    <Typography
                      component="button"
                      variant="body2"
                      color="primary"
                      className="cursor-pointer hover:!text-primary-dark"
                      onClick={() => inputRef.current?.click()}
                      disabled={busy}
                    />
                  ),
                }}
              />
            </Typography>
            <Typography variant="caption" color={tokens.color.textSecondary}>
              {supportText}
            </Typography>
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-3 pt-6">
          {images.map(({ imageUrl }, index) => (
            <div
              key={imageUrl}
              className="relative h-40 w-fit max-w-full shrink-0 overflow-hidden rounded-xl border border-border-default bg-surface-elevated"
            >
              {renderImage ? (
                renderImage(imageUrl, index)
              ) : (
                <img
                  src={getImageSrc(imageUrl)}
                  alt={`${title}-${index + 1}`}
                  className="h-full w-auto max-w-full object-cover"
                />
              )}
              <button
                type="button"
                className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition-opacity hover:opacity-90"
                onClick={() => void onDelete(imageUrl)}
                disabled={busy}
                aria-label={t('settings.actions.delete')}
              >
                <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(event) => void onFileSelected(event)}
      />
    </article>
  );
}
