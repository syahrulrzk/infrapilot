import React from 'react'

const Tag = ({ children, color = 'gray', size = 'md', className = '' }) => {
  const colorClasses = {
    gray: 'bg-gray-700 text-gray-300',
    blue: 'bg-blue-900 bg-opacity-30 text-blue-400',
    green: 'bg-green-900 bg-opacity-30 text-green-400',
    yellow: 'bg-yellow-900 bg-opacity-30 text-yellow-400',
    red: 'bg-red-900 bg-opacity-30 text-red-400',
    purple: 'bg-purple-900 bg-opacity-30 text-purple-400',
    cyan: 'bg-cyan-900 bg-opacity-30 text-cyan-400',
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  }

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${colorClasses[color]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  )
}

export default Tag