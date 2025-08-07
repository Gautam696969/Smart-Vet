import React, { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import SignupPage from '../features/auth/pages/SignupPage'
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage'
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage'
import DashboardHomePage from '../features/dashboard/DashboardHomePage'
import AccountPasswordPage from '../features/auth/pages/AccountPasswordPage'
import Home from '../features/dashboard/Home'
import About from '../features/dashboard/About'
import SidebarLayout from '../layouts/SidebarLayout'
import MUPage from '../features/mu/pages/MUPage'
import DeviceTestScreen from '../features/telehealth/DeviceTestScreen'
import DoctorDashboard from '../features/doctors/pages/DoctorDashboard'
import PatientDashboard from '../features/patients/pages/PatientDashboard'
import AdminDashboard from '../features/admin/pages/AdminDashboard'
import AppointmentBooking from '../features/appointments/pages/AppointmentBooking'
import ChatMenuPage from '../features/chat/ChatMenuPage'
import TermsAndConditionsPage from '../features/auth/legal/TermsAndConditionsPage'
import PrivacyPolicyPage from 'features/auth/legal/PrivacyPolicyPage'
import AppointmentHistoryPage from '../features/appointmentHistory/AppointmentHistoryPage'
import DashboardPage from '../features/dashboard/Dashboard'
import { ThemeProvider, useTheme } from 'shared/context/ThemeContext'
import NotFoundPage from './404page'
import MessagesInfoPage from 'features/messages/MessagesInfoPage'
import MessagesPage from 'features/messages/MessagesPage'
import ClientsPage from 'features/client/ClientPage'
import ClientInfo from 'features/client/ClientInfo'
import ClientEditPage from 'features/client/ClientEditPage'
import ServicePage from 'features/services/Services'
import CreateServicePage from 'features/services/CreateServices'
import CreateServiceCategoryPage from 'features/services/CreateServiceCategoryPage'
import useAuthGuard from 'shared/utils/refreshToken'
import { verifyToken } from 'shared/utils/graphqlFetch'
import Loader from 'shared/components/Loader'
import { clearAuthData } from 'shared/utils/authStorage'
import MyLocation from 'features/location/pages/Location'

// Theme toggle button component
const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-[#FF512F]/10 dark:hover:bg-[#FF512F]/10 hover:text-[#FF512F] transition-all"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        // Sun SVG
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          fill="none"
          viewBox="0 0 24 24"
          className="transition-transform duration-500 hover:rotate-90"
        >
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          />
        </svg>
      ) : (
        // Moon SVG
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          fill="none"
          viewBox="0 0 24 24"
          className="transition-transform duration-500 hover:-rotate-90"
        >
          <path
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      )}
    </button>
  )
}

