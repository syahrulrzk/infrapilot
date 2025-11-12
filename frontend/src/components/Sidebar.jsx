import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import Tooltip from './Tooltip'

const Sidebar = () => {
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Tasks', path: '/tasks', icon: '✅' },
    { name: 'Servers', path: '/servers', icon: '🖥️' },
    { name: 'Security', path: '/security', icon: '🔐' },
    { name: 'Password Vault', path: '/vault', icon: '🔑' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ]

  return (
    <div className="flex flex-col w-64 bg-gray-800 border-r border-gray-700">
      <div className="flex items-center justify-center h-16 border-b border-gray-700 space-x-2">
        <Logo size="md" />
        <h1 className="text-xl font-bold neon-text">InfraPilot</h1>
      </div>
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Tooltip content={item.name} position="right">
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-cyan-900 text-cyan-400 neon-border'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span className="md:hidden">{item.name}</span>
                </Link>
              </Tooltip>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-4 py-3 border-t border-gray-700 text-sm text-gray-400">
        <p>✈️ Your Infrastructure, On Autopilot</p>
      </div>
    </div>
  )
}

export default Sidebar