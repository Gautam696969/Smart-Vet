import { useCallback } from 'react';
import { useAuthFetch } from '../../../shared/hooks/useAuthFetch';

export const useLogin = () => {
  const authFetch = useAuthFetch();

  const login = useCallback(async (email: string, password: string) => {
    // Example API call, adjust endpoint as needed
    const response = await authFetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    // Handle response as needed (e.g., store token, redirect, etc.)
    // const data = await response.json();
    // ...
  }, [authFetch]);

  // loading and error are now global, so not returned here
  return { login };
};