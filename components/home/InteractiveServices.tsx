'use client'

import { motion } from 'framer-motion'
import { Printer, Boxes, Car, Factory, Ruler, Layers, Cog, Settings, FileText, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from 'react'
import Link from 'next/link'

const InteractiveServices = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const services = [
    {
      title: "Research & Development",
      slug: "research-development",
      description: "Expert research and development services to transform your innovative ideas into market-ready products, with comprehensive validation and regulatory compliance.",
      bottomDescription: "Turn innovative concepts into successful products with our end-to-end R&D services.",
      icon: Layers,
      category: ['Engineering', 'Design'],
      features: [
        'Project Scoping: Define clear objectives, requirements, and constraints',
        'Concept Design: Generate and evaluate multiple design concepts',
        'Prototype Development: Create functional prototypes for validation',
        'Engineering Analysis: Optimize designs with advanced technical analysis',
        'Manufacturing Planning: Develop detailed production strategies'
      ]
    },
    {
      title: "CAD Modeling",
      slug: "cad-modeling",
      description: "Professional CAD modeling and design services offering precise 3D models, technical documentation, and comprehensive design validation.",
      bottomDescription: "Turn your ideas into production-ready designs.",
      icon: Boxes,
      category: ['Design', 'Engineering'],
      features: [
        'Parametric Modeling: Flexible and scalable designs for complex projects',
        'Assembly Design: Accurate 3D assemblies for seamless production',
        'Technical Documentation: Complete, manufacturing-ready engineering drawings',
        'Design Optimization: Refined designs for cost-efficiency and superior performance'
      ]
    },
    
    {
      title: "BIW Design",
      slug: "biw-design",
      description: "Specialized Body-in-White (BIW) design services integrating advanced manufacturing simulation and comprehensive cross-team coordination.",
      bottomDescription: "Drive precision and efficiency in automotive production.",
      icon: Car,
      category: ['Engineering', 'Manufacturing'],
      features: [
        'BIW Process Design: Efficient workflows tailored to OEM standards',
        'BIW Tool Design: Innovative tools for welding, assembly, and inspection',
        'Technical Documentation: Clear, detailed documentation for quality compliance',
        'SPM Design: Custom special-purpose machines for unique production needs'
      ]
    },

    {
      title: "Finite Element & CFD Analysis",
      slug: "finite-element-cfd",
      description: "Advanced structural and fluid dynamics analysis using state-of-the-art FEA and CFD simulation technologies for optimized design performance.",
      bottomDescription: "Achieve reliability and performance with cutting-edge analysis.",
      icon: Cog,
      category: ['Engineering', 'Simulation & Analysis'],
      features: [
        'Design Validation: Ensure reliability through stress, thermal, and fluid flow analysis.',
        'Failure Prediction: Identify failure modes and improve system durability',
        'Performance Optimization: Boost efficiency with data-driven design improvements',
        'Value Engineering: Cost-effective solutions through innovative engineering'
      ]
    },

    {
      title: "GD&T and Tolerance Stack Up Analysis",
      slug: "gdt-tolerance",
      description: "Expert geometric dimensioning and tolerancing services ensuring precise manufacturing specifications and comprehensive quality control.",
      bottomDescription: "Guarantee flawless assemblies with accurate tolerance management.",
      icon: Ruler,
      category: ['Engineering', 'Design'],
      features: [
        'GD&T Drawings: Compliant with ASME Y14.5 and ISO standards for accuracy',
        'Tolerance Conversion: Transition easily from traditional to GD&T drawings',
        'Stack-Up Analysis: 1D, 2D, and 3D analyses to avoid assembly errors',
        'Inspection Dimensions: Define critical measurements for quality control'
      ]
    },

    {
      title: "3D Printing Prototyping",
      slug: "3d-printing",
      description: "Advanced 3D printing services delivering high-precision prototypes and production parts with rapid turnaround and comprehensive quality control.",
      bottomDescription: "Bring your designs to life with cutting-edge 3D printing technology.",
      icon: Printer,
      category: ['Manufacturing'],
      features: [
        'Material Versatility: Choose from PLA, ABS, PETG, ASA, and more for your specific needs',
        'High Precision: Achieve fine details with advanced 3D printing technology',
        'Quick Turnaround: Accelerate development cycles with rapid prototyping',
        'Quality Assurance: Ensure reliability with rigorous testing and validation'
      ]
    },
    
    {
      title: "Supplier Sourcing & Onboarding",
      slug: "supplier-sourcing",
      description: "Strategic supplier sourcing and integration services to identify, evaluate, and onboard reliable manufacturing partners for your supply chain.",
      bottomDescription: "Streamline your supply chain with expert industrialization support.",
      icon: Factory,
      category: ['Manufacturing', 'Consulting'],
      features: [
        'Supplier Sourcing: Access a verified network of high-quality Indian suppliers',
        'Feasibility Studies: Tailored research to match your manufacturing needs',
        'Batch Qualification: Manage small-batch production and supplier validation',
        'Seamless Onboarding: Align supplier processes with your standards for quality and efficiency'
      ]
    },
    {
      title: "Machine Design",
      slug: "machine-design",
      description: "Expert mechanical design services integrating safety compliance, automation systems, and comprehensive documentation for optimal machine performance.",
      bottomDescription: "Elevate your manufacturing capabilities with custom machine solutions.",
      icon: Settings,
      category: ['Engineering', 'Design'],
      features: [
        'Custom Machinery: Tailored solutions for unique manufacturing needs',
        'Automation Systems: Smart integration of controls and mechanisms',
        'Safety Compliance: Designs meeting international safety standards',
        'Performance Analysis: Optimization for efficiency and reliability'
      ]
    },
    {
      title: "Technical Documentation & Rendering",
      slug: "technical-documentation",
      description: "Professional technical documentation and visualization services delivering clear, accessible content with photorealistic product renderings.",
      bottomDescription: "Communicate your designs effectively with high-quality documentation and visuals.",
      icon: FileText,
      category: ['Design', 'Documentation'],
      features: [
        'Technical Writing: Clear and comprehensive documentation',
        'Photorealistic Renders: High-quality product visualization',
        'Assembly Instructions: Step-by-step guides and manuals',
        'Marketing Materials: Professional visuals for presentations'
      ]
    }
  ];

  const categories = ['All', 'Engineering', 'Design', 'Manufacturing', 'Simulation & Analysis', 'Documentation', 'Consulting'];

  return (
    <section className="pt-8 pb-16 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-4xl font-bold mb-8 text-center text-primary font-sans"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Innovative Services
        </motion.h2>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const isVisible = selectedCategory === 'All' || service.category.includes(selectedCategory);
            if (!isVisible) return null;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredService(index)}
                onHoverEnd={() => setHoveredService(null)}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group bg-white border-gray-200 overflow-hidden">
                  <CardContent className="p-0 flex flex-col h-full">
                    {/* Top Section - Fixed Content with Light Blue Background */}
                    <div className="flex-shrink-0 bg-primary/5 p-6 border-b border-primary/10">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="text-primary mb-6 flex items-center justify-center"
                      >
                        <service.icon size={48} />
                      </motion.div>
                      
                      <h3 className="text-xl font-bold mb-4 text-primary">
                        {service.title}
                      </h3>
                      
                      <p className="text-text/80 mb-0 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Middle Section - Variable Content */}
                    <div className="flex-grow p-6 pb-0">
                      <div className="space-y-4 mb-6">
                        {service.features.map((feature, fIndex) => {
                          const [title, description] = feature.split(": ");
                          return (
                            <motion.div
                              key={fIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ 
                                opacity: hoveredService === index ? 1 : 0.8,
                                x: hoveredService === index ? 0 : -5
                              }}
                              transition={{ delay: fIndex * 0.1 }}
                              className="flex items-start gap-3 text-sm text-text/80"
                            >
                              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                              <div>
                                <div className="font-semibold text-primary mb-1">{title}</div>
                                <div className="text-text/70 text-sm leading-relaxed">{description}</div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom Section - Aligned Content */}
                    <div className="flex-shrink-0 mt-auto p-6 pt-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.category.map((cat) => (
                          <span
                            key={cat}
                            className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      <div className="text-sm text-text/70 mb-4 font-medium italic">
                        {service.bottomDescription}
                      </div>

                      <Link href={`/services/${service.slug}`}>
                        <Button 
                          variant="outline" 
                          className="w-full group hover:bg-primary hover:text-white transition-all duration-300"
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Swipable Cards */}
        <div className="md:hidden">
          <div className="space-y-6">
            {services.map((service, index) => {
              const isVisible = selectedCategory === 'All' || service.category.includes(selectedCategory);
              if (!isVisible) return null;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full"
                >
                  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-primary flex-shrink-0">
                          <service.icon size={40} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-primary mb-2">
                            {service.title}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {service.category.map((cat) => (
                              <span
                                key={cat}
                                className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-text/80 mb-4 text-sm leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="space-y-3 mb-4">
                        {service.features.map((feature, fIndex) => {
                          const [title, description] = feature.split(": ");
                          return (
                            <div key={fIndex} className="flex items-start gap-3 text-sm text-text/80">
                              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                              <div>
                                <div className="font-semibold text-primary mb-1">{title}</div>
                                <div className="text-text/70 text-sm leading-relaxed">{description}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="text-sm text-text/70 mb-4 font-medium italic">
                        {service.bottomDescription}
                      </div>

                      <Link href={`/services/${service.slug}`}>
                        <Button 
                          variant="default" 
                          className="w-full"
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteractiveServices
