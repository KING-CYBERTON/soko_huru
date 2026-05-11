-- ============================================================
-- EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE campaign_type_enum AS ENUM (
  'affiliate', 'ambassador', 'ugc', 'gifting', 'commission', 'pay_per_view'
);

CREATE TYPE campaign_status_enum AS ENUM (
  'draft', 'active', 'paused', 'completed', 'cancelled'
);

CREATE TYPE submission_status_enum AS ENUM (
  'pending', 'under_review', 'approved', 'rejected', 'cancelled'
);

CREATE TYPE payment_status_enum AS ENUM (
  'unpaid', 'pending', 'paid', 'refunded'
);

CREATE TYPE content_type_enum AS ENUM (
  'video', 'photo', 'reel', 'story', 'live_stream'
);

CREATE TYPE content_format_enum AS ENUM (
  'get_ready_with_me', 'tutorial_how_to', 'product_review',
  'storytime_personal', 'challenges_trends_viral',
  'day_in_the_life_vlog', 'hauls', 'behind_the_scenes',
  'sketch_comedy', 'dance', 'cover_song',
  'qa_ask_me_anything', 'live_stream'
);

CREATE TYPE platform_enum AS ENUM (
  'instagram', 'youtube', 'tiktok', 'facebook', 'other'
);

CREATE TYPE account_type_enum AS ENUM (
  'personal', 'creator', 'business'
);

CREATE TYPE contract_status_enum AS ENUM (
  'pending', 'signed', 'expired', 'cancelled'
);

CREATE TYPE priority_enum AS ENUM (
  'low', 'medium', 'high', 'urgent'
);

CREATE TYPE collaboration_type_enum AS ENUM (
  'affiliate', 'ambassador', 'ugc', 'gifting', 'commission', 'pay_per_view'
);

CREATE TYPE user_role_enum AS ENUM (
  'creator', 'brand'
);

CREATE TYPE notification_type_enum AS ENUM (
  'submission_pending', 'submission_approved', 'submission_rejected',
  'submission_shortlisted', 'contract_issued', 'contract_signed',
  'content_approved', 'content_revision_requested',
  'payment_queued', 'payment_sent', 'campaign_cancelled',
  'campaign_invite'
);

CREATE TYPE payout_status_enum AS ENUM (
  'requested', 'processing', 'sent', 'failed'
);

CREATE TYPE payout_method_enum AS ENUM (
  'mpesa', 'bank_transfer', 'paypal', 'other'
);

CREATE TYPE revision_status_enum AS ENUM (
  'pending', 'resubmitted', 'resolved'
);


