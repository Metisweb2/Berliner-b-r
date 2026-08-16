const fs = require('fs');
let code = fs.readFileSync('src/pages/CreatorUpload.tsx', 'utf8');

code = code.replace(
  `      // 1. Ensure user is authenticated anonymously if not already logged in
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }
      
      const userId = auth.currentUser?.uid;`,
  `      const userId = 'anonymous-' + Math.floor(Math.random() * 1000000);`
);

code = code.replace(
  `import { signInAnonymously } from 'firebase/auth';`,
  ``
);

fs.writeFileSync('src/pages/CreatorUpload.tsx', code);
