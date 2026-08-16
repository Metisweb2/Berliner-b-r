const fs = require('fs');
let code = fs.readFileSync('src/components/Location.tsx', 'utf-8');

// Add imports
code = code.replace(
  "import { useTranslation } from 'react-i18next';",
  "import { useTranslation } from 'react-i18next';\nimport { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';"
);

const API_KEY_BLOCK = `
const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export function Location() {
`;
code = code.replace("export function Location() {", API_KEY_BLOCK);

const oldIframe = `<iframe 
            src="https://maps.google.com/maps?q=Marzahner%20Promenade%2025,%2012679%20Berlin&t=&z=16&ie=UTF8&iwloc=&output=embed" 
            className="w-full h-full relative z-10" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />`;

const newMap = `{hasValidKey ? (
            <APIProvider apiKey={API_KEY} version="weekly">
              <Map
                defaultCenter={{ lat: 52.544415, lng: 13.543206 }}
                defaultZoom={16}
                mapId="DEMO_MAP_ID"
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                style={{ width: '100%', height: '100%' }}
                disableDefaultUI={false}
              >
                <AdvancedMarker position={{ lat: 52.544415, lng: 13.543206 }}>
                  <div className="relative group cursor-pointer flex flex-col items-center drop-shadow-2xl" style={{ width: '80px', height: '94px' }}>
                    <div className="w-20 h-20 bg-white rounded-full p-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-4 border-primary flex items-center justify-center transform transition-transform group-hover:scale-110 z-10">
                      <img src="/logo.png" alt="Fahrschule Bär" className="w-full h-full object-contain rounded-full" />
                    </div>
                    {/* Pointer triangle */}
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[14px] border-l-transparent border-r-transparent border-t-primary -mt-1 transform transition-transform group-hover:translate-y-1"></div>
                  </div>
                </AdvancedMarker>
              </Map>
            </APIProvider>
          ) : (
            <div className="w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center p-8 text-center relative z-10 border border-white/5">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-white mb-4">Google Maps API Key Required</h2>
              <p className="text-neutral-400 text-sm mb-4"><strong>Step 1:</strong> <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" rel="noopener" className="text-primary hover:underline">Get an API Key</a></p>
              <p className="text-neutral-400 text-sm mb-2"><strong>Step 2:</strong> Add your key as a secret in AI Studio:</p>
              <ul className="text-neutral-500 text-xs text-left list-disc pl-4 space-y-2 mb-4 max-w-xs mx-auto">
                <li>Open <strong>Settings</strong> (⚙️ gear icon, <strong>top-right corner</strong>)</li>
                <li>Select <strong>Secrets</strong></li>
                <li>Type <code>GOOGLE_MAPS_PLATFORM_KEY</code> as the secret name, press <strong>Enter</strong></li>
                <li>Paste your API key as the value, press <strong>Enter</strong></li>
              </ul>
              <p className="text-neutral-500 text-xs font-mono bg-white/5 py-1 px-3 rounded text-center">The app will rebuild automatically.</p>
            </div>
          )}`;

code = code.replace(oldIframe, newMap);
fs.writeFileSync('src/components/Location.tsx', code);
console.log('Location.tsx updated.');
