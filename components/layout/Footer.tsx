'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaXing, FaWhatsapp } from 'react-icons/fa'
import { ArrowRight, Mail, Phone, MapPin, Send, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CONTACT_INFO, SOCIAL_LINKS, NAV_LINKS } from '@/lib/constants'

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('loading');
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to subscribe');
      
      setSubscribeStatus('success');
      setEmail('');
    } catch (error) {
      setSubscribeStatus('error');
    }
  };

  return (
    <footer className="bg-gradient-to-b from-white to-primary/5 backdrop-blur-sm" role="contentinfo">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 lg:col-span-3"
          >
            <Link 
              href="/" 
              className="flex items-center space-x-2.5 group"
              aria-label="IdEinstein Home"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Image src="/logo.png" alt="" width={36} height={36} className="rounded-lg" />
              </motion.div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                IdEinstein
              </span>
            </Link>
            <p className="text-text/80 leading-relaxed">
              Where Ideas Take Shape - Your partner in innovative engineering solutions.
            </p>
            <div className="space-y-4">
              {[
                { icon: Mail, text: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}`, label: 'Email us' },
                { icon: Phone, text: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}`, label: 'Call us' },
                { icon: FaWhatsapp, text: 'WhatsApp', href: `https://wa.me/${CONTACT_INFO.whatsapp?.replace(/\s/g, '')}`, label: 'WhatsApp us' },
                { icon: MapPin, text: CONTACT_INFO.address },
                { icon: MapPin, text: CONTACT_INFO.businessHours }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-text/80 group"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-primary transition-colors duration-300"
                      aria-label={item.label}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="text-lg font-semibold mb-6 text-primary">Quick Links</h3>
            <ul className="space-y-3" role="list">
              {NAV_LINKS.filter(link => link.title !== 'Services').map((link) => (
                <motion.li
                  key={link.href}
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Link 
                    href={link.href}
                    className="text-text/80 hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span>{link.title}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <h3 className="text-lg font-semibold mb-6 text-primary">Our Services</h3>
            <div className="space-y-4">
              {NAV_LINKS[0].submenu?.map((category) => (
                <div key={category.category}>
                  <button
                    onClick={() => toggleCategory(category.category)}
                    className="flex items-center justify-between w-full text-left group mb-2"
                    aria-expanded={expandedCategories.includes(category.category)}
                  >
                    <h4 className="text-sm font-medium text-text/80 uppercase tracking-wider group-hover:text-primary">
                      {category.category}
                    </h4>
                    <motion.div
                      animate={{ rotate: expandedCategories.includes(category.category) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-text/80 group-hover:text-primary"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {expandedCategories.includes(category.category) && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden space-y-2"
                        role="list"
                      >
                        {category.items.map((service) => (
                          <motion.li
                            key={service.href}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -10, opacity: 0 }}
                            whileHover={{ x: 10 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                          >
                            <Link
                              href={service.href}
                              className="text-text/80 hover:text-primary transition-colors duration-300 flex items-center group"
                            >
                              <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                              <span>{service.title}</span>
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-4"
          >
            <h3 className="text-lg font-semibold mb-6 text-primary">Newsletter</h3>
            <p className="text-text/80 mb-6 leading-relaxed">
              Subscribe to our newsletter for the latest updates and innovations.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-6">
              <div className="flex shadow-sm rounded-lg overflow-hidden w-full bg-white/50">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                  aria-label="Email address for newsletter"
                />
                <Button 
                  type="submit"
                  disabled={subscribeStatus === 'loading'}
                  variant="default"
                  className="rounded-l-none bg-primary hover:bg-primary/90"
                  aria-label="Subscribe to newsletter"
                >
                  <AnimatePresence mode="wait">
                    {subscribeStatus === 'loading' ? (
                      <motion.div
                        key="loading"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Send className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="send"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Send className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
              <AnimatePresence mode="wait">
                {subscribeStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-green-600 text-sm"
                  >
                    Thank you for subscribing!
                  </motion.p>
                )}
                {subscribeStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-600 text-sm"
                  >
                    Failed to subscribe. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-primary/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-text/70">
              © {new Date().getFullYear()} IdEinstein. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {Object.entries(SOCIAL_LINKS).map(([key, url]) => {
                const Icon = key === 'twitter' ? FaTwitter :
                           key === 'linkedin' ? FaLinkedin :
                           key === 'facebook' ? FaFacebook :
                           key === 'instagram' ? FaInstagram :
                           key === 'youtube' ? FaYoutube :
                           key === 'xing' ? FaXing :
                           FaInstagram;

                return (
                  <motion.a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text/60 hover:text-primary transition-colors duration-300"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Follow us on ${key}`}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
