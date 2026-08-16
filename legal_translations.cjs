const fs = require('fs');

const deAdditions = {
  legal: {
    tabs: {
      impressum: "Impressum",
      datenschutz: "Datenschutz",
      agb: "AGB"
    },
    imp: {
      angaben: "Angaben gemäß § 5 TMG",
      vertretung: "Vertreten durch",
      kontakt: "Kontakt",
      register: "Registereintrag",
      ust: "Umsatzsteuer-ID",
      verantwortlich: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV"
    },
    ds: {
      t1: "1. Datenschutz auf einen Blick",
      t1_1: "Allgemeine Hinweise",
      t1_p: "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.",
      t2: "2. Datenerfassung auf unserer Website",
      t2_1: "Wer ist verantwortlich für die Datenerfassung?",
      t2_1p: "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.",
      t2_2: "Wie erfassen wir Ihre Daten?",
      t2_2p: "Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst.",
      t3: "3. Analyse-Tools und Tools von Drittanbietern",
      t3_p: "Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel anonym.",
      t4: "4. Ihre Rechte",
      t4_p: "Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen."
    },
    agb: {
      title: "Allgemeine Geschäftsbedingungen",
      stand: "Stand: [Datum einfügen]",
      p1: "§ 1 Geltungsbereich",
      p1_t: "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über die Fahrausbildung zwischen der Fahrschule Bär (im Folgenden „Fahrschule“) und dem Fahrschüler.",
      p2: "§ 2 Bestandteil der Ausbildung",
      p2_t: "Die Fahrausbildung umfasst theoretischen und praktischen Fahrunterricht gemäß den gesetzlichen Bestimmungen. Die Fahrschule verpflichtet sich, den Fahrschüler gewissenhaft auf die Fahrerlaubnisprüfung vorzubereiten.",
      p3: "§ 3 Entgelte und Zahlungsbedingungen",
      p3_t: "1. Die Entgelte für die Fahrausbildung richten sich nach der bei Vertragsabschluss gültigen Preisliste.<br /><br />2. Der Grundbetrag ist bei Vertragsabschluss fällig. Fahrstunden sind grundsätzlich vor Fahrtantritt zu bezahlen.",
      p4: "§ 4 Absage von Fahrstunden",
      p4_t: "Vereinbarte Fahrstunden können bis zu [48 Stunden] vor Beginn kostenfrei abgesagt werden. Bei späteren Absagen behält sich die Fahrschule vor, [X %] des Fahrstundenentgelts in Rechnung zu stellen, sofern der Termin nicht anderweitig vergeben werden konnte.",
      p5: "§ 5 Kündigung",
      p5_t: "Der Ausbildungsvertrag kann von beiden Seiten unter Einhaltung einer Frist von [2 Wochen] gekündigt werden. Ein wichtiger Grund zur fristlosen Kündigung bleibt hiervon unberührt."
    }
  }
};

const ruAdditions = {
  legal: {
    tabs: {
      impressum: "Импрессум",
      datenschutz: "Защита данных",
      agb: "Общие условия (AGB)"
    },
    imp: {
      angaben: "Информация согласно § 5 TMG",
      vertretung: "В лице",
      kontakt: "Контакты",
      register: "Запись в реестре",
      ust: "ИНН плательщика НДС",
      verantwortlich: "Ответственный за содержание согласно § 55 абз. 2 RStV"
    },
    ds: {
      t1: "1. Защита данных: краткий обзор",
      t1_1: "Общие указания",
      t1_p: "Следующие указания дают простой обзор того, что происходит с вашими персональными данными при посещении нашего сайта. Персональные данные — это любые данные, с помощью которых вас можно лично идентифицировать.",
      t2: "2. Сбор данных на нашем сайте",
      t2_1: "Кто несет ответственность за сбор данных?",
      t2_1p: "Обработка данных на этом сайте осуществляется оператором сайта. Его контактные данные вы можете найти в разделе «Импрессум» этого сайта.",
      t2_2: "Как мы собираем ваши данные?",
      t2_2p: "Ваши данные собираются, во-первых, когда вы их нам сообщаете. Это могут быть, например, данные, которые вы вводите в контактную форму. Другие данные автоматически собираются нашими ИТ-системами при посещении сайта.",
      t3: "3. Инструменты анализа и сторонние инструменты",
      t3_p: "При посещении нашего сайта ваше поведение в интернете может быть статистически оценено. В основном это происходит с помощью файлов cookie и так называемых программ анализа. Анализ вашего поведения в интернете обычно осуществляется анонимно.",
      t4: "4. Ваши права",
      t4_p: "Вы в любое время имеете право бесплатно получить информацию о происхождении, получателях и цели сохранения ваших персональных данных. Вы также имеете право потребовать исправления, блокировки или удаления этих данных."
    },
    agb: {
      title: "Общие коммерческие условия",
      stand: "По состоянию на: [Вставить дату]",
      p1: "§ 1 Область применения",
      p1_t: "Настоящие Общие коммерческие условия (AGB) применяются ко всем договорам на обучение вождению между Автошколой Bär (далее «Автошкола») и учеником.",
      p2: "§ 2 Состав обучения",
      p2_t: "Обучение вождению включает теоретические и практические занятия в соответствии с требованиями законодательства. Автошкола обязуется добросовестно подготовить ученика к экзамену на получение водительских прав.",
      p3: "§ 3 Оплата и условия оплаты",
      p3_t: "1. Стоимость обучения вождению определяется согласно прейскуранту, действующему на момент заключения договора.<br /><br />2. Базовая сумма подлежит оплате при заключении договора. Практические занятия, как правило, оплачиваются до начала поездки.",
      p4: "§ 4 Отмена практических занятий",
      p4_t: "Согласованные часы вождения могут быть бесплатно отменены за [48 часов] до начала. При более поздней отмене автошкола оставляет за собой право выставить счет на [X %] от стоимости занятия, если это время не удалось передать другому ученику.",
      p5: "§ 5 Расторжение договора",
      p5_t: "Договор на обучение может быть расторгнут обеими сторонами с соблюдением срока уведомления в [2 недели]. Это не затрагивает наличие веской причины для расторжения договора без соблюдения сроков."
    }
  }
};

let de = JSON.parse(fs.readFileSync('src/locales/de.json', 'utf8'));
let ru = JSON.parse(fs.readFileSync('src/locales/ru.json', 'utf8'));

de = { ...de, ...deAdditions };
ru = { ...ru, ...ruAdditions };

fs.writeFileSync('src/locales/de.json', JSON.stringify(de, null, 2));
fs.writeFileSync('src/locales/ru.json', JSON.stringify(ru, null, 2));

