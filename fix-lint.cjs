const fs = require('fs');
const filePath = 'src/context/AeirmistContext.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The error shows things like: error TS2304: Cannot find name 'uid'.
// and error TS18004: No value exists in scope for the shorthand property 'banStatus'
// It seems there are logs or objects trying to use { uid, banStatus } where they don't exist.

// Let's replace any literal "{ uid, banStatus }" with an empty string or comment it out if it's in a log
content = content.replace(/, \{ uid, banStatus \}/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed lint issues');
