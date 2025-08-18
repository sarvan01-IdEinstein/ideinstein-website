#!/usr/bin/env node

console.log('🧪 Testing Contact Form API');
console.log('============================');

async function testContactForm() {
  try {
    // Test data that matches the form structure
    const testData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'This is a test message from the contact form to verify the API is working correctly.',
      phone: '+49 123 456 7890',
      service: 'CAD Modeling'
    };

    console.log('📝 Testing contact form with data:', testData);

    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log('📡 Response status:', response.status);
    
    const result = await response.json();
    console.log('📋 Response data:', result);

    if (response.ok) {
      console.log('✅ Contact form API is working!');
      console.log('🎉 Contact created successfully');
    } else {
      console.log('❌ Contact form API failed');
      console.log('Error details:', result);
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure your development server is running:');
      console.log('   npm run dev');
    }
  }
}

// Test quote form as well
async function testQuoteForm() {
  try {
    console.log('\n🧪 Testing Quote Form API');
    console.log('==========================');

    const testData = {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+49 987 654 3210',
      service: 'Machine Design',
      description: 'I need help with designing a custom machine for my manufacturing process.',
      timeline: 'Within 2 weeks',
      budget: '€5000-€10000'
    };

    console.log('📝 Testing quote form with data:', testData);

    const response = await fetch('http://localhost:3000/api/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log('📡 Response status:', response.status);
    
    const result = await response.json();
    console.log('📋 Response data:', result);

    if (response.ok) {
      console.log('✅ Quote form API is working!');
      console.log('🎉 Quote created successfully');
    } else {
      console.log('❌ Quote form API failed');
      console.log('Error details:', result);
    }

  } catch (error) {
    console.error('❌ Quote test failed with error:', error.message);
  }
}

// Run tests
testContactForm().then(() => testQuoteForm());