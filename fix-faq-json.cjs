const fs = require('fs');

const de = JSON.parse(fs.readFileSync('src/locales/de.json', 'utf8'));
const ru = JSON.parse(fs.readFileSync('src/locales/ru.json', 'utf8'));

de.faq.items = {
  "1": {
    "q": "Wie lange dauert der Führerschein in der Regel?",
    "a": "Das hängt von deiner Zeit und Motivation ab. Bei kontinuierlichen Fahrstunden (1-2 pro Woche) kannst du mit etwa 3 bis 5 Monaten rechnen. Wir bieten auch Intensivkurse an."
  },
  "2": {
    "q": "Wie viele Fahrstunden brauche ich?",
    "a": "Gesetzlich vorgeschrieben sind 12 Sonderfahrten (5x Überland, 4x Autobahn, 3x Nacht). Die Anzahl der normalen Übungsstunden hängt von deinen individuellen Fortschritten ab – wir fahren so viele wie nötig, aber so wenige wie möglich."
  },
  "3": {
    "q": "Kann ich online einen Termin vereinbaren?",
    "a": "Ja! Nutze einfach unser Anmeldeformular auf der Website. Wir rufen dich dann an, um deinen ersten Termin und den weiteren Ablauf zu besprechen."
  },
  "4": {
    "q": "Darf ich den Theorieunterricht auch in anderen Filialen besuchen?",
    "a": "Falls wir weitere Standorte eröffnen, bist du völlig flexibel und kannst Theorie-Einheiten standortübergreifend besuchen, um schneller fertig zu werden."
  },
  "5": {
    "q": "Was kostet der Führerschein?",
    "a": "Die Gesamtkosten variieren je nach benötigten Fahrstunden. Eine grobe Schätzung für Klasse B liegt derzeit zwischen 2.500 € und 3.500 €. Gerne beraten wir dich hierzu persönlich und transparent."
  }
};

ru.faq.items = {
  "1": {
    "q": "Сколько обычно длится обучение?",
    "a": "Это зависит от вашего времени и мотивации. При регулярных занятиях (1-2 раза в неделю) можно рассчитывать примерно на 3–5 месяцев. Мы также предлагаем интенсивные курсы."
  },
  "2": {
    "q": "Сколько часов вождения мне нужно?",
    "a": "Законом предусмотрено 12 обязательных поездок (5x за городом, 4x по автобану, 3x в ночное время). Количество обычных учебных часов зависит от вашего индивидуального прогресса — мы ездим столько, сколько нужно, но как можно меньше."
  },
  "3": {
    "q": "Могу ли я записаться онлайн?",
    "a": "Да! Просто воспользуйтесь формой на нашем сайте. Мы перезвоним вам, чтобы обсудить первое занятие и дальнейшие шаги."
  },
  "4": {
    "q": "Могу ли я посещать теорию в других филиалах?",
    "a": "Если мы откроем другие филиалы, вы сможете гибко посещать теоретические занятия в любом из них, чтобы быстрее закончить обучение."
  },
  "5": {
    "q": "Сколько стоят водительские права?",
    "a": "Общая стоимость зависит от необходимого количества часов вождения. Примерная оценка для категории B сейчас составляет от 2 500 до 3 500 евро. Мы с удовольствием проконсультируем вас лично и прозрачно."
  }
};

fs.writeFileSync('src/locales/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('src/locales/ru.json', JSON.stringify(ru, null, 2));
