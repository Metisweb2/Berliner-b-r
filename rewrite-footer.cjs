const fs = require('fs');

const code = `import { BearLogo } from './BearLogo';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F58529" />
        <stop offset="25%" stopColor="#FEDA77" />
        <stop offset="50%" stopColor="#DD2A7B" />
        <stop offset="75%" stopColor="#8134AF" />
        <stop offset="100%" stopColor="#515BD4" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig)"/>
    <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="12" fill="#1877F2"/>
    <path d="M15.365 8.183L14.77 12H12.35v12h-4.22V12H6.28V8.183h1.85V5.556c0-1.83 1.118-2.83 2.753-2.83 1.05 0 2.13.187 2.13.187v2.342h-1.202c-1.18 0-1.547.733-1.547 1.482v1.446h3.102z" fill="#fff"/>
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="24" height="24" rx="12" fill="#000000"/>
    <path fill="#25F4EE" d="M13.2 4.44V14.1c0 1.34-1.09 2.43-2.43 2.43a2.43 2.43 0 01-2.43-2.43c0-1.34 1.09-2.43 2.43-2.43.3 0 .58.05.84.14v-2.85a5.27 5.27 0 00-.84-.07c-2.91 0-5.27 2.36-5.27 5.27s2.36 5.27 5.27 5.27 5.27-2.36 5.27-5.27V9.01a7.86 7.86 0 004.09 1.15V7.32a5.05 5.05 0 01-3.26-1.12 5.04 5.04 0 01-1.64-3.72h-2.03z"/>
    <path fill="#FE2C55" d="M13.4 4.64V14.3c0 1.34-1.09 2.43-2.43 2.43a2.43 2.43 0 01-2.43-2.43c0-1.34 1.09-2.43 2.43-2.43.3 0 .58.05.84.14v-2.85a5.27 5.27 0 00-.84-.07c-2.91 0-5.27 2.36-5.27 5.27s2.36 5.27 5.27 5.27 5.27-2.36 5.27-5.27V9.21a7.86 7.86 0 004.09 1.15V7.52a5.05 5.05 0 01-3.26-1.12 5.04 5.04 0 01-1.64-3.72h-2.03z"/>
    <path fill="#FFFFFF" d="M13.3 4.54V14.2c0 1.34-1.09 2.43-2.43 2.43a2.43 2.43 0 01-2.43-2.43c0-1.34 1.09-2.43 2.43-2.43.3 0 .58.05.84.14v-2.85a5.27 5.27 0 00-.84-.07c-2.91 0-5.27 2.36-5.27 5.27s2.36 5.27 5.27 5.27 5.27-2.36 5.27-5.27V9.11a7.86 7.86 0 004.09 1.15V7.42a5.05 5.05 0 01-3.26-1.12 5.04 5.04 0 01-1.64-3.72h-2.03z"/>
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
              <h4 className="text-white/40 font-semibold mb-4 tracking-widest uppercase text-[10px]">{t('footer.social')}</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:scale-105 transition-transform duration-300 rounded-lg" aria-label="Instagram">
                  <InstagramIcon className="w-8 h-8" />
                </a>
                <a href="#" className="hover:scale-105 transition-transform duration-300 rounded-full" aria-label="TikTok">
                  <TikTokIcon className="w-8 h-8" />
                </a>
                <a href="#" className="hover:scale-105 transition-transform duration-300 rounded-full" aria-label="Facebook">
                  <FacebookIcon className="w-8 h-8" />
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

fs.writeFileSync('src/components/Footer.tsx', code);
