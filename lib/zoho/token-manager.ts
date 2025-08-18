// Server-Side Zoho Token Management
// Handles automatic token refresh with proper authentication

interface ZohoTokens {
  access_token: string
  refresh_token: string
  expires_at: number
  scope: string
}

interface ZohoTokenResponse {
  access_token: string
  refresh_token?: string
  expires_in: number
  token_type: string
  scope: string
}

export class ZohoTokenManager {
  private static instance: ZohoTokenManager
  private tokens: Map<string, ZohoTokens> = new Map()
  private refreshPromises: Map<string, Promise<string>> = new Map()

  private constructor() {}

  static getInstance(): ZohoTokenManager {
    if (!ZohoTokenManager.instance) {
      ZohoTokenManager.instance = new ZohoTokenManager()
    }
    return ZohoTokenManager.instance
  }

  /**
   * Get valid access token for a service
   * Automatically refreshes if expired
   */
  async getAccessToken(service: 'crm' | 'projects' | 'books' | 'workdrive'): Promise<string> {
    const cacheKey = `zoho_${service}`
    
    // Check if we have a valid token
    const cached = this.tokens.get(cacheKey)
    if (cached && this.isTokenValid(cached)) {
      return cached.access_token
    }

    // Check if refresh is already in progress
    const existingRefresh = this.refreshPromises.get(cacheKey)
    if (existingRefresh) {
      return existingRefresh
    }

    // Start token refresh
    const refreshPromise = this.refreshToken(service)
    this.refreshPromises.set(cacheKey, refreshPromise)

    try {
      const accessToken = await refreshPromise
      return accessToken
    } finally {
      this.refreshPromises.delete(cacheKey)
    }
  }

  /**
   * Refresh access token using refresh token
   */
  private async refreshToken(service: string): Promise<string> {
    try {
      console.log(`🔄 Refreshing Zoho ${service} token...`)

      const clientId = this.getClientId(service)
      const clientSecret = this.getClientSecret(service)
      const refreshToken = this.getRefreshToken(service)
      const domain = process.env.ZOHO_DOMAIN || 'https://accounts.zoho.in'

      if (!clientId || !clientSecret || !refreshToken) {
        throw new Error(`Missing Zoho ${service} credentials`)
      }

      const response = await fetch(`${domain}/oauth/v2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: refreshToken,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`❌ Token refresh failed for ${service}:`, errorText)
        throw new Error(`Token refresh failed: ${response.status} ${errorText}`)
      }

      const tokenData: ZohoTokenResponse = await response.json()

      // Cache the new token
      const tokens: ZohoTokens = {
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token || refreshToken, // Keep old refresh token if new one not provided
        expires_at: Date.now() + (tokenData.expires_in * 1000) - 60000, // Subtract 1 minute for safety
        scope: tokenData.scope,
      }

      this.tokens.set(`zoho_${service}`, tokens)

      console.log(`✅ Zoho ${service} token refreshed successfully`)
      return tokenData.access_token

    } catch (error) {
      console.error(`❌ Error refreshing Zoho ${service} token:`, error)
      throw error
    }
  }

  /**
   * Check if token is still valid (not expired)
   */
  private isTokenValid(tokens: ZohoTokens): boolean {
    return Date.now() < tokens.expires_at
  }

  /**
   * Get client ID for service
   */
  private getClientId(service: string): string | undefined {
    switch (service) {
      case 'crm':
        return process.env.ZOHO_CLIENT_ID
      case 'projects':
        return process.env.ZOHO_PROJECTS_CLIENT_ID || process.env.ZOHO_CLIENT_ID
      case 'books':
        return process.env.ZOHO_BOOKS_CLIENT_ID || process.env.ZOHO_CLIENT_ID
      case 'workdrive':
        return process.env.ZOHO_WORKDRIVE_CLIENT_ID || process.env.ZOHO_CLIENT_ID
      default:
        return process.env.ZOHO_CLIENT_ID
    }
  }

  /**
   * Get client secret for service
   */
  private getClientSecret(service: string): string | undefined {
    switch (service) {
      case 'crm':
        return process.env.ZOHO_CLIENT_SECRET
      case 'projects':
        return process.env.ZOHO_PROJECTS_CLIENT_SECRET || process.env.ZOHO_CLIENT_SECRET
      case 'books':
        return process.env.ZOHO_BOOKS_CLIENT_SECRET || process.env.ZOHO_CLIENT_SECRET
      case 'workdrive':
        return process.env.ZOHO_WORKDRIVE_CLIENT_SECRET || process.env.ZOHO_CLIENT_SECRET
      default:
        return process.env.ZOHO_CLIENT_SECRET
    }
  }

  /**
   * Get refresh token for service
   */
  private getRefreshToken(service: string): string | undefined {
    switch (service) {
      case 'crm':
        return process.env.ZOHO_REFRESH_TOKEN
      case 'projects':
        return process.env.ZOHO_PROJECTS_REFRESH_TOKEN || process.env.ZOHO_REFRESH_TOKEN
      case 'books':
        return process.env.ZOHO_BOOKS_REFRESH_TOKEN || process.env.ZOHO_REFRESH_TOKEN
      case 'workdrive':
        return process.env.ZOHO_WORKDRIVE_REFRESH_TOKEN || process.env.ZOHO_REFRESH_TOKEN
      default:
        return process.env.ZOHO_REFRESH_TOKEN
    }
  }

  /**
   * Clear cached tokens (for testing or logout)
   */
  clearTokens(service?: string): void {
    if (service) {
      this.tokens.delete(`zoho_${service}`)
    } else {
      this.tokens.clear()
    }
  }

  /**
   * Get token info for debugging
   */
  getTokenInfo(service: string): { valid: boolean; expiresAt?: Date; scope?: string } {
    const cached = this.tokens.get(`zoho_${service}`)
    if (!cached) {
      return { valid: false }
    }

    return {
      valid: this.isTokenValid(cached),
      expiresAt: new Date(cached.expires_at),
      scope: cached.scope,
    }
  }
}

// Export singleton instance
export const zohoTokenManager = ZohoTokenManager.getInstance()

// Helper function for API calls
export async function makeAuthenticatedZohoRequest(
  service: 'crm' | 'projects' | 'books' | 'workdrive',
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const accessToken = await zohoTokenManager.getAccessToken(service)
  
  const headers = {
    'Authorization': `Zoho-oauthtoken ${accessToken}`,
    'Content-Type': 'application/json',
    ...options.headers,
  }

  return fetch(url, {
    ...options,
    headers,
  })
}