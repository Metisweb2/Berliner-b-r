const fs = require('fs');
const newLocationCode = `import { Section } from './ui/Section';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Create a custom marker icon using the uploaded logo
const customIcon = L.divIcon({
  className: 'bg-transparent border-none', // Prevent default leaflet background
  html: \`
    <div class="relative flex flex-col items-center group cursor-pointer drop-shadow-2xl hover:scale-110 transition-transform duration-300" style="width: 80px; height: 94px;">
      <div class="w-20 h-20 bg-white rounded-full p-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-4 border-[#D90429] flex items-center justify-center z-10">
        <img src="/logo.png" alt="Fahrschule Bär" class="w-full h-full object-contain rounded-full" />
      </div>
      <div class="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[14px] border-l-transparent border-r-transparent border-t-[#D90429] -mt-1 transform transition-transform group-hover:translate-y-1"></div>
    </div>
  \`,
  iconSize: [80, 94],
  iconAnchor: [40, 94], // Anchor at the bottom tip of the triangle
});

export function Location() {
  const { t } = useTranslation();
  
  const position: [number, number] = [52.544415, 13.543206];

  return (
    <Section id="contact">
      {/* Inline styles to make OpenStreetMap dark mode and fix z-index */}
      <style>{\`
        .leaflet-container {
          width: 100%;
          height: 100%;
          border-radius: 1.5rem;
          background-color: #0a0a0a !important;
          z-index: 10;
        }
        .dark-tiles {
          filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5) !important;
        }
        .leaflet-control-zoom a {
          background-color: #1a1a1a !important;
          color: #fff !important;
          border-color: #333 !important;
        }
        .leaflet-control-zoom a:hover {
          background-color: #D90429 !important;
          color: #fff !important;
        }
      \`}</style>

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
                <p className="text-neutral-400">{t('loc.address_line')}<br />{t('loc.city_line')}</p>
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
                <a href="tel:+49123456789" className="text-neutral-400 hover:text-primary transition-colors">0123 / 456 789</a>
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
          
          <MapContainer 
            center={position} 
            zoom={16} 
            scrollWheelZoom={false}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              className="dark-tiles"
            />
            <Marker position={position} icon={customIcon} />
          </MapContainer>
        </div>
      </div>
    </Section>
  );
}
`;
fs.writeFileSync('src/components/Location.tsx', newLocationCode);
console.log('Successfully updated Location.tsx with Leaflet');
