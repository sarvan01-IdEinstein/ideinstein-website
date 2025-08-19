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

async function getZohoRefreshToken() {
  console.log("🔑 Zoho Refresh Token Generator");
  console.log("================================\n");

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

    // Generate authorization URL
    const authUrl =
      `${zohoDomain}/oauth/v2/auth?` +
      `scope=ZohoCRM.modules.ALL,ZohoProjects.projects.ALL,ZohoBooks.fullaccess.all,ZohoWorkDrive.files.ALL&` +
      `client_id=${clientId}&` +
      `response_type=code&` +
      `access_type=offline&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `prompt=consent`;

    console.log("\n📋 Steps to get your refresh token:");
    console.log("1. Open this URL in your browser:");
    console.log(`\n${authUrl}\n`);
    console.log("2. Login to your Zoho account");
    console.log("3. Accept the permissions");
    console.log('4. Copy the "code" parameter from the redirect URL');
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

    console.log("\n✅ Success! Your tokens:");
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

    console.log("\n🎉 You can now test the full Zoho integration!");
    console.log("Run: npm run dev");
    console.log("Test: http://localhost:3000/auth/signin");
  } catch (error) {
    console.error("\n❌ Error getting refresh token:");
    if (error.response?.data) {
      console.error("Response:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Error:", error.message);
    }

    console.log("\n🔧 Common issues:");
    console.log("• Make sure your Client ID and Secret are correct");
    console.log("• Verify the authorization code is fresh (expires quickly)");
    console.log("• Check that redirect URI matches in Zoho console");
    console.log("• Ensure you have the right Zoho domain (.eu vs .com)");
  } finally {
    rl.close();
  }
}

// Run the script
getZohoRefreshToken();
