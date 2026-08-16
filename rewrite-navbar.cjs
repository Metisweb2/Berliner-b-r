const fs = require('fs');

const code = `import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { BearLogo } from './BearLogo';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

const navLinksData = [
  { key: 'start', href: '/' },
  { key: 'classes', href: '/#classes' },
  { key: 'theory', href: '/theorie' },
  { key: 'pricing', href: '/#pricing' },
  { key: 'about', href: '/ueber-uns' },
  { key: 'career', href: '/karriere' },
  { key: 'contact', href: '/kontakt' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={\`fixed top-0 left-0 right-0 z-40 transition-all duration-300 \${
          isScrolled
            ? 'bg-dark-bg/80 backdrop-blur-md border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }\`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between relative">
          
          {/* LEFT: Logo */}
          <Link to="/" className="flex items-center gap-3 group z-10">
            <BearLogo className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110" />
            <span className="text-lg xl:text-xl font-bold tracking-wider uppercase text-white hidden sm:block whitespace-nowrap">
              Fahrschule Bär
            </span>
          </Link>
          
          {/* CENTER: Desktop Nav Links */}
          <div className="hidden xl:flex absolute left-1/2 -translate-x-1/2 z-10">
            <div 
              className="flex items-center bg-white/5 border border-white/10 rounded-full px-1.5 py-1.5 backdrop-blur-md"
              onMouseLeave={() => setHoveredPath(null)}
            >
              {navLinksData.map((link) => (
                <Link
                  key={link.key}
                  to={link.href}
                  onMouseEnter={() => setHoveredPath(link.key)}
                  className={\`relative px-3 xl:px-4 py-1.5 text-[13px] xl:text-sm font-medium whitespace-nowrap transition-colors z-10 \${hoveredPath === link.key ? 'text-white' : 'text-neutral-400'}\`}
                >
                  {hoveredPath === link.key && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {t(\`nav.\${link.key}\`)}
                </Link>
              ))}
            </div>
          </div>
          
          {/* RIGHT: Buttons */}
          <div className="hidden xl:flex items-center gap-4 z-10">
            <LanguageSwitcher />
            
            <Link
              to="/#register"
              className="px-5 xl:px-6 py-2 rounded-full bg-gradient-to-r from-primary to-red-500 text-white font-medium text-[13px] xl:text-sm whitespace-nowrap transition-all hover:shadow-[0_0_20px_rgba(217,4,41,0.4)] hover:scale-105 border border-red-400/20 relative overflow-hidden group"
            >
              <span className="relative z-10">{t('nav.register')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            </Link>
          </div>
          
          {/* Mobile Toggle & Language */}
          <div className="xl:hidden flex items-center gap-4 z-10">
            <LanguageSwitcher />
            <button
              className="text-white p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-dark-bg/95 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-6 right-6 text-white p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col items-center gap-8">
              {navLinksData.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-bold text-white hover:text-primary transition-colors"
                  >
                    {t(\`nav.\${link.key}\`)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Link
                  to="/#register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 inline-block px-8 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-[0_0_30px_rgba(217,4,41,0.3)]"
                >
                  {t('nav.register')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
`;

fs.writeFileSync('src/components/Navbar.tsx', code);
