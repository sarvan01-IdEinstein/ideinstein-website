#!/usr/bin/env node

/**
 * Test script to verify Zoho CRM integration by creating a new customer
 * This script tests the automatic contact creation functionality
 */

require('dotenv').config({ path: '.env.local' });

const axios = require('axios');

// Test customer data
const testCustomers = [
  {
    email: 'john.doe@testcompany.com',
    first_name: 'John',
    last_name: 'Doe',
    company: 'Test Engineering Corp',
    phone: '+1-555-123-4567'
  },
  {
    email: 'jane.smith@innovate.com',
    first_name: 'Jane',
    last_name: 'Smith',
    company: 'Innovate Solutions',
    phone: '+1-555-987-6543'
  },
  {
    email: 'mike.wilson@techstart.io',
    first_name: 'Mike',
    last_name: 'Wilson',
    company: 'TechStart Inc',
    phone: '+1-555-456-7890'
  }
];

class ZohoTester {
  constructor() {
    this.baseUrl = process.env.ZOHO_DOMAIN || 'https://accounts.zoho.in';
    this.clientId = process.env.ZOHO_CLIENT_ID;
    this.clientSecret = process.env.ZOHO_CLIENT_SECRET;
    this.refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    this.accessToken = null;
    this.tokenExpiry = 0;
  }

  async getAccessToken() {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      console.log('🔄 Getting fresh access token...');
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

      console.log('✅ Access token obtained successfully');
      return this.accessToken;
    } catch (error) {
      console.error('❌ Error getting access token:', error.response?.data || error.message);
      throw error;
    }
  }

  async makeRequest(method, url, data = null, params = null) {
    const token = await this.getAccessToken();
    
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
      });
      
      return response.data;
    } catch (error) {
      console.error('❌ Zoho API request failed:', error.response?.data || error.message);
      throw error;
    }
  }

  async createContact(contactData) {
    const url = 'https://www.zohoapis.in/crm/v2/Contacts';
    console.log(`🔄 Creating contact: ${contactData.first_name} ${contactData.last_name} (${contactData.email})`);
    
    try {
      const response = await this.makeRequest('POST', url, {
        data: [contactData]
      });
      
      if (response.data && response.data[0] && response.data[0].code === 'SUCCESS') {
        const contact = response.data[0].details;
        console.log(`✅ Contact created successfully!`);
        console.log(`   ID: ${contact.id}`);
        console.log(`   Name: ${contact.First_Name} ${contact.Last_Name}`);
        console.log(`   Email: ${contact.Email}`);
        console.log(`   Company: ${contact.Account_Name || 'N/A'}`);
        return contact;
      } else {
        console.error('❌ Failed to create contact:', response);
        return null;
      }
    } catch (error) {
      console.error('❌ Error creating contact:', error.response?.data || error.message);
      return null;
    }
  }

  async findContactByEmail(email) {
    const url = `https://www.zohoapis.in/crm/v2/Contacts/search?criteria=Email:equals:${email}`;
    console.log(`🔍 Searching for contact with email: ${email}`);
    
    try {
      const response = await this.makeRequest('GET', url);
      
      if (response.data && response.data.length > 0) {
        const contact = response.data[0];
        console.log(`✅ Contact found!`);
        console.log(`   ID: ${contact.id}`);
        console.log(`   Name: ${contact.First_Name} ${contact.Last_Name}`);
        return contact;
      } else {
        console.log(`ℹ️  No contact found with email: ${email}`);
        return null;
      }
    } catch (error) {
      if (error.response?.status === 204) {
        console.log(`ℹ️  No contact found with email: ${email}`);
        return null;
      }
      console.error('❌ Error searching for contact:', error.response?.data || error.message);
      return null;
    }
  }

  async deleteContact(contactId) {
    const url = `https://www.zohoapis.in/crm/v2/Contacts/${contactId}`;
    console.log(`🗑️  Deleting contact: ${contactId}`);
    
    try {
      const response = await this.makeRequest('DELETE', url);
      console.log(`✅ Contact deleted successfully`);
      return true;
    } catch (error) {
      console.error('❌ Error deleting contact:', error.response?.data || error.message);
      return false;
    }
  }

  async testCustomerCreation() {
    console.log('🚀 Starting Zoho CRM Integration Test\n');
    
    // Verify environment variables
    if (!this.clientId || !this.clientSecret || !this.refreshToken) {
      console.error('❌ Missing required environment variables:');
      console.error('   ZOHO_CLIENT_ID:', this.clientId ? '✅' : '❌');
      console.error('   ZOHO_CLIENT_SECRET:', this.clientSecret ? '✅' : '❌');
      console.error('   ZOHO_REFRESH_TOKEN:', this.refreshToken ? '✅' : '❌');
      return;
    }

    const createdContacts = [];

    try {
      // Test creating multiple customers
      for (const customerData of testCustomers) {
        console.log(`\n📝 Testing customer: ${customerData.email}`);
        
        // Check if contact already exists
        const existingContact = await this.findContactByEmail(customerData.email);
        
        if (existingContact) {
          console.log(`⚠️  Contact already exists, skipping creation`);
          continue;
        }

        // Create new contact
        const newContact = await this.createContact(customerData);
        
        if (newContact) {
          createdContacts.push(newContact);
          
          // Wait a bit between requests
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      console.log(`\n📊 Test Summary:`);
      console.log(`   Total customers tested: ${testCustomers.length}`);
      console.log(`   Successfully created: ${createdContacts.length}`);
      
      if (createdContacts.length > 0) {
        console.log(`\n✅ Zoho CRM integration is working correctly!`);
        console.log(`\nCreated contacts:`);
        createdContacts.forEach((contact, index) => {
          console.log(`   ${index + 1}. ${contact.First_Name} ${contact.Last_Name} (${contact.Email})`);
        });
      }

      // Ask if user wants to clean up test data
      console.log(`\n🧹 Cleanup Options:`);
      console.log(`   To delete test contacts, run:`);
      createdContacts.forEach(contact => {
        console.log(`   node scripts/test-customer-creation.js --delete ${contact.id}`);
      });

    } catch (error) {
      console.error('❌ Test failed:', error.message);
    }
  }

  async deleteTestContact(contactId) {
    console.log(`🧹 Cleaning up test contact: ${contactId}`);
    await this.deleteContact(contactId);
  }
}

// Main execution
async function main() {
  const tester = new ZohoTester();
  
  // Check for delete command
  const args = process.argv.slice(2);
  if (args[0] === '--delete' && args[1]) {
    await tester.deleteTestContact(args[1]);
    return;
  }
  
  // Run the test
  await tester.testCustomerCreation();
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});

// Run the script
main().catch(console.error);