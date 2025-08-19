import { ZohoBaseService } from './base'
import axios from 'axios'

export interface ZohoFile {
  id: string
  name: string
  type: 'file' | 'folder'
  size?: number
  created_time: string
  modified_time: string
  parent_id: string
}

export class ZohoWorkDriveService extends ZohoBaseService {
  protected get clientId(): string {
    return process.env.ZOHO_WORKDRIVE_CLIENT_ID!
  }
  
  protected get clientSecret(): string {
    return process.env.ZOHO_WORKDRIVE_CLIENT_SECRET!
  }
  
  protected get refreshToken(): string {
    return process.env.ZOHO_WORKDRIVE_REFRESH_TOKEN!
  }
  
  protected get baseUrl(): string {
    return process.env.ZOHO_DOMAIN || 'https://accounts.zoho.in'
  }
  
  private get rootFolderId(): string | undefined {
    return process.env.ZOHO_WORKDRIVE_ROOT_FOLDER
  }

  constructor() {
    super()
    
    // Check if WorkDrive credentials are configured
    if (!this.clientId || !this.clientSecret || !this.refreshToken || !this.rootFolderId) {
      console.warn('⚠️  Zoho WorkDrive credentials not configured. File functionality will be limited.')
    }
  }

  async uploadFile(folderId: string, file: Buffer, fileName: string): Promise<ZohoFile> {
    if (!this.clientId) {
      throw new Error('Zoho WorkDrive not configured')
    }

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
      
      if (response.data && response.data.data) {
        return this.mapFileResponse(response.data.data)
      } else {
        throw new Error('Invalid upload response')
      }
    } catch (error) {
      console.error('❌ File upload failed:', error)
      throw error
    }
  }

  async createFolder(parentId: string, folderName: string): Promise<ZohoFile> {
    if (!this.clientId) {
      throw new Error('Zoho WorkDrive not configured')
    }

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
      
      if (response.data) {
        return this.mapFileResponse(response.data)
      } else {
        throw new Error('Invalid folder creation response')
      }
    } catch (error) {
      console.error('❌ Folder creation failed:', error)
      throw error
    }
  }

  async getFiles(folderId: string): Promise<ZohoFile[]> {
    if (!this.clientId) {
      console.warn('⚠️  Zoho WorkDrive not configured, returning empty files list')
      return []
    }

    const url = `https://workdrive.zoho.in/api/v1/files/${folderId}/files`
    
    try {
      console.log('📂 Fetching files from folder:', folderId)
      const response = await this.makeRequest('GET', url)
      console.log('📥 Files response:', response)
      
      const files = response.data || []
      return files.map((file: any) => this.mapFileResponse(file))
    } catch (error) {
      console.error('Error fetching files:', error)
      return []
    }
  }

  // Get or create customer folder in WorkDrive
  async getCustomerFolder(customerEmail: string): Promise<string> {
    if (!this.rootFolderId) {
      throw new Error('ZOHO_WORKDRIVE_ROOT_FOLDER not configured')
    }
    
    try {
      // Create a folder name based on customer email
      const folderName = `Customer_${customerEmail.replace('@', '_').replace(/\./g, '_')}`
      
      // Try to find existing folder first
      const files = await this.getFiles(this.rootFolderId)
      const existingFolder = files.find(file => 
        file.name === folderName && file.type === 'folder'
      )
      
      if (existingFolder) {
        console.log('📁 Found existing customer folder:', existingFolder.id)
        return existingFolder.id
      }
      
      // Create new folder if not found
      const newFolder = await this.createFolder(this.rootFolderId, folderName)
      console.log('📁 Created new customer folder:', newFolder.id)
      return newFolder.id
    } catch (error) {
      console.error('Error managing customer folder:', error)
      throw error
    }
  }

  // Get project folder within customer folder
  async getProjectFolder(customerEmail: string, projectName: string): Promise<string> {
    try {
      const customerFolderId = await this.getCustomerFolder(customerEmail)
      
      // Create a safe project folder name
      const projectFolderName = `Project_${projectName.replace(/[^a-zA-Z0-9]/g, '_')}`
      
      // Try to find existing project folder
      const files = await this.getFiles(customerFolderId)
      const existingFolder = files.find(file => 
        file.name === projectFolderName && file.type === 'folder'
      )
      
      if (existingFolder) {
        console.log('📁 Found existing project folder:', existingFolder.id)
        return existingFolder.id
      }
      
      // Create new project folder
      const newFolder = await this.createFolder(customerFolderId, projectFolderName)
      console.log('📁 Created new project folder:', newFolder.id)
      return newFolder.id
    } catch (error) {
      console.error('Error managing project folder:', error)
      throw error
    }
  }

  // Get all files for a customer (including subfolders)
  async getAllCustomerFiles(customerFolderId: string): Promise<ZohoFile[]> {
    if (!this.clientId) {
      return []
    }

    try {
      const allFiles: ZohoFile[] = []
      
      // Get files in main customer folder
      const mainFiles = await this.getFiles(customerFolderId)
      
      for (const file of mainFiles) {
        if (file.type === 'file') {
          allFiles.push(file)
        } else if (file.type === 'folder') {
          // Recursively get files from subfolders (project folders)
          const subFiles = await this.getFiles(file.id)
          allFiles.push(...subFiles.filter(f => f.type === 'file'))
        }
      }
      
      return allFiles
    } catch (error) {
      console.error('Error fetching all customer files:', error)
      return []
    }
  }

  // Helper method to map file response
  private mapFileResponse(file: any): ZohoFile {
    return {
      id: file.id,
      name: file.attributes?.name || file.name,
      type: file.type === 'folder' ? 'folder' : 'file',
      size: file.attributes?.size || file.size,
      created_time: file.attributes?.created_time || file.created_time,
      modified_time: file.attributes?.modified_time || file.modified_time,
      parent_id: file.attributes?.parent_id || file.parent_id
    }
  }

  // Check if WorkDrive is configured and working
  async isConfigured(): Promise<boolean> {
    if (!this.clientId || !this.clientSecret || !this.refreshToken || !this.rootFolderId) {
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