import { useSEO } from '../hooks/useSEO';
import { Location } from '../components/Location';
import { Registration } from '../components/Registration';

export function Kontakt() {
  useSEO('Kontakt', 'Kontaktiere uns oder melde dich direkt für deinen Führerschein an.');

  return (
    <main className="pt-24 min-h-screen">
      <Registration />
      <Location />
    </main>
  );
}
