const fs = require('fs');

let code = fs.readFileSync('src/pages/AdminVideos.tsx', 'utf-8');

// Ensure BearLogo is imported
if (!code.includes('BearLogo')) {
  code = code.replace(
    /import \{ Link, useNavigate \} from 'react-router-dom';/,
    "import { Link, useNavigate } from 'react-router-dom';\nimport { BearLogo } from '../components/BearLogo';"
  );
}

const newLoginBlock = `  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="bg-[#121216]/90 backdrop-blur-2xl border border-white/10 p-10 sm:p-12 rounded-[2.5rem] max-w-md w-full text-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden z-10">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

          {/* Logo & Badge */}
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner group">
            <BearLogo className="w-12 h-12 object-contain transition-transform duration-500 group-hover:scale-110" />
          </div>

          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Admin Portal
          </div>

          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Fahrschule Bär</h1>
          <p className="text-neutral-400 text-sm mb-10 font-light leading-relaxed">
            Bitte logge dich mit deinem autorisierten Google-Konto ein, um das Dashboard zu verwalten.
          </p>

          <button 
            onClick={handleLogin} 
            className="w-full bg-white text-neutral-900 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-neutral-100 transition-all duration-300 shadow-[0_10px_25px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_35px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
            <span className="text-[15px]">Mit Google anmelden</span>
          </button>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-neutral-500">
            <span>Sicherer OAuth Login</span>
            <Link to="/" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Globe className="w-3.5 h-3.5" /> Zur Website
            </Link>
          </div>
        </div>
      </div>
    );
  }`;

// Replace the old login return block
const regex = /\/\*\s*Login\s*\*\/[\s\S]*?if \(!user \|\| !isAdmin\) \{[\s\S]*?<\/div>\s*\);\s*\}/;
// If exact regex doesn't match, let's find `if (!user || !isAdmin) {` and replace up to `}`
const startIndex = code.indexOf('if (!user || !isAdmin) {');
if (startIndex !== -1) {
  // Find matching closing brace or end of block
  // Let's find where return ( <div class="min-h-screen bg-dark-bg flex items-center justify-center p-4"> ends
  const endMarker = 'link to="/\" class="mt-8 flex items-center justify-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors">';
  // Let's replace from `if (!user || !isAdmin) {` to the end of that return statement.
  // Actually, let's do a more precise replacement or find the exact block.
  console.log('Found startIndex:', startIndex);
}

// Let's inspect the exact lines of `if (!user || !isAdmin) {`
const lines = code.split('\n');
let loginStart = -1;
let loginEnd = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('if (!user || !isAdmin) {')) {
    loginStart = i;
  }
  if (loginStart !== -1 && lines[i].includes('return (') && lines[i].includes('Link to="/"') && loginEnd === -1) {
    // Find the closing of this return
  }
}

// Let's write a robust replacement using string indexOf and matching
const targetStart = '  if (!user || !isAdmin) {';
const targetEnd = '    );';
const sIdx = code.indexOf(targetStart);
// Let's find the closing parenthesis and semicolon of the return statement after targetStart
let braceCount = 0;
let eIdx = sIdx;
let foundReturn = false;
for (let i = sIdx; i < code.length; i++) {
  if (code.substring(i, i + 6) === 'return') {
    foundReturn = true;
  }
  if (foundReturn) {
    if (code[i] === '(') braceCount++;
    if (code[i] === ')') {
      braceCount--;
      if (braceCount === 0) {
        // find semicolon
        while (i < code.length && code[i] !== ';') i++;
        eIdx = i + 1;
        break;
      }
    }
  }
}

if (sIdx !== -1 && eIdx > sIdx) {
  code = code.substring(0, sIdx) + newLoginBlock + code.substring(eIdx);
  fs.writeFileSync('src/pages/AdminVideos.tsx', code);
  console.log('Successfully updated AdminVideos login UI!');
} else {
  console.log('Failed to locate exact login block boundaries');
}