-- ============================================================
-- SUPABASE AUTH HOOK
-- ============================================================
CREATE TABLE public.user_roles (
  id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role  user_role_enum NOT NULL
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own role"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = id);


-- ============================================================
-- BRAND PROFILE
-- ============================================================
CREATE TABLE public.brand_profile (
  id                      UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name            TEXT NOT NULL,
  logo_url                TEXT,
  cover_photo_url         TEXT,
  website                 TEXT,
  bio                     TEXT,
  target_audience         TEXT,
  founded_year            INT,
  team_size               TEXT,
  account_slug            TEXT NOT NULL UNIQUE,
  city                    TEXT,
  state_province          TEXT,
  country                 TEXT,
  preferred_collab_types  collaboration_type_enum[],
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.brand_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Brand can manage own profile"
  ON public.brand_profile FOR ALL
  USING (auth.uid() = id);

CREATE POLICY "Brand profile publicly viewable"
  ON public.brand_profile FOR SELECT
  USING (true);


CREATE TABLE public.brand_contacts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id    UUID NOT NULL REFERENCES public.brand_profile(id) ON DELETE CASCADE,
  first_name  TEXT NOT NULL,
  last_name   TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  role        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.brand_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Brand manages own contacts"
  ON public.brand_contacts FOR ALL
  USING (auth.uid() = brand_id);


CREATE TABLE public.brand_industry_tags (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id  UUID NOT NULL REFERENCES public.brand_profile(id) ON DELETE CASCADE,
  industry  TEXT NOT NULL,
  category  TEXT
);

ALTER TABLE public.brand_industry_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Brand manages own industry tags"
  ON public.brand_industry_tags FOR ALL
  USING (auth.uid() = brand_id);

CREATE POLICY "Industry tags publicly viewable"
  ON public.brand_industry_tags FOR SELECT
  USING (true);


CREATE TABLE public.brand_settings (
  id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id                UUID NOT NULL UNIQUE REFERENCES public.brand_profile(id) ON DELETE CASCADE,
  discoverable            BOOLEAN NOT NULL DEFAULT TRUE,
  open_to_applications    BOOLEAN NOT NULL DEFAULT TRUE,
  show_past_campaigns     BOOLEAN NOT NULL DEFAULT FALSE,
  email_notifications     BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.brand_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Brand manages own settings"
  ON public.brand_settings FOR ALL
  USING (auth.uid() = brand_id);


-- ============================================================
-- CREATOR PROFILE
-- ============================================================
CREATE TABLE public.creator_profile (
  id                  UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name          TEXT NOT NULL,
  last_name           TEXT NOT NULL,
  date_of_birth       DATE,
  account_slug        TEXT NOT NULL UNIQUE,
  city                TEXT,
  state_province      TEXT,
  country             TEXT,
  marital_status      TEXT,
  ethnicity           TEXT,
  bio                 TEXT,
  languages           TEXT[],
  profile_photo       TEXT,
  cover_photo         TEXT,
  front_id_photo_link TEXT,
  back_id_photo_link  TEXT,
  website             TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.creator_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Creator can manage own profile"
  ON public.creator_profile FOR ALL
  USING (auth.uid() = id);

CREATE POLICY "Creator profile publicly viewable"
  ON public.creator_profile FOR SELECT
  USING (true);


CREATE TABLE public.social_accounts (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id    UUID NOT NULL REFERENCES public.creator_profile(id) ON DELETE CASCADE,
  platform      platform_enum NOT NULL,
  account_name  TEXT,
  username      TEXT,
  account_id    TEXT,
  account_type  account_type_enum,
  followers     INTEGER,
  engagement    NUMERIC(5,2),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (profile_id, platform)
);

ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Creator manages own social accounts"
  ON public.social_accounts FOR ALL
  USING (auth.uid() = profile_id);

CREATE POLICY "Social accounts publicly viewable"
  ON public.social_accounts FOR SELECT
  USING (true);


CREATE TABLE public.content_aesthetic (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id      UUID NOT NULL REFERENCES public.creator_profile(id) ON DELETE CASCADE,
  aesthetic_type  TEXT NOT NULL
);

ALTER TABLE public.content_aesthetic ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Creator manages own aesthetics"
  ON public.content_aesthetic FOR ALL
  USING (auth.uid() = profile_id);

CREATE POLICY "Aesthetics publicly viewable"
  ON public.content_aesthetic FOR SELECT
  USING (true);


CREATE TABLE public.interests (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id  UUID NOT NULL REFERENCES public.creator_profile(id) ON DELETE CASCADE,
  interest    TEXT NOT NULL
);

ALTER TABLE public.interests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Creator manages own interests"
  ON public.interests FOR ALL
  USING (auth.uid() = profile_id);


CREATE TABLE public.preferred_brands (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id  UUID NOT NULL REFERENCES public.creator_profile(id) ON DELETE CASCADE,
  brand_id    UUID REFERENCES public.brand_profile(id) ON DELETE SET NULL,
  brand_name  TEXT NOT NULL
);

ALTER TABLE public.preferred_brands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Creator manages own preferred brands"
  ON public.preferred_brands FOR ALL
  USING (auth.uid() = profile_id);


CREATE TABLE public.brand_collaboration_highlights (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id    UUID NOT NULL REFERENCES public.creator_profile(id) ON DELETE CASCADE,
  brand_id      UUID REFERENCES public.brand_profile(id) ON DELETE SET NULL,
  brand_name    TEXT NOT NULL,
  description   TEXT,
  reach         TEXT,
  link_to_post  TEXT,
  highlight_date DATE
);

ALTER TABLE public.brand_collaboration_highlights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Creator manages own highlights"
  ON public.brand_collaboration_highlights FOR ALL
  USING (auth.uid() = profile_id);

CREATE POLICY "Highlights publicly viewable"
  ON public.brand_collaboration_highlights FOR SELECT
  USING (true);


CREATE TABLE public.demographics (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id    UUID NOT NULL REFERENCES public.creator_profile(id) ON DELETE CASCADE,
  platform      platform_enum NOT NULL,
  region        TEXT,
  age_range     TEXT,
  gender_split  JSONB,
  top_country   TEXT,
  avg_reach     INTEGER,
  UNIQUE (profile_id, platform)
);

ALTER TABLE public.demographics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Creator manages own demographics"
  ON public.demographics FOR ALL
  USING (auth.uid() = profile_id);


CREATE TABLE public.general_settings (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id  UUID NOT NULL REFERENCES public.creator_profile(id) ON DELETE CASCADE,
  platform    platform_enum NOT NULL,
  available   BOOLEAN NOT NULL DEFAULT TRUE,
  UNIQUE (profile_id, platform)
);

ALTER TABLE public.general_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Creator manages own settings"
  ON public.general_settings FOR ALL
  USING (auth.uid() = profile_id);


-- ============================================================
-- CAMPAIGNS
-- ============================================================
CREATE TABLE public.campaigns (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id              UUID NOT NULL REFERENCES public.brand_profile(id) ON DELETE CASCADE,
  campaign_image        TEXT,
  campaign_type         campaign_type_enum NOT NULL,
  start_date            DATE,
  end_date              DATE,
  budget                NUMERIC(12, 2),
  status                campaign_status_enum NOT NULL DEFAULT 'draft',
  priority              priority_enum NOT NULL DEFAULT 'medium',
  about_project         TEXT,
  project_perks         TEXT,
  activity              TEXT,
  suggested_captions    TEXT,
  content_guidelines    TEXT,
  cancelled_reason      TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Brand manages own campaigns"
  ON public.campaigns FOR ALL
  USING (auth.uid() = brand_id);

CREATE POLICY "Active campaigns publicly viewable"
  ON public.campaigns FOR SELECT
  USING (status = 'active');


CREATE TABLE public.campaign_deliverables (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id   UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  platform      platform_enum NOT NULL,
  content_type  content_type_enum NOT NULL,
  duration      TEXT,
  due_date      DATE,
  notes         TEXT
);

ALTER TABLE public.campaign_deliverables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Brand manages own deliverables"
  ON public.campaign_deliverables FOR ALL
  USING (
    auth.uid() IN (
      SELECT brand_id FROM public.campaigns WHERE id = campaign_id
    )
  );

CREATE POLICY "Deliverables publicly viewable for active campaigns"
  ON public.campaign_deliverables FOR SELECT
  USING (
    campaign_id IN (
      SELECT id FROM public.campaigns WHERE status = 'active'
    )
  );


CREATE TABLE public.campaign_requirements (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id         UUID NOT NULL UNIQUE REFERENCES public.campaigns(id) ON DELETE CASCADE,
  min_followers       INTEGER,
  max_followers       INTEGER,
  region              TEXT,
  age_range           TEXT,
  gender              TEXT,
  min_engagement      NUMERIC(5, 2),
  required_formats    TEXT[]
);

ALTER TABLE public.campaign_requirements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Brand manages own requirements"
  ON public.campaign_requirements FOR ALL
  USING (
    auth.uid() IN (
      SELECT brand_id FROM public.campaigns WHERE id = campaign_id
    )
  );

CREATE POLICY "Requirements publicly viewable for active campaigns"
  ON public.campaign_requirements FOR SELECT
  USING (
    campaign_id IN (
      SELECT id FROM public.campaigns WHERE status = 'active'
    )
  );


CREATE TABLE public.campaign_invites (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id   UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  profile_id    UUID NOT NULL REFERENCES public.creator_profile(id) ON DELETE CASCADE,
  message       TEXT,
  status        TEXT NOT NULL DEFAULT 'pending',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (campaign_id, profile_id)
);

ALTER TABLE public.campaign_invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Brand manages own invites"
  ON public.campaign_invites FOR ALL
  USING (
    auth.uid() IN (
      SELECT brand_id FROM public.campaigns WHERE id = campaign_id
    )
  );

CREATE POLICY "Creator views own invites"
  ON public.campaign_invites FOR SELECT
  USING (auth.uid() = profile_id);


-- ============================================================
-- CAMPAIGN SUBMISSIONS
-- ============================================================
CREATE TABLE public.campaign_submissions (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id       UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  profile_id        UUID NOT NULL REFERENCES public.creator_profile(id) ON DELETE CASCADE,
  status            submission_status_enum NOT NULL DEFAULT 'pending',
  brand_message     TEXT,
  rejection_reason  TEXT,
  fit_score         INTEGER,
  submitted_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (campaign_id, profile_id)
);

ALTER TABLE public.campaign_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Creator manages own submissions"
  ON public.campaign_submissions FOR ALL
  USING (auth.uid() = profile_id);

CREATE POLICY "Brand views submissions to own campaigns"
  ON public.campaign_submissions FOR SELECT
  USING (
    auth.uid() IN (
      SELECT brand_id FROM public.campaigns WHERE id = campaign_id
    )
  );

CREATE POLICY "Brand updates submissions to own campaigns"
  ON public.campaign_submissions FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT brand_id FROM public.campaigns WHERE id = campaign_id
    )
  );


-- ============================================================
-- CONTENT SUBMISSIONS
-- ============================================================
CREATE TABLE public.content_submission (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id         UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  profile_id          UUID NOT NULL REFERENCES public.creator_profile(id) ON DELETE CASCADE,
  deliverable_id      UUID REFERENCES public.campaign_deliverables(id) ON DELETE SET NULL,
  content_type        content_type_enum,
  content_format      content_format_enum,
  link_to_post        TEXT,
  platform_submitted  platform_enum,
  suggested_captions  TEXT,
  collaboration_type  collaboration_type_enum,
  commission          NUMERIC(10, 2),
  gifting             TEXT,
  pay_per_view        NUMERIC(10, 2),
  payment_status      payment_status_enum NOT NULL DEFAULT 'unpaid',
  brand_notes         TEXT,
  submitted_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.content_submission ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Creator manages own content submissions"
  ON public.content_submission FOR ALL
  USING (auth.uid() = profile_id);

CREATE POLICY "Brand views content for own campaigns"
  ON public.content_submission FOR SELECT
  USING (
    auth.uid() IN (
      SELECT brand_id FROM public.campaigns WHERE id = campaign_id
    )
  );

CREATE POLICY "Brand updates content for own campaigns"
  ON public.content_submission FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT brand_id FROM public.campaigns WHERE id = campaign_id
    )
  );


-- ============================================================
-- POST METRICS
-- ============================================================
CREATE TABLE public.post_metrics (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id    UUID NOT NULL UNIQUE REFERENCES public.content_submission(id) ON DELETE CASCADE,
  reach         INTEGER,
  impressions   INTEGER,
  likes         INTEGER,
  comments      INTEGER,
  saves         INTEGER,
  shares        INTEGER,
  clicks        INTEGER,
  recorded_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.post_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Creator views own post metrics"
  ON public.post_metrics FOR SELECT
  USING (
    auth.uid() IN (
      SELECT profile_id FROM public.content_submission WHERE id = content_id
    )
  );

CREATE POLICY "Brand views metrics for own campaigns"
  ON public.post_metrics FOR SELECT
  USING (
    auth.uid() IN (
      SELECT c.brand_id FROM public.campaigns c
      JOIN public.content_submission cs ON cs.campaign_id = c.id
      WHERE cs.id = content_id
    )
  );

CREATE POLICY "Brand updates metrics for own campaigns"
  ON public.post_metrics FOR ALL
  USING (
    auth.uid() IN (
      SELECT c.brand_id FROM public.campaigns c
      JOIN public.content_submission cs ON cs.campaign_id = c.id
      WHERE cs.id = content_id
    )
  );


-- ============================================================
-- REVISION REQUESTS
-- ============================================================
CREATE TABLE public.revision_requests (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id  UUID NOT NULL REFERENCES public.content_submission(id) ON DELETE CASCADE,
  brand_id    UUID NOT NULL REFERENCES public.brand_profile(id) ON DELETE CASCADE,
  feedback    TEXT NOT NULL,
  status      revision_status_enum NOT NULL DEFAULT 'pending',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.revision_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Brand manages own revision requests"
  ON public.revision_requests FOR ALL
  USING (auth.uid() = brand_id);

CREATE POLICY "Creator views revision requests on own content"
  ON public.revision_requests FOR SELECT
  USING (
    auth.uid() IN (
      SELECT profile_id FROM public.content_submission WHERE id = content_id
    )
  );


-- ============================================================
-- CONTRACTS
-- ============================================================
CREATE TABLE public.contracts (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id    UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  profile_id     UUID NOT NULL REFERENCES public.creator_profile(id) ON DELETE CASCADE,
  status         contract_status_enum NOT NULL DEFAULT 'pending',
  signed_date    DATE,
  sign_by        TIMESTAMPTZ,
  duration_days  INTEGER,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (campaign_id, profile_id)
);

ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Creator views and signs own contracts"
  ON public.contracts FOR ALL
  USING (auth.uid() = profile_id);

CREATE POLICY "Brand manages contracts for own campaigns"
  ON public.contracts FOR ALL
  USING (
    auth.uid() IN (
      SELECT brand_id FROM public.campaigns WHERE id = campaign_id
    )
  );


-- ============================================================
-- AFFILIATE LINKS
-- ============================================================
CREATE TABLE public.affiliate_links (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id    UUID NOT NULL REFERENCES public.creator_profile(id) ON DELETE CASCADE,
  campaign_id   UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  slug          TEXT NOT NULL UNIQUE,
  clicks        INTEGER NOT NULL DEFAULT 0,
  sales         INTEGER NOT NULL DEFAULT 0,
  earned        NUMERIC(10, 2) NOT NULL DEFAULT 0,
  window_days   INTEGER NOT NULL,
  expires_at    TIMESTAMPTZ NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (profile_id, campaign_id)
);

ALTER TABLE public.affiliate_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Creator views own affiliate links"
  ON public.affiliate_links FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Brand views affiliate links for own campaigns"
  ON public.affiliate_links FOR SELECT
  USING (
    auth.uid() IN (
      SELECT brand_id FROM public.campaigns WHERE id = campaign_id
    )
  );

CREATE POLICY "Brand manages affiliate links for own campaigns"
  ON public.affiliate_links FOR ALL
  USING (
    auth.uid() IN (
      SELECT brand_id FROM public.campaigns WHERE id = campaign_id
    )
  );


-- ============================================================
-- PAYOUT METHODS
-- ============================================================
CREATE TABLE public.payout_methods (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id    UUID NOT NULL REFERENCES public.creator_profile(id) ON DELETE CASCADE,
  method        payout_method_enum NOT NULL,
  label         TEXT NOT NULL,
  detail        TEXT NOT NULL,
  is_default    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.payout_methods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Creator manages own payout methods"
  ON public.payout_methods FOR ALL
  USING (auth.uid() = profile_id);


-- ============================================================
-- PAYOUTS
-- ============================================================
CREATE TABLE public.payouts (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id        UUID NOT NULL REFERENCES public.creator_profile(id) ON DELETE CASCADE,
  payout_method_id  UUID REFERENCES public.payout_methods(id) ON DELETE SET NULL,
  amount            NUMERIC(12, 2) NOT NULL,
  status            payout_status_enum NOT NULL DEFAULT 'requested',
  reference         TEXT,
  requested_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at      TIMESTAMPTZ,
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Creator manages own payouts"
  ON public.payouts FOR ALL
  USING (auth.uid() = profile_id);


-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE public.notifications (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id  UUID REFERENCES public.creator_profile(id) ON DELETE CASCADE,
  brand_id    UUID REFERENCES public.brand_profile(id) ON DELETE CASCADE,
  type        notification_type_enum NOT NULL,
  title       TEXT NOT NULL,
  body        TEXT,
  read        BOOLEAN NOT NULL DEFAULT FALSE,
  meta        JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT notif_recipient CHECK (
    (profile_id IS NOT NULL AND brand_id IS NULL) OR
    (brand_id IS NOT NULL AND profile_id IS NULL)
  )
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Creator views own notifications"
  ON public.notifications FOR ALL
  USING (auth.uid() = profile_id);

CREATE POLICY "Brand views own notifications"
  ON public.notifications FOR ALL
  USING (auth.uid() = brand_id);


-- ============================================================
-- BRAND CAMPAIGN HIGHLIGHTS
-- ============================================================
CREATE TABLE public.brand_campaign_highlights (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id      UUID NOT NULL REFERENCES public.brand_profile(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  platform      platform_enum,
  url           TEXT,
  reach         TEXT,
  highlight_date DATE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.brand_campaign_highlights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Brand manages own campaign highlights"
  ON public.brand_campaign_highlights FOR ALL
  USING (auth.uid() = brand_id);

CREATE POLICY "Brand highlights publicly viewable"
  ON public.brand_campaign_highlights FOR SELECT
  USING (true);


-- ============================================================
-- SUPABASE AUTH TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_roles (id, role)
  VALUES (
    NEW.id,
    (NEW.raw_user_meta_data->>'role')::user_role_enum
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================================
-- AUTO-UPDATE updated_at TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_brand_profile_updated_at
  BEFORE UPDATE ON public.brand_profile FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_brand_settings_updated_at
  BEFORE UPDATE ON public.brand_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_creator_profile_updated_at
  BEFORE UPDATE ON public.creator_profile FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_campaign_submissions_updated_at
  BEFORE UPDATE ON public.campaign_submissions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_content_submission_updated_at
  BEFORE UPDATE ON public.content_submission FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_post_metrics_updated_at
  BEFORE UPDATE ON public.post_metrics FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_revision_requests_updated_at
  BEFORE UPDATE ON public.revision_requests FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_contracts_updated_at
  BEFORE UPDATE ON public.contracts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_affiliate_links_updated_at
  BEFORE UPDATE ON public.affiliate_links FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_payouts_updated_at
  BEFORE UPDATE ON public.payouts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ============================================================
-- INDEXES
-- ============================================================

-- Brand
CREATE INDEX idx_brand_contacts_brand_id         ON public.brand_contacts(brand_id);
CREATE INDEX idx_brand_industry_tags_brand_id    ON public.brand_industry_tags(brand_id);
CREATE INDEX idx_brand_highlights_brand_id       ON public.brand_campaign_highlights(brand_id);

-- Creator
CREATE INDEX idx_social_accounts_profile_id      ON public.social_accounts(profile_id);
CREATE INDEX idx_content_aesthetic_profile_id    ON public.content_aesthetic(profile_id);
CREATE INDEX idx_interests_profile_id            ON public.interests(profile_id);
CREATE INDEX idx_preferred_brands_profile_id     ON public.preferred_brands(profile_id);
CREATE INDEX idx_collab_highlights_profile_id    ON public.brand_collaboration_highlights(profile_id);
CREATE INDEX idx_demographics_profile_id         ON public.demographics(profile_id);
CREATE INDEX idx_general_settings_profile_id     ON public.general_settings(profile_id);
CREATE INDEX idx_payout_methods_profile_id       ON public.payout_methods(profile_id);
CREATE INDEX idx_payouts_profile_id              ON public.payouts(profile_id);
CREATE INDEX idx_payouts_status                  ON public.payouts(status);

-- Campaigns
CREATE INDEX idx_campaigns_brand_id              ON public.campaigns(brand_id);
CREATE INDEX idx_campaigns_status                ON public.campaigns(status);
CREATE INDEX idx_campaigns_start_date            ON public.campaigns(start_date);
CREATE INDEX idx_campaign_deliverables_campaign  ON public.campaign_deliverables(campaign_id);
CREATE INDEX idx_campaign_requirements_campaign  ON public.campaign_requirements(campaign_id);
CREATE INDEX idx_campaign_invites_campaign        ON public.campaign_invites(campaign_id);
CREATE INDEX idx_campaign_invites_profile        ON public.campaign_invites(profile_id);

-- Submissions & contracts
CREATE INDEX idx_campaign_submissions_campaign   ON public.campaign_submissions(campaign_id);
CREATE INDEX idx_campaign_submissions_profile    ON public.campaign_submissions(profile_id);
CREATE INDEX idx_campaign_submissions_status     ON public.campaign_submissions(status);
CREATE INDEX idx_campaign_submissions_fit        ON public.campaign_submissions(fit_score DESC);
CREATE INDEX idx_content_submission_campaign     ON public.content_submission(campaign_id);
CREATE INDEX idx_content_submission_profile      ON public.content_submission(profile_id);
CREATE INDEX idx_content_submission_payment      ON public.content_submission(payment_status);
CREATE INDEX idx_contracts_campaign_id           ON public.contracts(campaign_id);
CREATE INDEX idx_contracts_profile_id            ON public.contracts(profile_id);
CREATE INDEX idx_contracts_status                ON public.contracts(status);
CREATE INDEX idx_contracts_sign_by               ON public.contracts(sign_by);

-- Metrics, revisions & affiliate
CREATE INDEX idx_post_metrics_content_id         ON public.post_metrics(content_id);
CREATE INDEX idx_revision_requests_content_id    ON public.revision_requests(content_id);
CREATE INDEX idx_revision_requests_status        ON public.revision_requests(status);
CREATE INDEX idx_affiliate_links_profile_id      ON public.affiliate_links(profile_id);
CREATE INDEX idx_affiliate_links_campaign_id     ON public.affiliate_links(campaign_id);
CREATE INDEX idx_affiliate_links_expires         ON public.affiliate_links(expires_at);

-- Notifications
CREATE INDEX idx_notifications_profile_id        ON public.notifications(profile_id);
CREATE INDEX idx_notifications_brand_id          ON public.notifications(brand_id);
CREATE INDEX idx_notifications_read              ON public.notifications(read);
CREATE INDEX idx_notifications_created           ON public.notifications(created_at DESC);
