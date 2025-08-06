import { useApiStatus } from '../context/ApiStatusContext';
import { authFetch } from '../utils/authFetch';

export function useAuthFetch() {
  const { setLoading, setError } = useApiStatus();

  const wrappedFetch = async (input: RequestInfo, init: RequestInit = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authFetch(input, init);
      if (!response.ok) {
        let errorMsg = `Error: ${response.status}`;
        try {
          const data = await response.json();
          errorMsg = data.message || errorMsg;
        } catch {
          // ignore JSON parse error
        }
        setError(errorMsg);
        throw new Error(errorMsg);
      }
      return response;
    } catch (err: any) {
      setError(err.message || 'Network error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return wrappedFetch;
}