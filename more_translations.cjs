const fs = require('fs');

const deAdditions = {
  theory: {
    subtitle: "Theorieunterricht",
    title: "Wann & Wo",
    desc: "Wir bieten dir flexible Theoriezeiten an unserem modernen Standort. Komm einfach vorbei, eine Voranmeldung ist nicht nötig.",
    plan_title: "Aktueller Theorieplan",
    plan_week: "Plane deine Woche",
    days: {
      mon: "Montag",
      tue: "Dienstag",
      wed: "Mittwoch",
      thu: "Donnerstag",
      fri: "Freitag",
      sat: "Samstag",
      sun: "Sonntag"
    },
    location: {
      title: "Standort Marzahn",
      addr: "Marzahner Promenade 25, 12679 Berlin"
    }
  },
  faq: {
    subtitle: "Häufige Fragen",
    title: "Was möchtest du wissen?",
    items: {
      "1": { q: "Wie lange dauert die Ausbildung?", a: "Die Dauer hängt von verschiedenen Faktoren ab. Im Durchschnitt benötigen unsere Fahrschüler etwa 3 bis 5 Monate von der Anmeldung bis zur bestandenen praktischen Prüfung. Mit intensiver Planung geht es auch schneller." },
      "2": { q: "Wie viele Fahrstunden brauche ich?", a: "Der Gesetzgeber schreibt 12 Sonderfahrten vor (5x Überland, 4x Autobahn, 3x Nachtfahrt). Die Anzahl der normalen Übungsfahrten variiert je nach deinen individuellen Fortschritten und Fähigkeiten." },
      "3": { q: "Kann ich die Fahrschule wechseln?", a: "Ja, ein Wechsel ist jederzeit möglich. Wir übernehmen deine bisherigen Ausbildungsnachweise und du kannst nahtlos bei uns weiterlernen. Sprich uns einfach darauf an." },
      "4": { q: "Wann kann ich mit der Theorieprüfung beginnen?", a: "Frühestens 3 Monate vor deinem entsprechenden Geburtstag und nachdem du alle erforderlichen Theoriestunden absolviert hast. Der Prüfauftrag vom TÜV muss ebenfalls vorliegen." },
      "5": { q: "Bietet ihr auch Automatik-Ausbildung an?", a: "Ja! Wir empfehlen besonders die B197-Ausbildung: Du lernst stressfrei auf einem Automatikfahrzeug, machst ein paar Stunden auf Schaltung und darfst später beides fahren." }
    },
    more: "Noch Fragen?",
    contact: "Kontaktiere uns einfach."
  },
  reg: {
    subtitle: "Anmeldung",
    title: "Dein Start bei uns",
    desc: "Melde dich bequem online an. Wir melden uns umgehend bei dir zurück, um alle Details zu besprechen und deinen Ausbildungsvertrag vorzubereiten.",
    form: {
      personal: "Persönliche Daten",
      fname: "Vorname",
      lname: "Nachname",
      email: "E-Mail",
      phone: "Telefon",
      class: "Gewünschte Klasse",
      class_sel: "Klasse wählen",
      msg: "Nachricht (optional)",
      submit: "Jetzt verbindlich anmelden",
      success: "Vielen Dank für deine Anmeldung! Wir melden uns in Kürze bei dir.",
      error: "Es gab ein Problem. Bitte versuche es später noch einmal."
    }
  },
  loc: {
    subtitle: "Unser Standort",
    title: "Hier findest du uns",
    desc: "Komm gerne während unserer Öffnungszeiten persönlich vorbei. Wir beraten dich unverbindlich und beantworten alle deine Fragen zur Ausbildung.",
    address: "Marzahner Promenade 25",
    city: "12679 Berlin",
    phone: "Telefon",
    email: "E-Mail",
    hours: "Öffnungszeiten",
    hours_wd: "Montag - Freitag",
    hours_we: "Samstag & Sonntag",
    closed: "Geschlossen",
    time: "10:00 - 18:00 Uhr"
  }
};

