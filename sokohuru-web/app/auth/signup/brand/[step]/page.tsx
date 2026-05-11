import { redirect } from 'next/navigation';
import { StepIndicator } from '@/components/signup/StepIndicator';
import { BrandStep1AccountDetails } from '@/components/signup/BrandStep1AccountDetails';
import { BrandStep2Profile } from '@/components/signup/BrandStep2Profile';
import { BrandStep3Industry } from '@/components/signup/BrandStep3Industry';
import { BrandStep4TeamContacts } from '@/components/signup/BrandStep4TeamContacts';
import { signUpBrand } from './actions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand Signup — Sokohuru',
  description: 'Join Sokohuru as a brand and connect with top East African creators.',
};

interface Props {
  params: Promise<{ step: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const STEP_LABELS = ['Account', 'Profile', 'Industry', 'Team'];

export default async function BrandSignupPage({ params, searchParams }: Props) {
  const { step: stepParam } = await params;
  const searchParamsObj = await searchParams;

  const step = parseInt(stepParam);

  if (isNaN(step) || step < 1 || step > 4) {
    redirect('/auth/signup/brand/1');
  }

  const searchParamsInstance = new URLSearchParams(
    Object.entries(searchParamsObj).reduce((acc, [key, value]) => {
      if (typeof value === 'string') {
        acc[key] = value;
      } else if (Array.isArray(value)) {
        acc[key] = value[0];
      }
      return acc;
    }, {} as Record<string, string>)
  );

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--sk-background)',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <StepIndicator totalSteps={4} currentStep={step} stepLabels={STEP_LABELS} />

        <div className="py-8">
          {step === 1 && <BrandStep1AccountDetails />}
          {step === 2 && <BrandStep2Profile searchParams={searchParamsInstance} />}
          {step === 3 && <BrandStep3Industry searchParams={searchParamsInstance} />}
          {step === 4 && (
            <BrandStep4TeamContacts
              searchParams={searchParamsInstance}
              onSubmit={async (data) => {
                'use server';
                await signUpBrand(data);
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
