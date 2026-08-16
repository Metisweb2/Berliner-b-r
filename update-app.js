const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Add imports
code = code.replace(
  /import \{ BearLogo \} from '\.\/components\/BearLogo';/,
  "import { BearLogo } from './components/BearLogo';\nimport { doc, onSnapshot } from 'firebase/firestore';\nimport { db } from './firebase';\nimport { AlertTriangle, SunMedium } from 'lucide-react';"
);

// We need a maintenance screen component
const maintenanceComponent = `
function MaintenanceScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-bg p-6 text-center">
      <AlertTriangle className="w-20 h-20 text-red-500 mb-6" />
      <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Wartungsarbeiten</h1>
      <p className="text-xl text-neutral-400 max-w-lg">
        Unsere Website wird aktuell aktualisiert und ist in Kürze wieder für dich erreichbar.
      </p>
    </div>
  );
}

`;

code = code.replace(/function Layout\(\) \{/, maintenanceComponent + 'function Layout() {');

// Add states in Layout
const stateCode = `
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [vacationMode, setVacationMode] = useState(false);
  const [vacationText, setVacationText] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'system'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setMaintenanceMode(!!data.maintenanceMode);
        setVacationMode(!!data.vacationMode);
        setVacationText(data.vacationText || 'Wir machen Urlaub!');
      }
    });
    return () => unsubscribe();
  }, []);
`;

code = code.replace(/const location = useLocation\(\);/, 'const location = useLocation();\n' + stateCode);

// Add the vacation banner and maintenance block
const newReturn = `
  if (maintenanceMode && !isAdmin) {
    return <MaintenanceScreen />;
  }

  return (
    <div className="bg-dark-bg min-h-screen text-neutral-200 font-sans selection:bg-primary selection:text-white">
      {vacationMode && !isAdmin && (
        <div className="bg-yellow-500 text-black px-4 py-2 flex items-center justify-center gap-3 font-bold text-sm z-50 relative">
          <SunMedium className="w-5 h-5" />
          {vacationText}
        </div>
      )}
      {showIntro && !isAdmin ? (
`;

code = code.replace(
  /return \(\s*<div className="bg-dark-bg min-h-screen text-neutral-200 font-sans selection:bg-primary selection:text-white">\s*\{showIntro && !isAdmin \? \(/,
  newReturn
);

fs.writeFileSync('src/App.tsx', code);