const AppRouter: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const isMountedRef = useRef(true)

  useEffect(() => {
    const checkToken = async () => {


      // Check for authToken in localStorage for session persistence
      const token = localStorage.getItem('authToken')

      if (!token) {

        if (isMountedRef.current) {
          setIsAuthenticated(false)
          setIsLoading(false)
        }
        return
      }



      try {
        const res = await verifyToken(token)


        // Check if component is still mounted before updating state
        if (!isMountedRef.current) return

        if (res?.data?.verifyToken?.status === 200) {
          console.log('Token is valid')
          setIsAuthenticated(true)
        } else {
          console.log('Token is invalid')
          setIsAuthenticated(false)
          // Clear invalid token
          clearAuthData()
        }
      } catch (error) {
        console.error('Token verification failed:', error)
        if (isMountedRef.current) {
          setIsAuthenticated(false)
          // Clear token on error
          clearAuthData()
        }
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false)

        }
      }
    }

    checkToken()

    // Cleanup function to mark component as unmounted
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const handleLogout = () => {
    clearAuthData()
    setIsAuthenticated(false)
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }


  if (isLoading) {
    return (
      <ThemeProvider>
        <Loader />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <ThemeToggleButton />

      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <LoginPage onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <SignupPage />
            }
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password-email" element={<ResetPasswordPage />} />

          <Route path="/terms" element={<TermsAndConditionsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          {isAuthenticated ? (
            <>
              <Route
                path="/home"
                element={
                  <SidebarLayout onLogout={handleLogout}>
                    <DashboardPage />
                  </SidebarLayout>
                }
              />
              <Route
                path="/appointments/history"
                element={
                  <SidebarLayout onLogout={handleLogout}>
                    <AppointmentHistoryPage />
                  </SidebarLayout>
                }
              />
              <Route
                path="/"
                element={
                  <SidebarLayout onLogout={handleLogout}>
                    <DashboardHomePage onLogout={handleLogout} />
                  </SidebarLayout>
                }
              />
              <Route
                path="/home"
                element={
                  <SidebarLayout onLogout={handleLogout}>
                    <Home />
                  </SidebarLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <SidebarLayout onLogout={handleLogout}>
                    <About />
                  </SidebarLayout>
                }
              />
              <Route
                path="/mu"
                element={
                  <SidebarLayout onLogout={handleLogout}>
                    <MUPage />
                  </SidebarLayout>
                }
              />
              <Route
                path="/book-appointment"
                element={
                  <SidebarLayout onLogout={handleLogout}>
                    <AppointmentBooking />
                  </SidebarLayout>
                }
              />

              <Route
                path="/admin-dashboard"
                element={
                  <SidebarLayout onLogout={handleLogout}>
                    <AdminDashboard />
                  </SidebarLayout>
                }
              />


                <Route
                path="/myLocation"
                element={
                  <SidebarLayout onLogout={handleLogout}>
                    <MyLocation />
                  </SidebarLayout>
                }
              />


              <Route
                path="/doctor-dashboard"
                element={
                  <SidebarLayout onLogout={handleLogout}>
                    <DoctorDashboard />
                  </SidebarLayout>
                }
              />
              <Route
                path="/patient-dashboard"
                element={
                  <SidebarLayout onLogout={handleLogout}>
                    <PatientDashboard />
                  </SidebarLayout>
                }
              />

              <Route
                path="/reset-password"
                element={
                  <SidebarLayout onLogout={handleLogout}>
                    <AccountPasswordPage />
                  </SidebarLayout>
                }
              />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
          {/* Chat Menu Route */}
          {isAuthenticated && (
            <Route
              path="/chat"
              element={
                <SidebarLayout onLogout={handleLogout}>
                  <ChatMenuPage />
                </SidebarLayout>
              }
            />
          )}
           {isAuthenticated && (
          <Route
            path="/messages"
            element={
              <SidebarLayout onLogout={handleLogout}>
                <MessagesPage />
              </SidebarLayout>
            }
          />
        )}
         {isAuthenticated && (
          <Route
            path="/messages/:messageId"
            element={
              <SidebarLayout onLogout={handleLogout}>
                <MessagesInfoPage />
              </SidebarLayout>
            }
          />
        )}
        {isAuthenticated && (
          <Route
            path="/clients"
            element={
              <SidebarLayout onLogout={handleLogout}>
                <ClientsPage />
              </SidebarLayout>
            }
          />
        )}
        {isAuthenticated && (
          <Route
            path="/clients/:id"
            element={
              <SidebarLayout onLogout={handleLogout}>
                <ClientInfo />
              </SidebarLayout>
            }
          />
        )}
        {isAuthenticated && (
          <Route
            path="/clients/:id"
            element={
              <SidebarLayout onLogout={handleLogout}>
                <ClientInfo />
              </SidebarLayout>
            }
          />
        )}
        {isAuthenticated && (
          <Route
            path="/clients/:id/edit"
            element={
              <SidebarLayout onLogout={handleLogout}>
                <ClientEditPage />
              </SidebarLayout>
            }
          />
        )}
        {isAuthenticated && (
          <Route
            path="/services"
            element={
              <SidebarLayout onLogout={handleLogout}>
                <ServicePage />
              </SidebarLayout>
            }
          />
        )}
        {isAuthenticated && (
          <Route
            path="/services/create"
            element={
              <SidebarLayout onLogout={handleLogout}>
                <CreateServicePage />
              </SidebarLayout>
            }
          />
        )}
        {isAuthenticated && (
          <Route
            path="/services/edit/:id"
            element={
              <SidebarLayout onLogout={handleLogout}>
                <CreateServicePage />
              </SidebarLayout>
            }
          />
        )}
        {isAuthenticated && (
          <Route
            path="/services-categories/create"
            element={
              <SidebarLayout onLogout={handleLogout}>
                <CreateServiceCategoryPage />
              </SidebarLayout>
            }
          />
        )}
        {isAuthenticated && (
          <Route
            path="/services-categories/edit/:id"
            element={
              <SidebarLayout onLogout={handleLogout}>
                <CreateServiceCategoryPage />
              </SidebarLayout>
            }
          />
        )}
        {/* /service-categories/create */}
        {/* Device Test Route */}
        {isAuthenticated && (
          <Route
            path="/device-test"
              element={
                <SidebarLayout onLogout={handleLogout}>
                  <DeviceTestScreen />
                </SidebarLayout>
              }
            />
          )}
          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default AppRouter
