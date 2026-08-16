import { useSEO } from '../hooks/useSEO';
import { CreatorFeed } from '../components/CreatorFeed';
import { Hero } from '../components/Hero';
import { GoogleReviews } from '../components/GoogleReviews';
import { Pricing } from '../components/Pricing';
import { USPs } from '../components/USPs';
import { Classes } from '../components/Classes';

export function Home() {
  useSEO('Fahrschule Berlin | Deine Premium Fahrschule Bär', 'Mache deinen Führerschein (Klasse B, B197, Automatik) sicher & schnell bei der Premium Fahrschule Bär in Berlin. Modernste Autos & geduldige Fahrlehrer.', true);

  return (
    <main>
      <Hero />
      <GoogleReviews />
      <Pricing />
      <USPs />
      <CreatorFeed />
      <Classes />
    </main>
  );
}
