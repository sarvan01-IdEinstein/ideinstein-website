'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import MotionWrapper from '@/components/shared/MotionWrapper';
import TeamSection from '@/components/about/TeamSection';
import TimelineSection from '@/components/about/TimelineSection';
import StatsSection from '@/components/about/StatsSection';
import PageHero from '@/components/shared/PageHero';
import { TeamMember, TimelineEvent } from '@/lib/types';

const stats = [
  { label: 'Years Experience', value: '10+' },
  { label: 'Projects Completed', value: '500+' },
  { label: 'Happy Clients', value: '200+' },
  { label: 'Team Members', value: '50+' }
];

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Saravanakumar',
    position: 'Chief Engineer',
    image: '/images/team/saravanakumar.jpg',
    bio: 'Over 15 years of experience in mechanical engineering and 3D printing.',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: '2',
    name: 'Pradeep',
    position: 'Chief Engineer',
    image: '/images/team/pradeep.jpg',
    bio: 'Over 15 years of experience in mechanical engineering and 3D printing.',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },

  // Add more team members as needed
];

const timeline: TimelineEvent[] = [
  {
    year: '2014',
    title: 'Company Founded',
    description: 'Started with a vision to revolutionize engineering solutions.'
  },
  {
    year: '2016',
    title: 'Expansion',
    description: 'Opened our first advanced manufacturing facility.'
  },
  {
    year: '2018',
    title: 'Innovation Award',
    description: 'Recognized for breakthrough 3D printing technologies.'
  },
  {
    year: '2020',
    title: 'Global Reach',
    description: 'Expanded services to international markets.'
  },
  {
    year: '2023',
    title: 'Industry Leader',
    description: 'Became the leading provider of advanced engineering solutions.'
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <PageHero
        title="About IdEinstein"
        subtitle="We combine innovative thinking with cutting-edge technology to deliver exceptional engineering solutions."
        centered={false}
      >
        <Button variant="cta" size="lg">
          Join Our Team
        </Button>
      </PageHero>

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <MotionWrapper direction="left">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/about/mission.jpg"
                  alt="Our Mission"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </MotionWrapper>
            <MotionWrapper direction="right">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-text/80 mb-6">
                  To revolutionize engineering and manufacturing through innovative solutions and cutting-edge technology, making advanced manufacturing accessible to businesses of all sizes.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-1">1</span>
                    <p>Deliver exceptional quality and precision in every project</p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-1">2</span>
                    <p>Drive innovation in manufacturing technologies</p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-1">3</span>
                    <p>Support sustainable and efficient production methods</p>
                  </li>
                </ul>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <TimelineSection events={timeline} />

      {/* Team Section */}
      <TeamSection members={teamMembers} />

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <MotionWrapper>
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          </MotionWrapper>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Pushing the boundaries of what\'s possible in engineering and manufacturing.'
              },
              {
                title: 'Excellence',
                description: 'Delivering the highest quality solutions and exceptional service.'
              },
              {
                title: 'Sustainability',
                description: 'Committed to environmentally responsible manufacturing practices.'
              }
            ].map((value, index) => (
              <MotionWrapper key={value.title} delay={index * 0.1}>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-text/80">{value.description}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <MotionWrapper>
            <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for innovation and engineering excellence.
            </p>
            <Button variant="blue-contrast">
              View Open Positions
            </Button>
          </MotionWrapper>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
