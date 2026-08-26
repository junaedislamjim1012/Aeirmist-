const fs = require('fs');
const appPath = 'src/App.tsx';
let content = fs.readFileSync(appPath, 'utf8');

// Add useRef to React import
content = content.replace(
  "import React, { useState, lazy, Suspense, useEffect } from 'react';",
  "import React, { useState, lazy, Suspense, useEffect, useRef } from 'react';"
);

// Destructure updateAppearanceSettings
content = content.replace(
  "const { settings } = useAppearance();",
  "const { settings, updateAppearanceSettings } = useAppearance();"
);

fs.writeFileSync(appPath, content, 'utf8');
console.log('Fixed App.tsx imports and destructuring');
