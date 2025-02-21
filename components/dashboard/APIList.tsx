"use client"

import { useState } from 'react'
import { 
  Key, 
  MoreVertical, 
  Copy, 
  Edit2, 
  Trash2, 
  Plus, 
  RefreshCw,
  AlertCircle,
  Check
} from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  key: string
  status: 'Active' | 'Inactive'
  usage: number
  lastUsed: string
  createdAt: string
  expiresAt: string
}

export default function ApiList() {
  const [copySuccess, setCopySuccess] = useState<string | null>(null)
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const apiKeys: ApiKey[] = [
    {
      id: "1",
      name: "Production API Key",
      key: "pk_live_51Hb6xjK2gjK2gjK2gjK2gjK2",
      status: "Active",
      usage: 78,
      lastUsed: "2 minutes ago",
      createdAt: "2023-01-15",
      expiresAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Development API Key",
      key: "pk_test_51Hb6xjK2gjK2gjK2gjK2gjK2",
      status: "Active",
      usage: 45,
      lastUsed: "1 hour ago",
      createdAt: "2023-03-20",
      expiresAt: "2024-03-20"
    },
    {
      id: "3",
      name: "Testing API Key",
      key: "pk_test_51Hb6xjK2gjK2gjK2gjK2gjK3",
      status: "Inactive",
      usage: 0,
      lastUsed: "Never",
      createdAt: "2023-06-01",
      expiresAt: "2024-06-01"
    },
  ]

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(id)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your API keys and monitor their usage
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create New Key
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total API Calls', value: '1.2M', change: '+12.3%' },
          { label: 'Active Keys', value: '2', change: '0%' },
          { label: 'Average Response Time', value: '235ms', change: '-18.5%' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <span className={`ml-2 text-sm ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* API Keys List */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <Key className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-medium text-gray-900">Your API Keys</h2>
          </div>
          <button className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {apiKeys.map((key) => (
            <div key={key.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`w-2 h-2 rounded-full ${
                    key.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{key.name}</h3>
                    <div className="flex items-center mt-1">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {key.key.slice(0, 12)}...{key.key.slice(-4)}
                      </code>
                      <button 
                        onClick={() => copyToClipboard(key.key, key.id)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                      >
                        {copySuccess === key.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span>Usage:</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${key.usage}%` }}
                        />
                      </div>
                      <span>{key.usage}%</span>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => setSelectedKey(selectedKey === key.id ? null : key.id)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <MoreVertical className="h-5 w-5 text-gray-400" />
                    </button>

                    {selectedKey === key.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu">
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Edit2 className="h-4 w-4 mr-3 text-gray-400" />
                            Edit
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                            <Trash2 className="h-4 w-4 mr-3 text-red-400" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-2 grid grid-cols-3 gap-4 text-xs text-gray-500">
                <div>
                  <span className="block text-gray-400">Created</span>
                  {key.createdAt}
                </div>
                <div>
                  <span className="block text-gray-400">Expires</span>
                  {key.expiresAt}
                </div>
                <div>
                  <span className="block text-gray-400">Last Used</span>
                  {key.lastUsed}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Warning */}
      <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
        <AlertCircle className="h-5 w-5 text-yellow-400 mr-3" />
        <p className="text-sm text-yellow-700">
          You are approaching your API rate limit. Consider upgrading your plan to avoid service interruption.
        </p>
      </div>
    </div>
  )
}
