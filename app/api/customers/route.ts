import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { zohoService } from '@/lib/zoho'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { firstName, lastName, email, company, phone } = body

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json({ 
        error: 'First name, last name, and email are required' 
      }, { status: 400 })
    }

    // Create contact in Zoho CRM
    const contactData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      ...(company && { company }),
      ...(phone && { phone })
    }

    const contact = await zohoService.createContact(contactData)
    
    return NextResponse.json({ 
      success: true,
      contact: {
        id: contact.id,
        firstName: contact.first_name,
        lastName: contact.last_name,
        email: contact.email,
        company: contact.company,
        phone: contact.phone
      },
      message: 'Customer created successfully in Zoho CRM'
    })
  } catch (error) {
    console.error('Error creating customer:', error)
    
    // Handle specific Zoho errors
    if (error instanceof Error && error.message.includes('DUPLICATE_DATA')) {
      return NextResponse.json({ 
        error: 'A customer with this email already exists' 
      }, { status: 409 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to create customer. Please try again.' 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get recent contacts from Zoho CRM
    // This is a simplified version - in production you might want pagination
    const contacts = await zohoService.getContacts({ per_page: 10 })
    
    return NextResponse.json({ 
      customers: contacts.map((contact: any) => ({
        id: contact.id,
        firstName: contact.first_name,
        lastName: contact.last_name,
        email: contact.email,
        company: contact.company,
        phone: contact.phone,
        createdTime: contact.created_time
      }))
    })
  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch customers' 
    }, { status: 500 })
  }
}