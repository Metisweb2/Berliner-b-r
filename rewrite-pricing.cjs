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

        {/* Pricing List */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedClass}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 max-w-3xl mx-auto"
            >
              {currentData.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.key} 
                    className={\`p-5 sm:p-6 rounded-2xl border transition-colors flex items-center justify-between gap-4 \${
                      item.highlight 
                        ? 'bg-white/5 border-white/10 shadow-sm' 
                        : 'bg-transparent border-white/5 hover:bg-white/[0.03]'
                    }\`}
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className={\`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 \${
                        item.highlight ? 'bg-white text-black' : 'bg-white/5 text-white'
                      }\`}>
                        <Icon className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">{t(\`pricing.fees.\${item.key}.title\`)}</h3>
                        <p className="text-neutral-400 text-xs sm:text-sm font-light mt-1">{t(\`pricing.fees.\${item.key}.desc\`)}</p>
                      </div>
                    </div>
                    <div className="text-xl sm:text-3xl font-bold text-white whitespace-nowrap">
                      {item.price}
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
