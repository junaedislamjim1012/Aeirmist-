const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, collection, query, where, getDocs } = require('firebase/firestore');

const firebaseConfig = require('./firebase-applet-config.json');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  const normName = 'junaed_islam_jim9';
  console.log('--- Checking usernames/' + normName + ' ---');
  const d = await getDoc(doc(db, 'usernames', normName));
  console.log('Exists?', d.exists());
  if (d.exists()) console.log('Data:', d.data());

  console.log('\n--- Checking profiles by usernameNormalized ---');
  const pQ = query(collection(db, 'profiles'), where('usernameNormalized', '==', normName));
  const pS = await getDocs(pQ);
  console.log('Profiles found:', pS.size);
  pS.forEach(d => console.log('Profile', d.id, d.data()));

  console.log('\n--- Checking users by usernameNormalized ---');
  const uQ = query(collection(db, 'users'), where('usernameNormalized', '==', normName));
  const uS = await getDocs(uQ);
  console.log('Users found:', uS.size);
  uS.forEach(d => console.log('User', d.id, d.data()));

  process.exit(0);
}

check().catch(console.error);
