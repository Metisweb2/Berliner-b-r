const fs = require('fs');

let fleetCode = fs.readFileSync('src/components/Fleet.tsx', 'utf-8');
// remove the default motorrad
fleetCode = fleetCode.replace(
  /,\s*{\s*id:\s*'default-3',\s*name:\s*'Kawasaki Z650',\s*type:\s*'Motorrad',[^}]*}\s*/g,
  ''
);
// replace the text in fleet
fleetCode = fleetCode.replace(
  'Ob Automatik, Schalter oder Motorrad',
  'Ob Automatik oder Schalter'
);
fs.writeFileSync('src/components/Fleet.tsx', fleetCode);

let fleetManagerCode = fs.readFileSync('src/components/FleetManager.tsx', 'utf-8');
fleetManagerCode = fleetManagerCode.replace(
  /,\s*{\s*id:\s*'default-3',\s*name:\s*'Kawasaki Z650',\s*type:\s*'Motorrad',[^}]*}\s*/g,
  ''
);
fs.writeFileSync('src/components/FleetManager.tsx', fleetManagerCode);

// update translations just in case
let deJson = fs.readFileSync('src/locales/de.json', 'utf-8');
deJson = deJson.replace(
  '"desc": "Die Königsklasse. Schwere Motorräder ohne Leistungsbeschränkung."',
  '"desc": "Schwere Motorräder (falls angeboten)."'
);
fs.writeFileSync('src/locales/de.json', deJson);

console.log('Fixed fleet');
