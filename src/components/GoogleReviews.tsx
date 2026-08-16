import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    dateKey: "1",
    textKey: "1",
    rating: 5,
  },
  {
    id: 2,
    name: "Max L.",
    dateKey: "1",
    textKey: "2",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena K.",
    dateKey: "3",
    textKey: "3",
    rating: 5,
  }
];

const ReviewCard: React.FC<{ review: typeof reviews[0], index: number }> = ({ review, index }) => {
  const { t } = useTranslation();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        
      }}
      className="relative bg-[#111111] border border-white/10 p-10 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col justify-between group overflow-hidden transition-colors hover:bg-[#1a1a1a]"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-10">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.694 20 9.289L20 10.609L24 10.609L24 18L14.017 18ZM0 18L0 10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.694 6 9.289L6 10.609L10 10.609L10 18L0 18Z" />
        </svg>
      </div>
      <div className="mb-8 relative z-10" >
        <div className="flex items-center gap-3 mb-8">
          <div className="flex text-primary gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="fill-current w-5 h-5 drop-shadow-[0_0_10px_rgba(217,4,41,0.4)]" />
            ))}
          </div>
          <span className="text-white/80 font-mono font-bold ml-1 text-sm tracking-widest bg-white/10 px-2 py-0.5 rounded-md">
            5.0
          </span>
        </div>
        <div className="overflow-hidden">
          <p className="text-white/90 font-medium text-lg leading-relaxed">
            &quot;{t(`reviews.texts.${review.textKey}`)}&quot;
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 relative z-10 mt-6 pt-6 border-t border-white/5" >
        <div className="w-12 h-12 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-inner group-hover:border-primary/30 transition-colors">
          {review.name[0]}
        </div>
        <div className="overflow-hidden">
          <div>
            <p className="font-bold text-white tracking-wide flex items-center gap-2">
              {review.name}
              <svg className="w-4 h-4 text-blue-500 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
              </svg>
            </p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-primary/80 text-[10px] font-bold uppercase tracking-wider">{t('reviews.verified')}</p>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">{t(`reviews.months.${review.dateKey}`)}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function GoogleReviews() {
  const { t } = useTranslation();
  return (
    <section className="py-32 bg-dark-bg relative overflow-hidden border-y border-white/5">
      
      <div className="relative z-10 max-w-[1500px] mx-auto mb-20 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] mb-6">
            {t('reviews.title')}
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="inline-flex items-center gap-3 bg-[#0a0a0a] border border-white/10 rounded-full px-6 py-2 shadow-lg"
          >
            <div className="flex items-baseline leading-none">
              <span className="text-2xl md:text-3xl font-black text-white">4.9</span>
              <span className="text-lg md:text-xl text-neutral-400 font-bold">/5</span>
            </div>
            <div className="flex gap-1 ml-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.6 + (i * 0.1), 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15 
                  }}
                >
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-primary text-primary drop-shadow-[0_2px_8px_rgba(217,4,41,0.4)]" />
                </motion.div>
              ))}
            </div>
            <div className="w-[1px] h-6 bg-white/10 mx-2" />
            <span className="text-neutral-400 font-bold uppercase tracking-widest text-xs">
              {t('reviews.onGoogle')}
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 perspective-[1000px]">
        {reviews.slice(0, 3).map((review, i) => (
          <ReviewCard key={review.id} review={review} index={i} />
        ))}
      </div>
    </section>
  );
}
