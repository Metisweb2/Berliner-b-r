import React, { useState, useEffect } from 'react';
import { Section } from './ui/Section';
import { BearLogo } from './BearLogo';
import { useTranslation } from 'react-i18next';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export function About() {
  const { t } = useTranslation();
  const [aboutData, setAboutData] = useState({
    title: t('about.title'),
    p1: t('about.p1'),
    p2: t('about.p2'),
    p3: t('about.p3'),
    exp: t('about.exp'),
    rate: t('about.rate'),
    quality: t('about.quality')
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'about'), (snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setAboutData(prev => ({
          title: d.title || prev.title,
          p1: d.p1 || prev.p1,
          p2: d.p2 || prev.p2,
          p3: d.p3 || prev.p3,
          exp: d.exp || prev.exp,
          rate: d.rate || prev.rate,
          quality: d.quality || prev.quality
        }));
      }
    });
    return () => unsubscribe();
  }, [t]);

  return (
    <Section id="about">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-gold/20 rounded-3xl blur-2xl transform -rotate-3" />
          <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 flex items-center justify-center">
            {/* Placeholder for an actual team/car photo, using the Bear Logo styled large for now */}
            <BearLogo className="w-64 h-64 object-contain opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
          </div>
          
          {/* Floating badge */}
          <div className="absolute -bottom-8 -right-8 bg-dark-card border border-gold/30 p-6 rounded-2xl shadow-2xl backdrop-blur-sm hidden md:block">
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200 mb-1">10+</div>
            <div className="text-sm font-medium text-neutral-400"><span dangerouslySetInnerHTML={{ __html: aboutData.exp }} /></div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="flex items-center gap-4 mb-6">
            <BearLogo className="w-8 h-8 object-contain" />
            <h2 className="text-3xl md:text-5xl font-bold">{aboutData.title}</h2>
          </div>
          
          <div className="space-y-6 text-lg text-neutral-400 leading-relaxed">
            <p>
              <span dangerouslySetInnerHTML={{ __html: aboutData.p1 }} />
            </p>
            <p dangerouslySetInnerHTML={{ __html: aboutData.p2 }} />
            <p dangerouslySetInnerHTML={{ __html: aboutData.p3 }} />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-8 pt-10 border-t border-white/10">
            <div>
              <div className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-primary">98%</span>
              </div>
              <div className="text-sm text-neutral-400 uppercase tracking-wider">{aboutData.rate}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-gold">TÜV</span>
              </div>
              <div className="text-sm text-neutral-400 uppercase tracking-wider">{aboutData.quality}</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
