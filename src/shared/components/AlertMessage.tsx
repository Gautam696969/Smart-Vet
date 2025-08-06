import React from 'react'

interface AlertMessageProps {
  message: string
  type: 'error' | 'success'
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message, type }) => {
  if (!message) return null

  const isError = type === 'error'

  return (
    <div
      className={`${
        isError
          ? 'bg-red-50 border border-red-200'
          : 'bg-green-50 border border-green-200'
      } rounded-lg p-3`}
    >
      <p
        className={`text-sm ${
          isError ? 'text-red-600' : 'text-green-700'
        } flex items-center`}
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          {isError ? (
            // Error icon
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          ) : (
            // Success icon
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          )}
        </svg>
        {message}
      </p>
    </div>
  )
}

export default AlertMessage
