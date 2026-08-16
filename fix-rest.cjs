const fs = require('fs');

// Fix FAQ.tsx
let faqCode = fs.readFileSync('src/components/FAQ.tsx', 'utf8');
faqCode = faqCode.replace(/\{faq\.q\}/g, `{t(\`faq.items.\${i + 1}.q\`, { defaultValue: faq.q })}`);
faqCode = faqCode.replace(/\{faq\.a\}/g, `{t(\`faq.items.\${i + 1}.a\`, { defaultValue: faq.a })}`);
fs.writeFileSync('src/components/FAQ.tsx', faqCode);

// Fix USPs.tsx
let uspsCode = fs.readFileSync('src/components/USPs.tsx', 'utf8');
// The USPs currently do:
// t(\`usps.items.\${index + 1}.title\`)
// t(\`usps.items.\${index + 1}.desc\`)
// This is already perfectly using the translator! I don't need to change USPs.tsx.
