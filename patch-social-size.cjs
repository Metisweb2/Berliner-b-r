const fs = require('fs');
let code = fs.readFileSync('src/components/Footer.tsx', 'utf8');

code = code.replace(
  '<h4 className="text-white font-bold mb-5 text-xl">{t(\'footer.social\')}</h4>',
  '<h4 className="text-white font-bold mb-4 text-lg">{t(\'footer.social\')}</h4>'
);

code = code.replace(
  '<div className="flex gap-5">',
  '<div className="flex gap-4">'
);

code = code.replaceAll('w-7 h-7', 'w-5 h-5');

fs.writeFileSync('src/components/Footer.tsx', code);
