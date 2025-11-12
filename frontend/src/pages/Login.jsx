import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { showError, showSuccess } from '../utils/notificationUtils'
import Logo from '../components/Logo'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const result = await login(credentials)
      
      if (result.success) {
        showSuccess('Login Successful', 'Welcome back to InfraPilot!')
        navigate('/dashboard')
      } else {
        showError('Login Failed', result.error || 'Invalid credentials')
      }
    } catch (error) {
      showError('Login Error', 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="card w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl font-bold neon-text">InfraPilot</h1>
          <p className="text-gray-400 mt-2">Your Infrastructure, On Autopilot</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username or Email
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your username or email"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <a href="#" className="text-sm text-cyan-500 hover:text-cyan-400">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your password"
            />
          </div>
          
          <Checkbox
            id="remember-me"
            name="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            label="Remember me"
          />
          
          <div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full py-2"
              loading={loading}
            >
              Sign in
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-cyan-500 hover:text-cyan-400">
              Contact your administrator
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login