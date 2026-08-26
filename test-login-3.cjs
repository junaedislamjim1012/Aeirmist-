const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, query, collection, where, getDocs } = require('firebase/firestore');
const firebaseConfig = require('./firebase-applet-config.json');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  const uid = 'iFqvwxqejCSte6K24gJe5ZE4NTo1';
  console.log('Resolving uid:', uid);
  
  const userSnap = await getDoc(doc(db, 'users', uid));
  console.log('userSnap.exists():', userSnap.exists());
  if (userSnap.exists()) {
    console.log('userSnap.data():', userSnap.data());
  } else {
    console.log('Document does not exist for user:', uid);
  }
  
  const profileSnap = await getDoc(doc(db, 'profiles', uid));
  console.log('profileSnap.exists():', profileSnap.exists());
  if (profileSnap.exists()) {
    console.log('profileSnap.data():', profileSnap.data());
  }
  
  process.exit(0);
}

check().catch(console.error);
