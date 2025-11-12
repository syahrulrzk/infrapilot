import React from 'react'

const Avatar = ({ 
  name, 
  size = 'md', 
  src, 
  alt = '', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  }

  const getInitials = (name) => {
    if (!name) return ''
    const names = name.split(' ')
    if (names.length === 1) return names[0].charAt(0).toUpperCase()
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
  }

  if (src) {
    return (
      <img
        className={`rounded-full ${sizeClasses[size]} ${className}`}
        src={src}
        alt={alt}
      />
    )
  }

  return (
    <div className={`rounded-full bg-cyan-600 flex items-center justify-center text-white font-semibold ${sizeClasses[size]} ${className}`}>
      <span>{getInitials(name)}</span>
    </div>
  )
}

export default Avatar