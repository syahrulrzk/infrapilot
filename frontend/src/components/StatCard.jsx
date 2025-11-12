import React from 'react'

const StatCard = ({ title, value, change, icon, color = 'cyan' }) => {
  const colorClasses = {
    cyan: 'text-cyan-500',
    green: 'text-green-500',
    yellow: 'text-yellow-500',
    red: 'text-red-500',
    purple: 'text-purple-500',
    blue: 'text-blue-500',
  }

  return (
    <div className="card neon-border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`text-2xl ${colorClasses[color]}`}>{icon}</div>
      </div>
      {change && (
        <p className="text-sm mt-2">
          <span className={change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
            {change}
          </span>{' '}
          <span className="text-gray-400">from last week</span>
        </p>
      )}
    </div>
  )
}

export default StatCard