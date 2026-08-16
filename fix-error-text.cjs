const fs = require('fs');
let code = fs.readFileSync('src/components/Location.tsx', 'utf-8');

code = code.replace(
  "Google Maps API Key Required",
  "Google Maps API Key Required (Or Key is Invalid)"
);

fs.writeFileSync('src/components/Location.tsx', code);
