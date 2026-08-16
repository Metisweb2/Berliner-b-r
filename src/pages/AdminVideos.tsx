import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { db, auth } from '../firebase';
import {     X, Trash2, Play, Pencil, LogOut, Video, FileText, LayoutDashboard, Globe, Check, MessageSquare, Mail, Calendar, User as UserIcon, Phone, Tag , Car , Users , MonitorPlay , Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { BearLogo } from '../components/BearLogo';
import { defaultPricingData } from '../components/Pricing';
import { FleetManager } from '../components/FleetManager';
import { AboutTeamManager } from '../components/AboutTeamManager';
import { HeroManager } from '../components/HeroManager';
import { StatusManager } from '../components/StatusManager';

interface VideoData {
  id: string;
  creatorName: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: any;
  logoUrl?: string;
  likes?: string;
  comments?: string;
  favorites?: string;
}

interface MessageData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  driverClass: string;
  message: string;
  createdAt: any;
  status: string;
}

function MessagesManager() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MessageData[];
      setMessages(msgs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
      try {
        await deleteDoc(doc(db, 'messages', id));
      } catch (err) {
        console.error('Delete error:', err);
        alert('Fehler beim Löschen.');
      }
    };

  const handleMarkRead = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'new' ? 'read' : 'new';
    await updateDoc(doc(db, 'messages', id), { status: newStatus });
  };

  if (loading) {
    return <div className="p-12 text-center text-neutral-500">Lade Nachrichten...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Anfragen & Nachrichten</h1>
          <p className="text-neutral-400 font-light">Verwalte hier alle Kontaktanfragen deiner Fahrschüler.</p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-12 text-center">
          <MessageSquare className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
          <p className="text-neutral-400">Keine neuen Nachrichten vorhanden.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {messages.map(msg => (
            <motion.div 
              key={msg.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-[#0a0a0a] border ${msg.status === 'new' ? 'border-primary/50' : 'border-white/10'} rounded-3xl p-6 relative overflow-hidden`}
            >
              {msg.status === 'new' && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl pointer-events-none" />
              )}
              
              <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <UserIcon className="w-5 h-5 text-primary" />
                      {msg.firstName} {msg.lastName}
                    </h3>
                    {msg.status === 'new' && (
                      <span className="px-3 py-1 text-xs font-bold bg-primary text-black rounded-full">Neu</span>
                    )}
                    <span className="text-sm text-neutral-500">
                      {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString('de-DE') : 'Gerade eben'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Mail className="w-4 h-4 text-neutral-500" />
                        <a href={`mailto:${msg.email}`} className="hover:text-primary transition-colors">{msg.email}</a>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Phone className="w-4 h-4 text-neutral-500" />
                        <a href={`tel:${msg.phone}`} className="hover:text-primary transition-colors">{msg.phone || '-'}</a>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Calendar className="w-4 h-4 text-neutral-500" />
                        <span>Geboren: {msg.dob ? new Date(msg.dob).toLocaleDateString('de-DE') : '-'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-300">
                        <FileText className="w-4 h-4 text-neutral-500" />
                        <span>Klasse: <strong className="text-white uppercase">{msg.driverClass || '-'}</strong></span>
                      </div>
                    </div>
                  </div>

                  {msg.message && (
                    <div className="mt-4 p-4 bg-white/5 rounded-2xl border border-white/5 text-neutral-300 italic">
                      "{msg.message}"
                    </div>
                  )}
                </div>

                <div className="flex flex-row md:flex-col justify-end gap-3 shrink-0">
                  <button 
                    onClick={() => handleMarkRead(msg.id, msg.status)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors font-medium text-sm"
                  >
                    <Check className="w-4 h-4" />
                    {msg.status === 'new' ? 'Als gelesen markieren' : 'Als neu markieren'}
                  </button>
                  <button 
                    onClick={() => handleDelete(msg.id)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-colors font-medium text-sm"
                  >
                    <Trash2 className="w-4 h-4" /> Löschen
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}


function VideoManager() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingVideo, setEditingVideo] = useState<VideoData | null>(null);
  const [editForm, setEditForm] = useState({ creatorName: '', description: '', videoUrl: '', thumbnailUrl: '', logoUrl: '', likes: '', comments: '', favorites: '' });

  useEffect(() => {
    const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const vids = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as VideoData[];
      setVideos(vids);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
      try {
        await deleteDoc(doc(db, 'videos', id));
      } catch (err) {
        console.error('Delete error:', err);
        alert('Fehler beim Löschen.');
      }
    };

  const startEdit = (video: VideoData) => {
    setEditingVideo(video);
    setEditForm({ creatorName: video.creatorName || '', description: video.description || '', videoUrl: video.videoUrl || '', thumbnailUrl: video.thumbnailUrl || '', logoUrl: video.logoUrl || '', likes: video.likes || '', comments: video.comments || '', favorites: video.favorites || '' });
  };

  const handleSaveEdit = async () => {
    if (!editingVideo) return;
    try {
      await setDoc(doc(db, 'videos', editingVideo.id), { ...editForm, status: 'approved', createdAt: editingVideo.createdAt || new Date() }, { merge: true });
      setEditingVideo(null);
    } catch (err) {
      console.error(err);
      alert('Fehler beim Speichern');
    }
  };

  if (loading) return <div className="p-12 text-center text-neutral-500">Lade Videos...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Videos verwalten</h1>
          <p className="text-neutral-400 font-light">Bearbeite oder lösche hochgeladene Videos.</p>
        </div>
        
        <div className="flex gap-4">
          <button onClick={() => { setEditingVideo({ id: Date.now().toString(), creatorName: '', description: '', videoUrl: '', thumbnailUrl: '', createdAt: new Date() }); setEditForm({ creatorName: '', description: '', videoUrl: '', thumbnailUrl: '', logoUrl: '', likes: '', comments: '', favorites: '' }); }} className="bg-primary text-black px-6 py-2 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-colors h-full">Neues Video</button>
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[120px]">
            <span className="text-3xl font-black text-white mb-1">{videos.length}</span>
            <span className="text-xs text-neutral-500 uppercase tracking-wider font-bold">Gesamt</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(video => (
          <motion.div key={video.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden group hover:border-white/20 transition-all flex flex-col">
            <div className="relative aspect-video bg-[#050505] overflow-hidden">
              <img referrerPolicy="no-referrer" src={video.thumbnailUrl} alt={video.description} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black transform hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-white truncate pr-4">{video.creatorName}</h3>
                <span className="text-xs text-neutral-500 whitespace-nowrap">{video.createdAt?.toDate ? video.createdAt.toDate().toLocaleDateString('de-DE') : 'Neu'}</span>
              </div>
              <p className="text-sm text-neutral-400 line-clamp-2 mb-6 flex-1">{video.description}</p>
              
              <div className="flex gap-2 mt-auto pt-4 border-t border-white/5">
                <button onClick={() => startEdit(video)} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white text-sm font-bold transition-colors">
                  <Pencil className="w-4 h-4" /> Bearbeiten
                </button>
                <button onClick={() => handleDelete(video.id)} className="w-12 flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-12 text-center">
          <Video className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
          <p className="text-neutral-400">Keine Videos gefunden.</p>
        </div>
      )}

      {/* Edit Modal Overlay */}
      <AnimatePresence>
        {editingVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditingVideo(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h2 className="text-xl font-bold text-white">Video bearbeiten</h2>
                <button onClick={() => setEditingVideo(null)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8 space-y-5 overflow-y-auto flex-1 custom-scrollbar">
                <div>
                  <label className="block text-sm font-bold text-neutral-400 mb-2">Creator Name</label>
                  <input type="text" value={editForm.creatorName} onChange={e => setEditForm({...editForm, creatorName: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-400 mb-2">Beschreibung</label>
                  <textarea value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors resize-none h-28 font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-400 mb-2">Video-Link</label>
                  <input type="text" value={editForm.videoUrl} onChange={e => setEditForm({...editForm, videoUrl: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-400 mb-2">Thumbnail-Link (JPG/PNG)</label>
                  <input type="text" value={editForm.thumbnailUrl} onChange={e => setEditForm({...editForm, thumbnailUrl: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-colors font-medium" />
                </div>

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

              </div>
              <div className="p-6 border-t border-white/5 flex justify-end gap-4 bg-white/[0.02]">
                <button onClick={() => setEditingVideo(null)} className="px-6 py-3 text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors font-bold">Abbrechen</button>
                <button onClick={handleSaveEdit} className="px-6 py-3 text-black bg-primary hover:bg-primary/90 rounded-xl transition-colors font-bold shadow-lg">Änderungen speichern</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LegalManager() {
  const [activeDoc, setActiveDoc] = useState<'impressum' | 'datenschutz' | 'agb'>('impressum');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const docRef = doc(db, 'settings', 'legal');
      const snap = await getDoc(docRef);
      if (snap.exists() && snap.data()[activeDoc]) {
        setContent(snap.data()[activeDoc]);
      } else {
        const defaults: Record<string, string> = {
          impressum: "# Impressum\n\nAngaben gemäß § 5 TMG:\n\nMax Mustermann\nMusterstraße 1\n12345 Musterstadt\n\n## Kontakt\nTelefon: +49 (0) 123 44 55 66\nE-Mail: info@muster.de\n\n## Umsatzsteuer-ID\nUmsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:\nDE999999999",
          datenschutz: "# Datenschutzerklärung\n\n## 1. Datenschutz auf einen Blick\n\n### Allgemeine Hinweise\nDie folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.\n\n## 2. Datenerfassung auf dieser Website\n\nWer ist verantwortlich für die Datenerfassung auf dieser Website?\nDie Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.",
          agb: "# Allgemeine Geschäftsbedingungen\n\n## §1 Geltungsbereich\nFür die Geschäftsbeziehung zwischen der Fahrschule und dem Kunden gelten ausschließlich die nachfolgenden Allgemeinen Geschäftsbedingungen in ihrer zum Zeitpunkt der Anmeldung gültigen Fassung."
        };
        setContent(defaults[activeDoc]);
      }
    };
    loadData();
    setSuccess(false);
  }, [activeDoc]);

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    try {
      await setDoc(doc(db, 'settings', 'legal'), { [activeDoc]: content }, { merge: true });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Fehler beim Speichern.');
    }
    setSaving(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Rechtliche Texte</h1>
        <p className="text-neutral-400 font-light">Bearbeite die Texte für Impressum, Datenschutz und AGB live (unterstützt Markdown).</p>
      </div>

      <div className="flex gap-4">
        {(['impressum', 'datenschutz', 'agb'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveDoc(tab)}
            className={`px-6 py-3 rounded-xl font-bold transition-all capitalize ${
              activeDoc === tab ? 'bg-white text-black shadow-lg' : 'bg-[#0a0a0a] text-neutral-400 border border-white/5 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 flex flex-col min-h-[500px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white capitalize">{activeDoc} bearbeiten</h2>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              success ? 'bg-green-500 text-black' : 'bg-primary text-black hover:bg-primary/90'
            }`}
          >
            {saving ? 'Speichere...' : success ? <><Check className="w-5 h-5" /> Gespeichert</> : 'Änderungen speichern'}
          </button>
        </div>
        
        <div className="flex-1 bg-[#050505] border border-white/10 rounded-2xl overflow-hidden focus-within:border-primary transition-colors flex">
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 p-6 bg-transparent text-neutral-300 focus:outline-none resize-none font-mono text-sm leading-relaxed"
            placeholder="Schreibe deinen Text hier in Markdown..."
          />
        </div>
        <p className="text-neutral-500 text-xs mt-4">
          Tipp: Du kannst <strong>Markdown</strong> verwenden (z.B. <code className="bg-white/5 px-1 rounded"># Überschrift</code> oder <code className="bg-white/5 px-1 rounded">**fett**</code>).
        </p>
      </div>
    </div>
  );
}

function PricingManager() {
  const [prices, setPrices] = useState<Record<string, Record<string, string>>>({});
  const [promotion, setPromotion] = useState({ isActive: false, title: '', discountText: '', description: '' });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      const snap = await getDoc(doc(db, 'settings', 'pricing'));
      if (snap.exists()) {
        const d = snap.data();
        if (d.prices) setPrices(d.prices);
        if (d.promotion) setPromotion(d.promotion);
      }
    }
    loadData();
  }, []);

  const handlePriceChange = (clsId: string, key: string, value: string) => {
    setPrices(prev => ({
      ...prev,
      [clsId]: {
        ...prev[clsId],
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'pricing'), { prices, promotion });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      console.error(e);
      alert('Fehler beim Speichern');
    }
    setSaving(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-[#0a0a0a] border border-white/5 rounded-3xl p-8">
        <div>
          <h2 className="text-3xl font-black text-white mb-2">Preise & Aktionen</h2>
          <p className="text-neutral-400 font-light">Bearbeite die Preise der verschiedenen Klassen und aktiviere Rabattaktionen.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${success ? 'bg-green-500 text-black' : 'bg-primary text-black hover:bg-primary/90'}`}
        >
          {saving ? 'Speichere...' : success ? <><Check className="w-5 h-5" /> Gespeichert</> : 'Änderungen speichern'}
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><Tag className="w-6 h-6 text-primary" /> Rabattaktion (Startseite)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="flex items-center gap-3 bg-white/5 p-4 rounded-xl cursor-pointer hover:bg-white/10 transition-colors mb-6">
              <input type="checkbox" checked={promotion.isActive} onChange={e => setPromotion(p => ({...p, isActive: e.target.checked}))} className="w-5 h-5 accent-primary" />
              <span className="text-white font-bold">Aktion aktivieren</span>
            </label>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Wenn aktiviert, wird ein auffälliger Aktions-Banner direkt über den Preisen auf der Startseite eingeblendet. Nutze dies für kurzzeitige Angebote!
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Aktions-Titel</label>
              <input type="text" value={promotion.title} onChange={e => setPromotion(p => ({...p, title: e.target.value}))} placeholder="z.B. Sommeraktion" className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Kurzer Rabatt-Text</label>
              <input type="text" value={promotion.discountText} onChange={e => setPromotion(p => ({...p, discountText: e.target.value}))} placeholder="z.B. -50€" className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase mb-2">Beschreibung</label>
              <input type="text" value={promotion.description} onChange={e => setPromotion(p => ({...p, description: e.target.value}))} placeholder="z.B. Auf den Grundbetrag bis Ende August!" className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {defaultPricingData.map(cls => (
          <div key={cls.id} className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider flex items-center justify-between">
              Klasse {cls.id}
            </h3>
            <div className="space-y-4">
              {cls.items.map(item => (
                <div key={item.key} className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-neutral-500 uppercase">
                    {item.key === 'base' ? 'Grundbetrag' : 
                     item.key === 'practice' ? 'Übungsfahrt' : 
                     item.key === 'special' ? 'Sonderfahrt' : 
                     item.key === 'theory_exam' ? 'Theorieprüfung' : 
                     item.key === 'practice_exam' ? 'Praxisprüfung' : 
                     item.key === 'b96_course' ? 'B96 Kurs' : 
                     item.key.replace('_', ' ')}
                  </label>
                  <input 
                    type="text" 
                    value={prices[cls.id]?.[item.key] !== undefined ? prices[cls.id][item.key] : item.price} 
                    onChange={e => handlePriceChange(cls.id, item.key, e.target.value)} 
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary" 
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminVideos() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'videos' | 'legal' | 'messages' | 'pricing' | 'fleet' | 'about' | 'hero' | 'status'>('pricing');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        if (user.email === 'mobilwertberlin@gmail.com') {
          setIsAdmin(true);
        } else {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            setIsAdmin(userDoc.exists() && userDoc.data().role === 'admin');
          } catch (e) {
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error: any) {
      if (error?.code === 'auth/popup-closed-by-user' || error?.code === 'auth/cancelled-popup-request') {
        return;
      }
      console.error(error);
      alert('Login fehlgeschlagen');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (authLoading) {
    return <div className="min-h-screen bg-dark-bg flex items-center justify-center text-white">Lade Admin-Bereich...</div>;
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#070709] flex items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="bg-[#121216]/90 backdrop-blur-2xl border border-white/10 p-10 sm:p-12 rounded-[2.5rem] max-w-md w-full text-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden z-10">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

          {/* Logo & Badge */}
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner group">
            <BearLogo className="w-12 h-12 object-contain transition-transform duration-500 group-hover:scale-110" />
          </div>

          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Admin Portal
          </div>

          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Fahrschule Bär</h1>
          <p className="text-neutral-400 text-sm mb-10 font-light leading-relaxed">
            Bitte logge dich mit deinem autorisierten Google-Konto ein, um das Dashboard zu verwalten.
          </p>

          <button 
            onClick={handleLogin} 
            className="w-full bg-white text-neutral-900 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-neutral-100 transition-all duration-300 shadow-[0_10px_25px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_35px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <img referrerPolicy="no-referrer" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
            <span className="text-[15px]">Mit Google anmelden</span>
          </button>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-neutral-500">
            <span>Sicherer OAuth Login</span>
            <Link to="/" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Globe className="w-3.5 h-3.5" /> Zur Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Sidebar */}
      <div className="w-72 bg-[#050505] border-r border-white/5 flex flex-col fixed h-full z-20">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-black text-xl">M</div>
            <div>
              <h2 className="text-white font-black tracking-wide">Mobilwert</h2>
              <p className="text-neutral-500 text-xs uppercase font-bold tracking-wider">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'messages' ? 'bg-primary text-black' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
          >
            <MessageSquare className="w-5 h-5" /> Nachrichten
          </button>
          <button 
            onClick={() => setActiveTab('videos')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'videos' ? 'bg-primary text-black' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
          >
            <Video className="w-5 h-5" /> Videos
          </button>
          <button 
            onClick={() => setActiveTab('pricing')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'pricing' ? 'bg-primary text-black' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
          >
            <Tag className="w-5 h-5" /> Preise & Aktionen
          </button>
          <button 
            onClick={() => setActiveTab('fleet')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'fleet' ? 'bg-primary text-black' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
          >
            <Car className="w-5 h-5" /> Fuhrpark
          </button>
          <button 
            onClick={() => setActiveTab('about')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'about' ? 'bg-primary text-black' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
          >
            <Users className="w-5 h-5" /> Über uns & Team
          </button>
          <button 
            onClick={() => setActiveTab('hero')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'hero' ? 'bg-primary text-black' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
          >
            <MonitorPlay className="w-5 h-5" /> Landingpage Video
          </button>
          <button 
            onClick={() => setActiveTab('status')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'status' ? 'bg-primary text-black' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
          >
            <Settings className="w-5 h-5" /> System Status
          </button>
          <button 
            onClick={() => setActiveTab('legal')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeTab === 'legal' ? 'bg-primary text-black' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
          >
            <FileText className="w-5 h-5" /> Rechtliches
          </button>
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl mb-4">
            <img referrerPolicy="no-referrer" src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`} alt="Avatar" className="w-8 h-8 rounded-full" />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user.displayName || 'Admin'}</p>
              <p className="text-xs text-neutral-500 truncate">{user.email}</p>
            </div>
          </div>
          
          <Link to="/" className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/[0.03] hover:bg-white/10 text-white rounded-xl transition-colors font-bold text-sm border border-white/5">
            <Globe className="w-4 h-4" /> Zurück zur Webseite
          </Link>

          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-neutral-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-colors font-bold text-sm">
            <LogOut className="w-4 h-4" /> Abmelden
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-72 p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'messages' && <MessagesManager />}
          {activeTab === 'videos' && <VideoManager />}
          {activeTab === 'pricing' && <PricingManager />}
          {activeTab === 'fleet' && <FleetManager />}
          {activeTab === 'about' && <AboutTeamManager />}
          {activeTab === 'hero' && <HeroManager />}
          {activeTab === 'status' && <StatusManager />}
          {activeTab === 'legal' && <LegalManager />}
        </div>
      </div>
    </div>
  );
}
