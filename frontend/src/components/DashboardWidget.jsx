import React from 'react'
import Card from './Card'

const DashboardWidget = ({ title, children, actions, className = '' }) => {
  return (
    <Card title={title} actions={actions} className={className}>
      {children}
    </Card>
  )
}

export default DashboardWidget