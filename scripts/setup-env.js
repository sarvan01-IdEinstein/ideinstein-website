#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

console.log('🚀 Setting up IdEinstein environment...\n')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
const envExamplePath = path.join(process.cwd(), '.env.example')

if (fs.existsSync(envPath)) {
  console.log('✅ .env.local already exists')
  console.log('📝 Please ensure all required variables are configured:\n')
} else {
  // Copy .env.example to .env.local
  if (fs.existsSync(envExamplePath)) {
    let envContent = fs.readFileSync(envExamplePath, 'utf8')
    
    // Generate a random NextAuth secret
    const nextAuthSecret = crypto.randomBytes(32).toString('hex')
    envContent = envContent.replace('your_super_secret_key_here_make_it_long_and_random', nextAuthSecret)
    
    fs.writeFileSync(envPath, envContent)
    console.log('✅ Created .env.local from .env.example')
    console.log('🔑 Generated NextAuth secret automatically\n')
  } else {
    console.log('❌ .env.example not found')
    process.exit(1)
  }
}

console.log('📋 Required environment variables to configure:')
console.log('')
console.log('🔧 Zoho Integration (REQUIRED):')
console.log('   ZOHO_CLIENT_ID=your_zoho_client_id_here')
console.log('   ZOHO_CLIENT_SECRET=your_zoho_client_secret_here') 
console.log('   ZOHO_REFRESH_TOKEN=your_zoho_refresh_token_here')
console.log('   ZOHO_DOMAIN=https://accounts.zoho.eu (or .com for US)')
console.log('')
console.log('🔐 Google OAuth (Optional):')
console.log('   GOOGLE_CLIENT_ID=your_google_client_id_here')
console.log('   GOOGLE_CLIENT_SECRET=your_google_client_secret_here')
console.log('')
console.log('📧 Email Configuration (Optional):')
console.log('   SMTP_HOST=smtp.zoho.com')
console.log('   SMTP_USER=noreply@ideinstein.com')
console.log('   SMTP_PASS=your_email_password')
console.log('')
console.log('💳 Payment Processing (Future):')
console.log('   STRIPE_SECRET_KEY=your-stripe-secret-key')
console.log('   STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key')
console.log('')
console.log('🎯 Next Steps:')
console.log('1. Configure Zoho credentials in .env.local')
console.log('2. Run: npm run dev')
console.log('3. Test login with: demo@ideinstein.com / demo123')
console.log('4. Check customer portal at: http://localhost:3000/portal')
console.log('')
console.log('📚 For Zoho setup guide, see: ZOHO_SETUP_GUIDE.md')
console.log('')
console.log('✨ Happy coding!')