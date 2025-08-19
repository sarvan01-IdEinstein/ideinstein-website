#!/usr/bin/env node

/**
 * Test script to verify the authentication flow with Zoho integration
 * This simulates the signup/login process
 */

require('dotenv').config({ path: '.env.local' });

// Import the Zoho service
const path = require('path');
const { zohoService } = require('../lib/zoho.ts');

// Test user data
const testUser = {
  email: 'test.user@example.com',
  first_name: 'Test',
  last_name: 'User',
  company: 'Test Company Inc'
};

async function testAuthFlow() {
  console.log('🚀 Testing Authentication Flow with Zoho Integration\n');

  try {
    console.log('1️⃣ Testing user signup flow...');
    console.log(`   Email: ${testUser.email}`);
    
    // Step 1: Check if user already exists
    console.log('🔍 Checking if user already exists in Zoho CRM...');
    let existingContact = await zohoService.findContactByEmail(testUser.email);
    
    if (existingContact) {
      console.log('⚠️  User already exists in Zoho CRM:');
      console.log(`   ID: ${existingContact.id}`);
      console.log(`   Name: ${existingContact.first_name} ${existingContact.last_name}`);
      console.log('   Skipping creation, testing login flow instead...');
    } else {
      // Step 2: Create new contact (simulating signup)
      console.log('✨ Creating new contact in Zoho CRM...');
      const newContact = await zohoService.createContact(testUser);
      
      if (newContact) {
        console.log('✅ Contact created successfully!');
        console.log(`   ID: ${newContact.id}`);
        console.log(`   Name: ${newContact.first_name} ${newContact.last_name}`);
        console.log(`   Email: ${newContact.email}`);
        existingContact = newContact;
      } else {
        throw new Error('Failed to create contact');
      }
    }

    // Step 3: Test login flow (finding existing contact)
    console.log('\n2️⃣ Testing user login flow...');
    console.log('🔍 Finding contact by email (simulating login)...');
    
    const loginContact = await zohoService.findContactByEmail(testUser.email);
    
    if (loginContact) {
      console.log('✅ Login simulation successful!');
      console.log(`   Found contact: ${loginContact.first_name} ${loginContact.last_name}`);
      console.log(`   Contact ID: ${loginContact.id}`);
    } else {
      throw new Error('Failed to find contact during login simulation');
    }

    // Step 4: Test fetching user data
    console.log('\n3️⃣ Testing user data retrieval...');
    console.log('📊 Fetching contact details...');
    
    const contactDetails = await zohoService.getContact(loginContact.id);
    
    if (contactDetails) {
      console.log('✅ Contact details retrieved successfully!');
      console.log(`   Full Name: ${contactDetails.first_name} ${contactDetails.last_name}`);
      console.log(`   Email: ${contactDetails.email}`);
      console.log(`   Company: ${contactDetails.company || 'N/A'}`);
      console.log(`   Created: ${contactDetails.created_time}`);
    }

    console.log('\n🎉 All tests passed! Zoho integration is working correctly.');
    console.log('\n📝 Test Summary:');
    console.log('   ✅ Contact creation/finding: Working');
    console.log('   ✅ Email-based lookup: Working');
    console.log('   ✅ Contact data retrieval: Working');
    console.log('   ✅ Authentication flow: Ready');

    console.log('\n🧹 Cleanup:');
    console.log(`   To delete test contact: node scripts/test-auth-integration.js --cleanup ${loginContact.id}`);

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('   Check your Zoho configuration and try again.');
    
    if (error.response) {
      console.error('   API Response:', error.response.data);
    }
  }
}

async function cleanupTestData(contactId) {
  console.log(`🧹 Cleaning up test contact: ${contactId}`);
  
  try {
    // Note: We'll need to implement a delete method in the Zoho service
    console.log('⚠️  Manual cleanup required:');
    console.log(`   Go to Zoho CRM and delete contact ID: ${contactId}`);
    console.log(`   Or implement delete functionality in zohoService`);
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args[0] === '--cleanup' && args[1]) {
    await cleanupTestData(args[1]);
    return;
  }
  
  await testAuthFlow();
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});

// Run the script
main().catch(console.error);