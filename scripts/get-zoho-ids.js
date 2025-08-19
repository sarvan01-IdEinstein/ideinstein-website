#!/usr/bin/env node

/**
 * Helper script to get Zoho Books Organization ID and WorkDrive Root Folder ID
 */

require('dotenv').config({ path: '.env.local' });
const axios = require('axios');

async function getZohoIDs() {
  console.log('🔍 Getting Zoho Books Organization ID and WorkDrive Root Folder ID\n');

  try {
    // Test Books API to get Organization ID
    console.log('📊 Testing Books API...');
    
    const booksToken = process.env.ZOHO_BOOKS_REFRESH_TOKEN;
    const clientId = process.env.ZOHO_BOOKS_CLIENT_ID;
    const clientSecret = process.env.ZOHO_BOOKS_CLIENT_SECRET;

    if (booksToken && clientId && clientSecret) {
      try {
        // Get access token for Books
        const tokenResponse = await axios.post('https://accounts.zoho.in/oauth/v2/token', null, {
          params: {
            refresh_token: booksToken,
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'refresh_token'
          }
        });

        const accessToken = tokenResponse.data.access_token;

        // Try to get organizations
        const orgsResponse = await axios.get('https://books.zoho.in/api/v3/organizations', {
          headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`
          }
        });

        if (orgsResponse.data.organizations && orgsResponse.data.organizations.length > 0) {
          const org = orgsResponse.data.organizations[0];
          console.log('✅ Found Books Organization:');
          console.log(`   Organization ID: ${org.organization_id}`);
          console.log(`   Name: ${org.name}`);
          console.log(`   Currency: ${org.currency_code}`);
          console.log('\n📝 Add this to your .env.local:');
          console.log(`   ZOHO_BOOKS_ORG_ID=${org.organization_id}`);
        } else {
          console.log('⚠️  No Books organizations found');
        }

      } catch (error) {
        console.log('❌ Books API test failed:', error.response?.data?.message || error.message);
        console.log('\n💡 Manual method for Books Organization ID:');
        console.log('   1. Go to https://books.zoho.in');
        console.log('   2. Check URL: https://books.zoho.in/app/[ORG_ID]#/home');
        console.log('   3. Copy the [ORG_ID] part');
      }
    } else {
      console.log('⚠️  Books credentials not found in .env.local');
    }

    // Test WorkDrive API
    console.log('\n📁 Testing WorkDrive API...');
    
    const workdriveToken = process.env.ZOHO_WORKDRIVE_REFRESH_TOKEN;
    const workdriveClientId = process.env.ZOHO_WORKDRIVE_CLIENT_ID;
    const workdriveClientSecret = process.env.ZOHO_WORKDRIVE_CLIENT_SECRET;

    if (workdriveToken && workdriveClientId && workdriveClientSecret) {
      try {
        // Get access token for WorkDrive
        const tokenResponse = await axios.post('https://accounts.zoho.in/oauth/v2/token', null, {
          params: {
            refresh_token: workdriveToken,
            client_id: workdriveClientId,
            client_secret: workdriveClientSecret,
            grant_type: 'refresh_token'
          }
        });

        const accessToken = tokenResponse.data.access_token;

        // Try to get root folders
        const foldersResponse = await axios.get('https://workdrive.zoho.in/api/v1/files', {
          headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`
          }
        });

        if (foldersResponse.data.data && foldersResponse.data.data.length > 0) {
          console.log('✅ Found WorkDrive folders:');
          foldersResponse.data.data.forEach((folder, index) => {
            if (folder.type === 'folder') {
              console.log(`   ${index + 1}. ${folder.attributes.name} (ID: ${folder.id})`);
            }
          });
          
          console.log('\n💡 Choose a folder ID for customer files or create a new one:');
          console.log('   1. Go to https://workdrive.zoho.in');
          console.log('   2. Create folder "IdEinstein Customer Files"');
          console.log('   3. Right-click → "Get Link" → Copy folder ID from URL');
          console.log('   4. Add: ZOHO_WORKDRIVE_ROOT_FOLDER=your_folder_id');
        } else {
          console.log('⚠️  No WorkDrive folders found');
        }

      } catch (error) {
        console.log('❌ WorkDrive API test failed:', error.response?.data?.message || error.message);
        console.log('\n💡 Manual method for WorkDrive Root Folder:');
        console.log('   1. Go to https://workdrive.zoho.in');
        console.log('   2. Create folder "IdEinstein Customer Files"');
        console.log('   3. Right-click folder → "Get Link"');
        console.log('   4. Copy folder ID from URL: https://workdrive.zoho.in/folder/[FOLDER_ID]');
      }
    } else {
      console.log('⚠️  WorkDrive credentials not found in .env.local');
    }

    console.log('\n🧪 After updating IDs, test with:');
    console.log('   node scripts/test-env-config.js');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

getZohoIDs();