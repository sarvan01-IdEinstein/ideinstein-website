#!/usr/bin/env node

/**
 * Direct test of the signup API endpoint
 */

const axios = require('axios');

async function testSignupAPI() {
  console.log('🧪 Testing Signup API Directly\n');

  const testUser = {
    firstName: 'API',
    lastName: 'Test',
    email: `api.test.${Date.now()}@example.com`,
    company: 'API Test Company',
    password: 'apitest123'
  };

  console.log('📝 Test data:');
  console.log(JSON.stringify(testUser, null, 2));

  try {
    console.log('\n🚀 Calling signup API...');
    
    const response = await axios.post('http://localhost:3000/api/auth/signup', testUser, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });

    console.log('✅ API Response:');
    console.log(`   Status: ${response.status}`);
    console.log(`   Data: ${JSON.stringify(response.data, null, 2)}`);

    if (response.data.contactId) {
      console.log(`\n🎉 Success! Contact created with ID: ${response.data.contactId}`);
      console.log('   Check your Zoho CRM to verify the contact was created.');
    }

  } catch (error) {
    console.error('❌ API Test Failed:');
    
    if (error.code === 'ECONNREFUSED') {
      console.error('   Connection refused - is your dev server running?');
      console.error('   Run: npm run dev');
    } else if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Response: ${JSON.stringify(error.response.data, null, 2)}`);
    } else {
      console.error(`   Error: ${error.message}`);
    }
  }
}

console.log('⚠️  Make sure your Next.js dev server is running!');
console.log('   Run: npm run dev\n');

testSignupAPI().catch(console.error);