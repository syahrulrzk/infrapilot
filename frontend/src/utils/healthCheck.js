// Utility for checking backend health status

import api from '../services/api'
import { showError, showSuccess } from './notificationUtils'

class HealthCheck {
  constructor() {
    this.interval = null
    this.checkInterval = 30000 // 30 seconds
    this.lastStatus = null
  }

  async checkHealth() {
    try {
      const response = await api.healthCheck()
      
      if (response.status === 'healthy') {
        // If we were previously unhealthy, show a success message
        if (this.lastStatus === 'unhealthy') {
          showSuccess('Backend Restored', 'Connection to backend service restored')
        }
        this.lastStatus = 'healthy'
        return { status: 'healthy', message: response.message }
      } else {
        throw new Error('Unexpected response from health check')
      }
    } catch (error) {
      // If we were previously healthy, show an error message
      if (this.lastStatus === 'healthy' || this.lastStatus === null) {
        showError('Backend Unreachable', 'Unable to connect to backend service')
      }
      this.lastStatus = 'unhealthy'
      return { status: 'unhealthy', message: error.message }
    }
  }

  start() {
    // Run immediately
    this.checkHealth()
    
    // Set up interval
    this.interval = setInterval(() => {
      this.checkHealth()
    }, this.checkInterval)
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }
}

// Export a singleton instance
export default new HealthCheck()