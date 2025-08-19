#!/usr/bin/env node

/**
 * Local Database Setup Script
 * Sets up SQLite for local development
 */

const fs = require('fs')
const path = require('path')

console.log('🗄️ Setting up local SQLite database...')
console.log('=====================================\n')

// Read current .env.local
const envPath = path.join(process.cwd(), '.env.local')
let envContent = ''

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8')
  console.log('✅ Found existing .env.local')
} else {
  console.log('❌ .env.local not found')
  process.exit(1)
}

// Check if DATABASE_URL is already set to SQLite
if (envContent.includes('DATABASE_URL="file:./dev.db"')) {
  console.log('✅ SQLite DATABASE_URL already configured')
} else {
  // Update DATABASE_URL to use SQLite
  if (envContent.includes('DATABASE_URL=')) {
    // Replace existing DATABASE_URL
    envContent = envContent.replace(
      /DATABASE_URL=.*/,
      'DATABASE_URL="file:./dev.db"'
    )
    console.log('🔄 Updated DATABASE_URL to use SQLite')
  } else {
    // Add DATABASE_URL
    envContent += '\n# Local SQLite Database\nDATABASE_URL="file:./dev.db"\n'
    console.log('➕ Added SQLite DATABASE_URL')
  }
  
  // Write updated .env.local
  fs.writeFileSync(envPath, envContent)
  console.log('✅ .env.local updated')
}

// Update Prisma schema to use SQLite
const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma')
if (fs.existsSync(schemaPath)) {
  let schemaContent = fs.readFileSync(schemaPath, 'utf8')
  
  // Update datasource to use SQLite
  if (schemaContent.includes('provider = "sqlite"')) {
    console.log('✅ Prisma schema already configured for SQLite')
  } else {
    schemaContent = schemaContent.replace(
      /provider = "postgresql"/,
      'provider = "sqlite"'
    )
    
    // Remove PostgreSQL-specific features for SQLite compatibility
    schemaContent = schemaContent.replace(/INET/g, 'String')
    schemaContent = schemaContent.replace(/BIGINT/g, 'Int')
    schemaContent = schemaContent.replace(/@default\(gen_random_uuid\(\)\)/g, '@default(cuid())')
    
    fs.writeFileSync(schemaPath, schemaContent)
    console.log('🔄 Updated Prisma schema for SQLite')
  }
} else {
  console.log('❌ Prisma schema not found')
  process.exit(1)
}

console.log('\n🚀 Local database setup complete!')
console.log('=================================')
console.log('✅ Using SQLite database (file:./dev.db)')
console.log('✅ No external database required')
console.log('✅ Perfect for local development')

console.log('\n📋 Next steps:')
console.log('==============')
console.log('1. npm run db:push    # Apply schema to SQLite')
console.log('2. npm run dev        # Start development server')
console.log('3. npm run db:studio  # View database (optional)')

console.log('\n💡 Benefits of SQLite setup:')
console.log('============================')
console.log('• 🚀 No external database needed')
console.log('• 📁 Database stored in ./dev.db file')
console.log('• 🔧 Perfect for development and testing')
console.log('• 🌐 Easy to switch to PostgreSQL later')

console.log('\n⚠️ Note: For production, use PostgreSQL with Neon or Railway')