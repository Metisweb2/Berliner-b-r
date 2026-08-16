import { useSEO } from '../hooks/useSEO';
import { About } from '../components/About';
import { Team } from '../components/Team';
import { Fleet } from '../components/Fleet';

export function UeberUns() {
  useSEO('Über Uns', 'Lerne das Team der Fahrschule Bär kennen.');

  return (
    <main className="pt-24 min-h-screen">
      <About />
      <Fleet />
      <Team />
    </main>
  );
}
