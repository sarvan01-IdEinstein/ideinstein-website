'use client'

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const EinsteinQuoteSection = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-primary/3 to-primary/5 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border border-primary/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 border border-primary/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="w-16 h-16 mx-auto mb-8 text-primary/30 flex items-center justify-center bg-white/50 rounded-full shadow-lg"
        >
          <Quote size={32} />
        </motion.div>
        
        <motion.blockquote 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl italic font-light text-primary/90 max-w-4xl mx-auto leading-relaxed"
        >
          "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world."
        </motion.blockquote>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 text-base md:text-lg text-primary/70 font-medium"
        >
          — Albert Einstein
        </motion.p>

        {/* Enhanced Background Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-40 h-40 translate-x-1/2 translate-y-1/2 bg-gradient-to-tl from-primary/10 to-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>
    </motion.section>
  );
};

export default EinsteinQuoteSection;