import React from 'react'
import Button from './Button'

const EmptyState = ({ 
  title, 
  description, 
  icon, 
  action, 
  actionText,
  onAction,
  className = '' 
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      {icon && (
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-800">
          {icon}
        </div>
      )}
      <h3 className="mt-2 text-sm font-medium text-white">{title}</h3>
      <p className="mt-1 text-sm text-gray-400">
        {description}
      </p>
      {action && (
        <div className="mt-6">
          <Button
            variant={action === 'primary' ? 'primary' : 'secondary'}
            onClick={onAction}
          >
            {actionText}
          </Button>
        </div>
      )}
    </div>
  )
}

export default EmptyState