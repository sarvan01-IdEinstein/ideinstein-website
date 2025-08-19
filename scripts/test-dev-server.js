#!/usr/bin/env node

/**
 * Development Server Test Script
 * Tests if the development server can start without database
 */

const { spawn } = require('child_process')
const fs = require('fs')

console.log('🚀 Testing Development Server')
console.log('=============================\n')

// Check if we can start the dev server
console.log('📋 Pre-flight checks...')

// Check critical files
const criticalFiles = [
  'app/page.tsx',
  'app/layout.tsx',
  'next.config.js',
  'package.json'
]

let filesOk = true
criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} missing`)
    filesOk = false
  }
})

if (!filesOk) {
  console.log('❌ Critical files missing - cannot start server')
  process.exit(1)
}

console.log('\n🔧 Environment check...')
const envExists = fs.existsSync('.env.local')
console.log(`${envExists ? '✅' : '⚠️'} .env.local ${envExists ? 'exists' : 'missing (will use defaults)'}`)

console.log('\n🚀 Starting development server...')
console.log('================================')
console.log('This will test if the core website loads without database.')
console.log('Press Ctrl+C to stop the server when testing is complete.\n')

// Start the development server
const devServer = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
})

// Handle server events
devServer.on('error', (error) => {
  console.error('❌ Failed to start development server:', error.message)
  process.exit(1)
})

devServer.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ Development server stopped successfully')
  } else {
    console.log(`\n⚠️ Development server exited with code ${code}`)
  }
})

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping development server...')
  devServer.kill('SIGINT')
})

// Provide testing instructions
setTimeout(() => {
  console.log('\n🧪 Testing Instructions:')
  console.log('========================')
  console.log('1. 🏠 Open: http://localhost:3000')
  console.log('2. ✅ Verify homepage loads')
  console.log('3. 🔍 Check navigation works')
  console.log('4. 📝 Test quote form (may not submit without DB)')
  console.log('5. 🔒 Try accessing /portal (should redirect to signin)')
  console.log('6. 📱 Test mobile responsiveness')
  console.log('\n💡 If everything loads, the core website is working!')
  console.log('⚠️ Database features will need DB setup to work fully.')
}, 3000)