const ruAdditions = {
  theory: {
    subtitle: "Теоретические занятия",
    title: "Когда и Где",
    desc: "Мы предлагаем гибкое расписание теории в нашем современном филиале. Просто приходите, предварительная запись не требуется.",
    plan_title: "Актуальное расписание",
    plan_week: "Планируйте свою неделю",
    days: {
      mon: "Понедельник",
      tue: "Вторник",
      wed: "Среда",
      thu: "Четверг",
      fri: "Пятница",
      sat: "Суббота",
      sun: "Воскресенье"
    },
    location: {
      title: "Филиал в Марцане",
      addr: "Marzahner Promenade 25, 12679 Berlin"
    }
  },
  faq: {
    subtitle: "Частые вопросы",
    title: "Что вы хотите узнать?",
    items: {
      "1": { q: "Сколько длится обучение?", a: "Продолжительность зависит от многих факторов. В среднем наши ученики тратят от 3 до 5 месяцев с момента регистрации до успешной сдачи практического экзамена. При интенсивном графике это может быть быстрее." },
      "2": { q: "Сколько практических занятий мне нужно?", a: "По закону требуется 12 обязательных часов вождения (5x за городом, 4x по автобану, 3x в темное время суток). Количество обычных учебных часов зависит от вашего индивидуального прогресса и навыков." },
      "3": { q: "Могу ли я сменить автошколу?", a: "Да, перевод возможен в любое время. Мы примем ваши предыдущие сертификаты об обучении, и вы сможете беспрепятственно продолжить обучение у нас. Просто свяжитесь с нами." },
      "4": { q: "Когда я могу сдавать теоретический экзамен?", a: "Не ранее чем за 3 месяца до вашего соответствующего дня рождения и после того, как вы пройдете все необходимые теоретические занятия. Также необходимо разрешение на сдачу экзамена от TÜV." },
      "5": { q: "Предлагаете ли вы обучение на коробке-автомат?", a: "Да! Мы особенно рекомендуем курс B197: вы учитесь без стресса на автомобиле с автоматом, берете несколько часов на механике и позже сможете управлять обоими типами автомобилей." }
    },
    more: "Остались вопросы?",
    contact: "Свяжитесь с нами."
  },
  reg: {
    subtitle: "Регистрация",
    title: "Ваш старт с нами",
    desc: "Удобно зарегистрируйтесь онлайн. Мы оперативно свяжемся с вами, чтобы обсудить все детали и подготовить ваш договор на обучение.",
    form: {
      personal: "Личные данные",
      fname: "Имя",
      lname: "Фамилия",
      email: "E-Mail",
      phone: "Телефон",
      class: "Желаемая категория",
      class_sel: "Выберите категорию",
      msg: "Сообщение (необязательно)",
      submit: "Подать заявку",
      success: "Спасибо за заявку! Мы свяжемся с вами в ближайшее время.",
      error: "Возникла проблема. Пожалуйста, попробуйте еще раз позже."
    }
  },
  loc: {
    subtitle: "Наш филиал",
    title: "Где нас найти",
    desc: "Приходите к нам лично в рабочие часы. Мы с удовольствием проконсультируем вас без обязательств и ответим на все ваши вопросы об обучении.",
    address: "Marzahner Promenade 25",
    city: "12679 Berlin",
    phone: "Телефон",
    email: "E-Mail",
    hours: "Часы работы",
    hours_wd: "Понедельник - Пятница",
    hours_we: "Суббота & Воскресенье",
    closed: "Закрыто",
    time: "10:00 - 18:00 Uhr"
  }
};

let de = JSON.parse(fs.readFileSync('src/locales/de.json', 'utf8'));
let ru = JSON.parse(fs.readFileSync('src/locales/ru.json', 'utf8'));

de = { ...de, ...deAdditions };
ru = { ...ru, ...ruAdditions };

