'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import HeroSection from '@/components/home/HeroSection'
import InteractiveServices from '@/components/home/InteractiveServices'
import EinsteinQuoteSection from '@/components/home/EinsteinQuoteSection'
import CallToActionSection from '@/components/home/CallToActionSection'
import ParticlesBackground from '@/components/home/ParticlesBackground'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-50 flex items-center justify-center"
        >
          <div className="text-center">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <div className="absolute inset-0 h-12 w-12 border-2 border-primary/20 rounded-full mx-auto"></div>
            </div>
            <h2 className="text-xl font-semibold text-primary mb-2">Loading IdEinstein</h2>
            <p className="text-text/60">Where Ideas Take Shape...</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-transparent relative"
        >
          {/* Background */}
          <div className="fixed inset-0 z-0">
            <ParticlesBackground />
          </div>
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10"
          >
            <HeroSection />
            <InteractiveServices />
            <EinsteinQuoteSection />
            <CallToActionSection />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}