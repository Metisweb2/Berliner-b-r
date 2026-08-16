const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');

const firebaseConfig = {
  projectId: "gen-lang-client-0341251218",
  appId: "1:939601148588:web:896112c437c5a665ba3d09",
  apiKey: "AIzaSyA7_11YBzHxrZrofqAvReTsGFbgJ5J0unw",
  authDomain: "gen-lang-client-0341251218.firebaseapp.com",
  storageBucket: "gen-lang-client-0341251218.firebasestorage.app",
  messagingSenderId: "939601148588"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-0a7f86b8-2fe5-4682-bcc8-8a467df76a70");

async function seed() {
  await addDoc(collection(db, 'videos'), {
    creatorName: 'fahrschule_baer_crew',
    description: 'Wenn du endlich den Führerschein hast und das erste Mal alleine fährst 🚗💨',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop',
    status: 'approved',
    userId: 'mock-user-1',
    createdAt: serverTimestamp()
  });

  await addDoc(collection(db, 'videos'), {
    creatorName: 'maxi_mustermann',
    description: 'Theorieprüfung bestanden! 🎉 Jetzt gehts ab in die Praxis. #fahrschule #berlin',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop',
    status: 'approved',
    userId: 'mock-user-1',
    createdAt: serverTimestamp()
  });

  await addDoc(collection(db, 'videos'), {
    creatorName: 'laura_drives',
    description: 'Mein erster Versuch beim Einparken... schaut selbst 🙈',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop',
    status: 'approved',
    userId: 'mock-user-1',
    createdAt: serverTimestamp()
  });

  await addDoc(collection(db, 'videos'), {
    creatorName: 'tom_on_wheels',
    description: 'POV: Dein Fahrlehrer sagt "Wir üben heute anfahren am Berg" 💀',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop',
    status: 'approved',
    userId: 'mock-user-1',
    createdAt: serverTimestamp()
  });

  await addDoc(collection(db, 'videos'), {
    creatorName: 'fahrschule_baer_crew',
    description: 'Motorrad-Ausbildung macht bei uns am meisten Spaß! 🏍️',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop',
    status: 'approved',
    userId: 'mock-user-1',
    createdAt: serverTimestamp()
  });

  console.log('Seeded!');
  process.exit(0);
}

seed().catch(console.error);
