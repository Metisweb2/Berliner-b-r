const fs = require('fs');

let legalCode = fs.readFileSync('src/pages/Legal.tsx', 'utf8');

// Add import if not exists
if (!legalCode.includes('useTranslation')) {
  legalCode = legalCode.replace("import { motion", "import { useTranslation } from 'react-i18next';\nimport { motion");
}

legalCode = legalCode.replace(/const TABS = \[[\s\S]*?\];/, 
`const getTabs = (t) => [
  { id: 'impressum', label: t('legal.tabs.impressum'), path: '/impressum' },
  { id: 'datenschutz', label: t('legal.tabs.datenschutz'), path: '/datenschutz' },
  { id: 'agb', label: t('legal.tabs.agb'), path: '/agb' },
];`);

legalCode = legalCode.replace(/function ImpressumContent\(\) \{/, 
`function ImpressumContent() {
  const { t } = useTranslation();`);

legalCode = legalCode.replace(/Angaben gemäß § 5 TMG/g, `{t('legal.imp.angaben')}`);
legalCode = legalCode.replace(/Vertreten durch/g, `{t('legal.imp.vertretung')}`);
legalCode = legalCode.replace(/>Kontakt</g, `>{t('legal.imp.kontakt')}<`);
legalCode = legalCode.replace(/Registereintrag/g, `{t('legal.imp.register')}`);
legalCode = legalCode.replace(/Umsatzsteuer-ID/g, `{t('legal.imp.ust')}`);
legalCode = legalCode.replace(/Verantwortlich für den Inhalt nach § 55 Abs\. 2 RStV/g, `{t('legal.imp.verantwortlich')}`);


legalCode = legalCode.replace(/function DatenschutzContent\(\) \{/, 
`function DatenschutzContent() {
  const { t } = useTranslation();`);
legalCode = legalCode.replace(/1\. Datenschutz auf einen Blick/g, `{t('legal.ds.t1')}`);
legalCode = legalCode.replace(/Allgemeine Hinweise/g, `{t('legal.ds.t1_1')}`);
legalCode = legalCode.replace(/Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen\. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können\./g, `{t('legal.ds.t1_p')}`);
legalCode = legalCode.replace(/2\. Datenerfassung auf unserer Website/g, `{t('legal.ds.t2')}`);
legalCode = legalCode.replace(/Wer ist verantwortlich für die Datenerfassung\?/g, `{t('legal.ds.t2_1')}`);
legalCode = legalCode.replace(/Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber\. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen\./g, `{t('legal.ds.t2_1p')}`);
legalCode = legalCode.replace(/Wie erfassen wir Ihre Daten\?/g, `{t('legal.ds.t2_2')}`);
legalCode = legalCode.replace(/Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen\. Hierbei kann es sich z\.B\. um Daten handeln, die Sie in ein Kontaktformular eingeben\. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst\./g, `{t('legal.ds.t2_2p')}`);
legalCode = legalCode.replace(/3\. Analyse-Tools und Tools von Drittanbietern/g, `{t('legal.ds.t3')}`);
legalCode = legalCode.replace(/Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden\. Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen\. Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel anonym\./g, `{t('legal.ds.t3_p')}`);
legalCode = legalCode.replace(/4\. Ihre Rechte/g, `{t('legal.ds.t4')}`);
legalCode = legalCode.replace(/Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten\. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen\./g, `{t('legal.ds.t4_p')}`);


legalCode = legalCode.replace(/function AGBContent\(\) \{/, 
`function AGBContent() {
  const { t } = useTranslation();`);
legalCode = legalCode.replace(/Allgemeine Geschäftsbedingungen/g, `{t('legal.agb.title')}`);
legalCode = legalCode.replace(/Stand: \[Datum einfügen\]/g, `{t('legal.agb.stand')}`);
legalCode = legalCode.replace(/§ 1 Geltungsbereich/g, `{t('legal.agb.p1')}`);
legalCode = legalCode.replace(/Diese Allgemeinen Geschäftsbedingungen \(AGB\) gelten für alle Verträge über die Fahrausbildung zwischen der Fahrschule Bär \(im Folgenden „Fahrschule“\) und dem Fahrschüler\./g, `{t('legal.agb.p1_t')}`);
legalCode = legalCode.replace(/§ 2 Bestandteil der Ausbildung/g, `{t('legal.agb.p2')}`);
legalCode = legalCode.replace(/Die Fahrausbildung umfasst theoretischen und praktischen Fahrunterricht gemäß den gesetzlichen Bestimmungen\. Die Fahrschule verpflichtet sich, den Fahrschüler gewissenhaft auf die Fahrerlaubnisprüfung vorzubereiten\./g, `{t('legal.agb.p2_t')}`);
legalCode = legalCode.replace(/§ 3 Entgelte und Zahlungsbedingungen/g, `{t('legal.agb.p3')}`);
legalCode = legalCode.replace(/1\. Die Entgelte für die Fahrausbildung richten sich nach der bei Vertragsabschluss gültigen Preisliste\.<br \/><br \/>\s*2\. Der Grundbetrag ist bei Vertragsabschluss fällig\. Fahrstunden sind grundsätzlich vor Fahrtantritt zu bezahlen\./g, `<span dangerouslySetInnerHTML={{__html: t('legal.agb.p3_t')}} />`);
legalCode = legalCode.replace(/§ 4 Absage von Fahrstunden/g, `{t('legal.agb.p4')}`);
legalCode = legalCode.replace(/Vereinbarte Fahrstunden können bis zu \[48 Stunden\] vor Beginn kostenfrei abgesagt werden\. Bei späteren Absagen behält sich die Fahrschule vor, \[X %\] des Fahrstundenentgelts in Rechnung zu stellen, sofern der Termin nicht anderweitig vergeben werden konnte\./g, `{t('legal.agb.p4_t')}`);
legalCode = legalCode.replace(/§ 5 Kündigung/g, `{t('legal.agb.p5')}`);
legalCode = legalCode.replace(/Der Ausbildungsvertrag kann von beiden Seiten unter Einhaltung einer Frist von \[2 Wochen\] gekündigt werden\. Ein wichtiger Grund zur fristlosen Kündigung bleibt hiervon unberührt\./g, `{t('legal.agb.p5_t')}`);

// In Legal component
legalCode = legalCode.replace(
  "export function Legal() {",
  `export function Legal() {\n  const { t } = useTranslation();\n  const TABS = getTabs(t);`
);
legalCode = legalCode.replace(/TABS\.find/g, `TABS.find`);

fs.writeFileSync('src/pages/Legal.tsx', legalCode);

