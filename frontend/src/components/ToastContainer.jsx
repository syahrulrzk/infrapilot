import React, { useState, useEffect } from 'react'
import Toast from './Toast'

const ToastContainer = ({ className = '' }) => {
  const [toasts, setToasts] = useState([])

  // Function to add a new toast
  const addToast = (toast) => {
    const id = Date.now() + Math.random()
    setToasts(prevToasts => [...prevToasts, { ...toast, id }])
  }

  // Function to remove a toast
  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id))
  }

  // Expose addToast function globally for use in other components
  useEffect(() => {
    window.addToast = addToast
    return () => {
      delete window.addToast
    }
  }, [])

  return (
    <div className={`fixed top-4 right-4 z-50 space-y-2 ${className}`}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}

export default ToastContainer