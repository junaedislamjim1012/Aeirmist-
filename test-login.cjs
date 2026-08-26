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
  if (indexSnap.exists() && indexSnap.data().email) {
    resolvedEmail = indexSnap.data().email;
    console.log('Found email via index:', resolvedEmail);
  }
  
  if (!resolvedEmail) {
    const qUsersNorm = query(collection(db, 'users'), where('usernameNormalized', '==', username));
    const sUsersNorm = await getDocs(qUsersNorm);
    if (!sUsersNorm.empty && sUsersNorm.docs[0].data().email) {
      resolvedEmail = sUsersNorm.docs[0].data().email;
    }
  }

  if (!resolvedEmail) {
    console.log('Error: No account found matching this username. Please double-check the spelling, or log in with your email address instead.');
    process.exit(1);
  }

  console.log('Attempting sign in for resolved email:', resolvedEmail);
  try {
    const credentials = await signInWithEmailAndPassword(auth, resolvedEmail, 'testpassword123');
    console.log('Login success!', credentials.user.uid);
  } catch (err) {
    console.log('Login failed!');
    console.log('Error Code:', err.code);
    console.log('Error Message:', err.message);
  }
  
  process.exit(0);
}

attemptLogin().catch(console.error);
