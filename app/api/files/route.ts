import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { zohoCRM, zohoWorkDrive } from '@/lib/zoho/index'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('📁 Fetching files for customer:', session.user.email)

    // Find the contact in Zoho CRM
    const contact = await zohoCRM.findContactByEmail(session.user.email)
    
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    // Get customer's main folder in WorkDrive
    const customerFolderId = await zohoWorkDrive.getCustomerFolder(session.user.email)
    
    // Get all files in customer folder and subfolders
    const files = await zohoWorkDrive.getAllCustomerFiles(customerFolderId)
    
    console.log(`📁 Found ${files.length} files for customer`)

    return NextResponse.json({ 
      files,
      summary: {
        totalFiles: files.length,
        totalSize: files.reduce((sum: number, file: any) => sum + (file.size || 0), 0)
      }
    })
  } catch (error) {
    console.error('Error fetching customer files:', error)
    return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const projectId = formData.get('projectId') as string | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('📤 Uploading file:', file.name, 'for customer:', session.user.email)

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let folderId: string

    if (projectId) {
      // Upload to specific project folder
      folderId = await zohoWorkDrive.getProjectFolder(
        session.user.email,
        `Project_${projectId}`
      )
    } else {
      // Upload to general customer folder
      folderId = await zohoWorkDrive.getCustomerFolder(session.user.email)
    }
    
    // Upload file to Zoho WorkDrive
    const uploadResult = await zohoWorkDrive.uploadFile(
      folderId,
      buffer,
      file.name
    )

    console.log('✅ File uploaded successfully:', uploadResult.name)

    return NextResponse.json({ 
      success: true, 
      file: {
        id: uploadResult.id,
        name: uploadResult.name,
        size: file.size,
        projectId: projectId || null,
        uploadedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
  }
}