const fs = require('fs');

const de = JSON.parse(fs.readFileSync('src/locales/de.json', 'utf8'));
const ru = JSON.parse(fs.readFileSync('src/locales/ru.json', 'utf8'));

de.theory.lang_ru = "Russisch";
de.theory.lang_de = "Deutsch";
de.theory.desc = "Unser strukturierter Ausbildungsplan für deine Theorie-Stunden. Wähle den Kurs, der sprachlich am besten zu dir passt.";

ru.theory.lang_ru = "Русский";
ru.theory.lang_de = "Немецкий";
ru.theory.desc = "Наш структурированный план теоретических занятий. Выберите курс, который подходит вам по языку.";

fs.writeFileSync('src/locales/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('src/locales/ru.json', JSON.stringify(ru, null, 2));
