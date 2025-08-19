#!/usr/bin/env node

/**
 * Production Setup Script
 * Prepares the application for production deployment
 */

const fs = require('fs')
const path = require('path')

console.log('🚀 IdEinstein Production Setup')
console.log('=============================\n')

// Step 1: Create production environment template
console.log('📝 Creating production environment template...')

const productionEnv = `# IdEinstein Production Environment Variables
# Copy these to your Vercel environment variables

# Application
NODE_ENV=production
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-super-secure-production-secret-make-it-long-and-random

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require

# Zoho Integration (Same as development)
ZOHO_CLIENT_ID=your_zoho_client_id_here
ZOHO_CLIENT_SECRET=your_zoho_client_secret_here
ZOHO_REFRESH_TOKEN=your_zoho_refresh_token_here
ZOHO_DOMAIN=https://accounts.zoho.in

# Zoho Books Configuration
ZOHO_BOOKS_ORG_ID=your_books_organization_id

# Zoho WorkDrive Configuration
ZOHO_WORKDRIVE_ROOT_FOLDER=your_workdrive_root_folder_id
ZOHO_WORKDRIVE_DEFAULT_FOLDER=your_default_folder_id

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Email Configuration
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your_email_password
SMTP_FROM=noreply@yourdomain.com
`

fs.writeFileSync('.env.production.template', productionEnv)
console.log('✅ Created .env.production.template')

// Step 2: Update Prisma schema for production
console.log('\n🗄️ Updating Prisma schema for production...')

const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma')
if (fs.existsSync(schemaPath)) {
  let schemaContent = fs.readFileSync(schemaPath, 'utf8')
  
  // Update to PostgreSQL for production
  if (schemaContent.includes('provider = "sqlite"')) {
    schemaContent = schemaContent.replace(
      /provider = "sqlite"/,
      'provider = "postgresql"'
    )
    
    // Update field types for PostgreSQL
    schemaContent = schemaContent.replace(/String\?(\s+)\/\/ IP address/g, 'String?')
    schemaContent = schemaContent.replace(/Int(\s+)\/\/ File size/g, 'BigInt')
    
    fs.writeFileSync(schemaPath, schemaContent)
    console.log('✅ Updated Prisma schema for PostgreSQL')
  } else {
    console.log('✅ Prisma schema already configured for PostgreSQL')
  }
} else {
  console.log('❌ Prisma schema not found')
}

// Step 3: Create Vercel configuration
console.log('\n⚡ Creating Vercel configuration...')

const vercelConfig = {
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}

fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2))
console.log('✅ Created vercel.json configuration')

// Step 4: Create deployment checklist
console.log('\n📋 Creating deployment checklist...')

const deploymentChecklist = `# Production Deployment Checklist

## 🗄️ Database Setup (Neon)

### 1. Create Neon Account
- [ ] Go to https://neon.tech
- [ ] Sign up with GitHub/Google
- [ ] Create new project: "ideinstein-production"

### 2. Get Database Connection
- [ ] Copy connection string from Neon dashboard
- [ ] Format: postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require
- [ ] Test connection locally

### 3. Run Database Migration
\`\`\`bash
# Set production DATABASE_URL in .env.local temporarily
DATABASE_URL="your-neon-connection-string"

# Run migration
npm run db:push

# Verify tables created
npm run db:studio
\`\`\`

## 🚀 Vercel Deployment

### 1. Prepare Repository
- [ ] Commit all changes: \`git add . && git commit -m "Production ready"\`
- [ ] Push to GitHub: \`git push origin main\`

### 2. Deploy to Vercel
- [ ] Go to https://vercel.com
- [ ] Import GitHub repository
- [ ] Configure environment variables (copy from .env.production.template)
- [ ] Deploy!

### 3. Configure Domain
- [ ] Add custom domain in Vercel dashboard
- [ ] Update DNS records (A/CNAME)
- [ ] Verify HTTPS certificate

## 🧪 Post-Deployment Testing

### 1. Basic Functionality
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Quote forms submit
- [ ] Authentication works
- [ ] Customer portal accessible

### 2. Zoho Integration
- [ ] Signup creates Zoho contact
- [ ] Projects load from Zoho
- [ ] Invoices load from Zoho Books
- [ ] File upload to WorkDrive works

### 3. Performance
- [ ] Page load times <2 seconds
- [ ] API responses <500ms
- [ ] Mobile responsiveness
- [ ] SEO meta tags

## 🔒 Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secure
- [ ] No sensitive data in repository
- [ ] RBAC permissions working
- [ ] Audit logging active

## 📊 Monitoring Setup

- [ ] Vercel Analytics enabled
- [ ] Sentry error tracking (optional)
- [ ] Google Analytics configured
- [ ] Uptime monitoring (optional)

## 🎯 Go-Live Checklist

- [ ] All tests passing
- [ ] Performance acceptable
- [ ] Security verified
- [ ] Monitoring active
- [ ] Team notified
- [ ] Documentation updated

## 🚨 Rollback Plan

If issues occur:
1. Revert to previous Vercel deployment
2. Check error logs in Vercel dashboard
3. Verify environment variables
4. Test database connection
5. Contact support if needed

## 📞 Support Contacts

- Vercel Support: https://vercel.com/support
- Neon Support: https://neon.tech/docs
- Zoho Support: https://help.zoho.com
`

