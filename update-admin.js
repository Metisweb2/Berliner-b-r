const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminVideos.tsx', 'utf-8');

const fleetButton = `          <button 
            onClick={() => setActiveTab('fleet')}
            className={\`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all \${activeTab === 'fleet' ? 'bg-primary text-black' : 'text-neutral-400 hover:text-white hover:bg-white/5'}\`}
          >
            <Car className="w-5 h-5" /> Fuhrpark
          </button>`;

code = code.replace(
  /<button[\s\n]*onClick=\{\(\) => setActiveTab\('pricing'\)\}[\s\S]*?<\/button>/,
  "$&" + "\n" + fleetButton
);

code = code.replace(
  /\{activeTab === 'pricing' && <PricingManager \/>\}/,
  "$&" + "\n          {activeTab === 'fleet' && <FleetManager />}"
);

// We need to import Car from lucide-react if not already imported
if (!code.includes('Car,') && !code.includes(' Car ')) {
  code = code.replace(/import {([^}]+)} from 'lucide-react';/, "import { $1, Car } from 'lucide-react';");
}

fs.writeFileSync('src/pages/AdminVideos.tsx', code);
