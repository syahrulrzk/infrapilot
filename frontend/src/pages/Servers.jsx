import React, { useState } from 'react'
import ServerHealthIndicator from '../components/ServerHealthIndicator'
import ProgressBar from '../components/ProgressBar'
import Select from '../components/Select'

const Servers = () => {
  const [servers, setServers] = useState([
    { id: 1, name: 'Web Server 01', ip: '192.168.1.10', status: 'online', cpu: 45, memory: 62, disk: 78, uptime: '12 days' },
    { id: 2, name: 'Database Server', ip: '192.168.1.15', status: 'online', cpu: 28, memory: 85, disk: 42, uptime: '45 days' },
    { id: 3, name: 'Load Balancer', ip: '192.168.1.20', status: 'offline', cpu: 0, memory: 0, disk: 0, uptime: '0 days' },
    { id: 4, name: 'Backup Server', ip: '192.168.1.25', status: 'online', cpu: 12, memory: 35, disk: 92, uptime: '180 days' },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newServer, setNewServer] = useState({ name: '', ip: '' })

  const addServer = (e) => {
    e.preventDefault()
    if (newServer.name.trim() && newServer.ip.trim()) {
      const server = {
        id: servers.length + 1,
        ...newServer,
        status: 'online',
        cpu: Math.floor(Math.random() * 30),
        memory: Math.floor(Math.random() * 50) + 20,
        disk: Math.floor(Math.random() * 60) + 20,
        uptime: '0 days'
      }
      setServers([...servers, server])
      setNewServer({ name: '', ip: '' })
      setShowAddForm(false)
    }
  }

  const getStatusColor = (status) => {
    return status === 'online' ? 'text-green-500' : 'text-red-500'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Server Management</h1>
          <p className="text-gray-400">Monitor and manage your infrastructure servers</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary"
        >
          {showAddForm ? 'Cancel' : 'Add Server'}
        </button>
      </div>

      {/* Add Server Form */}
      {showAddForm && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Add New Server</h3>
          <form onSubmit={addServer} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Server Name</label>
              <input
                type="text"
                value={newServer.name}
                onChange={(e) => setNewServer({...newServer, name: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Server name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">IP Address</label>
              <input
                type="text"
                value={newServer.ip}
                onChange={(e) => setNewServer({...newServer, ip: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="192.168.1.10"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Add Server
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Server List */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Servers ({servers.length})</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-700 rounded-lg">All</button>
            <button className="px-3 py-1 text-sm bg-gray-700 rounded-lg">Online</button>
            <button className="px-3 py-1 text-sm bg-gray-700 rounded-lg">Offline</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Server</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">IP Address</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">CPU</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Memory</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Disk</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Uptime</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {servers.map((server) => (
                <tr key={server.id}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-medium">{server.name}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-400">
                    {server.ip}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <ServerHealthIndicator status={server.status} />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 mr-2">
                        <ProgressBar value={server.cpu} color="cyan" size="sm" />
                      </div>
                      <span className="text-sm">{server.cpu}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 mr-2">
                        <ProgressBar value={server.memory} color="green" size="sm" />
                      </div>
                      <span className="text-sm">{server.memory}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 mr-2">
                        <ProgressBar value={server.disk} color="yellow" size="sm" />
                      </div>
                      <span className="text-sm">{server.disk}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-400">
                    {server.uptime}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <button className="text-cyan-500 hover:text-cyan-400 mr-3">
                      SSH
                    </button>
                    <button className="text-gray-400 hover:text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Servers