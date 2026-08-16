import { motion } from 'motion/react';
import { Section } from './ui/Section';
import { useTranslation } from 'react-i18next';

const schedule = [
  { day: 'Montag', ru: null, de: '18:00 – 19:30 Uhr' },
  { day: 'Dienstag', ru: '18:00 – 19:30 Uhr', de: null },
  { day: 'Mittwoch', ru: null, de: null },
  { day: 'Donnerstag', ru: null, de: '18:00 – 19:30 Uhr' },
  { day: 'Freitag', ru: '18:00 – 19:30 Uhr', de: null },
  { day: 'Samstag', ru: null, de: null },
  { day: 'Sonntag', ru: null, de: null },
];

export function TheorySchedule() {
  const { t } = useTranslation();
  return (
    <Section id="theorie" className="bg-transparent relative overflow-hidden pb-32">
      {/* Animated Background Accents */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gold/10 blur-[100px] rounded-full pointer-events-none" 
      />

      <div className="max-w-5xl mx-auto relative z-10 px-4">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center mb-10"
          >
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-primary to-transparent mb-6 opacity-60" />
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs md:text-sm">Fahrplan</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tight"
          >
            {t('theory.subtitle')}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-neutral-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed"
          >
            {t('theory.desc')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {schedule.map((row, i) => {
            const hasClass = row.ru || row.de;
            
            return (
              <motion.div 
                key={t(`theory.days.${row.day.toLowerCase().substring(0,3)}`, { defaultValue: row.day })}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
                whileHover={{ y: -5 }}
                className={`relative group bg-[#0A0A0A]/60 backdrop-blur-xl border ${hasClass ? 'border-white/10 hover:border-white/20' : 'border-white/5'} rounded-3xl p-8 transition-all duration-500 overflow-hidden`}
              >
                {/* Subtle Inner Glow for active days */}
                {hasClass && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:from-primary/20 transition-colors duration-700" />
                )}
                
                <h3 className={`text-2xl font-bold mb-8 transition-colors duration-500 ${hasClass ? 'text-white' : 'text-neutral-600'}`}>
                  {t(`theory.days.${row.day.toLowerCase().substring(0,3)}`, { defaultValue: row.day })}
                </h3>
                
                <div className="flex flex-col gap-6">
                  {row.de && (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs uppercase tracking-widest text-primary font-bold">
                          {t('theory.lang_de', 'Deutsch')}
                        </span>
                      </div>
                      <span className="text-white font-light text-xl tracking-wide">{row.de}</span>
                    </div>
                  )}
                  
                  {row.ru && (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                        <span className="text-xs uppercase tracking-widest text-gold font-bold">
                          {t('theory.lang_ru', 'Russisch')}
                        </span>
                      </div>
                      <span className="text-white font-light text-xl tracking-wide">{row.ru}</span>
                    </div>
                  )}

                  {!hasClass && (
                    <div className="flex flex-col gap-2 opacity-40">
                      <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold">
                        Ruhetag
                      </span>
                      <span className="text-neutral-500 font-light text-xl tracking-wide">—</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
