import { redirect } from 'next/navigation';
import { StepIndicator } from '@/components/signup/StepIndicator';
import { Step1AccountDetails } from '@/components/signup/Step1AccountDetails';
import { Step2PersonalInfo } from '@/components/signup/Step2PersonalInfo';
import { Step3SocialAccounts } from '@/components/signup/Step3SocialAccounts';
import { Step4ContentPreferences } from '@/components/signup/Step4ContentPreferences';
import { signUpCreator } from './actions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Creator Signup — Sokohuru',
  description: 'Join Sokohuru as a creator and start collaborating with top East African brands.',
};

interface Props {
  params: Promise<{ step: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const STEP_LABELS = ['Account', 'Personal', 'Socials', 'Content'];

export default async function CreatorSignupPage({ params, searchParams }: Props) {
  const { step: stepParam } = await params;
  const searchParamsObj = await searchParams;

  const step = parseInt(stepParam);

  // Validate step
  if (isNaN(step) || step < 1 || step > 4) {
    redirect('/auth/signup/creator/1');
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
        {/* Step Indicator */}
        <StepIndicator totalSteps={4} currentStep={step} stepLabels={STEP_LABELS} />

        {/* Step Content */}
        <div className="py-8">
          {step === 1 && <Step1AccountDetails />}
          {step === 2 && <Step2PersonalInfo searchParams={searchParamsInstance} />}
          {step === 3 && <Step3SocialAccounts searchParams={searchParamsInstance} />}
          {step === 4 && (
            <Step4ContentPreferences
              searchParams={searchParamsInstance}
              onSubmit={async (data) => {
                'use server';
                await signUpCreator(data);
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
