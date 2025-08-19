// Intelligent Caching Service with PostgreSQL
import { PrismaClient } from '@prisma/client'

// Lazy initialization to prevent build-time issues
let prisma: PrismaClient | null = null

const getPrisma = () => {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  return prisma
}

const getZohoServices = async () => {
  const { zohoProjects, zohoBooks, zohoCRM } = await import('@/lib/zoho/index')
  return { zohoProjects, zohoBooks, zohoCRM }
}

export class CacheService {
  // Cache freshness threshold (5 minutes)
  private static CACHE_THRESHOLD = 5 * 60 * 1000

  // Projects Caching
  static async getProjects(accountId: string, forceRefresh = false): Promise<any[]> {
    try {
      console.log(`🔍 Getting projects for account: ${accountId}`)
      
      if (!forceRefresh) {
        // Try database cache first
        const cachedProjects = await getPrisma().projectsCache.findMany({
          where: { accountId },
          orderBy: { updatedAt: 'desc' }
        })
        
        if (cachedProjects.length > 0) {
          const latestUpdate = cachedProjects[0].lastSynced
          const threshold = new Date(Date.now() - this.CACHE_THRESHOLD)
          
          if (latestUpdate > threshold) {
            console.log(`✅ Using cached projects (${cachedProjects.length} found)`)
            return cachedProjects.map(this.formatCachedProject)
          }
        }
      }
      
      // Fetch fresh data from Zoho Projects
      console.log('🔄 Fetching fresh projects from Zoho...')
      const { zohoProjects } = await getZohoServices()
      const freshProjects = await zohoProjects.getProjectsByClient(accountId)
      
      if (freshProjects && freshProjects.length > 0) {
        // Update cache
        await this.updateProjectsCache(accountId, freshProjects)
        console.log(`✅ Updated projects cache with ${freshProjects.length} projects`)
      }
      
      return freshProjects || []
    } catch (error) {
      console.error('❌ Error in getProjects:', error)
      
      // Fallback to cache even if stale
      try {
        const fallbackProjects = await getPrisma().projectsCache.findMany({
          where: { accountId },
          orderBy: { updatedAt: 'desc' }
        })
        
        if (fallbackProjects.length > 0) {
          console.log('⚠️ Using stale cache as fallback')
          return fallbackProjects.map(this.formatCachedProject)
        }
      } catch (fallbackError) {
        console.error('❌ Fallback cache also failed:', fallbackError)
      }
      
      return []
    }
  }
  
  static async updateProjectsCache(accountId: string, projects: any[]): Promise<void> {
    try {
      for (const project of projects) {
        await getPrisma().projectsCache.upsert({
          where: { zohoProjectId: project.id },
          update: {
            name: project.name || 'Unnamed Project',
            status: project.status || 'unknown',
            progressPercentage: this.parseProgress(project.progress),
            milestoneJson: project.milestones || {},
            timelineJson: project.timeline || {},
            budgetInfo: project.budget || {},
            teamMembers: project.team || {},
            lastSynced: new Date()
          },
          create: {
            zohoProjectId: project.id,
            accountId: accountId,
            name: project.name || 'Unnamed Project',
            status: project.status || 'unknown',
            progressPercentage: this.parseProgress(project.progress),
            milestoneJson: project.milestones || {},
            timelineJson: project.timeline || {},
            budgetInfo: project.budget || {},
            teamMembers: project.team || {},
            lastSynced: new Date()
          }
        })
      }
    } catch (error) {
      console.error('❌ Error updating projects cache:', error)
    }
  }
  
  // Invoices Caching
  static async getInvoices(accountId: string, forceRefresh = false): Promise<any[]> {
    try {
      console.log(`🔍 Getting invoices for account: ${accountId}`)
      
      if (!forceRefresh) {
        // Try database cache first
        const cachedInvoices = await getPrisma().invoicesCache.findMany({
          where: { accountId },
          orderBy: { updatedAt: 'desc' }
        })
        
        if (cachedInvoices.length > 0) {
          const latestUpdate = cachedInvoices[0].lastSynced
          const threshold = new Date(Date.now() - this.CACHE_THRESHOLD)
          
          if (latestUpdate > threshold) {
            console.log(`✅ Using cached invoices (${cachedInvoices.length} found)`)
            return cachedInvoices.map(this.formatCachedInvoice)
          }
        }
      }
      
      // Fetch fresh data from Zoho Books
      console.log('🔄 Fetching fresh invoices from Zoho...')
      const { zohoBooks } = await getZohoServices()
      const freshInvoices = await zohoBooks.getInvoices(accountId)
      
      if (freshInvoices && freshInvoices.length > 0) {
        // Update cache
        await this.updateInvoicesCache(accountId, freshInvoices)
        console.log(`✅ Updated invoices cache with ${freshInvoices.length} invoices`)
      }
      
      return freshInvoices || []
    } catch (error) {
      console.error('❌ Error in getInvoices:', error)
      
      // Fallback to cache even if stale
      try {
        const fallbackInvoices = await getPrisma().invoicesCache.findMany({
          where: { accountId },
          orderBy: { updatedAt: 'desc' }
        })
        
        if (fallbackInvoices.length > 0) {
          console.log('⚠️ Using stale invoice cache as fallback')
          return fallbackInvoices.map(this.formatCachedInvoice)
        }
      } catch (fallbackError) {
        console.error('❌ Fallback invoice cache also failed:', fallbackError)
      }
      
      return []
    }
  }
  
