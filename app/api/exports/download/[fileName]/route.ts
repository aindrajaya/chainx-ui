import { NextRequest, NextResponse } from 'next/server'
import { getCookieData } from '../../../../lib/cookies-exec'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileName: string }> }
) {
  try {
    const cookieData = await getCookieData()
    const cookieDataToken = cookieData.find((cookie) => cookie.name === 'auth-token')
    const authToken = cookieDataToken?.value

    if (!authToken) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    const { fileName } = await params
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || authToken

    // Proxy to backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/exports/download/${fileName}?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      }
    })

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: 'Failed to download file' },
        { status: response.status }
      )
    }

    // Get the file content and headers
    const contentType = response.headers.get('content-type') || 'application/octet-stream'
    const contentDisposition = response.headers.get('content-disposition') || `attachment; filename="${fileName}"`

    const fileBuffer = await response.arrayBuffer()

    // Return the file with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition,
      },
    })
  } catch (error) {
    console.error('Download file error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}