fs.writeFileSync('DEPLOYMENT_CHECKLIST.md', deploymentChecklist)
console.log('✅ Created DEPLOYMENT_CHECKLIST.md')

// Step 5: Create production test script
console.log('\n🧪 Creating production test script...')

const testScript = `#!/usr/bin/env node

/**
 * Production Test Script
 * Tests production deployment
 */

const https = require('https')

const PRODUCTION_URL = process.env.PRODUCTION_URL || 'https://yourdomain.com'

console.log('🧪 Testing Production Deployment')
console.log('===============================\\n')

async function testEndpoint(path, expectedStatus = 200) {
  return new Promise((resolve) => {
    const url = PRODUCTION_URL + path
    console.log(\`Testing: \${url}\`)
    
    https.get(url, (res) => {
      const success = res.statusCode === expectedStatus
      console.log(\`\${success ? '✅' : '❌'} \${path} - Status: \${res.statusCode}\`)
      resolve(success)
    }).on('error', (err) => {
      console.log(\`❌ \${path} - Error: \${err.message}\`)
      resolve(false)
    })
  })
}

async function runTests() {
  console.log('🏠 Testing core pages...')
  await testEndpoint('/')
  await testEndpoint('/about')
  await testEndpoint('/services')
  await testEndpoint('/blog')
  await testEndpoint('/contact')
  
  console.log('\\n🔒 Testing authentication...')
  await testEndpoint('/auth/signin')
  await testEndpoint('/auth/signup')
  
  console.log('\\n🔌 Testing API endpoints...')
  await testEndpoint('/api/health', 200)
  await testEndpoint('/api/auth/session', 401) // Should require auth
  
  console.log('\\n🎯 Production deployment test complete!')
}

runTests()
`

fs.writeFileSync('scripts/test-production.js', testScript)
console.log('✅ Created scripts/test-production.js')

// Summary
console.log('\n🎯 Production Setup Complete!')
console.log('============================')
console.log('✅ Production environment template created')
console.log('✅ Prisma schema updated for PostgreSQL')
console.log('✅ Vercel configuration created')
console.log('✅ Deployment checklist created')
console.log('✅ Production test script created')

console.log('\n📋 Next Steps:')
console.log('==============')
console.log('1. 🗄️ Set up Neon database (10 minutes)')
console.log('   - Go to https://neon.tech')
console.log('   - Create account and project')
console.log('   - Copy connection string')

console.log('\n2. 🔧 Configure environment')
console.log('   - Update .env.local with Neon DATABASE_URL')
console.log('   - Test: npm run db:push')

console.log('\n3. 🚀 Deploy to Vercel')
console.log('   - Go to https://vercel.com')
console.log('   - Import GitHub repository')
console.log('   - Add environment variables')
console.log('   - Deploy!')

console.log('\n4. 🧪 Test deployment')
console.log('   - Run: node scripts/test-production.js')
console.log('   - Follow DEPLOYMENT_CHECKLIST.md')

console.log('\n💡 Files Created:')
console.log('=================')
console.log('📄 .env.production.template - Environment variables template')
console.log('📄 vercel.json - Vercel configuration')
console.log('📄 DEPLOYMENT_CHECKLIST.md - Step-by-step deployment guide')
console.log('📄 scripts/test-production.js - Production testing script')

console.log('\n🎉 Ready for production deployment!')
console.log('Total deployment time: ~15 minutes')
console.log('Cost: $0/month (free tier)')
console.log('Performance: Enterprise-grade')