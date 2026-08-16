const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminVideos.tsx', 'utf-8');
code = code.replace(/    \);\s*  \}\s*\}/, '    );\n  }');
fs.writeFileSync('src/pages/AdminVideos.tsx', code);
