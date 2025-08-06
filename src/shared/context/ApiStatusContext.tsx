import React, { createContext, useContext, useState, ReactNode } from 'react';

type ApiStatusContextType = {
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

const ApiStatusContext = createContext<ApiStatusContextType | undefined>(undefined);

export const ApiStatusProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <ApiStatusContext.Provider value={{ loading, error, setLoading, setError }}>
      {children}
    </ApiStatusContext.Provider>
  );
};

export const useApiStatus = () => {
  const context = useContext(ApiStatusContext);
  if (!context) {
    throw new Error('useApiStatus must be used within an ApiStatusProvider');
  }
  return context;
};