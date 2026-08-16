const fs = require('fs');

let code = fs.readFileSync('src/pages/AdminVideos.tsx', 'utf-8');

// Update state to include new fields
code = code.replace(
  "const [editForm, setEditForm] = useState({ creatorName: '', description: '', videoUrl: '', thumbnailUrl: '' });",
  "const [editForm, setEditForm] = useState({ creatorName: '', description: '', videoUrl: '', thumbnailUrl: '', logoUrl: '', likes: '', comments: '', favorites: '' });"
);

// Update startEdit to include new fields
code = code.replace(
  "setEditForm({ creatorName: video.creatorName, description: video.description, videoUrl: video.videoUrl, thumbnailUrl: video.thumbnailUrl });",
  "setEditForm({ creatorName: video.creatorName || '', description: video.description || '', videoUrl: video.videoUrl || '', thumbnailUrl: video.thumbnailUrl || '', logoUrl: video.logoUrl || '', likes: video.likes || '', comments: video.comments || '', favorites: video.favorites || '' });"
);

// Add the new fields to the form UI
const newFields = `
                <div>
                  <label className="block text-sm font-bold text-neutral-400 mb-2">Account Logo-Link (Optional)</label>
                  <input type="text" value={editForm.logoUrl} onChange={e => setEditForm({...editForm, logoUrl: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors font-medium" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-neutral-400 mb-2">Likes</label>
                    <input type="text" placeholder="z.B. 8.4k" value={editForm.likes} onChange={e => setEditForm({...editForm, likes: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-neutral-400 mb-2">Kommentare</label>
                    <input type="text" placeholder="z.B. 145" value={editForm.comments} onChange={e => setEditForm({...editForm, comments: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-neutral-400 mb-2">Favoriten</label>
                    <input type="text" placeholder="z.B. 312" value={editForm.favorites} onChange={e => setEditForm({...editForm, favorites: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors font-medium" />
                  </div>
                </div>
`;

code = code.replace(
  '<div>\n                  <label className="block text-sm font-bold text-neutral-400 mb-2">Thumbnail-Link (JPG/PNG)</label>',
  '<div>\n                  <label className="block text-sm font-bold text-neutral-400 mb-2">Thumbnail-Link (JPG/PNG)</label>'
);

// We'll just replace the closing div of the thumbnail input to insert our new fields
code = code.replace(
  'onChange={e => setEditForm({...editForm, thumbnailUrl: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors font-medium" />\n                </div>',
  'onChange={e => setEditForm({...editForm, thumbnailUrl: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors font-medium" />\n                </div>\n' + newFields
);

// Wait, the delete button... The user requested "jeder lösch button funktonieren im admin panel live".
// Let's check `AdminVideos.tsx` delete button:
// It says:
// const handleDelete = async (id: string) => {
//    if (window.confirm('Möchtest du dieses Video wirklich löschen?')) {
//      await deleteDoc(doc(db, 'videos', id));
//    }
//  };
// This looks correct. Does it not work because of rules or because `deleteDoc` / `doc` is not imported? Let's check imports in AdminVideos.tsx.

fs.writeFileSync('src/pages/AdminVideos.tsx', code);
console.log('AdminVideos patched');
