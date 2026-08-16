import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { MonitorPlay, Check } from 'lucide-react';

export function HeroManager() {
  const [videoUrl, setVideoUrl] = useState('/video.mp4');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getDoc(doc(db, 'settings', 'hero')).then(snap => {
      if (snap.exists() && snap.data().videoUrl) {
        setVideoUrl(snap.data().videoUrl);
      }
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'hero'), { videoUrl }, { merge: true });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      console.error(e);
      alert('Fehler beim Speichern');
    }
    setSaving(false);
  };

  return (
    <div className="bg-[#111111] rounded-2xl p-8 border border-white/5">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <MonitorPlay className="w-6 h-6 text-primary" />
          Landingpage Hintergrundvideo
        </h2>
      </div>
      
      <form onSubmit={handleSave} className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm text-neutral-400 mb-2">Hintergrund-Video URL (MP4)</label>
          <input 
            type="text" 
            value={videoUrl} 
            onChange={e => setVideoUrl(e.target.value)} 
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
            placeholder="/video.mp4 oder https://..."
            required
          />
          <p className="text-xs text-neutral-500 mt-2">Nutze entweder eine relative URL (wie "/video.mp4" für das Standardvideo) oder einen direkten HTTPS-Link zu einer .mp4 Datei.</p>
        </div>
        
        <div className="flex justify-end mt-4">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-primary text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white transition-colors disabled:opacity-50"
          >
            {success ? <Check className="w-5 h-5" /> : null}
            {success ? 'Gespeichert!' : saving ? 'Speichert...' : 'Speichern'}
          </button>
        </div>
      </form>
    </div>
  );
}
