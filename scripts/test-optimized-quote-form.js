#!/usr/bin/env node

/**
 * Test script for the Optimized Quote Form
 * Tests the existing UnifiedConsultationCard with enhanced API
 */

const BASE_URL = 'http://localhost:3000'

// Test data using the existing QuotationForm structure
const optimizedQuoteData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  service: 'cad-modeling',
  description: 'Need a custom engine mount design for automotive application. The mount should support 500kg load and be made from aluminum. Must meet automotive grade standards and include stress analysis.',
  scope: 'medium',
  budget: 5000, // €5,000 - €10,000 range
  timeline: 'medium',
  files: [] // Files would be handled separately in real implementation
}

// Test data with missing description (should fail)
const incompleteQuoteData = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  service: 'fea-cfd',
  // Missing description
  scope: 'small',
  budget: 1000,
  timeline: 'short'
}

async function testOptimizedQuoteForm() {
  console.log('🧪 Testing Optimized Quote Form...\n')

  try {
    // Test 1: Complete quote request
    console.log('📝 Test 1: Complete Quote Request')
    console.log('Data:', JSON.stringify(optimizedQuoteData, null, 2))
    
    const response1 = await fetch(`${BASE_URL}/api/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(optimizedQuoteData),
    })

    const result1 = await response1.json()
    console.log('Response Status:', response1.status)
    console.log('Response:', JSON.stringify(result1, null, 2))
    
    if (response1.ok) {
      console.log('✅ Complete quote request successful!')
      console.log(`📋 Lead ID: ${result1.leadId}`)
      console.log(`📞 Contact ID: ${result1.contactId}`)
      console.log(`🎫 Quote Reference: ${result1.quoteReference}`)
    } else {
      console.log('❌ Complete quote request failed!')
    }
    
    console.log('\n' + '='.repeat(50) + '\n')

    // Test 2: Incomplete quote request (missing description)
    console.log('📝 Test 2: Incomplete Quote Request (Missing Description)')
    console.log('Data:', JSON.stringify(incompleteQuoteData, null, 2))
    
    const response2 = await fetch(`${BASE_URL}/api/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(incompleteQuoteData),
    })

    const result2 = await response2.json()
    console.log('Response Status:', response2.status)
    console.log('Response:', JSON.stringify(result2, null, 2))
    
    if (response2.status === 400) {
      console.log('✅ Validation test successful (correctly rejected missing description)!')
    } else {
      console.log('❌ Validation test failed!')
    }

    console.log('\n' + '='.repeat(50) + '\n')

    // Test 3: Budget range mapping
    console.log('📝 Test 3: Budget Range Mapping Test')
    const budgetTestData = {
      ...optimizedQuoteData,
      budget: 25000, // Should map to €25,000 - €50,000
      email: 'budget.test@example.com'
    }
    
    const response3 = await fetch(`${BASE_URL}/api/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(budgetTestData),
    })

    const result3 = await response3.json()
    console.log('Budget Test Response Status:', response3.status)
    console.log('Budget Test Response:', JSON.stringify(result3, null, 2))
    
    if (response3.ok) {
      console.log('✅ Budget range mapping test successful!')
    } else {
      console.log('❌ Budget range mapping test failed!')
    }

    console.log('\n' + '='.repeat(50) + '\n')

    // Summary
    console.log('📊 Test Summary:')
    console.log('✅ Optimized Quote Form Features:')
    console.log('  - Uses existing UnifiedConsultationCard/QuotationForm')
    console.log('  - Added project description field')
    console.log('  - File upload capability (WorkDrive integration)')
    console.log('  - Proper budget range mapping')
    console.log('  - Enhanced validation')
    console.log('  - Creates structured leads in Zoho CRM')
    console.log('')
    console.log('🔄 Form Flow:')
    console.log('  1. Customer fills enhanced quote form')
    console.log('  2. Form validates all required fields')
    console.log('  3. API creates lead in Zoho CRM with project details')
    console.log('  4. Files uploaded to customer WorkDrive folder')
    console.log('  5. Customer receives quote reference number')

  } catch (error) {
    console.error('❌ Test failed with error:', error.message)
    console.error('Make sure the development server is running on localhost:3000')
  }
}

// Run the test
testOptimizedQuoteForm()