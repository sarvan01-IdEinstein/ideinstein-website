#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

async function testZohoCRM() {
  console.log('🧪 Testing Zoho CRM Connection');
  console.log('================================\n');

  // Check environment variables
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
  const domain = process.env.ZOHO_DOMAIN;

  console.log('📋 Environment Check:');
  console.log('Client ID:', clientId ? '✅ Set' : '❌ Missing');
  console.log('Client Secret:', clientSecret ? '✅ Set' : '❌ Missing');
  console.log('Refresh Token:', refreshToken ? '✅ Set' : '❌ Missing');
  console.log('Domain:', domain || 'https://accounts.zoho.in');
  console.log('');

  if (!clientId || !clientSecret || !refreshToken) {
    console.log('❌ Missing required environment variables in .env.local');
    return;
  }

  try {
    // Step 1: Get access token
    console.log('🔄 Step 1: Getting access token...');
    const tokenResponse = await axios.post(`${domain}/oauth/v2/token`, null, {
      params: {
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token'
      }
    });

    const accessToken = tokenResponse.data.access_token;
    const apiDomain = tokenResponse.data.api_domain;
    
    console.log('✅ Access token obtained successfully');
    console.log('API Domain:', apiDomain);
    console.log('Token expires in:', tokenResponse.data.expires_in, 'seconds');
    console.log('');

    // Step 2: Test CRM API
    console.log('🔄 Step 2: Testing CRM API...');
    const crmResponse = await axios.get(`${apiDomain}/crm/v2/Contacts`, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      },
      params: {
        per_page: 5  // Just get 5 contacts for testing
      }
    });

    console.log('✅ CRM API working successfully!');
    console.log('Contacts found:', crmResponse.data.data?.length || 0);
    
    if (crmResponse.data.data && crmResponse.data.data.length > 0) {
      console.log('📋 Sample contact:');
      const contact = crmResponse.data.data[0];
      console.log('- Name:', contact.Full_Name || 'N/A');
      console.log('- Email:', contact.Email || 'N/A');
      console.log('- ID:', contact.id);
    }
    console.log('');

    // Step 3: Test creating a contact
    console.log('🔄 Step 3: Testing contact creation...');
    const testContact = {
      data: [{
        First_Name: 'Test',
        Last_Name: 'User',
        Email: `test-${Date.now()}@example.com`,
        Description: 'Test contact created by IdEinstein integration test'
      }]
    };

    const createResponse = await axios.post(`${apiDomain}/crm/v2/Contacts`, testContact, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (createResponse.data.data && createResponse.data.data[0].status === 'success') {
      console.log('✅ Contact creation successful!');
      console.log('New contact ID:', createResponse.data.data[0].details.id);
      console.log('');
      
      console.log('🎉 CRM Integration Test Results:');
      console.log('================================');
      console.log('✅ Access token refresh: WORKING');
      console.log('✅ CRM API access: WORKING');
      console.log('✅ Contact creation: WORKING');
      console.log('✅ Your CRM integration is fully functional!');
      console.log('');
      console.log('🚀 Next Steps:');
      console.log('1. Your CRM connection is working perfectly');
      console.log('2. User registration should now create contacts in Zoho CRM');
      console.log('3. Try registering a new user in the portal');
      console.log('4. Check your Zoho CRM for the new contact');
    } else {
      console.log('❌ Contact creation failed');
      console.log('Response:', JSON.stringify(createResponse.data, null, 2));
    }

  } catch (error) {
    console.log('❌ Error during testing:');
    
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', JSON.stringify(error.response.data, null, 2));
      
      if (error.response.status === 401) {
        console.log('');
        console.log('🔧 Authentication Error Solutions:');
        console.log('1. Check if refresh token is valid');
        console.log('2. Verify Client ID and Secret are correct');
        console.log('3. Make sure CRM scope is included in your token');
        console.log('4. Try generating a new authorization code with CRM scope');
      }
      
      if (error.response.data?.code === 'INVALID_TOKEN') {
        console.log('');
        console.log('🔧 Invalid Token Solutions:');
        console.log('1. Generate new authorization code in API console');
        console.log('2. Make sure to include ZohoCRM.modules.ALL scope');
        console.log('3. Exchange the new code for a fresh refresh token');
      }
    } else {
      console.log('Network Error:', error.message);
    }
  }
}

testZohoCRM();