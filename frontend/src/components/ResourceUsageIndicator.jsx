import React from 'react'

const ResourceUsageIndicator = ({ value, label, color = 'cyan' }) => {
  // Determine color based on value
  const getColorClass = (value) => {
    if (value < 50) return 'bg-green-500'
    if (value < 80) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const colorClass = getColorClass(value)

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${colorClass}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  )
}

export default ResourceUsageIndicator