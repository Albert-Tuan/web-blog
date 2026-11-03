import { useCallback, useEffect, useRef, useState } from 'react';
import { authApi } from '../api/auth';
import { apiError } from '../api/client';
import { AuthContext } from './AuthContext';
import { cacheUser, readCachedUser, USER_STORAGE_KEY } from './userStorage';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(readCachedUser);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const generation = useRef(0);

  const applyUser = useCallback(next => {
    setUser(next);
    cacheUser(next);
    setStatus(next ? 'authenticated' : 'anonymous');
    setError('');
  }, []);

  const refresh = useCallback(async () => {
    const current = ++generation.current;
    setStatus('loading');
    setError('');
    try {
      const verified = await authApi.me();
      if (current === generation.current) applyUser(verified);
    } catch (err) {
      if (current !== generation.current) return;
      if (err.response?.status === 401) applyUser(null);
      else {
        // Cached data is not proof of authentication, even during an outage.
        setStatus('error');
        setError(apiError(err));
      }
    }
  }, [applyUser]);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => { if (active) refresh(); });
    const cancelPending = () => { ++generation.current; };
    const sync = event => {
      if (event.key === USER_STORAGE_KEY || event.key === null) refresh();
    };
    const expired = () => { ++generation.current; applyUser(null); };
    window.addEventListener('storage', sync);
    window.addEventListener('webblog:unauthorized', expired);
    window.addEventListener('focus', refresh);
    return () => {
      active = false;
      cancelPending();
      window.removeEventListener('storage', sync);
      window.removeEventListener('webblog:unauthorized', expired);
      window.removeEventListener('focus', refresh);
    };
  }, [refresh, applyUser]);

  async function authenticate(method, credentials) {
    const current = ++generation.current;
    const result = await authApi[method](credentials);
    if (current === generation.current) applyUser(result);
    else await refresh();
    return result;
  }

  async function logout() {
    ++generation.current;
    await authApi.logout();
    ++generation.current;
    applyUser(null);
  }

  return <AuthContext.Provider value={{
    user, status, error, refresh, isAuthenticated: status === 'authenticated',
    login: credentials => authenticate('login', credentials),
    register: credentials => authenticate('register', credentials), logout,
  }}>{children}</AuthContext.Provider>;
}
