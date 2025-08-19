#!/usr/bin/env node

/**
 * Zoho WorkDrive OAuth Token Generator for Local Development
 * Based on the working CRM setup
 */

const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function getWorkDriveRefreshToken() {
  console.log('🚀 Zoho WorkDrive OAuth Token Generator (Local Development)\n');

  try {
    // Get client credentials
    const clientId = await question('Enter your Zoho WorkDrive Client ID: ');
    const clientSecret = await question('Enter your Zoho WorkDrive Client Secret: ');

    if (!clientId || !clientSecret) {
      console.log('❌ Client ID and Secret are required');
      process.exit(1);
    }

    // Generate authorization URL for WorkDrive
    const scope = 'WorkDrive.files.ALL';
    const redirectUri = 'http://localhost:3000/oauth/callback';
    const authUrl = `https://accounts.zoho.in/oauth/v2/auth?scope=${scope}&client_id=${clientId}&response_type=code&access_type=offline&redirect_uri=${redirectUri}&prompt=consent`;

    console.log('\n📋 Step 1: Open this URL in your browser:');
    console.log('🔗', authUrl);
    console.log('\n📋 Step 2: After login, you\'ll be redirected to:');
    console.log('   http://localhost:3000/oauth/callback?code=XXXXX');
    console.log('\n📋 Step 3: Copy the code from the URL and paste it below');

    const authCode = await question('\nEnter the authorization code: ');

    if (!authCode) {
      console.log('❌ Authorization code is required');
      process.exit(1);
    }

    console.log('\n🔄 Exchanging code for refresh token...');

    // Exchange code for tokens
    const tokenResponse = await axios.post('https://accounts.zoho.in/oauth/v2/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code: authCode
      }
    });

    const { access_token, refresh_token } = tokenResponse.data;

    console.log('\n✅ Success! Here are your Zoho WorkDrive credentials:');
    console.log('\n📝 Add these to your .env.local file:');
    console.log('─'.repeat(50));
    console.log(`ZOHO_WORKDRIVE_CLIENT_ID=${clientId}`);
    console.log(`ZOHO_WORKDRIVE_CLIENT_SECRET=${clientSecret}`);
    console.log(`ZOHO_WORKDRIVE_REFRESH_TOKEN=${refresh_token}`);
    console.log('─'.repeat(50));

    console.log('\n💡 Don\'t forget to also add your WorkDrive Root Folder ID:');
    console.log('   1. Go to https://workdrive.zoho.in');
    console.log('   2. Create a folder called "IdEinstein Customer Files"');
    console.log('   3. Right-click folder → "Get Link"');
    console.log('   4. Copy folder ID from URL: https://workdrive.zoho.in/folder/[FOLDER_ID]');
    console.log('   5. Add: ZOHO_WORKDRIVE_ROOT_FOLDER=your_folder_id');

    console.log('\n🧪 Test your WorkDrive integration:');
    console.log('   node scripts/test-modular-integration.js');

  } catch (error) {
    console.error('\n❌ Error:', error.response?.data || error.message);
    
    if (error.response?.data?.error === 'invalid_code') {
      console.log('\n💡 The authorization code may have expired. Please try again with a fresh code.');
    }
  } finally {
    rl.close();
  }
}

getWorkDriveRefreshToken();