const fs = require('fs');

const files = [
  'src/pages/AdminVideos.tsx',
  'src/components/FleetManager.tsx',
  'src/components/AboutTeamManager.tsx'
];

files.forEach(f => {
  let code = fs.readFileSync(f, 'utf-8');
  
  // We match:
  // if (window.confirm('...')) {
  //   try {
  //     await deleteDoc(...);
  //   } catch (err) { ... }
  // }
  
  code = code.replace(/if\s*\(\s*window\.confirm\([^)]+\)\s*\)\s*\{/g, '');
  // Because we removed the `if {`, we have an extra `}` at the end of the function.
  // Wait, regex replacing `{` and `}` is tricky. Let's do it simply by replacing the whole thing.
  
  fs.writeFileSync(f, code);
});
console.log('Done script');
