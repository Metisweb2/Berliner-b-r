import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Settings, Check, AlertTriangle, SunMedium } from 'lucide-react';

export function StatusManager() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [vacationMode, setVacationMode] = useState(false);
  const [vacationText, setVacationText] = useState('Wir machen Urlaub bis zum XX.XX.!');
  
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getDoc(doc(db, 'settings', 'system')).then(snap => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.maintenanceMode !== undefined) setMaintenanceMode(data.maintenanceMode);
        if (data.vacationMode !== undefined) setVacationMode(data.vacationMode);
        if (data.vacationText !== undefined) setVacationText(data.vacationText);
      }
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'system'), { 
        maintenanceMode, 
        vacationMode, 
        vacationText 
      }, { merge: true });
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
      <div className="bg-[#111111] rounded-2xl p-8 border border-white/5">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Settings className="w-6 h-6 text-primary" />
            System Status
          </h2>
        </div>
        
        <form onSubmit={handleSave} className="grid grid-cols-1 gap-8">
          {/* Wartungsmodus */}
          <div className="bg-black/50 p-6 rounded-xl border border-white/10">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Wartungsmodus
                </h3>
                <p className="text-neutral-400 text-sm max-w-lg">
                  Aktiviert eine Wartungsseite für alle Besucher. Das Admin-Panel bleibt unter <code className="bg-white/10 px-2 py-0.5 rounded text-xs">/admin</code> weiterhin erreichbar.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-14 h-7 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>
          </div>

          {/* Urlaubsmodus */}
          <div className="bg-black/50 p-6 rounded-xl border border-white/10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                  <SunMedium className="w-5 h-5 text-yellow-500" />
                  Urlaubsmodus
                </h3>
                <p className="text-neutral-400 text-sm max-w-lg">
                  Zeigt einen Banner auf der gesamten Website an, der über euren Urlaub informiert. Die Website bleibt ansonsten voll funktionsfähig.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={vacationMode}
                  onChange={(e) => setVacationMode(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-14 h-7 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-yellow-500"></div>
              </label>
            </div>
            
            {vacationMode && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <label className="block text-sm text-neutral-400 mb-2">Hinweistext im Banner</label>
                <input 
                  type="text" 
                  value={vacationText} 
                  onChange={e => setVacationText(e.target.value)} 
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                  placeholder="z.B. Wir machen Urlaub bis zum..."
                  required
                />
              </div>
            )}
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
    </div>
  );
}
