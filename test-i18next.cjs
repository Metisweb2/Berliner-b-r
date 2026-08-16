const i18next = require('i18next');
const de = require('./src/locales/de.json');

i18next.init({
  resources: { de: { translation: de } },
  lng: 'de',
  fallbackLng: 'de'
}).then(() => {
  console.log('B96 title:', i18next.t('classes.items.B96.title'));
});
