const fs = require('fs');

const deAdditions = {
  pricing: {
    title_start: "Transparente ",
    title_highlight: "Leistungen"
  },
  reg: {
    steps: {
      "1": { title: "Formular ausfüllen", desc: "Hinterlasse uns deine Kontaktdaten und deinen Wunsch-Führerschein." },
      "2": { title: "Wir rufen zurück", desc: "Wir klären offene Fragen und planen deinen Ausbildungsbeginn." },
      "3": { title: "Startschuss", desc: "Du startest mit der Theorie und bist bald sicher auf der Straße unterwegs." }
    },
    form: {
      phone2: "Telefonnummer",
      dob: "Geburtsdatum",
      classes: {
        be: "Klasse BE",
        am: "Klasse AM"
      }
    }
  },
  loc: {
    location_title: "Standort",
    maps: {
      title: "Google Maps Integration",
      desc: "Platzhalter für iframe"
    }
  },
  theory: {
    weekday: "Wochentag"
  },
  footer: {
    legal_links: {
      imp: "Impressum",
      ds: "Datenschutz",
      agb: "AGB"
    }
  }
};

const ruAdditions = {
  pricing: {
    title_start: "Прозрачные ",
    title_highlight: "услуги"
  },
  reg: {
    steps: {
      "1": { title: "Заполнить форму", desc: "Оставьте нам свои контактные данные и желаемую категорию прав." },
      "2": { title: "Мы перезвоним", desc: "Мы ответим на ваши вопросы и спланируем начало обучения." },
      "3": { title: "Старт", desc: "Вы начнете с теории и скоро будете уверенно ездить по дорогам." }
    },
    form: {
      phone2: "Номер телефона",
      dob: "Дата рождения",
      classes: {
        be: "Категория BE",
        am: "Категория AM"
      }
    }
  },
  loc: {
    location_title: "Филиал",
    maps: {
      title: "Интеграция Google Maps",
      desc: "Место для iframe"
    }
  },
  theory: {
    weekday: "День недели"
  },
  footer: {
    legal_links: {
      imp: "Импрессум",
      ds: "Защита данных",
      agb: "Общие условия (AGB)"
    }
  }
};

// Merge Deeply
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

// Update components

// Pricing.tsx
let pricingCode = fs.readFileSync('src/components/Pricing.tsx', 'utf8');
pricingCode = pricingCode.replace(
  /Transparente <span className="font-bold">Leistungen<\/span>/g,
  `{t('pricing.title_start')}<span className="font-bold">{t('pricing.title_highlight')}</span>`
);
fs.writeFileSync('src/components/Pricing.tsx', pricingCode);

// Registration.tsx
let regCode = fs.readFileSync('src/components/Registration.tsx', 'utf8');
regCode = regCode.replace(/Formular ausfüllen/g, `{t('reg.steps.1.title')}`);
regCode = regCode.replace(/Hinterlasse uns deine Kontaktdaten und deinen Wunsch-Führerschein\./g, `{t('reg.steps.1.desc')}`);
regCode = regCode.replace(/Wir rufen zurück/g, `{t('reg.steps.2.title')}`);
regCode = regCode.replace(/Wir klären offene Fragen und planen deinen Ausbildungsbeginn\./g, `{t('reg.steps.2.desc')}`);
regCode = regCode.replace(/Startschuss/g, `{t('reg.steps.3.title')}`);
regCode = regCode.replace(/Du startest mit der Theorie und bist bald sicher auf der Straße unterwegs\./g, `{t('reg.steps.3.desc')}`);
regCode = regCode.replace(/>Telefonnummer</g, `>{t('reg.form.phone2')}<`);
regCode = regCode.replace(/>Geburtsdatum</g, `>{t('reg.form.dob')}<`);
regCode = regCode.replace(/>Klasse BE</g, `>{t('reg.form.classes.be')}<`);
regCode = regCode.replace(/>Klasse AM</g, `>{t('reg.form.classes.am')}<`);
fs.writeFileSync('src/components/Registration.tsx', regCode);

// Location.tsx
let locCode = fs.readFileSync('src/components/Location.tsx', 'utf8');
locCode = locCode.replace(/Standort/g, `{t('loc.location_title')}`);
locCode = locCode.replace(/Google Maps Integration/g, `{t('loc.maps.title')}`);
locCode = locCode.replace(/Platzhalter für iframe/g, `{t('loc.maps.desc')}`);
fs.writeFileSync('src/components/Location.tsx', locCode);

// TheorySchedule.tsx
let theoryCode = fs.readFileSync('src/components/TheorySchedule.tsx', 'utf8');
theoryCode = theoryCode.replace(/>Wochentag</g, `>{t('theory.weekday')}<`);
fs.writeFileSync('src/components/TheorySchedule.tsx', theoryCode);

// Footer.tsx
let footerCode = fs.readFileSync('src/components/Footer.tsx', 'utf8');
footerCode = footerCode.replace(/>Impressum</g, `>{t('footer.legal_links.imp')}<`);
footerCode = footerCode.replace(/>Datenschutz</g, `>{t('footer.legal_links.ds')}<`);
footerCode = footerCode.replace(/>AGB</g, `>{t('footer.legal_links.agb')}<`);
fs.writeFileSync('src/components/Footer.tsx', footerCode);

