import { describe, it, expect, beforeEach } from 'vitest';
import { useSessionStore } from './session-store';

describe('session-store', () => {
  beforeEach(() => {
    useSessionStore.getState().resetSession();
  });

  it('должен хранить accessToken и сбрасывать при resetSession (TC-1, TC-8)', () => {
    const { setAccessToken, setUser, resetSession } = useSessionStore.getState();
    setAccessToken('jwt');
    setUser({ id: '1', email: null, firstName: null, lastName: null, businessId: 'business-1' });
    expect(useSessionStore.getState().accessToken).toBe('jwt');
    expect(useSessionStore.getState().user).not.toBeNull();

    resetSession();
    expect(useSessionStore.getState().accessToken).toBeNull();
    expect(useSessionStore.getState().user).toBeNull();
  });

  it('должен оставаться гостем без явного setAccessToken (TC-2)', () => {
    expect(useSessionStore.getState().accessToken).toBeNull();
    expect(useSessionStore.getState().user).toBeNull();
  });
});
