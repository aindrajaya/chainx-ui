"use client"

import { Key, Copy, Plus, Check, Loader2, Trash2, RotateCcw, Ban, MoreVertical, RefreshCw, AlertCircle } from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  key: string
  status: 'ACTIVE' | 'INACTIVE'
  usage: number
  lastUsed: string
  createdAt: string
}

interface ApiKeysListProps {
  apiKeys: ApiKey[]
  isLoading: boolean
  error: string | null
  copySuccess: string | null
  isGenerating: boolean
  onGenerateClick: () => void
  onKeyClick: (key: ApiKey) => void
  onCopyToClipboard: (text: string, id: string) => void
  onRotateDialog: (key: ApiKey) => void
  onRevokeDialog: (key: ApiKey) => void
  onDeleteDialog: (key: ApiKey) => void
  onRetryFetch: () => void
}

export default function ApiKeysList({
  apiKeys,
  isLoading,
  error,
  copySuccess,
  isGenerating,
  onGenerateClick,
  onKeyClick,
  onCopyToClipboard,
  onRotateDialog,
  onRevokeDialog,
  onDeleteDialog,
  onRetryFetch,
}: ApiKeysListProps) {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your API keys and monitor their usage
          </p>
        </div>
        <button
          onClick={onGenerateClick}
          disabled={isGenerating}
          className="inline-flex w-full sm:w-auto items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          {isGenerating ? 'Generating...' : 'Generate New Key'}
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {[
          { label: 'Total API Calls', value: apiKeys.reduce((sum, key) => sum + key.usage, 0).toLocaleString(), change: '+12.3%' },
          { label: 'Active Keys', value: apiKeys.filter(key => key.status === 'ACTIVE').length.toString(), change: '0%' },
          { label: 'Total Keys', value: apiKeys.length.toString(), change: '' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              {stat.change && (
                <span className={`ml-2 text-sm ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* API Keys List */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <Key className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-medium text-gray-900">Your API Keys</h2>
          </div>
          <button
            onClick={onRetryFetch}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 w-full sm:w-auto"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="p-6 text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-500">Loading API keys...</p>
            </div>
          ) : apiKeys.length === 0 && !error ? (
            <div className="p-6 text-center">
              <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-sm font-medium text-gray-900 mb-2">No API keys found</h3>
              <p className="text-sm text-gray-500 mb-4">Get started by generating your first API key.</p>
              <button
                onClick={onGenerateClick}
                disabled={isGenerating}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                Generate First Key
              </button>
            </div>
          ) : apiKeys.length === 0 && error ? (
            <div className="p-6 text-center">
              <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-sm font-medium text-gray-900 mb-2">Unable to load API keys</h3>
              <p className="text-sm text-gray-500 mb-4">Please try again or contact support if the problem persists.</p>
              <button
                onClick={onRetryFetch}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            apiKeys.map((key) => (
              <div key={key.id} className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`w-2 h-2 rounded-full ${
                      key.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{key.name}</h3>
                      <div className="flex items-center mt-1">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {key.key.slice(0, 12)}...{key.key.slice(-4)}
                        </code>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onCopyToClipboard(key.key, key.id)
                          }}
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

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:justify-end">
                    <div className="text-sm text-gray-500 w-full sm:w-auto">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-2">
                        <span className="text-gray-600">Usage:</span>
                        <div className="w-full sm:w-32 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${Math.min(key.usage, 100)}%` }}
                          />
                        </div>
                        <span>{key.usage}</span>
                      </div>
                    </div>

                    <div className="relative self-start sm:self-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // For now, just show the key details. You can expand this to show a dropdown menu
                          onKeyClick(key)
                        }}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <MoreVertical className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-500">
                  <div>
                    <span className="block text-gray-400">Created</span>
                    {key.createdAt}
                  </div>
                  <div>
                    <span className="block text-gray-400">Status</span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      key.status === 'ACTIVE'
                        ? 'text-green-700 bg-green-100'
                        : 'text-gray-700 bg-gray-100'
                    }`}>
                      {key.status}
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Last Used</span>
                    {key.lastUsed}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Usage Warning - only show if there are active keys */}
      {apiKeys.filter(key => key.status === 'ACTIVE').length > 0 && (
        <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
          <AlertCircle className="h-5 w-5 text-yellow-400 mr-3" />
          <p className="text-sm text-yellow-700">
            Monitor your API usage to avoid hitting rate limits. Consider upgrading your plan for higher limits.
          </p>
        </div>
      )}
    </div>
  )
}
