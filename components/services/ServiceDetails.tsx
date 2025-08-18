'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { UnifiedConsultationCard } from "@/components/shared/UnifiedConsultationCard";
import ProcessFlow from './ProcessFlow';
import type { Service } from '@/lib/types';

interface ServiceDetailsProps {
  service: Service;
}

const ServiceDetails = ({ service }: ServiceDetailsProps) => {
  const router = useRouter();
  const [showQuotation, setShowQuotation] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Floating Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-8 left-8 z-50"
      >
        <Button
          onClick={() => router.push('/')}
          variant="outline"
          className="shadow-lg hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40 bg-white hover:bg-white text-primary/80 hover:text-primary rounded-full px-6"
          aria-label="Go back to services overview page"
          role="button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Button>
      </motion.div>

      <div className="container mx-auto px-4 pb-12 pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-8 md:py-12 rounded-2xl">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h1 className="text-4xl font-bold mb-6">{service.title}</h1>
                <p className="text-lg text-text/80 mb-8">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.category.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <Button 
                  variant="default"
                  onClick={() => setShowQuotation(true)}
                >
                  Request Quote
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative h-[400px] rounded-lg overflow-hidden bg-gray-100"
              >
                <Image
                  src={`/images/services/${service.category[0].toLowerCase().replace(' & ', '-').replace(' ', '-')}/${service.slug}/main/service-hero.jpg`}
                  alt={`${service.title} service visualization`}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Fallback icon if image fails to load */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 opacity-0 group-[.error]:opacity-100">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {service.icon === 'Printer3d' ? (
                          <>
                            <path d="M6 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2"></path>
                            <rect x="6" y="14" width="12" height="8"></rect>
                          </>
                        ) : service.icon === 'Boxes' ? (
                          <>
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                          </>
                        ) : (
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        )}
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-primary mb-2">{service.title}</h3>
                    <p className="text-text/70">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="h-full">
                    <CardContent className="p-6 h-full flex items-start">
                      <div className="flex items-start space-x-4 w-full">
                        <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                          <Check className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-text/80 leading-relaxed">{feature}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        {service.details?.process && (
          <ProcessFlow 
            process={service.details.process} 
            category={service.category[0]}
            serviceSlug={service.slug}
          />
        )}

        {/* Specifications Section */}
        {service.details?.specifications && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12">Specifications</h2>
              {service.details.specifications.map((spec, index) => (
                <div key={spec.category} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-semibold mb-6">{spec.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {spec.items.map((item) => (
                      <div key={item.label} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow min-h-[120px] flex">
                        <div className="flex flex-col space-y-2 w-full">
                          <span className="text-sm font-medium text-primary/80 uppercase tracking-wide">
                            {item.label}
                          </span>
                          <span className="text-base font-semibold text-gray-900 leading-relaxed flex-grow">
                            {item.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Quotation Dialog */}
      <Dialog open={showQuotation} onOpenChange={setShowQuotation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Request a Quotation</DialogTitle>
          <UnifiedConsultationCard
            type="quotation"
            onSubmit={async (data) => {
              try {
                console.log('📝 Submitting quote request from service page:', data);
                
                const response = await fetch('/api/quotes', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                  console.log('✅ Quote submitted successfully:', result);
                  alert(`Quote request submitted successfully! Reference: ${result.quoteReference}`);
                  setShowQuotation(false);
                } else {
                  console.error('❌ Quote submission failed:', result);
                  alert(`Failed to submit quote: ${result.error}`);
                }
              } catch (error) {
                console.error('❌ Quote submission error:', error);
                alert('Failed to submit quote request. Please try again.');
              }
            }}
            defaultService={service.slug}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceDetails;
