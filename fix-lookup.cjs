const fs = require('fs');
const filePath = 'src/context/AeirmistContext.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix authoritative index lookup
content = content.replace(
  `            if (indexData.email) {
              resolvedEmail = indexData.email;
              resolvedUid = indexData.uid || indexData.ownerUid || null;
              logger.info("[Diagnostics - Auth] Resolved via authoritative username index:", resolvedEmail);
            }`,
  `            if (indexData.email) {
              resolvedEmail = indexData.email;
            } else if (indexData.recoveryEmail) {
              resolvedEmail = indexData.recoveryEmail;
            } else if (indexData.personalEmail) {
              resolvedEmail = indexData.personalEmail;
            }
            if (resolvedEmail) {
              resolvedUid = indexData.uid || indexData.ownerUid || null;
              logger.info("[Diagnostics - Auth] Resolved via authoritative username index:", resolvedEmail);
            }`
);

// Fix backwards compat lookup 1 (qUsersNorm)
content = content.replace(
  `              if (uData.email) {
                resolvedEmail = uData.email;
                resolvedUid = sUsersNorm.docs[0].id || uData.uid;
              }`,
  `              if (uData.email) {
                resolvedEmail = uData.email;
              } else if (uData.recoveryEmail) {
                resolvedEmail = uData.recoveryEmail;
              } else if (uData.personalEmail) {
                resolvedEmail = uData.personalEmail;
              }
              if (resolvedEmail) {
                resolvedUid = sUsersNorm.docs[0].id || uData.uid;
              }`
);

// Fix backwards compat lookup 2 (qUsersRaw)
content = content.replace(
  `                if (uData.email) {
                  resolvedEmail = uData.email;
                  resolvedUid = sUsersRaw.docs[0].id || uData.uid;
                }`,
  `                if (uData.email) {
                  resolvedEmail = uData.email;
                } else if (uData.recoveryEmail) {
                  resolvedEmail = uData.recoveryEmail;
                } else if (uData.personalEmail) {
                  resolvedEmail = uData.personalEmail;
                }
                if (resolvedEmail) {
                  resolvedUid = sUsersRaw.docs[0].id || uData.uid;
                }`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed lookups');
