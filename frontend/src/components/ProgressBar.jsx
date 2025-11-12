import React from 'react'

const ProgressBar = ({ value, max = 100, color = 'cyan', size = 'md', className = '' }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  const colorClasses = {
    cyan: 'bg-cyan-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
  }
  
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }
  
  return (
    <div className={`w-full bg-gray-700 rounded-full ${sizeClasses[size]} ${className}`}>
      <div 
        className={`h-full rounded-full ${colorClasses[color]}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  )
}

export default ProgressBar