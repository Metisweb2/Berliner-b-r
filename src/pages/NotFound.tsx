import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export function NotFound() {
  useSEO('Seite nicht gefunden', 'Diese Seite existiert nicht.');
  
  return (
    <Section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-bg">
      {/* Cinematic Abstract Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] mix-blend-screen opacity-50 animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] mix-blend-screen opacity-30 animate-[pulse_8s_ease-in-out_infinite_reverse]" />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 flex flex-col items-center">
        
        {/* Aesthetic Crossroads Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="relative w-64 h-64 md:w-80 md:h-80 mb-12"
        >
          {/* Crossroads SVG showing 4 directions */}
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            
            {/* Background glowing circle */}
            <circle cx="100" cy="100" r="50" fill="url(#center-glow)" opacity="0.6" />
            
            {/* Roads Layout */}
            
            {/* Road: Top */}
            <path d="M85 0 L85 85" stroke="url(#road-faded)" strokeWidth="30" />
            <path d="M115 0 L115 85" stroke="url(#road-faded)" strokeWidth="30" />
            <path d="M100 0 L100 85" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="4 6" />

            {/* Road: Bottom */}
            <path d="M85 200 L85 115" stroke="url(#road-solid)" strokeWidth="30" />
            <path d="M115 200 L115 115" stroke="url(#road-solid)" strokeWidth="30" />
            <path d="M100 200 L100 115" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="4 6" />

            {/* Road: Left */}
            <path d="M0 85 L85 85" stroke="url(#road-faded-left)" strokeWidth="30" />
            <path d="M0 115 L85 115" stroke="url(#road-faded-left)" strokeWidth="30" />
            <path d="M0 100 L85 100" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="4 6" />

            {/* Road: Right (Wrong path taken) */}
            <path d="M200 85 L115 85" stroke="url(#road-faded-right)" strokeWidth="30" />
            <path d="M200 115 L115 115" stroke="url(#road-faded-right)" strokeWidth="30" />
            <path d="M200 100 L115 100" stroke="rgba(217,4,41,0.4)" strokeWidth="2" strokeDasharray="4 6" />

            {/* Intersection box */}
            <rect x="70" y="70" width="60" height="60" fill="#0A0A0A" />
            
            {/* Smooth Intersection curves (Visual fillers) */}
            <path d="M70 70 Q85 70 85 85" stroke="rgba(255,255,255,0.05)" strokeWidth="30" fill="none" />
            <path d="M130 70 Q115 70 115 85" stroke="rgba(255,255,255,0.05)" strokeWidth="30" fill="none" />
            <path d="M70 130 Q85 130 85 115" stroke="rgba(255,255,255,0.05)" strokeWidth="30" fill="none" />
            <path d="M130 130 Q115 130 115 115" stroke="rgba(255,255,255,0.05)" strokeWidth="30" fill="none" />

            {/* Path traced from bottom and turned Right (the "Wrong" turn) */}
            <path d="M100 200 L100 120 Q100 100 120 100 L180 100" stroke="url(#wrong-path-gradient)" strokeWidth="4" strokeLinecap="round" fill="none" />
            
            {/* Glowing dot representing the user at a dead end on the right */}
            <circle cx="180" cy="100" r="5" fill="#D90429" className="animate-[pulse_1.5s_ease-in-out_infinite]" />
            <circle cx="180" cy="100" r="12" fill="#D90429" opacity="0.3" className="animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />

            <defs>
              <radialGradient id="center-glow" cx="100" cy="100" r="50" gradientUnits="userSpaceOnUse">
                <stop stopColor="rgba(255,255,255,0.1)" />
                <stop offset="1" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
              <linearGradient id="road-solid" x1="100" y1="200" x2="100" y2="115" gradientUnits="userSpaceOnUse">
                <stop stopColor="rgba(255,255,255,0.08)" />
                <stop offset="1" stopColor="rgba(255,255,255,0.02)" />
              </linearGradient>
              <linearGradient id="road-faded" x1="100" y1="85" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="rgba(255,255,255,0.02)" />
                <stop offset="1" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              <linearGradient id="road-faded-left" x1="85" y1="100" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="rgba(255,255,255,0.02)" />
                <stop offset="1" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              <linearGradient id="road-faded-right" x1="115" y1="100" x2="200" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="rgba(217,4,41,0.05)" />
                <stop offset="1" stopColor="rgba(217,4,41,0)" />
              </linearGradient>
              <linearGradient id="wrong-path-gradient" x1="100" y1="200" x2="180" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D90429" stopOpacity="0" />
                <stop offset="0.5" stopColor="#D90429" stopOpacity="0.8" />
                <stop offset="1" stopColor="#D90429" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Falsche Abzweigung
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl font-light max-w-lg leading-relaxed mb-12">
            Die Route, die du suchst, wurde anscheinend umgeleitet oder existiert nicht mehr. Lass uns gemeinsam zurück auf die Spur finden.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link 
            to="/" 
            className="group flex items-center justify-center gap-4 bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-500 hover:bg-neutral-200 hover:scale-105"
          >
            <span className="relative z-10 transition-colors">Neue Route berechnen</span>
            <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-500 group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}