fs.writeFileSync('src/locales/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('src/locales/ru.json', JSON.stringify(ru, null, 2));

// Update TheorySchedule.tsx
let theoryCode = fs.readFileSync('src/components/TheorySchedule.tsx', 'utf8');
theoryCode = theoryCode.replace(
  "export function TheorySchedule() {",
  `import { useTranslation } from 'react-i18next';\n\nexport function TheorySchedule() {\n  const { t } = useTranslation();`
);
theoryCode = theoryCode.replace(/Theorieunterricht/g, `{t('theory.subtitle')}`);
theoryCode = theoryCode.replace(/Wann & Wo/g, `{t('theory.title')}`);
theoryCode = theoryCode.replace(/Wir bieten dir flexible Theoriezeiten an unserem modernen Standort. Komm einfach vorbei, eine Voranmeldung ist nicht nötig./g, `{t('theory.desc')}`);
theoryCode = theoryCode.replace(/Aktueller Theorieplan/g, `{t('theory.plan_title')}`);
theoryCode = theoryCode.replace(/Plane deine Woche/g, `{t('theory.plan_week')}`);
theoryCode = theoryCode.replace(/Standort Marzahn/g, `{t('theory.location.title')}`);
theoryCode = theoryCode.replace(/Marzahner Promenade 25, 12679 Berlin/g, `{t('theory.location.addr')}`);
theoryCode = theoryCode.replace(/>Montag</g, `>{t('theory.days.mon')}<`);
theoryCode = theoryCode.replace(/>Dienstag</g, `>{t('theory.days.tue')}<`);
theoryCode = theoryCode.replace(/>Mittwoch</g, `>{t('theory.days.wed')}<`);
theoryCode = theoryCode.replace(/>Donnerstag</g, `>{t('theory.days.thu')}<`);
theoryCode = theoryCode.replace(/>Freitag</g, `>{t('theory.days.fri')}<`);
fs.writeFileSync('src/components/TheorySchedule.tsx', theoryCode);

// Update FAQ.tsx
let faqCode = fs.readFileSync('src/components/FAQ.tsx', 'utf8');
faqCode = faqCode.replace(
  "export function FAQ() {",
  `import { useTranslation } from 'react-i18next';\n\nexport function FAQ() {\n  const { t } = useTranslation();`
);
faqCode = faqCode.replace(/Häufige Fragen/g, `{t('faq.subtitle')}`);
faqCode = faqCode.replace(/Was möchtest du wissen\?/g, `{t('faq.title')}`);
faqCode = faqCode.replace(/\{faq.question\}/g, `{t(\`faq.items.\${index + 1}.q\`)}`);
faqCode = faqCode.replace(/\{faq.answer\}/g, `{t(\`faq.items.\${index + 1}.a\`)}`);
faqCode = faqCode.replace(/Noch Fragen\?/g, `{t('faq.more')}`);
faqCode = faqCode.replace(/Kontaktiere uns einfach./g, `{t('faq.contact')}`);
fs.writeFileSync('src/components/FAQ.tsx', faqCode);

// Update Registration.tsx
let regCode = fs.readFileSync('src/components/Registration.tsx', 'utf8');
regCode = regCode.replace(
  "export function Registration() {",
  `import { useTranslation } from 'react-i18next';\n\nexport function Registration() {\n  const { t } = useTranslation();`
);
regCode = regCode.replace(/Anmeldung/g, `{t('reg.subtitle')}`);
regCode = regCode.replace(/Dein Start bei uns/g, `{t('reg.title')}`);
regCode = regCode.replace(/Melde dich bequem online an\. Wir melden uns umgehend bei dir zurück, um alle Details zu besprechen und deinen Ausbildungsvertrag vorzubereiten./g, `{t('reg.desc')}`);
regCode = regCode.replace(/Persönliche Daten/g, `{t('reg.form.personal')}`);
regCode = regCode.replace(/Vorname/g, `{t('reg.form.fname')}`);
regCode = regCode.replace(/Nachname/g, `{t('reg.form.lname')}`);
regCode = regCode.replace(/E-Mail/g, `{t('reg.form.email')}`);
regCode = regCode.replace(/>Telefon</g, `>{t('reg.form.phone')}<`);
regCode = regCode.replace(/Gewünschte Klasse/g, `{t('reg.form.class')}`);
regCode = regCode.replace(/>Klasse wählen</g, `>{t('reg.form.class_sel')}<`);
regCode = regCode.replace(/Nachricht \(optional\)/g, `{t('reg.form.msg')}`);
regCode = regCode.replace(/Jetzt verbindlich anmelden/g, `{t('reg.form.submit')}`);
regCode = regCode.replace(/Erfolgreich gesendet! Wir melden uns in Kürze./g, `{t('reg.form.success')}`);
fs.writeFileSync('src/components/Registration.tsx', regCode);

// Update Location.tsx
let locCode = fs.readFileSync('src/components/Location.tsx', 'utf8');
locCode = locCode.replace(
  "export function Location() {",
  `import { useTranslation } from 'react-i18next';\n\nexport function Location() {\n  const { t } = useTranslation();`
);
locCode = locCode.replace(/Unser Standort/g, `{t('loc.subtitle')}`);
locCode = locCode.replace(/Hier findest du uns/g, `{t('loc.title')}`);
locCode = locCode.replace(/Komm gerne während unserer Öffnungszeiten persönlich vorbei. Wir beraten dich unverbindlich./g, `{t('loc.desc')}`);
locCode = locCode.replace(/>Telefon</g, `>{t('loc.phone')}<`);
locCode = locCode.replace(/>E-Mail</g, `>{t('loc.email')}<`);
locCode = locCode.replace(/>Öffnungszeiten</g, `>{t('loc.hours')}<`);
locCode = locCode.replace(/>Montag - Freitag</g, `>{t('loc.hours_wd')}<`);
locCode = locCode.replace(/>10:00 - 18:00 Uhr</g, `>{t('loc.time')}<`);
locCode = locCode.replace(/>Samstag & Sonntag</g, `>{t('loc.hours_we')}<`);
locCode = locCode.replace(/>Geschlossen</g, `>{t('loc.closed')}<`);
fs.writeFileSync('src/components/Location.tsx', locCode);
