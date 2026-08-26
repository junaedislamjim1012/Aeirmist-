const fs = require('fs');
const filePath = 'src/context/AeirmistContext.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace the fallback throw message
content = content.replace(
  /if \(!resolvedEmail\) \{\s*throw new Error\("That username or email doesn't match an account\."\);\s*\}/,
  `if (!resolvedEmail) {\n        throw new Error("No account found matching this username. Please double-check the spelling, or log in with your email address instead.");\n      }`
);

// Replace the end of loginWithEmail error catching
const oldErrCatch = `      if (code.includes('user-not-found')) {
        throw new Error("That username or email doesn't match an account.");
      }
      if (code.includes('too-many-requests')) {
        throw new Error("Too many failed attempts. Access to this account is temporarily paused for security. Please try again later.");
      }
        
      // Pass clean message or handle through auth error handler
      const mappedErr = handleAuthError(err, 'loginWithEmail');
      const mappedMsg = mappedErr?.message || '';
      if (mappedMsg.includes('password') || mappedMsg.includes('Password')) {
        throw new Error("Incorrect password. Please try again.");
      }
      throw new Error("That username or email doesn't match an account.");`;

content = content.replace(oldErrCatch, '      throw handleAuthError(err, \'loginWithEmail\');');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed AeirmistContext.tsx');
