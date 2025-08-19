import { ZohoBaseService } from './base'

export interface ZohoProject {
  id: string
  name: string
  description: string
  status: string
  owner_id: string
  created_date: string
  modified_date: string
  client_id?: string
  start_date?: string
  end_date?: string
}

export class ZohoProjectsService extends ZohoBaseService {
  protected get clientId(): string {
    return process.env.ZOHO_PROJECTS_CLIENT_ID!
  }
  
  protected get clientSecret(): string {
    return process.env.ZOHO_PROJECTS_CLIENT_SECRET!
  }
  
  protected get refreshToken(): string {
    return process.env.ZOHO_PROJECTS_REFRESH_TOKEN!
  }
  
  protected get baseUrl(): string {
    return process.env.ZOHO_DOMAIN || 'https://accounts.zoho.in'
  }

  constructor() {
    super()
    
    // Check if Projects credentials are configured
    if (!this.clientId || !this.clientSecret || !this.refreshToken) {
      console.warn('⚠️  Zoho Projects credentials not configured. Projects functionality will be limited.')
    }
  }

  async createProject(projectData: {
    name: string
    description: string
    owner_id?: string
    client_id?: string
  }): Promise<ZohoProject> {
    if (!this.clientId) {
      throw new Error('Zoho Projects not configured. Please set ZOHO_PROJECTS_* environment variables.')
    }

    const url = 'https://projectsapi.zoho.in/restapi/projects/'
    
    console.log('📝 Creating project in Zoho Projects:', projectData)
    
    const projectPayload = {
      name: projectData.name,
      description: projectData.description,
      ...(projectData.owner_id && { owner_id: projectData.owner_id }),
      ...(projectData.client_id && { client_id: projectData.client_id }),
      status: 'active'
    }
    
    try {
      const response = await this.makeRequest('POST', url, projectPayload)
      console.log('✅ Project created successfully:', response)
      
      if (response.projects && response.projects.length > 0) {
        return this.mapProjectResponse(response.projects[0])
      } else {
        throw new Error('No project data in response')
      }
    } catch (error) {
      console.error('❌ Project creation failed:', error)
      throw error
    }
  }

  async getProject(projectId: string): Promise<ZohoProject> {
    if (!this.clientId) {
      throw new Error('Zoho Projects not configured')
    }

    const url = `https://projectsapi.zoho.in/restapi/projects/${projectId}/`
    
    try {
      const response = await this.makeRequest('GET', url)
      return this.mapProjectResponse(response.projects[0])
    } catch (error) {
      console.error('Error fetching project:', error)
      throw error
    }
  }

  async getProjects(): Promise<ZohoProject[]> {
    if (!this.clientId) {
      console.warn('⚠️  Zoho Projects not configured, returning empty projects list')
      return []
    }

    const url = 'https://projectsapi.zoho.in/restapi/projects/'
    
    try {
      console.log('🔍 Fetching projects from Zoho Projects')
      const response = await this.makeRequest('GET', url)
      console.log('📥 Projects response:', response)
      
      const allProjects = response.projects || []
      
      return allProjects.map((project: any) => this.mapProjectResponse(project))
    } catch (error) {
      console.error('Error fetching projects:', error)
      return []
    }
  }

  async getProjectsByClient(clientId: string): Promise<ZohoProject[]> {
    if (!this.clientId) {
      return []
    }

    try {
      const allProjects = await this.getProjects()
      // Filter projects by client_id
      return allProjects.filter(project => project.client_id === clientId)
    } catch (error) {
      console.error('Error fetching projects by client:', error)
      return []
    }
  }

  async updateProjectStatus(projectId: string, status: string): Promise<ZohoProject> {
    if (!this.clientId) {
      throw new Error('Zoho Projects not configured')
    }

    const url = `https://projectsapi.zoho.in/restapi/projects/${projectId}/`
    
    try {
      const response = await this.makeRequest('POST', url, { status })
      return this.mapProjectResponse(response.projects[0])
    } catch (error) {
      console.error('Error updating project status:', error)
      throw error
    }
  }

  // Helper method to map Zoho Projects response to our interface
  private mapProjectResponse(project: any): ZohoProject {
    return {
      id: project.id || project.id_string,
      name: project.name,
      description: project.description || '',
      status: project.status,
      owner_id: project.owner_id || project.owner?.id,
      created_date: project.created_date || project.created_time,
      modified_date: project.modified_date || project.last_modified_time,
      client_id: project.client_id || project.client?.id,
      start_date: project.start_date,
      end_date: project.end_date
    }
  }

  // Check if Projects is configured and working
  async isConfigured(): Promise<boolean> {
    if (!this.clientId || !this.clientSecret || !this.refreshToken) {
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