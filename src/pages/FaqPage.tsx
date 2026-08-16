import { useSEO } from '../hooks/useSEO';
import { FAQ } from '../components/FAQ';

export function FaqPage() {
  useSEO('FAQ', 'Häufig gestellte Fragen rund um die Fahrschule Bär.');

  return (
    <main className="pt-24 min-h-screen">
      <FAQ />
    </main>
  );
}
