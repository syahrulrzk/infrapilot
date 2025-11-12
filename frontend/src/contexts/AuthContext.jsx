import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in (in a real app, this would check for a valid token)
    const token = localStorage.getItem('token')
    if (token) {
      // In a real app, you would verify the token with the backend
      // For now, we'll just set a mock user
      setUser({ id: 1, username: 'admin', role: 'administrator' })
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      // In a real app, this would authenticate with the backend
      const response = await api.login(credentials)
      
      // Store token (in a real app)
      // localStorage.setItem('token', response.token)
      
      // Set user
      setUser({ id: 1, username: credentials.username, role: 'administrator' })
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    // Remove token
    localStorage.removeItem('token')
    
    // Clear user
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}