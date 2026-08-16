const fs = require('fs');
const files = [
  'src/pages/AdminVideos.tsx', 
  'src/components/FleetManager.tsx', 
  'src/components/AboutTeamManager.tsx'
];

files.forEach(f => {
  let code = fs.readFileSync(f, 'utf-8');
  
  // Replace all basic confirm + deleteDoc with try/catch + alert
  code = code.replace(
    /if\s*\(window\.confirm\([^)]+\)\)\s*\{\s*await deleteDoc\(doc\([^)]+\)\);\s*\}/g,
    (match) => {
      const confirmStr = match.match(/window\.confirm\(([^)]+)\)/)[1];
      const deleteStr = match.match(/await deleteDoc\(doc\([^)]+\)\);/)[0];
      return `if (window.confirm(${confirmStr})) {
      try {
        ${deleteStr}
      } catch (err) {
        console.error('Delete error:', err);
        alert('Fehler beim Löschen. Eventuell fehlende Berechtigungen?');
      }
    }`;
    }
  );
  
  fs.writeFileSync(f, code);
});
console.log('Fixed deletes');
