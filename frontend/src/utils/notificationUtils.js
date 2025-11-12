// Utility functions for handling notifications

export const showNotification = (title, message, type = 'info') => {
  // In a real app, this would integrate with a notification library
  // For now, we'll just log to the console
  console.log(`[${type.toUpperCase()}] ${title}: ${message}`)
  
  // Use the global addToast function if available
  if (window.addToast) {
    window.addToast({
      title,
      message,
      type,
      duration: 5000
    })
  }
}

export const showError = (title, message) => {
  return showNotification(title, message, 'error')
}

export const showSuccess = (title, message) => {
  return showNotification(title, message, 'success')
}

export const showWarning = (title, message) => {
  return showNotification(title, message, 'warning')
}

export const showInfo = (title, message) => {
  return showNotification(title, message, 'info')
}