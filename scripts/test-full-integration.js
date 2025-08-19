#!/usr/bin/env node

/**
 * Comprehensive test for all Zoho integrations:
 * - CRM (Contacts)
 * - Projects
 * - Books (Invoices)
 * - WorkDrive (Files)
 */

require('dotenv').config({ path: '.env.local' });

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class FullIntegrationTester {
  constructor() {
    this.baseUrl = process.env.ZOHO_DOMAIN || 'https://accounts.zoho.in';
    this.clientId = process.env.ZOHO_CLIENT_ID;
    this.clientSecret = process.env.ZOHO_CLIENT_SECRET;
    this.refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    this.booksOrgId = process.env.ZOHO_BOOKS_ORG_ID;
    this.workdriveRootFolder = process.env.ZOHO_WORKDRIVE_ROOT_FOLDER;
    this.accessToken = null;
    this.tokenExpiry = 0;
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

  async testFullIntegration() {
    console.log('🚀 Testing Full Zoho Integration\n');

    // Check environment variables
    console.log('1️⃣ Environment Check:');
    console.log(`   ZOHO_CLIENT_ID: ${this.clientId ? '✅' : '❌'}`);
    console.log(`   ZOHO_CLIENT_SECRET: ${this.clientSecret ? '✅' : '❌'}`);
    console.log(`   ZOHO_REFRESH_TOKEN: ${this.refreshToken ? '✅' : '❌'}`);
    console.log(`   ZOHO_BOOKS_ORG_ID: ${this.booksOrgId ? '✅' : '❌'}`);
    console.log(`   ZOHO_WORKDRIVE_ROOT_FOLDER: ${this.workdriveRootFolder ? '✅' : '❌'}`);

    if (!this.clientId || !this.clientSecret || !this.refreshToken) {
      console.log('\n❌ Missing required Zoho credentials');
      return;
    }

    let testContact = null;

    try {
      // Test 1: CRM Integration
      console.log('\n2️⃣ Testing CRM Integration:');
      
      const contactData = {
        First_Name: 'Integration',
        Last_Name: 'Test',
        Email: `integration.test.${Date.now()}@example.com`,
        Account_Name: 'Integration Test Company'
      };

      console.log('   Creating test contact...');
      const createResponse = await this.makeRequest('POST', 'https://www.zohoapis.in/crm/v2/Contacts', {
        data: [contactData]
      });

      if (createResponse.data && createResponse.data[0] && createResponse.data[0].code === 'SUCCESS') {
        testContact = createResponse.data[0].details;
        console.log(`   ✅ Contact created: ${testContact.id}`);
      } else {
        throw new Error('Contact creation failed');
      }

      // Test 2: Projects Integration
      console.log('\n3️⃣ Testing Projects Integration:');
      
      if (testContact) {
        console.log('   Creating test project...');
        
        const projectData = {
          name: `Test Project ${Date.now()}`,
          description: 'Integration test project',
          owner_id: testContact.id
        };

        try {
          const projectResponse = await this.makeRequest('POST', 'https://projectsapi.zoho.in/restapi/projects/', projectData);
          
          if (projectResponse.projects && projectResponse.projects.length > 0) {
            console.log(`   ✅ Project created: ${projectResponse.projects[0].id}`);
          } else {
            console.log('   ⚠️  Project creation response unclear');
          }
        } catch (error) {
          console.log(`   ❌ Project creation failed: ${error.message}`);
          console.log('   💡 This might be due to Zoho Projects not being set up');
        }
      }

      // Test 3: Books Integration
      console.log('\n4️⃣ Testing Books Integration:');
      
      if (this.booksOrgId) {
        try {
          console.log('   Fetching Books customers...');
          const customersResponse = await this.makeRequest('GET', `https://books.zoho.in/api/v3/contacts?organization_id=${this.booksOrgId}`);
          
          console.log(`   ✅ Found ${customersResponse.contacts?.length || 0} customers in Books`);
          
          // Try to fetch invoices
          console.log('   Fetching invoices...');
          const invoicesResponse = await this.makeRequest('GET', `https://books.zoho.in/api/v3/invoices?organization_id=${this.booksOrgId}`);
          
          console.log(`   ✅ Found ${invoicesResponse.invoices?.length || 0} invoices in Books`);
        } catch (error) {
          console.log(`   ❌ Books integration failed: ${error.message}`);
          console.log('   💡 Check your ZOHO_BOOKS_ORG_ID and Books permissions');
        }
      } else {
        console.log('   ⚠️  ZOHO_BOOKS_ORG_ID not configured, skipping Books test');
      }

      // Test 4: WorkDrive Integration
      console.log('\n5️⃣ Testing WorkDrive Integration:');
      
      if (this.workdriveRootFolder) {
        try {
          console.log('   Fetching WorkDrive files...');
          const filesResponse = await this.makeRequest('GET', `https://workdrive.zoho.in/api/v1/files/${this.workdriveRootFolder}/files`);
          
          console.log(`   ✅ Found ${filesResponse.data?.length || 0} files/folders in WorkDrive`);
          
          // Try to create a test folder
          console.log('   Creating test folder...');
          const folderData = {
            data: {
              attributes: {
                name: `Test_Folder_${Date.now()}`,
                parent_id: this.workdriveRootFolder
              },
              type: 'files'
            }
          };
          
          const folderResponse = await this.makeRequest('POST', 'https://workdrive.zoho.in/api/v1/files', folderData);
          
          if (folderResponse.data) {
            console.log(`   ✅ Test folder created: ${folderResponse.data.id}`);
          }
        } catch (error) {
          console.log(`   ❌ WorkDrive integration failed: ${error.message}`);
          console.log('   💡 Check your ZOHO_WORKDRIVE_ROOT_FOLDER and WorkDrive permissions');
        }
      } else {
        console.log('   ⚠️  ZOHO_WORKDRIVE_ROOT_FOLDER not configured, skipping WorkDrive test');
      }

      console.log('\n📊 Integration Test Summary:');
      console.log('   ✅ CRM: Contact creation working');
      console.log(`   ${this.booksOrgId ? '✅' : '⚠️ '} Books: ${this.booksOrgId ? 'Configured' : 'Not configured'}`);
      console.log(`   ${this.workdriveRootFolder ? '✅' : '⚠️ '} WorkDrive: ${this.workdriveRootFolder ? 'Configured' : 'Not configured'}`);

    } catch (error) {
      console.error('\n❌ Integration test failed:', error.message);
      if (error.response) {
        console.error('   Response:', JSON.stringify(error.response.data, null, 2));
      }
    }

    console.log('\n🎯 Next Steps:');
    console.log('   1. Configure missing environment variables');
    console.log('   2. Test the web application signup and login');
    console.log('   3. Test project creation and file upload in the portal');
    console.log('   4. Verify data appears in respective Zoho applications');
  }
}

// Main execution
async function main() {
  const tester = new FullIntegrationTester();
  await tester.testFullIntegration();
}

main().catch(console.error);