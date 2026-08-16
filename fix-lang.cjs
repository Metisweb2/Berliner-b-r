const fs = require('fs');

let langCode = fs.readFileSync('src/components/LanguageSwitcher.tsx', 'utf8');

const deFlag = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="w-5 h-5 rounded-sm object-cover shadow-sm">
          <rect id="black_stripe" width="5" height="3" y="0" x="0" fill="#000"/>
          <rect id="red_stripe" width="5" height="2" y="1" x="0" fill="#D00"/>
          <rect id="gold_stripe" width="5" height="1" y="2" x="0" fill="#FFCE00"/>
        </svg>`;

const ruFlag = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" className="w-5 h-5 rounded-sm object-cover shadow-sm">
          <rect fill="#fff" width="9" height="3"/>
          <rect fill="#d52b1e" y="3" width="9" height="3"/>
          <rect fill="#0039a6" y="2" width="9" height="2"/>
        </svg>`;

langCode = langCode.replace(/<span className="text-lg relative z-10 leading-none">🇩🇪<\/span>/g, deFlag);
langCode = langCode.replace(/<span className="text-lg relative z-10 leading-none">🇷🇺<\/span>/g, ruFlag);

fs.writeFileSync('src/components/LanguageSwitcher.tsx', langCode);
