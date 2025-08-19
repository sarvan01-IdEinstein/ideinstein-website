#!/usr/bin/env node

/**
 * Diagnostic script to troubleshoot Zoho integration issues
 * This will help identify where the problem is occurring
 */

require('dotenv').config({ path: '.env.local' });

const axios = require('axios');

class ZohoDiagnostic {
  constructor() {
    this.baseUrl = process.env.ZOHO_DOMAIN || 'https://accounts.zoho.in';
    this.clientId = process.env.ZOHO_CLIENT_ID;
    this.clientSecret = process.env.ZOHO_CLIENT_SECRET;
    this.refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    this.accessToken = null;
    this.tokenExpiry = 0;
  }

  async runDiagnostics() {
    console.log('🔍 Running Zoho Integration Diagnostics\n');

    // Step 1: Check environment variables
    console.log('1️⃣ Checking Environment Variables:');
    console.log(`   ZOHO_DOMAIN: ${this.baseUrl}`);
    console.log(`   ZOHO_CLIENT_ID: ${this.clientId ? '✅ Set' : '❌ Missing'}`);
    console.log(`   ZOHO_CLIENT_SECRET: ${this.clientSecret ? '✅ Set' : '❌ Missing'}`);
    console.log(`   ZOHO_REFRESH_TOKEN: ${this.refreshToken ? '✅ Set' : '❌ Missing'}`);

    if (!this.clientId || !this.clientSecret || !this.refreshToken) {
      console.log('\n❌ Missing required environment variables. Please check your .env.local file.');
      return;
    }

    // Step 2: Test token refresh
    console.log('\n2️⃣ Testing Token Refresh:');
    try {
      const token = await this.getAccessToken();
      console.log('   ✅ Access token obtained successfully');
      console.log(`   Token preview: ${token.substring(0, 20)}...`);
    } catch (error) {
      console.log('   ❌ Failed to get access token');
      console.log(`   Error: ${error.message}`);
      if (error.response) {
        console.log(`   Response: ${JSON.stringify(error.response.data, null, 2)}`);
      }
      return;
    }

    // Step 3: Test API connectivity
    console.log('\n3️⃣ Testing API Connectivity:');
    try {
      const contacts = await this.getContacts();
      console.log(`   ✅ Successfully connected to Zoho CRM`);
      console.log(`   Found ${contacts.length} existing contacts`);
      
      if (contacts.length > 0) {
        console.log('   Recent contacts:');
        contacts.slice(0, 3).forEach((contact, index) => {
          console.log(`     ${index + 1}. ${contact.First_Name} ${contact.Last_Name} (${contact.Email})`);
        });
      }
    } catch (error) {
      console.log('   ❌ Failed to connect to Zoho CRM API');
      console.log(`   Error: ${error.message}`);
      if (error.response) {
        console.log(`   Status: ${error.response.status}`);
        console.log(`   Response: ${JSON.stringify(error.response.data, null, 2)}`);
      }
      return;
    }

    // Step 4: Test contact creation
    console.log('\n4️⃣ Testing Contact Creation:');
    const testContact = {
      First_Name: 'Test',
      Last_Name: 'Diagnostic',
      Email: `test.diagnostic.${Date.now()}@example.com`,
      Account_Name: 'Diagnostic Test Company'
    };

    try {
      const result = await this.createContact(testContact);
      if (result) {
        console.log('   ✅ Contact creation successful');
        console.log(`   Created contact ID: ${result.id}`);
        
        // Try to find the created contact
        console.log('\n5️⃣ Testing Contact Search:');
        const foundContact = await this.findContactByEmail(testContact.Email);
        if (foundContact) {
          console.log('   ✅ Contact search successful');
          console.log(`   Found contact: ${foundContact.First_Name} ${foundContact.Last_Name}`);
        } else {
          console.log('   ⚠️  Contact created but search failed');
        }
      }
    } catch (error) {
      console.log('   ❌ Contact creation failed');
      console.log(`   Error: ${error.message}`);
      if (error.response) {
        console.log(`   Status: ${error.response.status}`);
        console.log(`   Response: ${JSON.stringify(error.response.data, null, 2)}`);
      }
    }

    console.log('\n📊 Diagnostic Summary:');
    console.log('   If all tests passed, the integration should be working.');
    console.log('   If any tests failed, check the error messages above.');
    console.log('\n💡 Next Steps:');
    console.log('   1. Fix any failed tests');
    console.log('   2. Test the signup form again');
    console.log('   3. Check browser console for errors');
    console.log('   4. Check Next.js server logs');
  }

  async getAccessToken() {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const response = await axios.post(`${this.baseUrl}/oauth/v2/token`, null, {
      params: {
        refresh_token: this.refreshToken,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'refresh_token'
      }
    });

    const data = response.data;
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000;

    return this.accessToken;
  }

  async makeRequest(method, url, data = null, params = null) {
    const token = await this.getAccessToken();
    
    const response = await axios({
      method,
      url,
      data,
      params,
      headers: {
        'Authorization': `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  }

  async getContacts() {
    const url = 'https://www.zohoapis.in/crm/v2/Contacts';
    const response = await this.makeRequest('GET', url, null, { per_page: 10 });
    return response.data || [];
  }

  async createContact(contactData) {
    const url = 'https://www.zohoapis.in/crm/v2/Contacts';
    const response = await this.makeRequest('POST', url, {
      data: [contactData]
    });
    
    if (response.data && response.data[0] && response.data[0].code === 'SUCCESS') {
      return response.data[0].details;
    }
    throw new Error(`Contact creation failed: ${JSON.stringify(response)}`);
  }

  async findContactByEmail(email) {
    const url = `https://www.zohoapis.in/crm/v2/Contacts/search?criteria=Email:equals:${email}`;
    
    try {
      const response = await this.makeRequest('GET', url);
      return response.data?.[0] || null;
    } catch (error) {
      if (error.response?.status === 204) {
        return null;
      }
      throw error;
    }
  }
}

// Main execution
async function main() {
  const diagnostic = new ZohoDiagnostic();
  await diagnostic.runDiagnostics();
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});

// Run the script
main().catch(console.error);