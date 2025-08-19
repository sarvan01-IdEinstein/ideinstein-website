#!/usr/bin/env node

/**
 * Test script for the new modular Zoho integration
 * Tests each service individually and together
 */

require('dotenv').config({ path: '.env.local' });

async function testModularIntegration() {
  console.log('🚀 Testing Modular Zoho Integration\n');

  try {
    // Import the new modular services
    const { zoho } = require('../lib/zoho/index.ts');

    // Step 1: Check configuration status
    console.log('1️⃣ Configuration Status:');
    const configStatus = zoho.getConfigurationStatus();
    
    console.log(`   CRM: ${configStatus.crm ? '✅ Configured' : '❌ Not configured'}`);
    console.log(`   Projects: ${configStatus.projects ? '✅ Configured' : '❌ Not configured'}`);
    console.log(`   Books: ${configStatus.books ? '✅ Configured' : '❌ Not configured'}`);
    console.log(`   WorkDrive: ${configStatus.workdrive ? '✅ Configured' : '❌ Not configured'}`);

    // Step 2: Test service connections
    console.log('\n2️⃣ Testing Service Connections:');
    const serviceStatus = await zoho.checkAllServices();
    
    console.log(`   CRM Connection: ${serviceStatus.crm ? '✅ Working' : '❌ Failed'}`);
    console.log(`   Projects Connection: ${serviceStatus.projects ? '✅ Working' : '❌ Failed'}`);
    console.log(`   Books Connection: ${serviceStatus.books ? '✅ Working' : '❌ Failed'}`);
    console.log(`   WorkDrive Connection: ${serviceStatus.workdrive ? '✅ Working' : '❌ Failed'}`);

    // Step 3: Test CRM (should work)
    if (serviceStatus.crm) {
      console.log('\n3️⃣ Testing CRM Service:');
      
      const testContact = {
        email: `modular.test.${Date.now()}@example.com`,
        first_name: 'Modular',
        last_name: 'Test',
        company: 'Modular Test Company'
      };

      try {
        const contact = await zoho.crm.createContact(testContact);
        console.log(`   ✅ Contact created: ${contact.id}`);
        
        // Test finding the contact
        const foundContact = await zoho.crm.findContactByEmail(testContact.email);
        if (foundContact) {
          console.log(`   ✅ Contact found: ${foundContact.first_name} ${foundContact.last_name}`);
        }
      } catch (error) {
        console.log(`   ❌ CRM test failed: ${error.message}`);
      }
    }

    // Step 4: Test Projects (if configured)
    if (serviceStatus.projects) {
      console.log('\n4️⃣ Testing Projects Service:');
      
      try {
        const projects = await zoho.projects.getProjects();
        console.log(`   ✅ Found ${projects.length} projects`);
        
        // Try to create a test project
        const testProject = {
          name: `Modular Test Project ${Date.now()}`,
          description: 'Test project for modular integration'
        };
        
        const project = await zoho.projects.createProject(testProject);
        console.log(`   ✅ Project created: ${project.id}`);
      } catch (error) {
        console.log(`   ❌ Projects test failed: ${error.message}`);
      }
    } else {
      console.log('\n4️⃣ Projects Service: Not configured or not working');
    }

    // Step 5: Test Books (if configured)
    if (serviceStatus.books) {
      console.log('\n5️⃣ Testing Books Service:');
      
      try {
        const customers = await zoho.books.getBooksCustomers();
        console.log(`   ✅ Found ${customers.length} customers in Books`);
        
        const invoices = await zoho.books.getInvoices();
        console.log(`   ✅ Found ${invoices.length} invoices in Books`);
      } catch (error) {
        console.log(`   ❌ Books test failed: ${error.message}`);
      }
    } else {
      console.log('\n5️⃣ Books Service: Not configured or not working');
    }

    // Step 6: Test WorkDrive (if configured)
    if (serviceStatus.workdrive) {
      console.log('\n6️⃣ Testing WorkDrive Service:');
      
      try {
        const rootFolderId = process.env.ZOHO_WORKDRIVE_ROOT_FOLDER;
        if (rootFolderId) {
          const files = await zoho.workdrive.getFiles(rootFolderId);
          console.log(`   ✅ Found ${files.length} files/folders in root`);
          
          // Test customer folder creation
          const customerFolder = await zoho.workdrive.getCustomerFolder('test@example.com');
          console.log(`   ✅ Customer folder: ${customerFolder}`);
        }
      } catch (error) {
        console.log(`   ❌ WorkDrive test failed: ${error.message}`);
      }
    } else {
      console.log('\n6️⃣ WorkDrive Service: Not configured or not working');
    }

    // Summary
    console.log('\n📊 Test Summary:');
    const workingServices = Object.values(serviceStatus).filter(Boolean).length;
    const totalServices = Object.keys(serviceStatus).length;
    
    console.log(`   Working Services: ${workingServices}/${totalServices}`);
    console.log(`   CRM: ${serviceStatus.crm ? '✅' : '❌'} (Required)`);
    console.log(`   Projects: ${serviceStatus.projects ? '✅' : '⚠️'} (Optional)`);
    console.log(`   Books: ${serviceStatus.books ? '✅' : '⚠️'} (Optional)`);
    console.log(`   WorkDrive: ${serviceStatus.workdrive ? '✅' : '⚠️'} (Optional)`);

    if (serviceStatus.crm) {
      console.log('\n🎉 Core integration is working! CRM is functional.');
      
      if (workingServices === totalServices) {
        console.log('🚀 All services are working perfectly!');
      } else {
        console.log('💡 To enable additional services, configure the missing environment variables:');
        
        if (!serviceStatus.projects) {
          console.log('   - ZOHO_PROJECTS_CLIENT_ID, ZOHO_PROJECTS_CLIENT_SECRET, ZOHO_PROJECTS_REFRESH_TOKEN');
        }
        if (!serviceStatus.books) {
          console.log('   - ZOHO_BOOKS_CLIENT_ID, ZOHO_BOOKS_CLIENT_SECRET, ZOHO_BOOKS_REFRESH_TOKEN, ZOHO_BOOKS_ORG_ID');
        }
        if (!serviceStatus.workdrive) {
          console.log('   - ZOHO_WORKDRIVE_CLIENT_ID, ZOHO_WORKDRIVE_CLIENT_SECRET, ZOHO_WORKDRIVE_REFRESH_TOKEN, ZOHO_WORKDRIVE_ROOT_FOLDER');
        }
      }
    } else {
      console.log('\n❌ CRM integration is not working. This is required for the application to function.');
    }

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log('💡 Make sure to build the TypeScript files first or run from the correct directory');
    }
  }
}

// Main execution
console.log('⚠️  Make sure your .env.local file is configured with Zoho credentials!\n');
testModularIntegration().catch(console.error);