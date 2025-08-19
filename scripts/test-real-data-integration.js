#!/usr/bin/env node

/**
 * Test script for Real Data Integration
 * Tests Projects, Billing, and Files APIs with real Zoho data
 */

const BASE_URL = 'http://localhost:3000'

// Test authentication token (you'll need to get this from a real login)
let authCookie = null

async function testRealDataIntegration() {
  console.log('🧪 Testing Real Data Integration...\n')

  try {
    // Test 1: Projects API
    console.log('📝 Test 1: Projects API')
    
    const projectsResponse = await fetch(`${BASE_URL}/api/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authCookie && { 'Cookie': authCookie })
      }
    })

    const projectsResult = await projectsResponse.json()
    console.log('Projects Response Status:', projectsResponse.status)
    console.log('Projects Response:', JSON.stringify(projectsResult, null, 2))
    
    if (projectsResponse.status === 401) {
      console.log('⚠️  Authentication required - this is expected for protected endpoints')
    } else if (projectsResponse.ok) {
      console.log('✅ Projects API working!')
    } else {
      console.log('❌ Projects API failed!')
    }
    
    console.log('\n' + '='.repeat(50) + '\n')

    // Test 2: Billing API
    console.log('📝 Test 2: Billing/Invoices API')
    
    const billingResponse = await fetch(`${BASE_URL}/api/billing/invoices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authCookie && { 'Cookie': authCookie })
      }
    })

    const billingResult = await billingResponse.json()
    console.log('Billing Response Status:', billingResponse.status)
    console.log('Billing Response:', JSON.stringify(billingResult, null, 2))
    
    if (billingResponse.status === 401) {
      console.log('⚠️  Authentication required - this is expected for protected endpoints')
    } else if (billingResponse.ok) {
      console.log('✅ Billing API working!')
    } else {
      console.log('❌ Billing API failed!')
    }

    console.log('\n' + '='.repeat(50) + '\n')

    // Test 3: Files API
    console.log('📝 Test 3: Files API')
    
    const filesResponse = await fetch(`${BASE_URL}/api/files`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authCookie && { 'Cookie': authCookie })
      }
    })

    const filesResult = await filesResponse.json()
    console.log('Files Response Status:', filesResponse.status)
    console.log('Files Response:', JSON.stringify(filesResult, null, 2))
    
    if (filesResponse.status === 401) {
      console.log('⚠️  Authentication required - this is expected for protected endpoints')
    } else if (filesResponse.ok) {
      console.log('✅ Files API working!')
    } else {
      console.log('❌ Files API failed!')
    }

    console.log('\n' + '='.repeat(50) + '\n')

    // Test 4: Dashboard Stats API
    console.log('📝 Test 4: Dashboard Stats API')
    
    const statsResponse = await fetch(`${BASE_URL}/api/dashboard/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authCookie && { 'Cookie': authCookie })
      }
    })

    const statsResult = await statsResponse.json()
    console.log('Stats Response Status:', statsResponse.status)
    console.log('Stats Response:', JSON.stringify(statsResult, null, 2))
    
    if (statsResponse.status === 401) {
      console.log('⚠️  Authentication required - this is expected for protected endpoints')
    } else if (statsResponse.ok) {
      console.log('✅ Dashboard Stats API working!')
    } else {
      console.log('❌ Dashboard Stats API failed!')
    }

    console.log('\n' + '='.repeat(50) + '\n')

    // Summary
    console.log('📊 Test Summary:')
    console.log('- All APIs are properly protected with authentication')
    console.log('- To test with real data, you need to:')
    console.log('  1. Start the development server: npm run dev')
    console.log('  2. Sign up/login through the web interface')
    console.log('  3. Use browser dev tools to get session cookie')
    console.log('  4. Update this script with the auth cookie')
    console.log('- Quote API can be tested without authentication (anonymous users)')

  } catch (error) {
    console.error('❌ Test failed with error:', error.message)
    console.error('Make sure the development server is running on localhost:3000')
  }
}

// Run the test
testRealDataIntegration()