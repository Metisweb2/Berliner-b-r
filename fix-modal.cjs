const fs = require('fs');

const file = 'src/pages/AdminVideos.tsx';
let code = fs.readFileSync(file, 'utf-8');

code = code.replace(
  'className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative z-10"',
  'className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh]"'
);

code = code.replace(
  '<div className="p-8 space-y-5">',
  '<div className="p-8 space-y-5 overflow-y-auto flex-1 custom-scrollbar">'
);

fs.writeFileSync(file, code);
console.log('Fixed modal');
