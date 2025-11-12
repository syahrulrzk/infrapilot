import React from 'react'

const Badge = ({ children, variant = 'primary', size = 'md', className = '' }) => {
  const variantClasses = {
    primary: 'bg-cyan-900 text-cyan-400',
    secondary: 'bg-gray-700 text-gray-300',
    success: 'bg-green-900 text-green-400',
    warning: 'bg-yellow-900 text-yellow-400',
    danger: 'bg-red-900 text-red-400',
    info: 'bg-blue-900 text-blue-400',
    purple: 'bg-purple-900 text-purple-400',
  }

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-0.5 text-xs',
    lg: 'px-2.5 py-0.5 text-sm',
  }

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge