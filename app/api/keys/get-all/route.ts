import { NextResponse } from 'next/server'
import { getCookieData } from '../../../lib/cookies-exec'
import { url } from 'inspector'

export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        throw new Error('API base URL not configured')
    }

    const cookieData = await getCookieData()
    const cookieDataToken = cookieData.find((cookie) => cookie.name === 'auth-token')
    const authToken = cookieDataToken?.value.toString()

    console.log('Data Auth token get:', authToken)

    if (!authToken) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    console.log('API key list Token get #0:', authToken)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user-api-keys?userId=${authToken}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            signal: controller.signal
        })    
        console.log('API key list response #1:', response)
        
        clearTimeout(timeoutId);

        if(!response.ok){
            console.error('Failed to get all API keys')
            return NextResponse.json(
                { success: false, message: 'Failed to get all API keys' },
                { status: 500 }
            )
        }

        const data = await response.json()
        console.log('API key list generated #1:', data.data.apiKeys)

        if(!data || !data.data || !data.data.apiKeys){
            console.error('No API keys found, or invalid response')
            return NextResponse.json(
                { success: false, message: 'No API keys found, or invalid response' },
                { status: 404 }
            )
        }

        return NextResponse.json(data)
    } catch (fetchError) {
        if(fetchError.name === 'AbortError'){
            console.error('API request timed out')
            return NextResponse.json(
                { success: false, message: 'API request timed out' },
                { status: 500 }
            )
        }

        if(fetchError.code === 'ECONNREFUSED'){
            console.error('backend server not running or not accessible', {
                url: process.env.NEXT_PUBLIC_API_BASE_URL,
                error: fetchError
            })
            return NextResponse.json(
                { success: false, message: 'API request failed: Connection refused' },
                { status: 500 }
            )
        }

        throw fetchError
    } 
  } catch (error) {
    console.error('Failed to get all API keys:', error)

    const errorMessage = error.message === 'backend server not running or not accessible' ? 
    'Backend server not running or not accessible' : 'Failed to get all API keys'

    return NextResponse.json(
      { success: false, message: errorMessage, error: process.env.NODE_ENV === 'development' ? error.message : undefined },
      { status: error.message === 'backend server not running or not accessible' ? 503 : 500 }
    )
  }
}
