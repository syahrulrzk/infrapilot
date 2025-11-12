import React from 'react'

const Form = ({ children, onSubmit, className = '', ...props }) => {
  return (
    <form 
      onSubmit={onSubmit} 
      className={`space-y-4 ${className}`}
      {...props}
    >
      {children}
    </form>
  )
}

const FormField = ({ 
  label, 
  children, 
  error, 
  required = false,
  className = '' 
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

const FormActions = ({ children, className = '' }) => {
  return (
    <div className={`flex justify-end space-x-2 pt-4 ${className}`}>
      {children}
    </div>
  )
}

Form.Field = FormField
Form.Actions = FormActions

export default Form