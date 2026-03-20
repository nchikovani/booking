import '@shared/i18n';
import '@api';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initTheme } from '@shared/lib';
import { App } from './App';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './index.css';

/**
 * Подключает module augmentation из `@repo/ui` в один граф компиляции admin
 * (без дублирования деклараций — только импорт исходника пакета).
 */
import '../../../../packages/ui/src/theme/mui-augmentation';

initTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
