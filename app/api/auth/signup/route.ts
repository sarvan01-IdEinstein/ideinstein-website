import { NextRequest, NextResponse } from 'next/server'

// Dynamic import to prevent build-time execution
const getZohoCRM = async () => {
  const { zohoCRM } = await import('@/lib/zoho/index')
  return zohoCRM
}

export async function POST(request: NextRequest) {
  console.log('🚀 Signup API called')
  
  try {
    // Check if Zoho is configured
    if (!process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_CLIENT_SECRET) {
      return NextResponse.json(
        { error: 'Zoho configuration not available' },
        { status: 503 }
      )
    }

    const zohoCRM = await getZohoCRM()
    
    const body = await request.json()
    const { firstName, lastName, email, company, password } = body

    console.log('📝 Received signup data:', {
      firstName,
      lastName,
      email,
      company: company || 'Not provided',
      passwordLength: password?.length || 0
    })

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      console.log('❌ Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if user already exists
    console.log('🔍 Checking if user already exists...')
    const existingContact = await zohoCRM.findContactByEmail(email)
    if (existingContact) {
      console.log('⚠️  User already exists:', existingContact.id)
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }
    console.log('✅ User does not exist, proceeding with creation')

    // Create contact in Zoho CRM
    const contactData = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      ...(company && { company: company })
    }

    console.log('Creating Zoho contact:', contactData)
    
    const newContact = await zohoCRM.createContact(contactData)
    
    console.log('Zoho contact created successfully:', {
      id: newContact.id,
      email: newContact.email,
      name: `${newContact.first_name} ${newContact.last_name}`
    })

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      contactId: newContact.id
    })

  } catch (error) {
    console.error('❌ Signup error:', error)
    
    // Log the full error for debugging
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    // Handle specific Zoho errors
    if (error instanceof Error) {
      if (error.message.includes('DUPLICATE_DATA')) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        )
      }
      
      if (error.message.includes('INVALID_DATA')) {
        return NextResponse.json(
          { error: 'Invalid data provided. Please check your information.' },
          { status: 400 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Account creation failed. Please try again.' },
      { status: 500 }
    )
  }
}// 
Prevent this route from being statically analyzed during build
export const dynamic = 'force-dynamic'