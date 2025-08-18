import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { zohoCRM, zohoWorkDrive } from '@/lib/zoho/index'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const projectId = formData.get('projectId') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Get customer folder in WorkDrive
    const customerFolderId = await zohoWorkDrive.getProjectFolder(
      session.user.email!,
      `Project_${projectId}`
    )
    
    // Upload file to Zoho WorkDrive
    const uploadResult = await zohoWorkDrive.uploadFile(
      customerFolderId,
      buffer,
      file.name
    )

    return NextResponse.json({ 
      success: true, 
      file: {
        id: uploadResult.id,
        name: uploadResult.name,
        size: file.size,
        uploadedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('projectId')

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    // Get files for the project from WorkDrive
    const customerFolderId = await zohoWorkDrive.getProjectFolder(
      session.user.email!,
      `Project_${projectId}`
    )
    const files = await zohoWorkDrive.getFiles(customerFolderId)

    return NextResponse.json({ files })
  } catch (error) {
    console.error('Error fetching files:', error)
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 })
  }
}