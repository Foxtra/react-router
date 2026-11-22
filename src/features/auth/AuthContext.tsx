import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { AuthError, fetchProfile, loginRequest } from './api';
import type { Profile } from './types';

const TOKEN_KEY = 'auth_token';
const PROFILE_KEY = 'auth_profile';

interface AuthContextValue {
  token: string | null;
  profile: Profile | null;
  ready: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  handleUnauthorized: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredProfile(): Profile | null {
  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Profile;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem(TOKEN_KEY),
  );
  const [profile, setProfile] = useState<Profile | null>(() =>
    readStoredProfile(),
  );
  const [ready, setReady] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(PROFILE_KEY);
    setToken(null);
    setProfile(null);
  }, []);

  const handleUnauthorized = useCallback(() => {
    logout();
  }, [logout]);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (!storedToken) {
        if (!cancelled) setReady(true);
        return;
      }

      try {
        const me = await fetchProfile(storedToken);
        if (!cancelled) {
          setToken(storedToken);
          setProfile(me);
          localStorage.setItem(PROFILE_KEY, JSON.stringify(me));
        }
      } catch (error) {
        if (error instanceof AuthError && error.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(PROFILE_KEY);
          if (!cancelled) {
            setToken(null);
            setProfile(null);
          }
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    }

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const nextToken = await loginRequest(username, password);
    const me = await fetchProfile(nextToken);
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(me));
    setToken(nextToken);
    setProfile(me);
  }, []);

  const value = useMemo(
    () => ({
      token,
      profile,
      ready,
      login,
      logout,
      handleUnauthorized,
    }),
    [token, profile, ready, login, logout, handleUnauthorized],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
