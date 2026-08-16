const fs = require('fs');

const deDesc = {
  BE: {
    title: "Klasse BE",
    desc: "Für große Vorhaben: PKW mit schwerem Anhänger (Wohnwagen, Pferdeanhänger)."
  },
  B96: {
    title: "Klasse B96",
    desc: "Das Tages-Upgrade: Anhänger-Erweiterung bis 4.250 kg. Komplett ohne Prüfung!"
  },
  B78: {
    title: "Klasse B78",
    desc: "Reine Automatik-Ausbildung. Modern, stressfrei und zukunftsorientiert."
  },
  A: {
    title: "Klasse A",
    desc: "Die Königsklasse. Schwere Motorräder ohne Leistungsbeschränkung."
  }
};

const ruDesc = {
  BE: {
    title: "Категория BE",
    desc: "Для серьезных задач: легковой автомобиль с тяжелым прицепом (караван, коневозка)."
  },
  B96: {
    title: "Категория B96",
    desc: "Однодневное улучшение: расширение для прицепа до 4.250 кг. Полностью без экзамена!"
  },
  B78: {
    title: "Категория B78",
    desc: "Обучение только на автомате. Современное, без стресса и ориентированное на будущее."
  },
  A: {
    title: "Категория A",
    desc: "Королевский класс. Тяжелые мотоциклы без ограничения мощности."
  }
};

let de = JSON.parse(fs.readFileSync('src/locales/de.json', 'utf8'));
let ru = JSON.parse(fs.readFileSync('src/locales/ru.json', 'utf8'));

Object.keys(deDesc).forEach(k => {
  if (de.classes.items[k]) {
    de.classes.items[k].title = deDesc[k].title;
    de.classes.items[k].desc = deDesc[k].desc;
  }
});
Object.keys(ruDesc).forEach(k => {
  if (ru.classes.items[k]) {
    ru.classes.items[k].title = ruDesc[k].title;
    ru.classes.items[k].desc = ruDesc[k].desc;
  }
});

fs.writeFileSync('src/locales/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('src/locales/ru.json', JSON.stringify(ru, null, 2));

