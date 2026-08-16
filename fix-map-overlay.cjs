const fs = require('fs');
const newLocationCode = `import { Section } from './ui/Section';
import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Location() {
  const { t } = useTranslation();

  return (
    <Section id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-8">{t('loc.title')}.</h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">{t('loc.location_title')}</h4>
                <p className="text-neutral-400">Marzahner Promenade 25<br />12679 Berlin</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">{t('loc.hours_title')}</h4>
                <p className="text-neutral-400">
                  Mo. & Mi.: 16:00 - 19:00 Uhr<br />
                  Di. & Do.: 17:00 - 19:00 Uhr
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-white">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">{t('loc.phone')}</h4>
                <a href="tel:+493068073651" className="text-neutral-400 hover:text-primary transition-colors">030 / 68 07 36 51</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-white">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">{t('loc.email')}</h4>
                <a href="mailto:info@fahrschule-baer.de" className="text-neutral-400 hover:text-primary transition-colors">info@fahrschule-baer.de</a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden border border-white/10 group bg-[#0a0a0a]">
          {/* Subtle glow behind map */}
          <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 group-hover:bg-primary/30 transition-colors duration-500 pointer-events-none" />
          
          {/* Google Maps iFrame Background (Pointer events disabled) */}
          <div className="absolute inset-0 pointer-events-none">
            <iframe 
              src="https://maps.google.com/maps?q=Marzahner%20Promenade%2025,%2012679%20Berlin&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(85%) opacity(90%)' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Invisible overlay to prevent map dragging so the pin stays perfectly aligned */}
          <div className="absolute inset-0 z-10 bg-transparent" />

          {/* Custom Logo Pin perfectly centered over the iframe center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-20 flex flex-col items-center drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] pointer-events-none">
            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-[0_10px_30px_rgba(0,0,0,0.7)] border-4 border-primary flex items-center justify-center relative z-10">
              <img src="/logo.png" alt="Fahrschule Bär" className="w-full h-full object-contain rounded-full" />
            </div>
            {/* Pointer triangle */}
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-primary -mt-1"></div>
          </div>

          {/* Route Button Overlay */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex justify-center w-full px-4">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Marzahner+Promenade+25,+12679+Berlin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#D90429] hover:bg-[#b00320] text-white font-bold py-4 px-8 rounded-full shadow-[0_10px_30px_rgba(217,4,41,0.5)] transition-all hover:scale-105 active:scale-95 whitespace-nowrap border border-white/10 backdrop-blur-md text-lg"
            >
              <Navigation className="w-5 h-5 fill-white/20" />
              <span>Route berechnen</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
`;
fs.writeFileSync('src/components/Location.tsx', newLocationCode);
console.log('Successfully updated Location.tsx with fixed overlay map');
