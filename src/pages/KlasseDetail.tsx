import { useSEO } from '../hooks/useSEO';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, BookOpen, Car, Calendar, Info } from 'lucide-react';

const classDetails: Record<string, any> = {
  b: {
    title: 'Klasse B',
    subtitle: 'Der klassische PKW-Führerschein',
    description: 'Mit der Klasse B darfst du Kraftfahrzeuge bis 3.500 kg zulässiger Gesamtmasse fahren. Du absolvierst die komplette Ausbildung und Prüfung auf einem Fahrzeug mit manuellem Schaltgetriebe.',
    requirements: [
      'Mindestalter: 18 Jahre (17 beim Begleiteten Fahren)',
      'Lichtbild (biometrisch)',
      'Sehtest (nicht älter als 2 Jahre)',
      'Erste-Hilfe-Kurs'
    ],
    theory: [
      '12 Doppelstunden Grundstoff (bei Ersterwerb)',
      '6 Doppelstunden Grundstoff (bei Vorbesitz)',
      '2 Doppelstunden klassenspezifischer Stoff',
      'Theorieprüfung (frühestens 3 Monate vor Geburtstag)'
    ],
    practice: [
      'Grundausbildung (Übungsfahrten nach Bedarf)',
      '5 Sonderfahrten Überland (à 45 Min.)',
      '4 Sonderfahrten Autobahn (à 45 Min.)',
      '3 Sonderfahrten bei Dunkelheit (à 45 Min.)',
      'Praktische Prüfung (55 Minuten)'
    ]
  },
  b78: {
    title: 'Klasse B78',
    subtitle: 'Reine Automatik-Ausbildung',
    description: 'Entspannt fahren ohne Schalten! Die Ausbildung und Prüfung findet ausschließlich auf einem Fahrzeug mit Automatikgetriebe statt. In deinem Führerschein wird die Schlüsselzahl 78 eingetragen, womit du danach nur Automatikfahrzeuge fahren darfst.',
    requirements: [
      'Mindestalter: 18 Jahre (17 beim Begleiteten Fahren)',
      'Lichtbild (biometrisch)',
      'Sehtest (nicht älter als 2 Jahre)',
      'Erste-Hilfe-Kurs'
    ],
    theory: [
      '12 Doppelstunden Grundstoff (bei Ersterwerb)',
      '6 Doppelstunden Grundstoff (bei Vorbesitz)',
      '2 Doppelstunden klassenspezifischer Stoff',
      'Theorieprüfung (frühestens 3 Monate vor Geburtstag)'
    ],
    practice: [
      'Grundausbildung (Übungsfahrten auf Automatik)',
      '5 Sonderfahrten Überland (à 45 Min.)',
      '4 Sonderfahrten Autobahn (à 45 Min.)',
      '3 Sonderfahrten bei Dunkelheit (à 45 Min.)',
      'Praktische Prüfung (55 Minuten, auf Automatik)'
    ]
  },
  b197: {
    title: 'Klasse B197',
    subtitle: 'Das Beste aus beiden Welten',
    description: 'Die Ausbildung findet zum Großteil stressfrei auf einem Automatikfahrzeug statt. Du machst lediglich mindestens 10 Fahrstunden auf einem Schalter und zeigst in einer internen 15-minütigen Testfahrt, dass du schalten kannst. Die offizielle TÜV-Prüfung ist auf Automatik, du darfst danach aber Schalter UND Automatik fahren!',
    requirements: [
      'Mindestalter: 18 Jahre (17 beim Begleiteten Fahren)',
      'Lichtbild (biometrisch)',
      'Sehtest (nicht älter als 2 Jahre)',
      'Erste-Hilfe-Kurs'
    ],
    theory: [
      '12 Doppelstunden Grundstoff (bei Ersterwerb)',
      '6 Doppelstunden Grundstoff (bei Vorbesitz)',
      '2 Doppelstunden klassenspezifischer Stoff',
      'Theorieprüfung (frühestens 3 Monate vor Geburtstag)'
    ],
    practice: [
      'Grundausbildung (auf Automatik)',
      'Mindestens 10 Fahrstunden auf einem Schaltwagen',
      '15 Min. Schaltkompetenz-Test (intern mit Fahrlehrer)',
      '12 Sonderfahrten (meist auf Automatik)',
      'Praktische Prüfung (55 Minuten, auf Automatik)'
    ]
  },
  be: {
    title: 'Klasse BE',
    subtitle: 'Der große Anhängerführerschein',
    description: 'Für die wirklich schweren Aufgaben: Zugkombinationen aus einem Zugfahrzeug der Klasse B und einem Anhänger mit einer zulässigen Gesamtmasse von über 750 kg bis maximal 3.500 kg (Kombination bis max. 7.000 kg möglich).',
    requirements: [
      'Vorbesitz oder paralleler Erwerb der Klasse B',
      'Lichtbild (biometrisch)',
      'Sehtest (nicht älter als 2 Jahre)'
    ],
    theory: [
      'Keine Theorie-Ausbildung erforderlich!',
      'Keine Theorieprüfung erforderlich!'
    ],
    practice: [
      'Grundausbildung (Rangieren, Verbinden/Trennen)',
      '3 Sonderfahrten Überland (à 45 Min.)',
      '1 Sonderfahrt Autobahn (à 45 Min.)',
      '1 Sonderfahrt bei Dunkelheit (à 45 Min.)',
      'Praktische Prüfung (45 Minuten)'
    ]
  },
  b96: {
    title: 'Klasse B96',
    subtitle: 'Das Tages-Upgrade ohne Prüfung',
    description: 'Perfekt für Wohnwagen oder Pferdeanhänger: Fahrzeugkombinationen (Klasse B und Anhänger über 750 kg) mit einer zulässigen Gesamtmasse von über 3.500 kg bis max. 4.250 kg. Es ist KEINE Prüfung erforderlich, nur eine eintägige Fahrerschulung!',
    requirements: [
      'Vorbesitz oder paralleler Erwerb der Klasse B',
      'Lichtbild (biometrisch)',
      'Personalausweis oder Reisepass'
    ],
    theory: [
      '2,5 Stunden (à 60 Min.) theoretische Schulung',
      'Keine Prüfung!'
    ],
    practice: [
      '3,5 Stunden (à 60 Min.) praktische Schulung',
      '1 Stunde fahrpraktische Übung im Realverkehr',
      'Im Anschluss erhältst du eine Bescheinigung für die Behörde',
      'Keine fahrpraktische Prüfung!'
    ]
  }
};