  static async updateInvoicesCache(accountId: string, invoices: any[]): Promise<void> {
    try {
      for (const invoice of invoices) {
        await getPrisma().invoicesCache.upsert({
          where: { zohoInvoiceId: invoice.invoice_id },
          update: {
            invoiceNumber: invoice.invoice_number || 'Unknown',
            status: invoice.status || 'unknown',
            totalAmount: parseFloat(invoice.total) || 0,
            amountDue: parseFloat(invoice.balance) || 0,
            dueDate: invoice.due_date ? new Date(invoice.due_date) : null,
            paymentUrl: invoice.payment_url || null,
            pdfUrl: invoice.pdf_url || null,
            lastSynced: new Date()
          },
          create: {
            zohoInvoiceId: invoice.invoice_id,
            accountId: accountId,
            invoiceNumber: invoice.invoice_number || 'Unknown',
            status: invoice.status || 'unknown',
            totalAmount: parseFloat(invoice.total) || 0,
            amountDue: parseFloat(invoice.balance) || 0,
            dueDate: invoice.due_date ? new Date(invoice.due_date) : null,
            paymentUrl: invoice.payment_url || null,
            pdfUrl: invoice.pdf_url || null,
            lastSynced: new Date()
          }
        })
      }
    } catch (error) {
      console.error('❌ Error updating invoices cache:', error)
    }
  }
  
  // Cache invalidation
  static async invalidateCache(accountId: string, entity: 'projects' | 'invoices' | 'all'): Promise<void> {
    try {
      console.log(`🗑️ Invalidating ${entity} cache for account: ${accountId}`)
      
      if (entity === 'projects' || entity === 'all') {
        await getPrisma().projectsCache.deleteMany({
          where: { accountId }
        })
      }
      
      if (entity === 'invoices' || entity === 'all') {
        await getPrisma().invoicesCache.deleteMany({
          where: { accountId }
        })
      }
      
      console.log(`✅ Cache invalidated for ${entity}`)
    } catch (error) {
      console.error('❌ Error invalidating cache:', error)
    }
  }
  
  // Cache statistics
  static async getCacheStats(): Promise<{
    projects: { total: number; fresh: number; stale: number }
    invoices: { total: number; fresh: number; stale: number }
  }> {
    try {
      const threshold = new Date(Date.now() - this.CACHE_THRESHOLD)
      
      const [
        totalProjects,
        freshProjects,
        totalInvoices,
        freshInvoices
      ] = await Promise.all([
        getPrisma().projectsCache.count(),
        getPrisma().projectsCache.count({
          where: { lastSynced: { gte: threshold } }
        }),
        getPrisma().invoicesCache.count(),
        getPrisma().invoicesCache.count({
          where: { lastSynced: { gte: threshold } }
        })
      ])
      
      return {
        projects: {
          total: totalProjects,
          fresh: freshProjects,
          stale: totalProjects - freshProjects
        },
        invoices: {
          total: totalInvoices,
          fresh: freshInvoices,
          stale: totalInvoices - freshInvoices
        }
      }
    } catch (error) {
      console.error('❌ Error getting cache stats:', error)
      return {
        projects: { total: 0, fresh: 0, stale: 0 },
        invoices: { total: 0, fresh: 0, stale: 0 }
      }
    }
  }
  
  // Helper methods
  private static formatCachedProject(cached: any): any {
    return {
      id: cached.zohoProjectId,
      name: cached.name,
      status: cached.status,
      progress: cached.progressPercentage,
      milestones: cached.milestoneJson,
      timeline: cached.timelineJson,
      budget: cached.budgetInfo,
      team: cached.teamMembers,
      created_date: cached.createdAt.toISOString(),
      last_synced: cached.lastSynced.toISOString()
    }
  }
  
  private static formatCachedInvoice(cached: any): any {
    return {
      invoice_id: cached.zohoInvoiceId,
      invoice_number: cached.invoiceNumber,
      status: cached.status,
      total: cached.totalAmount.toNumber(),
      balance: cached.amountDue.toNumber(),
      due_date: cached.dueDate?.toISOString(),
      payment_url: cached.paymentUrl,
      pdf_url: cached.pdfUrl,
      created_time: cached.createdAt.toISOString(),
      last_synced: cached.lastSynced.toISOString()
    }
  }
  
  private static parseProgress(progress: any): number {
    if (typeof progress === 'number') return Math.max(0, Math.min(100, progress))
    if (typeof progress === 'string') {
      const parsed = parseFloat(progress)
      return isNaN(parsed) ? 0 : Math.max(0, Math.min(100, parsed))
    }
    return 0
  }
}

export default CacheService