// API service for handling HTTP requests
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Auth methods
  async login(credentials) {
    return this.request('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  // Task methods
  async getTasks() {
    return this.request('/api/tasks')
  }

  async createTask(task) {
    return this.request('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    })
  }

  async updateTask(id, task) {
    return this.request(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    })
  }

  async deleteTask(id) {
    return this.request(`/api/tasks/${id}`, {
      method: 'DELETE',
    })
  }

  // User methods
  async getUsers() {
    return this.request('/api/users')
  }

  async createUser(user) {
    return this.request('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
    })
  }

  async updateUser(id, user) {
    return this.request(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    })
  }

  async deleteUser(id) {
    return this.request(`/api/users/${id}`, {
      method: 'DELETE',
    })
  }

  // Health check
  async healthCheck() {
    return this.request('/api/health')
  }
}

// Export a singleton instance
export default new ApiService()