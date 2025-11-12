import React from 'react'
import Avatar from './Avatar'

const Navbar = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center">
          <button className="text-gray-400 hover:text-white mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-1 text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <div className="flex items-center">
            <div className="mr-3 text-right">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
            <Avatar name="Admin User" size="sm" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar