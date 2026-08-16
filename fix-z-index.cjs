const fs = require('fs');

let langCode = fs.readFileSync('src/components/LanguageSwitcher.tsx', 'utf8');
// The language switcher has dropdown absolute bg-white/10 etc. Let's make sure it doesn't break.
