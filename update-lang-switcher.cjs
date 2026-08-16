const fs = require('fs');

let langCode = fs.readFileSync('src/components/LanguageSwitcher.tsx', 'utf8');

// Replace the SVGs with imgs
// Replace DE flag
langCode = langCode.replace(/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*>[\s\S]*?<\/svg>/, 
  `<img src="/de.png" alt="Deutsch" className="relative z-10 w-6 h-4 rounded-sm object-cover shadow-sm" onError={(e) => { e.currentTarget.src = "https://flagcdn.com/w40/de.png" }} />`);

// Replace RU flag
langCode = langCode.replace(/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*>[\s\S]*?<\/svg>/, 
  `<img src="/ru.png" alt="Русский" className="relative z-10 w-6 h-4 rounded-sm object-cover shadow-sm" onError={(e) => { e.currentTarget.src = "https://flagcdn.com/w40/ru.png" }} />`);

fs.writeFileSync('src/components/LanguageSwitcher.tsx', langCode);
