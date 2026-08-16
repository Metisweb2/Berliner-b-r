import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Trash2, Pencil, Plus, Users, FileText, Check } from 'lucide-react';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  img: string;
  desc: string;
  order: number;
}

const defaultTeam = [
  {
    id: 'default-1',
    name: 'Markus Weber',
    role: 'Inhaber & Fahrlehrer (Auto)',
    desc: 'Mit ruhiger Art und 15 Jahren Erfahrung bringt Markus jeden sicher durch die Prüfung.',
    img: 'https://i.pravatar.cc/300?img=11',
    order: 1
  },
  {
    id: 'default-2',
    name: 'Sarah Müller',
    role: 'Fahrlehrerin (Auto)',
    desc: 'Sarah ist unsere Spezialistin für Automatik-Ausbildung und nimmt jede Prüfungsangst.',
    img: 'https://i.pravatar.cc/300?img=47',
    order: 2
  },
  {
    id: 'default-3',
    name: 'Thomas Koch',
    role: 'Fahrlehrer (Theorie & Praxis)',
    desc: 'Ein geduldiger Begleiter auf dem Weg zum Führerschein. Theorie und Praxis mit Leichtigkeit erklärt.',
    img: 'https://i.pravatar.cc/300?img=13',
    order: 3
  }
];

