import React, { useState, useRef, useEffect } from 'react'

const Dropdown = ({ 
  label, 
  error, 
  required = false, 
  className = '', 
  children,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <button
        type="button"
        className={`w-full px-3 py-2 bg-gray-700 border ${
          error ? 'border-red-500' : 'border-gray-600'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-left ${
          error ? 'focus:ring-red-500' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        <div className="flex justify-between items-center">
          <span>Select an option</span>
          <svg 
            className={`w-5 h-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-lg">
          {children}
        </div>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

const DropdownItem = ({ children, onClick, className = '', ...props }) => {
  return (
    <button
      type="button"
      className={`block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

Dropdown.Item = DropdownItem

export default Dropdown