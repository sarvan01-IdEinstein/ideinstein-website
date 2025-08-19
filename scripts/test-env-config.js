#!/usr/bin/env node

/**
 * Simple test to check environment configuration
 * Tests which Zoho modules are configured
 */

require('dotenv').config({ path: '.env.local' });

function testEnvironmentConfig() {
  console.log('🔍 Testing Environment Configuration\n');

  // Check CRM configuration
  const crmConfigured = !!(
    process.env.ZOHO_CLIENT_ID && 
    process.env.ZOHO_CLIENT_SECRET && 
    process.env.ZOHO_REFRESH_TOKEN
  );

  // Check Projects configuration
  const projectsConfigured = !!(
    process.env.ZOHO_PROJECTS_CLIENT_ID && 
    process.env.ZOHO_PROJECTS_CLIENT_SECRET && 
    process.env.ZOHO_PROJECTS_REFRESH_TOKEN
  );

  // Check Books configuration
  const booksConfigured = !!(
    process.env.ZOHO_BOOKS_CLIENT_ID && 
    process.env.ZOHO_BOOKS_CLIENT_SECRET && 
    process.env.ZOHO_BOOKS_REFRESH_TOKEN &&
    process.env.ZOHO_BOOKS_ORG_ID
  );

  // Check WorkDrive configuration
  const workdriveConfigured = !!(
    process.env.ZOHO_WORKDRIVE_CLIENT_ID && 
    process.env.ZOHO_WORKDRIVE_CLIENT_SECRET && 
    process.env.ZOHO_WORKDRIVE_REFRESH_TOKEN &&
    process.env.ZOHO_WORKDRIVE_ROOT_FOLDER
  );

  console.log('📊 Configuration Status:');
  console.log(`   CRM: ${crmConfigured ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`   Projects: ${projectsConfigured ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`   Books: ${booksConfigured ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`   WorkDrive: ${workdriveConfigured ? '✅ Configured' : '❌ Not configured'}`);

  const configuredCount = [crmConfigured, projectsConfigured, booksConfigured, workdriveConfigured].filter(Boolean).length;
  
  console.log(`\n📈 Progress: ${configuredCount}/4 modules configured`);

  if (crmConfigured) {
    console.log('\n🎉 CRM is configured - core functionality will work!');
  } else {
    console.log('\n❌ CRM is not configured - this is required for basic functionality');
  }

  if (configuredCount === 4) {
    console.log('\n🚀 All modules configured! Full integration ready.');
  } else if (configuredCount > 1) {
    console.log('\n✨ Multiple modules configured! Enhanced functionality available.');
  }

  // Show missing configurations
  if (!projectsConfigured) {
    console.log('\n💡 To enable Projects:');
    console.log('   - ZOHO_PROJECTS_CLIENT_ID');
    console.log('   - ZOHO_PROJECTS_CLIENT_SECRET');
    console.log('   - ZOHO_PROJECTS_REFRESH_TOKEN');
  }

  if (!booksConfigured) {
    console.log('\n💡 To enable Books:');
    console.log('   - ZOHO_BOOKS_CLIENT_ID');
    console.log('   - ZOHO_BOOKS_CLIENT_SECRET');
    console.log('   - ZOHO_BOOKS_REFRESH_TOKEN');
    console.log('   - ZOHO_BOOKS_ORG_ID');
  }

  if (!workdriveConfigured) {
    console.log('\n💡 To enable WorkDrive:');
    console.log('   - ZOHO_WORKDRIVE_CLIENT_ID');
    console.log('   - ZOHO_WORKDRIVE_CLIENT_SECRET');
    console.log('   - ZOHO_WORKDRIVE_REFRESH_TOKEN');
    console.log('   - ZOHO_WORKDRIVE_ROOT_FOLDER');
  }

  console.log('\n🧪 Next steps:');
  console.log('   1. Start dev server: npm run dev');
  console.log('   2. Test signup/login at: http://localhost:3000');
  console.log('   3. Check customer portal functionality');

  return {
    crm: crmConfigured,
    projects: projectsConfigured,
    books: booksConfigured,
    workdrive: workdriveConfigured,
    total: configuredCount
  };
}

// Run the test
const results = testEnvironmentConfig();

// Exit with appropriate code
process.exit(results.crm ? 0 : 1);