const fs = require('fs');

// 1. Update de.json
let deJson = fs.readFileSync('src/locales/de.json', 'utf8');
deJson = deJson.replace('"social": "Social Media"', '"social": "Folge uns"');
fs.writeFileSync('src/locales/de.json', deJson);

// 2. Rewrite Footer.tsx
const footerCode = `import { BearLogo } from './BearLogo';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Instagram, Facebook } from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export function Footer() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <footer className="bg-dark-bg border-t border-white/5 pt-16 pb-6 relative overflow-hidden">
      {/* Dezenter Hintergrund-Effekt */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 mb-12"
        >
          {/* Column 1: Logo, Slogan & Social Media */}
          <motion.div variants={itemVariants} className="md:col-span-5 flex flex-col">
            <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
              <BearLogo className="w-9 h-9 object-contain" />
              <span className="text-xl font-bold tracking-widest uppercase text-white">
                Fahrschule<span className="text-primary ml-1">Bär</span>
              </span>
            </Link>
            <p className="text-neutral-400 max-w-sm text-sm font-light tracking-wide leading-relaxed mb-10">
              {t('footer.slogan')}
            </p>

            <div>
              <h4 className="text-white font-bold mb-5 text-xl">{t('footer.social')}</h4>
              <div className="flex gap-5">
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300" aria-label="Instagram">
                  <Instagram className="w-7 h-7" strokeWidth={1.5} />
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300" aria-label="Facebook">
                  <Facebook className="w-7 h-7" strokeWidth={1.5} />
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300" aria-label="TikTok">
                  <TikTokIcon className="w-7 h-7" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Navigation (Start, Über uns, Kontakt, FAQ, Karriere) */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 tracking-widest uppercase text-xs">{t('footer.navigation')}</h4>
            <ul className="space-y-3">
              {['start', 'about', 'career', 'contact', 'faq'].map((item) => {
                const href = item === 'start' ? '/' : '/' + (item === 'about' ? 'ueber-uns' : item === 'career' ? 'karriere' : item === 'contact' ? 'kontakt' : item);
                return (
                  <li key={item}>
                    <Link 
                      to={href} 
                      className="text-neutral-400 hover:text-white transition-colors text-sm font-light"
                    >
                      {t('nav.' + item)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Column 3: Ausbildung/Angebot (Klassen, Theorie, Preise) */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 tracking-widest uppercase text-xs">{t('footer.offer')}</h4>
            <ul className="space-y-3">
              {['classes', 'theory', 'pricing'].map((item) => {
                const href = item === 'theory' ? '/theorie' : '/#' + item;
                return (
                  <li key={item}>
                    <Link 
                      to={href}
                      className="text-neutral-400 hover:text-white transition-colors text-sm font-light"
                    >
                      {t('nav.' + item)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Column 4: Legal (Impressum, Datenschutz, AGB) */}
          <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-3">
            <h4 className="text-white font-semibold mb-6 tracking-widest uppercase text-xs">{t('footer.legal')}</h4>
            <ul className="space-y-3">
              {['imp', 'ds', 'agb'].map((item) => {
                const href = '/' + (item === 'imp' ? 'impressum' : item === 'ds' ? 'datenschutz' : 'agb');
                return (
                  <li key={item}>
                    <Link 
                      to={href} 
                      className="text-neutral-400 hover:text-white transition-colors text-sm font-light"
                    >
                      {t('footer.legal_links.' + item)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-light"
        >
          <p>{t('footer.copyright')}</p>
          <div className="flex items-center gap-2">
            <BearLogo className="w-3 h-3 object-contain grayscale opacity-50" />
            <span className="tracking-widest uppercase font-medium text-[10px] text-neutral-600">{t('footer.premium')}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
`;

fs.writeFileSync('src/components/Footer.tsx', footerCode);
