import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { TrustedBy } from '@/components/sections/TrustedBy';
import { Features } from '@/components/sections/Features';
import { Stats } from '@/components/sections/Stats';
import { Testimonial } from '@/components/sections/Testimonial';
import { SplitCTA } from '@/components/sections/SplitCTA';
import { CTABanner } from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Sokohuru — Where Brands Meet Creators',
  description: 'The premier creator marketplace for East Africa. Connect brands with verified creators for authentic campaigns that drive real results. Launch UGC, affiliate, and ambassador campaigns across Kenya, Nigeria, South Africa, and Uganda.',
};

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
