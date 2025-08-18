// Zoho Services - Modular Integration
import { ZohoCRMService } from './crm'
import { ZohoProjectsService } from './projects'
import { ZohoBooksService } from './books'
import { ZohoWorkDriveService } from './workdrive'

// Export individual services
export const zohoCRM = new ZohoCRMService()
export const zohoProjects = new ZohoProjectsService()
export const zohoBooks = new ZohoBooksService()
export const zohoWorkDrive = new ZohoWorkDriveService()

// Legacy export for backward compatibility
export const zohoService = zohoCRM

// Export types
export type { ZohoContact } from './crm'
export type { ZohoProject } from './projects'
export type { ZohoInvoice, ZohoBooksCustomer } from './books'
export type { ZohoFile } from './workdrive'

// Unified service class for convenience
export class ZohoIntegration {
  public crm = zohoCRM
  public projects = zohoProjects
  public books = zohoBooks
  public workdrive = zohoWorkDrive

  // Health check for all services
  async checkAllServices(): Promise<{
    crm: boolean
    projects: boolean
    books: boolean
    workdrive: boolean
  }> {
    console.log('🔍 Checking all Zoho services...')
    
    const results = {
      crm: await this.crm.testConnection(),
      projects: await this.projects.isConfigured(),
      books: await this.books.isConfigured(),
      workdrive: await this.workdrive.isConfigured()
    }

    console.log('📊 Service Status:', results)
    return results
  }

  // Get service configuration status
  getConfigurationStatus(): {
    crm: boolean
    projects: boolean
    books: boolean
    workdrive: boolean
  } {
    return {
      crm: !!(process.env.ZOHO_CLIENT_ID && process.env.ZOHO_CLIENT_SECRET && process.env.ZOHO_REFRESH_TOKEN),
      projects: !!(process.env.ZOHO_PROJECTS_CLIENT_ID && process.env.ZOHO_PROJECTS_CLIENT_SECRET && process.env.ZOHO_PROJECTS_REFRESH_TOKEN),
      books: !!(process.env.ZOHO_BOOKS_CLIENT_ID && process.env.ZOHO_BOOKS_CLIENT_SECRET && process.env.ZOHO_BOOKS_REFRESH_TOKEN && process.env.ZOHO_BOOKS_ORG_ID),
      workdrive: !!(process.env.ZOHO_WORKDRIVE_CLIENT_ID && process.env.ZOHO_WORKDRIVE_CLIENT_SECRET && process.env.ZOHO_WORKDRIVE_REFRESH_TOKEN && process.env.ZOHO_WORKDRIVE_ROOT_FOLDER)
    }
  }
}

// Export unified instance
export const zoho = new ZohoIntegration()