const fs = require('fs');

let langCode = fs.readFileSync('src/components/LanguageSwitcher.tsx', 'utf8');

langCode = langCode.replace(/className="w-5 h-5 rounded-sm/g, 'className="relative z-10 w-5 h-4 rounded-sm');

fs.writeFileSync('src/components/LanguageSwitcher.tsx', langCode);
