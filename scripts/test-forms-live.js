#!/usr/bin/env node

/**
 * Live Form Testing Script
 * Tests form submissions to ensure Zoho integration works
 */

console.log('🧪 Live Form Testing with Zoho Integration')
console.log('==========================================\n')

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000'

// Test data
const testData = {
  contact: {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Contact Form',
    message: 'This is a test message from the automated form testing script.',
    phone: '+1234567890',
    company: 'Test Company'
  },
  consultation: {
    name: 'John Doe',
    email: 'john.doe@testcompany.com',
    company: 'Test Engineering Co',
    phone: '+1987654321',
    serviceType: 'cad-modeling',
    projectDescription: 'We need CAD modeling services for a new product design. The project involves creating 3D models for manufacturing.',
    timeline: '1-month',
    budget: '15k-50k',
    preferredContactMethod: 'email'
  },
  quote: {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    service: 'machine-design',
    description: 'Need machine design services for industrial automation project',
    scope: 'medium',
    budget: 25000,
    timeline: 'medium'
  },
  newsletter: {
    email: 'newsletter@test.com',
    name: 'Newsletter Subscriber'
  }
}

async function testForm(endpoint, data, formName) {
  try {
    console.log(`📝 Testing ${formName} form...`)
    console.log(`🔗 Endpoint: ${BASE_URL}/api/${endpoint}`)
    
    const response = await fetch(`${BASE_URL}/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    
    const result = await response.json()
    
    if (response.ok) {
      console.log(`✅ ${formName} form test PASSED`)
      console.log(`   Status: ${response.status}`)
      console.log(`   Message: ${result.message}`)
      if (result.contactId) console.log(`   Zoho Contact ID: ${result.contactId}`)
      if (result.leadId) console.log(`   Zoho Lead ID: ${result.leadId}`)
      if (result.quoteReference) console.log(`   Quote Reference: ${result.quoteReference}`)
      return true
    } else {
      console.log(`❌ ${formName} form test FAILED`)
      console.log(`   Status: ${response.status}`)
      console.log(`   Error: ${result.message || result.error}`)
      if (result.errors) {
        console.log(`   Validation Errors:`, result.errors)
      }
      return false
    }
  } catch (error) {
    console.log(`❌ ${formName} form test ERROR`)
    console.log(`   Error: ${error.message}`)
    return false
  }
}

async function runFormTests() {
  console.log('🚀 Starting form integration tests...\n')
  
  const results = {
    contact: false,
    consultation: false,
    quote: false,
    newsletter: false
  }
  
  // Test Contact Form
  results.contact = await testForm('contact', testData.contact, 'Contact')
  console.log('')
  
  // Test Consultation Form
  results.consultation = await testForm('consultation', testData.consultation, 'Consultation')
  console.log('')
  
  // Test Quote Form
  results.quote = await testForm('quotes', testData.quote, 'Quote')
  console.log('')
  
  // Test Newsletter Form
  results.newsletter = await testForm('newsletter', testData.newsletter, 'Newsletter')
  console.log('')
  
  // Summary
  console.log('📊 Form Testing Summary')
  console.log('======================')
  
  const passedTests = Object.values(results).filter(Boolean).length
  const totalTests = Object.keys(results).length
  
  Object.entries(results).forEach(([form, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${form.charAt(0).toUpperCase() + form.slice(1)} Form: ${passed ? 'PASSED' : 'FAILED'}`)
  })
  
  console.log(`\n📈 Results: ${passedTests}/${totalTests} tests passed`)
  
  if (passedTests === totalTests) {
    console.log('\n🎉 ALL FORMS WORKING PERFECTLY!')
    console.log('✅ Zoho integration is functioning correctly')
    console.log('✅ Forms are ready for production deployment')
  } else {
    console.log('\n⚠️ Some forms need attention')
    console.log('Check the failed tests above')
  }
  
  console.log('\n🔍 Next Steps:')
  console.log('==============')
  if (passedTests > 0) {
    console.log('1. ✅ Check Zoho CRM for test records')
    console.log('2. ✅ Verify data accuracy in Zoho')
    console.log('3. 🚀 Deploy to production')
    console.log('4. 🧪 Test forms in production')
  }
  
  if (passedTests < totalTests) {
    console.log('1. 🔧 Fix failed form integrations')
    console.log('2. 🧪 Re-run tests')
    console.log('3. 🚀 Deploy when all tests pass')
  }
  
  console.log('\n💡 Zoho CRM Check:')
  console.log('==================')
  console.log('• Login to Zoho CRM')
  console.log('• Check Contacts module for test contact')
  console.log('• Check Leads module for consultation/quote requests')
  console.log('• Verify all data was captured correctly')
  
  return passedTests === totalTests
}

// Run tests if this script is executed directly
if (require.main === module) {
  runFormTests().then(allPassed => {
    process.exit(allPassed ? 0 : 1)
  }).catch(error => {
    console.error('❌ Test execution failed:', error)
    process.exit(1)
  })
}

module.exports = { runFormTests, testForm }