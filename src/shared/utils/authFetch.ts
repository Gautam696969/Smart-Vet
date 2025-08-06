/**
 * A wrapper around fetch that adds the Authorization header if a token is present in localStorage.
 */
export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = localStorage.getItem('authToken');
  const headers = new Headers(init.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  } else {
    console.warn('authFetch: No authToken found in localStorage');
  }
  return fetch(input, { ...init, headers });
}