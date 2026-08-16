const fs = require('fs');
let code = fs.readFileSync('src/pages/UeberUns.tsx', 'utf8');

code = code.replace(
  "import { Team } from '../components/Team';",
  "import { Team } from '../components/Team';\nimport { Fleet } from '../components/Fleet';"
);

code = code.replace(
  "<Team />",
  "<Fleet />\n      <Team />"
);

fs.writeFileSync('src/pages/UeberUns.tsx', code);
