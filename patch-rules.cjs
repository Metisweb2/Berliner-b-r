const fs = require('fs');

const rules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Global Safety Net
    match /{document=**} {
      allow read, write: if false;
    }

    function isAdmin() {
      return request.auth != null && (
        (exists(/databases/$(database)/documents/users/$(request.auth.uid)) && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin') ||
        (request.auth.token.email == 'mobilwertberlin@gmail.com')
      );
    }
    
    function incoming() { return request.resource.data; }
    
    function isValidMessage() {
      return incoming().keys().hasAll(['name', 'email', 'phone', 'message', 'createdAt'])
        && incoming().keys().size() == 5
        && incoming().name is string && incoming().name.size() > 0 && incoming().name.size() <= 100
        && incoming().email is string && incoming().email.size() > 0 && incoming().email.size() <= 100
        && incoming().phone is string && incoming().phone.size() <= 50
        && incoming().message is string && incoming().message.size() > 0 && incoming().message.size() <= 1000
        && incoming().createdAt is timestamp;
    }
    
    match /videos/{videoId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if isAdmin();
    }
    
    match /settings/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    match /team/{memberId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    match /fleet/{vehicleId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    match /messages/{messageId} {
      // Basic rate limiting/spam protection via schema enforcement
      allow create: if isValidMessage();
      allow read, delete: if isAdmin();
      allow update: if false;
    }
  }
}
`;

fs.writeFileSync('firestore.rules', rules);
console.log('Rules patched');
