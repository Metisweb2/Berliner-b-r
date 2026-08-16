const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

const app = initializeApp({
  credential: applicationDefault()
});
const auth = getAuth(app);
const db = getFirestore(app, 'ai-studio-0a7f86b8-2fe5-4682-bcc8-8a467df76a70');

async function run() {
  try {
    let user;
    try {
      user = await auth.getUserByEmail('mobilwertberlin@gmail.com');
      console.log('User UID:', user.uid);
    } catch(e) {
      if (e.code === 'auth/user-not-found') {
        console.log('User not found, creating user...');
        user = await auth.createUser({
          email: 'mobilwertberlin@gmail.com',
          emailVerified: true
        });
        console.log('Created user with UID:', user.uid);
      } else {
        throw e;
      }
    }
    
    await db.collection('users').doc(user.uid).set({ role: 'admin' }, { merge: true });
    console.log('Successfully made user admin!');
  } catch(e) {
    console.error('Error:', e);
  }
}
run();
