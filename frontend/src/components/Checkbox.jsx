import React from 'react'

const Checkbox = ({ 
  label, 
  error, 
  required = false, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={className}>
      <div className="flex items-center">
        <input
          type="checkbox"
          className={`h-4 w-4 text-cyan-600 rounded focus:ring-cyan-500 ${
            error ? 'border-red-500' : 'border-gray-600'
          } bg-gray-700`}
          {...props}
        />
        {label && (
          <label className="ml-2 block text-sm">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export default Checkbox