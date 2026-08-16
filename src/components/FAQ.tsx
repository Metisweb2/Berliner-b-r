import { useState } from 'react';
import { Section } from './ui/Section';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Wie lange dauert der Führerschein in der Regel?',
    a: 'Das hängt von deiner Zeit und Motivation ab. Bei kontinuierlichen Fahrstunden (1-2 pro Woche) kannst du mit etwa 3 bis 5 Monaten rechnen. Wir bieten auch Intensivkurse an.',
  },
  {
    q: 'Wie viele Fahrstunden brauche ich?',
    a: 'Gesetzlich vorgeschrieben sind 12 Sonderfahrten (5x Überland, 4x Autobahn, 3x Nacht). Die Anzahl der normalen Übungsstunden hängt von deinen individuellen Fortschritten ab – wir fahren so viele wie nötig, aber so wenige wie möglich.',
  },
  {
    q: 'Kann ich online einen Termin vereinbaren?',
    a: 'Ja! Nutze einfach unser Anmeldeformular auf der Website. Wir rufen dich dann an, um deinen ersten Termin und den weiteren Ablauf zu besprechen.',
  },
  {
    q: 'Darf ich den Theorieunterricht auch in anderen Filialen besuchen?',
    a: 'Falls wir weitere Standorte eröffnen, bist du völlig flexibel und kannst Theorie-Einheiten standortübergreifend besuchen, um schneller fertig zu werden.',
  },
  {
    q: 'Was kostet der Führerschein?',
    a: 'Die Gesamtkosten variieren je nach benötigten Fahrstunden. Eine grobe Schätzung für Klasse B liegt derzeit zwischen 2.500 € und 3.500 €. Gerne beraten wir dich hierzu persönlich und transparent.',
  },
];

import { useTranslation } from 'react-i18next';

export function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-neutral-900 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('faq.subtitle')}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-gold mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
                  isOpen ? 'bg-dark-card border-primary/30' : 'bg-transparent border-white/10 hover:border-white/30'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className={`font-semibold text-lg transition-colors ${isOpen ? 'text-white' : 'text-neutral-300'}`}>
                    {t(`faq.items.${i + 1}.q`, { defaultValue: faq.q })}
                  </span>
                  <div className={`flex-shrink-0 ml-4 p-2 rounded-full transition-colors ${isOpen ? 'bg-primary/10 text-primary' : 'bg-white/5 text-neutral-400'}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 text-neutral-400 leading-relaxed border-t border-white/5 pt-4">
                        {t(`faq.items.${i + 1}.a`, { defaultValue: faq.a })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
