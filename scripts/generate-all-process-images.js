const fs = require('fs');
const path = require('path');

// Complete service configuration with all process steps
const services = {
  'engineering': {
    'research-development': {
      title: 'Research & Development',
      color: '#7C3AED',
      steps: [
        { code: 'RD-1-requirements', title: 'Define Project Scope and Design Constraints', subtitle: 'Establishing clear objectives and requirements' },
        { code: 'RD-2-concept-development', title: 'Research & Initial Concept Design', subtitle: 'Market analysis and concept generation' },
        { code: 'RD-3-prototyping', title: 'Proof of Concept', subtitle: 'Functional prototype development' },
        { code: 'RD-4-testing', title: 'Engineering Analysis', subtitle: 'Technical analysis and optimization' },
        { code: 'RD-5-analysis', title: 'Final Design & Full Prototype', subtitle: 'Complete CAD models and prototypes' },
        { code: 'RD-6-refinement', title: 'User Validation & Iteration', subtitle: 'Usability testing and refinements' },
        { code: 'RD-7-documentation', title: 'Regulatory & Compliance Assessment', subtitle: 'Standards compliance and certification' },
        { code: 'RD-8-manufacturing-plan', title: 'Manufacturing Plan', subtitle: 'Production strategy and quality control' },
        { code: 'RD-9-marketing-renders', title: 'Marketing Renders & Launch Support', subtitle: 'Product visualization and launch materials' }
      ]
    },
    'machine-design': {
      title: 'Machine Design',
      color: '#7C3AED',
      steps: [
        { code: 'MD-1-requirements-analysis', title: 'Requirements Analysis', subtitle: 'Understanding specifications and constraints' },
        { code: 'MD-2-safety-assessment', title: 'Safety Assessment', subtitle: 'Risk analysis and safety planning' },
        { code: 'MD-3-conceptual-design', title: 'Conceptual Design', subtitle: 'Initial design concepts and layouts' },
        { code: 'MD-4-detailed-mechanical-design', title: 'Detailed Mechanical Design', subtitle: 'Precise mechanical engineering' },
        { code: 'MD-5-control-system', title: 'Control System Design', subtitle: 'Automation and control integration' },
        { code: 'MD-6-analysis-optimization', title: 'Analysis & Optimization', subtitle: 'Performance analysis and improvements' },
        { code: 'MD-7-maintenance-planning', title: 'Maintenance Planning', subtitle: 'Service and maintenance strategies' },
        { code: 'MD-8-operator-training', title: 'Operator Training', subtitle: 'Training materials and documentation' }
      ]
    },
    'biw-design': {
      title: 'BIW Design',
      color: '#7C3AED',
      steps: [
        { code: 'BD-1-process-planning', title: 'Process Planning', subtitle: 'Manufacturing process design' },
        { code: 'BD-2-cross-team-integration', title: 'Cross-Team Integration', subtitle: 'Collaborative design coordination' },
        { code: 'BD-3-fixture-design', title: 'Fixture Design', subtitle: 'Tooling and fixture development' },
        { code: 'BD-4-welding-equipment', title: 'Welding Equipment', subtitle: 'Welding process optimization' },
        { code: 'BD-5-manufacturing-simulation', title: 'Manufacturing Simulation', subtitle: 'Process simulation and validation' },
        { code: 'BD-6-assembly-system', title: 'Assembly System', subtitle: 'Assembly line design and optimization' },
        { code: 'BD-7-enhanced-validation', title: 'Enhanced Validation', subtitle: 'Comprehensive testing and validation' },
        { code: 'BD-8-documentation-training', title: 'Documentation & Training', subtitle: 'Process documentation and training' }
      ]
    },
    'finite-element-cfd': {
      title: 'FEA & CFD Analysis',
      color: '#7C3AED',
      steps: [
        { code: 'FA-1-problem-definition', title: 'Problem Definition', subtitle: 'Analysis scope and objectives' },
        { code: 'FA-2-pre-analysis', title: 'Pre-Analysis', subtitle: 'Model preparation and setup' },
        { code: 'FA-3-model-preparation', title: 'Model Preparation', subtitle: 'Mesh generation and boundary conditions' },
        { code: 'FA-4-simulation-execution', title: 'Simulation Execution', subtitle: 'Running analysis and monitoring' },
        { code: 'FA-5-multi-condition', title: 'Multi-Condition Analysis', subtitle: 'Various loading and operating conditions' },
        { code: 'FA-6-results-analysis', title: 'Results Analysis', subtitle: 'Data interpretation and insights' },
        { code: 'FA-7-report-generation', title: 'Report Generation', subtitle: 'Comprehensive analysis documentation' }
      ]
    },
    'gdt-tolerance': {
      title: 'GD&T and Tolerance Analysis',
      color: '#7C3AED',
      steps: [
        { code: 'GT-1-design-review', title: 'Design Review', subtitle: 'Initial design assessment' },
        { code: 'GT-2-manufacturing-method', title: 'Manufacturing Method', subtitle: 'Process capability analysis' },
        { code: 'GT-3-gdt-implementation', title: 'GD&T Implementation', subtitle: 'Geometric dimensioning and tolerancing' },
        { code: 'GT-4-tolerance-stack-up', title: 'Tolerance Stack-up', subtitle: 'Statistical tolerance analysis' },
        { code: 'GT-5-measurement-system', title: 'Measurement System', subtitle: 'Inspection and measurement planning' },
        { code: 'GT-6-design-optimization', title: 'Design Optimization', subtitle: 'Tolerance optimization for cost and quality' },
        { code: 'GT-7-process-control', title: 'Process Control', subtitle: 'Quality control implementation' }
      ]
    }
  },
  'design': {
    'cad-modeling': {
      title: 'CAD Modeling',
      color: '#059669',
      steps: [
        { code: 'ED-1-requirements', title: 'Requirements Analysis', subtitle: 'Understanding design specifications' },
        { code: 'ED-2-concept-sketching', title: 'Concept Development', subtitle: 'Initial sketches and concepts' },
        { code: 'ED-3-3d-modeling', title: 'Detailed 3D Modeling', subtitle: 'Parametric model development' },
        { code: 'ED-4-assembly-modeling', title: 'Technical Documentation', subtitle: 'Engineering drawings and specifications' },
        { code: 'ED-5-technical-drawings', title: 'Design Validation', subtitle: 'Model verification and testing' },
        { code: 'ED-6-review-revision', title: 'Post-Validation Iteration', subtitle: 'Design refinements and updates' },
        { code: 'ED-7-final-documentation', title: 'Design Handover', subtitle: 'Final deliverables and documentation' }
      ]
    },
    'technical-documentation': {
      title: 'Technical Documentation',
      color: '#059669',
      steps: [
        { code: 'TD-1-user-needs', title: 'User Needs Analysis', subtitle: 'Understanding documentation requirements' },
        { code: 'TD-2-content-planning', title: 'Content Planning', subtitle: 'Documentation structure and strategy' },
        { code: 'TD-3-technical-writing', title: 'Technical Writing', subtitle: 'Content creation and editing' },
        { code: 'TD-4-3d-modeling', title: '3D Modeling & Visualization', subtitle: 'Technical illustrations and models' },
        { code: 'TD-5-rendering', title: 'Rendering & Graphics', subtitle: 'Visual content creation' },
        { code: 'TD-6-accessibility', title: 'Accessibility & Standards', subtitle: 'Compliance and accessibility review' },
        { code: 'TD-7-user-testing', title: 'User Testing & Validation', subtitle: 'Documentation usability testing' }
      ]
    }
  },
  'manufacturing': {
    '3d-printing': {
      title: '3D Printing Services',
      color: '#1E40AF',
      steps: [
        { code: 'TP-1-design-review', title: 'Design Review', subtitle: 'Printability analysis and optimization' },
        { code: 'TP-2-file-preparation', title: 'File Preparation & Orientation', subtitle: 'Model optimization and slicing' },
        { code: 'TP-3-printer-selection', title: 'Printer Selection & Parameter Optimization', subtitle: 'Equipment and settings selection' },
        { code: 'TP-4-material-selection', title: 'Material Selection', subtitle: 'Optimal material for application' },
        { code: 'TP-5-printing-process', title: 'Printing Process', subtitle: 'Precision manufacturing execution' },
        { code: 'TP-6-post-processing', title: 'Post-Processing', subtitle: 'Finishing and surface treatment' },
        { code: 'TP-7-quality-control', title: 'Dimensional Verification & Quality Control', subtitle: 'Inspection and quality assurance' }
      ]
    },
    'supplier-sourcing': {
      title: 'Supplier Sourcing',
      color: '#1E40AF',
      steps: [
        { code: 'SS-1-requirements-definition', title: 'Requirements Definition', subtitle: 'Sourcing specifications and criteria' },
        { code: 'SS-2-risk-assessment', title: 'Risk Assessment', subtitle: 'Supply chain risk analysis' },
        { code: 'SS-3-supplier-identification', title: 'Supplier Identification', subtitle: 'Market research and supplier discovery' },
        { code: 'SS-4-supplier-evaluation', title: 'Supplier Evaluation', subtitle: 'Capability assessment and qualification' },
        { code: 'SS-5-supplier-selection', title: 'Supplier Selection', subtitle: 'Final selection and decision making' },
        { code: 'SS-6-contract-negotiation', title: 'Contract Negotiation', subtitle: 'Terms and conditions agreement' },
        { code: 'SS-7-supplier-onboarding', title: 'Supplier Onboarding', subtitle: 'Integration and setup process' },
        { code: 'SS-8-performance-monitoring', title: 'Performance Monitoring', subtitle: 'Ongoing supplier performance tracking' }
      ]
    }
  }
};

