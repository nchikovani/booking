import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { tokens } from '@repo/ui';
import { ROUTE_HOME } from '@shared/constants/routes';

export type BreadcrumbItem = {
  label: string;
  /** Если указан — рендерится как ссылка, иначе как текст (текущая страница). */
  path?: string;
};

type PageLayoutProps = {
  title: string;
  /** Кнопки действий в правой части хедера. */
  actions?: ReactNode;
  /**
   * Хлебные крошки. По умолчанию: "Главная → {title}".
   * Передай пустой массив чтобы скрыть крошки совсем.
   */
  breadcrumbs?: BreadcrumbItem[];
  children?: ReactNode;
};

export function PageLayout({ title, actions, breadcrumbs, children }: PageLayoutProps) {
  const { t } = useTranslation();

  const crumbs: BreadcrumbItem[] = breadcrumbs ?? [
    { label: t('common.home'), path: ROUTE_HOME },
    { label: title },
  ];

  return (
    <div className="flex h-full flex-col gap-6">
      {/* ─── Хедер страницы ────────────────────────────────────── */}
      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Typography component="h1" variant="h1" color={tokens.color.textPrimary}>
            {title}
          </Typography>

          {crumbs.length > 0 && (
            <nav aria-label="breadcrumb" className="flex items-center gap-2">
              {crumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && (
                    <ChevronRightIcon sx={{ fontSize: 14, color: tokens.color.textTertiary }} />
                  )}

                  {crumb.path !== undefined ? (
                    <MuiLink
                      component={RouterLink}
                      to={crumb.path}
                      underline="hover"
                      variant="caption"
                      color={tokens.color.textSecondary}
                      sx={{ fontWeight: 400 }}
                    >
                      {crumb.label}
                    </MuiLink>
                  ) : (
                    <Typography variant="caption" color={tokens.color.textPrimary}>
                      {crumb.label}
                    </Typography>
                  )}
                </div>
              ))}
            </nav>
          )}
        </div>

        {actions != null && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
      </header>

      {/* ─── Контентная карточка ───────────────────────────────── */}
      <div
        className="flex-1 overflow-auto rounded-xl border border-border-default bg-surface-card p-6"
        // style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
      >
        {children}
      </div>
    </div>
  );
}
