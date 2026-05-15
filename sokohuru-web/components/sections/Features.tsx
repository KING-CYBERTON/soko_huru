'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Shield, BarChart3, Wallet } from 'lucide-react';

const features = [
  {
    Icon: Users,
    title: 'Verified creator network',
    description: 'Browse thousands of verified creators across Kenya, Nigeria, South Africa, and Uganda. Filter by platform, audience, engagement rate, and content format.',
  },
  {
    Icon: Shield,
    title: 'Contracts & compliance',
    description: 'Every collaboration covered by a digital contract. Deliverables, timelines, usage rights, and exclusivity terms — all handled automatically.',
  },
  {
    Icon: BarChart3,
    title: 'Real-time campaign tracking',
    description: 'Track reach, engagement, clicks, and sales as they happen. Know your ROI before the campaign ends.',
  },
  {
    Icon: Wallet,
    title: 'Instant creator payouts',
    description: 'Creators paid via M-Pesa, bank transfer, or PayPal within 14 days of content approval. No invoice chasing.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="py-20 px-20 max-md:px-5 max-md:py-16"
      style={{ background: 'var(--sk-base)' }}
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 max-md:mb-12">
          <span
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '.1em',
              color: 'var(--sk-pink-light)',
              textTransform: 'uppercase',
              fontFamily: 'var(--sk-font-body)',
            }}
          >
            BUILT FOR EAST AFRICA
          </span>
          <h2
            className="mt-4"
            style={{
              fontFamily: 'var(--sk-font-display)',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 600,
              color: 'var(--sk-text-primary)',
              lineHeight: 1.2,
            }}
          >
            Everything you need to run creator campaigns
          </h2>
          <p
            className="mt-4 mx-auto"
            style={{
              fontSize: '16px',
              color: 'var(--sk-text-secondary)',
              lineHeight: 1.6,
              maxWidth: '560px',
              fontFamily: 'var(--sk-font-body)',
            }}
          >
            From discovery to payment — Sokohuru handles the entire creator campaign lifecycle in one platform.
          </p>
        </div>

        {/* Feature cards grid */}
        <motion.div
          className="grid grid-cols-2 gap-6 max-md:grid-cols-1"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
        >
          {features.map((feature) => {
            const Icon = feature.Icon;
            return (
              <motion.div
                key={feature.title}
                className="p-7"
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: 'var(--sk-surface-1)',
                  borderRadius: 'var(--sk-radius-lg)',
                  border: '0.5px solid var(--sk-border)',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    marginBottom: '12px',
                  }}
                >
                  <Icon size={32} style={{ color: 'var(--sk-pink-light)' }} />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--sk-font-body)',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: 'var(--sk-text-primary)',
                    marginBottom: '6px',
                  }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'var(--sk-font-body)',
                    fontSize: '14px',
                    color: 'var(--sk-text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
