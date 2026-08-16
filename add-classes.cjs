const fs = require('fs');
const file = 'src/locales/de.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

data.classes.items.BE = {
  title: "Klasse BE",
  desc: "Anhängerführerschein. Für Kombinationen über 3.500 kg zGG.",
  requirements: [
    "Vorbesitz der Klasse B",
    "Lichtbild (biometrisch)",
    "Sehtest"
  ],
  theory: [
    "Keine Theorieprüfung erforderlich!"
  ],
  practice: [
    "Grundausbildung nach Bedarf",
    "3 Sonderfahrten Überland (à 45 Min.)",
    "1 Sonderfahrt Autobahn (à 45 Min.)",
    "1 Sonderfahrt bei Dunkelheit (à 45 Min.)",
    "Praktische Prüfung (45 Minuten)"
  ]
};

data.classes.items.B96 = {
  title: "Klasse B96",
  desc: "Schwere Anhänger. Für Kombinationen bis 4.250 kg zGG.",
  requirements: [
    "Vorbesitz der Klasse B",
    "Keine Prüfungen erforderlich!"
  ],
  theory: [
    "2,5 Stunden theoretische Schulung"
  ],
  practice: [
    "3,5 Stunden praktische Übungen",
    "1 Stunde fahrpraktische Übung im Realverkehr",
    "Teilnahmebescheinigung reicht zur Vorlage bei der Führerscheinstelle"
  ]
};

fs.writeFileSync(file, JSON.stringify(data, null, 2));
