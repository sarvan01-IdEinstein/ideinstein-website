import axios from 'axios'

interface ZohoTokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
}

export abstract class ZohoBaseService {
  protected abstract clientId: string
  protected abstract clientSecret: string
  protected abstract refreshToken: string
  protected abstract baseUrl: string
  
  private accessToken: string | null = null
  private tokenExpiry: number = 0

  protected async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    try {
      console.log(`🔄 Getting fresh access token for ${this.constructor.name}...`)
      
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

      console.log(`✅ Access token obtained for ${this.constructor.name}`)
      return this.accessToken
    } catch (error) {
      console.error(`❌ Error getting access token for ${this.constructor.name}:`, error)
      throw new Error(`Failed to authenticate with Zoho ${this.constructor.name}`)
    }
  }

  protected async makeRequest(method: string, url: string, data?: any, params?: any) {
    const token = await this.getAccessToken()
    
    try {
      console.log(`📤 ${this.constructor.name} API Request: ${method} ${url}`)
      
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
      
      console.log(`📥 ${this.constructor.name} API Response: ${response.status}`)
      return response.data
    } catch (error) {
      console.error(`❌ ${this.constructor.name} API request failed:`, error)
      throw error
    }
  }

  // Health check method
  async testConnection(): Promise<boolean> {
    try {
      await this.getAccessToken()
      return true
    } catch (error) {
      return false
    }
  }
}