import { useSEO } from '../hooks/useSEO';
import { motion } from 'motion/react';
import { Section } from '../components/ui/Section';
import { Euro, Calendar, Car, Smile, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Karriere() {
  useSEO('Karriere', 'Werde Teil unseres Teams als Fahrlehrer.');

  const { t } = useTranslation();

  const benefits = [
    {
      icon: <Euro className="w-8 h-8 text-primary mb-4" />,
      title: t('career.benefits.salary.title'),
      description: t('career.benefits.salary.desc')
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary mb-4" />,
      title: t('career.benefits.vacation.title'),
      description: t('career.benefits.vacation.desc')
    },
    {
      icon: <Car className="w-8 h-8 text-primary mb-4" />,
      title: t('career.benefits.car.title'),
      description: t('career.benefits.car.desc')
    },
    {
      icon: <Smile className="w-8 h-8 text-primary mb-4" />,
      title: t('career.benefits.team.title'),
      description: t('career.benefits.team.desc')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as any, stiffness: 100, damping: 20 } }
  };

  return (
    <Section className="pt-40 pb-32 min-h-screen relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
            {t('career.subtitle')}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] mb-6">
            {t('career.title')}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
            {t('career.description')}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {benefits.map((benefit, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl shadow-xl hover:border-white/10 transition-colors group"
            >
              <div className="transform group-hover:scale-110 transition-transform duration-500 origin-left">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-neutral-400 font-light leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-[#121212] to-[#0a0a0a] border border-white/10 p-10 md:p-16 rounded-[2rem] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Car className="w-64 h-64" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center justify-between">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t('career.contact.title')}
              </h2>
              <p className="text-neutral-300 font-light text-lg mb-8 leading-relaxed max-w-xl">
                {t('career.contact.description')}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{t('career.contact.addressLabel')}</h4>
                    <p className="text-neutral-400 font-light">
                      Fahrschule Berliner Bär GmbH<br />
                      Marzahner Promenade 25<br />
                      12679 Berlin
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{t('career.contact.phoneLabel')}</h4>
                    <a href="tel:017660807518" className="text-neutral-400 font-light hover:text-white transition-colors">
                      0176 60 80 75 18
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <a 
                href="tel:017660807518"
                className="group relative inline-flex items-center justify-center gap-3 w-full md:w-auto px-10 py-5 bg-white text-[#0a0a0a] font-bold rounded-full overflow-hidden transition-transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-3 text-lg">
                  <Phone className="w-5 h-5" />
                  {t('career.contact.cta')}
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
