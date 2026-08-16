const fs = require('fs');

let code = fs.readFileSync('src/pages/AdminVideos.tsx', 'utf-8');

// Add "Neues Video" button right next to the "Gesamt" stat block
code = code.replace(
  '<div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[120px]">',
  `<button onClick={() => { setEditingVideo({ id: Date.now().toString(), creatorName: '', description: '', videoUrl: '', thumbnailUrl: '', createdAt: new Date() }); setEditForm({ creatorName: '', description: '', videoUrl: '', thumbnailUrl: '', logoUrl: '', likes: '', comments: '', favorites: '' }); }} className="bg-primary text-black px-6 py-2 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors h-full">Neues Video</button>
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[120px]">`
);

// We need to change the handleSaveEdit to handle new vs existing. Since `updateDoc` only works on existing documents, we can use `setDoc`.
// Let's replace the `updateDoc(doc(db, 'videos', editingVideo.id), editForm)` with `setDoc(doc(db, 'videos', editingVideo.id), { ...editForm, status: 'approved', createdAt: editingVideo.createdAt || new Date() }, { merge: true })`
code = code.replace(
  'await updateDoc(doc(db, \'videos\', editingVideo.id), editForm);',
  'await setDoc(doc(db, \'videos\', editingVideo.id), { ...editForm, status: \'approved\', createdAt: editingVideo.createdAt || new Date() }, { merge: true });'
);

fs.writeFileSync('src/pages/AdminVideos.tsx', code);
console.log('Added Neues Video button');
