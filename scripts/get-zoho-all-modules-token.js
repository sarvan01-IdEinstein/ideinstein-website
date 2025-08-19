#!/usr/bin/env node

/**
 * Zoho All Modules OAuth Token Generator for Local Development
 * Uses existing Self Client with multiple scopes
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

async function getAllModulesRefreshToken() {
  console.log('🚀 Zoho All Modules OAuth Token Generator (Local Development)\n');
  console.log('💡 This uses your existing Self Client with multiple scopes\n');

  try {
    // Get client credentials (same as CRM)
    const clientId = await question('Enter your existing Zoho Client ID (same as CRM): ');
    const clientSecret = await question('Enter your existing Zoho Client Secret (same as CRM): ');

    if (!clientId || !clientSecret) {
      console.log('❌ Client ID and Secret are required');
      process.exit(1);
    }

    // Generate authorization URL for ALL modules
    const scopes = [
      'ZohoCRM.modules.ALL',
      'ZohoProjects.projects.ALL', 
      'ZohoBooks.fullaccess.all',
      'WorkDrive.files.ALL'
    ];
    const scope = scopes.join(',');
    const redirectUri = 'http://localhost:3000/oauth/callback';
    const authUrl = `https://accounts.zoho.in/oauth/v2/auth?scope=${encodeURIComponent(scope)}&client_id=${clientId}&response_type=code&access_type=offline&redirect_uri=${redirectUri}&prompt=consent`;

    console.log('\n📋 Step 1: Make sure your Self Client has these scopes:');
    scopes.forEach(s => console.log(`   ✓ ${s}`));
    
    console.log('\n📋 Step 2: Open this URL in your browser:');
    console.log('🔗', authUrl);
    console.log('\n📋 Step 3: After login, you\'ll be redirected to:');
    console.log('   http://localhost:3000/oauth/callback?code=XXXXX');
    console.log('\n📋 Step 4: Copy the code from the URL and paste it below');

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

    console.log('\n✅ Success! Here are your ALL MODULES credentials:');
    console.log('\n📝 Add these to your .env.local file:');
    console.log('─'.repeat(60));
    console.log('# Single client for all modules');
    console.log(`ZOHO_CLIENT_ID=${clientId}`);
    console.log(`ZOHO_CLIENT_SECRET=${clientSecret}`);
    console.log(`ZOHO_REFRESH_TOKEN=${refresh_token}`);
    console.log('');
    console.log('# Use same credentials for all modules');
    console.log(`ZOHO_PROJECTS_CLIENT_ID=${clientId}`);
    console.log(`ZOHO_PROJECTS_CLIENT_SECRET=${clientSecret}`);
    console.log(`ZOHO_PROJECTS_REFRESH_TOKEN=${refresh_token}`);
    console.log('');
    console.log(`ZOHO_BOOKS_CLIENT_ID=${clientId}`);
    console.log(`ZOHO_BOOKS_CLIENT_SECRET=${clientSecret}`);
    console.log(`ZOHO_BOOKS_REFRESH_TOKEN=${refresh_token}`);
    console.log('# ZOHO_BOOKS_ORG_ID=your_org_id  # Get from books.zoho.in URL');
    console.log('');
    console.log(`ZOHO_WORKDRIVE_CLIENT_ID=${clientId}`);
    console.log(`ZOHO_WORKDRIVE_CLIENT_SECRET=${clientSecret}`);
    console.log(`ZOHO_WORKDRIVE_REFRESH_TOKEN=${refresh_token}`);
    console.log('# ZOHO_WORKDRIVE_ROOT_FOLDER=your_folder_id  # Get from workdrive.zoho.in');
    console.log('─'.repeat(60));

    console.log('\n💡 Still need to get:');
    console.log('   📊 Books Organization ID: Go to https://books.zoho.in → Check URL');
    console.log('   📁 WorkDrive Root Folder: Go to https://workdrive.zoho.in → Create folder → Get ID');

    console.log('\n🧪 Test your integration:');
    console.log('   node scripts/test-modular-integration.js');

  } catch (error) {
    console.error('\n❌ Error:', error.response?.data || error.message);
    
    if (error.response?.data?.error === 'invalid_code') {
      console.log('\n💡 The authorization code may have expired. Please try again with a fresh code.');
    }
    
    if (error.response?.data?.error === 'invalid_scope') {
      console.log('\n💡 Make sure you added all the required scopes to your Self Client:');
      scopes.forEach(s => console.log(`   - ${s}`));
    }
  } finally {
    rl.close();
  }
}

getAllModulesRefreshToken();