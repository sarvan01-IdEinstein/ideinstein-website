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

async function getZohoTokenFromCode() {
  console.log("🔑 Zoho Token Generator - From Authorization Code");
  console.log("=================================================\n");
  
  console.log("📋 Prerequisites:");
  console.log("1. Create Self Client in API console: https://api-console.zoho.in");
  console.log("2. Go to your Self Client > Generate Code tab");
  console.log("3. Enter scopes: ZohoCRM.modules.ALL,ZohoProjects.projects.ALL,ZohoBooks.fullaccess.all,ZohoWorkDrive.files.ALL");
  console.log("4. Click CREATE and copy the authorization code");
  console.log("5. Have your Client ID and Client Secret ready\n");

  try {
    // Get user inputs
    const clientId = await askQuestion("Enter your Zoho Client ID: ");
    const clientSecret = await askQuestion("Enter your Zoho Client Secret: ");
    const authCode = await askQuestion("Enter the Authorization Code (from API console Generate Code tab): ");
    const domain = (await askQuestion("Enter your Zoho domain (in/eu/com) [default: in]: ")) || "in";

    const zohoDomain = `https://accounts.zoho.${domain}`;

    console.log("\n🔄 Exchanging authorization code for refresh token...");

    // Exchange authorization code for tokens
    const response = await axios.post(`${zohoDomain}/oauth/v2/token`, null, {
      params: {
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        code: authCode,
      },
    });

    console.log("\n✅ Success! Your tokens:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Access Token:", response.data.access_token);
    console.log("🔑 Refresh Token:", response.data.refresh_token);
    console.log("API Domain:", response.data.api_domain);
    console.log("Token Type:", response.data.token_type);
    console.log("Expires in:", response.data.expires_in, "seconds");

    console.log("\n📝 Add these to your .env.local file:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`ZOHO_CLIENT_ID=${clientId}`);
    console.log(`ZOHO_CLIENT_SECRET=${clientSecret}`);
    console.log(`ZOHO_REFRESH_TOKEN=${response.data.refresh_token}`);
    console.log(`ZOHO_DOMAIN=${zohoDomain}`);

    console.log("\n🎉 Perfect! Now test the integration:");
    console.log("1. Add the above to your .env.local file");
    console.log("2. Run: npm run dev");
    console.log("3. Test: http://localhost:3000/auth/signin");
    console.log("4. Demo login: demo@ideinstein.com / demo123");
    console.log("5. Register new user → should create contact in Zoho CRM");

    console.log("\n🔧 API Domain Info:");
    console.log(`Your API calls should go to: ${response.data.api_domain}`);
    console.log("This is automatically handled by our Zoho service.");

  } catch (error) {
    console.error("\n❌ Error getting refresh token:");
    if (error.response?.data) {
      console.error("Response:", JSON.stringify(error.response.data, null, 2));
      
      // Specific error handling
      if (error.response.data.error === 'invalid_code') {
        console.log("\n🔧 Authorization Code Error:");
        console.log("• The authorization code has expired (default: 3 minutes)");
        console.log("• Generate a new code in API console > Generate Code tab");
        console.log("• Make sure to use the code immediately after generation");
      }
      
      if (error.response.data.error === 'invalid_client') {
        console.log("\n🔧 Client Credentials Error:");
        console.log("• Check your Client ID and Client Secret");
        console.log("• Make sure they're from the same Self Client");
        console.log("• Verify you're using the correct datacenter (.in/.eu/.com)");
      }
      
      if (error.response.data.error === 'invalid_scope') {
        console.log("\n🔧 Scope Error:");
        console.log("• Make sure you have access to all requested services");
        console.log("• Enable services: CRM, Projects, Books, WorkDrive");
        console.log("• Try with fewer scopes first (e.g., just ZohoCRM.modules.ALL)");
      }
    } else {
      console.error("Error:", error.message);
    }

    console.log("\n🔧 Troubleshooting Steps:");
    console.log("1. Verify Self Client is created correctly");
    console.log("2. Generate fresh authorization code (expires in 3 minutes)");
    console.log("3. Check Client ID and Secret are correct");
    console.log("4. Ensure all Zoho services are enabled in your account");
    console.log("5. Try with single scope first: ZohoCRM.modules.ALL");
  } finally {
    rl.close();
  }
}

// Run the script
getZohoTokenFromCode();