const fs = require('fs');

const deAdditions = {
  reg: {
    form: {
      classes: {
        b: "Klasse B / B197",
        be: "Klasse BE",
        a: "Klasse A / A2 / A1",
        am: "Klasse AM"
      },
      msg: "Nachricht (Optional)",
      submit: "Anmeldung absenden",
      title_q: "Führerschein?"
    }
  },
  loc: {
    address_line: "Musterstraße 123",
    city_line: "12345 Musterstadt",
    hours_title: "Öffnungszeiten & Anmeldung"
  }
};

const ruAdditions = {
  reg: {
    form: {
      classes: {
        b: "Категория B / B197",
        be: "Категория BE",
        a: "Категория A / A2 / A1",
        am: "Категория AM"
      },
      msg: "Сообщение (Необязательно)",
      submit: "Отправить заявку",
      title_q: "Водительские права?"
    }
  },
  loc: {
    address_line: "Musterstraße 123", // Keep in German for address, or translate? Better translate the placeholders
    city_line: "12345 Musterstadt",
    hours_title: "Часы работы и запись"
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

// Update Registration.tsx
let regCode = fs.readFileSync('src/components/Registration.tsx', 'utf8');
regCode = regCode.replace(/>Führerschein\?</g, `>{t('reg.form.title_q')}<`);
regCode = regCode.replace(/>Nachricht \(Optional\)</g, `>{t('reg.form.msg')}<`);
regCode = regCode.replace(/Anmeldung absenden/g, `{t('reg.form.submit')}`);
regCode = regCode.replace(/>Klasse B \/ B197</g, `>{t('reg.form.classes.b')}<`);
regCode = regCode.replace(/>Klasse A \/ A2 \/ A1</g, `>{t('reg.form.classes.a')}<`);
fs.writeFileSync('src/components/Registration.tsx', regCode);

// Update Location.tsx
let locCode = fs.readFileSync('src/components/Location.tsx', 'utf8');
locCode = locCode.replace(/Musterstraße 123/g, `{t('loc.address_line')}`);
locCode = locCode.replace(/12345 Musterstadt/g, `{t('loc.city_line')}`);
locCode = locCode.replace(/Öffnungszeiten & Anmeldung/g, `{t('loc.hours_title')}`);
fs.writeFileSync('src/components/Location.tsx', locCode);

