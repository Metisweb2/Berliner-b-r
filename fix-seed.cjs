const fs = require('fs');

['src/components/FleetManager.tsx', 'src/components/AboutTeamManager.tsx'].forEach(f => {
  let code = fs.readFileSync(f, 'utf-8');
  
  if (f.includes('FleetManager')) {
    code = code.replace(
      /const seedDefaults = async \(\) => \{\s*for \(const car of defaultFleet\) \{\s*await setDoc\(doc\(db, 'fleet', car\.id\), car\);\s*\}\s*\}\s*\};/g,
      `const seedDefaults = async () => {
    if (window.confirm('Möchtest du die Standard-Fahrzeuge laden?')) {
      for (const car of defaultFleet) {
        await setDoc(doc(db, 'fleet', car.id), car);
      }
    }
  };`
    );
  }
  
  if (f.includes('AboutTeamManager')) {
    code = code.replace(
      /const seedDefaults = async \(\) => \{\s*for \(const member of defaultTeam\) \{\s*await setDoc\(doc\(db, 'team', member\.id\), member\);\s*\}\s*\}\s*\};/g,
      `const seedDefaults = async () => {
    if (window.confirm('Möchtest du die Standard-Teammitglieder laden?')) {
      for (const member of defaultTeam) {
        await setDoc(doc(db, 'team', member.id), member);
      }
    }
  };`
    );
  }

  fs.writeFileSync(f, code);
});
console.log('Fixed seedDefaults');
