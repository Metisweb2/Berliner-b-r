import { Section } from './ui/Section';
import {  Send, CheckCircle2 , Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';

export function Registration() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    driverClass: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError('Bitte fülle alle Pflichtfelder aus.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new'
      });
      setSuccess(true);
      setFormData({
        firstName: '', lastName: '', email: '', phone: '', dob: '', driverClass: '', message: ''
      });
    } catch (err) {
      console.error('Error saving message:', err);
      setError('Fehler beim Senden. Bitte versuche es später noch einmal.');
    }
    setLoading(false);
  };

  return (
    <Section id="register" className="bg-neutral-900 border-t border-white/5 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-10 pointer-events-none"> 
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-dark-bg to-transparent blur-[100px]" />
      </div>
      <div className="relative z-10 flex flex-col lg:flex-row gap-16">
        <div className="lg:w-5/12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Bereit für deinen <br />
            <span className="text-primary">{t('reg.form.title_q')}</span>
          </h2>
          <p className="text-neutral-400 text-lg mb-8">
            Melde dich jetzt unverbindlich an. Wir setzen uns umgehend mit dir in Verbindung, um alle Details und den optimalen Startzeitpunkt zu besprechen.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-dark-bg border border-white/10 flex items-center justify-center flex-shrink-0 text-gold font-bold">1</div>
              <div>
                <h4 className="font-bold text-white mb-1">{t('reg.steps.1.title')}</h4>
                <p className="text-sm text-neutral-400">{t('reg.steps.1.desc')}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-dark-bg border border-white/10 flex items-center justify-center flex-shrink-0 text-gold font-bold">2</div>
              <div>
                <h4 className="font-bold text-white mb-1">{t('reg.steps.2.title')}</h4>
                <p className="text-sm text-neutral-400">{t('reg.steps.2.desc')}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-dark-bg border border-white/10 flex items-center justify-center flex-shrink-0 text-gold font-bold">3</div>
              <div>
                <h4 className="font-bold text-white mb-1">{t('reg.steps.3.title')}</h4>
                <p className="text-sm text-neutral-400">{t('reg.steps.3.desc')}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-dark-card border border-white/5 rounded-2xl">
            <h4 className="font-bold text-white mb-4">Direkter Kontakt</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-1" />
                <div>
                  <div className="text-sm font-medium text-white">Telefon Büro</div>
                  <a href="tel:03068073651" className="text-neutral-400 hover:text-white transition-colors block">030 – 680 736 51</a>
                  <a href="tel:017660807518" className="text-neutral-400 hover:text-white transition-colors block mt-1">0176 – 608 075 18</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-1" />
                <div>
                  <div className="text-sm font-medium text-white">E-Mail</div>
                  <a href="mailto:BerlinerBaerGmbH@gmail.com" className="text-neutral-400 hover:text-white transition-colors">BerlinerBaerGmbH@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-7/12">
          <form onSubmit={handleSubmit} className="bg-dark-card p-8 rounded-3xl border border-white/10 shadow-2xl relative">
            <AnimatePresence>
              {success && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-dark-card/95 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center text-center p-8 border border-primary/20"
                >
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Vielen Dank!</h3>
                  <p className="text-neutral-400 mb-8 max-w-sm">Deine Anfrage wurde erfolgreich gesendet. Wir melden uns in Kürze bei dir.</p>
                  <button type="button" onClick={() => setSuccess(false)} className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-colors font-medium">
                    Neue Anfrage senden
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">{t('reg.form.fname')} *</label>
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" 
                  placeholder="Max" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">{t('reg.form.lname')} *</label>
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" 
                  placeholder="Mustermann" 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">{t('reg.form.email')} *</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" 
                  placeholder="max@beispiel.de" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">{t('reg.form.phone2')} *</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" 
                  placeholder="Für Rückfragen" 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">{t('reg.form.dob')}</label>
                <input 
                  type="date" 
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors color-scheme-dark" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">{t('reg.form.class')}</label>
                <select 
                  value={formData.driverClass}
                  onChange={(e) => setFormData({...formData, driverClass: e.target.value})}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="">Bitte wählen...</option>
                  <option value="b">{t('reg.form.classes.b')}</option>
                  <option value="be">{t('reg.form.classes.be')}</option>
                  <option value="a">{t('reg.form.classes.a')}</option>
                  <option value="am">{t('reg.form.classes.am')}</option>
                  <option value="other">Noch unsicher / Beratung</option>
                </select>
              </div>
            </div>
            <div className="space-y-2 mb-8">
              <label className="text-sm font-medium text-neutral-400">{t('reg.form.msg')}</label>
              <textarea 
                rows={4} 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none" 
                placeholder="Hast du besondere Wünsche oder Fragen?"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-red-600 hover:from-primary-hover hover:to-red-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>{t('reg.subtitle')} absenden <Send className="w-5 h-5" /></>
              )}
            </button>
            <p className="text-xs text-neutral-500 mt-4 text-center">
              Deine Daten werden sicher übertragen und nur zur Kontaktaufnahme verwendet.
            </p>
          </form>
        </div>
      </div>
    </Section>
  );
}
