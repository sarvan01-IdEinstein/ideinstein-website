'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { UnifiedConsultationCard } from '@/components/shared/UnifiedConsultationCard';
import { throttle } from 'lodash';

const menuItems = [
  {
    title: 'Services',
    href: '#',
    submenu: [
      {
        category: 'Engineering & Design',
        items: [
          { title: 'Research & Development', href: '/services/research-development' },
          { title: 'CAD Modeling', href: '/services/cad-modeling' },
          { title: 'Machine Design', href: '/services/machine-design' },
          { title: 'BIW Design', href: '/services/biw-design' }
        ]
      },
      {
        category: 'Analysis & Simulation',
        items: [
          { title: 'FEA & CFD Analysis', href: '/services/finite-element-cfd' },
          { title: 'GD&T and Tolerance Analysis', href: '/services/gdt-tolerance' }
        ]
      },
      {
        category: 'Manufacturing Solutions',
        items: [
          { title: '3D Printing Services', href: '/services/3d-printing' },
          { title: 'Supplier Sourcing', href: '/services/supplier-sourcing' }
        ]
      },
      {
        category: 'Documentation & Visualization',
        items: [
          { title: 'Technical Documentation', href: '/services/technical-documentation' }
        ]
      }
    ],
  },
  { title: 'Blog', href: '/blog' },
  { title: 'Store', href: '/store' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
  { title: 'FAQ', href: '/faq' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showQuotation, setShowQuotation] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Set loaded state after component mounts
    setIsLoaded(true);
    
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 20);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu && !(event.target as Element).closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(10px) saturate(120%)'
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 100, 
        damping: 20,
        opacity: { duration: 0.3 }
      }}
      className={`
        fixed top-0 w-full z-50
        backdrop-blur-xl
        transition-all duration-700 ease-out
        border-b border-white/10
        ${isScrolled
          ? 'bg-primary/95 shadow-2xl shadow-primary/20 py-1.5' 
          : 'bg-primary/85 py-2.5'}
      `}
      style={{
        background: isScrolled 
          ? 'linear-gradient(135deg, rgba(30, 64, 175, 0.95) 0%, rgba(59, 130, 246, 0.9) 100%)'
          : 'linear-gradient(135deg, rgba(30, 64, 175, 0.85) 0%, rgba(59, 130, 246, 0.8) 100%)'
      }}
      role="banner"
    >
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16 relative">
          <Link 
            href="/" 
            className="flex items-center space-x-3 group"
            aria-label="IdEinstein Home"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200, 
                damping: 15,
                delay: 0.2 
              }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Image 
                src="/logo.png" 
                alt="IdEinstein Logo" 
                width={48} 
                height={48} 
                priority 
                className="h-12 w-12 object-contain rounded-lg"
              />
              {/* Pulse ring animation */}
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-yellow-400/50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ 
                scale: 1.02,
                textShadow: '0 0 8px rgba(251, 191, 36, 0.8)'
              }}
              className="text-2xl font-bold"
            >
              <motion.span 
                className="text-yellow-400"
                whileHover={{ 
                  scale: 1.1,
                  filter: 'brightness(1.2)'
                }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Id
              </motion.span>
              <motion.span 
                className="text-white"
                whileHover={{ 
                  scale: 1.05,
                  color: '#f8fafc'
                }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Einstein
              </motion.span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden lg:flex items-center space-x-8 relative" 
            role="navigation"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.4
                }
              }
            }}
          >
            {menuItems.map((item, index) => (
              <motion.div 
                key={item.title} 
                className="relative group"
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                  }
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Link
                    href={item.href}
                    className={`
                      relative py-2 px-3 text-white/90 hover:text-yellow-400
                      transition-all duration-300 ease-in-out
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50
                      ${isActive(item.href) ? 'text-yellow-400' : ''}
                    `}
                    aria-expanded={item.submenu ? "true" : undefined}
                    role={item.submenu ? "button" : undefined}
                    onClick={item.submenu ? (e) => e.preventDefault() : undefined}
                  >
                    <span className="flex items-center relative">
                      <motion.span
                        whileHover={{ x: 2 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                        className="relative"
                      >
                        {item.title}
                        {!item.submenu && isActive(item.href) && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute left-0 right-0 top-full mt-1 h-0.5 bg-gradient-to-r from-yellow-400/90 via-yellow-300 to-yellow-400/90 rounded-full"
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            transition={{ 
                              type: 'spring', 
                              stiffness: 400, 
                              damping: 30,
                              opacity: { duration: 0.2 }
                            }}
                            style={{
                              transformOrigin: 'center',
                              boxShadow: '0 0 8px rgba(251, 191, 36, 0.4)'
                            }}
                          />
                        )}
                      </motion.span>
                      {item.submenu && (
                        <motion.span
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3, type: 'spring' }}
                          className="ml-1"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.span>
                      )}
                    </span>
                  </Link>
                </motion.div>

                {item.submenu && (
                  <div
                    className="absolute top-full left-0 mt-2 w-80 opacity-0 invisible
                      group-hover:opacity-100 group-hover:visible
                      transition-all duration-300 ease-in-out transform
                      group-hover:translate-y-0 translate-y-2 z-50"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="bg-white backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-primary/10"
                    >
                      {item.submenu.map((category) => (
                        <div key={category.category} className="py-2">
                          <div className="px-6 py-3 text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-primary/10 to-transparent">
                            {category.category}
                          </div>
                          <div className="space-y-1">
                            {category.items.map((subItem) => (
                              <motion.div
                                whileHover={{ scale: 1.02, x: 5 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                              >
                                <Link
                                  key={subItem.title}
                                  href={subItem.href}
                                  className={`
                                    group block px-6 py-4 text-gray-700 hover:text-primary 
                                    transition-all duration-300 ease-out relative
                                    ${isActive(subItem.href) ? 'text-primary font-semibold bg-primary/5' : 'hover:translate-x-1'}
                                  `}
                                >
                                  <span className="text-base font-medium">
                                    {subItem.title}
                                  </span>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.nav>

          {/* Desktop Actions */}
          <motion.div 
            className="hidden lg:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >

            {status === 'authenticated' ? (
              <div className="relative user-menu-container">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    variant="header-cta"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">{session.user?.name || 'User'}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </motion.div>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                    >
                      <Link
                        href="/portal"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setShowUserMenu(false);
                          signOut({ callbackUrl: '/' });
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Link href="/auth/signin">
                  <Button 
                    variant="header-cta"
                    className="relative overflow-hidden group"
                  >
                    <motion.span
                      className="relative z-10"
                      whileHover={{ x: 2 }}
                    >
                      Customer Area
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                </Link>
              </motion.div>
            )}
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Button
                variant="header-cta"
                onClick={() => setShowQuotation(true)}
                className="relative overflow-hidden group"
              >
                <motion.span
                  className="relative z-10"
                  whileHover={{ x: 2 }}
                >
                  Get Quote
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg
              transition-colors duration-200"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-primary/98 backdrop-blur-lg z-50 lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4">
                <Link href="/" className="flex items-center space-x-2">
                  <Image 
                    src="/logo.png" 
                    alt="IdEinstein Logo" 
                    width={40} 
                    height={40} 
                    priority 
                    className="h-10 w-10 object-contain rounded-lg"
                  />
                  <div className="text-xl font-bold">
                    <span className="text-yellow-400">Id</span>
                    <span className="text-white">Einstein</span>
                  </div>
                </Link>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white hover:bg-white/10 rounded-lg
                    transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <motion.nav
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
                className="flex-1 overflow-y-auto px-4 py-6"
              >
                {menuItems.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 }
                    }}
                    className="py-2"
                  >
                    <Link
                      href={item.href}
                      className={`
                        block text-lg font-semibold text-white hover:text-yellow-400 py-3 px-4 rounded-lg hover:bg-white/10
                        transition-all duration-200
                        ${isActive(item.href) ? 'text-yellow-400 bg-white/10' : ''}
                      `}
                      onClick={() => !item.submenu && setIsOpen(false)}
                    >
                      {item.title}
                      {item.submenu && (
                        <ChevronDown className="inline-block ml-2 w-4 h-4" />
                      )}
                    </Link>
                    {item.submenu && (
                      <div className="mt-3 ml-2 space-y-3">
                        {item.submenu.map((category) => (
                          <div key={category.category} className="space-y-2">
                            <div className="text-sm font-bold text-yellow-400 uppercase tracking-wider px-3 py-2">
                              {category.category}
                            </div>
                            <div className="space-y-1">
                              {category.items.map((subItem) => (
                                <Link
                                  key={subItem.title}
                                  href={subItem.href}
                                  className={`
                                    block py-3 px-4 text-sm font-medium text-white/90 hover:text-yellow-400 hover:bg-white/10 rounded-lg
                                    transition-all duration-200
                                    ${isActive(subItem.href) ? 'text-yellow-400 bg-white/10' : ''}
                                  `}
                                  onClick={() => setIsOpen(false)}
                                >
                                  <span className="text-yellow-400 mr-3 text-lg">•</span>
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.nav>

              <div className="p-4 border-t border-white/20 space-y-3">
                {status === 'authenticated' ? (
                  <>
                    <Link href="/portal">
                      <Button
                        variant="header-cta"
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full text-white border-white hover:bg-white hover:text-primary"
                      onClick={() => {
                        setIsOpen(false);
                        signOut({ callbackUrl: '/' });
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/auth/signin">
                    <Button
                      variant="header-cta"
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      Customer Area
                    </Button>
                  </Link>
                )}
                <Button
                  variant="header-cta"
                  className="w-full"
                  onClick={() => {
                    setIsOpen(false);
                    setShowQuotation(true);
                  }}
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quotation Dialog */}
      <Dialog open={showQuotation} onOpenChange={setShowQuotation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Request a Quotation</DialogTitle>
          <UnifiedConsultationCard
            type="quotation"
            onSubmit={async (data) => {
              try {
                console.log('📝 Submitting quote request from header:', data);
                
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
    </motion.header>
  );
};

export default Header;
