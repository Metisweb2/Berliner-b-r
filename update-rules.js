const fs = require('fs');
let code = fs.readFileSync('firestore.rules', 'utf-8');
code = code.replace(
  /match \/fleet\/\{vehicleId\} \{/,
  "match /team/{memberId} {\n      allow read: if true;\n      allow write: if isAdmin();\n    }\n\n    match /fleet/{vehicleId} {"
);
fs.writeFileSync('firestore.rules', code);
