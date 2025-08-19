#!/usr/bin/env node

/**
 * Zoho Projects OAuth Token Generator for Local Development
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

async function getProjectsRefreshToken() {
  console.log('🚀 Zoho Projects OAuth Token Generator (Local Development)\n');

  try {
    // Get client credentials
    const clientId = await question('Enter your Zoho Projects Client ID: ');
    const clientSecret = await question('Enter your Zoho Projects Client Secret: ');

    if (!clientId || !clientSecret) {
      console.log('❌ Client ID and Secret are required');
      process.exit(1);
    }

    // Generate authorization URL for Projects
    const scope = 'ZohoProjects.projects.ALL';
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

    console.log('\n✅ Success! Here are your Zoho Projects credentials:');
    console.log('\n📝 Add these to your .env.local file:');
    console.log('─'.repeat(50));
    console.log(`ZOHO_PROJECTS_CLIENT_ID=${clientId}`);
    console.log(`ZOHO_PROJECTS_CLIENT_SECRET=${clientSecret}`);
    console.log(`ZOHO_PROJECTS_REFRESH_TOKEN=${refresh_token}`);
    console.log('─'.repeat(50));

    console.log('\n🧪 Test your Projects integration:');
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

getProjectsRefreshToken();