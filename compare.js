const fs = require('fs');

const flatten = (obj, prefix = '') => {
  let res = {};
  for (const k of Object.keys(obj)) {
    const val = obj[k];
    const newPrefix = prefix ? `${prefix}.${k}` : k;
    if (typeof val === 'object' && val !== null) {
      Object.assign(res, flatten(val, newPrefix));
    } else {
      res[newPrefix] = val;
    }
  }
  return res;
};

const de = JSON.parse(fs.readFileSync('src/locales/de.json', 'utf8'));
const ru = JSON.parse(fs.readFileSync('src/locales/ru.json', 'utf8'));

const flatDe = flatten(de);
const flatRu = flatten(ru);

let missingInRu = [];
let missingInDe = [];

for (const k of Object.keys(flatDe)) {
  if (!(k in flatRu)) {
    missingInRu.push(k);
  }
}

for (const k of Object.keys(flatRu)) {
  if (!(k in flatDe)) {
    missingInDe.push(k);
  }
}

console.log('Missing in RU:', missingInRu);
console.log('Missing in DE:', missingInDe);
