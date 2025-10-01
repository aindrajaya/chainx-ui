"use client"

import { useState, useEffect } from 'react'
import { Key, Copy, Plus, Check, Loader2, Trash2, RotateCcw, Ban } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface ApiKey {
  id: string
  name: string
  key: string
  status: 'ACTIVE' | 'INACTIVE'
  usage: number
  lastUsed: string
  createdAt: string
}

interface ApiKeyResponse2 {
  id: string
  key: string
  created_at: string
}

interface ApiKeyData {
  id: string
  name: string
  keyValue: string
  type: string
  expiresAt: string
  createdAt: string
  updatedAt: string
  userId: string
  isActive: boolean
  lastUsed: string
  usageCount: number
}


interface ApiKeyResponse {
  message: string
  apiKey: ApiKeyData
}

export default function ApiList() {
  const [copySuccess, setCopySuccess] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]) // Start with empty array
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [keyName, setKeyName] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [keyToDelete, setKeyToDelete] = useState<ApiKey | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false)
  const [keyToRevoke, setKeyToRevoke] = useState<ApiKey | null>(null)
  const [isRevoking, setIsRevoking] = useState(false)
  const [isRotateDialogOpen, setIsRotateDialogOpen] = useState(false)
  const [keyToRotate, setKeyToRotate] = useState<ApiKey | null>(null)
  const [isRotating, setIsRotating] = useState(false)
  const [usageStats, setUsageStats] = useState<any>(null)
  const [isLoadingStats, setIsLoadingStats] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')

  // Fetch existing API keys and usage stats on component mount
  useEffect(() => {
    fetchApiKeys()
    fetchUsageStats()
  }, [])

  const fetchApiKeys = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/keys/get-all", {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Error: ${response.status}`)
      }

      const data = await response.json()

      console.log('API key list response:', data)

      // Transform API response to match our interface
      const formattedKeys: ApiKey[] = data.data.apiKeys.map((key: any) => ({
        id: key.id,
        name: key.name || `API Key ${key.id}`,
        key: key.keyValue,
        status: key.status,
        usage: key.usageCount || 0,
        lastUsed: key.lastUsed ? new Date(key.lastUsed).toLocaleString() : 'Never',
        createdAt: key.createdAt ? new Date(key.createdAt).toLocaleDateString() : new Date().toLocaleDateString()
      }))

      setApiKeys(formattedKeys)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch API keys'
      setError(errorMessage)
      console.error('Error fetching API keys:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const generateApiKey = async (name: string) => {
    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/keys/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: name,
          type: 'PRODUCTION'
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Error: ${response.status}`)
      }

      const data: ApiKeyResponse = await response.json()

      console.log('Generated API key response:', data)

      // Create new key object from the response
      const newKey: ApiKey = {
        id: data.apiKey.id,
        name: data.apiKey.name || `API Key ${data.apiKey.id}`,
        key: data.apiKey.keyValue,
        status: 'ACTIVE',
        usage: 0,
        lastUsed: 'Just created',
        createdAt: new Date().toLocaleDateString()
      }

      // Add new key to the beginning of the array
      setApiKeys(prevKeys => [newKey, ...prevKeys])

      // Copy new API key to clipboard
      await copyToClipboard(newKey.key, newKey.id)

      // Refresh the list to get updated data from server
      await fetchApiKeys()

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate API key'
      setError(errorMessage)
      console.error('Error generating API key:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateApiKey = async () => {
    if (!keyName.trim()) {
      setError('Please enter a name for the API key')
      return
    }

    await generateApiKey(keyName.trim())
    setIsDialogOpen(false)
    setKeyName('')
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

  const handleDeleteApiKey = async () => {
    if (!keyToDelete) return

    setIsDeleting(true)
    setError(null)

    try {
      const response = await fetch(`/api/keys/delete/${keyToDelete.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Error: ${response.status}`)
      }

      // Remove the deleted key from the list
      setApiKeys(prevKeys => prevKeys.filter(key => key.id !== keyToDelete.id))

      // Close the dialog
      setIsDeleteDialogOpen(false)
      setKeyToDelete(null)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete API key'
      setError(errorMessage)
      console.error('Error deleting API key:', err)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleRevokeApiKey = async () => {
    if (!keyToRevoke) return

    setIsRevoking(true)
    setError(null)

    try {
      const response = await fetch(`/api/keys/revoke/${keyToRevoke.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Error: ${response.status}`)
      }

      // Update the revoked key status in the list
      setApiKeys(prevKeys => prevKeys.map(key =>
        key.id === keyToRevoke.id
          ? { ...key, status: 'INACTIVE' as const }
          : key
      ))

      // Close the dialog
      setIsRevokeDialogOpen(false)
      setKeyToRevoke(null)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to revoke API key'
      setError(errorMessage)
      console.error('Error revoking API key:', err)
    } finally {
      setIsRevoking(false)
    }
  }

  const handleRotateApiKey = async () => {
    if (!keyToRotate) return

    setIsRotating(true)
    setError(null)

    try {
      const response = await fetch(`/api/keys/rotate/${keyToRotate.id}`, {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Error: ${response.status}`)
      }

      const data = await response.json()
      console.log('Rotated API key response:', data)

      // Refresh the list to get updated data from server
      await fetchApiKeys()

      // Close the dialog
      setIsRotateDialogOpen(false)
      setKeyToRotate(null)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to rotate API key'
      setError(errorMessage)
      console.error('Error rotating API key:', err)
    } finally {
      setIsRotating(false)
    }
  }

  const openDeleteDialog = (key: ApiKey) => {
    setKeyToDelete(key)
    setIsDeleteDialogOpen(true)
  }

  const openRevokeDialog = (key: ApiKey) => {
    setKeyToRevoke(key)
    setIsRevokeDialogOpen(true)
  }

  const openRotateDialog = (key: ApiKey) => {
    setKeyToRotate(key)
    setIsRotateDialogOpen(true)
  }

  const fetchUsageStats = async (timeframe: string = '24h') => {
    try {
      setIsLoadingStats(true)
      setError(null)

      const response = await fetch(`/api/keys/usage-stats?timeframe=${timeframe}`, {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Error: ${response.status}`)
      }

      const data = await response.json()
      setUsageStats(data)
      setSelectedTimeframe(timeframe)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch usage stats'
      setError(errorMessage)
      console.error('Error fetching usage stats:', err)
    } finally {
      setIsLoadingStats(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">API Keys</h1>
        <button
          onClick={() => setIsDialogOpen(true)}
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
              <h2 className="text-sm font-medium text-gray-900">Your API Keys</h2>
            </div>
            <span className="text-sm text-gray-500">
              {apiKeys.length} keys total
            </span>
          </div>
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
                onClick={() => setIsDialogOpen(true)}
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
                onClick={fetchApiKeys}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            apiKeys.map((key) => (
              <div key={key.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-gray-900">{key.name}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full
                        ${key.status === 'ACTIVE' 
                          ? 'text-green-700 bg-green-100' 
                          : 'text-gray-700 bg-gray-100'
                        }`}>
                        {key.status}
                      </span>
                    </div>
                    <div className="flex items-center mt-2">
                      <code className="text-xs bg-gray-100 px-3 py-1 rounded-md">
                        {key.key}
                      </code>
                      <button 
                        onClick={() => copyToClipboard(key.key, key.id)}
                        className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                        title="Copy to clipboard"
                      >
                        {copySuccess === key.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                      <button 
                        onClick={() => openRotateDialog(key)}
                        className="ml-2 p-1 hover:bg-blue-100 rounded-full transition-colors"
                        title="Rotate API key"
                      >
                        <RotateCcw className="h-4 w-4 text-blue-400 hover:text-blue-600" />
                      </button>
                      <button 
                        onClick={() => openRevokeDialog(key)}
                        className="ml-2 p-1 hover:bg-yellow-100 rounded-full transition-colors"
                        title="Revoke API key (temporary)"
                      >
                        <Ban className="h-4 w-4 text-yellow-400 hover:text-yellow-600" />
                      </button>
                      <button 
                        onClick={() => openDeleteDialog(key)}
                        className="ml-2 p-1 hover:bg-red-100 rounded-full transition-colors"
                        title="Delete API key (permanent)"
                      >
                        <Trash2 className="h-4 w-4 text-red-400 hover:text-red-600" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>Created: {key.createdAt}</p>
                    <p>Last used: {key.lastUsed}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Usage Statistics Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-gray-400" />
              <h2 className="text-sm font-medium text-gray-900">API Usage Statistics</h2>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedTimeframe}
                onChange={(e) => fetchUsageStats(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoadingStats}
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
              </select>
              <button
                onClick={() => fetchUsageStats(selectedTimeframe)}
                disabled={isLoadingStats}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoadingStats ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {isLoadingStats ? (
            <div className="text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-500">Loading usage statistics...</p>
            </div>
          ) : usageStats ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Total Active Keys</h3>
                <p className="text-2xl font-bold text-blue-600">{usageStats.totalActiveKeys || 0}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Total Requests</h3>
                <p className="text-2xl font-bold text-green-600">{usageStats.totalRequests || 0}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Average per Key</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {usageStats.totalActiveKeys > 0
                    ? Math.round((usageStats.totalRequests || 0) / usageStats.totalActiveKeys)
                    : 0
                  }
                </p>
              </div>

              {usageStats.recentUsage && usageStats.recentUsage.length > 0 && (
                <div className="md:col-span-3 mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Recent Usage by Key</h3>
                  <div className="space-y-3">
                    {usageStats.recentUsage.slice(0, 5).map((usage: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{usage.keyName || `Key ${usage.keyId?.slice(-8)}`}</p>
                          <p className="text-xs text-gray-500">ID: {usage.keyId?.slice(-8)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{usage.requests || 0} requests</p>
                          <p className="text-xs text-gray-500">
                            {usage.lastUsed ? new Date(usage.lastUsed).toLocaleString() : 'Never'}
                          </p>
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
                onClick={() => fetchUsageStats(selectedTimeframe)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Load Statistics
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Generate API Key Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate New API Key</DialogTitle>
            <DialogDescription>
              Enter a name for your new API key. This will help you identify it later.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="e.g., Production API Key"
                className="col-span-3"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleGenerateApiKey()
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false)
                setKeyName('')
                setError(null)
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleGenerateApiKey}
              disabled={isGenerating || !keyName.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Key'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete API Key Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete API Key (Permanent)</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete the API key "{keyToDelete?.name}"?
              This action cannot be undone and the key will be completely removed from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsDeleteDialogOpen(false)
                setKeyToDelete(null)
              }}
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteApiKey}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Permanently'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Revoke API Key Confirmation Dialog */}
      <AlertDialog open={isRevokeDialogOpen} onOpenChange={setIsRevokeDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke API Key (Temporary)</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to revoke the API key "{keyToRevoke?.name}"?
              The key will become inactive but can be re-enabled later. This is useful for temporary suspension.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsRevokeDialogOpen(false)
                setKeyToRevoke(null)
              }}
              disabled={isRevoking}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRevokeApiKey}
              disabled={isRevoking}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              {isRevoking ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Revoking...
                </>
              ) : (
                'Revoke Key'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rotate API Key Confirmation Dialog */}
      <AlertDialog open={isRotateDialogOpen} onOpenChange={setIsRotateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rotate API Key</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to rotate the API key "{keyToRotate?.name}"?
              This will generate a new key value and deactivate the old one. The old key will become invalid immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setIsRotateDialogOpen(false)
                setKeyToRotate(null)
              }}
              disabled={isRotating}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRotateApiKey}
              disabled={isRotating}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isRotating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Rotating...
                </>
              ) : (
                'Rotate Key'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
