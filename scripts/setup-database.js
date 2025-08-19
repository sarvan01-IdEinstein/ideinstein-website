#!/usr/bin/env node

/**
 * Database Setup Script
 * Helps set up PostgreSQL database for IdEinstein
 */

const fs = require('fs')
const path = require('path')

console.log('🗄️ IdEinstein Database Setup')
console.log('============================\n')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
const envExamplePath = path.join(process.cwd(), '.env.example')

if (!fs.existsSync(envPath)) {
  console.log('📋 Creating .env.local from .env.example...')
  
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath)
    console.log('✅ .env.local created successfully!')
  } else {
    console.log('❌ .env.example not found!')
    process.exit(1)
  }
} else {
  console.log('✅ .env.local already exists')
}

console.log('\n🔧 Database Configuration Options:')
console.log('==================================')
console.log('1. 🌐 Use Neon (Recommended for production)')
console.log('   - Sign up at: https://neon.tech')
console.log('   - Create a new project')
console.log('   - Copy the connection string')
console.log('   - Format: postgresql://username:password@host/database?sslmode=require')
console.log('')
console.log('2. 🐘 Use Railway PostgreSQL')
console.log('   - Sign up at: https://railway.app')
console.log('   - Create a new project with PostgreSQL')
console.log('   - Copy the DATABASE_URL from environment variables')
console.log('')
console.log('3. 🏠 Use Local PostgreSQL')
console.log('   - Install PostgreSQL locally')
console.log('   - Create database: createdb ideinstein')
console.log('   - Format: postgresql://username:password@localhost:5432/ideinstein')
console.log('')
console.log('4. 🐳 Use Docker PostgreSQL')
console.log('   - Run: docker run --name ideinstein-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=ideinstein -p 5432:5432 -d postgres')
console.log('   - Format: postgresql://postgres:password@localhost:5432/ideinstein')

console.log('\n📝 Next Steps:')
console.log('==============')
console.log('1. Edit .env.local and set your DATABASE_URL')
console.log('2. Run: npm run db:push')
console.log('3. Run: npm run dev')

console.log('\n💡 Example DATABASE_URL formats:')
console.log('================================')
console.log('Neon:     postgresql://user:pass@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require')
console.log('Railway:  postgresql://postgres:pass@containers-us-west-xxx.railway.app:5432/railway')
console.log('Local:    postgresql://postgres:password@localhost:5432/ideinstein')

// Check current DATABASE_URL
try {
  require('dotenv').config({ path: envPath })
  const dbUrl = process.env.DATABASE_URL
  
  if (dbUrl && dbUrl !== 'postgresql://username:password@localhost:5432/ideinstein') {
    console.log('\n✅ DATABASE_URL is configured!')
    console.log('🚀 Ready to run: npm run db:push')
  } else {
    console.log('\n⚠️  DATABASE_URL needs to be configured in .env.local')
  }
} catch (error) {
  console.log('\n⚠️  Please configure DATABASE_URL in .env.local')
}

console.log('\n🔗 Helpful Links:')
console.log('=================')
console.log('Neon:     https://neon.tech')
console.log('Railway:  https://railway.app')
console.log('Prisma:   https://www.prisma.io/docs/getting-started')