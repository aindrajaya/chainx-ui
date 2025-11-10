"use client"

import { useState, useEffect } from 'react'
import { Plus, Loader2 } from 'lucide-react'
import ApiKeysList from './ApiKeysList'
import ApiKeyDetailsModal from './ApiKeyDetailsModal'
import ApiKeyDialogs from './ApiKeyDialogs'
import ApiUsageStatsSection from './ApiUsageStatsSection'

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
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null)
  const [showKeyDetails, setShowKeyDetails] = useState(false)
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
      let formattedKeys: ApiKey[] = data.data.apiKeys.map((key: any) => ({
        id: key.id,
        name: key.name || `API Key ${key.id}`,
        key: key.keyValue,
        status: key.status,
        usage: key.usageCount || 0,
        lastUsed: key.lastUsed ? new Date(key.lastUsed).toLocaleString() : 'Never',
        createdAt: key.createdAt ? new Date(key.createdAt).toLocaleDateString() : new Date().toLocaleDateString()
      }))

      // If we have usage stats, merge the lastUsed data
      if (usageStats && usageStats.apiKeys) {
        formattedKeys = formattedKeys.map(key => {
          const usageData = usageStats.apiKeys.find((usageKey: any) => usageKey.id === key.id)
          if (usageData && usageData.lastUsed) {
            return {
              ...key,
              lastUsed: new Date(usageData.lastUsed).toLocaleString(),
              usage: usageData.periodUsage || key.usage
            }
          }
          return key
        })
      }

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

  const handleKeyClick = (key: ApiKey) => {
    setSelectedKey(key)
    setShowKeyDetails(true)
  }

  const closeKeyDetails = () => {
    setSelectedKey(null)
    setShowKeyDetails(false)
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
      console.log("USAGE DATA: ", data.data)
      setUsageStats(data.data)
      setSelectedTimeframe(timeframe)

      // Refresh API keys to merge usage data
      fetchApiKeys()

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch usage stats'
      setError(errorMessage)
      console.error('Error fetching usage stats:', err)
    } finally {
      setIsLoadingStats(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto w-full p-4 sm:p-6 space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* API Keys List */}
      <ApiKeysList
        apiKeys={apiKeys}
        isLoading={isLoading}
        error={error}
        copySuccess={copySuccess}
        isGenerating={isGenerating}
        onGenerateClick={() => setIsDialogOpen(true)}
        onKeyClick={handleKeyClick}
        onCopyToClipboard={copyToClipboard}
        onRotateDialog={openRotateDialog}
        onRevokeDialog={openRevokeDialog}
        onDeleteDialog={openDeleteDialog}
        onRetryFetch={fetchApiKeys}
      />

      {/* Usage Statistics Section */}
      <ApiUsageStatsSection
        usageStats={usageStats}
        isLoadingStats={isLoadingStats}
        selectedTimeframe={selectedTimeframe}
        onTimeframeChange={fetchUsageStats}
        onRefreshStats={() => fetchUsageStats(selectedTimeframe)}
      />

      {/* API Key Details Modal */}
      <ApiKeyDetailsModal
        selectedKey={selectedKey}
        showKeyDetails={showKeyDetails}
        usageStats={usageStats}
        copySuccess={copySuccess}
        onClose={closeKeyDetails}
        onCopyToClipboard={copyToClipboard}
        onRotateDialog={openRotateDialog}
        onRevokeDialog={openRevokeDialog}
        onDeleteDialog={openDeleteDialog}
      />

      {/* API Key Dialogs */}
      <ApiKeyDialogs
        // Generate Dialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        keyName={keyName}
        setKeyName={setKeyName}
        isGenerating={isGenerating}
        onGenerateApiKey={handleGenerateApiKey}
        error={error}
        setError={setError}

        // Delete Dialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        keyToDelete={keyToDelete}
        setKeyToDelete={setKeyToDelete}
        isDeleting={isDeleting}
        onDeleteApiKey={handleDeleteApiKey}

        // Revoke Dialog
        isRevokeDialogOpen={isRevokeDialogOpen}
        setIsRevokeDialogOpen={setIsRevokeDialogOpen}
        keyToRevoke={keyToRevoke}
        setKeyToRevoke={setKeyToRevoke}
        isRevoking={isRevoking}
        onRevokeApiKey={handleRevokeApiKey}

        // Rotate Dialog
        isRotateDialogOpen={isRotateDialogOpen}
        setIsRotateDialogOpen={setIsRotateDialogOpen}
        keyToRotate={keyToRotate}
        setKeyToRotate={setKeyToRotate}
        isRotating={isRotating}
        onRotateApiKey={handleRotateApiKey}
      />
    </div>
  )
}
