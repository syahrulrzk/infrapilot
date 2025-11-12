import React from 'react'

const Switch = ({ 
  label, 
  error, 
  required = false, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        {label && (
          <label className="block text-sm font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            {...props}
          />
          <div className={`w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600 ${
              error ? 'peer-focus:ring-red-500' : 'peer-focus:ring-cyan-500'
            }`}></div>
        </label>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export default Switch