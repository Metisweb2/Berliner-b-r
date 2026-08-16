import { Section } from './ui/Section';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

const usps = [
  {
    title: 'Geduldige Fahrlehrer',
    description: 'Stressfrei zum Führerschein. Unsere erfahrenen Fahrlehrer erklären alles in Ruhe und passen sich deinem individuellen Lerntempo an.',
  },
  {
    title: 'Moderne Fahrzeuge',
    description: 'Ausbildung auf dem neuesten Stand. Lerne mit modernsten Assistenzsystemen in unseren hochwertigen und sicheren Fahrzeugen.',
  },
  {
    title: 'Flexible Fahrzeiten',
    description: 'Dein Führerschein, dein Zeitplan. Wir richten uns nach deinem Alltag – egal ob vor der Arbeit, nach der Schule oder am Wochenende.',
  },
  {
    title: 'Persönliche Betreuung',
    description: 'Du bist keine Nummer. Von der ersten Theoriestunde bis zur praktischen Prüfung stehen wir dir bei allen Fragen persönlich zur Seite.',
  },
  {
    title: 'Transparente Preise',
    description: 'Volle Kostenkontrolle von Anfang an. Keine versteckten Gebühren oder bösen Überraschungen – faire Preise sind für uns selbstverständlich.',
  },
  {
    title: 'Hohe Erfolgsquote',
    description: 'Unser gemeinsames Ziel ist dein Erfolg beim ersten Versuch. Wir bereiten dich so vor, dass du dich im Straßenverkehr 100 % sicher fühlst.',
  },
];

export function USPs() {
  const { t } = useTranslation();
  return (
    <Section id="usps" className="bg-dark-bg py-32 relative overflow-hidden">
      {/* Subtle Background Accents */}
      <div className="absolute top-0 right-0 w-full max-w-4xl h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wide"
          >
            {t('usps.title_start')}<span className="font-bold">{t('usps.title_highlight')}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-neutral-400 max-w-2xl mx-auto text-lg font-light leading-relaxed"
          >
            {t('usps.desc')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" style={{ perspective: "1000px" }}>
          {usps.map((usp, index) => {
            const displayIndex = (index + 1).toString().padStart(2, '0');
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15, 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 20,
                  mass: 1
                }}
                className="group relative p-8 md:p-10 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden"
              >
                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="mb-10 relative inline-block">
                    <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent group-hover:from-primary/40 group-hover:to-transparent transition-colors duration-500">
                      {displayIndex}
                    </span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-white tracking-wide group-hover:text-primary transition-colors duration-500">
                    {t(`usps.items.${index + 1}.title`)}
                  </h3>
                  
                  <p className="text-neutral-400 leading-relaxed text-sm md:text-base font-light group-hover:text-neutral-300 transition-colors duration-500">
                    {t(`usps.items.${index + 1}.desc`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
