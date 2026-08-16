const fs = require('fs');
let code = fs.readFileSync('src/pages/KlasseDetail.tsx', 'utf-8');
code = code.replace(
  "export function KlasseDetail() {\n  const details = classDetails[id as string];\n  useSEO(details ? `Klasse ${details.title}` : 'Klassen', details ? details.description : 'Führerscheinklassen');\n  const { t } = useTranslation();\n  const { id } = useParams();",
  "export function KlasseDetail() {\n  const { id } = useParams();\n  const details = classDetails[id as string];\n  useSEO(details ? `Klasse ${details.title}` : 'Klassen', details ? details.description : 'Führerscheinklassen');\n  const { t } = useTranslation();"
);
fs.writeFileSync('src/pages/KlasseDetail.tsx', code);
