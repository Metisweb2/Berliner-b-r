const fs = require('fs');

let code = fs.readFileSync('src/pages/KlasseDetail.tsx', 'utf8');

// Insert upperId declaration
code = code.replace(/const data = classDetails\[id\];/, 'const data = classDetails[id];\n  const upperId = id.toUpperCase();');

// Fix title/subtitle/desc
code = code.replace(/\{t\(\`classes\.items\.\$\{id\}\.title\`, \{ defaultValue: data\.title \}\)\.replace\('Klasse ', ''\)\.replace\('Категория ', ''\)\}/g, 
  `{t(\`classes.items.\${upperId}.title\`, { defaultValue: data.title }).replace('Klasse ', '').replace('Категория ', '')}`);

code = code.replace(/\{t\(\`classes\.items\.\$\{id\}\.title\`, \{ defaultValue: data\.title \}\)\}/g, 
  `{t(\`classes.items.\${upperId}.title\`, { defaultValue: data.title })}`);

code = code.replace(/\{t\(\`classes\.items\.\$\{id\}\.subtitle\`, \{ defaultValue: data\.subtitle \}\)\}/g, 
  `{t(\`classes.items.\${upperId}.subtitle\`, { defaultValue: data.subtitle })}`);

code = code.replace(/\{t\(\`classes\.items\.\$\{id\}\.desc\`, \{ defaultValue: data\.description \}\)\}/g, 
  `{t(\`classes.items.\${upperId}.desc\`, { defaultValue: data.description })}`);

// Fix requirements map
code = code.replace(/<span>\{req\}<\/span>/, 
  `<span>{t(\`classes.items.\${upperId}.requirements.\${i}\`, { defaultValue: req })}</span>`);

// Fix theory map
code = code.replace(/<span>\{item\}<\/span>/, 
  `<span>{t(\`classes.items.\${upperId}.theory.\${i}\`, { defaultValue: item })}</span>`);

// Fix practice map
code = code.replace(/<span className="text-neutral-200">\{item\}<\/span>/, 
  `<span className="text-neutral-200">{t(\`classes.items.\${upperId}.practice.\${i}\`, { defaultValue: item })}</span>`);

fs.writeFileSync('src/pages/KlasseDetail.tsx', code);
