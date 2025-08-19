#!/usr/bin/env node

/**
 * Test the login flow after signup
 */

const axios = require('axios');

async function testLoginFlow() {
  console.log('🔐 Testing Login Flow\n');

  // Use the email from our previous test
  const testCredentials = {
    email: 'api.test.1755349610189@example.com', // Update this with a real test email
    password: 'apitest123'
  };

  console.log('📝 Test credentials:');
  console.log(`   Email: ${testCredentials.email}`);
  console.log(`   Password: ${testCredentials.password}`);

  try {
    console.log('\n🚀 Testing NextAuth credentials endpoint...');
    
    // This simulates what NextAuth does internally
    const response = await axios.post('http://localhost:3000/api/auth/callback/credentials', {
      email: testCredentials.email,
      password: testCredentials.password,
      redirect: false
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Login Response:');
    console.log(`   Status: ${response.status}`);
    console.log(`   Data: ${JSON.stringify(response.data, null, 2)}`);

  } catch (error) {
    console.error('❌ Login Test Failed:');
    
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Response: ${JSON.stringify(error.response.data, null, 2)}`);
    } else {
      console.error(`   Error: ${error.message}`);
    }
  }
}

console.log('⚠️  Make sure your Next.js dev server is running!');
console.log('   Run: npm run dev\n');

testLoginFlow().catch(console.error);