import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { tokens } from '@repo/ui';
import { useSessionStore } from '@entities/session';
import { useLogoutMutation } from '@features/auth';
import { useSidebarStore } from '@shared/store/sidebar-store';
import { useThemeStore } from '@shared/store/theme-store';
import {
  ROUTE_HOME,
  ROUTE_SERVICES,
  ROUTE_EMPLOYEES,
  ROUTE_CALENDAR,
  ROUTE_CLIENTS,
  ROUTE_SETTINGS,
} from '@shared/constants/routes';

const SIDEBAR_WIDTH_EXPANDED = 260;
const SIDEBAR_WIDTH_COLLAPSED = 80;

type NavItemConfig = {
  path: string;
  labelKey: string;
  Icon: React.ComponentType<{ sx?: object }>;
  /** Точное совпадение пути, чтобы '/' не подсвечивал все роуты */
  exact?: boolean;
};

const NAV_ITEMS: NavItemConfig[] = [
  { path: ROUTE_HOME, labelKey: 'nav.dashboard', Icon: GridViewOutlinedIcon, exact: true },
  { path: ROUTE_SERVICES, labelKey: 'nav.services', Icon: CategoryOutlinedIcon },
  { path: ROUTE_EMPLOYEES, labelKey: 'nav.employees', Icon: PeopleAltOutlinedIcon },
  { path: ROUTE_CALENDAR, labelKey: 'nav.calendar', Icon: CalendarTodayOutlinedIcon },
  { path: ROUTE_CLIENTS, labelKey: 'nav.clients', Icon: GroupsOutlinedIcon },
  { path: ROUTE_SETTINGS, labelKey: 'nav.settings', Icon: SettingsOutlinedIcon },
];

/** Первые две буквы username-части email, заглавными. */
function getInitials(email: unknown): string {
  if (!email || typeof email !== 'string') return '?';
  const username = email.split('@')[0] ?? '';
  return username.slice(0, 2).toUpperCase();
}

/** Показывает только username-часть email (до @). */
function getDisplayName(email: unknown): string {
  if (!email || typeof email !== 'string') return '';
  return email.split('@')[0] ?? email;
}

