const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminVideos.tsx', 'utf8');

// Add Pencil icon to imports
code = code.replace('Check, X, Trash2, Play', 'Check, X, Trash2, Play, Pencil');

// Add state for editing
const stateHook = `const [videos, setVideos] = useState<VideoData[]>([]);`;
const newStates = `const [videos, setVideos] = useState<VideoData[]>([]);
  const [editingVideo, setEditingVideo] = useState<VideoData | null>(null);
  const [editForm, setEditForm] = useState({ creatorName: '', description: '', videoUrl: '', thumbnailUrl: '' });`;
code = code.replace(stateHook, newStates);

// Add handleEditClick and handleSaveEdit functions
const handleDeleteFunc = `const handleDelete = async (id: string) => {
    if (confirm('Möchtest du dieses Video wirklich löschen?')) {
      try {
        await deleteDoc(doc(db, 'videos', id));
      } catch (err) {
        console.error(err);
        alert('Fehler beim Löschen.');
      }
    }
  };`;

const editFuncs = `const handleEditClick = (video: VideoData) => {
    setEditingVideo(video);
    setEditForm({
      creatorName: video.creatorName,
      description: video.description,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl
    });
  };

  const handleSaveEdit = async () => {
    if (!editingVideo) return;
    try {
      await updateDoc(doc(db, 'videos', editingVideo.id), {
        creatorName: editForm.creatorName,
        description: editForm.description,
        videoUrl: editForm.videoUrl,
        thumbnailUrl: editForm.thumbnailUrl
      });
      setEditingVideo(null);
    } catch (err) {
      console.error(err);
      alert('Fehler beim Speichern.');
    }
  };`;
code = code.replace(handleDeleteFunc, handleDeleteFunc + '\n\n  ' + editFuncs);

// Add the edit button in the table actions
const actionButtons = `</button>
                        {video.status !== 'rejected' && (
                          <button onClick={() => handleReject(video.id)} className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors" title="Ablehnen">
                            <X className="w-5 h-5" />
                          </button>
                        )}`;
const newActionButtons = actionButtons + `
                        <button onClick={() => handleEditClick(video)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors" title="Bearbeiten">
                          <Pencil className="w-5 h-5" />
                        </button>`;
code = code.replace(actionButtons, newActionButtons);

// Add the edit modal before the main closing tag
const modalMarkup = `
      {/* Edit Modal */}
      {editingVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Video bearbeiten</h2>
              <button onClick={() => setEditingVideo(null)} className="text-neutral-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Creator Name</label>
                <input
                  type="text"
                  value={editForm.creatorName}
                  onChange={e => setEditForm({...editForm, creatorName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Beschreibung</label>
                <textarea
                  value={editForm.description}
                  onChange={e => setEditForm({...editForm, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Video-Link (TikTok Link oder MP4)</label>
                <input
                  type="text"
                  value={editForm.videoUrl}
                  onChange={e => setEditForm({...editForm, videoUrl: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="z.B. https://www.tiktok.com/@creator/video/123456..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Thumbnail-Link (JPG/PNG URL)</label>
                <input
                  type="text"
                  value={editForm.thumbnailUrl}
                  onChange={e => setEditForm({...editForm, thumbnailUrl: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div className="p-6 border-t border-white/5 flex justify-end gap-3">
              <button onClick={() => setEditingVideo(null)} className="px-5 py-2 text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors font-medium">
                Abbrechen
              </button>
              <button onClick={handleSaveEdit} className="px-5 py-2 text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors font-bold">
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
`;

code = code.replace('</main>', modalMarkup + '    </main>');

fs.writeFileSync('src/pages/AdminVideos.tsx', code);
