'use client'

import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";

interface Stat {
  label: string;
  value: string;
  description?: string;
  prefix?: string;
  suffix?: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-duration-300">
                <CardContent className="p-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: index * 0.1 }}
                    className="text-4xl font-bold text-primary mb-2"
                  >
                    {stat.prefix}{stat.value}{stat.suffix}
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
                  {stat.description && (
                    <p className="text-text/80 text-sm">{stat.description}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;