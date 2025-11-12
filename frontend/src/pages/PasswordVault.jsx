import React, { useState } from 'react'
import SearchInput from '../components/SearchInput'
import Tag from '../components/Tag'
import EmptyState from '../components/EmptyState'
import Select from '../components/Select'

const PasswordVault = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'AWS Root Account', username: 'admin@company.com', category: 'Cloud', lastModified: '2023-12-01' },
    { id: 2, name: 'Database Server', username: 'dbadmin', category: 'Database', lastModified: '2023-11-28' },
    { id: 3, name: 'SSH Key - Web Server', username: 'N/A', category: 'SSH Keys', lastModified: '2023-11-25' },
    { id: 4, name: 'API Key - Payment Gateway', username: 'N/A', category: 'API Keys', lastModified: '2023-12-05' },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['All', 'Cloud', 'Database', 'SSH Keys', 'API Keys', 'Other']

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.username.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeTab === 'all' || item.category === activeTab
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Password Vault</h1>
          <p className="text-gray-400">Securely store and manage your credentials</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary"
        >
          Add Item
        </button>
      </div>

      {/* Add Item Form */}
      {showAddForm && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Add New Vault Item</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Item Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter item name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter password"
                />
                <button className="absolute inset-y-0 right-0 px-3 text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select>
                <option>Cloud</option>
                <option>Database</option>
                <option>SSH Keys</option>
                <option>API Keys</option>
                <option>Other</option>
              </Select>
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
                Add Item
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="w-full md:w-64">
            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search vault items..."
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category.toLowerCase())}
                className={`px-3 py-1 text-sm rounded-lg ${
                  activeTab === category.toLowerCase()
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vault Items */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Vault Items ({filteredItems.length})</h3>
          <div className="text-sm text-gray-400">
            All items are AES-256 encrypted
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Username</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Modified</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-750">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-medium">{item.name}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-400">
                    {item.username}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Tag color="blue" size="sm">
                      {item.category}
                    </Tag>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-400">
                    {item.lastModified}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <button className="text-cyan-500 hover:text-cyan-400 mr-3">
                      View
                    </button>
                    <button className="text-gray-400 hover:text-white mr-3">
                      Edit
                    </button>
                    <button className="text-gray-400 hover:text-red-500">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredItems.length === 0 && (
          <EmptyState
            title="No vault items found"
            description="Get started by adding a new item to your vault."
            icon={
              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
            action="primary"
            actionText="Add Item"
            onAction={() => setShowAddForm(true)}
          />
        )}
      </div>
    </div>
  )
}

export default PasswordVault