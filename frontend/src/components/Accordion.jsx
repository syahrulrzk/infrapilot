import React, { useState } from 'react'

const Accordion = ({ children, className = '', ...props }) => {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {children}
    </div>
  )
}

const AccordionItem = ({ 
  title, 
  children, 
  defaultOpen = false, 
  className = '', 
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`border border-gray-700 rounded-lg ${className}`} {...props}>
      <button
        type="button"
        className="flex justify-between items-center w-full px-4 py-3 text-left font-medium text-gray-300 hover:bg-gray-750 rounded-lg focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <svg 
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-gray-400">
          {children}
        </div>
      )}
    </div>
  )
}

Accordion.Item = AccordionItem

export default Accordion