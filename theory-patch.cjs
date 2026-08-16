const fs = require('fs');

let theoryCode = fs.readFileSync('src/components/TheorySchedule.tsx', 'utf8');

theoryCode = theoryCode.replace(/Unser strukturierter Ausbildungsplan für deine Theorie-Stunden\. Wähle den Kurs, der sprachlich am besten zu dir passt\./g, `{t('theory.desc')}`);
theoryCode = theoryCode.replace(/Russisch/g, `{t('theory.lang_ru', 'Russisch')}`);
theoryCode = theoryCode.replace(/Deutsch/g, `{t('theory.lang_de', 'Deutsch')}`);
theoryCode = theoryCode.replace(/\{row\.day\}/g, `{t(\`theory.days.\${row.day.toLowerCase().substring(0,3)}\`, { defaultValue: row.day })}`);

fs.writeFileSync('src/components/TheorySchedule.tsx', theoryCode);
