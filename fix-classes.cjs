const fs = require('fs');

let code = fs.readFileSync('src/components/Classes.tsx', 'utf8');

// Add defaultValue to title
code = code.replace(/\{t\(\`classes\.items\.\$\{cls\.id\}\.title\`\)\}/g, 
  `{t(\`classes.items.\${cls.id}.title\`, { defaultValue: cls.title })}`);

// Add defaultValue to desc
code = code.replace(/\{t\(\`classes\.items\.\$\{cls\.id\}\.desc\`\)\}/g, 
  `{t(\`classes.items.\${cls.id}.desc\`, { defaultValue: cls.desc })}`);

fs.writeFileSync('src/components/Classes.tsx', code);
