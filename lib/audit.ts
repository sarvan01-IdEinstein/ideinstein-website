// Comprehensive Audit Logging System
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface AuditEvent {
  userId?: string
  action: string
  entity: string
  entityId?: string
  meta?: any
  ipAddress?: string
  userAgent?: string
  sessionId?: string
}

export class AuditLogger {
  static async log(event: AuditEvent): Promise<void> {
    try {
      await prisma.auditLog.create({
        data: {
          userId: event.userId,
          action: event.action,
          entity: event.entity,
          entityId: event.entityId,
          meta: event.meta || {},
          ipAddress: event.ipAddress,
          userAgent: event.userAgent,
          sessionId: event.sessionId,
          timestamp: new Date()
        }
      })
      
      console.log(`📋 Audit: ${event.action} on ${event.entity}${event.entityId ? ` (${event.entityId})` : ''} by ${event.userId || 'anonymous'}`)
    } catch (error) {
      console.error('❌ Audit logging failed:', error)
      // Don't throw - audit logging shouldn't break the main flow
    }
  }
  
  static async getAuditTrail(
    userId?: string, 
    entity?: string, 
    limit = 100,
    offset = 0
  ): Promise<any[]> {
    try {
      return await prisma.auditLog.findMany({
        where: {
          ...(userId && { userId }),
          ...(entity && { entity })
        },
        orderBy: { timestamp: 'desc' },
        take: limit,
        skip: offset,
        include: {
          user: {
            select: { 
              email: true, 
              name: true,
              userRole: true 
            }
          }
        }
      })
    } catch (error) {
      console.error('❌ Error fetching audit trail:', error)
      return []
    }
  }
  
  static async getAuditStats(
    startDate?: Date,
    endDate?: Date
  ): Promise<{
    totalEvents: number
    eventsByAction: Record<string, number>
    eventsByEntity: Record<string, number>
    eventsByUser: Record<string, number>
  }> {
    try {
      const whereClause = {
        ...(startDate && endDate && {
          timestamp: {
            gte: startDate,
            lte: endDate
          }
        })
      }
      
      const [totalEvents, eventsByAction, eventsByEntity, eventsByUser] = await Promise.all([
        // Total events count
        prisma.auditLog.count({ where: whereClause }),
        
        // Events by action
        prisma.auditLog.groupBy({
          by: ['action'],
          where: whereClause,
          _count: { action: true }
        }),
        
        // Events by entity
        prisma.auditLog.groupBy({
          by: ['entity'],
          where: whereClause,
          _count: { entity: true }
        }),
        
        // Events by user
        prisma.auditLog.groupBy({
          by: ['userId'],
          where: whereClause,
          _count: { userId: true }
        })
      ])
      
      return {
        totalEvents,
        eventsByAction: eventsByAction.reduce((acc, item) => {
          acc[item.action] = item._count.action
          return acc
        }, {} as Record<string, number>),
        eventsByEntity: eventsByEntity.reduce((acc, item) => {
          acc[item.entity] = item._count.entity
          return acc
        }, {} as Record<string, number>),
        eventsByUser: eventsByUser.reduce((acc, item) => {
          if (item.userId) {
            acc[item.userId] = item._count.userId
          }
          return acc
        }, {} as Record<string, number>)
      }
    } catch (error) {
      console.error('❌ Error fetching audit stats:', error)
      return {
        totalEvents: 0,
        eventsByAction: {},
        eventsByEntity: {},
        eventsByUser: {}
      }
    }
  }
  
  // Helper methods for common audit events
  static async logLogin(userId: string, ipAddress?: string, userAgent?: string): Promise<void> {
    await this.log({
      userId,
      action: 'login',
      entity: 'user',
      entityId: userId,
      ipAddress,
      userAgent,
      meta: { timestamp: new Date().toISOString() }
    })
  }
  
  static async logLogout(userId: string, ipAddress?: string): Promise<void> {
    await this.log({
      userId,
      action: 'logout',
      entity: 'user',
      entityId: userId,
      ipAddress,
      meta: { timestamp: new Date().toISOString() }
    })
  }
  
  static async logProjectAccess(
    userId: string, 
    projectId: string, 
    action: 'view' | 'create' | 'update' | 'delete',
    ipAddress?: string
  ): Promise<void> {
    await this.log({
      userId,
      action: `project_${action}`,
      entity: 'project',
      entityId: projectId,
      ipAddress,
      meta: { projectId, action }
    })
  }
  
  static async logFileAccess(
    userId: string, 
    fileId: string, 
    action: 'upload' | 'download' | 'delete' | 'view',
    fileName?: string,
    ipAddress?: string
  ): Promise<void> {
    await this.log({
      userId,
      action: `file_${action}`,
      entity: 'file',
      entityId: fileId,
      ipAddress,
      meta: { fileId, fileName, action }
    })
  }
  
  static async logInvoiceAccess(
    userId: string, 
    invoiceId: string, 
    action: 'view' | 'pay' | 'download',
    ipAddress?: string
  ): Promise<void> {
    await this.log({
      userId,
      action: `invoice_${action}`,
      entity: 'invoice',
      entityId: invoiceId,
      ipAddress,
      meta: { invoiceId, action }
    })
  }
  
  static async logQuoteRequest(
    userId: string,
    quoteId: string,
    serviceType: string,
    ipAddress?: string
  ): Promise<void> {
    await this.log({
      userId,
      action: 'quote_request',
      entity: 'quote',
      entityId: quoteId,
      ipAddress,
      meta: { quoteId, serviceType }
    })
  }
  
  static async logDataExport(
    userId: string,
    dataType: string,
    recordCount: number,
    ipAddress?: string
  ): Promise<void> {
    await this.log({
      userId,
      action: 'data_export',
      entity: 'system',
      ipAddress,
      meta: { dataType, recordCount, exportTime: new Date().toISOString() }
    })
  }
  
  static async logSecurityEvent(
    event: 'failed_login' | 'permission_denied' | 'suspicious_activity',
    userId?: string,
    ipAddress?: string,
    details?: any
  ): Promise<void> {
    await this.log({
      userId,
      action: `security_${event}`,
      entity: 'security',
      ipAddress,
      meta: { event, details, timestamp: new Date().toISOString() }
    })
  }
}

// Middleware to automatically log API requests
export function createAuditMiddleware(action: string, entity: string) {
  return async (userId: string, entityId?: string, meta?: any, ipAddress?: string) => {
    await AuditLogger.log({
      userId,
      action,
      entity,
      entityId,
      meta,
      ipAddress
    })
  }
}

export default AuditLogger