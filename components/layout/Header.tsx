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

  const [showQuotation, setShowQuotation] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 20);
    }, 200);

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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`
        fixed top-0 w-full z-50
        backdrop-blur-lg
        transition-all duration-500 ease-in-out
        ${isScrolled
          ? 'bg-primary/95 shadow-lg py-1.5'
          : 'bg-primary/80 py-2.5'}
      `}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="flex items-center space-x-3 group"
            aria-label="IdEinstein Home"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Image 
                src="/logo.png" 
                alt="IdEinstein Logo" 
                width={48} 
                height={48} 
                priority 
                className="h-12 w-12 object-contain rounded-lg"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="text-2xl font-bold"
            >
              <span className="text-yellow-400">Id</span>
              <span className="text-white">Einstein</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" role="navigation">
            {menuItems.map((item) => (
              <div key={item.title} className="relative group">
                <Link
                  href={item.href}
                  className={`
                    relative py-2 text-white/90 hover:text-white
                    transition-colors duration-300 ease-in-out
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-md
                    ${isActive(item.href) ? 'text-white' : ''}
                  `}
                  aria-expanded={item.submenu ? "true" : undefined}
                  role={item.submenu ? "button" : undefined}
                  onClick={item.submenu ? (e) => e.preventDefault() : undefined}
                >
                  <span className="flex items-center">
                    {item.title}
                    {item.submenu && (
                      <motion.span
                        animate={item.submenu ? { rotate: 180 } : { rotate: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="ml-1 w-4 h-4" />
                      </motion.span>
                    )}
                  </span>
                  {!item.submenu && isActive(item.href) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>

                {item.submenu && (
                  <div
                    className="absolute top-full left-0 mt-2 w-96 opacity-0 invisible
                      group-hover:opacity-100 group-hover:visible
                      transition-all duration-300 ease-in-out transform
                      group-hover:translate-y-0 translate-y-2"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="bg-white rounded-xl shadow-xl overflow-hidden border border-primary/10"
                    >
                      {item.submenu.map((category) => (
                        <div key={category.category} className="py-2">
                          <div className="px-6 py-3 text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-primary/10 to-transparent">
                            {category.category}
                          </div>
                          <div className="space-y-1">
                            {category.items.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className={`
                                  block px-6 py-2.5 text-text hover:bg-primary/5
                                  transition-colors duration-200 ease-in-out
                                  ${isActive(subItem.href) ? 'bg-primary/5 text-primary' : ''}
                                `}
                              >
                                <motion.div
                                  whileHover={{ x: 5 }}
                                  className="flex items-center"
                                >
                                  <span className="text-primary mr-2">•</span>
                                  {subItem.title}
                                </motion.div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">

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
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/auth/signin">
                  <Button variant="header-cta">
                    Customer Area
                  </Button>
                </Link>
              </motion.div>
            )}
            
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="header-cta"
                onClick={() => setShowQuotation(true)}
              >
                Get Quote
              </Button>
            </motion.div>
          </div>

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
