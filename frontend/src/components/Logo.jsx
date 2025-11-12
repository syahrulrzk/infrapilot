import React from 'react'

const Logo = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full border-2 border-cyan-400 flex items-center justify-center neon-border`}>
      <svg 
        className={`${sizeClasses[size].replace('h-', 'h-').replace('w-', 'w-')} text-cyan-400`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="9" strokeWidth="1.5"></circle>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6l4 2"></path>
      </svg>
    </div>
  )
}

export default Logo