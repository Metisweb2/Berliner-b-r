const fs = require('fs');
const { execSync } = require('child_process');

const files = execSync('grep -rl "\\(<img\\|<motion.img\\)" src/').toString().split('\n').filter(Boolean);

files.forEach(f => {
  let code = fs.readFileSync(f, 'utf-8');
  
  // First, completely strip all referrerPolicy attributes to get back to a clean state.
  code = code.replace(/\s+referrerPolicy=(?:'no-referrer'|"no-referrer")/g, '');
  code = code.replace(/\s*\/ referrerPolicy="no-referrer">/g, ' />');
  
  // Then, add referrerPolicy="no-referrer" right after <img or <motion.img
  code = code.replace(/<img\s/g, '<img referrerPolicy="no-referrer" ');
  code = code.replace(/<motion\.img\s/g, '<motion.img referrerPolicy="no-referrer" ');

  fs.writeFileSync(f, code);
});
console.log('Fixed all images');
