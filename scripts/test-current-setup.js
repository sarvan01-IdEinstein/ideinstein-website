#!/usr/bin/env node

/**
 * Current Setup Test Script
 * Tests the current implementation and guides setup
 */

const fs = require('fs')
const { execSync } = require('child_process')

console.log('🧪 IdEinstein Current Setup Test')
console.log('================================\n')

// Test 1: Check environment
console.log('🔧 Checking environment setup...')
const envExists = fs.existsSync('.env.local')
console.log(`${envExists ? '✅' : '❌'} .env.local ${envExists ? 'exists' : 'missing'}`)

if (envExists) {
  try {
    require('dotenv').config({ path: '.env.local' })
    
    // Check critical environment variables
    const requiredVars = [
      'NEXTAUTH_SECRET',
      'NEXTAUTH_URL',
      'ZOHO_CLIENT_ID',
      'ZOHO_CLIENT_SECRET',
      'ZOHO_REFRESH_TOKEN'
    ]
    
    let envOk = true
    requiredVars.forEach(varName => {
      const value = process.env[varName]
      if (value && value !== `your_${varName.toLowerCase()}_here`) {
        console.log(`✅ ${varName} configured`)
      } else {
        console.log(`❌ ${varName} needs configuration`)
        envOk = false
      }
    })
    
    // Check DATABASE_URL
    const dbUrl = process.env.DATABASE_URL
    if (dbUrl && dbUrl !== 'postgresql://username:password@localhost:5432/ideinstein') {
      console.log('✅ DATABASE_URL configured')
    } else {
      console.log('⚠️ DATABASE_URL needs configuration (optional for basic testing)')
    }
    
  } catch (error) {
    console.log('❌ Error reading .env.local:', error.message)
  }
} else {
  console.log('⚠️ Run: npm run db:setup to create .env.local')
}

// Test 2: Check dependencies
console.log('\n📦 Checking dependencies...')
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  
  const criticalDeps = [
    '@prisma/client',
    'next-auth',
    'prisma',
    'react',
    'next'
  ]
  
  let depsOk = true
  criticalDeps.forEach(dep => {
    if (pkg.dependencies?.[dep] || pkg.devDependencies?.[dep]) {
      console.log(`✅ ${dep}`)
    } else {
      console.log(`❌ ${dep} missing`)
      depsOk = false
    }
  })
  
  if (depsOk) {
    console.log('✅ All critical dependencies present')
  }
} catch (error) {
  console.log('❌ Error checking dependencies:', error.message)
}

// Test 3: Check Prisma setup
console.log('\n🗄️ Checking Prisma setup...')
try {
  // Check if Prisma client is generated
  const prismaClientExists = fs.existsSync('node_modules/@prisma/client')
  console.log(`${prismaClientExists ? '✅' : '❌'} Prisma client ${prismaClientExists ? 'generated' : 'needs generation'}`)
  
  if (!prismaClientExists) {
    console.log('⚠️ Run: npm run db:generate')
  }
  
  // Check schema
  const schemaExists = fs.existsSync('prisma/schema.prisma')
  console.log(`${schemaExists ? '✅' : '❌'} Prisma schema ${schemaExists ? 'exists' : 'missing'}`)
  
} catch (error) {
  console.log('❌ Error checking Prisma:', error.message)
}

// Test 4: Check Zoho integration files
console.log('\n🔗 Checking Zoho integration...')
const zohoFiles = [
  'lib/zoho/index.ts',
  'lib/zoho/crm.ts',
  'lib/zoho/projects.ts',
  'lib/zoho/books.ts',
  'lib/zoho/workdrive.ts'
]

let zohoOk = true
zohoFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} missing`)
    zohoOk = false
  }
})

if (zohoOk) {
  console.log('✅ Zoho integration files present')
}

// Test 5: Check new Phase 1 files
console.log('\n🚀 Checking Phase 1 enhancements...')
const phase1Files = [
  'lib/rbac.ts',
  'lib/audit.ts',
  'lib/cache.ts'
]

let phase1Ok = true
phase1Files.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} missing`)
    phase1Ok = false
  }
})

// Test 6: Check API routes
console.log('\n🔌 Checking API routes...')
const apiRoutes = [
  'app/api/auth/signup/route.ts',
  'app/api/projects/route.ts',
  'app/api/billing/invoices/route.ts',
  'app/api/quotes/route.ts'
]

let apiOk = true
apiRoutes.forEach(route => {
  if (fs.existsSync(route)) {
    console.log(`✅ ${route}`)
  } else {
    console.log(`❌ ${route} missing`)
    apiOk = false
  }
})

// Test 7: Check frontend components
console.log('\n🎨 Checking frontend components...')
const frontendFiles = [
  'app/portal/page.tsx',
  'app/auth/signin/page.tsx',
  'app/auth/signup/page.tsx',
  'components/shared/QuotationForm.tsx'
]

let frontendOk = true
frontendFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} missing`)
    frontendOk = false
  }
})

// Summary and recommendations
console.log('\n📊 Setup Status Summary')
console.log('======================')

const allOk = envExists && zohoOk && phase1Ok && apiOk && frontendOk

if (allOk) {
  console.log('🎉 All core files present!')
  console.log('✅ Ready for testing')
} else {
  console.log('⚠️ Some files missing - check implementation')
}

console.log('\n🚀 Next Steps')
console.log('=============')

if (!envExists) {
  console.log('1. 📝 Run: npm run db:setup')
  console.log('2. 🔧 Configure .env.local with your credentials')
}

console.log('3. 📦 Run: npm install (if not done)')
console.log('4. 🗄️ Run: npm run db:generate')

if (process.env.DATABASE_URL && process.env.DATABASE_URL !== 'postgresql://username:password@localhost:5432/ideinstein') {
  console.log('5. 🗄️ Run: npm run db:push')
} else {
  console.log('5. 🗄️ Configure DATABASE_URL and run: npm run db:push (optional)')
}

console.log('6. 🚀 Run: npm run dev')
console.log('7. 🧪 Test at: http://localhost:3000')

console.log('\n🧪 Testing Checklist')
console.log('===================')
console.log('• 🏠 Homepage loads correctly')
console.log('• 📝 Signup/signin works')
console.log('• 🏢 Customer portal accessible')
console.log('• 📊 Dashboard shows data')
console.log('• 📋 Quote form works')
console.log('• 🔒 Authentication required for portal')

console.log('\n💡 Quick Test Commands')
console.log('=====================')
console.log('npm run dev          # Start development server')
console.log('npm run db:studio    # Open database browser (if DB configured)')
console.log('npm run lint         # Check code quality')
console.log('npm run type-check   # Check TypeScript')

if (allOk) {
  console.log('\n🎯 Ready to launch! Your IdEinstein platform is set up correctly.')
} else {
  console.log('\n⚠️ Please address the missing files/configuration above.')
}