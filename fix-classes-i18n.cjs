const fs = require('fs');

const classDetails = {
  B: {
    requirements: [
      'Mindestalter: 18 Jahre (17 Jahre bei BF17)',
      'Lichtbild (biometrisch)',
      'Sehtest (nicht älter als 2 Jahre)',
      'Erste-Hilfe-Kurs'
    ],
    theory: [
      '12 Doppelstunden Grundstoff',
      '2 Doppelstunden Zusatzstoff (Klasse B)',
      'Theorieprüfung (frühestens 3 Monate vor Geburtstag)'
    ],
    practice: [
      'Grundausbildung nach Fahrschüler-Ausbildungsordnung',
      '5 Sonderfahrten Überland (à 45 Min.)',
      '4 Sonderfahrten Autobahn (à 45 Min.)',
      '3 Sonderfahrten bei Dunkelheit (à 45 Min.)',
      'Praktische Prüfung (55 Minuten)'
    ]
  },
  B78: {
    requirements: [
      'Mindestalter: 18 Jahre (17 Jahre bei BF17)',
      'Lichtbild (biometrisch)',
      'Sehtest (nicht älter als 2 Jahre)',
      'Erste-Hilfe-Kurs'
    ],
    theory: [
      '12 Doppelstunden Grundstoff',
      '2 Doppelstunden Zusatzstoff (Klasse B)',
      'Theorieprüfung (frühestens 3 Monate vor Geburtstag)'
    ],
    practice: [
      'Ausbildung und Prüfung komplett auf Automatik',
      'Sonderfahrten wie bei Klasse B',
      'Eintragung der Schlüsselzahl 78 im Führerschein',
      'Praktische Prüfung (55 Minuten, auf Automatik)'
    ]
  },
  B197: {
    requirements: [
      'Mindestalter: 18 Jahre (17 Jahre bei BF17)',
      'Lichtbild (biometrisch)',
      'Sehtest (nicht älter als 2 Jahre)',
      'Erste-Hilfe-Kurs'
    ],
    theory: [
      '12 Doppelstunden Grundstoff',
      '2 Doppelstunden Zusatzstoff (Klasse B)'
    ],
    practice: [
      'Mindestens 10 Fahrstunden (à 45 Min.) auf einem Schaltwagen',
      '15 Min. Schaltkompetenz-Test (intern mit Fahrlehrer)',
      '12 Sonderfahrten (meist auf Automatik)',
      'Praktische Prüfung (55 Minuten, auf Automatik)'
    ]
  },
  BE: {
    requirements: [
      'Vorbesitz oder paralleler Erwerb der Klasse B',
      'Lichtbild (biometrisch)',
      'Sehtest (nicht älter als 2 Jahre)'
    ],
    theory: [
      'Keine Theorie-Ausbildung erforderlich!',
      'Keine Theorieprüfung erforderlich!'
    ],
    practice: [
      'Grundausbildung (Rangieren, Verbinden/Trennen)',
      '3 Sonderfahrten Überland (à 45 Min.)',
      '1 Sonderfahrt Autobahn (à 45 Min.)',
      '1 Sonderfahrt bei Dunkelheit (à 45 Min.)',
      'Praktische Prüfung (45 Minuten)'
    ]
  },
  B96: {
    requirements: [
      'Vorbesitz oder paralleler Erwerb der Klasse B',
      'Lichtbild (biometrisch)',
      'Personalausweis oder Reisepass'
    ],
    theory: [
      '2,5 Stunden (à 60 Min.) theoretische Schulung',
      'Keine Prüfung!'
    ],
    practice: [
      '3,5 Stunden (à 60 Min.) praktische Schulung',
      '1 Stunde fahrpraktische Übung im Realverkehr',
      'Im Anschluss erhältst du eine Bescheinigung für die Behörde',
      'Keine fahrpraktische Prüfung!'
    ]
  }
};

