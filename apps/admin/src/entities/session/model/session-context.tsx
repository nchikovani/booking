import { createContext } from 'react';

export type SessionContextValue = {
  ready: boolean;
};

export const SessionContext = createContext<SessionContextValue>({ ready: false });
