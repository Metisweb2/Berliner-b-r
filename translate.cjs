const fs = require('fs');

const de = {
  nav: {
    start: "Startseite",
    classes: "Führerscheine",
    theory: "Theorie",
    pricing: "Preise",
    about: "Über uns",
    faq: "FAQ",
    career: "Karriere",
    contact: "Kontakt",
    register: "Jetzt anmelden",
    legal: "Rechtliches"
  },
  hero: {
    title1: "Dein Führerschein.",
    title2: "Dein nächster Schritt im Leben!",
    description: "Neue Freiheit, neue Möglichkeiten und neue Wege liegen vor dir. Lass jede Fahrt Spaß machen, dir Sicherheit geben und nur positive Eindrücke hinterlassen!",
    cta1: "Führerschein starten",
    cta2: "Unsere Klassen entdecken"
  },
  reviews: {
    title: "Definitiv die beste Wahl",
    onGoogle: "Auf Google",
    verified: "Verifizierter Kunde",
    months: {
      "1": "Vor 1 Monat",
      "3": "Vor 3 Monaten"
    },
    texts: {
      "1": "Super Fahrschule! Die Fahrlehrer sind geduldig, professionell und bereiten einen perfekt auf die Prüfung vor. Man fühlt sich sehr gut aufgehoben. Habe meinen Führerschein beim ersten Mal bestanden!",
      "2": "Die Fahrzeuge sind modern und top gepflegt. Ein großes Lob an das gesamte Team für die tolle Unterstützung. Die Theorie und Praxisstunden haben richtig Spaß gemacht. Sehr zu empfehlen!",
      "3": "Top Organisation! Von der Anmeldung bis zur praktischen Prüfung lief alles reibungslos. Sehr geduldige und verständnisvolle Fahrlehrer, die eine entspannte Lernatmosphäre schaffen."
    }
  },
  career: {
    subtitle: "Werde Teil des Teams",
    title: "Fahrlehrer/in (m/w/d) gesucht",
    description: "Fahrschule Berliner Bär GmbH in Marzahn sucht eine/n engagierte/n und nette/n Fahrlehrer/in zur Verstärkung unseres Teams. Berufsanfänger und Fahrlehreranwärter sind bei uns herzlich willkommen!",
    benefits: {
      salary: { title: "Gehalt", desc: "27 € pro Stunde für deine engagierte Arbeit." },
      vacation: { title: "Jahresurlaub", desc: "30 Tage Urlaub, um neue Energie zu tanken." },
      car: { title: "Fahrschulauto", desc: "Ein moderner Mercedes Benz C Klasse steht dir zur Verfügung." },
      team: { title: "Team & Atmosphäre", desc: "Ein nettes Team und eine freundliche, entspannte Atmosphäre." }
    },
    contact: {
      title: "Interesse geweckt?",
      description: "Wir freuen uns auf deinen Besuch oder Anruf! Werde Teil einer modernen Fahrschule und starte mit uns durch.",
      addressLabel: "Standort",
      phoneLabel: "Telefon",
      cta: "Jetzt anrufen"
    }
  },
  usps: {
    title_start: "Warum ",
    title_highlight: "Fahrschule Bär?",
    desc: "Wir machen den Weg zu deinem Führerschein so einfach, entspannt und erfolgreich wie möglich. Deine Vorteile auf einen Blick:",
    items: {
      "1": { title: "Geduldige Fahrlehrer", desc: "Stressfrei zum Führerschein. Unsere erfahrenen Fahrlehrer erklären alles in Ruhe und passen sich deinem individuellen Lerntempo an." },
      "2": { title: "Moderne Fahrzeuge", desc: "Ausbildung auf dem neuesten Stand. Lerne mit modernsten Assistenzsystemen in unseren hochwertigen und sicheren Fahrzeugen." },
      "3": { title: "Flexible Fahrzeiten", desc: "Dein Führerschein, dein Zeitplan. Wir richten uns nach deinem Alltag – egal ob vor der Arbeit, nach der Schule oder am Wochenende." },
      "4": { title: "Persönliche Betreuung", desc: "Du bist keine Nummer. Von der ersten Theoriestunde bis zur praktischen Prüfung stehen wir dir bei allen Fragen persönlich zur Seite." },
      "5": { title: "Transparente Preise", desc: "Volle Kostenkontrolle von Anfang an. Keine versteckten Gebühren oder bösen Überraschungen – faire Preise sind für uns selbstverständlich." },
      "6": { title: "Hohe Erfolgsquote", desc: "Unser gemeinsames Ziel ist dein Erfolg beim ersten Versuch. Wir bereiten dich so vor, dass du dich im Straßenverkehr 100 % sicher fühlst." }
    }
  },
  pricing: {
    subtitle: "Unsere Preise",
    title: "Transparent & Fair",
    items: {
      "1": { title: "Grundbetrag", desc: "Die Basis für deine Ausbildung. Inklusive aller Theoriestunden und administrativer Betreuung.", from: "ab" },
      "2": { title: "Übungsfahrt", desc: "45 Minuten Praxis. Wir üben alle Grundfahraufgaben und das sichere Fahren im Alltag.", from: "ab" },
      "3": { title: "Sonderfahrten", desc: "45 Minuten Überland, Autobahn oder bei Dunkelheit. Pflichtstunden für deine Prüfung.", from: "ab" },
      "4": { title: "Prüfung", desc: "Wir begleiten dich zur theoretischen und praktischen Prüfung. Inklusive Warm-up Fahrt.", from: "ab" }
    },
    disclaimer: "* Alle Preise verstehen sich inkl. der gesetzlichen MwSt. TÜV-Gebühren für Prüfungen werden separat erhoben. Stand 2024."
  },
  classes: {
    subtitle: "Unser Ausbildungsangebot",
    title1: "Welche Klasse",
    title2: "möchtest du fahren?",
    learn_more: "Mehr erfahren",
    items: {
      "B": { title: "Klasse B", desc: "Der Klassiker. PKW-Führerschein für Autos bis 3,5t." },
      "B197": { title: "Klasse B197", desc: "Entspannt auf Automatik lernen, aber Schalter fahren dürfen." },
      "B78": { title: "Klasse B78", desc: "Reine Automatik-Ausbildung. Modern, stressfrei und zukunftsorientiert." },
      "A": { title: "Klasse A", desc: "Die Königsklasse. Schwere Motorräder ohne Leistungsbeschränkung." },
      "A2": { title: "Klasse A2", desc: "Der Einstieg. Mittelschwere Motorräder bis 35 kW." },
      "A1": { title: "Klasse A1", desc: "Leichtkrafträder bis 125 ccm. Der Start ab 16 Jahren." }
    }
  },
  footer: {
    slogan: "Sicher fahren. Selbstbewusst ankommen.",
    links: "Links",
    legal: "Rechtliches",
    social: "Social Media",
    copyright: "© 2024 Fahrschule Bär. Alle Rechte vorbehalten.",
    premium: "Premium Fahrausbildung"
  }
};

