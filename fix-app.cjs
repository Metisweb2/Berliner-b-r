const fs = require('fs');
let appCode = fs.readFileSync('src/App.tsx', 'utf-8');
appCode = appCode.replace(/const \[vacationMode, setVacationMode\] = useState\(false\);\s*const \[vacationText, setVacationText\] = useState\(''\);\s*/, '');
appCode = appCode.replace(/setVacationMode\(!!data\.vacationMode\);\s*setVacationText\(data\.vacationText \|\| 'Wir machen Urlaub!'\);\s*/, '');
appCode = appCode.replace(/, SunMedium /, ' ');
fs.writeFileSync('src/App.tsx', appCode);
