import React from 'react'

const Alert = ({ 
  children, 
  type = 'info', 
  title, 
  dismissible = false, 
  onDismiss,
  className = '' 
}) => {
  const typeClasses = {
    info: 'bg-blue-900 bg-opacity-30 text-blue-200 border-blue-700',
    success: 'bg-green-900 bg-opacity-30 text-green-200 border-green-700',
    warning: 'bg-yellow-900 bg-opacity-30 text-yellow-200 border-yellow-700',
    error: 'bg-red-900 bg-opacity-30 text-red-200 border-red-700',
  }

  const icon = {
    info: (
      <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    success: (
      <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    warning: (
      <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
    ),
    error: (
      <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
  }

  return (
    <div className={`rounded-lg border p-4 ${typeClasses[type]} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {icon[type]}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium">{title}</h3>
          )}
          <div className={`text-sm ${title ? 'mt-1' : ''}`}>
            {children}
          </div>
        </div>
        {dismissible && (
          <div className="ml-4 flex-shrink-0">
            <button
              className="inline-flex text-gray-400 hover:text-white focus:outline-none"
              onClick={onDismiss}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Alert