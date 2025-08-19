#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing long filenames for Git compatibility');
console.log('===============================================');

// Define the problematic paths and their shorter alternatives
const pathMappings = [
  {
    old: 'public/images/services/engineering/research-development/process/RD-7-Regulatory & Compliance Assessment',
    new: 'public/images/services/engineering/research-development/process/RD-7-regulatory-compliance'
  },
  {
    old: 'public/images/services/engineering/research-development/process/RD-5-Final Design & Full Prototype',
    new: 'public/images/services/engineering/research-development/process/RD-5-final-design-prototype'
  },
  {
    old: 'public/images/services/engineering/research-development/process/RD-6-User Validation & Iteration',
    new: 'public/images/services/engineering/research-development/process/RD-6-user-validation'
  },
  {
    old: 'public/images/services/engineering/research-development/process/RD-4-Engineering Analysis',
    new: 'public/images/services/engineering/research-development/process/RD-4-engineering-analysis'
  },
  {
    old: 'public/images/services/engineering/research-development/process/RD-3-Proof of Concept',
    new: 'public/images/services/engineering/research-development/process/RD-3-proof-of-concept'
  },
  {
    old: 'public/images/services/engineering/machine-design/process/MD-8-operator-training',
    new: 'public/images/services/engineering/machine-design/process/MD-8-training'
  }
];

// Function to rename directories and files
function renamePathsRecursively() {
  pathMappings.forEach(mapping => {
    try {
      if (fs.existsSync(mapping.old)) {
        console.log(`📁 Renaming: ${mapping.old}`);
        console.log(`   → ${mapping.new}`);
        
        // Create parent directory if it doesn't exist
        const parentDir = path.dirname(mapping.new);
        if (!fs.existsSync(parentDir)) {
          fs.mkdirSync(parentDir, { recursive: true });
        }
        
        // Rename the directory/file
        fs.renameSync(mapping.old, mapping.new);
        console.log('✅ Renamed successfully');
      } else {
        console.log(`⚠️  Path not found: ${mapping.old}`);
      }
    } catch (error) {
      console.error(`❌ Error renaming ${mapping.old}:`, error.message);
    }
  });
}

// Function to update references in code files
function updateReferences() {
  console.log('\n🔍 Updating references in code files...');
  
  const filesToCheck = [
    'components/services/ProcessFlow.tsx',
    'lib/constants.ts',
    'scripts/generate-all-process-images.js'
  ];
  
  filesToCheck.forEach(filePath => {
    try {
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;
        
        pathMappings.forEach(mapping => {
          const oldPath = mapping.old.replace(/\\/g, '/');
          const newPath = mapping.new.replace(/\\/g, '/');
          
          if (content.includes(oldPath)) {
            content = content.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
            updated = true;
            console.log(`📝 Updated reference in ${filePath}`);
          }
        });
        
        if (updated) {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`✅ Saved ${filePath}`);
        }
      }
    } catch (error) {
      console.error(`❌ Error updating ${filePath}:`, error.message);
    }
  });
}

// Run the fixes
renamePathsRecursively();
updateReferences();

console.log('\n🎉 Filename fixes completed!');
console.log('You can now try git add and commit again.');