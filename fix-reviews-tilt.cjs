const fs = require('fs');
let code = fs.readFileSync('src/components/GoogleReviews.tsx', 'utf-8');

// Ensure motion is imported with hooks
if (!code.includes('useMotionValue')) {
  code = code.replace(
    /import \{ motion,? \} from 'motion\/react';/,
    "import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';"
  );
}

const newCard = `const ReviewCard: React.FC<{ review: typeof reviews[0], index: number }> = ({ review, index }) => {
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
        transformStyle: "preserve-3d"
      }}
      className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col justify-between group overflow-hidden transition-colors hover:bg-white/[0.05]"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-10">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.694 20 9.289L20 10.609L24 10.609L24 18L14.017 18ZM0 18L0 10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.694 6 9.289L6 10.609L10 10.609L10 18L0 18Z" />
        </svg>
      </div>
      <div className="mb-8 relative z-10" style={{ transform: "translateZ(30px)" }}>
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
            &quot;{t(\`reviews.texts.\${review.textKey}\`)}&quot;
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 relative z-10 mt-6 pt-6 border-t border-white/5" style={{ transform: "translateZ(20px)" }}>
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
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">{t(\`reviews.months.\${review.dateKey}\`)}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};`;

const startIdx = code.indexOf('const ReviewCard:');
const exportIdx = code.indexOf('export function GoogleReviews');

if (startIdx !== -1 && exportIdx !== -1) {
  code = code.substring(0, startIdx) + newCard + '\n\n' + code.substring(exportIdx);
  fs.writeFileSync('src/components/GoogleReviews.tsx', code);
  console.log('Successfully updated GoogleReviews.tsx');
} else {
  console.log('Could not find markers');
}
