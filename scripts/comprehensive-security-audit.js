#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔒 COMPREHENSIVE SECURITY AUDIT');
console.log('================================');

// Patterns to search for potential secrets
const secretPatterns = [
  // API Keys
  { name: 'OpenAI API Key', pattern: /sk-[a-zA-Z0-9]{48}/ },
  { name: 'Anthropic API Key', pattern: /sk-ant-[a-zA-Z0-9-_]{95}/ },
  { name: 'GitHub Token', pattern: /ghp_[a-zA-Z0-9]{36}/ },
  { name: 'GitLab Token', pattern: /glpat-[a-zA-Z0-9_-]{20}/ },
  { name: 'AWS Access Key', pattern: /AKIA[0-9A-Z]{16}/ },
  { name: 'Slack Token', pattern: /xoxb-[a-zA-Z0-9-]+/ },
  { name: 'Stripe Key', pattern: /sk_live_[a-zA-Z0-9]{24}/ },
  { name: 'Brave API Key', pattern: /BSA[a-zA-Z0-9-_]{20,}/ },
  { name: 'Generic API Key', pattern: /[a-zA-Z0-9]{32,}/ },
  
  // Zoho Credentials
  { name: 'Zoho Client ID', pattern: /1000\.[a-zA-Z0-9]{32}/ },
  { name: 'Zoho Refresh Token', pattern: /1000\.[a-zA-Z0-9]{64}/ },
  
  // Database URLs
  { name: 'Database URL', pattern: /postgres:\/\/[^\\s]+/ },
  { name: 'MongoDB URL', pattern: /mongodb(\+srv)?:\/\/[^\\s]+/ },
  
  // JWT Secrets
  { name: 'JWT Secret', pattern: /jwt[_-]?secret[\"']?\s*[:=]\s*[\"']?[a-zA-Z0-9+/=]{20,}/ },
  
  // Email credentials
  { name: 'Email Password', pattern: /smtp[_-]?pass(word)?[\"']?\s*[:=]\s*[\"']?[^\\s\"']+/ }
];

// Files to exclude from search
const excludePatterns = [
  'node_modules',
  '.git',
  '.next',
  'package-lock.json',
  'yarn.lock',
  '.env.example',
  '.env.production.template',
  'mcp.json.template'
];

// Function to check if file should be excluded
function shouldExclude(filePath) {
  return excludePatterns.some(pattern => filePath.includes(pattern));
}

// Function to recursively get all files
function getAllFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    
    if (shouldExclude(fullPath)) {
      continue;
    }
    
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      getAllFiles(fullPath, files);
    } else if (stat.isFile()) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to scan file for secrets
function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const findings = [];
    
    for (const { name, pattern } of secretPatterns) {
      const matches = content.match(pattern);
      if (matches) {
        // Check if it's a placeholder
        const isPlaceholder = matches[0].includes('your-') || 
                             matches[0].includes('YOUR_') ||
                             matches[0].includes('example') ||
                             matches[0].includes('placeholder') ||
                             matches[0].includes('here') ||
                             matches[0].includes('token_here') ||
                             matches[0].includes('key_here');
        
        if (!isPlaceholder) {
          findings.push({
            type: name,
            value: matches[0],
            line: content.split('\\n').findIndex(line => line.includes(matches[0])) + 1
          });
        }
      }
    }
    
    return findings;
  } catch (error) {
    return [];
  }
}

// Main audit function
function performAudit() {
  console.log('🔍 Scanning all files for potential secrets...');
  
  const allFiles = getAllFiles('.');
  let totalFindings = 0;
  let criticalFindings = [];
  
  for (const file of allFiles) {
    const findings = scanFile(file);
    
    if (findings.length > 0) {
      console.log(`\\n⚠️  POTENTIAL SECRETS FOUND in ${file}:`);
      
      for (const finding of findings) {
        console.log(`   ${finding.type}: ${finding.value} (Line ${finding.line})`);
        criticalFindings.push({ file, ...finding });
        totalFindings++;
      }
    }
  }
  
  console.log('\\n' + '='.repeat(50));
  console.log(`📊 AUDIT SUMMARY:`);
  console.log(`   Files scanned: ${allFiles.length}`);
  console.log(`   Potential secrets found: ${totalFindings}`);
  
  if (criticalFindings.length > 0) {
    console.log('\\n🚨 CRITICAL FINDINGS REQUIRE IMMEDIATE ATTENTION:');
    criticalFindings.forEach((finding, index) => {
      console.log(`${index + 1}. ${finding.type} in ${finding.file}`);
      console.log(`   Value: ${finding.value}`);
      console.log(`   Action: REVOKE AND REPLACE IMMEDIATELY`);
    });
    
    console.log('\\n❌ REPOSITORY IS NOT SAFE FOR PUBLIC DEPLOYMENT');
    process.exit(1);
  } else {
    console.log('\\n✅ NO EXPOSED SECRETS FOUND');
    console.log('✅ REPOSITORY IS SAFE FOR PUBLIC DEPLOYMENT');
  }
}

// Run the audit
performAudit();