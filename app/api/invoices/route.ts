import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { zohoService } from '@/lib/zoho'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find the contact in Zoho CRM
    const contact = await zohoService.findContactByEmail(session.user.email)
    
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    // Get invoices for this contact
    const invoices = await zohoService.getInvoices(contact.id)
    
    return NextResponse.json({ invoices })
  } catch (error) {
    console.error('Error fetching invoices:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}