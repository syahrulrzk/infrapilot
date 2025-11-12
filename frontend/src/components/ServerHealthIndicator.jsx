import React from 'react'

const ServerHealthIndicator = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'offline':
        return 'bg-red-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'maintenance':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'online':
        return 'Online'
      case 'offline':
        return 'Offline'
      case 'warning':
        return 'Warning'
      case 'maintenance':
        return 'Maintenance'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="flex items-center">
      <span className={`h-3 w-3 rounded-full ${getStatusColor(status)}`}></span>
      <span className="ml-2 text-sm">{getStatusText(status)}</span>
    </div>
  )
}

export default ServerHealthIndicator