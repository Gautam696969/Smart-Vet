import { useEffect, useState } from 'react';

interface CurrentUser {
  id: number;
  email: string;
  full_name?: string;
  role: 'admin' | 'doctor' | 'patient';
}

function parseJwt(token: string): any {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export function useCurrentUser(): { user: CurrentUser | null, loading: boolean } {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    const payload = parseJwt(token);
    if (payload && payload.sub && payload.email) {
      // Optionally, fetch more user info from backend here
      setUser({
        id: payload.sub,
        email: payload.email,
        full_name: payload.full_name,
        role: payload.role || 'patient',
      });
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  return { user, loading };
}