"use client"

import { Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

interface ApiKeyDialogsProps {
  // Generate Dialog
  isDialogOpen: boolean
  setIsDialogOpen: (open: boolean) => void
  keyName: string
  setKeyName: (name: string) => void
  isGenerating: boolean
  onGenerateApiKey: () => void
  error: string | null
  setError: (error: string | null) => void

  // Delete Dialog
  isDeleteDialogOpen: boolean
  setIsDeleteDialogOpen: (open: boolean) => void
  keyToDelete: ApiKey | null
  setKeyToDelete: (key: ApiKey | null) => void
  isDeleting: boolean
  onDeleteApiKey: () => void

  // Revoke Dialog
  isRevokeDialogOpen: boolean
  setIsRevokeDialogOpen: (open: boolean) => void
  keyToRevoke: ApiKey | null
  setKeyToRevoke: (key: ApiKey | null) => void
  isRevoking: boolean
  onRevokeApiKey: () => void

  // Rotate Dialog
  isRotateDialogOpen: boolean
  setIsRotateDialogOpen: (open: boolean) => void
  keyToRotate: ApiKey | null
  setKeyToRotate: (key: ApiKey | null) => void
  isRotating: boolean
  onRotateApiKey: () => void
}

export default function ApiKeyDialogs({
  // Generate Dialog
  isDialogOpen,
  setIsDialogOpen,
  keyName,
  setKeyName,
  isGenerating,
  onGenerateApiKey,
  error,
  setError,

  // Delete Dialog
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  keyToDelete,
  setKeyToDelete,
  isDeleting,
  onDeleteApiKey,

  // Revoke Dialog
  isRevokeDialogOpen,
  setIsRevokeDialogOpen,
  keyToRevoke,
  setKeyToRevoke,
  isRevoking,
  onRevokeApiKey,

  // Rotate Dialog
  isRotateDialogOpen,
  setIsRotateDialogOpen,
  keyToRotate,
  setKeyToRotate,
  isRotating,
  onRotateApiKey,
}: ApiKeyDialogsProps) {
  const handleGenerateApiKey = async () => {
    if (!keyName.trim()) {
      setError('Please enter a name for the API key')
      return
    }
    await onGenerateApiKey()
    setIsDialogOpen(false)
    setKeyName('')
  }

  return (
    <>
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
              onClick={onDeleteApiKey}
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
              onClick={onRevokeApiKey}
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
              onClick={onRotateApiKey}
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
    </>
  )
}