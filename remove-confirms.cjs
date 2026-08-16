const fs = require('fs');
['src/components/FleetManager.tsx', 'src/components/AboutTeamManager.tsx'].forEach(f => {
  let code = fs.readFileSync(f, 'utf-8');
  
  if (f.includes('FleetManager')) {
    code = code.replace(
      `const seedDefaults = async () => {
    if (window.confirm('Möchtest du die Standard-Fahrzeuge laden?')) {
      for (const car of defaultFleet) {
        await setDoc(doc(db, 'fleet', car.id), car);
      }
    }
  };`,
      `const seedDefaults = async () => {
      for (const car of defaultFleet) {
        await setDoc(doc(db, 'fleet', car.id), car);
      }
  };`
    );
  }
  
  if (f.includes('AboutTeamManager')) {
    code = code.replace(
      `const seedDefaults = async () => {
    if (window.confirm('Möchtest du die Standard-Teammitglieder laden?')) {
      for (const member of defaultTeam) {
        await setDoc(doc(db, 'team', member.id), member);
      }
    }
  };`,
      `const seedDefaults = async () => {
      for (const member of defaultTeam) {
        await setDoc(doc(db, 'team', member.id), member);
      }
  };`
    );
  }

  fs.writeFileSync(f, code);
});
console.log('Removed window.confirm from seedDefaults');
