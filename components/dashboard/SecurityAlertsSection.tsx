// SecurityAlertsComponent.tsx
"use client"

import { useState } from 'react'
import { 
  Shield, 
  AlertTriangle, 
  Lock, 
  UserX, 
  TrendingUp, 
  Globe, 
  Clock,
  Filter,
  Bell,
  MoreVertical,
  Check,
  XCircle
} from 'lucide-react'

interface SecurityAlert {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  type: 'security' | 'compliance' | 'rate-limit' | 'authentication'
  title: string
  description: string
  timestamp: string
  status: 'new' | 'investigating' | 'resolved'
  sourceIp?: string
  region?: string
  endpoint?: string
}

export default function SecurityAlertsComponent() {
  const [filter, setFilter] = useState('all')
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null)

  const alerts: SecurityAlert[] = [
    {
      id: '1',
      severity: 'critical',
      type: 'security',
      title: 'Suspicious API Access Pattern Detected',
      description: 'Multiple failed authentication attempts from unusual IP range',
      timestamp: '2 minutes ago',
      status: 'new',
      sourceIp: '192.168.1.1',
      region: 'US-EAST',
      endpoint: '/api/v1/users'
    },
    {
      id: '2',
      type: 'compliance',
      severity: 'high',
      title: 'Data Privacy Compliance Warning',
      description: 'PII data access without proper encryption detected',
      timestamp: '15 minutes ago',
      status: 'investigating',
      endpoint: '/api/v1/customers'
    },
    {
      id: '3',
      type: 'rate-limit',
      severity: 'medium',
      title: 'Rate Limit Threshold Exceeded',
      description: 'API key exceeded rate limit by 150%',
      timestamp: '1 hour ago',
      status: 'resolved',
      sourceIp: '192.168.1.100'
    },
    {
      id: '4',
      type: 'authentication',
      severity: 'high',
      title: 'Invalid API Key Usage',
      description: 'Expired API key attempted to access sensitive endpoints',
      timestamp: '2 hours ago',
      status: 'new',
      sourceIp: '192.168.1.50',
      endpoint: '/api/v1/admin'
    },
  ]

  const severityStyles = {
    critical: 'bg-red-50 text-red-700 border-red-200',
    high: 'bg-orange-50 text-orange-700 border-orange-200',
    medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    low: 'bg-blue-50 text-blue-700 border-blue-200',
  }

  const typeIcons = {
    security: Shield,
    compliance: Lock,
    'rate-limit': TrendingUp,
    authentication: UserX,
  }

  const statusStyles = {
    new: 'bg-red-100 text-red-800',
    investigating: 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-gray-900">Security Alerts</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Critical Alerts', value: '2', change: '+1', icon: AlertTriangle },
            { label: 'Active Threats', value: '3', change: '-2', icon: Shield },
            { label: 'Affected Endpoints', value: '4', change: '0', icon: Globe },
            { label: 'Avg. Response Time', value: '15m', change: '-23%', icon: Clock },
          ].map((stat, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <stat.icon className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className={`ml-2 text-sm ${
                  stat.change.startsWith('+') ? 'text-red-600' : 'text-green-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="divide-y divide-gray-100">
        {alerts.map((alert) => {
          const IconComponent = typeIcons[alert.type]
          
          return (
            <div
              key={alert.id}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                selectedAlert === alert.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${severityStyles[alert.severity]}`}>
                  <IconComponent className="h-5 w-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{alert.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{alert.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        statusStyles[alert.status]
                      }`}>
                        {alert.status}
                      </span>
                      <button 
                        onClick={() => setSelectedAlert(
                          selectedAlert === alert.id ? null : alert.id
                        )}
                        className="p-1 hover:bg-gray-200 rounded-full"
                      >
                        <MoreVertical className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {selectedAlert === alert.id && (
                    <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                      {alert.sourceIp && (
                        <div className="bg-gray-100 p-2 rounded">
                          <span className="text-gray-600">Source IP:</span>
                          <span className="ml-2 text-gray-900">{alert.sourceIp}</span>
                        </div>
                      )}
                      {alert.region && (
                        <div className="bg-gray-100 p-2 rounded">
                          <span className="text-gray-600">Region:</span>
                          <span className="ml-2 text-gray-900">{alert.region}</span>
                        </div>
                      )}
                      {alert.endpoint && (
                        <div className="bg-gray-100 p-2 rounded">
                          <span className="text-gray-600">Endpoint:</span>
                          <span className="ml-2 text-gray-900">{alert.endpoint}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-2 flex items-center space-x-4">
                    <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    {alert.status !== 'resolved' && (
                      <div className="flex space-x-2">
                        <button className="flex items-center space-x-1 text-xs text-green-600 hover:text-green-800">
                          <Check className="h-3 w-3" />
                          <span>Mark as resolved</span>
                        </button>
                        <button className="flex items-center space-x-1 text-xs text-red-600 hover:text-red-800">
                          <XCircle className="h-3 w-3" />
                          <span>Dismiss</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Showing {alerts.length} alerts from the last 24 hours
          </span>
          <button className="text-sm text-primary hover:text-primary/80">
            View all alerts
          </button>
        </div>
      </div>
    </div>
  )
}