export function AboutTeamManager() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<TeamMember>>({});

  // About Data State
  const [aboutData, setAboutData] = useState({
    title: 'Über Uns',
    p1: 'Willkommen bei der <span className="text-primary font-bold">Fahrschule Bär</span>...',
    p2: 'Wir legen großen Wert auf eine entspannte und stressfreie Lernatmosphäre.',
    p3: 'Mit modernen Lehrmethoden...',
    exp: 'Jahre<br/>Erfahrung',
    rate: 'Erfolgsquote',
    quality: 'Geprüft'
  });
  const [savingAbout, setSavingAbout] = useState(false);
  const [successAbout, setSuccessAbout] = useState(false);

  useEffect(() => {
    // Load Team
    const q = query(collection(db, 'team'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const t = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
      setTeam(t);
      setLoading(false);
    });

    // Load About
    getDoc(doc(db, 'settings', 'about')).then(snap => {
      if (snap.exists()) {
        setAboutData(snap.data() as any);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAbout(true);
    try {
      await setDoc(doc(db, 'settings', 'about'), aboutData);
      setSuccessAbout(true);
      setTimeout(() => setSuccessAbout(false), 3000);
    } catch (e) {
      console.error(e);
      alert('Fehler beim Speichern');
    }
    setSavingAbout(false);
  };

  const handleDelete = async (id: string) => {
      try {
        await deleteDoc(doc(db, 'team', id));
      } catch (err) {
        console.error('Delete error:', err);
        alert('Fehler beim Löschen.');
      }
    };

  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.img) return;

    const id = editingId || Date.now().toString();
    await setDoc(doc(db, 'team', id), {
      name: formData.name,
      role: formData.role || '',
      img: formData.img,
      desc: formData.desc || '',
      order: formData.order || 0
    });

    setEditingId(null);
    setFormData({});
  };

  const seedDefaults = async () => {
      for (const member of defaultTeam) {
        await setDoc(doc(db, 'team', member.id), member);
      }
  };

  return (
    <div className="space-y-8">
      {/* About Us Manager */}
      <div className="bg-[#111111] rounded-2xl p-8 border border-white/5">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            "Über Uns" Texte bearbeiten
          </h2>
        </div>
        
        <form onSubmit={handleSaveAbout} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm text-neutral-400 mb-2">Titel</label>
            <input 
              type="text" 
              value={aboutData.title} 
              onChange={e => setAboutData({...aboutData, title: e.target.value})} 
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-neutral-400 mb-2">Absatz 1 (Einleitung)</label>
            <textarea 
              value={aboutData.p1} 
              onChange={e => setAboutData({...aboutData, p1: e.target.value})} 
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors h-24 resize-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-neutral-400 mb-2">Absatz 2</label>
            <textarea 
              value={aboutData.p2} 
              onChange={e => setAboutData({...aboutData, p2: e.target.value})} 
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors h-24 resize-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-neutral-400 mb-2">Absatz 3</label>
            <textarea 
              value={aboutData.p3} 
              onChange={e => setAboutData({...aboutData, p3: e.target.value})} 
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors h-24 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Text für "Jahre Erfahrung"</label>
            <input 
              type="text" 
              value={aboutData.exp} 
              onChange={e => setAboutData({...aboutData, exp: e.target.value})} 
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Text für "Erfolgsquote"</label>
            <input 
              type="text" 
              value={aboutData.rate} 
              onChange={e => setAboutData({...aboutData, rate: e.target.value})} 
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          
          <div className="md:col-span-2 flex justify-end mt-4">
            <button 
              type="submit" 
              disabled={savingAbout}
              className="bg-primary text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white transition-colors disabled:opacity-50"
            >
              {successAbout ? <Check className="w-5 h-5" /> : null}
              {successAbout ? 'Gespeichert!' : savingAbout ? 'Speichert...' : 'Texte speichern'}
            </button>
          </div>
        </form>
      </div>

      {/* Team Manager */}
      <div className="bg-[#111111] rounded-2xl p-8 border border-white/5">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Users className="w-6 h-6 text-primary" />
            Team Verwaltung
          </h2>
          <button
            onClick={() => { setEditingId(null); setFormData({ order: team.length }); }}
            className="bg-primary text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-white transition-colors"
          >
            <Plus className="w-4 h-4" /> Neues Mitglied
          </button>
        </div>

        <form onSubmit={handleSaveTeam} className="mb-12 bg-white/5 p-6 rounded-xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Name</label>
            <input 
              type="text" 
              value={formData.name || ''} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
              required
              placeholder="z.B. Markus Weber"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Rolle / Position</label>
            <input 
              type="text" 
              value={formData.role || ''} 
              onChange={e => setFormData({...formData, role: e.target.value})} 
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
              required
              placeholder="z.B. Inhaber & Fahrlehrer"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-neutral-400 mb-2">Profilbild URL</label>
            <input 
              type="url" 
              value={formData.img || ''} 
              onChange={e => setFormData({...formData, img: e.target.value})} 
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
              required
              placeholder="https://..."
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-neutral-400 mb-2">Kurzbeschreibung</label>
            <textarea 
              value={formData.desc || ''} 
              onChange={e => setFormData({...formData, desc: e.target.value})} 
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors h-24 resize-none"
              placeholder="Kurze Vorstellung..."
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Reihenfolge (Sortierung)</label>
            <input 
              type="number" 
              value={formData.order ?? ''} 
              onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})} 
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button type="button" onClick={() => setFormData({})} className="px-6 py-3 text-neutral-400 hover:text-white transition-colors">Abbrechen</button>
            <button type="submit" className="bg-primary text-black px-8 py-3 rounded-xl font-bold hover:bg-white transition-colors">
              {editingId ? 'Änderungen speichern' : 'Mitglied hinzufügen'}
            </button>
          </div>
        </form>

        {loading ? (
          <div className="text-center py-12 text-neutral-500">Lade Team...</div>
        ) : team.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
            <p className="text-neutral-500 mb-4">Kein Teammitglied gefunden.</p>
            <button onClick={seedDefaults} className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-bold transition-colors">
              Beispiel-Team laden
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map(member => (
              <div key={member.id} className="bg-black/40 rounded-xl overflow-hidden border border-white/5 group hover:border-white/20 transition-all">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img referrerPolicy="no-referrer" src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button onClick={() => { setEditingId(member.id); setFormData(member); }} className="p-2 bg-black/80 text-white rounded-lg hover:text-primary transition-colors backdrop-blur-sm">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(member.id)} className="p-2 bg-black/80 text-white rounded-lg hover:text-red-500 transition-colors backdrop-blur-sm">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-primary text-xs font-bold tracking-widest uppercase mb-1">{member.role}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-neutral-400 text-sm line-clamp-2">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
