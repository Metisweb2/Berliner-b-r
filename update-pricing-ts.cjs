const fs = require('fs');

const code = `import { useState } from 'react';
import { Section } from './ui/Section';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Car, Map, MonitorCheck, Award, GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type PriceItem = {
  key: string;
  price: string;
  icon: any;
  highlight?: boolean;
};

type ClassData = {
  id: string;
  items: PriceItem[];
};

const pricingData: ClassData[] = [
  {
    id: 'b',
    items: [
      { key: 'base', price: '350 €', icon: BookOpen, highlight: true },
      { key: 'practice', price: '65 €', icon: Car },
      { key: 'special', price: '75 €', icon: Map },
      { key: 'theory_exam', price: '60 €', icon: MonitorCheck },
      { key: 'practice_exam', price: '150 €', icon: Award },
    ]
  },
  {
    id: 'b197',
    items: [
      { key: 'base', price: '350 €', icon: BookOpen, highlight: true },
      { key: 'practice', price: '65 €', icon: Car },
      { key: 'special', price: '75 €', icon: Map },
      { key: 'theory_exam', price: '60 €', icon: MonitorCheck },
      { key: 'practice_exam', price: '150 €', icon: Award },
    ]
  },
  {
    id: 'be',
    items: [
      { key: 'base', price: '200 €', icon: BookOpen, highlight: true },
      { key: 'practice', price: '75 €', icon: Car },
      { key: 'special', price: '85 €', icon: Map },
      { key: 'practice_exam', price: '160 €', icon: Award },
    ]
  },
  {
    id: 'b96',
    items: [
      { key: 'b96_course', price: '399 €', icon: GraduationCap, highlight: true },
    ]
  },
  {
    id: 'a',
    items: [
      { key: 'base', price: '300 €', icon: BookOpen, highlight: true },
      { key: 'practice', price: '70 €', icon: Car },
      { key: 'special', price: '80 €', icon: Map },
      { key: 'theory_exam', price: '60 €', icon: MonitorCheck },
      { key: 'practice_exam', price: '170 €', icon: Award },
    ]
  }
];

export function Pricing() {
  const { t } = useTranslation();
  const [selectedClass, setSelectedClass] = useState('b');

  const currentData = pricingData.find(d => d.id === selectedClass) || pricingData[0];

  return (
    <Section id="pricing" className="bg-dark-bg py-24 md:py-32 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wide"
          >
            {t('pricing.title_start')}<span className="font-bold">{t('pricing.title_highlight')}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-400 max-w-2xl mx-auto text-lg font-light"
          >
            {t('pricing.subtitle')}
          </motion.p>
        </header>

        {/* Class Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {pricingData.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelectedClass(cls.id)}
              className={\`relative px-6 py-3 rounded-full text-sm font-medium transition-colors \${
                selectedClass === cls.id ? 'text-black' : 'text-neutral-400 hover:text-white'
              }\`}
            >
              {selectedClass === cls.id && (
                <motion.div
                  layoutId="pricing-tab-active"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{t(\`pricing.classes.\${cls.id}\`)}</span>
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedClass}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentData.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.key} 
                    className={\`p-8 rounded-[2rem] border transition-colors flex flex-col justify-between \${
                      item.highlight 
                        ? 'bg-white/5 border-white/10 shadow-sm md:col-span-2 lg:col-span-1' 
                        : 'bg-transparent border-white/5 hover:bg-white/[0.02]'
                    }\`}
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className={\`w-12 h-12 rounded-xl flex items-center justify-center \${
                        item.highlight ? 'bg-white text-black' : 'bg-white/5 text-white'
                      }\`}>
                        <Icon className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{t(\`pricing.fees.\${item.key}.title\`)}</h3>
                      <p className="text-neutral-400 text-sm font-light mb-8 h-10">{t(\`pricing.fees.\${item.key}.desc\`)}</p>
                      <div className="flex items-end gap-2 border-t border-white/5 pt-6">
                        <span className="text-3xl font-bold text-white">{item.price}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-center text-sm text-neutral-500 mt-16 font-light px-4">
          <p dangerouslySetInnerHTML={{ __html: t('pricing.disclaimer') }}></p>
        </div>
      </div>
    </Section>
  );
}
`;

fs.writeFileSync('src/components/Pricing.tsx', code);

// Make sure pricing.subtitle and disclaimer exist in locales
const de = JSON.parse(fs.readFileSync('src/locales/de.json', 'utf8'));
const ru = JSON.parse(fs.readFileSync('src/locales/ru.json', 'utf8'));

if (!de.pricing.subtitle) de.pricing.subtitle = "Qualität hat ihren Preis, aber keine versteckten Kosten. Hier findest du unsere Basispreise fair und übersichtlich aufgeschlüsselt.";
if (!de.pricing.disclaimer) de.pricing.disclaimer = "* Alle Preise verstehen sich inkl. der gesetzlichen MwSt. <br />TÜV-Gebühren für Prüfungen werden separat erhoben. Stand 2024.";

if (!ru.pricing.subtitle) ru.pricing.subtitle = "Качество имеет свою цену, но без скрытых затрат. Здесь вы найдете наши базовые цены, расписанные честно и прозрачно.";
if (!ru.pricing.disclaimer) ru.pricing.disclaimer = "* Все цены указаны с учетом НДС. <br />Сборы TÜV за экзамены взимаются отдельно. По состоянию на 2024 год.";

fs.writeFileSync('src/locales/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('src/locales/ru.json', JSON.stringify(ru, null, 2));
