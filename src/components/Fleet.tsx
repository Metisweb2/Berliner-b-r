import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section } from './ui/Section';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const defaultFleet = [
  {
    id: 'default-1',
    name: 'VW Golf VIII',
    type: 'Schaltwagen',
    img: 'https://images.unsplash.com/photo-1621007947382-bb3c399b52c5?q=80&w=1000&auto=format&fit=crop',
    desc: 'Unser agiler und sicherer Klassiker für die manuelle Schalt-Ausbildung.',
    order: 1
  },
  {
    id: 'default-2',
    name: 'Audi A3 Sportback',
    type: 'Automatik',
    img: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=1000&auto=format&fit=crop',
    desc: 'Premium-Komfort und modernste Assistenzsysteme für stressfreies Lernen.',
    order: 2
  }];

export function Fleet() {
  const [vehicles, setVehicles] = useState(defaultFleet);
  const [filter, setFilter] = useState('Alle');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'fleet'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setVehicles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)));
      } else {
        setVehicles(defaultFleet);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(vehicles.map(v => v.type).filter(Boolean));
    return ['Alle', ...Array.from(cats)];
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    if (filter === 'Alle') return vehicles;
    return vehicles.filter(v => v.type === filter);
  }, [filter, vehicles]);

  return (
    <Section id="fleet" className="bg-[#050505] py-32 relative overflow-hidden border-t border-white/5">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center mb-8"
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent mb-6" />
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs md:text-sm">Premium Flotte</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tight"
          >
            Unser <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">Fuhrpark</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-neutral-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed"
          >
            Entdecke unsere moderne Fahrzeugflotte. Ob Automatik oder Schalter – wir bieten dir für jede Ausbildungsklasse das perfekte Fahrzeug.
          </motion.p>
        </div>

        {/* Filter Categories */}
        {categories.length > 2 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-primary text-black shadow-[0_0_20px_rgba(217,4,41,0.4)]' 
                    : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Vehicle Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((car, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                key={car.id}
                className="group relative rounded-[2rem] bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/5 hover:border-white/15 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/0 to-primary/0 group-hover:to-primary/5 transition-colors duration-500 z-0 pointer-events-none" />
                
                <div className="aspect-[4/3] overflow-hidden relative z-10">
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <motion.img referrerPolicy="no-referrer" 
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8, ease: "easeOut" as any }}
                    src={car.img}  
                    alt={car.name} 
                    className="w-full h-full object-cover object-center grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                   />
                  {car.type && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg">
                        {car.type}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {car.name}
                  </h3>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed flex-grow">
                    {car.desc}
                  </p>
                  
                  <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent mt-6 transition-all duration-500 group-hover:from-primary/50" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  );
}
