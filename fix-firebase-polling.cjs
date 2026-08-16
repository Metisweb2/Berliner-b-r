const fs = require('fs');
let code = fs.readFileSync('src/firebase.ts', 'utf-8');

code = code.replace(
  "import { getFirestore } from 'firebase/firestore';",
  "import { initializeFirestore } from 'firebase/firestore';"
);

code = code.replace(
  "export const db = getFirestore(app, ['a' + 'i', 'studio', '0a7f86b8-2fe5-4682-bcc8-8a467df76a70'].join('-'));",
  "export const db = initializeFirestore(app, { experimentalForceLongPolling: true }, ['a' + 'i', 'studio', '0a7f86b8-2fe5-4682-bcc8-8a467df76a70'].join('-'));"
);

fs.writeFileSync('src/firebase.ts', code);
console.log('Successfully updated firebase.ts with long polling');
