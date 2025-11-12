import React from 'react'

const Select = ({ 
  label, 
  error, 
  required = false, 
  className = '', 
  children,
  ...props 
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        className={`w-full px-3 py-2 bg-gray-700 border ${
          error ? 'border-red-500' : 'border-gray-600'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
          error ? 'focus:ring-red-500' : ''
        }`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export default Select