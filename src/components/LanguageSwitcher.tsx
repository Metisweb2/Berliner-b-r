import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const currentLang = i18n.language?.startsWith('ru') ? 'ru' : 'de';

  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-sm">
      <button
        onClick={() => toggleLanguage('de')}
        className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
          currentLang === 'de' ? 'grayscale-0 scale-110 shadow-[0_0_10px_rgba(255,255,255,0.2)] z-10' : 'grayscale opacity-50 hover:opacity-100 hover:grayscale-0'
        }`}
        title="Deutsch"
      >
        {currentLang === 'de' && (
          <motion.div
            layoutId="lang-active"
            className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        <img referrerPolicy="no-referrer" src="/de.png" alt="Deutsch" className="relative z-10 w-6 h-4 rounded-sm object-cover shadow-sm" onError={(e) => { e.currentTarget.src = "https://flagcdn.com/w40/de.png" }} />
      </button>

      <button
        onClick={() => toggleLanguage('ru')}
        className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
          currentLang === 'ru' ? 'grayscale-0 scale-110 shadow-[0_0_10px_rgba(255,255,255,0.2)] z-10' : 'grayscale opacity-50 hover:opacity-100 hover:grayscale-0'
        }`}
        title="Русский"
      >
        {currentLang === 'ru' && (
          <motion.div
            layoutId="lang-active"
            className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        <img referrerPolicy="no-referrer" src="/ru.png" alt="Русский" className="relative z-10 w-6 h-4 rounded-sm object-cover shadow-sm" onError={(e) => { e.currentTarget.src = "https://flagcdn.com/w40/ru.png" }} />
      </button>
    </div>
  );
}
