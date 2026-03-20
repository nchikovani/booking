import { create } from 'zustand';
import { STORAGE_KEY_SIDEBAR_COLLAPSED } from '@shared/constants/storage';

interface SidebarStore {
  collapsed: boolean;
  toggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
}

function getStoredCollapsed(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY_SIDEBAR_COLLAPSED) === 'true';
}

function persistCollapsed(value: boolean): void {
  localStorage.setItem(STORAGE_KEY_SIDEBAR_COLLAPSED, String(value));
}

export const useSidebarStore = create<SidebarStore>()((set) => ({
  collapsed: getStoredCollapsed(),
  toggle: () =>
    set((state) => {
      const next = !state.collapsed;
      persistCollapsed(next);
      return { collapsed: next };
    }),
  setCollapsed: (collapsed) => {
    persistCollapsed(collapsed);
    set({ collapsed });
  },
}));
