const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, getDoc, query, collection, where, getDocs } = require('firebase/firestore');
const firebaseConfig = require('./firebase-applet-config.json');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function attemptLogin() {
  const username = 'junaed_islam_jim9';
  console.log('Resolving username:', username);
  
  let resolvedEmail = null;
  const indexSnap = await getDoc(doc(db, 'usernames', username));
  if (indexSnap.exists()) {
    const indexData = indexSnap.data();
    if (indexData.email) resolvedEmail = indexData.email;
    else if (indexData.recoveryEmail) resolvedEmail = indexData.recoveryEmail;
    else if (indexData.personalEmail) resolvedEmail = indexData.personalEmail;
    if (resolvedEmail) console.log('Found email via index:', resolvedEmail);
  }
  
  if (!resolvedEmail) {
    const qUsersNorm = query(collection(db, 'users'), where('usernameNormalized', '==', username));
    const sUsersNorm = await getDocs(qUsersNorm);
    if (!sUsersNorm.empty) {
      const uData = sUsersNorm.docs[0].data();
      if (uData.email) resolvedEmail = uData.email;
      else if (uData.recoveryEmail) resolvedEmail = uData.recoveryEmail;
      else if (uData.personalEmail) resolvedEmail = uData.personalEmail;
    }
  }

  if (!resolvedEmail) {
    console.log('Error: No account found matching this username. Please double-check the spelling, or log in with your email address instead.');
    process.exit(1);
  }

  console.log('Attempting sign in for resolved email:', resolvedEmail);
  try {
    const credentials = await signInWithEmailAndPassword(auth, resolvedEmail, 'testpassword123'); // Deliberately wrong password
    console.log('Login success!', credentials.user.uid);
  } catch (err) {
    console.log('Login failed!');
    console.log('Error Code:', err.code);
    console.log('Error Message:', err.message);
  }
  
  process.exit(0);
}

attemptLogin().catch(console.error);
