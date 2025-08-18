'use client'

import * as React from "react"
import { motion } from 'framer-motion'
import { Calendar, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { UnifiedConsultationCard } from "@/components/shared/UnifiedConsultationCard"
import { FloatingButtons } from "@/components/shared/FloatingButtons"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

function HeroSection() {
  const [showConsultation, setShowConsultation] = React.useState(false)
  const [showQuotation, setShowQuotation] = React.useState(false)
  
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-center pt-32 pb-24 min-h-[80vh] flex flex-col justify-center relative overflow-hidden bg-transparent"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 font-sans"
        >
          Welcome to <span className="text-yellow-500">Id</span><span className="text-primary">Einstein</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl md:text-3xl mb-12 text-text/80 font-light"
        >
          Where Ideas Take Shape
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button 
            variant="cta"
            size="lg"
            onClick={() => setShowConsultation(true)}
          >
            Book Free Consulting <Calendar className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline"
            size="lg"
            onClick={() => setShowQuotation(true)}
          >
            Get Quotation <FileText className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-6 border-2 border-primary rounded-full"
          >
            <motion.div
              animate={{ height: ["0%", "50%", "0%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 mx-auto bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop Modals */}
      <Dialog open={showConsultation} onOpenChange={setShowConsultation}>
        <DialogContent className="max-w-md">
          <UnifiedConsultationCard
            type="consultation"
            onSubmit={async (data) => {
              console.log('Consultation data:', data)
              setShowConsultation(false)
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showQuotation} onOpenChange={setShowQuotation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <UnifiedConsultationCard
            type="quotation"
            onSubmit={async (data) => {
              try {
                console.log('📝 Submitting quote request from homepage:', data);
                
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
          />
        </DialogContent>
      </Dialog>

      {/* Mobile Floating Buttons */}
      <FloatingButtons />
    </motion.section>
  )
}

export default HeroSection
