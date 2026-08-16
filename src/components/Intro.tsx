import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { BearLogo } from './BearLogo';

export function Intro({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Wait for fade out
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-bg overflow-hidden"
        >
          {/* Subtle background particles/glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1.2 }}
            transition={{ duration: 3, ease: 'easeOut' }}
            className="absolute w-[800px] h-[800px] bg-primary rounded-full blur-[150px] opacity-20 pointer-events-none"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1.5 }}
            transition={{ duration: 3, ease: 'easeOut', delay: 0.2 }}
            className="absolute w-[600px] h-[600px] bg-gold rounded-full blur-[120px] opacity-10 pointer-events-none mix-blend-screen"
          />

          {/* High-End Mercedes Cinematic Pass-By */}
          <div 
            className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-10"
            style={{ perspective: '1200px' }}
          >
            <motion.div
              initial={{ 
                x: '-120vw', 
                scale: 0.7,
                rotateY: 25, 
                rotateX: 5,
                filter: 'blur(20px)', 
                opacity: 0 
              }}
              animate={{ 
                x: ['-100vw', '0vw', '100vw'], 
                scale: [0.7, 1.2, 0.7],
                rotateY: [20, 0, -20],
                rotateX: [5, 0, 5],
                filter: ['blur(15px)', 'blur(0px)', 'blur(15px)'],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2.8, 
                times: [0, 0.5, 1], 
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.2
              }}
              className="relative w-[350px] md:w-[750px] mt-32 md:mt-48 transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Dynamic Ground Shadow */}
              <motion.div 
                animate={{ 
                  scale: [0.8, 1.1, 0.8],
                  opacity: [0.3, 0.9, 0.3]
                }}
                transition={{ duration: 2.8, times: [0, 0.5, 1], delay: 0.2 }}
                className="absolute -bottom-8 left-[10%] right-[10%] h-12 bg-black blur-[25px] rounded-[100%] z-0" 
              />
              
              <div className="absolute inset-0 bg-primary/10 blur-[50px] rounded-full scale-150 z-10" />
              
              <img referrerPolicy="no-referrer" 
                src="/mercedes.png" 
                alt="Mercedes S-Klasse" 
                className="relative z-20 w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]" 
              />
              
              {/* Glossy Metallic Light Reflection */}
              <motion.div 
                initial={{ left: '-150%', opacity: 0 }}
                animate={{ left: '150%', opacity: [0, 0.9, 0] }}
                transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 z-30 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[30deg]"
                style={{ mixBlendMode: 'soft-light' }}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative flex flex-col items-center z-20"
          >
            <div className="relative">
              <BearLogo className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-[0_0_15px_rgba(217,4,41,0.5)]" />
            </div>
            
            <motion.h1
              initial={{ opacity: 0, letterSpacing: '0em' }}
              animate={{ opacity: 1, letterSpacing: '0.1em' }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-8 text-3xl md:text-5xl font-bold tracking-widest text-white uppercase"
            >
              Fahrschule Bär
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="mt-4 text-gold text-sm md:text-base font-light tracking-wider uppercase"
            >
              Sicher fahren. Selbstbewusst ankommen.
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
