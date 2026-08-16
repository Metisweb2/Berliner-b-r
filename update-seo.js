const fs = require('fs');

// 1. Update useSEO.ts
let useSeoCode = fs.readFileSync('src/hooks/useSEO.ts', 'utf-8');
useSeoCode = useSeoCode.replace(
  /export function useSEO\(title: string, description: string\) \{/,
  "export function useSEO(title: string, description: string, overrideTitle: boolean = false) {"
);
useSeoCode = useSeoCode.replace(
  /document\.title = \`\$\{title\} \| Fahrschule Bär\`;/,
  "const fullTitle = overrideTitle ? title : `${title} | Fahrschule Bär`;\n    document.title = fullTitle;"
);
useSeoCode = useSeoCode.replace(
  /setMeta\('og:title', \`\$\{title\} \| Fahrschule Bär\`, true\);/,
  "setMeta('og:title', fullTitle, true);"
);
fs.writeFileSync('src/hooks/useSEO.ts', useSeoCode);

// 2. Update Home.tsx
let homeCode = fs.readFileSync('src/pages/Home.tsx', 'utf-8');
homeCode = homeCode.replace(
  /useSEO\('Startseite', 'Die moderne und transparente Fahrschule Bär in Berlin.'\);/,
  "useSEO('Fahrschule Berlin | Deine Premium Fahrschule Bär', 'Mache deinen Führerschein (Klasse B, B197, Automatik) sicher & schnell bei der Premium Fahrschule Bär in Berlin. Modernste Autos & geduldige Fahrlehrer.', true);"
);
fs.writeFileSync('src/pages/Home.tsx', homeCode);

// 3. Update index.html
let indexCode = fs.readFileSync('index.html', 'utf-8');
indexCode = indexCode.replace(
  /<title>Fahrschule Bär \| Deine Premium Fahrschule in Berlin<\/title>/g,
  "<title>Fahrschule Berlin | Deine Premium Fahrschule Bär</title>"
);
indexCode = indexCode.replace(
  /<meta name="title" content="Fahrschule Bär \| Deine Premium Fahrschule in Berlin" \/>/g,
  '<meta name="title" content="Fahrschule Berlin | Deine Premium Fahrschule Bär" />'
);
indexCode = indexCode.replace(
  /<meta name="description" content="Mache deinen Führerschein bei der Fahrschule Bär. Wir bieten professionelle Ausbildungen für PKW und Anhänger \(Klasse B, B78, B197, BE, B96\) mit Geduld und modernen Fahrzeugen." \/>/,
  '<meta name="description" content="Top Fahrschule in Berlin! Mache deinen Führerschein (Klasse B, B197, Automatik, Schalter) sicher & schnell bei der Premium Fahrschule Bär. Jetzt online anmelden!" />'
);
indexCode = indexCode.replace(
  /<meta name="keywords" content="Fahrschule, Führerschein, Berlin, Fahrschule Berlin, Klasse B, B197, Automatikführerschein, Fahrschule Bär, Theorieunterricht, Fahrstunden, Autofahren lernen" \/>/,
  '<meta name="keywords" content="Fahrschule Berlin, Führerschein Berlin, Fahrschule, Autofahren lernen Berlin, Fahrschule Bär, Klasse B, B197, Automatikführerschein Berlin, Premium Fahrschule, Fahrschule in der Nähe" />'
);
indexCode = indexCode.replace(
  /<meta property="og:title" content="Fahrschule Bär \| Deine Premium Fahrschule" \/>/g,
  '<meta property="og:title" content="Fahrschule Berlin | Deine Premium Fahrschule Bär" />'
);
indexCode = indexCode.replace(
  /<meta property="og:description" content="Mache deinen Führerschein entspannt und sicher. Modernste Fahrzeuge, geduldige Fahrlehrer und transparente Preise." \/>/g,
  '<meta property="og:description" content="Mache deinen Führerschein in Berlin entspannt und sicher. Modernste Fahrzeuge, geduldige Fahrlehrer und transparente Preise bei der Fahrschule Bär." />'
);
indexCode = indexCode.replace(
  /<meta property="twitter:title" content="Fahrschule Bär \| Deine Premium Fahrschule" \/>/g,
  '<meta property="twitter:title" content="Fahrschule Berlin | Deine Premium Fahrschule Bär" />'
);
indexCode = indexCode.replace(
  /<meta property="twitter:description" content="Mache deinen Führerschein entspannt und sicher. Modernste Fahrzeuge, geduldige Fahrlehrer und transparente Preise." \/>/g,
  '<meta property="twitter:description" content="Mache deinen Führerschein in Berlin entspannt und sicher. Modernste Fahrzeuge, geduldige Fahrlehrer und transparente Preise bei der Fahrschule Bär." />'
);

fs.writeFileSync('index.html', indexCode);
