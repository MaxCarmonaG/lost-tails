import Hero from '@/Components/Hero';
import DonationSection from '@/Components/DonationSection';
import AdoptionSection from '@/Components/AdoptionSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <AdoptionSection />
      <DonationSection />
    </main>
  );
}
