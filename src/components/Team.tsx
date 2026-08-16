import React, { useState, useEffect, useRef } from 'react';
import { Section } from './ui/Section';
import { useTranslation } from 'react-i18next';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const defaultTeam = [
  {
    id: 'default-1',
    name: 'Markus Weber',
    role: 'Inhaber & Fahrlehrer (Auto)',
    desc: 'Mit ruhiger Art und 15 Jahren Erfahrung bringt Markus jeden sicher durch die Prüfung.',
    img: 'https://i.pravatar.cc/300?img=11',
  },
  {
    id: 'default-2',
    name: 'Sarah Müller',
    role: 'Fahrlehrerin (Auto)',
    desc: 'Sarah ist unsere Spezialistin für Automatik-Ausbildung und nimmt jede Prüfungsangst.',
    img: 'https://i.pravatar.cc/300?img=47',
  },
  {
    id: 'default-3',
    name: 'Thomas Koch',
    role: 'Fahrlehrer (Theorie & Praxis)',
    desc: 'Ein geduldiger Begleiter auf dem Weg zum Führerschein. Theorie und Praxis mit Leichtigkeit erklärt.',
    img: 'https://i.pravatar.cc/300?img=13',
  }
];

export function Team() {
  const { t } = useTranslation();
  const [team, setTeam] = useState(defaultTeam);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(collection(db, 'team'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setTeam(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)));
      } else {
        setTeam(defaultTeam);
      }
    });
    return () => unsubscribe();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Section className="bg-[#050505] border-y border-white/5 py-32 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-12 h-px bg-primary" />
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs md:text-sm">Unser Experten-Team</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white tracking-tight"
            >
              {t('about.team_title')}
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 hover:border-primary/50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 hover:border-primary/50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div 
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {team.map((member, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                key={member.id || i} 
                className="group relative rounded-[2rem] overflow-hidden bg-[#0A0A0A] border border-white/10 flex-shrink-0 w-[85vw] sm:w-[350px] lg:w-[400px] snap-center sm:snap-start"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10" />
                  <img referrerPolicy="no-referrer" 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  />
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-10 h-10 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:delay-100">
                    <span className="text-primary font-bold text-lg">{member.name[0]}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">{member.name}</h3>
                  <p className="text-white/60 font-medium text-sm mb-0 group-hover:mb-4 transition-all duration-500">{member.role}</p>
                  
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500">
                    <div className="overflow-hidden">
                      <p className="text-neutral-400 text-sm leading-relaxed pb-2">
                        {member.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </Section>
  );
}