const ru = {
  nav: {
    start: "Главная",
    classes: "Категории",
    theory: "Теория",
    pricing: "Цены",
    about: "О нас",
    faq: "Вопросы",
    career: "Карьера",
    contact: "Контакты",
    register: "Записаться",
    legal: "Правовая информация"
  },
  hero: {
    title1: "Водительские права —",
    title2: "это твой новый шаг в жизни!",
    description: "Новая свобода, новые возможности и новые дороги впереди. Пусть каждая поездка приносит удовольствие, уверенность и только приятные впечатления!",
    cta1: "Начать обучение",
    cta2: "Наши категории"
  },
  reviews: {
    title: "Безупречный выбор",
    onGoogle: "В Google",
    verified: "Подтверждённый клиент",
    months: {
      "1": "1 месяц назад",
      "3": "3 месяца назад"
    },
    texts: {
      "1": "Отличная автошкола! Инструкторы терпеливы, профессиональны и идеально готовят к экзамену. Чувствуешь себя в надёжных руках. Сдал на права с первого раза!",
      "2": "Машины современные и в отличном состоянии. Огромное спасибо всей команде за поддержку. Теоретические и практические занятия доставили массу удовольствия. Очень рекомендую!",
      "3": "Прекрасная организация! От регистрации до практического экзамена всё прошло гладко. Очень терпеливые и понимающие инструкторы, которые создают спокойную атмосферу для обучения."
    }
  },
  career: {
    subtitle: "Станьте частью команды",
    title: "Ищем автоинструктора (м/ж/д)",
    description: "Автошкола Berliner Bär GmbH в Марцане ищет преданного и дружелюбного автоинструктора. Новички и стажеры также горячо приветствуются!",
    benefits: {
      salary: { title: "Зарплата", desc: "27 € в час за вашу отличную работу." },
      vacation: { title: "Отпуск", desc: "30 дней ежегодного отпуска для восстановления сил." },
      car: { title: "Автомобиль", desc: "Современный Mercedes Benz C-Class в вашем распоряжении." },
      team: { title: "Команда и атмосфера", desc: "Отличный коллектив и дружеская, расслабленная атмосфера." }
    },
    contact: {
      title: "Заинтересовались?",
      description: "Будем рады вашему визиту или звонку! Присоединяйтесь к современной автошколе и развивайтесь вместе с нами.",
      addressLabel: "Локация",
      phoneLabel: "Телефон",
      cta: "Позвонить сейчас"
    }
  },
  usps: {
    title_start: "Почему ",
    title_highlight: "Автошкола Bär?",
    desc: "Мы делаем путь к получению водительских прав максимально простым, спокойным и успешным. Ваши преимущества с первого взгляда:",
    items: {
      "1": { title: "Терпеливые инструкторы", desc: "Получение прав без стресса. Наши опытные инструкторы всё спокойно объясняют и адаптируются к вашему темпу." },
      "2": { title: "Современные автомобили", desc: "Обучение по новейшим стандартам. Учитесь с современными системами помощи в наших качественных и безопасных авто." },
      "3": { title: "Гибкий график", desc: "Ваши права – ваше расписание. Мы подстраиваемся под вас – будь то перед работой, после учёбы или в выходные." },
      "4": { title: "Личный подход", desc: "Вы для нас не просто номер. От первого урока теории до практического экзамена мы лично поддержим вас во всех вопросах." },
      "5": { title: "Прозрачные цены", desc: "Полный контроль затрат с самого начала. Никаких скрытых платежей или неприятных сюрпризов – честные цены для нас стандарт." },
      "6": { title: "Высокий процент сдачи", desc: "Наша общая цель – ваш успех с первой попытки. Мы готовим вас так, чтобы вы чувствовали себя на 100% уверенно на дороге." }
    }
  },
  pricing: {
    subtitle: "Наши цены",
    title: "Прозрачно и честно",
    items: {
      "1": { title: "Базовый сбор", desc: "Основа вашего обучения. Включает все теоретические занятия и административную поддержку.", from: "от" },
      "2": { title: "Практическое занятие", desc: "45 минут практики. Отрабатываем все базовые задачи и безопасное вождение в повседневной жизни.", from: "от" },
      "3": { title: "Спец. вождение", desc: "45 минут по трассе, автобану или в темноте. Обязательные часы для вашего экзамена.", from: "от" },
      "4": { title: "Экзамен", desc: "Мы сопровождаем вас на теоретический и практический экзамен. Включает разминочную поездку.", from: "от" }
    },
    disclaimer: "* Все цены включают НДС. Сборы TÜV за экзамены взимаются отдельно. Данные на 2024 год."
  },
  classes: {
    subtitle: "Наши программы",
    title1: "Какую категорию",
    title2: "вы хотите получить?",
    learn_more: "Узнать больше",
    items: {
      "B": { title: "Категория B", desc: "Классика. Водительские права на легковые автомобили до 3,5 тонн." },
      "B197": { title: "Категория B197", desc: "Обучение без стресса на автомате с правом вождения на механике." },
      "B78": { title: "Категория B78", desc: "Только автоматическая коробка передач. Современное обучение без лишнего стресса." },
      "A": { title: "Категория A", desc: "Королевский класс. Тяжелые мотоциклы без ограничения мощности." },
      "A2": { title: "Категория A2", desc: "Начало. Средние мотоциклы мощностью до 35 кВт." },
      "A1": { title: "Категория A1", desc: "Легкие мотоциклы до 125 куб. см. Старт с 16 лет." }
    }
  },
  footer: {
    slogan: "Безопасное вождение. Уверенность на дороге.",
    links: "Ссылки",
    legal: "Правовая информация",
    social: "Социальные сети",
    copyright: "© 2024 Автошкола Bär. Все права защищены.",
    premium: "Премиальное обучение вождению"
  }
};

fs.writeFileSync('src/locales/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('src/locales/ru.json', JSON.stringify(ru, null, 2));
