import axios from 'axios'

interface ZohoTokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
}

interface ZohoContact {
  id: string
  email: string
  first_name: string
  last_name: string
  company?: string
  phone?: string
  created_time: string
  modified_time: string
}

interface ZohoProject {
  id: string
  name: string
  description: string
  status: string
  owner_id: string
  created_date: string
  modified_date: string
}

interface ZohoInvoice {
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

class ZohoService {
  private baseUrl: string
  private clientId: string
  private clientSecret: string
  private refreshToken: string
  private accessToken: string | null = null
  private tokenExpiry: number = 0

  constructor() {
    this.baseUrl = process.env.ZOHO_DOMAIN || 'https://accounts.zoho.in'
    this.clientId = process.env.ZOHO_CLIENT_ID!
    this.clientSecret = process.env.ZOHO_CLIENT_SECRET!
    this.refreshToken = process.env.ZOHO_REFRESH_TOKEN!
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    try {
      const response = await axios.post(`${this.baseUrl}/oauth/v2/token`, null, {
        params: {
          refresh_token: this.refreshToken,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'refresh_token'
        }
      })

      const data: ZohoTokenResponse = response.data
      this.accessToken = data.access_token
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000 // 1 minute buffer

      return this.accessToken
    } catch (error) {
      console.error('Error getting Zoho access token:', error)
      throw new Error('Failed to authenticate with Zoho')
    }
  }

