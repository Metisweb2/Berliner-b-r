const fs = require('fs');

let code = fs.readFileSync('src/pages/AdminVideos.tsx', 'utf-8');

const oldLogin = `  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error(error);
      alert('Login fehlgeschlagen');
    }
  };`;

const newLogin = `  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error: any) {
      if (error?.code === 'auth/popup-closed-by-user' || error?.code === 'auth/cancelled-popup-request') {
        return;
      }
      console.error(error);
      alert('Login fehlgeschlagen');
    }
  };`;

if (code.includes(oldLogin)) {
  code = code.replace(oldLogin, newLogin);
  fs.writeFileSync('src/pages/AdminVideos.tsx', code);
  console.log('Successfully updated handleLogin');
} else {
  console.log('Could not find exact oldLogin block');
}
