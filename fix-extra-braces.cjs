const fs = require('fs');
const files = [
  { path: 'src/pages/AdminVideos.tsx', cols: ['messages', 'videos'] },
  { path: 'src/components/FleetManager.tsx', cols: ['fleet'] },
  { path: 'src/components/AboutTeamManager.tsx', cols: ['team'] }
];

files.forEach(f => {
  let code = fs.readFileSync(f.path, 'utf-8');
  
  f.cols.forEach(col => {
    // Regex matching the exact lines with the extra brace
    const regex = new RegExp(
      `const handleDelete = async \\(id: string\\) => \\{\\s*try \\{\\s*await deleteDoc\\(doc\\(db, '${col}', id\\)\\);\\s*\\} catch \\(err\\) \\{\\s*console\\.error\\('Delete error:', err\\);\\s*alert\\('Fehler beim Löschen\\. Eventuell fehlende Berechtigungen\\?'\\);\\s*\\}\\s*\\}\\s*\\};`, 'g'
    );
    
    code = code.replace(regex, 
    `const handleDelete = async (id: string) => {
      try {
        await deleteDoc(doc(db, '${col}', id));
      } catch (err) {
        console.error('Delete error:', err);
        alert('Fehler beim Löschen.');
      }
    };`);
  });
  
  fs.writeFileSync(f.path, code);
});
console.log('Fixed extra braces');
