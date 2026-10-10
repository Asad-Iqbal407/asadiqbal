'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const sectionItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Journey', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const current = sectionItems
        .map((item) => item.href.substring(1))
        .find((id) => {
          const element = document.getElementById(id);
          if (!element) return false;
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        });
      if (current) setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSection = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      event.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', href);
    }
    setIsOpen(false);
  };

  const linkClass = (active: boolean) =>
    `relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
      active ? 'text-white' : 'text-foreground/70 hover:text-purple-500'
    }`;

  return (
    <motion.nav
      aria-label="Main"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#home"
            onClick={(event) => goToSection(event, '#home')}
            className="text-2xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Asad Iqbal
            </span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden items-center space-x-1 md:flex">
            {sectionItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(event) => goToSection(event, item.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={linkClass(isActive)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {item.name}
                </a>
              );
            })}
            <Link href="/case-studies" className={linkClass(false)}>
              Case studies
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="glass rounded-xl p-2 text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-4 right-4 top-full mt-2 md:hidden"
          >
            <div className="glass space-y-1 rounded-2xl border border-white/20 p-4 shadow-2xl">
              {sectionItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(event) => goToSection(event, item.href)}
                    className={`block rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                        : 'text-foreground/80 hover:bg-foreground/5'
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
              <Link
                href="/case-studies"
                className="block rounded-xl px-4 py-3 text-base font-semibold text-foreground/80 hover:bg-foreground/5"
              >
                Case studies
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