  private async makeRequest(method: string, url: string, data?: any, params?: any) {
    const token = await this.getAccessToken()
    
    try {
      const response = await axios({
        method,
        url,
        data,
        params,
        headers: {
          'Authorization': `Zoho-oauthtoken ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      return response.data
    } catch (error) {
      console.error('Zoho API request failed:', error)
      throw error
    }
  }

  // CRM Methods
  async createContact(contactData: {
    email: string
    first_name: string
    last_name: string
    company?: string
    phone?: string
  }): Promise<ZohoContact> {
    const url = 'https://www.zohoapis.in/crm/v2/Contacts'
    
    // Map to correct Zoho CRM field names
    const zohoData = {
      Email: contactData.email,
      First_Name: contactData.first_name,
      Last_Name: contactData.last_name,
      ...(contactData.company && { Account_Name: contactData.company }),
      ...(contactData.phone && { Phone: contactData.phone })
    }
    
    console.log('📤 Sending to Zoho CRM:', zohoData)
    
    const response = await this.makeRequest('POST', url, {
      data: [zohoData]
    })
    
    console.log('📥 Zoho CRM response:', response)
    
    if (response.data && response.data[0] && response.data[0].code === 'SUCCESS') {
      return response.data[0].details
    } else {
      throw new Error(`Contact creation failed: ${JSON.stringify(response)}`)
    }
  }

  async getContact(contactId: string): Promise<ZohoContact> {
    const url = `https://www.zohoapis.in/crm/v2/Contacts/${contactId}`
    const response = await this.makeRequest('GET', url)
    
    return response.data[0]
  }

  async findContactByEmail(email: string): Promise<ZohoContact | null> {
    const url = `https://www.zohoapis.in/crm/v2/Contacts/search?criteria=Email:equals:${email}`
    
    try {
      console.log('🔍 Searching for contact with email:', email)
      const response = await this.makeRequest('GET', url)
      console.log('📥 Search response:', response)
      
      if (response.data && response.data.length > 0) {
        const contact = response.data[0]
        // Map Zoho fields back to our interface
        return {
          id: contact.id,
          email: contact.Email,
          first_name: contact.First_Name,
          last_name: contact.Last_Name,
          company: contact.Account_Name,
          phone: contact.Phone,
          created_time: contact.Created_Time,
          modified_time: contact.Modified_Time
        }
      }
      return null
    } catch (error) {
      console.error('Error searching for contact:', error)
      return null
    }
  }

  async getContacts(params: { per_page?: number } = {}): Promise<ZohoContact[]> {
    const url = 'https://www.zohoapis.in/crm/v2/Contacts'
    
    try {
      const response = await this.makeRequest('GET', url, null, params)
      return response.data || []
    } catch (error) {
      console.error('Error fetching contacts:', error)
      return []
    }
  }

  // Projects Methods
  async createProject(projectData: {
    name: string
    description: string
    owner_id: string
  }): Promise<ZohoProject> {
    const url = 'https://projectsapi.zoho.in/restapi/projects/'
    
    console.log('📝 Creating project in Zoho Projects:', projectData)
    
    const projectPayload = {
      name: projectData.name,
      description: projectData.description,
      owner_id: projectData.owner_id,
      status: 'active'
    }
    
    try {
      const response = await this.makeRequest('POST', url, projectPayload)
      console.log('✅ Project created successfully:', response)
      
      if (response.projects && response.projects.length > 0) {
        return response.projects[0]
      } else {
        throw new Error('No project data in response')
      }
    } catch (error) {
      console.error('❌ Project creation failed:', error)
      throw error
    }
  }

  async getProject(projectId: string): Promise<ZohoProject> {
    const url = `https://projectsapi.zoho.in/restapi/projects/${projectId}/`
    
    try {
      const response = await this.makeRequest('GET', url)
      return response.projects[0]
    } catch (error) {
      console.error('Error fetching project:', error)
      throw error
    }
  }

  async getProjectsByOwner(ownerId: string): Promise<ZohoProject[]> {
    // Note: Zoho Projects doesn't filter by owner_id in the URL
    // We'll get all projects and filter client-side for now
    const url = 'https://projectsapi.zoho.in/restapi/projects/'
    
    try {
      console.log('🔍 Fetching projects for owner:', ownerId)
      const response = await this.makeRequest('GET', url)
      console.log('📥 Projects response:', response)
      
      const allProjects = response.projects || []
      
      // Filter projects by owner_id (if the API returns this field)
      // For now, return all projects as we might need to implement custom filtering
      return allProjects
    } catch (error) {
      console.error('Error fetching projects:', error)
      return []
    }
  }

  async updateProjectStatus(projectId: string, status: string): Promise<ZohoProject> {
    const url = `https://projectsapi.zoho.in/restapi/projects/${projectId}/`
    
    try {
      const response = await this.makeRequest('POST', url, { status })
      return response.projects[0]
    } catch (error) {
      console.error('Error updating project status:', error)
      throw error
    }
  }

  // Books Methods
  async getInvoices(contactId: string): Promise<ZohoInvoice[]> {
    // Note: Zoho Books requires organization_id parameter
    const orgId = process.env.ZOHO_BOOKS_ORG_ID
    if (!orgId) {
      console.warn('⚠️  ZOHO_BOOKS_ORG_ID not configured, returning empty invoices')
      return []
    }
    
    const url = `https://books.zoho.in/api/v3/invoices?organization_id=${orgId}&customer_id=${contactId}`
    
    try {
      console.log('🔍 Fetching invoices for contact:', contactId)
      const response = await this.makeRequest('GET', url)
      console.log('📥 Invoices response:', response)
      
      return response.invoices || []
    } catch (error) {
      console.error('Error fetching invoices:', error)
      return []
    }
  }

  async getInvoice(invoiceId: string): Promise<ZohoInvoice> {
    const orgId = process.env.ZOHO_BOOKS_ORG_ID
    if (!orgId) {
      throw new Error('ZOHO_BOOKS_ORG_ID not configured')
    }
    
    const url = `https://books.zoho.in/api/v3/invoices/${invoiceId}?organization_id=${orgId}`
    
    try {
      const response = await this.makeRequest('GET', url)
      return response.invoice
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
    const orgId = process.env.ZOHO_BOOKS_ORG_ID
    if (!orgId) {
      throw new Error('ZOHO_BOOKS_ORG_ID not configured')
    }
    
    const url = `https://books.zoho.in/api/v3/invoices?organization_id=${orgId}`
    
    try {
      console.log('📝 Creating invoice in Zoho Books:', invoiceData)
      const response = await this.makeRequest('POST', url, invoiceData)
      console.log('✅ Invoice created successfully:', response)
      
      return response.invoice
    } catch (error) {
      console.error('❌ Invoice creation failed:', error)
      throw error
    }
  }

  // Get customers from Zoho Books (needed for invoice creation)
  async getBooksCustomers(): Promise<any[]> {
    const orgId = process.env.ZOHO_BOOKS_ORG_ID
    if (!orgId) {
      console.warn('⚠️  ZOHO_BOOKS_ORG_ID not configured')
      return []
    }
    
    const url = `https://books.zoho.in/api/v3/contacts?organization_id=${orgId}`
    
    try {
      const response = await this.makeRequest('GET', url)
      return response.contacts || []
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
  }): Promise<any> {
    const orgId = process.env.ZOHO_BOOKS_ORG_ID
    if (!orgId) {
      throw new Error('ZOHO_BOOKS_ORG_ID not configured')
    }
    
    const url = `https://books.zoho.in/api/v3/contacts?organization_id=${orgId}`
    
    try {
      console.log('📝 Creating Books customer:', customerData)
      const response = await this.makeRequest('POST', url, customerData)
      console.log('✅ Books customer created:', response)
      
      return response.contact
    } catch (error) {
      console.error('❌ Books customer creation failed:', error)
      throw error
    }
  }

  // WorkDrive Methods
  async uploadFile(folderId: string, file: Buffer, fileName: string): Promise<any> {
    const token = await this.getAccessToken()
    
    // Use the correct WorkDrive upload endpoint
    const url = `https://workdrive.zoho.in/api/v1/upload`
    
    try {
      console.log('📤 Uploading file to WorkDrive:', { fileName, folderId, size: file.length })
      
      // Create form data for file upload
      const FormData = require('form-data')
      const formData = new FormData()
      formData.append('filename', fileName)
      formData.append('parent_id', folderId)
      formData.append('content', file, fileName)
      
      const response = await axios.post(url, formData, {
        headers: {
          'Authorization': `Zoho-oauthtoken ${token}`,
          ...formData.getHeaders()
        }
      })
      
      console.log('✅ File uploaded successfully:', response.data)
      return response.data
    } catch (error) {
      console.error('❌ File upload failed:', error)
      throw error
    }
  }

  async createFolder(parentId: string, folderName: string): Promise<any> {
    const url = 'https://workdrive.zoho.in/api/v1/files'
    
    try {
      console.log('📁 Creating folder in WorkDrive:', { folderName, parentId })
      
      const response = await this.makeRequest('POST', url, {
        data: {
          attributes: {
            name: folderName,
            parent_id: parentId
          },
          type: 'files'
        }
      })
      
      console.log('✅ Folder created successfully:', response)
      return response.data
    } catch (error) {
      console.error('❌ Folder creation failed:', error)
      throw error
    }
  }

  async getFiles(folderId: string): Promise<any[]> {
    const url = `https://workdrive.zoho.in/api/v1/files/${folderId}/files`
    
    try {
      console.log('📂 Fetching files from folder:', folderId)
      const response = await this.makeRequest('GET', url)
      console.log('📥 Files response:', response)
      
      return response.data || []
    } catch (error) {
      console.error('Error fetching files:', error)
      return []
    }
  }

  // Get or create customer folder in WorkDrive
  async getCustomerFolder(customerEmail: string): Promise<string> {
    const rootFolderId = process.env.ZOHO_WORKDRIVE_ROOT_FOLDER
    if (!rootFolderId) {
      throw new Error('ZOHO_WORKDRIVE_ROOT_FOLDER not configured')
    }
    
    try {
      // Create a folder name based on customer email
      const folderName = `Customer_${customerEmail.replace('@', '_').replace('.', '_')}`
      
      // Try to find existing folder first
      const files = await this.getFiles(rootFolderId)
      const existingFolder = files.find(file => 
        file.attributes?.name === folderName && file.type === 'folder'
      )
      
      if (existingFolder) {
        console.log('📁 Found existing customer folder:', existingFolder.id)
        return existingFolder.id
      }
      
      // Create new folder if not found
      const newFolder = await this.createFolder(rootFolderId, folderName)
      console.log('📁 Created new customer folder:', newFolder.id)
      return newFolder.id
    } catch (error) {
      console.error('Error managing customer folder:', error)
      throw error
    }
  }
}

export const zohoService = new ZohoService()
export type { ZohoContact, ZohoProject, ZohoInvoice }