import { useTranslation } from 'react-i18next';

export function KlasseDetail() {
  const { id } = useParams();
  const details = classDetails[id as string];
  useSEO(details ? `Klasse ${details.title}` : 'Klassen', details ? details.description : 'Führerscheinklassen');
  const { t } = useTranslation();
  
  if (!id || !classDetails[id]) {
    return <Navigate to="/" replace />;
  }

  const data = classDetails[id];
  const upperId = id.toUpperCase();

  return (
    <main className="min-h-screen pt-32 pb-20 bg-dark-bg relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      <div className="absolute -left-1/4 top-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <Link 
          to="/#classes" 
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-12 transition-colors group font-medium"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t('kdetails.back')}
        </Link>

        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-6 mb-6"
          >
            <div className="w-20 h-20 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-3xl font-black text-white shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              {t(`classes.items.${upperId}.title`, { defaultValue: data.title }).replace('Klasse ', '').replace('Категория ', '')}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                {t(`classes.items.${upperId}.title`, { defaultValue: data.title })}
              </h1>
              <p className="text-xl text-primary font-bold tracking-wide">
                {t(`classes.items.${upperId}.subtitle`, { defaultValue: data.subtitle })}
              </p>
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-neutral-300 max-w-3xl leading-relaxed"
          >
            {t(`classes.items.${upperId}.desc`, { defaultValue: data.description })}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Vorraussetzungen */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <Info className="w-6 h-6 text-neutral-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">{t('kdetails.req')}</h3>
            </div>
            <ul className="space-y-4">
              {data.requirements.map((req: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-neutral-300">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span>{t(`classes.items.${upperId}.requirements.${i}`, { defaultValue: req })}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Theorie */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-neutral-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">{t('kdetails.theory')}</h3>
            </div>
            <ul className="space-y-4">
              {data.theory.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  <span>{t(`classes.items.${upperId}.theory.${i}`, { defaultValue: item })}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Praxis */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2 bg-gradient-to-br from-[#111] to-[#151515] border border-white/10 rounded-3xl p-8 hover:border-primary/30 transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white">{t('kdetails.practice')}</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.practice.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <Calendar className="w-5 h-5 text-neutral-500 shrink-0" />
                    <span className="text-neutral-200">{t(`classes.items.${upperId}.practice.${i}`, { defaultValue: item })}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link
            to="/kontakt"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] text-lg"
          >
            {t('kdetails.register_for')} {t(`classes.items.${upperId}.title`, { defaultValue: data.title })}
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
