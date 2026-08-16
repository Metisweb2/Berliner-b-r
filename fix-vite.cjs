const fs = require('fs');
let code = fs.readFileSync('vite.config.ts', 'utf-8');

const defineBlock = `    define: {
      'process.env.GOOGLE_MAPS_PLATFORM_KEY': JSON.stringify(process.env.GOOGLE_MAPS_PLATFORM_KEY || '')
    },
    build: {`;

code = code.replace(/    build: \{/, defineBlock);
fs.writeFileSync('vite.config.ts', code);
