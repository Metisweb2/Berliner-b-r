const fs = require('fs');
let code = fs.readFileSync('src/components/GoogleReviews.tsx', 'utf-8');

code = code.replace(
  'className="relative bg-white/[0.03] bg-white/[0.04] border border-white/10 p-10 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col justify-between group overflow-hidden transition-colors hover:bg-white/[0.05]"',
  'className="relative bg-[#111111] border border-white/10 p-10 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col justify-between group overflow-hidden transition-colors hover:bg-[#1a1a1a]"'
);

code = code.replace(
  'className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col justify-between group overflow-hidden transition-colors hover:bg-white/[0.05]"',
  'className="relative bg-[#111111] border border-white/10 p-10 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col justify-between group overflow-hidden transition-colors hover:bg-[#1a1a1a]"'
);

fs.writeFileSync('src/components/GoogleReviews.tsx', code);
