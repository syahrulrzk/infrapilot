import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left', 
  loading = false, 
  disabled = false, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center border font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900'
  
  const variantClasses = {
    primary: 'border-transparent bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500',
    secondary: 'border-gray-600 bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500',
    outline: 'border-cyan-500 text-cyan-400 hover:bg-cyan-900 hover:bg-opacity-20 focus:ring-cyan-500',
    danger: 'border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'border-transparent text-gray-300 hover:text-white hover:bg-gray-700 focus:ring-gray-500',
  }
  
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  
  const disabledClasses = 'opacity-50 cursor-not-allowed'
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled || loading ? disabledClasses : ''} ${className}`
  
  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className={`animate-spin -ml-1 mr-2 h-4 w-4 text-current`} fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  )
}

export default Button