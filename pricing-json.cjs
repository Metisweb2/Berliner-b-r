const fs = require('fs');

const deAdditions = {
  pricing: {
    classes: {
      b: "Klasse B (Schalter)",
      b197: "Klasse B197 (Automatik)",
      be: "Klasse BE (Anhänger)",
      b96: "Klasse B96 (Anhänger)",
      a: "Klasse A (Motorrad)"
    },
    fees: {
      base: { title: "Grundbetrag", desc: "Theorieunterricht & Verwaltung" },
      practice: { title: "Übungsfahrt", desc: "Reguläre Fahrstunde (45 Min.)" },
      special: { title: "Sonderfahrten", desc: "Überland, Autobahn, Nacht (45 Min.)" },
      theory_exam: { title: "Theorieprüfung", desc: "Amtliche Vorstellung zur Prüfung" },
      practice_exam: { title: "Praxisprüfung", desc: "Amtliche Vorstellung zur Prüfung" },
      b96_course: { title: "Tageskurs", desc: "Komplette theoretische & praktische Schulung" }
    }
  }
};

const ruAdditions = {
  pricing: {
    classes: {
      b: "Категория B (Механика)",
      b197: "Категория B197 (Автомат)",
      be: "Категория BE (Прицеп)",
      b96: "Категория B96 (Прицеп)",
      a: "Категория A (Мотоцикл)"
    },
    fees: {
      base: { title: "Базовый взнос", desc: "Теория и административные расходы" },
      practice: { title: "Учебная поездка", desc: "Обычное занятие (45 мин.)" },
      special: { title: "Особые поездки", desc: "За город, автобан, ночь (45 мин.)" },
      theory_exam: { title: "Теоретический экзамен", desc: "Официальное представление на экзамен" },
      practice_exam: { title: "Практический экзамен", desc: "Официальное представление на экзамен" },
      b96_course: { title: "Однодневный курс", desc: "Полное теоретическое и практическое обучение" }
    }
  }
};

function mergeDeep(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], mergeDeep(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

let de = JSON.parse(fs.readFileSync('src/locales/de.json', 'utf8'));
let ru = JSON.parse(fs.readFileSync('src/locales/ru.json', 'utf8'));

de = mergeDeep(de, deAdditions);
ru = mergeDeep(ru, ruAdditions);

fs.writeFileSync('src/locales/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('src/locales/ru.json', JSON.stringify(ru, null, 2));
