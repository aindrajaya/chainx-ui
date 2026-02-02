"use client"

import { Key, Loader2 } from 'lucide-react'

interface ApiUsageStatsSectionProps {
  usageStats: any
  isLoadingStats: boolean
  selectedTimeframe: string
  onTimeframeChange: (timeframe: string) => void
  onRefreshStats: () => void
}

export default function ApiUsageStatsSection({
  usageStats,
  isLoadingStats,
  selectedTimeframe,
  onTimeframeChange,
  onRefreshStats,
}: ApiUsageStatsSectionProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-2">
            <Key className="h-5 w-5 text-gray-400" />
            <h2 className="text-sm font-medium text-gray-900">API Usage Statistics</h2>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:space-x-2 w-full sm:w-auto">
            <select
              value={selectedTimeframe}
              onChange={(e) => onTimeframeChange(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              disabled={isLoadingStats}
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
            </select>
            <button
              onClick={() => onRefreshStats()}
              disabled={isLoadingStats}
              className="text-sm bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 w-full sm:w-auto"
            >
              {isLoadingStats ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {isLoadingStats ? (
          <div className="text-center">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-500">Loading usage statistics...</p>
          </div>
        ) : usageStats ? (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Total Requests</h3>
                <p className="text-2xl font-bold text-blue-600">{usageStats.totalUsage || 0}</p>
                <p className="text-xs text-gray-500">in selected period</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Active Keys</h3>
                <p className="text-2xl font-bold text-green-600">{usageStats.apiKeys?.length || 0}</p>
                <p className="text-xs text-gray-500">total API keys</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Endpoints Used</h3>
                <p className="text-2xl font-bold text-purple-600">{usageStats.usageByEndpoint?.length || 0}</p>
                <p className="text-xs text-gray-500">different endpoints</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Avg per Key</h3>
                <p className="text-2xl font-bold text-orange-600">
                  {usageStats.apiKeys?.length > 0
                    ? Math.round((usageStats.totalUsage || 0) / usageStats.apiKeys.length)
                    : 0
                  }
                </p>
                <p className="text-xs text-gray-500">requests per key</p>
              </div>
            </div>

            {/* Usage by Endpoint */}
            {usageStats.usageByEndpoint && usageStats.usageByEndpoint.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Usage by Endpoint</h3>
                <div className="space-y-3">
                  {usageStats.usageByEndpoint.map((endpoint: any, index: number) => (
                    <div key={index} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="w-full sm:w-auto">
                        <p className="text-sm font-medium text-gray-900">{endpoint.endpoint}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{endpoint.count} requests</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Usage by Method */}
            {usageStats.usageByMethod && usageStats.usageByMethod.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Usage by HTTP Method</h3>
                <div className="space-y-3">
                  {usageStats.usageByMethod.map((method: any, index: number) => (
                    <div key={index} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="w-full sm:w-auto">
                        <p className="text-sm font-medium text-gray-900">{method.method}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{method.count} requests</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hourly Usage Chart */}
            {usageStats.hourlyUsage && usageStats.hourlyUsage.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Hourly Usage (Last 24h)</h3>
                <div className="space-y-2">
                  {usageStats.hourlyUsage.map((hour: any, index: number) => (
                    <div key={index} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between p-2 bg-gray-50 rounded">
                      <div className="w-full sm:w-auto">
                        <p className="text-sm text-gray-900">
                          {new Date(hour.hour).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{hour.count} requests</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-sm font-medium text-gray-900 mb-2">No usage statistics available</h3>
            <p className="text-sm text-gray-500 mb-4">Click refresh to load usage statistics.</p>
            <button
              onClick={() => onRefreshStats()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Load Statistics
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
