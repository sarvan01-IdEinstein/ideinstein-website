#!/usr/bin/env node

/**
 * Debug script to trace the authentication flow and identify issues
 */

require('dotenv').config({ path: '.env.local' });

// Test the auth flow step by step
async function debugAuthFlow() {
  console.log('🐛 Debugging Authentication Flow\n');

  // Step 1: Check if we can import the Zoho service
  console.log('1️⃣ Testing Zoho Service Import:');
  try {
    // Try to require the Zoho service (this might fail due to TypeScript)
    console.log('   Attempting to load Zoho service...');
    
    // Since we can't directly import TypeScript, let's test the raw API
    const axios = require('axios');
    
    const baseUrl = process.env.ZOHO_DOMAIN || 'https://accounts.zoho.in';
    const clientId = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

    console.log('   ✅ Environment variables loaded');
    console.log(`   Domain: ${baseUrl}`);
    console.log(`   Client ID: ${clientId ? 'Set' : 'Missing'}`);
    console.log(`   Client Secret: ${clientSecret ? 'Set' : 'Missing'}`);
    console.log(`   Refresh Token: ${refreshToken ? 'Set' : 'Missing'}`);

    if (!clientId || !clientSecret || !refreshToken) {
      throw new Error('Missing required environment variables');
    }

    // Step 2: Test token refresh
    console.log('\n2️⃣ Testing Token Refresh:');
    const tokenResponse = await axios.post(`${baseUrl}/oauth/v2/token`, null, {
      params: {
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token'
      }
    });

    const accessToken = tokenResponse.data.access_token;
    console.log('   ✅ Access token obtained');

    // Step 3: Test contact creation (simulating signup)
    console.log('\n3️⃣ Simulating Signup Process:');
    const testUser = {
      First_Name: 'Debug',
      Last_Name: 'User',
      Email: `debug.user.${Date.now()}@example.com`,
      Account_Name: 'Debug Test Company'
    };

    console.log(`   Creating contact: ${testUser.First_Name} ${testUser.Last_Name}`);
    console.log(`   Email: ${testUser.Email}`);

    const createResponse = await axios.post('https://www.zohoapis.in/crm/v2/Contacts', {
      data: [testUser]
    }, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('   ✅ Contact creation response received');
    console.log(`   Response: ${JSON.stringify(createResponse.data, null, 2)}`);

    if (createResponse.data.data && createResponse.data.data[0] && createResponse.data.data[0].code === 'SUCCESS') {
      const contactId = createResponse.data.data[0].details.id;
      console.log(`   ✅ Contact created successfully with ID: ${contactId}`);

      // Step 4: Test contact search (simulating login)
      console.log('\n4️⃣ Simulating Login Process:');
      console.log(`   Searching for contact with email: ${testUser.Email}`);

      const searchResponse = await axios.get(`https://www.zohoapis.in/crm/v2/Contacts/search?criteria=Email:equals:${testUser.Email}`, {
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('   ✅ Contact search response received');
      console.log(`   Found contacts: ${searchResponse.data.data ? searchResponse.data.data.length : 0}`);

      if (searchResponse.data.data && searchResponse.data.data.length > 0) {
        const foundContact = searchResponse.data.data[0];
        console.log(`   ✅ Contact found: ${foundContact.First_Name} ${foundContact.Last_Name}`);
        console.log(`   Contact ID: ${foundContact.id}`);
      } else {
        console.log('   ⚠️  Contact not found in search');
      }

    } else {
      console.log('   ❌ Contact creation failed');
      console.log(`   Response: ${JSON.stringify(createResponse.data, null, 2)}`);
    }

  } catch (error) {
    console.log('   ❌ Error in auth flow debug:');
    console.log(`   Message: ${error.message}`);
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Response: ${JSON.stringify(error.response.data, null, 2)}`);
    }
  }

  console.log('\n📋 Debug Summary:');
  console.log('   If all steps passed, the Zoho integration is working correctly.');
  console.log('   If any step failed, that\'s where the issue is occurring.');
  console.log('\n🔧 Troubleshooting Tips:');
  console.log('   1. Check your .env.local file has correct values');
  console.log('   2. Verify your Zoho app has correct permissions');
  console.log('   3. Check if your refresh token is expired');
  console.log('   4. Verify you\'re using the correct Zoho domain (.in vs .com)');
}

// Main execution
debugAuthFlow().catch(error => {
  console.error('❌ Debug failed:', error.message);
  process.exit(1);
});