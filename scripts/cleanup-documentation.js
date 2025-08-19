#!/usr/bin/env node

/**
 * Documentation Cleanup Script
 * Removes redundant and outdated .md files, keeping only essential documentation
 */

const fs = require('fs')
const path = require('path')

// Files to keep (essential documentation)
const KEEP_FILES = [
  // Final implementation plans
  'FINAL_BACKEND_IMPLEMENTATION.md',
  'FINAL_FRONTEND_IMPLEMENTATION.md',
  
  // Essential guides
  'ZOHO_INTEGRATION_TESTING_GUIDE.md',
  'BACKEND_TESTING_GUIDE.md',
  'TESTING_GUIDE.md',
  'BLOG_QUICK_START.md',
  'BLOG_CONTENT_GUIDE.md',
  
  // Setup guides (keep the most current ones)
  'TECHNICAL_DOCUMENTATION_SETUP_GUIDE.md',
  'GDT_TOLERANCE_SETUP_GUIDE.md',
  'FEA_CFD_SETUP_GUIDE.md',
  'CAD_MODELING_SETUP_GUIDE.md',
  'BIW_DESIGN_SETUP_GUIDE.md',
  'MACHINE_DESIGN_SETUP_GUIDE.md',
  
  // Image and content guides
  'AI_IMAGE_PROMPTS.md',
  'IDEINSTEIN_LOGO_PROMPTS.md',
  'R&D_IMAGES_INTEGRATION_GUIDE.md',
  'TEAM_PHOTOS_GUIDE.md',
  
  // Blog automation
  'N8N_BLOG_AUTOMATION_GUIDE.md',
  'AUTOMATED_BLOG_PUBLISHING_GUIDE.md',
  'BLOG_INTEGRATION_GUIDE.md',
  'WEBSITE_AUTO_UPDATE_GUIDE.md'
]

// Files to delete (redundant/outdated)
const DELETE_FILES = [
  // Multiple implementation plans (keeping only FINAL_*)
  'UNIFIED_IMPLEMENTATION_PLAN_ANALYSIS.md',
  'INTEGRATED_IMPLEMENTATION_ROADMAP.md',
  'IMMEDIATE_IMPLEMENTATION_PLAN.md',
  'UPDATED_COMPREHENSIVE_REQUIREMENTS.md',
  'UPDATED_SYSTEM_DESIGN.md',
  'OPTIMIZED_CUSTOMER_LIFECYCLE_PLAN.md',
  'COMPREHENSIVE_WORKFLOW_TESTING_PLAN.md',
  'BACKEND_SPECS_GAP_ANALYSIS.md',
  'CURRENT_STATUS_AND_NEXT_STEPS.md',
  
  // Multiple Zoho setup guides (keeping only essential ones)
  'ZOHO_MODULES_ACTIVATION_PLAN.md',
  'ZOHO_ONE_ACTIVATION_PLAN.md',
  'ZOHO_MULTI_MODULE_SETUP_PLAN.md',
  'ZOHO_OFFICIAL_SETUP_2024.md',
  'ZOHO_SCOPE_TROUBLESHOOTING.md',
  'ZOHO_CORRECT_SETUP.md',
  'ZOHO_REFRESH_TOKEN_GUIDE.md',
  'ZOHO_MODULE_SETUP_GUIDE.md',
  'ZOHO_LOCAL_TESTING_SETUP.md',
  'ZOHO_INDIA_SETUP_GUIDE.md',
  'ZOHO_SETUP_GUIDE.md',
  'ZOHO_OAUTH_FIX.md',
  'SIMPLE_ZOHO_SETUP.md',
  'FULL_ZOHO_INTEGRATION_GUIDE.md',
  
  // Completion status files
  'BUTTON_STANDARDIZATION_COMPLETE.md',
  'LOGIN_SIGNUP_IMPROVEMENTS_COMPLETE.md',
  'ZOHO_BACKEND_INTEGRATION_COMPLETE.md',
  'CUSTOMER_LIFECYCLE_OPTIMIZATION_COMPLETE.md',
  'CUSTOMER_PORTAL_ENHANCEMENTS.md',
  'PHASE_1_IMPLEMENTATION_COMPLETE.md',
  'BACKEND_DEVELOPMENT_READY.md',
  'ALL_OPTIMIZATIONS_FINAL_COMPLETE.md',
  'SECTION_SPACING_OPTIMIZED.md',
  'FINAL_OPTIMIZATIONS_COMPLETE.md',
  'CALENDAR_READABILITY_FIXED.md',
  'ICON_ANIMATION_AND_FONT_IMPROVEMENTS.md',
  'CARD_ALIGNMENT_FIXED.md',
  'COMPREHENSIVE_CARDS_RESTORED.md',
  'BRAND_CONSISTENT_MOBILE_FIXES.md',
  'PREMIUM_MOBILE_ENHANCEMENTS_COMPLETE.md',
  'MOBILE_ENHANCEMENTS_FINAL.md',
  'HERO_SECTION_FINAL_TWEAKS.md',
  'HERO_SECTION_STANDARDIZATION.md',
  'STORE_PAGE_STANDARDIZATION.md',
  'BLOG_FRAMER_MOTION_ERROR_FIX.md',
  'BLOG_SERVICES_STYLE_MATCH.md',
  'BLOG_PAGINATION_FLOATING_BUTTONS.md',
  'BLOG_IMAGE_FRAME_FIX.md',
  'GET_QUOTE_BUTTON_ENHANCEMENT.md',
  'BUTTON_CONTRAST_FIX_SUMMARY.md',
  'PROJECT_CLEANUP_SUMMARY.md',
  'ALL_QUOTE_BUTTONS_UPDATED_COMPLETE.md',
  'QUOTE_FORM_OPTIMIZATION_COMPLETE.md',
  'CUSTOMER_LIFECYCLE_IMPLEMENTATION_COMPLETE.md',
  
  // Outdated fixes and improvements
  'PROPER_HOMEPAGE_FIX.md',
  'HOMEPAGE_RESTORATION_COMPLETE.md',
  'FINAL_WEBSITE_REVIEW_AND_OPTIMIZATIONS.md',
  'DEVELOPMENT_KICKOFF.md'
]

