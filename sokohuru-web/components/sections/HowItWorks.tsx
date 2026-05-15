'use client';

import { useState } from 'react';
import { User, Search, CheckCircle, Wallet, Plus, Inbox, Users, CreditCard } from 'lucide-react';

type Tab = 'creators' | 'brands';

interface Step {
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  title: string;
  description: string;
}

const creatorSteps: Step[] = [
  {
    Icon: User,
    title: 'Create your profile',
    description: 'Sign up, connect your social accounts, and set your content preferences. Takes under 5 minutes.',
  },
  {
    Icon: Search,
    title: 'Discover campaigns',
    description: 'Browse live campaigns from verified brands. Your fit score tells you how well you match before you even apply.',
  },
  {
    Icon: CheckCircle,
    title: 'Apply & get selected',
    description: 'Submit your application with a personal pitch. Brands review your profile and approve their shortlist.',
  },
  {
    Icon: Wallet,
    title: 'Create, submit & get paid',
    description: 'Create your content, submit the post link, and receive payment within 14 days of approval via M-Pesa, bank, or PayPal.',
  },
];

const brandSteps: Step[] = [
  {
    Icon: Plus,
    title: 'Create your campaign',
    description: 'Set your brief, budget, deliverables, and creator requirements. Campaign goes live in minutes.',
  },
  {
    Icon: Inbox,
    title: 'Receive applications',
    description: 'Creators matching your requirements apply. Each profile includes audience demographics, engagement rates, and past brand work.',
  },
  {
    Icon: Users,
    title: 'Approve your creators',
    description: 'Review profiles, shortlist candidates, and approve your final selection. Digital contracts issued automatically.',
  },
  {
    Icon: CreditCard,
    title: 'Review content & pay',
    description: 'Content submitted for your review. Approve posts you love and release payment. Track ROI in real time.',
  },
];

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState<Tab>('creators');

  const steps = activeTab === 'creators' ? creatorSteps : brandSteps;

  return (
    <section
      id="how-it-works"
      className="py-20 px-20 max-md:px-5 max-md:py-16"
      style={{ background: 'var(--sk-surface-1)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
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
            HOW IT WORKS
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
            From discovery to payment in four steps
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-8 mb-12 border-b border-sk-border">
          <button
            onClick={() => setActiveTab('creators')}
            style={{
              padding: '12px 0',
              fontSize: '16px',
              fontWeight: 500,
              fontFamily: 'var(--sk-font-body)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: activeTab === 'creators' ? 'var(--sk-pink)' : 'var(--sk-text-muted)',
              borderBottom: activeTab === 'creators' ? '2px solid var(--sk-pink)' : '2px solid transparent',
              transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            For Creators
          </button>
          <button
            onClick={() => setActiveTab('brands')}
            style={{
              padding: '12px 0',
              fontSize: '16px',
              fontWeight: 500,
              fontFamily: 'var(--sk-font-body)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: activeTab === 'brands' ? 'var(--sk-pink)' : 'var(--sk-text-muted)',
              borderBottom: activeTab === 'brands' ? '2px solid var(--sk-pink)' : '2px solid transparent',
              transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            For Brands
          </button>
        </div>

        {/* Steps - Desktop: row with arrows, Mobile: vertical list */}
        <div className="grid grid-cols-4 gap-8 max-md:grid-cols-1 max-md:gap-6">
          {steps.map((step, index) => {
            const Icon = step.Icon;
            return (
              <div key={step.title} className="flex flex-col items-center text-center">
                {/* Icon */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'var(--sk-pink-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <Icon size={28} style={{ color: 'var(--sk-pink-light)' }} />
                </div>

                {/* Step number */}
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--sk-pink)',
                    fontFamily: 'var(--sk-font-body)',
                    marginBottom: '6px',
                  }}
                >
                  Step {index + 1}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--sk-text-primary)',
                    fontFamily: 'var(--sk-font-body)',
                    marginBottom: '6px',
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--sk-text-secondary)',
                    lineHeight: 1.6,
                    fontFamily: 'var(--sk-font-body)',
                  }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
