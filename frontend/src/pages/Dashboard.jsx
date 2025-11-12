import React from 'react'
import { Link } from 'react-router-dom'
import DashboardWidget from '../components/DashboardWidget'
import StatCard from '../components/StatCard'

const Dashboard = () => {
  // Mock data for dashboard cards
  const stats = [
    { name: 'Total Servers', value: '24', change: '+2', icon: '🖥️', color: 'cyan' },
    { name: 'Active Tasks', value: '18', change: '+5', icon: '✅', color: 'green' },
    { name: 'Security Alerts', value: '3', change: '-2', icon: '⚠️', color: 'yellow' },
    { name: 'Vault Items', value: '142', change: '+12', icon: '🔑', color: 'purple' },
  ]

  // Mock data for recent activities
  const activities = [
    { id: 1, user: 'Admin User', action: 'created a new task', time: '2 minutes ago' },
    { id: 2, user: 'Admin User', action: 'added a new server', time: '1 hour ago' },
    { id: 3, user: 'System', action: 'completed backup process', time: '3 hours ago' },
    { id: 4, user: 'Security Bot', action: 'detected suspicious activity', time: '5 hours ago' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-400">Welcome to InfraPilot - Your Infrastructure, On Autopilot</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.name}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Server Health Chart */}
        <DashboardWidget title="Server Health Overview">
          <div className="h-64 flex items-center justify-center bg-gray-700 rounded-lg">
            <p className="text-gray-400">Server health chart visualization</p>
          </div>
        </DashboardWidget>

        {/* Recent Activity */}
        <DashboardWidget 
          title="Recent Activity"
          actions={
            <Link to="/tasks" className="text-cyan-500 text-sm hover:text-cyan-400">
              View all
            </Link>
          }
        >
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="mr-3 mt-1">
                  <div className="h-8 w-8 rounded-full bg-cyan-900 flex items-center justify-center">
                    <span className="text-cyan-400 text-sm">👤</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-gray-400 text-sm">{activity.action}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardWidget>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="btn-primary flex flex-col items-center justify-center py-4">
            <span className="text-2xl mb-2">➕</span>
            <span>New Task</span>
          </button>
          <button className="btn-primary flex flex-col items-center justify-center py-4">
            <span className="text-2xl mb-2">🖥️</span>
            <span>Add Server</span>
          </button>
          <button className="btn-primary flex flex-col items-center justify-center py-4">
            <span className="text-2xl mb-2">🔐</span>
            <span>Security Check</span>
          </button>
          <button className="btn-primary flex flex-col items-center justify-center py-4">
            <span className="text-2xl mb-2">🔑</span>
            <span>Add Vault Item</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard