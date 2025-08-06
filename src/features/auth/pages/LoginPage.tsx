import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../shared/components/Loader'
import AlertMessage from '../../../shared/components/AlertMessage'
import { useApiStatus } from '../../../shared/context/ApiStatusContext'
import LeftContainer from './leftcontainer'
import { graphqlRequest } from '../../../../utils/graphqlClient'
import Auth from 'query/Auth'
import { login } from 'shared/utils/graphqlFetch'
import { setAuthData } from 'shared/utils/authStorage'

interface LoginPageProps {
  onLoginSuccess: () => void
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const navigate = useNavigate()
    const [loading, setLoading] = useState(false)


  // Toggle between light and dark theme

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()
    setError('')
    if (email?.trim() && password?.trim()) {
      try {
        // Use GraphQL login
        const response = await login(email, password)

        const userData = response?.data?.login
        if (!userData || userData?.error || !userData?.accessToken) {
          setError(userData?.message || 'Login failed')
          return
        }
        if (userData?.status === 200) {
          setAuthData(userData)
          onLoginSuccess()
          navigate('/')
        }
      } catch (err) {
        setError('Network error. Please try again.')
      }finally{
        setLoading(false)
      }
    } else {
      setError('Please enter both email and password.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch justify-center bg-white dark:bg-[#111827]">
      {/* Left side: Illustration/Accent */}
      <div className="hidden md:flex md:w-1/2 login-illustration-bg items-center justify-center relative bg-transparent bg-white dark:bg-[#111827]">
        <LeftContainer />
      </div>

      <div className="w-[2px] min-h-[60vh] bg-gradient-to-b from-transparent dark:via-[var(--mid-gray)] via-[var(--flamingo)] to-transparent mx-2 rounded-sm opacity-70 self-center"></div>

      {/* Right side: Login Form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 ">
        <div className="w-full max-w-md">
          <div className="border border-[#e5e7eb26] bg-gradient-to-br from-white via-[#FFF8F6] to-[#FFF4F0] dark:border-gray-700/50 dark:from-gray-800/50 dark:via-gray-800/50 dark:to-gray-900/50 p-4 md:p-6 relative rounded-3xl">
            {/* Theme Toggle Button */}

            {loading && (
              <div>
                <Loader />
              </div>
            )}

            {/* Header */}
            <div className="mb-8 text-center">
              <h2
                className={`text-[var(--flamingo)] font-semibold text-3xl mb-2`}
              >
                Welcome Back
              </h2>
              <p className="text-[var(--ebony-clay)] dark:text-white text-sm">
                Please sign in to your account to continue
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6 " onSubmit={handleSubmit} noValidate>
              <div className="space-y-5">
                <div className="login-input-group">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="dark:bg-[#17202e] w-full border border-[var(--shuttle-gray)] rounded-xl p-4 text-base leading-6 transition-all duration-200 ease-in-out text-[var(--ebony-clay)]  placeholder-[var(--ebony-clay)] dark:placeholder-[var(--mid-gray)] dark:focus:bg-[var(--ebony-clay)] focus:bg-white focus:border-[var(--flamingo)] focus:outline-none focus:translate-y-[-1px] focus:placeholder-opacity-70 hover:border-[var(--flamingo)] dark:text-white"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="login-input-group">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="dark:bg-[#17202e] w-full border border-[var(--shuttle-gray)] rounded-xl p-4 text-base leading-6 transition-all duration-200 ease-in-out text-[var(--ebony-clay)]  placeholder-[var(--ebony-clay)] dark:placeholder-[var(--mid-gray)] dark:focus:bg-[var(--ebony-clay)] focus:bg-white focus:border-[var(--flamingo)] focus:outline-none focus:translate-y-[-1px] focus:placeholder-opacity-70 hover:border-[var(--flamingo)] dark:text-white"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && <AlertMessage message={error} type="error" />}

              <div className="space-y-4">
                <button
                  type="submit"
                  className={`w-full login-btn transition-all duration-200 ease-in-out font-semibold rounded-xl py-3 text-lg shadow-md${
                    theme === 'light' ? ' light' : ''
                  } bg-[#eb5c1e] text-white hover:bg-[#d44e13] focus:outline-none focus:ring-2 focus:ring-[#eb5c1e] focus:ring-offset-2 active:scale-95 disabled:opacity-60`}
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="text-center">
                  <a
                    href="/forgot-password"
                    className="text-[var(--flamingo)] hover:underline hover:text-[#d44e13] transition-colors duration-200 text-sm font-medium"
                  >
                    Forgot your password?
                  </a>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t dark:border-gray-200 border-[var(--flamingo)]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[#FFF4F0] rounded-lg dark:bg-[#17202e] text-[var(--ebony-clay)] dark:text-white">
                      New to Smart Vet?
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <a
                    href="/signup"
                    className="text-[var(--flamingo)] hover:underline hover:text-[#d44e13] transition-colors duration-200 text-sm font-medium"
                  >
                    Create your account
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
