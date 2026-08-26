const fs = require('fs');
const filePath = 'src/context/AeirmistContext.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `      const code = String(err?.code || '').toLowerCase();
      if (code.includes('wrong-password') || code.includes('invalid-credential')) {
        throw new Error("Incorrect password. Please try again.");
      }
      if (code.includes('user-not-found')) {
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

if (content.includes(targetStr)) {
  content = content.replace(targetStr, `      throw handleAuthError(err, 'loginWithEmail');`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Successfully replaced exact string block.");
} else {
  console.log("String did not match.");
}
