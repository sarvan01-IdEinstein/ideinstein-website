const fs = require('fs');
const path = require('path');

// Service configuration based on your structure
const services = {
  'engineering': {
    'research-development': {
      title: 'Research & Development',
      color: '#7C3AED',
      steps: [
        'RD-1-requirements',
        'RD-2-concept-development', 
        'RD-3-prototyping',
        'RD-4-testing',
        'RD-5-analysis',
        'RD-6-refinement',
        'RD-7-documentation',
        'RD-8-manufacturing-plan',
        'RD-9-marketing-renders'
      ]
    },
    'machine-design': {
      title: 'Machine Design',
      color: '#7C3AED',
      steps: [
        'MD-1-requirements-analysis',
        'MD-2-safety-assessment',
        'MD-3-conceptual-design',
        'MD-4-detailed-mechanical-design',
        'MD-5-control-system',
        'MD-6-analysis-optimization',
        'MD-7-maintenance-planning',
        'MD-8-operator-training'
      ]
    },
    'biw-design': {
      title: 'BIW Design',
      color: '#7C3AED',
      steps: [
        'BD-1-process-planning',
        'BD-2-cross-team-integration',
        'BD-3-fixture-design',
        'BD-4-welding-equipment',
        'BD-5-manufacturing-simulation',
        'BD-6-assembly-system',
        'BD-7-enhanced-validation',
        'BD-8-documentation-training'
      ]
    },
    'finite-element-cfd': {
      title: 'FEA & CFD Analysis',
      color: '#7C3AED',
      steps: [
        'FA-1-problem-definition',
        'FA-2-pre-analysis',
        'FA-3-model-preparation',
        'FA-4-simulation-execution',
        'FA-5-multi-condition',
        'FA-6-results-analysis',
        'FA-7-report-generation'
      ]
    },
    'gdt-tolerance': {
      title: 'GD&T and Tolerance Analysis',
      color: '#7C3AED',
      steps: [
        'GT-1-design-review',
        'GT-2-manufacturing-method',
        'GT-3-gdt-implementation',
        'GT-4-tolerance-stack-up',
        'GT-5-measurement-system',
        'GT-6-design-optimization',
        'GT-7-process-control'
      ]
    }
  },
  'design': {
    'cad-modeling': {
      title: 'CAD Modeling',
      color: '#059669',
      steps: [
        'ED-1-requirements',
        'ED-2-concept-sketching',
        'ED-3-3d-modeling',
        'ED-4-assembly-modeling',
        'ED-5-technical-drawings',
        'ED-6-review-revision',
        'ED-7-final-documentation'
      ]
    },
    'technical-documentation': {
      title: 'Technical Documentation',
      color: '#059669',
      steps: [
        'TD-1-user-needs',
        'TD-2-content-planning',
        'TD-3-technical-writing',
        'TD-4-3d-modeling',
        'TD-5-rendering',
        'TD-6-accessibility',
        'TD-7-user-testing'
      ]
    }
  },
  'manufacturing': {
    '3d-printing': {
      title: '3D Printing Services',
      color: '#1E40AF',
      steps: [
        'TP-1-design-review',
        'TP-2-file-preparation',
        'TP-3-printer-selection',
        'TP-4-material-selection',
        'TP-5-printing-process',
        'TP-6-post-processing',
        'TP-7-quality-control'
      ]
    },
    'supplier-sourcing': {
      title: 'Supplier Sourcing',
      color: '#1E40AF',
      steps: [
        'SS-1-requirements-definition',
        'SS-2-risk-assessment',
        'SS-3-supplier-identification',
        'SS-4-supplier-evaluation',
        'SS-5-supplier-selection',
        'SS-6-contract-negotiation',
        'SS-7-supplier-onboarding',
        'SS-8-performance-monitoring'
      ]
    }
  }
};

// Generate SVG placeholder function
function generateSVGPlaceholder(title, subtitle, color, width = 1920, height = 1080) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:${color};stop-opacity:0.4" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="#F8FAFC"/>
    <rect width="100%" height="100%" fill="url(#grad)"/>
    <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" 
          font-family="Inter, sans-serif" font-size="72" font-weight="600" fill="white">
      ${title}
    </text>
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" 
          font-family="Inter, sans-serif" font-size="32" font-weight="400" fill="white" opacity="0.9">
      ${subtitle || 'Professional Engineering Services'}
    </text>
    <text x="50%" y="85%" dominant-baseline="middle" text-anchor="middle" 
          font-family="Inter, sans-serif" font-size="24" font-weight="300" fill="white" opacity="0.7">
      IdEinstein - Where Ideas Take Shape
    </text>
  </svg>`;
}

// Create directories and placeholder images
function createPlaceholders() {
  const baseDir = path.join(__dirname, '..', 'public', 'images', 'services');
  
  Object.entries(services).forEach(([category, categoryServices]) => {
    Object.entries(categoryServices).forEach(([serviceSlug, serviceConfig]) => {
      const servicePath = path.join(baseDir, category, serviceSlug);
      
      // Create main service hero image
      const mainPath = path.join(servicePath, 'main');
      if (!fs.existsSync(path.join(mainPath, 'service-hero.jpg'))) {
        const svg = generateSVGPlaceholder(serviceConfig.title, 'Professional Engineering Services', serviceConfig.color);
        fs.writeFileSync(path.join(mainPath, 'service-hero.svg'), svg);
        console.log(`Created: ${path.join(mainPath, 'service-hero.svg')}`);
      }
      
      // Create process step images
      serviceConfig.steps.forEach((step, index) => {
        const stepPath = path.join(servicePath, 'process', step);
        if (!fs.existsSync(path.join(stepPath, 'step-hero.jpg'))) {
          const stepTitle = step.split('-').slice(2).join(' ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          const svg = generateSVGPlaceholder(`Step ${index + 1}`, stepTitle, serviceConfig.color, 1280, 720);
          fs.writeFileSync(path.join(stepPath, 'step-hero.svg'), svg);
          console.log(`Created: ${path.join(stepPath, 'step-hero.svg')}`);
        }
      });
    });
  });
}

createPlaceholders();
console.log('Placeholder generation complete!');