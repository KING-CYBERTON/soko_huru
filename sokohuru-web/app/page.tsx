import { Hero } from '@/components/sections/Hero';
import { TrustedBy } from '@/components/sections/TrustedBy';
import { Features } from '@/components/sections/Features';
import { Stats } from '@/components/sections/Stats';
import { Testimonial } from '@/components/sections/Testimonial';
import { SplitCTA } from '@/components/sections/SplitCTA';
import { CTABanner } from '@/components/sections/CTABanner';

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <Features />
      <Stats />
      <Testimonial />
      <SplitCTA />
      <CTABanner />
    </main>
  );
}
