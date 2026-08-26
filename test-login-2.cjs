const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, query, collection, where, getDocs } = require('firebase/firestore');
const firebaseConfig = require('./firebase-applet-config.json');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  const username = 'junaed_islam_jim9';
  console.log('Resolving username:', username);
  
  const indexSnap = await getDoc(doc(db, 'usernames', username));
  console.log('indexSnap.exists():', indexSnap.exists());
  if (indexSnap.exists()) {
    console.log('indexSnap.data():', indexSnap.data());
  } else {
    console.log('Document does not exist for username:', username);
  }
  
  process.exit(0);
}

check().catch(console.error);