function deleteFile(filename) {
  try {
    if (fs.existsSync(filename)) {
      fs.unlinkSync(filename)
      console.log(`✅ Deleted: ${filename}`)
      return true
    } else {
      console.log(`⚠️  File not found: ${filename}`)
      return false
    }
  } catch (error) {
    console.error(`❌ Error deleting ${filename}:`, error.message)
    return false
  }
}

function main() {
  console.log('🧹 Starting documentation cleanup...\n')
  
  let deletedCount = 0
  let notFoundCount = 0
  
  console.log('📋 Files to delete:')
  DELETE_FILES.forEach(filename => {
    const deleted = deleteFile(filename)
    if (deleted) {
      deletedCount++
    } else {
      notFoundCount++
    }
  })
  
  console.log('\n📊 Cleanup Summary:')
  console.log(`✅ Files deleted: ${deletedCount}`)
  console.log(`⚠️  Files not found: ${notFoundCount}`)
  console.log(`📁 Files kept: ${KEEP_FILES.length}`)
  
  console.log('\n📁 Essential files kept:')
  KEEP_FILES.forEach(filename => {
    if (fs.existsSync(filename)) {
      console.log(`  ✅ ${filename}`)
    } else {
      console.log(`  ⚠️  ${filename} (not found)`)
    }
  })
  
  console.log('\n🎉 Documentation cleanup complete!')
  console.log('\n📋 Remaining structure:')
  console.log('  📄 FINAL_BACKEND_IMPLEMENTATION.md - Complete backend plan')
  console.log('  📄 FINAL_FRONTEND_IMPLEMENTATION.md - Complete frontend plan')
  console.log('  📁 .kiro/specs/ - Updated specification files')
  console.log('  📁 Essential guides and documentation')
}

if (require.main === module) {
  main()
}

module.exports = { deleteFile, KEEP_FILES, DELETE_FILES }