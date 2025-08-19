#!/usr/bin/env node

/**
 * Production Test Script
 * Tests production deployment
 */

const https = require('https')

const PRODUCTION_URL = process.env.PRODUCTION_URL || 'https://yourdomain.com'

console.log('🧪 Testing Production Deployment')
console.log('===============================\n')

async function testEndpoint(path, expectedStatus = 200) {
  return new Promise((resolve) => {
    const url = PRODUCTION_URL + path
    console.log(`Testing: ${url}`)
    
    https.get(url, (res) => {
      const success = res.statusCode === expectedStatus
      console.log(`${success ? '✅' : '❌'} ${path} - Status: ${res.statusCode}`)
      resolve(success)
    }).on('error', (err) => {
      console.log(`❌ ${path} - Error: ${err.message}`)
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
  
  console.log('\n🔒 Testing authentication...')
  await testEndpoint('/auth/signin')
  await testEndpoint('/auth/signup')
  
  console.log('\n🔌 Testing API endpoints...')
  await testEndpoint('/api/health', 200)
  await testEndpoint('/api/auth/session', 401) // Should require auth
  
  console.log('\n🎯 Production deployment test complete!')
}

runTests()
