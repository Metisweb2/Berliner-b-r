import { motion } from 'motion/react';
import { Section } from './ui/Section';
import { ArrowRight, CarFront, ShieldCheck, Gauge, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const classes = [
  {
    id: 'B',
    title: 'Klasse B',
    desc: 'Der klassische PKW-Führerschein auf einem Fahrzeug mit manuellem Schaltgetriebe.',
    icon: CarFront,
    color: 'from-blue-500/20 to-blue-500/0',
    borderHover: 'hover:border-blue-500/50',
    textHover: 'group-hover:text-blue-400'
  },
  {
    id: 'B78',
    title: 'Klasse B78',
    desc: 'Entspannt lernen und fahren: Reine Automatik-Ausbildung ohne lästiges Schalten.',
    icon: Gauge,
    color: 'from-purple-500/20 to-purple-500/0',
    borderHover: 'hover:border-purple-500/50',
    textHover: 'group-hover:text-purple-400'
  },
  {
    id: 'B197',
    title: 'Klasse B197',
    desc: 'Das Beste aus beiden Welten: Automatik-Prüfung, aber danach auch Schalter fahren dürfen!',
    icon: Sparkles,
    color: 'from-primary/20 to-primary/0',
    borderHover: 'hover:border-primary/50',
    textHover: 'group-hover:text-primary'
  },
  {
    id: 'BE',
    title: 'Klasse BE',
    desc: 'Für große Vorhaben: PKW mit schwerem Anhänger (Wohnwagen, Pferdeanhänger).',
    icon: TrendingUp,
    color: 'from-gold/20 to-gold/0',
    borderHover: 'hover:border-gold/50',
    textHover: 'group-hover:text-gold'
  },
  {
    id: 'B96',
    title: 'Klasse B96',
    desc: 'Das Tages-Upgrade: Anhänger-Erweiterung bis 4.250 kg. Komplett ohne Prüfung!',
    icon: ShieldCheck,
    color: 'from-emerald-500/20 to-emerald-500/0',
    borderHover: 'hover:border-emerald-500/50',
    textHover: 'group-hover:text-emerald-400'
  },
];

import { useTranslation } from 'react-i18next';

export function Classes() {
  const { t } = useTranslation();
  return (
    <Section id="classes" className="relative bg-dark-bg overflow-hidden">
      {/* Dynamic Backgrounds */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6 relative z-10">
        <div className="max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
          >
            {t('classes.title1')} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">{t('classes.title2')}</span>
          </motion.h2>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden md:block w-32 h-1 bg-gradient-to-r from-transparent via-primary to-gold rounded-full" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {classes.map((cls, idx) => {
          const Icon = cls.icon;
          return (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, type: "spring", stiffness: 100 }}
              className={`group relative p-8 rounded-[2rem] bg-[#111111]/80 backdrop-blur-xl border border-white/10 ${cls.borderHover} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full overflow-hidden`}
            >
              {/* Animated Glow overlay */}
              <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${cls.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
              
              <div className="relative z-10 flex-grow">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-2xl font-black text-white ${cls.textHover} transition-colors duration-500 shadow-inner group-hover:scale-110`}>
                    {cls.id}
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors duration-500`}>
                    <Icon className={`w-5 h-5 text-neutral-500 ${cls.textHover} transition-colors duration-500`} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">{t(`classes.items.${cls.id}.title`, { defaultValue: cls.title })}</h3>
                <p className="text-neutral-400 leading-relaxed font-light mb-8 group-hover:text-neutral-300 transition-colors duration-300">{t(`classes.items.${cls.id}.desc`, { defaultValue: cls.desc })}</p>
              </div>

              <div className="relative z-10 mt-auto pt-6 border-t border-white/10">
                <Link 
                  to={`/klassen/${cls.id.toLowerCase()}`}
                  className={`inline-flex items-center gap-3 text-sm font-bold text-white ${cls.textHover} transition-colors uppercase tracking-widest`}
                >
                  {t('classes.learn_more')} 
                  <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
