const fs = require('fs');

let code = fs.readFileSync('src/components/CreatorFeed.tsx', 'utf8');

// Import React
if (!code.includes("import React,")) {
  code = code.replace("import { useEffect, useState, useRef } from 'react';", "import React, { useEffect, useState, useRef } from 'react';");
}
fs.writeFileSync('src/components/CreatorFeed.tsx', code);
