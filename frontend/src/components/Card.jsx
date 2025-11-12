import React from 'react'

const Card = ({ 
  children, 
  title, 
  actions, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`card ${className}`} {...props}>
      {(title || actions) && (
        <div className="flex justify-between items-center mb-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {actions && <div className="flex space-x-2">{actions}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}

export default Card