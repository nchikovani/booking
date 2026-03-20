import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { runSessionBootstrap } from '@entities/session/api/bootstrap-session';
import { SessionContext } from '@entities/session';

/**
 * Cold start: refresh при отсутствии access → GET /me (Feature 3.1). До `ready` не редиректим с защищённых маршрутов.
 */
export function SessionProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        await runSessionBootstrap();
      } finally {
        if (!cancelled) {
          setReady(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ ready }), [ready]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
