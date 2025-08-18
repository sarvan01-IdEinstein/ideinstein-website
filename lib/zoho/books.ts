import { ZohoBaseService } from './base'

export interface ZohoInvoice {
  invoice_id: string
  invoice_number: string
  contact_id: string
  total: number
  balance: number
  status: string
  due_date: string
  created_time: string
  payment_url?: string
}

export interface ZohoBooksCustomer {
  contact_id: string
  contact_name: string
  email: string
  company_name?: string
  phone?: string
}

export class ZohoBooksService extends ZohoBaseService {
  protected clientId = process.env.ZOHO_BOOKS_CLIENT_ID!
  protected clientSecret = process.env.ZOHO_BOOKS_CLIENT_SECRET!
  protected refreshToken = process.env.ZOHO_BOOKS_REFRESH_TOKEN!
  protected baseUrl = process.env.ZOHO_DOMAIN || 'https://accounts.zoho.in'
  
  private orgId = process.env.ZOHO_BOOKS_ORG_ID

  constructor() {
    super()
    
    // Check if Books credentials are configured
    if (!this.clientId || !this.clientSecret || !this.refreshToken || !this.orgId) {
      console.warn('⚠️  Zoho Books credentials not configured. Billing functionality will be limited.')
    }
  }

  async getInvoices(contactId?: string): Promise<ZohoInvoice[]> {
    if (!this.orgId) {
      console.warn('⚠️  ZOHO_BOOKS_ORG_ID not configured, returning empty invoices')
      return []
    }
    
    let url = `https://books.zoho.in/api/v3/invoices?organization_id=${this.orgId}`
    if (contactId) {
      url += `&customer_id=${contactId}`
    }
    
    try {
      console.log('🔍 Fetching invoices from Zoho Books')
      const response = await this.makeRequest('GET', url)
      console.log('📥 Invoices response:', response)
      
      const invoices = response.invoices || []
      return invoices.map((invoice: any) => this.mapInvoiceResponse(invoice))
    } catch (error) {
      console.error('Error fetching invoices:', error)
      return []
    }
  }

  async getInvoice(invoiceId: string): Promise<ZohoInvoice> {
    if (!this.orgId) {
      throw new Error('ZOHO_BOOKS_ORG_ID not configured')
    }
    
    const url = `https://books.zoho.in/api/v3/invoices/${invoiceId}?organization_id=${this.orgId}`
    
    try {
      const response = await this.makeRequest('GET', url)
      return this.mapInvoiceResponse(response.invoice)
    } catch (error) {
      console.error('Error fetching invoice:', error)
      throw error
    }
  }

  async createInvoice(invoiceData: {
    customer_id: string
    line_items: Array<{
      name: string
      description: string
      rate: number
      quantity: number
    }>
  }): Promise<ZohoInvoice> {
    if (!this.orgId) {
      throw new Error('ZOHO_BOOKS_ORG_ID not configured')
    }
    
    const url = `https://books.zoho.in/api/v3/invoices?organization_id=${this.orgId}`
    
    try {
      console.log('📝 Creating invoice in Zoho Books:', invoiceData)
      const response = await this.makeRequest('POST', url, invoiceData)
      console.log('✅ Invoice created successfully:', response)
      
      return this.mapInvoiceResponse(response.invoice)
    } catch (error) {
      console.error('❌ Invoice creation failed:', error)
      throw error
    }
  }

  // Get customers from Zoho Books
  async getBooksCustomers(): Promise<ZohoBooksCustomer[]> {
    if (!this.orgId) {
      console.warn('⚠️  ZOHO_BOOKS_ORG_ID not configured')
      return []
    }
    
    const url = `https://books.zoho.in/api/v3/contacts?organization_id=${this.orgId}`
    
    try {
      const response = await this.makeRequest('GET', url)
      const contacts = response.contacts || []
      
      return contacts.map((contact: any) => ({
        contact_id: contact.contact_id,
        contact_name: contact.contact_name,
        email: contact.email,
        company_name: contact.company_name,
        phone: contact.phone
      }))
    } catch (error) {
      console.error('Error fetching Books customers:', error)
      return []
    }
  }

  // Create customer in Zoho Books
  async createBooksCustomer(customerData: {
    contact_name: string
    email: string
    company_name?: string
  }): Promise<ZohoBooksCustomer> {
    if (!this.orgId) {
      throw new Error('ZOHO_BOOKS_ORG_ID not configured')
    }
    
    const url = `https://books.zoho.in/api/v3/contacts?organization_id=${this.orgId}`
    
    try {
      console.log('📝 Creating Books customer:', customerData)
      const response = await this.makeRequest('POST', url, customerData)
      console.log('✅ Books customer created:', response)
      
      const contact = response.contact
      return {
        contact_id: contact.contact_id,
        contact_name: contact.contact_name,
        email: contact.email,
        company_name: contact.company_name
      }
    } catch (error) {
      console.error('❌ Books customer creation failed:', error)
      throw error
    }
  }

  // Find Books customer by email
  async findBooksCustomerByEmail(email: string): Promise<ZohoBooksCustomer | null> {
    try {
      const customers = await this.getBooksCustomers()
      return customers.find(customer => customer.email === email) || null
    } catch (error) {
      console.error('Error finding Books customer:', error)
      return null
    }
  }

  // Helper method to map invoice response
  private mapInvoiceResponse(invoice: any): ZohoInvoice {
    return {
      invoice_id: invoice.invoice_id,
      invoice_number: invoice.invoice_number,
      contact_id: invoice.customer_id,
      total: parseFloat(invoice.total) || 0,
      balance: parseFloat(invoice.balance) || 0,
      status: invoice.status,
      due_date: invoice.due_date,
      created_time: invoice.created_time,
      payment_url: invoice.payment_url
    }
  }

  // Check if Books is configured and working
  async isConfigured(): Promise<boolean> {
    if (!this.clientId || !this.clientSecret || !this.refreshToken || !this.orgId) {
      return false
    }

    try {
      await this.testConnection()
      return true
    } catch (error) {
      return false
    }
  }
}