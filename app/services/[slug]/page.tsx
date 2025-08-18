import ServiceDetails from "@/components/services/ServiceDetails";
import type { Service } from "@/lib/types";

// Sample data - replace with your actual data or API call
const servicesData: Record<string, Service> = {
  "research-development": {
    id: "3",
    title: "Research & Development",
    description:
      "Expert research and development services to transform your innovative ideas into market-ready products, with comprehensive validation and regulatory compliance.",
    slug: "research-development",
    icon: "Lightbulb",
    features: [
      "End-to-end product development",
      "Technical feasibility analysis",
      "Prototype development and testing",
      "Engineering optimization",
      "Manufacturing preparation",
      "Marketing visualization",
    ],
    category: ["Engineering", "Design"],
    details: {
      specifications: [
        {
          category: "R&D Capabilities",
          items: [
            {
              label: "Development Cycle",
              value: "4-12 months (project dependent)",
            },
            {
              label: "Team Composition",
              value: "Engineers, Designers, Market Analysts",
            },
            {
              label: "Industries Served",
              value: "Consumer Products, Medical, Industrial, Electronics",
            },
            { label: "Success Rate", value: "87% of projects reach market" },
          ],
        },
      ],
      process: [
        {
          title: "Define Project Scope and Design Constraints",
          description:
            "We establish clear objectives, requirements, and limitations for your project, creating a solid foundation for the development process.",
          image: "project-scope.jpg",
          keyPoints: [
            "Establish clear objectives and requirements",
            "Identify target market and user needs",
            "Document technical specifications",
            "Create detailed project timeline and budget",
          ],
          tools: [
            "Requirements Management Software",
            "Market Analysis Tools",
            "Project Planning Software",
          ],
          deliverables: [
            "Project Brief",
            "Requirements Document",
            "Project Timeline",
            "Budget Estimate",
          ],
          timeline: "2-4 weeks",
        },
        {
          title: "Research & Initial Concept Design",
          description:
            "Our team conducts thorough market analysis and generates multiple design concepts, evaluating each against your project constraints.",
          image: "concept-design.jpg",
          keyPoints: [
            "Market analysis and competitive landscape evaluation",
            "Multiple design concept generation",
            "Feasibility evaluation against constraints",
            "Selection of promising concepts",
          ],
          tools: [
            "Market Research Software",
            "CAD Design Tools",
            "Concept Visualization Software",
          ],
          deliverables: [
            "Market Analysis Report",
            "Concept Sketches",
            "Initial Design Brief",
          ],
          timeline: "2-4 weeks",
        },
        {
          title: "Proof of Concept",
          description:
            "We develop functional prototypes to validate core technologies and gather user feedback on preliminary designs.",
          image: "proof-of-concept.jpg",
          keyPoints: [
            "Functional prototype development",
            "Critical component testing",
            "User feedback collection",
            "Concept refinement",
          ],
          tools: [
            "Rapid Prototyping Equipment",
            "Testing Apparatus",
            "User Feedback Systems",
          ],
          deliverables: [
            "Functional Prototypes",
            "Testing Reports",
            "Refined Design Concepts",
          ],
          timeline: "3-6 weeks",
        },
        {
          title: "Engineering Analysis",
          description:
            "Our engineers perform detailed technical analysis to optimize designs for performance, cost, and manufacturability.",
          image: "engineering-analysis.jpg",
          keyPoints: [
            "Detailed technical analysis (FEA, CFD)",
            "Design optimization",
            "Failure mode identification",
            "Material and component specification",
          ],
          tools: [
            "FEA Software",
            "CFD Analysis Tools",
            "FMEA Software",
            "Material Selection Databases",
          ],
          deliverables: [
            "Engineering Analysis Report",
            "Optimized Design Specifications",
            "Material Selection Report",
          ],
          timeline: "2-4 weeks",
        },
        {
          title: "Final Design & Full Prototype",
          description:
            "We create complete CAD models and produce high-fidelity functional prototypes for comprehensive testing and validation.",
          image: "final-prototype.jpg",
          keyPoints: [
            "Complete CAD modeling",
            "Technical documentation creation",
            "High-fidelity prototype production",
            "Comprehensive testing and validation",
          ],
          tools: [
            "Advanced CAD Software",
            "Technical Documentation Tools",
            "Prototype Manufacturing Equipment",
          ],
          deliverables: [
            "Complete CAD Models",
            "Technical Documentation",
            "Functional Prototypes",
            "Validation Reports",
          ],
          timeline: "4-8 weeks",
        },
        {
          title: "User Validation & Iteration",
          description:
            "We conduct structured usability testing with target users to validate the final design and make any necessary refinements before manufacturing.",
          image: "user-validation.jpg",
          keyPoints: [
            "Structured usability testing with representative users",
            "Quantitative performance metrics collection",
            "Qualitative feedback analysis",
            "Final design refinements based on user input",
          ],
          tools: [
            "Usability Testing Equipment",
            "User Experience Measurement Tools",
            "Feedback Analysis Software",
            "Rapid Iteration Prototyping Tools",
          ],
          deliverables: [
            "Usability Test Reports",
            "User Acceptance Metrics",
            "Final Design Refinements",
            "Validation Documentation",
          ],
          timeline: "3-6 weeks (per cycle)",
        },
        {
          title: "Regulatory & Compliance Assessment",
          description:
            "We identify and address all applicable regulatory requirements and standards to ensure your product meets legal and industry compliance needs.",
          image: "regulatory-compliance.jpg",
          keyPoints: [
            "Regulatory pathway identification",
            "Standards compliance assessment",
            "Certification requirements planning",
            "Risk management documentation",
          ],
          tools: [
            "Regulatory Database Systems",
            "Compliance Tracking Software",
            "Risk Assessment Tools",
            "Standards Reference Libraries",
          ],
          deliverables: [
            "Regulatory Strategy Document",
            "Compliance Checklist",
            "Risk Management File",
            "Testing & Certification Plan",
          ],
          timeline: "4-8 weeks (and ongoing)",
        },
        {
          title: "Manufacturing Plan",
          description:
            "We develop a detailed production strategy, including assembly instructions, quality control procedures, and supplier identification.",
          image: "manufacturing-plan.jpg",
          keyPoints: [
            "Production strategy development",
            "Assembly instruction creation",
            "Quality control procedure establishment",
            "Supplier and partner identification",
          ],
          tools: [
            "Production Planning Software",
            "Quality Control Systems",
            "Supply Chain Management Tools",
          ],
          deliverables: [
            "Manufacturing Plan",
            "Assembly Instructions",
            "QC Procedures",
            "Supplier Recommendations",
          ],
          timeline: "2-4 weeks",
        },
        {
          title: "Marketing Renders & Launch Support",
          description:
            "We create photorealistic product visualizations and marketing materials to support your product launch strategy.",
          image: "marketing-renders.jpg",
          keyPoints: [
            "Photorealistic product visualization",
            "Marketing material development",
            "Technical documentation for sales",
            "Product launch support",
          ],
          tools: [
            "3D Rendering Software",
            "Graphic Design Tools",
            "Marketing Material Templates",
          ],
          deliverables: [
            "Product Renders",
            "Marketing Materials",
            "Sales Documentation",
            "Launch Strategy Support",
          ],
          timeline: "1-3 weeks",
        },
      ],
    },
  },
  "3d-printing": {
    id: "1",
    title: "3D Printing Services",
    description:
      "Advanced 3D printing services delivering high-precision prototypes and production parts with rapid turnaround and comprehensive quality control.",
    slug: "3d-printing",
    icon: "Printer3d",
    features: [
      "Rapid prototyping",
      "Multiple material options",
      "High precision output",
      "Quick turnaround time",
    ],
    category: ["Manufacturing"],
    details: {
      specifications: [
        {
          category: "Printer Specifications",
          items: [
            { label: "Build Volume", value: "300 x 300 x 300mm" },
            { label: "Layer Resolution", value: "0.05-0.3mm" },
            { label: "Printing Speed", value: "Up to 150mm/s" },
          ],
        },
      ],
      process: [
        {
          title: "Design Review",
          description:
            "Our engineers conduct a comprehensive review of your 3D models to ensure optimal printability and identify potential issues before production begins.",
          image: "design-review.jpg",
          keyPoints: [
            "Analyze geometry for printability",
            "Validate wall thickness",
            "Plan support structures",
          ],
          tools: ["CAD Software", "Mesh Analysis Tools", "Simulation Software"],
          deliverables: [
            "Printability Report",
            "Design Recommendations",
            "Production Plan",
          ],
          timeline: "1-2 business days",
        },
        {
          title: "File Preparation & Orientation",
          description:
            "We prepare and optimize your 3D model files for the printing process, ensuring the best possible print quality and success rate.",
          image: "file-preparation.jpg",
          keyPoints: [
            "Repair mesh errors",
            "Optimize part orientation",
            "Configure slicing parameters",
            "Apply appropriate resolution settings",
          ],
          tools: [
            "Mesh Repair Software",
            "Slicing Software",
            "File Optimization Tools",
          ],
          deliverables: [
            "Optimized Print Files",
            "Orientation Analysis",
            "Slicing Configuration",
          ],
          timeline: "1 business day",
        },
        {
          title: "Printer Selection & Parameter Optimization",
          description:
            "We select the most suitable printer and optimize all printing parameters for your specific requirements.",
          image: "printer-selection.jpg",
          keyPoints: [
            "Choose optimal printer for requirements",
            "Configure material-specific settings",
            "Set temperature and speed parameters",
            "Optimize infill patterns and density",
          ],
          tools: [
            "Printer Management Software",
            "Parameter Optimization Tools",
            "Print Simulation Software",
          ],
          deliverables: [
            "Printer Selection Report",
            "Parameter Configuration",
            "Print Strategy Document",
          ],
          timeline: "1 business day",
        },
        {
          title: "Material Selection",
          description:
            "We help you select the optimal material based on your specific requirements for functionality, durability, appearance, and cost-effectiveness.",
          image: "material-selection.jpg",
          keyPoints: [
            "Analyze material properties",
            "Make application-specific recommendations",
            "Assess cost-benefit factors",
          ],
          tools: [
            "Material Testing Equipment",
            "Property Comparison Tools",
            "Cost Analysis Software",
          ],
          deliverables: [
            "Material Recommendation Report",
            "Property Analysis",
            "Cost Comparison",
          ],
          timeline: "1 business day",
        },
        {
          title: "Printing Process",
          description:
            "Using state-of-the-art 3D printers, we transform your digital designs into physical objects with precision and attention to detail.",
          image: "printing-process.jpg",
          keyPoints: [
            "Calibrate printer",
            "Monitor printing progress",
            "Provide status updates",
          ],
          tools: [
            "Professional 3D Printers",
            "Monitoring Software",
            "Quality Control Systems",
          ],
          deliverables: [
            "Progress Reports",
            "Print Status Updates",
            "Quality Monitoring Data",
          ],
          timeline: "1-5 business days (per part)",
        },
        {
          title: "Post-Processing",
          description:
            "We refine your printed parts through various finishing techniques to achieve the desired surface quality, appearance, and mechanical properties.",
          image: "post-processing.jpg",
          keyPoints: [
            "Remove support structures",
            "Apply appropriate finishing techniques",
            "Perform heat treatment if required",
            "Execute painting or coating if requested",
          ],
          tools: [
            "Post-Processing Equipment",
            "Finishing Tools",
            "Surface Treatment Systems",
          ],
          deliverables: [
            "Finished Components",
            "Post-Processing Report",
            "Surface Quality Analysis",
          ],
          timeline: "1-4 business days (technique dependent)",
        },
        {
          title: "Dimensional Verification & Quality Control",
          description:
            "Every printed part undergoes comprehensive inspection and testing to ensure it meets all specifications and quality standards.",
          image: "quality-control.jpg",
          keyPoints: [
            "Perform dimensional measurements",
            "Verify tolerances",
            "Conduct functional testing",
            "Document quality results",
          ],
          tools: [
            "CMM Equipment",
            "Inspection Tools",
            "Quality Documentation Software",
          ],
          deliverables: [
            "Quality Inspection Report",
            "Dimensional Analysis",
            "Test Results Documentation",
          ],
          timeline: "1-2 business days",
        },
      ],
    },
  },
  "cad-modeling": {
    id: "2",
    title: "CAD Modeling Services",
    description:
      "Professional CAD modeling and design services offering precise 3D models, technical documentation, and comprehensive design validation.",
    slug: "cad-modeling",
    icon: "Boxes",
    features: [
      "Parametric 3D modeling",
      "Technical drawings & documentation",
      "Complex assembly design",
      "Design optimization",
      "Reverse engineering",
      "File format conversion",
    ],
    category: ["Design", "Engineering"],
    details: {
      specifications: [
        {
          category: "CAD Capabilities",
          items: [
            {
              label: "Software",
              value:
                "SolidWorks, CATIA, Fusion 360, AutoCAD, Inventor, Rhino 3D",
            },
            {
              label: "File Formats",
              value: "STEP, IGES, STL, OBJ, SLDPRT, DWG, DXF, and more",
            },
            { label: "Accuracy", value: "Up to 0.001mm precision" },
            {
              label: "Turnaround Time",
              value: "1-10 business days (project dependent)",
            },
          ],
        },
      ],
      process: [
        {
          title: "Requirements Analysis",
          description:
            "We begin by thoroughly understanding your design requirements, intended use case, manufacturing constraints, and project goals.",
          image: "requirements-analysis.jpg",
          keyPoints: [
            "Clarify design intent, functional requirements, and constraints",
            "Document design specifications and acceptance criteria",
            "Establish project timeline and deliverables",
          ],
          tools: [
            "Requirements Documentation Software",
            "Video Conferencing",
            "Collaborative Design Platforms",
          ],
          deliverables: [
            "Project Brief",
            "Design Requirements Document",
            "Project Timeline",
          ],
          timeline: "2-5 business days",
        },
        {
          title: "Concept Development",
          description:
            "Our designers create initial concept sketches and basic 3D models to establish the fundamental geometry and design approach.",
          image: "concept-development.jpg",
          keyPoints: [
            "Generate initial concept sketches and basic 3D models",
            "Review concepts with stakeholders",
            "Establish fundamental geometry and approach",
          ],
          tools: [
            "Sketching Software",
            "Basic CAD Tools",
            "Rendering Software",
          ],
          deliverables: [
            "Concept Sketches",
            "Basic 3D Models",
            "Design Direction Document",
          ],
          timeline: "1-2 weeks",
        },
        {
          title: "Detailed 3D Modeling",
          description:
            "We create precise, parametric 3D models with proper feature hierarchy, design intent, and manufacturing considerations.",
          image: "detailed-modeling.jpg",
          keyPoints: [
            "Create parametric feature-based models",
            "Develop proper model tree organization",
            "Implement design for manufacturing principles",
          ],
          tools: [
            "Advanced CAD Software",
            "Specialized Modeling Add-ins",
            "Material Libraries",
          ],
          deliverables: [
            "Detailed 3D Models",
            "Assembly Files",
            "Part Libraries",
          ],
          timeline: "2-4 weeks (complexity dependent)",
        },
        {
          title: "Technical Documentation",
          description:
            "We produce comprehensive technical drawings with proper dimensioning, tolerancing, annotations, and manufacturing information.",
          image: "technical-documentation.jpg",
          keyPoints: [
            "Produce engineering drawings with proper dimensioning and tolerancing",
            "Create assembly drawings and exploded views",
            "Generate bill of materials and parts lists",
          ],
          tools: [
            "Technical Drawing Software",
            "GD&T Standards Libraries",
            "Documentation Templates",
          ],
          deliverables: [
            "2D Technical Drawings",
            "Assembly Drawings",
            "Bill of Materials",
            "Manufacturing Notes",
          ],
          timeline: "1-3 weeks",
        },
        {
          title: "Design Validation",
          description:
            "We perform comprehensive validation to ensure your design meets all requirements and manufacturing standards.",
          image: "design-validation.jpg",
          keyPoints: [
            "Perform interference checks and simulation analysis",
            "Validate against requirements",
            "Identify potential manufacturing issues",
          ],
          tools: [
            "Design Validation Software",
            "Simulation Tools",
            "Collaboration Platforms",
          ],
          deliverables: [
            "Validation Report",
            "Design Improvement Recommendations",
            "Final Design Package",
          ],
          timeline: "1-2 weeks (scope dependent)",
        },
        {
          title: "Post-Validation Iteration",
          description:
            "We implement necessary revisions based on validation findings and document all changes for traceability.",
          image: "post-validation.jpg",
          keyPoints: [
            "Implement design revisions based on validation findings",
            "Document design changes and justifications",
            "Update models and technical documentation",
          ],
          tools: [
            "CAD Software",
            "Change Management Tools",
            "Documentation Systems",
          ],
          deliverables: [
            "Updated Models",
            "Change Documentation",
            "Revision History",
          ],
          timeline: "3-5 business days",
        },
        {
          title: "Design Handover",
          description:
            "We ensure a smooth transition of all design assets and knowledge to your team.",
          image: "design-handover.jpg",
          keyPoints: [
            "Prepare final deliverable package",
            "Document parametric model guidelines",
            "Create design intent documentation",
            "Conduct knowledge transfer session",
          ],
          tools: [
            "Knowledge Management Systems",
            "Documentation Tools",
            "Training Platforms",
          ],
          deliverables: [
            "Final Design Package",
            "Design Guidelines",
            "Knowledge Transfer Documentation",
          ],
          timeline: "1-2 business days",
        },
      ],
    },
  },
  "biw-design": {
    id: "4",
    title: "BIW Design Services",
    description:
      "Specialized Body-in-White (BIW) design services integrating advanced manufacturing simulation and comprehensive cross-team coordination.",
    slug: "biw-design",
    icon: "Car",
    features: [
      "BIW process design",
      "Fixture and jig design",
      "Welding and assembly tooling",
      "Inspection equipment design",
      "SPM design",
      "Technical documentation",
    ],
    category: ["Engineering", "Manufacturing"],
    details: {
      specifications: [
        {
          category: "BIW Design Capabilities",
          items: [
            { label: "Software", value: "CATIA, Siemens NX, AutoForm, DELMIA" },
            {
              label: "Standards",
              value: "OEM-specific standards, ISO, IATF 16949",
            },
            {
              label: "Experience",
              value:
                "Passenger vehicles, commercial vehicles, specialty vehicles",
            },
            {
              label: "Project Scale",
              value: "Component-level to full vehicle programs",
            },
          ],
        },
      ],
      process: [
        {
          title: "Process Planning",
          description:
            "We develop comprehensive manufacturing process plans for BIW components and assemblies, optimizing production efficiency and quality.",
          image: "process-planning.jpg",
          keyPoints: [
            "Develop manufacturing sequences and station layouts",
            "Conduct station balancing optimization",
            "Perform cycle time analysis and optimization",
          ],
          tools: [
            "Process Planning Software",
            "Digital Manufacturing Tools",
            "Time Study Software",
          ],
          deliverables: [
            "Process Flow Charts",
            "Station Layouts",
            "Cycle Time Reports",
          ],
          timeline: "4-6 weeks",
        },
        {
          title: "Cross-Team Integration",
          description:
            "We ensure seamless coordination between all relevant engineering teams for integrated BIW development.",
          image: "cross-team-integration.jpg",
          keyPoints: [
            "Coordinate with body, chassis, and powertrain design teams",
            "Resolve interface conflicts and integration issues",
            "Establish common reference systems and standards",
          ],
          tools: [
            "Collaboration Platforms",
            "Interface Management Tools",
            "Design Review Software",
          ],
          deliverables: [
            "Integration Plan",
            "Interface Specifications",
            "Coordination Reports",
          ],
          timeline: "1-2 weeks",
        },
        {
          title: "Fixture Design",
          description:
            "Our engineers design precise fixtures and jigs for component handling, positioning, and assembly operations.",
          image: "fixture-design.jpg",
          keyPoints: [
            "Develop locating schemes and clamping mechanisms",
            "Design handling and positioning fixtures",
            "Perform tolerance stack-up analysis",
          ],
          tools: [
            "Advanced CAD Software",
            "FEA Tools",
            "Tolerance Analysis Software",
          ],
          deliverables: [
            "3D Fixture Models",
            "Technical Drawings",
            "Bill of Materials",
          ],
          timeline: "6-12 weeks",
        },
        {
          title: "Welding Equipment Design",
          description:
            "We design specialized welding equipment and processes for various joining operations in BIW production.",
          image: "welding-equipment.jpg",
          keyPoints: [
            "Select and position welding guns and equipment",
            "Plan robot paths and welding sequences",
            "Integrate weld quality verification methods",
          ],
          tools: [
            "Welding Simulation Software",
            "Robot Programming Tools",
            "Process Validation Software",
          ],
          deliverables: [
            "Welding Equipment Designs",
            "Robot Programs",
            "Process Parameters",
          ],
          timeline: "5-10 weeks",
        },
        {
          title: "Manufacturing Simulation",
          description:
            "We conduct comprehensive simulation of the BIW manufacturing process to optimize production flow and identify potential issues.",
          image: "manufacturing-simulation.jpg",
          keyPoints: [
            "Simulate assembly sequence and production flow",
            "Verify access for tools and operators",
            "Analyze ergonomic factors and safety considerations",
          ],
          tools: [
            "Digital Manufacturing Software",
            "Ergonomics Analysis Tools",
            "Process Simulation Software",
          ],
          deliverables: [
            "Simulation Reports",
            "Process Optimization Recommendations",
            "Ergonomic Analysis Results",
          ],
          timeline: "3-6 weeks",
        },
        {
          title: "Assembly System Design",
          description:
            "We design comprehensive assembly systems and production line layouts for efficient BIW manufacturing.",
          image: "assembly-system.jpg",
          keyPoints: [
            "Design assembly line layouts and material flow",
            "Integrate automation and manual operations",
            "Optimize production efficiency and quality",
          ],
          tools: [
            "Factory Simulation Software",
            "Automation Design Tools",
            "Material Flow Analysis Software",
          ],
          deliverables: [
            "Assembly System Design",
            "Production Line Layouts",
            "Automation Specifications",
          ],
          timeline: "6-10 weeks",
        },
        {
          title: "Enhanced Validation",
          description:
            "We perform comprehensive validation and testing of BIW designs and manufacturing processes.",
          image: "enhanced-validation.jpg",
          keyPoints: [
            "Conduct structural and dimensional validation",
            "Perform manufacturing process validation",
            "Execute quality and performance testing",
          ],
          tools: [
            "Validation Software",
            "Testing Equipment",
            "Measurement Systems",
          ],
          deliverables: [
            "Validation Reports",
            "Test Results",
            "Quality Documentation",
          ],
          timeline: "4-6 weeks",
        },
        {
          title: "Documentation & Training",
          description:
            "We provide comprehensive documentation and training programs for BIW manufacturing processes and procedures.",
          image: "documentation-training.jpg",
          keyPoints: [
            "Create detailed process documentation",
            "Develop operator training materials",
            "Establish quality control procedures",
          ],
          tools: [
            "Documentation Software",
            "Training Development Tools",
            "Knowledge Management Systems",
          ],
          deliverables: [
            "Process Documentation",
            "Training Materials",
            "Quality Procedures",
          ],
          timeline: "1-2 weeks",
        },
      ],
    },
  },
  "finite-element-cfd": {
    id: "5",
    title: "Finite Element & CFD Analysis",
    description:
      "Advanced structural and fluid dynamics analysis using state-of-the-art FEA and CFD simulation technologies for optimized design performance.",
    slug: "finite-element-cfd",
    icon: "Cog",
    features: [
      "Structural analysis",
      "Thermal analysis",
      "Fluid flow simulation",
      "Multiphysics analysis",
      "Design optimization",
      "Failure prediction",
    ],
    category: ["Engineering", "Simulation & Analysis"],
    details: {
      specifications: [
        {
          category: "Simulation Capabilities",
          items: [
            {
              label: "Software",
              value:
                "ANSYS, Abaqus, SolidWorks Simulation, COMSOL Multiphysics, Fluent",
            },
            {
              label: "Analysis Types",
              value: "Static, Dynamic, Modal, Thermal, CFD, Fatigue, Nonlinear",
            },
            {
              label: "Model Size",
              value: "From simple components to complex assemblies",
            },
            {
              label: "Accuracy",
              value: "Validated against physical testing with >95% correlation",
            },
          ],
        },
      ],
      process: [
        {
          title: "Problem Definition",
          description:
            "We begin by clearly defining the analysis objectives, scope, and expected outcomes to ensure focused and effective simulation studies.",
          image: "problem-definition.jpg",
          keyPoints: [
            "Define analysis objectives and scope",
            "Identify key performance parameters",
            "Establish success criteria and validation requirements",
          ],
          tools: [
            "Requirements Documentation Software",
            "Engineering Consultation Tools",
            "Project Management Software",
          ],
          deliverables: [
            "Analysis Plan",
            "Problem Statement",
            "Success Criteria Document",
          ],
          timeline: "3-5 days",
        },
        {
          title: "Pre-Analysis",
          description:
            "Our engineers conduct thorough pre-analysis planning including method selection, approach validation, and resource planning.",
          image: "pre-analysis.jpg",
          keyPoints: [
            "Select appropriate analysis methods and tools",
            "Validate analysis approach and assumptions",
            "Plan computational resources and timeline",
          ],
          tools: [
            "CAD Software",
            "Model Simplification Tools",
            "Geometry Analysis Software",
          ],
          deliverables: [
            "Analysis Strategy",
            "Method Validation",
            "Resource Plan",
          ],
          timeline: "2-4 days",
        },
        {
          title: "Model Preparation",
          description:
            "We create detailed finite element meshes and CFD models with proper boundary conditions, material properties, and loading scenarios.",
          image: "model-preparation.jpg",
          keyPoints: [
            "Generate high-quality finite element meshes",
            "Define boundary conditions and material properties",
            "Set up loading scenarios and constraints",
          ],
          tools: [
            "Meshing Software",
            "Material Libraries",
            "Boundary Condition Tools",
          ],
          deliverables: [
            "Simulation Models",
            "Mesh Quality Reports",
            "Model Validation",
          ],
          timeline: "1-3 weeks (meshing dependent)",
        },
        {
          title: "Simulation Execution",
          description:
            "We execute comprehensive FEA and CFD simulations using high-performance computing resources with continuous monitoring and quality control.",
          image: "simulation-execution.jpg",
          keyPoints: [
            "Execute simulations with optimal solver settings",
            "Monitor convergence and solution quality",
            "Manage computational resources efficiently",
          ],
          tools: [
            "FEA Software",
            "CFD Solvers",
            "High-Performance Computing Resources",
          ],
          deliverables: [
            "Simulation Results",
            "Convergence Reports",
            "Quality Control Documentation",
          ],
          timeline: "2-10 days (solver dependent)",
        },
        {
          title: "Multi-Condition Analysis",
          description:
            "We conduct comprehensive analysis under various operating conditions, loading scenarios, and design variations to ensure robust design validation.",
          image: "multi-condition.jpg",
          keyPoints: [
            "Analyze multiple loading and operating conditions",
            "Conduct parametric and sensitivity studies",
            "Evaluate design variations and alternatives",
          ],
          tools: [
            "Parametric Analysis Tools",
            "Load Case Generators",
            "Statistical Analysis Software",
          ],
          deliverables: [
            "Multi-Condition Results",
            "Sensitivity Analysis",
            "Design Comparison Studies",
          ],
          timeline: "1-2 weeks",
        },
        {
          title: "Results Analysis",
          description:
            "Our experts perform detailed analysis and interpretation of simulation results, identifying critical insights and design recommendations.",
          image: "results-analysis.jpg",
          keyPoints: [
            "Analyze and interpret simulation results",
            "Identify critical stress concentrations and flow patterns",
            "Generate design improvement recommendations",
          ],
          tools: [
            "Post-Processing Software",
            "Data Visualization Tools",
            "Analysis Automation Scripts",
          ],
          deliverables: [
            "Results Analysis",
            "Critical Findings Report",
            "Design Recommendations",
          ],
          timeline: "3-5 days",
        },
        {
          title: "Report Generation",
          description:
            "We create comprehensive technical reports with detailed analysis results, visualizations, and actionable engineering recommendations.",
          image: "report-generation.jpg",
          keyPoints: [
            "Generate comprehensive technical reports",
            "Create professional visualizations and animations",
            "Provide actionable engineering recommendations",
          ],
          tools: [
            "Technical Writing Software",
            "Visualization Tools",
            "Report Templates",
          ],
          deliverables: [
            "Technical Analysis Report",
            "Executive Summary",
            "Visualization Package",
          ],
          timeline: "3-5 days",
        },
      ],
    },
  },
  "supplier-sourcing": {
    id: "6",
    title: "End-to-End Supplier Sourcing",
    description:
      "Strategic supplier sourcing and integration services to identify, evaluate, and onboard reliable manufacturing partners for your supply chain.",
    slug: "supplier-sourcing",
    icon: "Factory",
    features: [
      "Supplier identification",
      "Capability assessment",
      "Quality system evaluation",
      "Cost analysis",
      "Supplier onboarding",
      "Ongoing management",
    ],
    category: ["Manufacturing", "Consulting"],
    details: {
      specifications: [
        {
          category: "Sourcing Capabilities",
          items: [
            {
              label: "Geographic Focus",
              value: "India, China, Southeast Asia, Eastern Europe",
            },
            {
              label: "Industries",
              value:
                "Automotive, Consumer Products, Electronics, Medical Devices",
            },
            {
              label: "Supplier Database",
              value: "Over 5,000 pre-vetted manufacturers",
            },
            {
              label: "Success Rate",
              value: "92% long-term supplier relationship success",
            },
          ],
        },
      ],
      process: [
        {
          title: "Requirements Definition",
          description:
            "We begin by clearly defining your sourcing requirements, specifications, and strategic objectives to ensure targeted and effective supplier identification.",
          image: "requirements-definition.jpg",
          keyPoints: [
            "Define detailed sourcing requirements and specifications",
            "Establish procurement objectives and success criteria",
            "Document quality, delivery, and cost requirements",
          ],
          tools: [
            "Requirements Management Software",
            "Specification Development Tools",
            "Cost Modeling Software",
          ],
          deliverables: [
            "Sourcing Requirements Document",
            "Procurement Strategy",
            "Success Criteria",
          ],
          timeline: "1-2 days",
        },
        {
          title: "Risk Assessment",
          description:
            "Our experts conduct comprehensive supply chain risk analysis to identify potential risks and develop mitigation strategies.",
          image: "risk-assessment.jpg",
          keyPoints: [
            "Analyze supply chain risks and vulnerabilities",
            "Assess geopolitical, financial, and operational risks",
            "Develop risk mitigation strategies and contingency plans",
          ],
          tools: [
            "Risk Assessment Software",
            "Geopolitical Analysis Tools",
            "Contingency Planning Systems",
          ],
          deliverables: [
            "Risk Assessment Report",
            "Risk Mitigation Plan",
            "Contingency Strategies",
          ],
          timeline: "2-3 days",
        },
        {
          title: "Supplier Identification",
          description:
            "We conduct extensive market research and supplier discovery to identify qualified suppliers that meet your specific requirements.",
          image: "supplier-identification.jpg",
          keyPoints: [
            "Conduct comprehensive market research and analysis",
            "Identify potential suppliers through multiple channels",
            "Screen suppliers for basic qualification criteria",
          ],
          tools: [
            "Supplier Database",
            "Screening Software",
            "Network Analysis Tools",
          ],
          deliverables: [
            "Supplier Long List",
            "Market Analysis Report",
            "Initial Screening Results",
          ],
          timeline: "1-2 weeks",
        },
        {
          title: "Supplier Evaluation",
          description:
            "We perform detailed supplier capability assessments including technical, financial, quality, and operational evaluations.",
          image: "supplier-evaluation.jpg",
          keyPoints: [
            "Conduct detailed supplier capability assessments",
            "Evaluate technical, financial, and operational capabilities",
            "Perform quality system and certification reviews",
          ],
          tools: [
            "Audit Management Software",
            "Quality Assessment Tools",
            "Capacity Analysis Systems",
          ],
          deliverables: [
            "Supplier Evaluation Reports",
            "Capability Assessments",
            "Qualification Matrix",
          ],
          timeline: "2-4 weeks (includes site visits)",
        },
        {
          title: "Supplier Selection",
          description:
            "We facilitate strategic supplier selection through comprehensive analysis, comparison, and decision-making processes.",
          image: "supplier-selection.jpg",
          keyPoints: [
            "Compare suppliers using weighted decision criteria",
            "Conduct final supplier assessments and negotiations",
            "Make strategic supplier selection recommendations",
          ],
          tools: [
            "Selection Matrix Software",
            "TCO Calculation Tools",
            "Strategic Analysis Systems",
          ],
          deliverables: [
            "Supplier Selection Report",
            "Recommendation Summary",
            "Selection Justification",
          ],
          timeline: "2-3 days",
        },
        {
          title: "Contract Negotiation",
          description:
            "Our procurement experts manage comprehensive contract negotiations to secure optimal terms, conditions, and pricing.",
          image: "contract-negotiation.jpg",
          keyPoints: [
            "Negotiate optimal pricing, terms, and conditions",
            "Establish service level agreements and KPIs",
            "Secure favorable contract terms and risk allocation",
          ],
          tools: [
            "Contract Management Software",
            "SLA Development Tools",
            "Legal Document Systems",
          ],
          deliverables: [
            "Negotiated Contracts",
            "Terms and Conditions",
            "SLA Agreements",
          ],
          timeline: "1-3 weeks",
        },
        {
          title: "Supplier Onboarding",
          description:
            "We manage comprehensive supplier onboarding and integration processes to ensure smooth operational startup and relationship establishment.",
          image: "supplier-onboarding.jpg",
          keyPoints: [
            "Manage supplier integration and system setup",
            "Establish communication and reporting procedures",
            "Implement quality and performance monitoring systems",
          ],
          tools: [
            "Onboarding Management Software",
            "Quality Control Systems",
            "Communication Platforms",
          ],
          deliverables: [
            "Onboarding Plan",
            "Integration Documentation",
            "Communication Procedures",
          ],
          timeline: "2-4 weeks",
        },
        {
          title: "Performance Monitoring",
          description:
            "We establish ongoing supplier performance monitoring and management systems to ensure continuous improvement and relationship optimization.",
          image: "performance-monitoring.jpg",
          keyPoints: [
            "Implement performance monitoring and KPI tracking",
            "Conduct regular supplier performance reviews",
            "Manage continuous improvement and optimization",
          ],
          tools: [
            "Performance Monitoring Software",
            "KPI Dashboard Tools",
            "Improvement Tracking Systems",
          ],
          deliverables: [
            "Performance Monitoring System",
            "KPI Reports",
            "Improvement Plans",
          ],
          timeline: "Ongoing",
        },
      ],
    },
  },
  "gdt-tolerance": {
    id: "7",
    title: "GD&T and Tolerance Analysis",
    description:
      "Expert geometric dimensioning and tolerancing services ensuring precise manufacturing specifications and comprehensive quality control.",
    slug: "gdt-tolerance",
    icon: "Ruler",
    features: [
      "GD&T implementation",
      "Tolerance stack-up analysis",
      "Design for manufacturing review",
      "Inspection planning",
      "Drawing conversion",
      "Manufacturing consultation",
    ],
    category: ["Engineering", "Design"],
    details: {
      specifications: [
        {
          category: "GD&T Capabilities",
          items: [
            { label: "Standards", value: "ASME Y14.5-2018, ISO 1101:2017" },
            {
              label: "Analysis Methods",
              value: "1D, 2D, and 3D tolerance analysis",
            },
            {
              label: "Software",
              value:
                "Sigmetrix CETOL, 3DCS, GD&T Advisor, SolidWorks TolAnalyst",
            },
            {
              label: "Experience",
              value: "Automotive, aerospace, medical device, consumer products",
            },
          ],
        },
      ],
      process: [
        {
          title: "Design Review",
          description:
            "We conduct comprehensive review of technical drawings and design specifications to assess current tolerancing practices and identify improvement opportunities.",
          image: "design-review.jpg",
          keyPoints: [
            "Review existing technical drawings and specifications",
            "Assess current tolerancing practices and standards",
            "Identify critical dimensions and geometric requirements",
          ],
          tools: [
            "CAD Software",
            "Drawing Review Tools",
            "Functional Analysis Software",
          ],
          deliverables: [
            "Design Review Report",
            "GD&T Assessment",
            "Improvement Recommendations",
          ],
          timeline: "1-2 days",
        },
        {
          title: "Manufacturing Method Analysis",
          description:
            "Our experts analyze manufacturing processes and capabilities to ensure GD&T specifications are achievable and cost-effective.",
          image: "manufacturing-method.jpg",
          keyPoints: [
            "Analyze manufacturing processes and capabilities",
            "Assess process capability and control methods",
            "Evaluate tooling and fixture requirements",
          ],
          tools: [
            "Manufacturing Analysis Software",
            "Process Capability Tools",
            "Tooling Database",
          ],
          deliverables: [
            "Process Capability Report",
            "Manufacturing Assessment",
            "Tooling Requirements",
          ],
          timeline: "2-3 days",
        },
        {
          title: "GD&T Implementation",
          description:
            "We implement comprehensive GD&T standards on technical drawings with proper symbols, datums, and geometric controls.",
          image: "gdt-implementation.jpg",
          keyPoints: [
            "Apply GD&T symbols and geometric controls",
            "Establish datum reference frames",
            "Optimize tolerance specifications for functionality",
          ],
          tools: [
            "GD&T Software",
            "CAD Systems",
            "Standards Reference Libraries",
          ],
          deliverables: [
            "GD&T Drawings",
            "Datum Schemes",
            "Tolerance Specifications",
          ],
          timeline: "1-2 weeks",
        },
        {
          title: "Tolerance Stack-up Analysis",
          description:
            "We perform detailed tolerance stack-up analysis using statistical methods to predict assembly variation and optimize tolerance allocation.",
          image: "tolerance-analysis.jpg",
          keyPoints: [
            "Conduct worst-case and statistical tolerance analysis",
            "Predict assembly variation and fit conditions",
            "Optimize tolerance allocation for cost and quality",
          ],
          tools: [
            "Tolerance Analysis Software",
            "Statistical Analysis Tools",
            "Simulation Software",
          ],
          deliverables: [
            "Stack-up Analysis Report",
            "Variation Predictions",
            "Tolerance Optimization",
          ],
          timeline: "1-2 weeks",
        },
        {
          title: "Measurement System Design",
          description:
            "We design comprehensive measurement and inspection systems to verify GD&T requirements with appropriate gauging and measurement strategies.",
          image: "measurement-analysis.jpg",
          keyPoints: [
            "Design measurement and inspection procedures",
            "Select appropriate gauging and measurement tools",
            "Develop inspection planning and documentation",
          ],
          tools: ["MSA Software", "Gauge R&R Tools", "Calibration Systems"],
          deliverables: [
            "Measurement Plan",
            "Gauge Requirements",
            "Inspection Procedures",
          ],
          timeline: "2-3 days",
        },
        {
          title: "Design Optimization",
          description:
            "We optimize designs for improved manufacturability, reduced cost, and enhanced quality through strategic tolerance refinement.",
          image: "design-optimization.jpg",
          keyPoints: [
            "Optimize tolerances for manufacturing efficiency",
            "Balance quality requirements with cost considerations",
            "Improve design robustness and reliability",
          ],
          tools: [
            "Optimization Software",
            "Cost Analysis Tools",
            "Manufacturing Database",
          ],
          deliverables: [
            "Optimized Design",
            "Cost-Benefit Analysis",
            "Quality Improvement Plan",
          ],
          timeline: "2-4 days",
        },
        {
          title: "Process Control Implementation",
          description:
            "We establish comprehensive process control systems to maintain GD&T compliance throughout manufacturing operations.",
          image: "spc-planning.jpg",
          keyPoints: [
            "Implement statistical process control systems",
            "Establish quality monitoring and control procedures",
            "Develop continuous improvement processes",
          ],
          tools: [
            "SPC Software",
            "Quality Control Tools",
            "Process Monitoring Systems",
          ],
          deliverables: [
            "Process Control Plan",
            "SPC Implementation",
            "Quality Procedures",
          ],
          timeline: "1-2 weeks",
        },
      ],
    },
  },
  "machine-design": {
    id: "8",
    title: "Machine Design",
    description:
      "Expert mechanical design services integrating safety compliance, automation systems, and comprehensive documentation for optimal machine performance.",
    slug: "machine-design",
    icon: "Settings",
    features: [
      "Custom machinery design",
      "Automation system design",
      "Mechanism optimization",
      "Safety compliance",
      "Performance analysis",
      "Design documentation",
    ],
    category: ["Engineering", "Design"],
    details: {
      specifications: [
        {
          category: "Design Capabilities",
          items: [
            {
              label: "Design Standards",
              value: "ISO, ANSI, CE, OSHA compliant designs",
            },
            {
              label: "CAD Software",
              value: "SolidWorks, CATIA, Inventor, Fusion 360",
            },
            { label: "Analysis Tools", value: "FEA, Motion Analysis, CFD" },
            {
              label: "Industries",
              value:
                "Manufacturing, Automation, Process Industry, Special Purpose Machines",
            },
          ],
        },
      ],
      process: [
        {
          title: "Requirements Analysis",
          description:
            "We begin by thoroughly understanding your machine specifications, operational requirements, and performance criteria.",
          image: "requirements-analysis.jpg",
          keyPoints: [
            "Define machine specifications and operational parameters",
            "Analyze performance requirements and constraints",
            "Establish safety and regulatory compliance needs",
          ],
          tools: [
            "Requirements Management Software",
            "Industry Standards Database",
            "Cost Analysis Tools",
          ],
          deliverables: [
            "Machine Requirements Document",
            "Performance Specifications",
            "Compliance Checklist",
          ],
          timeline: "2-3 weeks",
        },
        {
          title: "Safety Assessment",
          description:
            "Our engineers conduct comprehensive safety analysis and risk assessment to ensure machine compliance with all relevant safety standards.",
          image: "safety-assessment.jpg",
          keyPoints: [
            "Conduct comprehensive risk assessment",
            "Identify potential hazards and safety measures",
            "Ensure compliance with safety standards",
          ],
          tools: [
            "Risk Assessment Software",
            "Safety Standards Database",
            "Compliance Tracking Tools",
          ],
          deliverables: [
            "Safety Assessment Report",
            "Risk Analysis Documentation",
            "Safety Compliance Plan",
          ],
          timeline: "2-3 weeks (and ongoing)",
        },
        {
          title: "Conceptual Design",
          description:
            "We develop initial machine concepts and system architectures, evaluating different design approaches for optimal performance.",
          image: "conceptual-design.jpg",
          keyPoints: [
            "Generate multiple design concepts",
            "Evaluate design alternatives",
            "Select optimal design approach",
          ],
          tools: ["CAD Software", "Simulation Tools", "Design Libraries"],
          deliverables: [
            "Concept Designs",
            "Design Evaluation Report",
            "Selected Design Approach",
          ],
          timeline: "3-5 weeks",
        },
        {
          title: "Detailed Mechanical Design",
          description:
            "Our team creates precise mechanical designs with detailed component specifications, assembly drawings, and manufacturing documentation.",
          image: "detailed-design.jpg",
          keyPoints: [
            "Create detailed mechanical components",
            "Develop assembly drawings and specifications",
            "Optimize for manufacturing and assembly",
          ],
          tools: [
            "Advanced CAD Software",
            "PDM Systems",
            "Component Libraries",
          ],
          deliverables: [
            "Detailed 3D Models",
            "Assembly Drawings",
            "Manufacturing Specifications",
          ],
          timeline: "6-12 weeks",
        },
        {
          title: "Control System Design",
          description:
            "We design and integrate advanced control systems, including PLC programming, HMI development, and automation sequences.",
          image: "control-system.jpg",
          keyPoints: [
            "Design control system architecture",
            "Develop PLC programming and logic",
            "Create HMI interfaces and operator controls",
          ],
          tools: [
            "Control System Design Software",
            "PLC Programming Tools",
            "HMI Design Software",
          ],
          deliverables: [
            "Control System Design",
            "PLC Programs",
            "HMI Interfaces",
          ],
          timeline: "4-8 weeks",
        },
        {
          title: "Analysis & Optimization",
          description:
            "We perform comprehensive engineering analysis including stress analysis, thermal analysis, and performance optimization.",
          image: "analysis-optimization.jpg",
          keyPoints: [
            "Conduct structural and thermal analysis",
            "Optimize machine performance",
            "Validate design against requirements",
          ],
          tools: [
            "FEA Software",
            "Motion Analysis Tools",
            "Optimization Software",
          ],
          deliverables: [
            "Analysis Reports",
            "Optimization Recommendations",
            "Performance Validation",
          ],
          timeline: "3-5 weeks",
        },
        {
          title: "Maintenance Planning",
          description:
            "We develop comprehensive maintenance strategies including preventive maintenance schedules, spare parts planning, and service procedures.",
          image: "maintenance-planning.jpg",
          keyPoints: [
            "Develop preventive maintenance schedules",
            "Create maintenance procedures and documentation",
            "Plan spare parts inventory and sourcing",
          ],
          tools: [
            "Maintenance Planning Software",
            "Documentation Tools",
            "Parts Management Systems",
          ],
          deliverables: [
            "Maintenance Manual",
            "Service Schedules",
            "Spare Parts List",
          ],
          timeline: "1-2 weeks",
        },
        {
          title: "Operator Training",
          description:
            "We provide comprehensive operator training programs including training materials, procedures, and hands-on instruction.",
          image: "operator-training.jpg",
          keyPoints: [
            "Develop operator training materials",
            "Create operating procedures and safety protocols",
            "Provide hands-on training and certification",
          ],
          tools: [
            "Training Development Software",
            "Documentation Tools",
            "Learning Management Systems",
          ],
          deliverables: [
            "Training Materials",
            "Operating Procedures",
            "Training Certification",
          ],
          timeline: "1-2 weeks",
        },
      ],
    },
  },
  "technical-documentation": {
    id: "9",
    title: "Technical Documentation & Rendering",
    description:
      "Professional technical documentation and visualization services delivering clear, accessible content with photorealistic product renderings.",
    slug: "technical-documentation",
    icon: "FileText",
    features: [
      "Technical documentation",
      "Photorealistic rendering",
      "Assembly instructions",
      "Marketing visuals",
      "User manuals",
      "Training materials",
    ],
    category: ["Design", "Documentation"],
    details: {
      specifications: [
        {
          category: "Documentation & Rendering Capabilities",
          items: [
            {
              label: "Documentation Standards",
              value: "ISO, IEC, ANSI, Industry-specific standards",
            },
            {
              label: "Rendering Software",
              value: "KeyShot, V-Ray, 3ds Max, Blender",
            },
            {
              label: "Output Formats",
              value: "PDF, Interactive HTML, Print-ready files, 4K renders",
            },
            {
              label: "Languages",
              value: "Multi-language support with technical accuracy",
            },
          ],
        },
      ],
      process: [
        {
          title: "User Needs Analysis",
          description:
            "We conduct comprehensive analysis of user requirements, audience characteristics, and documentation objectives to ensure targeted and effective content.",
          image: "user-research.jpg",
          keyPoints: [
            "Analyze target audience and user personas",
            "Identify documentation requirements and objectives",
            "Assess current documentation gaps and opportunities",
          ],
          tools: [
            "User Research Software",
            "Analytics Tools",
            "Survey Platforms",
          ],
          deliverables: [
            "User Research Report",
            "Audience Analysis",
            "Requirements Document",
          ],
          timeline: "2-3 days",
        },
        {
          title: "Content Planning",
          description:
            "Our team develops comprehensive content strategies, information architecture, and documentation frameworks to ensure organized and accessible content.",
          image: "content-planning.jpg",
          keyPoints: [
            "Develop content strategy and information architecture",
            "Create documentation frameworks and templates",
            "Plan content organization and navigation structure",
          ],
          tools: [
            "Content Management Systems",
            "Project Planning Software",
            "Style Guide Tools",
          ],
          deliverables: [
            "Content Strategy",
            "Information Architecture",
            "Documentation Framework",
          ],
          timeline: "2-4 days",
        },
        {
          title: "Technical Writing",
          description:
            "We create clear, concise, and comprehensive technical content tailored to your audience needs and technical complexity.",
          image: "technical-writing.jpg",
          keyPoints: [
            "Write clear and concise technical content",
            "Develop user-focused documentation and procedures",
            "Create comprehensive reference materials",
          ],
          tools: [
            "Technical Writing Software",
            "Documentation Tools",
            "Review Systems",
          ],
          deliverables: [
            "Technical Content",
            "User Documentation",
            "Reference Materials",
          ],
          timeline: "2-4 weeks (per manual)",
        },
        {
          title: "3D Modeling & Visualization",
          description:
            "We create detailed 3D models and technical illustrations to enhance documentation clarity and user understanding.",
          image: "3d-modeling.jpg",
          keyPoints: [
            "Create detailed 3D models and technical illustrations",
            "Develop interactive visual content",
            "Design clear and informative diagrams",
          ],
          tools: [
            "3D Modeling Software",
            "Material Libraries",
            "Scene Setup Tools",
          ],
          deliverables: [
            "3D Models",
            "Technical Illustrations",
            "Interactive Visuals",
          ],
          timeline: "1-2 weeks",
        },
        {
          title: "Rendering & Graphics",
          description:
            "We produce high-quality renders, graphics, and visual content to support and enhance technical documentation.",
          image: "rendering.jpg",
          keyPoints: [
            "Create high-quality renders and graphics",
            "Develop consistent visual style and branding",
            "Optimize images for various output formats",
          ],
          tools: [
            "Rendering Software",
            "Post-Processing Tools",
            "Color Management Systems",
          ],
          deliverables: [
            "Rendered Images",
            "Graphics Package",
            "Visual Style Guide",
          ],
          timeline: "2-5 days",
        },
        {
          title: "Accessibility & Standards",
          description:
            "We ensure all documentation meets accessibility standards and compliance requirements for inclusive user access.",
          image: "accessibility.jpg",
          keyPoints: [
            "Implement accessibility standards and guidelines",
            "Ensure compliance with WCAG and other standards",
            "Optimize content for assistive technologies",
          ],
          tools: [
            "Accessibility Testing Tools",
            "Translation Management Systems",
            "Layout Adaptation Software",
          ],
          deliverables: [
            "Accessibility Report",
            "Compliance Documentation",
            "Optimized Content",
          ],
          timeline: "2-3 days",
        },
        {
          title: "User Testing & Validation",
          description:
            "We conduct comprehensive user testing to validate documentation effectiveness and implement improvements based on user feedback.",
          image: "user-testing.jpg",
          keyPoints: [
            "Conduct user testing and usability studies",
            "Collect and analyze user feedback",
            "Implement improvements and revisions",
          ],
          tools: [
            "Usability Testing Software",
            "Feedback Management Tools",
            "Version Control Systems",
          ],
          deliverables: [
            "Test Results",
            "Revision History",
            "Final Documentation Package",
          ],
          timeline: "3-5 days",
        },
      ],
    },
  },
};

interface Props {
  params: {
    slug: string;
  };
}

export default function ServicePage({ params }: Props) {
  const service = servicesData[params.slug];

  if (!service) {
    throw new Error("Service not found");
  }

  return <ServiceDetails service={service} />;
}
