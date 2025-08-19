#!/usr/bin/env node

/**
 * Test script for the Quote API endpoint
 * Tests both anonymous and authenticated quote submissions
 */

const BASE_URL = 'http://localhost:3000'

// Test data for anonymous quote request
const anonymousQuoteData = {
  projectType: 'cad_modeling',
  projectTitle: 'Test Engine Mount Design',
  description: 'Need a custom engine mount for automotive application',
  requirements: 'Must support 500kg load, aluminum material, automotive grade',
  timeline: 'normal',
  budget: '1k_5k',
  priority: 'normal',
  
  // Contact info for anonymous user
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  company: 'Test Engineering Corp',
  phone: '+49 123 456 7890'
}

// Test data for logged-in user (no contact info needed)
const loggedInQuoteData = {
  projectType: 'fea_cfd',
  projectTitle: 'Stress Analysis for Bracket',
  description: 'Need FEA analysis for structural bracket design',
  requirements: 'Static and dynamic analysis, safety factor 2.5',
  timeline: 'urgent',
  budget: '5k_10k',
  priority: 'high'
}

async function testQuoteAPI() {
  console.log('🧪 Testing Quote API...\n')

  try {
    // Test 1: Anonymous quote request
    console.log('📝 Test 1: Anonymous Quote Request')
    console.log('Data:', JSON.stringify(anonymousQuoteData, null, 2))
    
    const response1 = await fetch(`${BASE_URL}/api/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(anonymousQuoteData),
    })

    const result1 = await response1.json()
    console.log('Response Status:', response1.status)
    console.log('Response:', JSON.stringify(result1, null, 2))
    
    if (response1.ok) {
      console.log('✅ Anonymous quote request successful!')
    } else {
      console.log('❌ Anonymous quote request failed!')
    }
    
    console.log('\n' + '='.repeat(50) + '\n')

    // Test 2: Validation test (missing required field)
    console.log('📝 Test 2: Validation Test (Missing Required Field)')
    const invalidData = { ...anonymousQuoteData }
    delete invalidData.projectTitle
    
    const response2 = await fetch(`${BASE_URL}/api/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidData),
    })

    const result2 = await response2.json()
    console.log('Response Status:', response2.status)
    console.log('Response:', JSON.stringify(result2, null, 2))
    
    if (response2.status === 400) {
      console.log('✅ Validation test successful (correctly rejected)!')
    } else {
      console.log('❌ Validation test failed!')
    }

    console.log('\n' + '='.repeat(50) + '\n')

    // Test 3: Missing contact info for anonymous user
    console.log('📝 Test 3: Missing Contact Info for Anonymous User')
    const noContactData = {
      projectType: 'machine_design',
      projectTitle: 'Test Machine Design',
      description: 'Test description',
      requirements: 'Test requirements'
      // Missing contact info
    }
    
    const response3 = await fetch(`${BASE_URL}/api/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noContactData),
    })

    const result3 = await response3.json()
    console.log('Response Status:', response3.status)
    console.log('Response:', JSON.stringify(result3, null, 2))
    
    if (response3.status === 400) {
      console.log('✅ Contact validation test successful (correctly rejected)!')
    } else {
      console.log('❌ Contact validation test failed!')
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error.message)
    console.error('Make sure the development server is running on localhost:3000')
  }
}

// Run the test
testQuoteAPI()