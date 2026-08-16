const fs = require('fs');

function updateLocale(file, navText, offerText) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.footer.navigation = navText;
  data.footer.offer = offerText;
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

updateLocale('src/locales/de.json', 'Navigation', 'Ausbildung');
updateLocale('src/locales/ru.json', 'Навигация', 'Обучение');
