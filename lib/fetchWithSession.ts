type FetchWithSessionOptions = {
  redirectOnUnauthorized?: boolean
  onUnauthorized?: () => void
}

export async function fetchWithSession(
  input: RequestInfo | URL,
  init: RequestInit = {},
  options: FetchWithSessionOptions = {}
) {
  const { redirectOnUnauthorized = true, onUnauthorized } = options
  const headers = new Headers(init.headers || undefined)

  const response = await fetch(input, {
    ...init,
    headers,
    credentials: 'include',
  })

  if (response.status === 401) {
    onUnauthorized?.()

    if (redirectOnUnauthorized && typeof window !== 'undefined') {
      window.location.href = '/auth/signin'
    }
  }

  return response
}
