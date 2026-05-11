'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { trackEvent, EVENTS } from '@/lib/analytics';

interface ContactData {
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
}

interface Step4Data {
  primaryContact: ContactData;
  discoverable: boolean;
  openToApplications: boolean;
  showPastCampaigns: boolean;
  emailNotifications: boolean;
}

interface Step4Props {
  searchParams: URLSearchParams;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (allData: any) => Promise<void>;
}

export function BrandStep4TeamContacts({ searchParams, onSubmit }: Step4Props) {
  const [formData, setFormData] = useState<Step4Data>({
    primaryContact: { firstName: '', lastName: '', role: '', phone: '' },
    discoverable: true,
    openToApplications: true,
    showPastCampaigns: false,
    emailNotifications: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.primaryContact.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.primaryContact.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.primaryContact.role.trim()) newErrors.role = 'Role is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinish = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const allData = {
        email: searchParams.get('email') || '',
        role: searchParams.get('role') || '',
        password: sessionStorage.getItem('brand_signup_password') || '',
        companyName: searchParams.get('companyName') || '',
        accountSlug: searchParams.get('accountSlug') || '',
        website: searchParams.get('website') || '',
        bio: searchParams.get('bio') || '',
        city: searchParams.get('city') || '',
        country: searchParams.get('country') || '',
        logoUrl: searchParams.get('logoUrl') || '',
        coverPhotoUrl: searchParams.get('coverPhotoUrl') || '',
        primaryIndustry: searchParams.get('primaryIndustry') || '',
        collabTypes: searchParams.get('collabTypes')?.split(',') || [],
        primaryContact: formData.primaryContact,
        settings: {
          discoverable: formData.discoverable,
          openToApplications: formData.openToApplications,
          showPastCampaigns: formData.showPastCampaigns,
          emailNotifications: formData.emailNotifications,
        },
      };

      await onSubmit(allData);

      // Track signup completed
      trackEvent(EVENTS.BRAND_SIGNUP_COMPLETED);

      sessionStorage.removeItem('brand_signup_password');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Signup failed:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="mb-8">
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '28px', fontWeight: 700, color: 'var(--sk-text-primary)', marginBottom: '8px' }}>
          Team contacts
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'var(--sk-text-secondary)' }}>
          Who should we contact about campaigns?
        </p>
      </div>

      {/* Primary Contact */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: 'var(--sk-text-primary)' }}>
            First name *
          </label>
          <input
            type="text"
            value={formData.primaryContact.firstName}
            onChange={(e) => setFormData({ ...formData, primaryContact: { ...formData.primaryContact, firstName: e.target.value } })}
            style={{ width: '100%', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', backgroundColor: 'var(--sk-surface-2)', border: '0.5px solid var(--sk-border)', borderRadius: 'var(--sk-radius-md)', color: 'var(--sk-text-primary)', outline: 'none' }}
          />
          {errors.firstName && <div style={{ marginTop: '4px', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--sk-error)' }}>{errors.firstName}</div>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: 'var(--sk-text-primary)' }}>
            Last name *
          </label>
          <input
            type="text"
            value={formData.primaryContact.lastName}
            onChange={(e) => setFormData({ ...formData, primaryContact: { ...formData.primaryContact, lastName: e.target.value } })}
            style={{ width: '100%', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', backgroundColor: 'var(--sk-surface-2)', border: '0.5px solid var(--sk-border)', borderRadius: 'var(--sk-radius-md)', color: 'var(--sk-text-primary)', outline: 'none' }}
          />
          {errors.lastName && <div style={{ marginTop: '4px', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--sk-error)' }}>{errors.lastName}</div>}
        </div>
      </div>

      <div className="mb-6">
        <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: 'var(--sk-text-primary)' }}>
          Role at brand *
        </label>
        <input
          type="text"
          value={formData.primaryContact.role}
          onChange={(e) => setFormData({ ...formData, primaryContact: { ...formData.primaryContact, role: e.target.value } })}
          style={{ width: '100%', padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: '14px', backgroundColor: 'var(--sk-surface-2)', border: '0.5px solid var(--sk-border)', borderRadius: 'var(--sk-radius-md)', color: 'var(--sk-text-primary)', outline: 'none' }}
        />
        {errors.role && <div style={{ marginTop: '4px', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--sk-error)' }}>{errors.role}</div>}
      </div>

      {/* Settings */}
      <div className="mb-8 space-y-3">
        <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, color: 'var(--sk-text-primary)', marginBottom: '12px' }}>
          Profile settings
        </h3>

        {[
          { key: 'discoverable' as const, label: 'Discoverable', desc: 'Show your profile to creators' },
          { key: 'openToApplications' as const, label: 'Open to applications', desc: 'Allow creators to apply to campaigns' },
          { key: 'showPastCampaigns' as const, label: 'Show past campaigns', desc: 'Display campaign history on profile' },
          { key: 'emailNotifications' as const, label: 'Email notifications', desc: 'Receive updates via email' },
        ].map((setting) => (
          <label key={setting.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: 'var(--sk-surface-2)', border: '0.5px solid var(--sk-border)', borderRadius: 'var(--sk-radius-md)', cursor: 'pointer' }}>
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: 'var(--sk-text-primary)' }}>{setting.label}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--sk-text-muted)' }}>{setting.desc}</div>
            </div>
            <input
              type="checkbox"
              checked={formData[setting.key]}
              onChange={(e) => setFormData({ ...formData, [setting.key]: e.target.checked })}
              style={{ width: '20px', height: '20px', accentColor: 'var(--sk-brand)' }}
            />
          </label>
        ))}
      </div>

      {/* Submit Button */}
      <Button variant="primary" size="lg" fullWidth onClick={handleFinish} loading={isSubmitting}>
        Finish setup
      </Button>
    </div>
  );
}
