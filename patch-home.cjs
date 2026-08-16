const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = "import { CreatorFeed } from '../components/CreatorFeed';\n" + code;
code = code.replace('<USPs />', '<USPs />\n      <CreatorFeed />');

fs.writeFileSync('src/pages/Home.tsx', code);
