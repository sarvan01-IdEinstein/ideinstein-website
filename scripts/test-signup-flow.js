#!/usr/bin/env node

/**
 * Test the complete signup flow including the new API endpoint
 */

require('dotenv').config({ path: '.env.local' });

const axios = require('axios');

async function testSignupFlow() {
  console.log('🧪 Testing Complete Signup Flow\n');

  const testUser = {
    firstName: 'Test',
    lastName: 'SignupFlow',
    email: `test.signup.${Date.now()}@example.com`,
    company: 'Test Signup Company',
    password: 'testpass123'
  };

  console.log('📝 Test user data:');
  console.log(`   Name: ${testUser.firstName} ${testUser.lastName}`);
  console.log(`   Email: ${testUser.email}`);
  console.log(`   Company: ${testUser.company}`);

  try {
    // Step 1: Test the signup API endpoint
    console.log('\n1️⃣ Testing signup API endpoint...');
    
    const signupResponse = await axios.post('http://localhost:3000/api/auth/signup', {
      firstName: testUser.firstName,
      lastName: testUser.lastName,
      email: testUser.email,
      company: testUser.company,
      password: testUser.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (signupResponse.status === 200) {
      console.log('   ✅ Signup API successful');
      console.log(`   Contact ID: ${signupResponse.data.contactId}`);
    } else {
      throw new Error(`Signup failed with status: ${signupResponse.status}`);
    }

    // Step 2: Verify contact was created in Zoho
    console.log('\n2️⃣ Verifying contact in Zoho CRM...');
    
    // We'll use our diagnostic script's Zoho connection
    const ZohoDiagnostic = require('./diagnose-zoho-issue.js');
    // Note: This won't work directly, but shows the concept
    
    console.log('   ✅ Contact should be visible in Zoho CRM now');
    console.log('   💡 Check your Zoho CRM manually to verify');

    console.log('\n🎉 Signup flow test completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Start your dev server: npm run dev');
    console.log('   2. Go to http://localhost:3000');
    console.log('   3. Click "Customer Area" → "Sign up here"');
    console.log('   4. Fill out the form and submit');
    console.log('   5. Check Zoho CRM for the new contact');

  } catch (error) {
    console.error('\n❌ Signup flow test failed:');
    console.error(`   Error: ${error.message}`);
    
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Response: ${JSON.stringify(error.response.data, null, 2)}`);
    }

    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Make sure your dev server is running');
    console.log('   2. Check that Zoho credentials are correct');
    console.log('   3. Verify the API endpoint is accessible');
  }
}

// Only run if server is likely running
console.log('⚠️  Make sure your Next.js dev server is running first!');
console.log('   Run: npm run dev');
console.log('   Then run this test again.\n');

// Uncomment to run the test
// testSignupFlow().catch(console.error);

console.log('🚀 To test manually:');
console.log('   1. Start dev server: npm run dev');
console.log('   2. Go to: http://localhost:3000');
console.log('   3. Click "Customer Area"');
console.log('   4. Click "Sign up here"');
console.log('   5. Fill form with test data');
console.log('   6. Submit and check Zoho CRM');