const fs = require('fs');

const files = [
  { path: 'src/pages/AdminVideos.tsx', collections: ['messages', 'videos'] },
  { path: 'src/components/FleetManager.tsx', collections: ['fleet'] },
  { path: 'src/components/AboutTeamManager.tsx', collections: ['team'] }
];

files.forEach(f => {
  let code = fs.readFileSync(f.path, 'utf-8');
  
  // Let's replace the mangled `handleDelete` functions based on their respective collections.
  
  if (f.collections.includes('messages')) {
    code = code.replace(/const handleDelete = async \(id: string\) => \{\s*try \{\s*await deleteDoc\(doc\(db, 'messages', id\)\);\s*\} catch \(err\) \{\s*console\.error\('Delete error:', err\);\s*alert\('Fehler beim Löschen\. Eventuell fehlende Berechtigungen\?'\);\s*\}\s*\}\s*;/g, 
    `const handleDelete = async (id: string) => {
      try {
        await deleteDoc(doc(db, 'messages', id));
      } catch (err) {
        console.error('Delete error:', err);
        alert('Fehler beim Löschen.');
      }
    };`);
  }
  
  if (f.collections.includes('videos')) {
    code = code.replace(/const handleDelete = async \(id: string\) => \{\s*try \{\s*await deleteDoc\(doc\(db, 'videos', id\)\);\s*\} catch \(err\) \{\s*console\.error\('Delete error:', err\);\s*alert\('Fehler beim Löschen\. Eventuell fehlende Berechtigungen\?'\);\s*\}\s*\}\s*;/g, 
    `const handleDelete = async (id: string) => {
      try {
        await deleteDoc(doc(db, 'videos', id));
      } catch (err) {
        console.error('Delete error:', err);
        alert('Fehler beim Löschen.');
      }
    };`);
  }
  
  if (f.collections.includes('fleet')) {
    code = code.replace(/const handleDelete = async \(id: string\) => \{\s*try \{\s*await deleteDoc\(doc\(db, 'fleet', id\)\);\s*\} catch \(err\) \{\s*console\.error\('Delete error:', err\);\s*alert\('Fehler beim Löschen\. Eventuell fehlende Berechtigungen\?'\);\s*\}\s*\}\s*;/g, 
    `const handleDelete = async (id: string) => {
      try {
        await deleteDoc(doc(db, 'fleet', id));
      } catch (err) {
        console.error('Delete error:', err);
        alert('Fehler beim Löschen.');
      }
    };`);
  }

  if (f.collections.includes('team')) {
    code = code.replace(/const handleDelete = async \(id: string\) => \{\s*try \{\s*await deleteDoc\(doc\(db, 'team', id\)\);\s*\} catch \(err\) \{\s*console\.error\('Delete error:', err\);\s*alert\('Fehler beim Löschen\. Eventuell fehlende Berechtigungen\?'\);\s*\}\s*\}\s*;/g, 
    `const handleDelete = async (id: string) => {
      try {
        await deleteDoc(doc(db, 'team', id));
      } catch (err) {
        console.error('Delete error:', err);
        alert('Fehler beim Löschen.');
      }
    };`);
  }

  fs.writeFileSync(f.path, code);
});
console.log('Done script');
