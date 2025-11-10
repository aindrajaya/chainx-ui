"use client"

import { Key, Copy, Check } from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  key: string
  status: 'ACTIVE' | 'INACTIVE'
  usage: number
  lastUsed: string
  createdAt: string
}

interface ApiKeyDetailsModalProps {
  selectedKey: ApiKey | null
  showKeyDetails: boolean
  usageStats: any
  copySuccess: string | null
  onClose: () => void
  onCopyToClipboard: (text: string, id: string) => void
  onRotateDialog: (key: ApiKey) => void
  onRevokeDialog: (key: ApiKey) => void
  onDeleteDialog: (key: ApiKey) => void
}

export default function ApiKeyDetailsModal({
  selectedKey,
  showKeyDetails,
  usageStats,
  copySuccess,
  onClose,
  onCopyToClipboard,
  onRotateDialog,
  onRevokeDialog,
  onDeleteDialog
}: ApiKeyDetailsModalProps) {
  if (!showKeyDetails || !selectedKey) return null

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[85vh] shadow-2xl overflow-y-auto">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center space-x-3">
              <Key className="h-6 w-6 text-gray-400" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedKey.name}</h2>
                <p className="text-sm text-gray-500">API Key Details & Usage</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  onClose()
                  onRotateDialog(selectedKey)
                }}
                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                Rotate
              </button>
              <button
                onClick={() => {
                  onClose()
                  onRevokeDialog(selectedKey)
                }}
                className="px-3 py-1.5 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Revoke
              </button>
              <button
                onClick={() => {
                  onClose()
                  onDeleteDialog(selectedKey)
                }}
                className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Key Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Key Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Status</p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full
                  ${selectedKey.status === 'ACTIVE'
                    ? 'text-green-700 bg-green-100'
                    : 'text-gray-700 bg-gray-100'
                  }`}>
                  {selectedKey.status}
                </span>
              </div>
              <div>
                <p className="text-gray-500">Created</p>
                <p className="font-medium">{selectedKey.createdAt}</p>
              </div>
              <div>
                <p className="text-gray-500">Last Used</p>
                <p className="font-medium">{selectedKey.lastUsed}</p>
              </div>
              <div>
                <p className="text-gray-500">Total Usage</p>
                <p className="font-medium">{selectedKey.usage} requests</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-gray-500 text-sm mb-1">API Key</p>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-2">
                <code className="bg-white px-3 py-1 rounded border text-xs flex-1 break-all">
                  {selectedKey.key}
                </code>
                <button
                  onClick={() => onCopyToClipboard(selectedKey.key, selectedKey.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                  title="Copy to clipboard"
                >
                  {copySuccess === selectedKey.id ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Key-specific Usage Statistics */}
          {usageStats && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Usage Statistics</h3>

              {/* Key-specific data from usage stats */}
              {(() => {
                const keyUsageData = usageStats.apiKeys?.find((k: any) => k.id === selectedKey.id)
                const keyUsageByEndpoint = usageStats.usageByKey?.find((k: any) => k.apiKeyId === selectedKey.id)

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">Period Usage</h4>
                      <p className="text-2xl font-bold text-blue-600">{keyUsageData?.periodUsage || 0}</p>
                      <p className="text-xs text-blue-700">requests in selected period</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-green-900 mb-2">Total Usage</h4>
                      <p className="text-2xl font-bold text-green-600">{keyUsageData?.totalUsage || 0}</p>
                      <p className="text-xs text-green-700">all-time requests</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-purple-900 mb-2">Last Activity</h4>
                      <p className="text-lg font-bold text-purple-600">
                        {keyUsageData?.lastUsed ? new Date(keyUsageData.lastUsed).toLocaleDateString() : 'Never'}
                      </p>
                      <p className="text-xs text-purple-700">
                        {keyUsageData?.lastUsed ? new Date(keyUsageData.lastUsed).toLocaleTimeString() : ''}
                      </p>
                    </div>
                  </div>
                )
              })()}

              {/* Recent Activity - could be enhanced with more detailed endpoint/method data */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Recent Activity</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Detailed activity logs and endpoint-specific usage would be displayed here.
                    This could include recent API calls, response times, and error rates for this specific key.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
