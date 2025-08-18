'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Service } from '@/lib/types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const IconComponent = typeof service.icon === 'string' 
    ? require('lucide-react')[service.icon]
    : service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/services/${service.slug}`}>
        <Card className="h-full hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-primary mb-4"
            >
              <IconComponent className="w-10 h-10" />
            </motion.div>

            <h3 className="text-xl font-bold mb-4">{service.title}</h3>
            <p className="text-text/80 mb-6">{service.description}</p>

            <div className="space-y-3 mb-6">
              {service.features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center text-sm text-text/80"
                >
                  <ArrowRight className="w-4 h-4 text-primary mr-2" />
                  {feature}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {service.category.map((cat) => (
                <span
                  key={cat}
                  className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>

            <Button 
              variant="outline" 
              className="w-full"
            >
              Learn More
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;