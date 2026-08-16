const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf-8');
// Remove the banner from App.tsx
appCode = appCode.replace(
  /\{vacationMode && !isAdmin && \([\s\S]*?<\/div>\s*\)\}/,
  ''
);
fs.writeFileSync('src/App.tsx', appCode);

let navCode = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');

if (!navCode.includes('firebase/firestore')) {
  navCode = navCode.replace(
    /import \{ LanguageSwitcher \} from '\.\/LanguageSwitcher';/,
    "import { LanguageSwitcher } from './LanguageSwitcher';\nimport { doc, onSnapshot } from 'firebase/firestore';\nimport { db } from '../firebase';\nimport { SunMedium } from 'lucide-react';"
  );
}

const stateCode = `
  const [vacationMode, setVacationMode] = useState(false);
  const [vacationText, setVacationText] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'system'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setVacationMode(!!data.vacationMode);
        setVacationText(data.vacationText || 'Wir machen Urlaub!');
      }
    });
    return () => unsubscribe();
  }, []);
`;

if (!navCode.includes('setVacationMode')) {
  navCode = navCode.replace(/const \{ t \} = useTranslation\(\);/, 'const { t } = useTranslation();\n' + stateCode);
}

const bannerCode = `
      {vacationMode && (
        <div className="bg-yellow-500 text-black px-4 py-2 flex items-center justify-center gap-3 font-bold text-sm w-full">
          <SunMedium className="w-5 h-5 flex-shrink-0" />
          <span>{vacationText}</span>
        </div>
      )}`;

// We want to put the banner inside motion.nav before the main content div
navCode = navCode.replace(
  /(<motion\.nav[\s\S]*?className=\{`fixed top-0 left-0 right-0 z-40[\s\S]*?`\}\s*>)/,
  "$1\n" + bannerCode
);

// We should also reduce py-5 to py-3 if vacationMode is on to save space? Or just let the layout handle it.
fs.writeFileSync('src/components/Navbar.tsx', navCode);
