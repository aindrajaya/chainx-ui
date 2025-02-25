"use client"

import { useState, useEffect } from 'react'
import { Key, Copy, Plus, Check, Loader2 } from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  key: string
  status: 'Active' | 'Inactive'
  usage: number
  lastUsed: string
  createdAt: string
}

interface ApiKeyResponse {
  id: string
  key: string
  created_at: string
}

// Default API Keys Data
const defaultApiKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production API Key",
    key: "pk_live_51Hb6xjK2gjK2gjK2gjK2gjK2",
    status: 'Active',
    usage: 78,
    lastUsed: "2 minutes ago",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Development API Key",
    key: "pk_dev_51Hb6xjK2gjK2gjK2gjK2gjK2",
    status: 'Active',
    usage: 45,
    lastUsed: "1 hour ago",
    createdAt: "2024-01-20"
  },
  {
    id: "3",
    name: "Testing API Key",
    key: "pk_test_51Hb6xjK2gjK2gjK2gjK2gjK2",
    status: 'Inactive',
    usage: 12,
    lastUsed: "1 day ago",
    createdAt: "2024-01-25"
  }
]

export default function ApiList() {
  const [copySuccess, setCopySuccess] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(defaultApiKeys) // Initialize with default data

  // Fetch existing API keys on component mount
  useEffect(() => {
    // Comment out fetchApiKeys() if you want to use only default data
    // fetchApiKeys()
  }, [])

  const fetchApiKeys = async () => {
    try {
      const response = await fetch('https://api.chainx.id/v1/api-keys', {
        headers: {
          // Add any authentication headers if required
          // 'Authorization': `Bearer ${yourAuthToken}`
        }
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      
      // Transform API response to match our interface
      const formattedKeys: ApiKey[] = data.map((key: any) => ({
        id: key.id,
        name: key.name || `API Key ${key.id}`,
        key: key.key,
        status: key.status || 'Active',
        usage: key.usage || 0,
        lastUsed: key.last_used || 'Never',
        createdAt: new Date(key.created_at).toLocaleDateString()
      }))

      setApiKeys(formattedKeys)
    } catch (err) {
      setError('Failed to fetch API keys')
      console.error('Error fetching API keys:', err)
    }
  }

  const generateApiKey = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('https://api.chainx.id/v1/create-api-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers
        },
        body: JSON.stringify({
          name: `API Key ${apiKeys.length + 1}`,
        })
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data: ApiKeyResponse = await response.json()

      // Create new key object
      const newKey: ApiKey = {
        id: (apiKeys.length + 1).toString(),
        name: `API Key ${apiKeys.length + 1}`,
        key: `pk_new_${Math.random().toString(36).substr(2, 9)}`,
        status: 'Active',
        usage: 0,
        lastUsed: 'Just created',
        createdAt: new Date().toLocaleDateString()
      }

      // Add new key to the beginning of the array
      setApiKeys(prevKeys => [newKey, ...prevKeys])

      // Copy new API key to clipboard
      await copyToClipboard(newKey.key, newKey.id)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate API key')
    } finally {
      setIsGenerating(false)
    }
  }

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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">API Keys</h1>
        <button
          onClick={generateApiKey}
          disabled={isGenerating}
          className={`inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg transition-colors
            ${isGenerating ? 'opacity-75 cursor-not-allowed' : 'hover:bg-green-700'}`}
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          {isGenerating ? 'Generating...' : 'Generate New Key'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* API Keys List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-gray-400" />
              <h2 className="text-sm font-medium text-gray-900">Your Active API Keys</h2>
            </div>
            <span className="text-sm text-gray-500">
              {apiKeys.length} keys generated
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {apiKeys.map((key) => (
            <div key={key.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-gray-900">{key.name}</h3>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full
                      ${key.status === 'Active' 
                        ? 'text-green-700 bg-green-100' 
                        : 'text-gray-700 bg-gray-100'
                      }`}>
                      {key.status}
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <code className="text-xs bg-gray-100 px-3 py-1 rounded-md">
                      {key.key.slice(0, 12)}...{key.key.slice(-4)}
                    </code>
                    <button 
                      onClick={() => copyToClipboard(key.key, key.id)}
                      className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      {copySuccess === key.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>Created: {key.createdAt}</p>
                  <p>Last used: {key.lastUsed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
