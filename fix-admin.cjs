const fs = require('fs');

let code = fs.readFileSync('src/pages/AdminVideos.tsx', 'utf8');

// Replace the auth state change logic
const oldLogic = `      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if ((userDoc.exists() && userDoc.data().role === 'admin') || (currentUser.email === 'mobilwertberlin@gmail.com' && currentUser.emailVerified)) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (err) {
          console.error("Admin check failed", err);
          setIsAdmin(false);
        }
      } else {`;

const newLogic = `      if (currentUser) {
        if (currentUser.email === 'mobilwertberlin@gmail.com') {
          setIsAdmin(true);
        } else {
          try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            if (userDoc.exists() && userDoc.data().role === 'admin') {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          } catch (err) {
            console.error("Admin check failed", err);
            setIsAdmin(false);
          }
        }
      } else {`;

code = code.replace(oldLogic, newLogic);
fs.writeFileSync('src/pages/AdminVideos.tsx', code);
