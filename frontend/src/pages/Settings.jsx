import React, { useState } from 'react'
import Alert from '../components/Alert'
import Checkbox from '../components/Checkbox'
import Switch from '../components/Switch'
import Accordion from '../components/Accordion'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general')
  
  // Mock user data
  const [user, setUser] = useState({
    name: 'Admin User',
    email: 'admin@infrapilot.local',
    username: 'admin',
    timezone: 'UTC',
    notifications: {
      email: true,
      telegram: false,
      slack: false
    }
  })

  const handleSave = () => {
    // In a real app, this would save to the backend
    alert('Settings saved successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-400">Manage your account and application preferences</p>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'general'
                  ? 'border-cyan-500 text-cyan-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-cyan-500 text-cyan-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-cyan-500 text-cyan-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'integrations'
                  ? 'border-cyan-500 text-cyan-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Integrations
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">General Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <input
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Timezone</label>
                  <select
                    value={user.timezone}
                    onChange={(e) => setUser({...user, timezone: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option>UTC</option>
                    <option>GMT</option>
                    <option>EST</option>
                    <option>PST</option>
                    <option>CET</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Security Settings</h3>
              <Alert type="warning" title="Security Recommendation">
                It's recommended to enable two-factor authentication for enhanced security.
              </Alert>
              <Accordion>
                <Accordion.Item title="Authentication">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <button className="btn-primary">
                        Enable
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                      <div>
                        <h4 className="font-medium">Password</h4>
                        <p className="text-sm text-gray-400">Change your password</p>
                      </div>
                      <button className="btn-secondary">
                        Change
                      </button>
                    </div>
                  </div>
                </Accordion.Item>
                <Accordion.Item title="SSH Keys">
                  <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                    <div>
                      <h4 className="font-medium">SSH Key Rotation</h4>
                      <p className="text-sm text-gray-400">Rotate all SSH keys for enhanced security</p>
                    </div>
                    <button className="btn-secondary">
                      Rotate
                    </button>
                  </div>
                </Accordion.Item>
                <Accordion.Item title="Sessions">
                  <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                    <div>
                      <h4 className="font-medium">Session Management</h4>
                      <p className="text-sm text-gray-400">View and manage active sessions</p>
                    </div>
                    <button className="btn-secondary">
                      View
                    </button>
                  </div>
                </Accordion.Item>
              </Accordion>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-400">Receive alerts via email</p>
                  </div>
                  <Switch
                    checked={user.notifications.email}
                    onChange={(e) => setUser({
                      ...user,
                      notifications: {
                        ...user.notifications,
                        email: e.target.checked
                      }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                  <div>
                    <h4 className="font-medium">Telegram Notifications</h4>
                    <p className="text-sm text-gray-400">Receive alerts via Telegram</p>
                  </div>
                  <Switch
                    checked={user.notifications.telegram}
                    onChange={(e) => setUser({
                      ...user,
                      notifications: {
                        ...user.notifications,
                        telegram: e.target.checked
                      }
                    })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg">
                  <div>
                    <h4 className="font-medium">Slack Notifications</h4>
                    <p className="text-sm text-gray-400">Receive alerts via Slack</p>
                  </div>
                  <Switch
                    checked={user.notifications.slack}
                    onChange={(e) => setUser({
                      ...user,
                      notifications: {
                        ...user.notifications,
                        slack: e.target.checked
                      }
                    })}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Integrations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-750 rounded-lg border border-gray-600">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-blue-900 bg-opacity-30 flex items-center justify-center">
                      <span className="text-blue-500 font-bold">TG</span>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">Telegram</h4>
                      <p className="text-sm text-gray-400">Connect your Telegram account</p>
                    </div>
                  </div>
                  <button className="mt-4 w-full btn-secondary">
                    Connect
                  </button>
                </div>
                <div className="p-4 bg-gray-750 rounded-lg border border-gray-600">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-purple-900 bg-opacity-30 flex items-center justify-center">
                      <span className="text-purple-500 font-bold">SL</span>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">Slack</h4>
                      <p className="text-sm text-gray-400">Connect your Slack workspace</p>
                    </div>
                  </div>
                  <button className="mt-4 w-full btn-secondary">
                    Connect
                  </button>
                </div>
                <div className="p-4 bg-gray-750 rounded-lg border border-gray-600">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-orange-900 bg-opacity-30 flex items-center justify-center">
                      <span className="text-orange-500 font-bold">AW</span>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">AWS</h4>
                      <p className="text-sm text-gray-400">Connect your AWS account</p>
                    </div>
                  </div>
                  <button className="mt-4 w-full btn-secondary">
                    Connect
                  </button>
                </div>
                <div className="p-4 bg-gray-750 rounded-lg border border-gray-600">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-lg bg-green-900 bg-opacity-30 flex items-center justify-center">
                      <span className="text-green-500 font-bold">DO</span>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">DigitalOcean</h4>
                      <p className="text-sm text-gray-400">Connect your DigitalOcean account</p>
                    </div>
                  </div>
                  <button className="mt-4 w-full btn-secondary">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="btn-primary px-6 py-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default Settings