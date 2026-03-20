import { useContext } from 'react';
import { useSessionStore } from './session-store';
import { SessionContext, type SessionContextValue } from './session-context';

export function useSession(): SessionContextValue & { isAuthenticated: boolean } {
  const { ready } = useContext(SessionContext);
  const user = useSessionStore((s) => s.user);
  const isAuthenticated = Boolean(ready && user);
  return { ready, isAuthenticated };
}
