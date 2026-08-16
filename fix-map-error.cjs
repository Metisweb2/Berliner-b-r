const fs = require('fs');
let code = fs.readFileSync('src/components/Location.tsx', 'utf-8');

// Add useState to react imports if not present
if (!code.includes('useState')) {
  code = code.replace(
    "import { useTranslation } from 'react-i18next';",
    "import { useTranslation } from 'react-i18next';\nimport { useState } from 'react';"
  );
}

// Add state for mapError
code = code.replace(
  "const { t } = useTranslation();",
  "const { t } = useTranslation();\n  const [mapError, setMapError] = useState(false);"
);

// Update hasValidKey check to also consider mapError
code = code.replace(
  "{hasValidKey ? (",
  "{hasValidKey && !mapError ? ("
);

// Add onError to APIProvider
code = code.replace(
  '<APIProvider apiKey={API_KEY} version="weekly">',
  '<APIProvider apiKey={API_KEY} version="weekly" onLoad={() => console.log("Map Loaded")} onError={() => setMapError(true)}>'
);

fs.writeFileSync('src/components/Location.tsx', code);
