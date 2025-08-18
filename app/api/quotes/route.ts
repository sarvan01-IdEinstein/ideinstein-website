import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { zohoCRM, zohoWorkDrive } from '@/lib/zoho/index'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()
    
    console.log('📝 Quote request received:', {
      projectType: body.projectType,
      projectTitle: body.projectTitle,
      email: body.email,
      isLoggedIn: !!session
    })

    // Validate required fields (updated for QuotationForm structure)
    const requiredFields = ['service', 'description', 'scope', 'budget', 'timeline']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // If not logged in, require contact information
    if (!session) {
      const contactFields = ['name', 'email']
      for (const field of contactFields) {
        if (!body[field]) {
          return NextResponse.json(
            { error: `Missing required contact field: ${field}` },
            { status: 400 }
          )
        }
      }
    }

    let contactId = null
    let contactEmail = session?.user?.email || body.email

    // Find or create contact
    if (session) {
      // User is logged in, find their existing contact
      console.log('🔍 Finding existing contact for logged-in user')
      const existingContact = await zohoCRM.findContactByEmail(session.user.email!)
      if (existingContact) {
        contactId = existingContact.id
        console.log('✅ Found existing contact:', contactId)
      }
    } else {
      // Anonymous user, check if contact exists or create new one
      console.log('🔍 Checking for existing contact:', contactEmail)
      let contact = await zohoCRM.findContactByEmail(contactEmail)
      
      if (!contact) {
        console.log('📝 Creating new contact for anonymous user')
        // Parse name for anonymous users
        const nameParts = body.name.split(' ')
        const firstName = nameParts[0] || 'User'
        const lastName = nameParts.slice(1).join(' ') || ''
        
        contact = await zohoCRM.createContact({
          email: contactEmail,
          first_name: firstName,
          last_name: lastName
        })
        console.log('✅ New contact created:', contact.id)
      }
      contactId = contact.id
    }

    if (!contactId) {
      return NextResponse.json(
        { error: 'Failed to create or find contact' },
        { status: 500 }
      )
    }

    // Create Lead in Zoho CRM
    console.log('📋 Creating lead in Zoho CRM')
    
    // Parse name for lead data
    const nameParts = session?.user?.name?.split(' ') || body.name.split(' ')
    const firstName = nameParts[0] || 'User'
    const lastName = nameParts.slice(1).join(' ') || 'Lead'
    
    // Map budget number to range string
    const budgetRanges = {
      1000: '€1,000 - €5,000',
      5000: '€5,000 - €10,000', 
      10000: '€10,000 - €25,000',
      25000: '€25,000 - €50,000',
      50000: '€50,000+'
    }
    const budgetRange = budgetRanges[body.budget as keyof typeof budgetRanges] || 'Custom'
    
    const leadData = {
      Last_Name: lastName,
      First_Name: firstName,
      Email: contactEmail,
      Company: 'Individual',
      
      // Lead specific fields
      Lead_Source: 'Website Quote Request',
      Lead_Status: 'New',
      Industry: 'Engineering Services',
      
      // Project details in description
      Description: `Project Quote Request:

Service: ${body.service}
Project Scope: ${body.scope}

Description:
${body.description}

Timeline: ${body.timeline}
Budget Range: ${budgetRange}

Submitted via: ${session ? 'Customer Portal' : 'Anonymous Quote Form'}
Contact ID: ${contactId}`,
      
      // Custom fields (if available in your Zoho CRM)
      Project_Type: body.service,
      Timeline: body.timeline,
      Budget_Range: budgetRange
    }

    // Create lead using CRM service
    const leadResult = await zohoCRM.createLead(leadData)
    console.log('📥 Lead creation response:', leadResult)

    if (leadResult && leadResult.id) {
      const leadId = leadResult.id
      console.log('✅ Lead created successfully:', leadId)

      // Handle file uploads if any
      let uploadedFiles = []
      if (body.files && body.files.length > 0) {
        try {
          console.log('📎 Processing file uploads...')
          const customerFolderId = await zohoWorkDrive.getCustomerFolder(contactEmail)
          const quoteFolderId = await zohoWorkDrive.getProjectFolder(contactEmail, `Quote_${leadId}`)
          
          for (const file of body.files) {
            if (file instanceof File) {
              const buffer = Buffer.from(await file.arrayBuffer())
              const uploadResult = await zohoWorkDrive.uploadFile(quoteFolderId, buffer, file.name)
              uploadedFiles.push({
                name: file.name,
                id: uploadResult.id,
                size: file.size
              })
            }
          }
          console.log(`✅ Uploaded ${uploadedFiles.length} files`)
        } catch (fileError) {
          console.error('⚠️ File upload failed, but quote was created:', fileError)
        }
      }

      // Generate quote reference number
      const quoteRef = `QT-${Date.now().toString().slice(-6)}`

      return NextResponse.json({
        success: true,
        message: 'Quote request submitted successfully',
        quoteReference: quoteRef,
        leadId: leadId,
        contactId: contactId,
        uploadedFiles: uploadedFiles,
        estimatedResponse: '24-48 hours'
      })
    } else {
      console.error('❌ Lead creation failed:', leadResult)
      return NextResponse.json(
        { error: 'Failed to create quote request in CRM' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ Quote request error:', error)
    return NextResponse.json(
      { error: 'Failed to process quote request' },
      { status: 500 }
    )
  }
}