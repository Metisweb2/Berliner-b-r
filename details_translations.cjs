const fs = require('fs');

const deAdditions = {
  about: {
    title: "Wir sind Fahrschule Bär.",
    p1: "Unser Name ist Programm: Der Bär steht für <strong className=\"text-white\">Stärke, Ruhe und Souveränität</strong>. Genau das vermitteln wir dir in unserer Ausbildung. Bei uns lernst du nicht in Hektik, sondern mit System und Geduld.",
    p2: "Wir glauben daran, dass eine gute Fahrausbildung mehr ist als das reine Bestehen einer Prüfung. Es geht darum, dich auf den realen Straßenverkehr vorzubereiten – damit du in jeder Situation einen kühlen Kopf bewahrst und sicher ankommst.",
    p3: "Mit modernen Lehrmethoden, einem hochklassigen Fuhrpark und einem Team, das seinen Beruf liebt, machen wir deinen Weg zum Führerschein zu einem positiven und unvergesslichen Erlebnis.",
    exp: "Jahre Erfahrung<br/>in der Ausbildung",
    rate: "Erfolgsquote",
    quality: "Geprüfte Qualität",
    team_title: "Unser Team"
  },
  kdetails: {
    back: "Zurück zur Übersicht",
    req: "Voraussetzungen",
    theory: "Theorie",
    practice: "Praktische Ausbildung",
    register_for: "Jetzt anmelden für"
  }
};

const ruAdditions = {
  about: {
    title: "Мы — автошкола Bär.",
    p1: "Наше название говорит само за себя: медведь (Bär) символизирует <strong className=\"text-white\">силу, спокойствие и уверенность</strong>. Именно это мы передаем вам во время обучения. У нас вы учитесь не в спешке, а системно и с терпением.",
    p2: "Мы верим, что хорошее обучение вождению — это больше, чем просто сдача экзамена. Речь идет о том, чтобы подготовить вас к реальному дорожному движению, чтобы вы сохраняли хладнокровие в любой ситуации и добирались до места безопасно.",
    p3: "Благодаря современным методам обучения, высококлассному автопарку и команде, которая любит свою работу, мы делаем ваш путь к водительским правам позитивным и незабываемым опытом.",
    exp: "Лет опыта<br/>в обучении",
    rate: "Процент сдачи",
    quality: "Проверенное качество",
    team_title: "Наша команда"
  },
  kdetails: {
    back: "Вернуться к списку",
    req: "Требования",
    theory: "Теория",
    practice: "Практическое обучение",
    register_for: "Записаться на"
  }
};

let de = JSON.parse(fs.readFileSync('src/locales/de.json', 'utf8'));
let ru = JSON.parse(fs.readFileSync('src/locales/ru.json', 'utf8'));

de = { ...de, ...deAdditions };
ru = { ...ru, ...ruAdditions };

fs.writeFileSync('src/locales/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('src/locales/ru.json', JSON.stringify(ru, null, 2));

// Update About.tsx
let aboutCode = fs.readFileSync('src/components/About.tsx', 'utf8');
aboutCode = aboutCode.replace(
  "export function About() {",
  `import { useTranslation } from 'react-i18next';\n\nexport function About() {\n  const { t } = useTranslation();`
);
aboutCode = aboutCode.replace(/Wir sind Fahrschule Bär\./g, `{t('about.title')}`);
aboutCode = aboutCode.replace(/Unser Name ist Programm: Der Bär steht für <strong className="text-white">Stärke, Ruhe und Souveränität<\/strong>\. Genau das vermitteln wir dir in unserer Ausbildung\. Bei uns lernst du nicht in Hektik, sondern mit System und Geduld\./g, `<span dangerouslySetInnerHTML={{ __html: t('about.p1') }} />`);
aboutCode = aboutCode.replace(/Wir glauben daran, dass eine gute Fahrausbildung mehr ist als das reine Bestehen einer Prüfung\. Es geht darum, dich auf den realen Straßenverkehr vorzubereiten – damit du in jeder Situation einen kühlen Kopf bewahrst und sicher ankommst\./g, `{t('about.p2')}`);
aboutCode = aboutCode.replace(/Mit modernen Lehrmethoden, einem hochklassigen Fuhrpark und einem Team, das seinen Beruf liebt, machen wir deinen Weg zum Führerschein zu einem positiven und unvergesslichen Erlebnis\./g, `{t('about.p3')}`);
aboutCode = aboutCode.replace(/Jahre Erfahrung<br\/>in der Ausbildung/g, `<span dangerouslySetInnerHTML={{ __html: t('about.exp') }} />`);
aboutCode = aboutCode.replace(/Erfolgsquote/g, `{t('about.rate')}`);
aboutCode = aboutCode.replace(/Geprüfte Qualität/g, `{t('about.quality')}`);
fs.writeFileSync('src/components/About.tsx', aboutCode);

// Update Team.tsx
let teamCode = fs.readFileSync('src/components/Team.tsx', 'utf8');
teamCode = teamCode.replace(
  "export function Team() {",
  `import { useTranslation } from 'react-i18next';\n\nexport function Team() {\n  const { t } = useTranslation();`
);
teamCode = teamCode.replace(/Unser Team/g, `{t('about.team_title')}`);
fs.writeFileSync('src/components/Team.tsx', teamCode);

// Update KlasseDetail.tsx
let classCode = fs.readFileSync('src/pages/KlasseDetail.tsx', 'utf8');
classCode = classCode.replace(
  "export function KlasseDetail() {",
  `import { useTranslation } from 'react-i18next';\n\nexport function KlasseDetail() {\n  const { t } = useTranslation();`
);
classCode = classCode.replace(/Zurück zur Übersicht/g, `{t('kdetails.back')}`);
classCode = classCode.replace(/>Voraussetzungen</g, `>{t('kdetails.req')}<`);
classCode = classCode.replace(/>Theorie</g, `>{t('kdetails.theory')}<`);
classCode = classCode.replace(/>Praktische Ausbildung</g, `>{t('kdetails.practice')}<`);
classCode = classCode.replace(/Jetzt anmelden für /g, `{t('kdetails.register_for')} `);
fs.writeFileSync('src/pages/KlasseDetail.tsx', classCode);

