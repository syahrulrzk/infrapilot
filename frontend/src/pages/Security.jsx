import React, { useState } from 'react'
import Badge from '../components/Badge'
import Accordion from '../components/Accordion'

const Security = () => {
  const [activeTab, setActiveTab] = useState('alerts')
  
  // Mock data for security alerts
  const alerts = [
    { id: 1, severity: 'high', title: 'Multiple failed login attempts', description: 'Detected 15 failed login attempts from IP 192.168.1.100', time: '2 minutes ago', resolved: false },
    { id: 2, severity: 'medium', title: 'SSH key rotation needed', description: 'SSH keys for server-web-01 need to be rotated', time: '1 hour ago', resolved: false },
    { id: 3, severity: 'low', title: 'Outdated software detected', description: 'Nginx version 1.18.0 has known vulnerabilities', time: '3 hours ago', resolved: true },
    { id: 4, severity: 'high', title: 'Unauthorized access attempt', description: 'Suspicious activity detected from unknown IP 10.0.0.50', time: '5 hours ago', resolved: false },
  ]

  // Mock data for audit logs
  const auditLogs = [
    { id: 1, user: 'admin', action: 'Logged in', ip: '192.168.1.5', time: '10 minutes ago' },
    { id: 2, user: 'admin', action: 'Created new task', ip: '192.168.1.5', time: '25 minutes ago' },
    { id: 3, user: 'system', action: 'Security scan completed', ip: '127.0.0.1', time: '1 hour ago' },
    { id: 4, user: 'admin', action: 'Added new server', ip: '192.168.1.5', time: '2 hours ago' },
  ]

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'high': return <Badge variant="danger">High</Badge>
      case 'medium': return <Badge variant="warning">Medium</Badge>
      case 'low': return <Badge variant="success">Low</Badge>
      default: return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Security Center</h1>
        <p className="text-gray-400">Monitor and manage your infrastructure security</p>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-900 bg-opacity-30">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-400 text-sm">Active Alerts</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-900 bg-opacity-30">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-400 text-sm">Resolved Alerts</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-900 bg-opacity-30">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-400 text-sm">Security Score</p>
              <p className="text-2xl font-bold">87%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('alerts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'alerts'
                  ? 'border-cyan-500 text-cyan-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Security Alerts
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'audit'
                  ? 'border-cyan-500 text-cyan-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Audit Logs
            </button>
            <button
              onClick={() => setActiveTab('keys')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'keys'
                  ? 'border-cyan-500 text-cyan-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              SSH Keys
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === 'alerts' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recent Security Alerts</h3>
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border ${
                    alert.resolved 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-gray-750 border-gray-600'
                  }`}
                >
                  <div className="flex items-start">
                    <div className="mt-2">
                      {getSeverityBadge(alert.severity)}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{alert.title}</h4>
                        <span className="text-xs text-gray-500">{alert.time}</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{alert.description}</p>
                      <div className="flex mt-3">
                        {!alert.resolved && (
                          <button className="btn-primary text-sm mr-2">
                            Resolve
                          </button>
                        )}
                        <button className="btn-secondary text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'audit' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Audit Logs</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">IP Address</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {auditLogs.map((log) => (
                      <tr key={log.id}>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="font-medium">{log.user}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-400">
                          {log.action}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-400">
                          {log.ip}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-500">
                          {log.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'keys' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">SSH Key Management</h3>
                <button className="btn-primary">
                  Add SSH Key
                </button>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-gray-750 rounded-lg border border-gray-600">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">web-server-key</h4>
                      <p className="text-sm text-gray-400">RSA 4096 bits - Last used: 2 hours ago</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-white">
                        Rotate
                      </button>
                      <button className="text-gray-400 hover:text-red-500">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-750 rounded-lg border border-gray-600">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">database-key</h4>
                      <p className="text-sm text-gray-400">RSA 4096 bits - Last used: 1 day ago</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-white">
                        Rotate
                      </button>
                      <button className="text-gray-400 hover:text-red-500">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Security