// Generate SVG placeholder function
function generateProcessStepSVG(stepNumber, title, subtitle, color, width = 1280, height = 720) {
  // Create appropriate icon based on step type
  let iconSVG = '';
  const stepLower = title.toLowerCase();
  
  if (stepLower.includes('design') || stepLower.includes('concept')) {
    iconSVG = `<g transform="translate(640, 250)">
      <rect x="-30" y="-20" width="60" height="40" rx="4" fill="white" opacity="0.3"/>
      <line x1="-20" y1="-10" x2="20" y2="-10" stroke="white" stroke-width="2" opacity="0.5"/>
      <line x1="-20" y1="0" x2="15" y2="0" stroke="white" stroke-width="2" opacity="0.5"/>
      <line x1="-20" y1="10" x2="10" y2="10" stroke="white" stroke-width="2" opacity="0.5"/>
    </g>`;
  } else if (stepLower.includes('analysis') || stepLower.includes('test')) {
    iconSVG = `<g transform="translate(640, 250)">
      <circle cx="0" cy="0" r="25" fill="none" stroke="white" stroke-width="3" opacity="0.4"/>
      <path d="M-15,-10 L-5,5 L5,-5 L15,10" stroke="white" stroke-width="3" fill="none" opacity="0.6"/>
      <circle cx="-15" cy="-10" r="2" fill="white" opacity="0.7"/>
      <circle cx="15" cy="10" r="2" fill="white" opacity="0.7"/>
    </g>`;
  } else if (stepLower.includes('print') || stepLower.includes('manufactur')) {
    iconSVG = `<g transform="translate(640, 250)">
      <rect x="-25" y="-15" width="50" height="30" rx="4" fill="white" opacity="0.3"/>
      <rect x="-20" y="-25" width="40" height="10" rx="2" fill="white" opacity="0.2"/>
      <circle cx="0" cy="0" r="6" fill="white" opacity="0.5"/>
    </g>`;
  } else if (stepLower.includes('document') || stepLower.includes('report')) {
    iconSVG = `<g transform="translate(640, 250)">
      <rect x="-20" y="-25" width="40" height="50" rx="4" fill="white" opacity="0.3"/>
      <rect x="-15" y="-20" width="30" height="6" fill="white" opacity="0.4"/>
      <rect x="-15" y="-10" width="25" height="4" fill="white" opacity="0.4"/>
      <rect x="-15" y="-3" width="28" height="4" fill="white" opacity="0.4"/>
      <rect x="-15" y="4" width="20" height="4" fill="white" opacity="0.4"/>
    </g>`;
  } else if (stepLower.includes('quality') || stepLower.includes('control')) {
    iconSVG = `<g transform="translate(640, 250)">
      <circle cx="0" cy="0" r="20" fill="none" stroke="white" stroke-width="3" opacity="0.4"/>
      <path d="M-8,-3 L-3,5 L12,-10" stroke="white" stroke-width="4" fill="none" opacity="0.6"/>
    </g>`;
  } else {
    // Default icon
    iconSVG = `<g transform="translate(640, 250)">
      <circle cx="0" cy="0" r="20" fill="white" opacity="0.3"/>
      <text x="0" y="5" text-anchor="middle" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="${color}">
        ${stepNumber}
      </text>
    </g>`;
  }

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="stepGrad${stepNumber}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:${color};stop-opacity:0.5" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="#F8FAFC"/>
    <rect width="100%" height="100%" fill="url(#stepGrad${stepNumber})"/>
    
    ${iconSVG}
    
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" 
          font-family="Inter, sans-serif" font-size="42" font-weight="600" fill="white">
      Step ${stepNumber}: ${title}
    </text>
    <text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" 
          font-family="Inter, sans-serif" font-size="22" font-weight="400" fill="white" opacity="0.9">
      ${subtitle}
    </text>
    <text x="50%" y="85%" dominant-baseline="middle" text-anchor="middle" 
          font-family="Inter, sans-serif" font-size="16" font-weight="300" fill="white" opacity="0.7">
      IdEinstein - Where Ideas Take Shape
    </text>
  </svg>`;
}

// Create all missing process step images
function createAllProcessImages() {
  const baseDir = path.join(__dirname, '..', 'public', 'images', 'services');
  let createdCount = 0;
  
  Object.entries(services).forEach(([category, categoryServices]) => {
    Object.entries(categoryServices).forEach(([serviceSlug, serviceConfig]) => {
      const servicePath = path.join(baseDir, category, serviceSlug);
      
      serviceConfig.steps.forEach((step, index) => {
        const stepPath = path.join(servicePath, 'process', step.code);
        const svgPath = path.join(stepPath, 'step-hero.svg');
        
        // Only create if doesn't exist
        if (!fs.existsSync(svgPath)) {
          try {
            const svg = generateProcessStepSVG(
              index + 1, 
              step.title, 
              step.subtitle, 
              serviceConfig.color
            );
            fs.writeFileSync(svgPath, svg);
            console.log(`✅ Created: ${path.relative(path.join(__dirname, '..'), svgPath)}`);
            createdCount++;
          } catch (error) {
            console.log(`❌ Failed to create: ${svgPath} - ${error.message}`);
          }
        } else {
          console.log(`⏭️  Exists: ${path.relative(path.join(__dirname, '..'), svgPath)}`);
        }
      });
    });
  });
  
  console.log(`\n🎉 Process complete! Created ${createdCount} new process step images.`);
}

// Run the script
createAllProcessImages();