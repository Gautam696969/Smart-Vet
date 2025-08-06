import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertMessage from '../../../shared/components/AlertMessage'
import LeftContainer from './leftcontainer'
import { signUp } from 'shared/utils/graphqlFetch'
import Loader from 'shared/components/Loader'

const roles = [
  { value: 'patient', label: 'Patient' },
  { value: 'doctor', label: 'Doctor' },
  { value: 'admin', label: 'Admin' }
]

// Example timezone list (expanded)
const timezones = [
  // US/Canada
  { value: 'Pacific/Honolulu', label: 'Hawaii Time' },
  { value: 'America/Anchorage', label: 'Alaska Time' },
  { value: 'America/Los_Angeles', label: 'Pacific Time - US & Canada' },
  { value: 'America/Denver', label: 'Mountain Time - US & Canada' },
  { value: 'America/Whitehorse', label: 'Yukon Time' },
  { value: 'America/Phoenix', label: 'Arizona Time' },
  { value: 'America/Chicago', label: 'Central Time - US & Canada' },
  { value: 'America/New_York', label: 'Eastern Time - US & Canada' },
  { value: 'America/Halifax', label: 'Atlantic Time' },
  { value: 'America/St_Johns', label: 'Newfoundland Time' },
  // America
  { value: 'America/Adak', label: 'America/Adak' },
  { value: 'America/Santa_Isabel', label: 'America/Santa Isabel' },
  { value: 'America/Mazatlan', label: 'America/Mazatlan' },
  {
    value: 'America/Guatemala',
    label: 'Saskatchewan, Guatemala, Costa Rica Time'
  },
  { value: 'America/Mexico_City', label: 'Mexico City Time' },
  { value: 'America/Havana', label: 'America/Havana' },
  { value: 'America/Bogota', label: 'Bogota, Jamaica, Lima Time' },
  { value: 'America/Goose_Bay', label: 'Atlantic Time' },
  { value: 'America/Caracas', label: 'Caracas Time' },
  { value: 'America/Campo_Grande', label: 'America/Campo Grande' },
  { value: 'America/Santiago', label: 'Santiago Time' },
  { value: 'America/Asuncion', label: 'Asuncion Time' },
  { value: 'America/Santo_Domingo', label: 'Atlantic Standard Time' },
  { value: 'America/Godthab', label: 'America/Godthab' },
  { value: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires Time' },
  { value: 'America/Montevideo', label: 'Montevideo Time' },
  { value: 'America/Miquelon', label: 'America/Miquelon' },
  { value: 'America/Sao_Paulo', label: 'Brasilia Time' },
  { value: 'America/Noronha', label: 'America/Noronha' },
  // Africa
  { value: 'Africa/Lagos', label: 'West Africa Time' },
  { value: 'Africa/Cairo', label: 'Africa/Cairo' },
  { value: 'Africa/Johannesburg', label: 'Central Africa Time' },
  { value: 'Africa/Windhoek', label: 'Africa/Windhoek' },
  // Asia
  { value: 'Asia/Amman', label: 'Syria, Jordan Time' },
  { value: 'Asia/Gaza', label: 'Asia/Gaza' },
  { value: 'Asia/Beirut', label: 'Jordan, Lebanon Time' },
  { value: 'Asia/Damascus', label: 'Asia/Damascus' },
  { value: 'Asia/Jerusalem', label: 'Israel Time' },
  { value: 'Asia/Baghdad', label: 'Baghdad, East Africa Time' },
  { value: 'Asia/Tehran', label: 'Tehran Time' },
  { value: 'Asia/Yerevan', label: 'Asia/Yerevan' },
  { value: 'Asia/Dubai', label: 'Dubai Time' },
  { value: 'Asia/Baku', label: 'Asia/Baku' },
  { value: 'Asia/Kabul', label: 'Kabul Time' },
  { value: 'Asia/Karachi', label: 'Pakistan, Maldives Time' },
  { value: 'Asia/Yekaterinburg', label: 'Asia/Dhaka' },
  { value: 'Asia/Kolkata', label: 'India, Sri Lanka Time' },
  { value: 'Asia/Kathmandu', label: 'Kathmandu Time' },
  { value: 'Asia/Omsk', label: 'Asia/Omsk' },
  { value: 'Asia/Dhaka', label: 'Asia/Dhaka' },
  { value: 'Asia/Rangoon', label: 'Asia/Rangoon' },
  { value: 'Asia/Krasnoyarsk', label: 'Krasnoyarsk Time' },
  { value: 'Asia/Jakarta', label: 'Indochina Time' },
  { value: 'Asia/Shanghai', label: 'China, Singapore, Perth' },
  { value: 'Asia/Irkutsk', label: 'Asia/Irkutsk' },
  { value: 'Asia/Tokyo', label: 'Japan, Korea Time' },
  { value: 'Asia/Yakutsk', label: 'Asia/Yakutsk' },
  { value: 'Asia/Vladivostok', label: 'Asia/Vladivostok' },
  { value: 'Asia/Kamchatka', label: 'Pacific/Majuro' },
  // Atlantic
  { value: 'Atlantic/Azores', label: 'Azores Time' },
  { value: 'Atlantic/Cape_Verde', label: 'Cape Verde Time' },
  // Australia
  { value: 'Australia/Perth', label: 'Australia/Perth' },
  { value: 'Australia/Eucla', label: 'Australia/Eucla' },
  { value: 'Australia/Adelaide', label: 'Adelaide Time' },
  { value: 'Australia/Darwin', label: 'Australia/Darwin' },
  { value: 'Australia/Brisbane', label: 'Brisbane Time' },
  { value: 'Australia/Sydney', label: 'Sydney, Melbourne Time' },
  { value: 'Australia/Lord_Howe', label: 'Australia/Lord Howe' },
  // UTC
  { value: 'UTC', label: 'UTC Time' },
  // Europe
  { value: 'Europe/London', label: 'UK, Ireland, Lisbon Time' },
  { value: 'Europe/Berlin', label: 'Central European Time' },
  { value: 'Europe/Helsinki', label: 'Eastern European Time' },
  { value: 'Europe/Minsk', label: 'Minsk Time' },
  { value: 'Europe/Moscow', label: 'Moscow Time' },
  // Pacific
  { value: 'Pacific/Pago_Pago', label: 'Pacific/Pago Pago' },
  { value: 'Pacific/Marquesas', label: 'Pacific/Marquesas' },
  { value: 'Pacific/Gambier', label: 'Pacific/Gambier' },
  { value: 'Pacific/Pitcairn', label: 'Pacific/Pitcairn' },
  { value: 'Pacific/Easter', label: 'Pacific/Easter' },
  { value: 'Pacific/Norfolk', label: 'Pacific/Norfolk' },
  { value: 'Pacific/Noumea', label: 'Pacific/Noumea' },
  { value: 'Pacific/Auckland', label: 'Auckland Time' },
  { value: 'Pacific/Fiji', label: 'Pacific/Fiji' },
  { value: 'Pacific/Majuro', label: 'Pacific/Majuro' },
  { value: 'Pacific/Tarawa', label: 'Pacific/Tarawa' },
  { value: 'Pacific/Chatham', label: 'Pacific/Chatham' },
  { value: 'Pacific/Apia', label: 'Pacific/Apia' },
  { value: 'Pacific/Tongatapu', label: 'Pacific/Tongatapu' },
  { value: 'Pacific/Kiritimati', label: 'Pacific/Kiritimati' }
]

const SignupPage: React.FC = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [timezone, setTimezone] = useState('') // default to empty string
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('patient')
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !timezone ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError('Please fill in all fields.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (!agree) {
      setError('You must agree to the Terms and Conditions.')
      return
    }
    setLoading(true)
    try {
      const data = await signUp(firstName, lastName, email, password, timezone)
      if (data.error) {
        setError(data.message || 'Signup failed')
      } else {
        setSuccess('Signup successful! Please log in.')
        setTimeout(() => navigate('/login'), 1500)
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch justify-center bg-white dark:bg-[#111827]">
      <div className="hidden md:flex md:w-1/2 login-illustration-bg items-center justify-center relative bg-transparent bg-white dark:bg-[#111827]">
        <LeftContainer />
      </div>
      {/* Partition Divider - centered between panels */}
      <div className="w-[2px] min-h-[60vh] bg-gradient-to-b from-transparent dark:via-[var(--mid-gray)] via-[var(--flamingo)] to-transparent mx-2 rounded-sm opacity-70 self-center"></div>

      {/* Right side: Signup Form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          <div className="border border-[#e5e7eb26] bg-gradient-to-br from-white via-[#FFF8F6] to-[#FFF4F0] dark:border-gray-700/50 dark:from-gray-800/50 dark:via-gray-800/50 dark:to-gray-900/50 p-4 md:p-6 relative rounded-3xl">
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
                Create your account
              </h2>
              <p className="text-[var(--ebony-clay)] dark:text-white text-sm">
                Fill out the form to get started.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="login-input-group">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="dark:bg-[#17202e] w-full border border-[var(--shuttle-gray)] rounded-xl p-4 text-base leading-6 transition-all duration-200 ease-in-out text-[var(--ebony-clay)]  placeholder-[var(--ebony-clay)] dark:placeholder-[var(--mid-gray)] dark:focus:bg-[var(--ebony-clay)] focus:bg-white focus:border-[var(--flamingo)] focus:outline-none focus:translate-y-[-1px] focus:placeholder-opacity-70 hover:border-[var(--flamingo)] dark:text-white"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="login-input-group">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="dark:bg-[#17202e] w-full border border-[var(--shuttle-gray)] rounded-xl p-4 text-base leading-6 transition-all duration-200 ease-in-out text-[var(--ebony-clay)]  placeholder-[var(--ebony-clay)] dark:placeholder-[var(--mid-gray)] dark:focus:bg-[var(--ebony-clay)] focus:bg-white focus:border-[var(--flamingo)] focus:outline-none focus:translate-y-[-1px] focus:placeholder-opacity-70 hover:border-[var(--flamingo)] dark:text-white"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="login-input-group md:col-span-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="dark:bg-[#17202e] w-full border border-[var(--shuttle-gray)] rounded-xl p-4 text-base leading-6 transition-all duration-200 ease-in-out text-[var(--ebony-clay)]  placeholder-[var(--ebony-clay)] dark:placeholder-[var(--mid-gray)] dark:focus:bg-[var(--ebony-clay)] focus:bg-white focus:border-[var(--flamingo)] focus:outline-none focus:translate-y-[-1px] focus:placeholder-opacity-70 hover:border-[var(--flamingo)] dark:text-white"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="login-input-group md:col-span-2">
                  <select
                    id="timezone"
                    name="timezone"
                    required
                    className="dark:bg-[#17202e] w-full border border-[var(--shuttle-gray)] rounded-xl p-4 text-base leading-6 transition-all duration-200 ease-in-out text-[var(--ebony-clay)]  placeholder-[var(--ebony-clay)] dark:placeholder-[var(--mid-gray)] dark:focus:bg-[var(--ebony-clay)] focus:bg-white focus:border-[var(--flamingo)] focus:outline-none focus:translate-y-[-1px] focus:placeholder-opacity-70 hover:border-[var(--flamingo)] dark:text-white appearance-none cursor-pointer"
                    style={{
                      maxHeight: '300px',
                      overflowY: 'auto'
                    }}
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                  >
                    <option disabled value="">
                      Select a timezone
                    </option>
                    <option
                      disabled
                      className="font-bold text-gray-500 bg-gray-100"
                    >
                      US/Canada
                    </option>
                    {timezones.slice(0, 10).map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                    <option
                      disabled
                      className="font-bold text-gray-500 bg-gray-100"
                    >
                      America
                    </option>
                    {timezones.slice(10, 29).map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                    <option
                      disabled
                      className="font-bold text-gray-500 bg-gray-100"
                    >
                      Africa
                    </option>
                    {timezones.slice(29, 33).map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                    <option
                      disabled
                      className="font-bold text-gray-500 bg-gray-100"
                    >
                      Asia
                    </option>
                    {timezones.slice(33, 58).map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                    <option
                      disabled
                      className="font-bold text-gray-500 bg-gray-100"
                    >
                      Atlantic
                    </option>
                    {timezones.slice(58, 60).map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                    <option
                      disabled
                      className="font-bold text-gray-500 bg-gray-100"
                    >
                      Australia
                    </option>
                    {timezones.slice(60, 67).map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                    <option
                      disabled
                      className="font-bold text-gray-500 bg-gray-100"
                    >
                      UTC
                    </option>
                    {timezones.slice(67, 68).map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                    <option
                      disabled
                      className="font-bold text-gray-500 bg-gray-100"
                    >
                      Europe
                    </option>
                    {timezones.slice(68, 73).map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                    <option
                      disabled
                      className="font-bold text-gray-500 bg-gray-100"
                    >
                      Pacific
                    </option>
                    {timezones.slice(73).map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="login-input-group">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="dark:bg-[#17202e] w-full border border-[var(--shuttle-gray)] rounded-xl p-4 text-base leading-6 transition-all duration-200 ease-in-out text-[var(--ebony-clay)]  placeholder-[var(--ebony-clay)] dark:placeholder-[var(--mid-gray)] dark:focus:bg-[var(--ebony-clay)] focus:bg-white focus:border-[var(--flamingo)] focus:outline-none focus:translate-y-[-1px] focus:placeholder-opacity-70 hover:border-[var(--flamingo)] dark:text-white"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="login-input-group">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="dark:bg-[#17202e] w-full border border-[var(--shuttle-gray)] rounded-xl p-4 text-base leading-6 transition-all duration-200 ease-in-out text-[var(--ebony-clay)]  placeholder-[var(--ebony-clay)] dark:placeholder-[var(--mid-gray)] dark:focus:bg-[var(--ebony-clay)] focus:bg-white focus:border-[var(--flamingo)] focus:outline-none focus:translate-y-[-1px] focus:placeholder-opacity-70 hover:border-[var(--flamingo)] dark:text-white"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  className="mr-2"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <label
                  htmlFor="agree"
                  className="text-sm xl:text-sm max-w-lg  dark:text-white"
                >
                  I agree to the{' '}
                  <a
                    href="/terms"
                    className="text-[var(--flamingo)] hover:underline hover:text-[#d44e13] transition-colors duration-200 text-sm font-medium"
                  >
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a
                    href="/privacy"
                    className="text-[var(--flamingo)] hover:underline hover:text-[#d44e13] transition-colors duration-200 text-sm font-medium"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>
              {error && <AlertMessage message={error} type="error" />}
              {success && <AlertMessage message={success} type="success" />}
              <div className="space-y-4 mt-4">
                <button
                  type="submit"
                  className={`w-full login-btn transition-all duration-200 ease-in-out font-semibold rounded-xl py-3 text-lg shadow-md${
                    theme === 'light' ? ' light' : ''
                  } bg-[#eb5c1e] text-white hover:bg-[#d44e13] focus:outline-none focus:ring-2 focus:ring-[#eb5c1e] focus:ring-offset-2 active:scale-95 disabled:opacity-60`}
                  disabled={loading}
                >
                  {loading ? 'Signing Up...' : 'Get Started'}
                </button>
                <div className="text-center">
                  <span className="text-sm xl:text-sm max-w-lg dark:text-white">
                    Already have an account?{' '}
                    <a
                      href="/login"
                      className={`text-[var(--flamingo)] hover:underline hover:text-[#d44e13] transition-colors duration-200 text-sm font-medium`}
                    >
                      Login
                    </a>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
