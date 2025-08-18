'use client'

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const MotionWrapper = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up'
}: MotionWrapperProps) => {
  const getDirectionVariants = () => {
    const distance = 50;
    switch (direction) {
      case 'up':
        return { initial: { y: distance }, animate: { y: 0 } };
      case 'down':
        return { initial: { y: -distance }, animate: { y: 0 } };
      case 'left':
        return { initial: { x: distance }, animate: { x: 0 } };
      case 'right':
        return { initial: { x: -distance }, animate: { x: 0 } };
    }
  };

  const directionVariants = getDirectionVariants();

  return (
    <motion.div
      initial={{ opacity: 0, ...directionVariants.initial }}
      whileInView={{ opacity: 1, ...directionVariants.animate }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;