export function AdminLayout() {
  const { t } = useTranslation();
  const { collapsed, toggle } = useSidebarStore();
  const { pathname } = useLocation();
  const user = useSessionStore((s) => s.user);
  const logoutMutation = useLogoutMutation();

  const [userAnchor, setUserAnchor] = useState<HTMLElement | null>(null);
  const { mode, toggleMode } = useThemeStore();

  const isActive = (item: NavItemConfig) =>
    item.exact ? pathname === item.path : pathname.startsWith(item.path);

  const sidebarWidth = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <div className="flex h-screen overflow-hidden bg-surface-bg">
      {/* ─── Sidebar ───────────────────────────────────────────── */}
      <aside
        className="relative flex shrink-0 flex-col h-full bg-surface-bg border-r border-border-default overflow-visible"
        style={{ width: sidebarWidth, transition: 'width 0.3s ease-in-out' }}
      >
        {/* Кнопка раскрытия/свёртки — на стыке боковой панели и контента */}
        <IconButton
          onClick={toggle}
          size="small"
          aria-label={collapsed ? t('nav.expand') : t('nav.collapse')}
          sx={{
            position: 'absolute',
            right: -14,
            top: 62,
            zIndex: 10,
            width: 28,
            height: 28,
            bgcolor: tokens.color.surfaceCard,
            border: `1px solid ${tokens.color.borderDefault}`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            '&:hover': { bgcolor: tokens.color.surfaceBg },
          }}
        >
          {collapsed ? (
            <ChevronRightRoundedIcon sx={{ fontSize: 16, color: tokens.color.textSecondary }} />
          ) : (
            <ChevronLeftRoundedIcon sx={{ fontSize: 16, color: tokens.color.textSecondary }} />
          )}
        </IconButton>

        {/* ─── Логотип ───────────────────────────────────────────── */}
        <div className="flex shrink-0 items-center gap-3 overflow-hidden px-5 py-6">
          <div className="size-10 shrink-0 rounded-[10px] bg-primary" aria-hidden />
          <Typography
            component="p"
            variant="h4"
            color={tokens.color.textPrimary}
            noWrap
            sx={{
              opacity: collapsed ? 0 : 1,
              transition: 'opacity 0.2s ease-in-out',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {t('common.brand')}
          </Typography>
        </div>

        {/* ─── Навигация ─────────────────────────────────────────── */}
        <nav className="flex-1 overflow-hidden px-4">
          <List disablePadding>
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              return (
                <Tooltip
                  key={item.path}
                  title={collapsed ? t(item.labelKey) : ''}
                  placement="right"
                  arrow
                >
                  {/* span нужен, чтобы Tooltip корректно получал ref при любых состояниях */}
                  <span style={{ display: 'block' }}>
                    <ListItemButton
                      component={Link as React.ElementType}
                      to={item.path}
                      selected={active}
                      sx={{
                        borderRadius: '10px',
                        mb: '4px',
                        minHeight: 44,
                        p: 0,
                        overflow: 'hidden',
                        transition: 'background-color 0.15s',
                        color: tokens.color.textSecondary,
                        '&.Mui-selected': {
                          bgcolor: tokens.color.primary,
                          color: '#ffffff',
                          '& .MuiListItemIcon-root': { color: '#ffffff' },
                          '&:hover': { bgcolor: tokens.color.primary },
                        },
                        '&:not(.Mui-selected):hover': {
                          bgcolor: 'rgba(99, 102, 241, 0.06)',
                        },
                      }}
                    >
                      {/*
                       * Иконка в фиксированной 48×44px зоне — всегда по центру.
                       * 16px (паддинг nav) + 24px (центр зоны) = 40px от края sidebar.
                       * При collapsed sidebar = 80px: 40px = точный центр. Иконка не двигается.
                       */}
                      <ListItemIcon
                        sx={{
                          color: 'inherit',
                          minWidth: 0,
                          width: 48,
                          height: 44,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <item.Icon sx={{ fontSize: 20 }} />
                      </ListItemIcon>

                      <Typography
                        variant="body1"
                        noWrap
                        sx={{
                          opacity: collapsed ? 0 : 1,
                          maxWidth: collapsed ? 0 : 180,
                          overflow: 'hidden',
                          transition: 'opacity 0.2s ease-in-out, max-width 0.3s ease-in-out',
                        }}
                      >
                        {t(item.labelKey)}
                      </Typography>
                    </ListItemButton>
                  </span>
                </Tooltip>
              );
            })}
          </List>
        </nav>

        {/* ─── Блок пользователя ─────────────────────────────────── */}
        {/* px-4 выравнивает аватар с иконками навигации (nav тоже px-4) */}
        <div className="shrink-0 border-t border-border-default">
          <button
            type="button"
            onClick={(e) => setUserAnchor(e.currentTarget)}
            className="px-4 flex w-full cursor-pointer items-center overflow-hidden transition-colors hover:bg-black/[0.04]"
          >
            {/* Аватар в фиксированной 48px зоне — симметрично с иконками навигации */}
            <div className="flex size-[48px] shrink-0 items-center justify-center py-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-border-default">
                <Typography variant="caption" color={tokens.color.textSecondary}>
                  {getInitials(user?.email)}
                </Typography>
              </div>
            </div>

            <div
              className="overflow-hidden text-left"
              style={{
                opacity: collapsed ? 0 : 1,
                maxWidth: collapsed ? 0 : 160,
                transition: 'opacity 0.2s ease-in-out, max-width 0.3s ease-in-out',
              }}
            >
              <Typography component="p" variant="caption" color={tokens.color.textPrimary} noWrap>
                {getDisplayName(user?.email)}
              </Typography>
            </div>
          </button>
        </div>
      </aside>

      {/* ─── Основной контент ──────────────────────────────────── */}
      <main className="flex flex-1 flex-col overflow-auto py-8 px-10 gap-6">
        <Outlet />
      </main>

      {/* ─── Попаут пользователя ───────────────────────────────── */}
      <Popover
        open={Boolean(userAnchor)}
        anchorEl={userAnchor}
        onClose={() => setUserAnchor(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '10px',
              border: `1px solid ${tokens.color.borderDefault}`,
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              minWidth: 180,
              p: 0.5,
            },
          },
        }}
      >
        {/* Переключатель темы — Switch только визуальный, клик по строке переключает */}
        <MenuItem
          onClick={toggleMode}
          sx={{
            gap: 1.5,
            py: 1.5,
            px: 2,
            borderRadius: '8px',
            color: tokens.color.textPrimary,
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <DarkModeOutlinedIcon sx={{ fontSize: 18, color: tokens.color.textSecondary }} />
            <Typography variant="body2" color={tokens.color.textPrimary}>
              {t('theme.dark')}
            </Typography>
          </div>
          <Switch
            size="small"
            checked={mode === 'dark'}
            sx={{ pointerEvents: 'none', ml: 1 }}
            inputProps={{ tabIndex: -1 }}
          />
        </MenuItem>

        <Divider sx={{ mx: 1, my: 0.5 }} />

        <MenuItem
          onClick={() => {
            setUserAnchor(null);
            logoutMutation.mutate();
          }}
          disabled={logoutMutation.isPending}
          sx={{
            gap: 1.5,
            py: 1.5,
            px: 2,
            borderRadius: '8px',
            color: tokens.color.textPrimary,
          }}
        >
          <LogoutOutlinedIcon sx={{ fontSize: 18, color: tokens.color.textSecondary }} />
          <Typography variant="body2" color={tokens.color.textPrimary}>
            {t('auth.logout')}
          </Typography>
        </MenuItem>
      </Popover>
    </div>
  );
}