const ruClassDetails = {
  B: {
    requirements: [
      'Минимальный возраст: 18 лет (17 лет для BF17)',
      'Фотография (биометрическая)',
      'Проверка зрения (не старше 2 лет)',
      'Курс первой помощи'
    ],
    theory: [
      '12 двойных уроков базового материала',
      '2 двойных урока дополнительного материала (Категория B)',
      'Теоретический экзамен (не ранее чем за 3 месяца до дня рождения)'
    ],
    practice: [
      'Базовая подготовка по правилам обучения вождению',
      '5 особых поездок за городом (по 45 мин.)',
      '4 особые поездки по автобану (по 45 мин.)',
      '3 особые поездки в ночное время (по 45 мин.)',
      'Практический экзамен (55 минут)'
    ]
  },
  B78: {
    requirements: [
      'Минимальный возраст: 18 лет (17 лет для BF17)',
      'Фотография (биометрическая)',
      'Проверка зрения (не старше 2 лет)',
      'Курс первой помощи'
    ],
    theory: [
      '12 двойных уроков базового материала',
      '2 двойных урока дополнительного материала (Категория B)',
      'Теоретический экзамен (не ранее чем за 3 месяца до дня рождения)'
    ],
    practice: [
      'Обучение и экзамен полностью на автомате',
      'Особые поездки как для Категории B',
      'Внесение кода 78 в водительские права',
      'Практический экзамен (55 минут, на автомате)'
    ]
  },
  B197: {
    requirements: [
      'Минимальный возраст: 18 лет (17 лет для BF17)',
      'Фотография (биометрическая)',
      'Проверка зрения (не старше 2 лет)',
      'Курс первой помощи'
    ],
    theory: [
      '12 двойных уроков базового материала',
      '2 двойных урока дополнительного материала (Категория B)'
    ],
    practice: [
      'Минимум 10 уроков (по 45 мин.) на механике',
      '15 мин. тест на переключение передач (внутренний с инструктором)',
      '12 особых поездок (в основном на автомате)',
      'Практический экзамен (55 минут, на автомате)'
    ]
  },
  BE: {
    requirements: [
      'Наличие или параллельное получение Категории B',
      'Фотография (биометрическая)',
      'Проверка зрения (не старше 2 лет)'
    ],
    theory: [
      'Теоретическое обучение не требуется!',
      'Теоретический экзамен не требуется!'
    ],
    practice: [
      'Базовая подготовка (маневрирование, сцепка/расцепка)',
      '3 особые поездки за городом (по 45 мин.)',
      '1 особая поездка по автобану (по 45 мин.)',
      '1 особая поездка в ночное время (по 45 мин.)',
      'Практический экзамен (45 минут)'
    ]
  },
  B96: {
    requirements: [
      'Наличие или параллельное получение Категории B',
      'Фотография (биометрическая)',
      'Паспорт или удостоверение личности'
    ],
    theory: [
      '2,5 часа (по 60 мин.) теоретического обучения',
      'Без экзамена!'
    ],
    practice: [
      '3,5 часа (по 60 мин.) практического обучения',
      '1 час практического вождения в реальных условиях',
      'После этого вы получите справку для ведомства',
      'Без практического экзамена!'
    ]
  }
};

let de = JSON.parse(fs.readFileSync('src/locales/de.json', 'utf8'));
let ru = JSON.parse(fs.readFileSync('src/locales/ru.json', 'utf8'));

// Inject these into classes.items.X
Object.keys(classDetails).forEach(cls => {
  if (!de.classes.items[cls]) de.classes.items[cls] = {};
  de.classes.items[cls].requirements = classDetails[cls].requirements;
  de.classes.items[cls].theory = classDetails[cls].theory;
  de.classes.items[cls].practice = classDetails[cls].practice;
  
  if (!ru.classes.items[cls]) ru.classes.items[cls] = {};
  ru.classes.items[cls].requirements = ruClassDetails[cls].requirements;
  ru.classes.items[cls].theory = ruClassDetails[cls].theory;
  ru.classes.items[cls].practice = ruClassDetails[cls].practice;
});

fs.writeFileSync('src/locales/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('src/locales/ru.json', JSON.stringify(ru, null, 2));
