import React from 'react'

const LoadingSpinner = ({ size = 'md', color = 'cyan' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  const colorClasses = {
    cyan: 'text-cyan-500',
    white: 'text-white',
    gray: 'text-gray-400',
    red: 'text-red-500',
    green: 'text-green-500',
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full border-t-2 border-r-2 border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}></div>
    </div>
  )
}

export default LoadingSpinner