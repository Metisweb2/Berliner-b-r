const fs = require('fs');

// USPs.tsx
let uspsCode = fs.readFileSync('src/components/USPs.tsx', 'utf8');
uspsCode = uspsCode.replace(
  "export function USPs() {",
  `import { useTranslation } from 'react-i18next';\n\nexport function USPs() {\n  const { t } = useTranslation();`
);
uspsCode = uspsCode.replace(
  `Warum <span className="font-bold">Fahrschule Bär?</span>`,
  `{t('usps.title_start')}<span className="font-bold">{t('usps.title_highlight')}</span>`
);
uspsCode = uspsCode.replace(
  `Wir machen den Weg zu deinem Führerschein so einfach, entspannt und erfolgreich wie möglich. Deine Vorteile auf einen Blick:`,
  `{t('usps.desc')}`
);
uspsCode = uspsCode.replace(
  `{usp.title}`,
  `{t(\`usps.items.\${index + 1}.title\`)}`
);
uspsCode = uspsCode.replace(
  `{usp.description}`,
  `{t(\`usps.items.\${index + 1}.desc\`)}`
);
fs.writeFileSync('src/components/USPs.tsx', uspsCode);


// Pricing.tsx
let pricingCode = fs.readFileSync('src/components/Pricing.tsx', 'utf8');
pricingCode = pricingCode.replace(
  "export function Pricing() {",
  `import { useTranslation } from 'react-i18next';\n\nexport function Pricing() {\n  const { t } = useTranslation();`
);
pricingCode = pricingCode.replace(/Unsere Preise/g, `{t('pricing.subtitle')}`);
pricingCode = pricingCode.replace(/Transparent & Fair/g, `{t('pricing.title')}`);
pricingCode = pricingCode.replace(
  `{card.title}`,
  `{t(\`pricing.items.\${i + 1}.title\`)}`
);
pricingCode = pricingCode.replace(
  `{card.desc}`,
  `{t(\`pricing.items.\${i + 1}.desc\`)}`
);
pricingCode = pricingCode.replace(
  `<span className="text-sm text-neutral-500 font-light mb-1">ab</span>`,
  `<span className="text-sm text-neutral-500 font-light mb-1">{t(\`pricing.items.\${i + 1}.from\`)}</span>`
);
pricingCode = pricingCode.replace(
  `* Alle Preise verstehen sich inkl. der gesetzlichen MwSt. <br className="md:hidden" />          TÜV-Gebühren für Prüfungen werden separat erhoben. Stand 2024.`,
  `{t('pricing.disclaimer')}`
);
fs.writeFileSync('src/components/Pricing.tsx', pricingCode);


// Classes.tsx
let classesCode = fs.readFileSync('src/components/Classes.tsx', 'utf8');
classesCode = classesCode.replace(
  "export function Classes() {",
  `import { useTranslation } from 'react-i18next';\n\nexport function Classes() {\n  const { t } = useTranslation();`
);
classesCode = classesCode.replace(/Unser Ausbildungsangebot/g, `{t('classes.subtitle')}`);
classesCode = classesCode.replace(/Welche Klasse/g, `{t('classes.title1')}`);
classesCode = classesCode.replace(/möchtest du fahren\?/g, `{t('classes.title2')}`);
classesCode = classesCode.replace(
  `{cls.title}`,
  `{t(\`classes.items.\${cls.id}.title\`)}`
);
classesCode = classesCode.replace(
  `{cls.desc}`,
  `{t(\`classes.items.\${cls.id}.desc\`)}`
);
classesCode = classesCode.replace(
  /Mehr erfahren/g,
  `{t('classes.learn_more')}`
);
fs.writeFileSync('src/components/Classes.tsx', classesCode);


// Footer.tsx
let footerCode = fs.readFileSync('src/components/Footer.tsx', 'utf8');
footerCode = footerCode.replace(
  "export function Footer() {",
  `import { useTranslation } from 'react-i18next';\n\nexport function Footer() {\n  const { t } = useTranslation();`
);
footerCode = footerCode.replace(
  `Sicher fahren.<br/>Selbstbewusst ankommen.`,
  `{t('footer.slogan')}`
);
footerCode = footerCode.replace(/>Links</g, `>{t('footer.links')}<`);
footerCode = footerCode.replace(/>Rechtliches</g, `>{t('footer.legal')}<`);
footerCode = footerCode.replace(/>Social Media</g, `>{t('footer.social')}<`);
footerCode = footerCode.replace(
  /© \{new Date\(\)\.getFullYear\(\)\} Fahrschule Bär\. Alle Rechte vorbehalten\./g,
  `{t('footer.copyright')}`
);
footerCode = footerCode.replace(
  />Premium Fahrausbildung</g,
  `>{t('footer.premium')}<`
);
// Make sure to replace Startseite, Führerscheine, etc. in footer
footerCode = footerCode.replace(/>Startseite</g, `>{t('nav.start')}<`);
footerCode = footerCode.replace(/>Führerscheine</g, `>{t('nav.classes')}<`);
footerCode = footerCode.replace(/>Preise</g, `>{t('nav.pricing')}<`);
footerCode = footerCode.replace(/>Über uns</g, `>{t('nav.about')}<`);
footerCode = footerCode.replace(/>FAQ</g, `>{t('nav.faq')}<`);
footerCode = footerCode.replace(/>Kontakt</g, `>{t('nav.contact')}<`);

fs.writeFileSync('src/components/Footer.tsx', footerCode);

