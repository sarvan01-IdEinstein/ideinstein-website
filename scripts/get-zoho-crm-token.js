#!/usr/bin/env node

const axios = require("axios");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function getZohoCRMToken() {
  console.log("🔑 Zoho CRM Token Generator (Minimal Test)");
  console.log("==========================================\n");

  try {
    // Get user inputs
    const clientId = await askQuestion("Enter your Zoho Client ID: ");
    const clientSecret = await askQuestion("Enter your Zoho Client Secret: ");
    const domain =
      (await askQuestion(
        "Enter your Zoho domain (in/eu/com) [default: in]: "
      )) || "in";

    const zohoDomain = `https://accounts.zoho.${domain}`;
    const redirectUri = "http://localhost:3000/oauth/callback";

    // Generate authorization URL with ONLY CRM scope
    const authUrl =
      `${zohoDomain}/oauth/v2/auth?` +
      `scope=ZohoCRM.modules.ALL&` +  // ONLY CRM scope
      `client_id=${clientId}&` +
      `response_type=code&` +
      `access_type=offline&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `prompt=consent`;

    console.log("\n📋 Testing with CRM scope only:");
    console.log("1. Make sure you have Zoho CRM enabled at: https://crm.zoho.in");
    console.log("2. Open this URL in your browser:");
    console.log(`\n${authUrl}\n`);
    console.log("3. Login to your Zoho account");
    console.log("4. Accept the CRM permissions");
    console.log('5. Copy the "code" parameter from the redirect URL');
    console.log(
      "   (It will look like: http://localhost:3000/oauth/callback?code=XXXXXX)"
    );

    const authCode = await askQuestion("\nEnter the authorization code: ");

    console.log("\n🔄 Exchanging authorization code for refresh token...");

    // Exchange authorization code for tokens
    const response = await axios.post(`${zohoDomain}/oauth/v2/token`, null, {
      params: {
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code: authCode,
      },
    });

    console.log("\n✅ Success! CRM Token obtained:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Access Token:", response.data.access_token);
    console.log("🔑 Refresh Token:", response.data.refresh_token);
    console.log("Expires in:", response.data.expires_in, "seconds");
    console.log("Token Type:", response.data.token_type);

    console.log("\n📝 Add these to your .env.local file:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`ZOHO_CLIENT_ID=${clientId}`);
    console.log(`ZOHO_CLIENT_SECRET=${clientSecret}`);
    console.log(`ZOHO_REFRESH_TOKEN=${response.data.refresh_token}`);
    console.log(`ZOHO_DOMAIN=${zohoDomain}`);

    console.log("\n🧪 Test CRM API:");
    console.log("Once you add the token to .env.local, test with:");
    console.log("npm run dev");
    console.log("Register a new user - should create contact in Zoho CRM");

    console.log("\n🎯 Next Steps:");
    console.log("1. Test CRM integration first");
    console.log("2. Then add other services one by one");
    console.log("3. Enable Projects, Books, WorkDrive separately");

  } catch (error) {
    console.error("\n❌ Error getting CRM token:");
    if (error.response?.data) {
      console.error("Response:", JSON.stringify(error.response.data, null, 2));
      
      // Specific error handling
      if (error.response.data.error === 'invalid_scope') {
        console.log("\n🔧 Scope Error Solutions:");
        console.log("1. Make sure Zoho CRM is enabled: https://crm.zoho.in");
        console.log("2. Check if your Zoho account has CRM access");
        console.log("3. Try creating a new app in API console");
        console.log("4. Verify Client ID and Secret are correct");
      }
    } else {
      console.error("Error:", error.message);
    }

    console.log("\n🔧 Troubleshooting Steps:");
    console.log("• Verify Zoho CRM is enabled in your account");
    console.log("• Check Client ID and Secret are correct");
    console.log("• Ensure redirect URI matches in Zoho console");
    console.log("• Try with a fresh authorization code");
  } finally {
    rl.close();
  }
}

// Run the script
getZohoCRMToken();