const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminVideos.tsx', 'utf8');

code = code.replace(
  `    // Authenticate anonymously just so we have a token, though rules allow reading all for testing
    signInAnonymously(auth).catch(console.error);`,
  ``
);

code = code.replace(
  `import { signInAnonymously } from 'firebase/auth';`,
  ``
);

fs.writeFileSync('src/pages/AdminVideos.tsx', code);
