import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Dynamic import to prevent build-time execution
const getZohoService = async () => {
  const { zohoService } = await import('@/lib/zoho')
  return zohoService
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if Zoho is configured
    if (!process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_CLIENT_SECRET) {
      return NextResponse.json(
        { error: 'Zoho configuration not available' },
        { status: 503 }
      )
    }

    const zohoService = await getZohoService()

    // Find the contact in Zoho CRM
    const contact = await zohoService.findContactByEmail(session.user.email)
    
    if (!contact) {
      // Create contact if it doesn't exist
      const [firstName, ...lastNameParts] = session.user.name?.split(' ') || ['User']
      const lastName = lastNameParts.join(' ') || ''
      
      const newContact = await zohoService.createContact({
        email: session.user.email,
        first_name: firstName,
        last_name: lastName
      })
      
      return NextResponse.json({ 
        profile: {
          id: newContact.id,
          email: newContact.email,
          firstName: newContact.first_name,
          lastName: newContact.last_name,
          company: newContact.company,
          phone: newContact.phone
        }
      })
    }

    return NextResponse.json({ 
      profile: {
        id: contact.id,
        email: contact.email,
        firstName: contact.first_name,
        lastName: contact.last_name,
        company: contact.company,
        phone: contact.phone
      }
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { firstName, lastName, company, phone } = body

    // Find the contact in Zoho CRM
    const contact = await zohoService.findContactByEmail(session.user.email)
    
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    // Update contact in Zoho CRM
    // Note: This is a simplified update - in reality you'd use the Zoho CRM update API
    const updatedProfile = {
      id: contact.id,
      email: contact.email,
      firstName: firstName || contact.first_name,
      lastName: lastName || contact.last_name,
      company: company || contact.company,
      phone: phone || contact.phone
    }

    return NextResponse.json({ profile: updatedProfile })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Prevent this route from being statically analyzed during build
export const dynamic = 'force-dynamic'