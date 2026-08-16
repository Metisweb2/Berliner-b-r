const fs = require('fs');

const code = `import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Trash2, Pencil, Plus, Car } from 'lucide-react';

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  img: string;
  desc: string;
  order: number;
}

const defaultFleet = [
  {
    id: 'default-1',
    name: 'VW Golf VIII',
    type: 'Schaltwagen',
    img: 'https://images.unsplash.com/photo-1621007947382-bb3c399b52c5?q=80&w=1000&auto=format&fit=crop',
    desc: 'Unser agiler und sicherer Klassiker für die manuelle Schalt-Ausbildung.',
    order: 1
  },
  {
    id: 'default-2',
    name: 'Audi A3 Sportback',
    type: 'Automatik',
    img: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=1000&auto=format&fit=crop',
    desc: 'Premium-Komfort und modernste Assistenzsysteme für stressfreies Lernen.',
    order: 2
  },
  {
    id: 'default-3',
    name: 'Kawasaki Z650',
    type: 'Motorrad',
    img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1000&auto=format&fit=crop',
    desc: 'Leichtes Handling und optimale Sitzposition für deine Motorrad-Ausbildung.',
    order: 3
  }
];

export function FleetManager() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Vehicle>>({});

  useEffect(() => {
    const q = query(collection(db, 'fleet'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const v = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Vehicle));
      setVehicles(v);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Fahrzeug wirklich löschen?')) {
      await deleteDoc(doc(db, 'fleet', id));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.img) return;

    const id = editingId || Date.now().toString();
    await setDoc(doc(db, 'fleet', id), {
      name: formData.name,
      type: formData.type || '',
      img: formData.img,
      desc: formData.desc || '',
      order: formData.order || 0
    });

    setEditingId(null);
    setFormData({});
  };

  const seedDefaults = async () => {
    if (window.confirm('Möchtest du die 3 Standard-Fahrzeuge laden?')) {
      for (const car of defaultFleet) {
        await setDoc(doc(db, 'fleet', car.id), car);
      }
    }
  };

  return (
    <div className="bg-[#111111] rounded-2xl p-8 border border-white/5">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Car className="w-6 h-6 text-primary" />
          Fuhrpark Verwaltung
        </h2>
        <button
          onClick={() => { setEditingId(null); setFormData({ order: vehicles.length }); }}
          className="bg-primary text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-white transition-colors"
        >
          <Plus className="w-4 h-4" /> Neues Fahrzeug
        </button>
      </div>

      <form onSubmit={handleSave} className="mb-12 bg-white/5 p-6 rounded-xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-neutral-400 mb-2">Fahrzeug Name</label>
          <input 
            type="text" 
            value={formData.name || ''} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
            required
            placeholder="z.B. VW Golf VIII"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-2">Fahrzeug Typ / Kategorie</label>
          <input 
            type="text" 
            value={formData.type || ''} 
            onChange={e => setFormData({...formData, type: e.target.value})} 
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
            required
            placeholder="z.B. Automatik"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-neutral-400 mb-2">Bild URL</label>
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
          <label className="block text-sm text-neutral-400 mb-2">Beschreibung</label>
          <textarea 
            value={formData.desc || ''} 
            onChange={e => setFormData({...formData, desc: e.target.value})} 
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors h-24 resize-none"
            placeholder="Kurze Beschreibung..."
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
            {editingId ? 'Änderungen speichern' : 'Fahrzeug hinzufügen'}
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-12 text-neutral-500">Lade Fahrzeuge...</div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
          <p className="text-neutral-500 mb-4">Keine Fahrzeuge im Fuhrpark.</p>
          <button onClick={seedDefaults} className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-bold transition-colors">
            Beispiel-Fahrzeuge laden
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className="bg-black/40 rounded-xl overflow-hidden border border-white/5 group hover:border-white/20 transition-all">
              <div className="aspect-video relative overflow-hidden">
                <img src={vehicle.img} alt={vehicle.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button onClick={() => { setEditingId(vehicle.id); setFormData(vehicle); }} className="p-2 bg-black/80 text-white rounded-lg hover:text-primary transition-colors backdrop-blur-sm">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(vehicle.id)} className="p-2 bg-black/80 text-white rounded-lg hover:text-red-500 transition-colors backdrop-blur-sm">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="text-primary text-xs font-bold tracking-widest uppercase mb-1">{vehicle.type}</div>
                <h3 className="text-lg font-bold text-white mb-2">{vehicle.name}</h3>
                <p className="text-neutral-400 text-sm line-clamp-2">{vehicle.desc}</p>
                <div className="mt-3 text-xs text-neutral-600">Sortierung: {vehicle.order}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync('src/components/FleetManager.tsx', code);
