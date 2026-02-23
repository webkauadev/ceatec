import { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '@/assets/logo-ceatec.png';

const navLinks = [
  { label: 'Formação', href: '#formacao' },
  { label: 'Credenciais', href: '#credenciais' },
  { label: 'FAQ', href: '#faq' },
];

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHasScrolled(currentScrollY > 20);

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 5) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY.current - 5) {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Active section detection
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 bg-background transition-shadow duration-300 ${
        hasScrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <a href="#" className="flex items-center" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <motion.img
              src={logoImage}
              alt="CEATEC"
              className="h-14 md:h-16 w-auto"
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-md ${
                    isActive
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Button
              onClick={() => handleNavClick('#formacao')}
              className="btn-primary gap-2 group"
            >
              Garantir minha vaga
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground rounded-md hover:bg-muted transition-colors"
            aria-label="Menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <nav className="flex flex-col py-3">
              {navLinks.map((link, i) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <motion.button
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.href)}
                    className={`px-6 py-3.5 text-left font-semibold transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/5'
                        : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                );
              })}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="px-6 pt-3 pb-1"
              >
                <Button onClick={() => handleNavClick('#formacao')} className="btn-primary gap-2 w-full group">
                  Garantir minha vaga
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
