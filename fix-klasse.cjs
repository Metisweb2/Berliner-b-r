const fs = require('fs');

let code = fs.readFileSync('src/pages/KlasseDetail.tsx', 'utf8');

// I will just replace data.title with t(\`classes.items.\${id}.title\`) 
// and data.subtitle with t(\`classes.items.\${id}.subtitle\`) etc.

code = code.replace(/\{data\.title\}/g, `{t(\`classes.items.\${id}.title\`, { defaultValue: data.title })}`);
code = code.replace(/\{data\.title\.replace\('Klasse ', ''\)\}/g, `{t(\`classes.items.\${id}.title\`, { defaultValue: data.title }).replace('Klasse ', '').replace('Категория ', '')}`);
code = code.replace(/\{data\.subtitle\}/g, `{t(\`classes.items.\${id}.subtitle\`, { defaultValue: data.subtitle })}`);
code = code.replace(/\{data\.description\}/g, `{t(\`classes.items.\${id}.desc\`, { defaultValue: data.description })}`);

fs.writeFileSync('src/pages/KlasseDetail.tsx', code);
