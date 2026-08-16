const fs = require('fs');
let code = fs.readFileSync('src/components/Team.tsx', 'utf-8');

code = code.replace('Inhaber & Fahrlehrer (Auto/Motorrad)', 'Inhaber & Fahrlehrer (Auto)');
code = code.replace('Fahrlehrer (Motorrad Spezialist)', 'Fahrlehrer (Theorie & Praxis)');
code = code.replace('Biker aus Leidenschaft. Erklärt Kurventechnik so, dass sie jeder sofort versteht.', 'Ein geduldiger Begleiter auf dem Weg zum Führerschein. Theorie und Praxis mit Leichtigkeit erklärt.');

fs.writeFileSync('src/components/Team.tsx', code);

let adminCode = fs.readFileSync('src/components/AboutTeamManager.tsx', 'utf-8');
adminCode = adminCode.replace('Inhaber & Fahrlehrer (Auto/Motorrad)', 'Inhaber & Fahrlehrer (Auto)');
adminCode = adminCode.replace('Fahrlehrer (Motorrad Spezialist)', 'Fahrlehrer (Theorie & Praxis)');
adminCode = adminCode.replace('Biker aus Leidenschaft. Erklärt Kurventechnik so, dass sie jeder sofort versteht.', 'Ein geduldiger Begleiter auf dem Weg zum Führerschein. Theorie und Praxis mit Leichtigkeit erklärt.');
fs.writeFileSync('src/components/AboutTeamManager.tsx', adminCode);

console.log('Fixed team data');
