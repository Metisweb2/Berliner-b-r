import { useSEO } from '../hooks/useSEO';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Section } from '../components/ui/Section';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function getTabs(t: any) {
  return [
    { id: 'impressum', label: t('footer.legal_links.imp'), path: '/impressum' },
    { id: 'datenschutz', label: t('footer.legal_links.ds'), path: '/datenschutz' },
    { id: 'agb', label: t('footer.legal_links.agb'), path: '/agb' }
  ];
}

const MarkdownContent = ({ content }: { content: string }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 text-neutral-300 font-light text-lg leading-relaxed max-w-none prose prose-invert prose-headings:text-white prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-8 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4 prose-p:mb-6 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:mb-2">
      <ReactMarkdown>{content}</ReactMarkdown>
    </motion.div>
  );
};

export function Legal() {
  const location = useLocation();
  const currentPath = location.pathname;
  const path = currentPath.substring(1);
  useSEO(path.charAt(0).toUpperCase() + path.slice(1), 'Rechtliche Informationen der Fahrschule Bär');
  const { t } = useTranslation();
  const TABS = getTabs(t);
  
  const activeTab = TABS.find(tab => tab.path === currentPath) || TABS[0];
  const [legalData, setLegalData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  useEffect(() => {
    const fetchLegalData = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'legal'));
        if (snap.exists()) {
          setLegalData(snap.data());
        }
      } catch (err) {
        console.error("Failed to load legal texts:", err);
      }
      setLoading(false);
    };
    fetchLegalData();
  }, []);

  const getFallbackContent = (tabId: string) => {
    switch (tabId) {
      case 'impressum':
        return `# Impressum\n\nAngaben gemäß § 5 TMG:\n\nMax Mustermann\nMusterstraße 1\n12345 Musterstadt\n\n## Kontakt\nTelefon: +49 (0) 123 44 55 66\nE-Mail: info@muster.de\n\n## Umsatzsteuer-ID\nUmsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:\nDE999999999`;
      case 'datenschutz':
        return `# Datenschutzerklärung\n\n## 1. Datenschutz auf einen Blick\n\n### Allgemeine Hinweise\nDie folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.\n\n## 2. Datenerfassung auf dieser Website\n\nWer ist verantwortlich für die Datenerfassung auf dieser Website?\nDie Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.`;
      case 'agb':
        return `# Allgemeine Geschäftsbedingungen\n\n## §1 Geltungsbereich\nFür die Geschäftsbeziehung zwischen der Fahrschule und dem Kunden gelten ausschließlich die nachfolgenden Allgemeinen Geschäftsbedingungen in ihrer zum Zeitpunkt der Anmeldung gültigen Fassung.`;
      default:
        return '';
    }
  };

  const content = legalData[activeTab.id] || getFallbackContent(activeTab.id);

  return (
    <Section className="pt-40 pb-32 min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -left-1/4 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Navigation Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-16 p-2 bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10 max-w-2xl mx-auto shadow-2xl"
        >
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab.id;
            return (
              <Link
                key={tab.id}
                to={tab.path}
                className={`relative px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-colors ${
                  isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="legal-active-tab"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </Link>
            );
          })}
        </motion.div>

        {/* Content Area */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 md:p-14 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            {loading ? (
               <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center items-center h-64">
                 <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
               </motion.div>
            ) : (
               <MarkdownContent key={activeTab.id} content={content} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
