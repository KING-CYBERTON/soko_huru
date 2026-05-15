'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { ShieldCheck } from 'lucide-react';

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function Hero() {
  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="hero-mesh-bg grain-overlay relative min-h-screen flex items-center px-20 max-md:px-5 max-md:py-16"
    >
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-2 gap-16 items-center max-md:grid-cols-1 max-md:gap-12">
        {/* Left column - Content */}
        <motion.div
          className="flex flex-col"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Eyebrow */}
          <motion.span
            variants={fadeUp}
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '.1em',
              color: 'var(--sk-pink-light)',
              textTransform: 'uppercase',
              fontFamily: 'var(--sk-font-body)',
            }}
          >
            THE EAST AFRICAN CREATOR MARKETPLACE
          </motion.span>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="mt-4"
            style={{
              fontFamily: 'var(--sk-font-display)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 600,
              color: 'var(--sk-text-primary)',
              lineHeight: 1.1,
            }}
          >
            Connect brands with
            <br />
            the right{' '}
            <span style={{ color: 'var(--sk-pink)' }}>creators.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[520px]"
            style={{
              fontSize: '18px',
              color: 'var(--sk-text-secondary)',
              lineHeight: 1.6,
              fontFamily: 'var(--sk-font-body)',
            }}
          >
            Authentic campaigns, real results. Brands find verified East African creators. Creators earn real income from partnerships they believe in.
          </motion.p>

          {/* Button row */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mt-8 max-md:flex-col max-md:w-full"
          >
            <Link href="/auth/signup" className="max-md:w-full">
              <Button variant="primary" size="lg" fullWidth className="max-md:w-full">
                Start for free →
              </Button>
            </Link>
            <button
              onClick={scrollToHowItWorks}
              className="max-md:w-full"
              style={{
                padding: '12px 24px',
                background: 'transparent',
                border: '1px solid var(--sk-border)',
                borderRadius: 'var(--sk-radius-md)',
                color: 'var(--sk-text-primary)',
                fontSize: '15px',
                fontWeight: 500,
                fontFamily: 'var(--sk-font-body)',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
            >
              See how it works
            </button>
          </motion.div>

          {/* Trust line */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 mt-6"
          >
            <ShieldCheck size={16} style={{ color: 'var(--sk-text-muted)' }} />
            <span
              style={{
                fontSize: '13px',
                color: 'var(--sk-text-muted)',
                fontFamily: 'var(--sk-font-body)',
              }}
            >
              No subscription required · Pay per campaign
            </span>
          </motion.div>
        </motion.div>

        {/* Right column - Dashboard mockup */}
        <motion.div
          className="max-md:hidden"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
          transition={{
            opacity: { duration: 0.6, ease: 'easeOut' },
            x: { duration: 0.6, ease: 'easeOut' },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <div className="glass-card overflow-hidden">
            {/* Dashboard container */}
            <div className="flex" style={{ height: '500px' }}>
              {/* Sidebar */}
              <div
                className="flex flex-col gap-1 p-4"
                style={{
                  width: '180px',
                  background: 'var(--sk-surface-2)',
                  borderRight: '0.5px solid var(--sk-border)',
                }}
              >
                {[
                  { label: 'Overview', active: true },
                  { label: 'Campaigns', active: false },
                  { label: 'Creators', active: false },
                  { label: 'Inbox', active: false, hasNotification: true },
                  { label: 'Payouts', active: false },
                  { label: 'Settings', active: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="px-3 py-2 rounded flex items-center justify-between"
                    style={{
                      background: item.active ? 'var(--sk-pink-dark)' : 'transparent',
                      color: item.active ? 'var(--sk-pink-light)' : 'var(--sk-text-secondary)',
                      fontSize: '13px',
                      fontFamily: 'var(--sk-font-body)',
                      fontWeight: item.active ? 500 : 400,
                    }}
                  >
                    {item.label}
                    {item.hasNotification && (
                      <div
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'var(--sk-pink)',
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Main area */}
              <div className="flex-1 p-6 flex flex-col gap-6">
                {/* Campaign stats row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--sk-text-muted)',
                        fontFamily: 'var(--sk-font-body)',
                        marginBottom: '6px',
                      }}
                    >
                      Active Campaigns
                    </div>
                    <div
                      style={{
                        fontSize: '28px',
                        fontWeight: 600,
                        color: 'var(--sk-text-primary)',
                        fontFamily: 'var(--sk-font-display)',
                      }}
                    >
                      3
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--sk-text-muted)',
                        fontFamily: 'var(--sk-font-body)',
                        marginBottom: '6px',
                      }}
                    >
                      Applications received
                    </div>
                    <div
                      style={{
                        fontSize: '28px',
                        fontWeight: 600,
                        color: 'var(--sk-text-primary)',
                        fontFamily: 'var(--sk-font-display)',
                      }}
                    >
                      47
                    </div>
                  </div>
                </div>

                {/* Campaign card */}
                <div
                  style={{
                    padding: '12px',
                    background: 'var(--sk-surface-2)',
                    borderRadius: 'var(--sk-radius-md)',
                    border: '0.5px solid var(--sk-border)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--sk-text-primary)',
                      fontFamily: 'var(--sk-font-body)',
                      marginBottom: '4px',
                    }}
                  >
                    Back to school haul
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span
                      style={{
                        fontSize: '11px',
                        color: 'var(--sk-text-muted)',
                        fontFamily: 'var(--sk-font-body)',
                      }}
                    >
                      Zara Kenya
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: 'var(--sk-success-surface)',
                        color: 'var(--sk-success-text)',
                        fontFamily: 'var(--sk-font-body)',
                      }}
                    >
                      Active
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: 'var(--sk-text-secondary)',
                        fontFamily: 'var(--sk-font-body)',
                      }}
                    >
                      5 approved
                    </span>
                  </div>
                </div>

                {/* Creator payout rows */}
                <div className="flex flex-col gap-2">
                  {[
                    { name: 'Maya R.', status: 'Content approved', amount: '$800', color: 'var(--sk-pink)' },
                    { name: 'Zoe N.', status: 'Under review', amount: '$160', color: 'var(--sk-text-muted)' },
                  ].map((creator) => (
                    <div
                      key={creator.name}
                      className="flex items-center justify-between"
                      style={{
                        padding: '8px',
                        borderRadius: 'var(--sk-radius-sm)',
                        background: 'var(--sk-surface-2)',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          style={{
                            fontSize: '13px',
                            fontWeight: 500,
                            color: 'var(--sk-text-primary)',
                            fontFamily: 'var(--sk-font-body)',
                          }}
                        >
                          {creator.name}
                        </span>
                        <span
                          style={{
                            fontSize: '11px',
                            color: 'var(--sk-text-muted)',
                            fontFamily: 'var(--sk-font-body)',
                          }}
                        >
                          {creator.status}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: creator.color,
                          fontFamily: 'var(--sk-font-body)',
                        }}
                      >
                        {creator.amount}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stat chips */}
                <div className="flex items-center gap-3 mt-2">
                  {[
                    { label: 'Reach', value: '284K' },
                    { label: 'Engagement', value: '4.7%' },
                    { label: 'ROI', value: '3.2×' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--sk-radius-sm)',
                        background: 'var(--sk-surface-3)',
                        fontSize: '11px',
                        fontFamily: 'var(--sk-font-body)',
                      }}
                    >
                      <span style={{ color: 'var(--sk-text-primary)', fontWeight: 600 }}>
                        {stat.value}
                      </span>
                      {' '}
                      <span style={{ color: 'var(--sk-text-muted)' }}>
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
