import React, { useState } from 'react'

const Tooltip = ({ 
  children, 
  content, 
  position = 'top', 
  className = '' 
}) => {
  const [visible, setVisible] = useState(false)

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  }

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-cyan-700 border-r-transparent border-b-transparent border-l-transparent',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-cyan-700 border-r-transparent border-t-transparent border-l-transparent',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-cyan-700 border-r-transparent border-t-transparent border-b-transparent',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-cyan-700 border-l-transparent border-t-transparent border-b-transparent',
  }

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div 
          className={`absolute z-10 px-3 py-2 text-sm font-medium text-white bg-cyan-700 rounded-lg shadow-sm ${positionClasses[position]} ${className}`}
          role="tooltip"
        >
          <div className="relative">
            {content}
            <div 
              className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tooltip