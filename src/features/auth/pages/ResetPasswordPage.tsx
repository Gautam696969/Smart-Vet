import React, { useState } from 'react'
import AlertMessage from '../../../shared/components/AlertMessage'
import LeftContainer from './leftcontainer'
import { useSearchParams } from 'react-router-dom'
import { resetPassword } from 'shared/utils/graphqlFetch'
import Loader from 'shared/components/Loader'

const ResetPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token')

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault()
    setMessage('')
    setError('')

    if (!token) {
      setError('Invalid or missing reset token.')
      return
    }
    if (!newPassword || !confirmPassword) {
      setError('Please enter and confirm your new password.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const response = await resetPassword(newPassword, token)
    
      if (response.data.resetPassword.status === 200) {
        setMessage('Password reset successful! You can now log in.')
      } else {
        setError('Failed to reset password.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch justify-center bg-white dark:bg-[#111827]">
      {/* Left side: Illustration/Accent */}
      <div className="hidden md:flex md:w-1/2 login-illustration-bg items-center justify-center relative bg-transparent bg-white dark:bg-[#111827]">
        <LeftContainer />
      </div>
      {/* Partition Divider */}
      <div className="w-[2px] min-h-[60vh] bg-gradient-to-b from-transparent dark:via-[var(--mid-gray)] via-[var(--flamingo)] to-transparent mx-2 rounded-sm opacity-70 self-center"></div>
      {/* Right side: Reset Password Form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="border border-[#e5e7eb26] bg-gradient-to-br from-white via-[#FFF8F6] to-[#FFF4F0] dark:border-gray-700/50 dark:from-gray-800/50 dark:via-gray-800/50 dark:to-gray-900/50 p-4 md:p-6 relative rounded-3xl">
             {loading && (
              <div>
                <Loader />
              </div>
            )}
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="text-[var(--flamingo)] font-semibold text-3xl mb-2">
                Reset Password
              </h2>
              <p className="text-[var(--ebony-clay)] dark:text-white text-sm">
                Enter your new password below to reset your account.
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="login-input-group">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="dark:bg-[#17202e] w-full border border-[var(--shuttle-gray)] rounded-xl p-4 text-base leading-6 transition-all duration-200 ease-in-out text-[var(--ebony-clay)]  placeholder-[var(--ebony-clay)] dark:placeholder-[var(--mid-gray)] dark:focus:bg-[var(--ebony-clay)] focus:bg-white focus:border-[var(--flamingo)] focus:outline-none focus:translate-y-[-1px] focus:placeholder-opacity-70 hover:border-[var(--flamingo)] dark:text-white"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="login-input-group">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="dark:bg-[#17202e] w-full border border-[var(--shuttle-gray)] rounded-xl p-4 text-base leading-6 transition-all duration-200 ease-in-out text-[var(--ebony-clay)]  placeholder-[var(--ebony-clay)] dark:placeholder-[var(--mid-gray)] dark:focus:bg-[var(--ebony-clay)] focus:bg-white focus:border-[var(--flamingo)] focus:outline-none focus:translate-y-[-1px] focus:placeholder-opacity-70 hover:border-[var(--flamingo)] dark:text-white"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <AlertMessage message={error} type="error" />}
              {message && <AlertMessage message={message} type="success" />}
              <div>
                <button
                  type="submit"
                  className="w-full login-btn transition-all duration-200 ease-in-out font-semibold rounded-xl py-3 text-lg shadow-md bg-[#eb5c1e] text-white hover:bg-[#d44e13] focus:outline-none focus:ring-2 focus:ring-[#eb5c1e] focus:ring-offset-2 active:scale-95 disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
              <div className="text-center">
                <a
                  href="/login"
                  className="text-[var(--flamingo)] hover:underline hover:text-[#d44e13] transition-colors duration-200 text-sm font-medium"
                >
                  Back to sign in
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
