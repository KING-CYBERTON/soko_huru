import { Hero } from '@/components/sections/Hero';
import { TrustedBy } from '@/components/sections/TrustedBy';
import { Features } from '@/components/sections/Features';
import { Stats } from '@/components/sections/Stats';
import { Testimonial } from '@/components/sections/Testimonial';
import { SplitCTA } from '@/components/sections/SplitCTA';
import { CTABanner } from '@/components/sections/CTABanner';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sokohuru',
    url: process.env.NEXT_PUBLIC_APP_URL,
    logo: `${process.env.NEXT_PUBLIC_APP_URL}/og-default.png`,
    description: 'Connect brands with the right creators. Authentic campaigns, real results, East Africa first.',
    sameAs: [
      'https://twitter.com/sokohuru',
      'https://facebook.com/sokohuru',
      'https://instagram.com/sokohuru',
      'https://linkedin.com/company/sokohuru',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <Stats />
        <Testimonial />
        <SplitCTA />
        <CTABanner />
      </main>
    </>
  );
}
