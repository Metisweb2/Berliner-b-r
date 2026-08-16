import { BearLogo } from './BearLogo';
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
    fill="currentColor" 
    className={className}
  >
    <g transform="translate(3, 2) scale(0.8)">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.25-.8 4.54-2.19 6.28-1.57 1.95-3.8 3.19-6.22 3.53-2.67.37-5.46-.22-7.58-1.93-1.92-1.55-3.14-3.86-3.41-6.3-.32-2.88.58-5.86 2.39-8.06 1.83-2.22 4.67-3.41 7.55-3.32v4.02c-1.85-.05-3.77.49-5.11 1.73-1.37 1.28-2.12 3.17-2.07 5.09.05 1.98.92 3.9 2.45 5.06 1.57 1.18 3.73 1.52 5.64.91 1.83-.58 3.26-1.99 3.86-3.81.33-1.01.46-2.1.41-3.16-.07-5.84-.04-11.68-.04-17.52H12.525z" />
    </g>
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
      transition: { duration: 0.8, ease: "easeOut" as any }
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
              <h4 className="text-white font-bold mb-4 text-lg">{t('footer.social')}</h4>
              <div className="flex gap-4">
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300" aria-label="Instagram">
                  <Instagram className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300" aria-label="Facebook">
                  <Facebook className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300" aria-label="TikTok">
                  <TikTokIcon className="w-5 h-5" />
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
