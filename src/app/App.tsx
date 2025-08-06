import React from 'react'
import AppRouter from '../routes/AppRouter'
import { ApiStatusProvider } from '../shared/context/ApiStatusContext'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import '../i18n/config'
import { LanguageProvider } from '../contexts/LanguageContext';

const theme = createTheme()

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <ApiStatusProvider>
          <AppRouter />
        </ApiStatusProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
