import React from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/index.css'
import App from './App'
import { ApiStatusProvider, useApiStatus } from '../shared/context/ApiStatusContext'
import Loader from '../shared/components/Loader'
import ErrorSnackbar from '../shared/components/ErrorSnackbar'
const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

const AppWithStatus: React.FC = () => {
  const { error, setError } = useApiStatus();
  return (
    <>
      <App />
      <ErrorSnackbar message={error || ''} onClose={() => setError(null)} />
    </>
  );
};

root.render(
  <AppWithStatus />
)