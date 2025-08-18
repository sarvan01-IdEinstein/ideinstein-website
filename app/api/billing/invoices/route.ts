import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { requirePermission, Permission } from '@/lib/rbac'
import { AuditLogger } from '@/lib/audit'
import { CacheService } from '@/lib/cache'
import { zohoCRM, zohoBooks } from '@/lib/zoho/index'

export async function GET(request: NextRequest) {
  console.log('🔍 Billing/Invoices API - GET called')
  
  try {
    // Check permissions
    const permissionResult = await requirePermission(request, Permission.READ_OWN_INVOICES)
    if (permissionResult instanceof Response) {
      return permissionResult
    }
    
    const { user } = permissionResult
    console.log('✅ Permission granted for user:', user.email)

    // Find the contact in Zoho CRM
    const contact = await zohoCRM.findContactByEmail(user.email!)
    if (!contact) {
      console.log('❌ Contact not found in Zoho CRM')
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    const accountId = (contact as any).account_name || contact.company || contact.id
    console.log('✅ Contact found:', {
      id: contact.id,
      accountId: accountId
    })

    // Get invoices using cache service
    const invoices = await CacheService.getInvoices(accountId)
    
    // Calculate summary statistics
    const totalPaid = invoices
      .filter(invoice => invoice.status === 'paid')
      .reduce((sum, invoice) => sum + (invoice.total || 0), 0)
    
    const outstandingBalance = invoices
      .filter(invoice => invoice.status !== 'paid')
      .reduce((sum, invoice) => sum + (invoice.balance || 0), 0)
    
    const paidInvoicesCount = invoices.filter(invoice => invoice.status === 'paid').length

    // Log audit event
    await AuditLogger.logInvoiceAccess(
      user.id,
      'list',
      'view',
      request.ip
    )
    
    console.log('✅ Invoices retrieved:', {
      count: invoices?.length || 0,
      totalPaid,
      outstandingBalance,
      cached: true
    })

    return NextResponse.json({ 
      success: true,
      invoices: invoices || [],
      summary: {
        totalPaid,
        outstandingBalance,
        paidInvoicesCount
      },
      cached: true,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Billing/Invoices API error:', error)
    
    // Log security event for errors
    const session = await getServerSession(authOptions)
    if (session?.user) {
      await AuditLogger.logSecurityEvent(
        'suspicious_activity',
        session.user.id,
        request.ip,
        { error: (error as Error).message, endpoint: '/api/billing/invoices' }
      )
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}