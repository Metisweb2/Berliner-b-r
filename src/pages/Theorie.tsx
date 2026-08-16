import { useSEO } from '../hooks/useSEO';
import { TheorySchedule } from '../components/TheorySchedule';

export function Theorie() {
  useSEO('Theorieunterricht', 'Alle Informationen zu unseren Theoriekursen und Terminen.');

  return (
    <main className="pt-24 min-h-screen bg-dark-bg">
      <TheorySchedule />
    </main>
  );
}
