# Sokohuru — Claude Code Task List

## Repo structure
| Repo | Stack | Purpose | Domain | Vercel project |
|------|-------|---------|--------|----------------|
| `sokohuru-web` | Next.js 15 | SEO website only — public pages, campaign listings, creator profiles, auth funnel | `sokohuru.com` | Project 1 |
| `sokohuru-api` | Next.js 15 (API routes only) | All middleware — secret keys, payments, fit score, webhooks, crons, PDF, affiliate tracking | `api.sokohuru.com` | Project 2 |
| `sokohuru-mobile` | Flutter | Full product — Android, iOS, Web. All creator and brand functionality | n/a | n/a |

## Data flow rule (applies to every task — never break this)
```
sokohuru-web (website):
  ├── Fetches Supabase server-side with ANON KEY only
  ├── Never holds secret keys (Stripe, M-Pesa, service role)
  └── Auth funnel → redirects to Flutter app after signup

sokohuru-mobile (Flutter):
  ├── DIRECT TO SUPABASE — all CRUD, auth, realtime, storage
  │   supabase.from('table').select/insert/update/delete
  │   supabase.auth.signIn/signUp/signOut
  │   supabase.from('table').stream()        ← realtime
  │   supabase.storage.from('bucket').upload()
  │
  └── VIA api.sokohuru.com — only when secret keys needed
      /fit-score              complex scoring (no secret, but heavy logic)
      /contracts/[id]/sign    server-side validation guard
      /payments/mpesa/*       MPESA_SECRET never touches Flutter
      /payments/stripe/*      STRIPE_SECRET never touches Flutter
      /track/[slug]           affiliate edge redirect
      /reports/[id]/pdf       server-side PDF generation

sokohuru-api (middleware):
  ├── ALL secret keys live here ONLY
  ├── Called by Flutter via HTTP with JWT in Authorization header
  ├── Called by Supabase webhooks (verified by webhook secret)
  ├── CORS: allows sokohuru.com + Flutter app bundle ID only
  └── Never called directly from a browser

RULE: Supabase RLS can protect it?  → direct to Supabase
      Needs a secret key?            → api.sokohuru.com
      Needs server-side logic?       → api.sokohuru.com
      Simple read/write/stream?      → direct to Supabase
```

## Working directories
- `sokohuru-web`    → Next.js App Router, working dir: `app/`
- `sokohuru-api`    → Next.js App Router (routes only), working dir: `app/`
- `sokohuru-mobile` → Flutter, working dir: `lib/`

## Environment files

### sokohuru-web/.env.local
```env
NEXT_PUBLIC_APP_URL=https://sokohuru.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
# NO secret keys in this file — ever
```

### sokohuru-api/.env.local
```env
API_URL=https://api.sokohuru.com
APP_URL=https://sokohuru.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret
SUPABASE_WEBHOOK_SECRET=your_webhook_secret
MPESA_CONSUMER_KEY=your_mpesa_key
MPESA_CONSUMER_SECRET=your_mpesa_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=https://api.sokohuru.com/webhooks/mpesa
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=noreply@sokohuru.com
CRON_SECRET=your_32_char_random_string
SENTRY_DSN=your_sentry_dsn
ALLOWED_ORIGINS=https://sokohuru.com,https://api.sokohuru.com
```

### sokohuru-mobile/.env
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
API_BASE_URL=https://api.sokohuru.com
APP_URL=https://sokohuru.com
SENTRY_DSN=your_sentry_dsn
# NO secret keys in this file — ever
```

---

## ENV FILES (create these manually before running any tasks)

### sokohuru-web/.env.local
```env
NEXT_PUBLIC_APP_URL=https://sokohuru.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret
MPESA_CONSUMER_KEY=your_mpesa_key
MPESA_CONSUMER_SECRET=your_mpesa_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=${NEXT_PUBLIC_APP_URL}/api/webhooks/mpesa
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=noreply@sokohuru.co
SENTRY_DSN=your_sentry_dsn
```

### sokohuru-mobile/.env
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
API_BASE_URL=https://sokohuru.com/api
SENTRY_DSN=your_sentry_dsn
```

---

## DESIGN TOKENS (reference in every task)
```
Primary pink:     #C8185A
Pink light:       #E8509A
Pink dark:        #3A0E22  
Surface base:     #0C0B14
Surface 1:        #111018
Surface 2:        #1A1826
Surface 3:        #1E1C2A
Border:           #2E2B40
Text primary:     #F0EEF8
Text secondary:   #8E8AA8
Text muted:       #6B6880
Success:          #0F6E56
Success surface:  #0B2318
Success text:     #5DCAA5
Warning:          #854F0B
Warning surface:  #2A1A04
Warning text:     #FAC775
Error:            #A32D2D
Error surface:    #2A0A0A
Error text:       #F09595
Info:             #185FA5
Info surface:     #0A1A2E
Info text:        #85B7EB
Font display:     'Clash Display' (Google Fonts)
Font body:        'Plus Jakarta Sans' (Google Fonts)
Radius xs:        4px
Radius sm:        8px
Radius md:        12px
Radius lg:        16px
Radius xl:        20px
Spacing xs:       4px
Spacing sm:       8px
Spacing md:       12px
Spacing lg:       16px
Spacing xl:       20px
Spacing 2xl:      24px
Spacing 3xl:      32px
Spacing 4xl:      48px
```

---

# SPRINT 1 — Foundation (Week 1, Days 1–7)

---

---

# SPRINT 1A — sokohuru-web setup (SEO website only)

---

## Task 1.1 — Next.js Project Setup + Vercel Deploy

**Priority:** P1 · **Estimate:** S · **Target:** sokohuru-web (SEO website — NO secret keys)

```
Kim here. Run this command and return the full output:

"Set up the Sokohuru web project with Next.js 15, TypeScript, Tailwind, and deploy to Vercel.

Rules:
- Work in the sokohuru-web directory
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: initial Next.js 15 project setup'
- Push to main
- Report: what was created, any errors, deploy URL

Project context:
New project. sokohuru-web is the Next.js 15 app for the Sokohuru
creator marketplace. Uses App Router. TypeScript strict mode.
Tailwind for utility classes. Supabase for backend.

Task:
1. Initialise Next.js 15 project with:
   npx create-next-app@latest . --typescript --tailwind --eslint
   --app --src-dir=false --import-alias='@/*'

2. Install additional dependencies:
   npm install @supabase/supabase-js @supabase/ssr
   npm install zod resend stripe
   npm install @vercel/analytics @vercel/speed-insights
   npm install -D @types/node

3. Create .env.local from the ENV template (values as placeholders,
   actual values added manually by developer)

4. Create lib/config.ts:
   - Export APP_URL = process.env.NEXT_PUBLIC_APP_URL
   - Export SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
   - Export SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
   - Throw descriptive errors if any required env var is missing
   - Never import SUPABASE_SERVICE_ROLE_KEY here
     (server-only vars stay in server files)

5. Update tsconfig.json:
   - strict: true
   - paths: { '@/*': ['./*'] }

6. Create .eslintrc.json with rules:
   - no-console: warn
   - no-unused-vars: error
   - @typescript-eslint/no-explicit-any: error

7. Update next.config.ts:
   - images.domains: ['your_supabase_project.supabase.co']
   - Placeholder comment for supabase domain — 
     developer fills actual value from .env

8. Replace app/page.tsx with a minimal placeholder:
   export default function Home() {
     return <main><h1>Sokohuru — coming soon</h1></main>
   }

9. Deploy to Vercel:
   npx vercel --prod

Acceptance criteria:
- [ ] npx tsc --noEmit passes with zero errors
- [ ] npx eslint . passes with zero errors  
- [ ] next dev starts without errors
- [ ] lib/config.ts throws if env vars missing
- [ ] .env.local exists with all keys as placeholders
- [ ] Vercel deploy URL returned in report

DO NOT:
- Do not use pages/ router — App Router only
- Do not hardcode any URLs, keys, or domain names
- Do not install unnecessary UI libraries" "/path/to/sokohuru-web"
```

---

## Task 1.2 — Supabase Client Setup + Type Generation

**Priority:** P1 · **Estimate:** S · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Set up the Supabase client for both server and browser contexts,
and generate TypeScript types from the Sokohuru schema.

Rules:
- Branch from main as feature/supabase-client-setup
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: supabase client setup and type generation'
- Push branch, open PR, merge to main
- Report: files created, any errors, PR link

Project context:
sokohuru-web uses Next.js 15 App Router. Supabase is the database.
We need two clients:
1. Browser client — for client components, uses anon key
2. Server client — for server components and API routes, 
   uses service role key, bypasses RLS

Task:
1. Create lib/supabase/client.ts (browser client):
   import { createBrowserClient } from '@supabase/ssr'
   import { Database } from '@/types/database'
   import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/config'

   export function createClient() {
     return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
   }

2. Create lib/supabase/server.ts (server client):
   import { createServerClient } from '@supabase/ssr'
   import { cookies } from 'next/headers'
   import { Database } from '@/types/database'
   - Read SUPABASE_URL and SUPABASE_ANON_KEY from process.env directly
     (not from lib/config — this file is server-only)
   - Use cookie-based auth for SSR

3. Create lib/supabase/admin.ts (service role client, server-only):
   import { createClient } from '@supabase/supabase-js'
   import { Database } from '@/types/database'
   - Uses SUPABASE_SERVICE_ROLE_KEY
   - Add comment: THIS FILE MUST NEVER BE IMPORTED IN CLIENT COMPONENTS
   - Export as supabaseAdmin

4. Create types/database.ts as a placeholder:
   export type Database = {
     public: {
       Tables: Record<string, unknown>
       Views: Record<string, unknown>
       Functions: Record<string, unknown>
       Enums: Record<string, unknown>
     }
   }
   Add comment: GENERATED FILE — run npm run types to regenerate

5. Add to package.json scripts:
   'types': 'supabase gen types typescript --project-id 
            $SUPABASE_PROJECT_ID --schema public > types/database.ts'

6. Create lib/supabase/middleware.ts:
   - Export updateSession function that refreshes auth token
     on every request using @supabase/ssr createServerClient
   - This is called from Next.js middleware.ts

7. Create middleware.ts at root (not inside app/):
   - Import updateSession from lib/supabase/middleware
   - Match all routes except _next/static, _next/image,
     favicon.ico, and public assets
   - Call updateSession on every matched request

Acceptance criteria:
- [ ] lib/supabase/client.ts exports createClient()
- [ ] lib/supabase/server.ts exports createClient() (server-only)
- [ ] lib/supabase/admin.ts exports supabaseAdmin (service role)
- [ ] middleware.ts exists and matches correct routes
- [ ] types/database.ts exists (placeholder is fine)
- [ ] npm run types script exists in package.json
- [ ] npx tsc --noEmit passes

DO NOT:
- Do not import admin client in any client component
- Do not use the old @supabase/auth-helpers-nextjs package
- Do not store session in localStorage — use cookies only" "/path/to/sokohuru-web"
```

---

## Task 1.3 — Auth Setup with Role-Based Routing

**Priority:** P1 · **Estimate:** M · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Set up Supabase Auth with role-based routing for creators and brands.

Rules:
- Branch from main as feature/auth-role-routing
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit  
- git add, git commit -m 'feat: auth setup with creator and brand role routing'
- Push branch, open PR, merge to main
- Report: files created, routing logic explained, PR link

Project context:
Sokohuru has two user types: creators and brands. Both sign up through
Supabase Auth (email + password). On signup, the user's role is stored
in the public.user_roles table (id UUID FK auth.users, role enum
'creator'|'brand'). A Supabase trigger (handle_new_user) inserts the
role from auth metadata automatically. After login, creators route to
/dashboard/creator and brands route to /dashboard/brand.

Task:
1. Create lib/auth/actions.ts (server actions):

   signUpCreator(formData):
   - Call supabase.auth.signUp with email, password
   - Pass options.data.role = 'creator'
   - Redirect to /onboarding/creator on success
   - Return error message on failure

   signUpBrand(formData):
   - Call supabase.auth.signUp with email, password
   - Pass options.data.role = 'brand'
   - Redirect to /onboarding/brand on success
   - Return error message on failure

   signIn(formData):
   - Call supabase.auth.signInWithPassword
   - After sign in, fetch role from public.user_roles
     where id = user.id
   - If role = 'creator', redirect to /dashboard/creator
   - If role = 'brand', redirect to /dashboard/brand
   - Return error on failure

   signOut():
   - Call supabase.auth.signOut
   - Redirect to /

2. Create lib/auth/utils.ts:

   getUser():
   - Uses server Supabase client
   - Returns { user, role } or null if not authenticated
   - Fetches role from public.user_roles table

   requireCreator():
   - Calls getUser()
   - If no user or role !== 'creator', redirect to /auth/login
   - Returns { user, role }

   requireBrand():
   - Calls getUser()  
   - If no user or role !== 'brand', redirect to /auth/login
   - Returns { user, role }

3. Create app/auth/login/page.tsx:
   - Two tabs: Creator | Brand
   - Email + password fields
   - Sign in button calling signIn server action
   - Link to /auth/signup
   - Uses Sokohuru design tokens (dark background #111018,
     pink CTA #C8185A, card surface #1A1826)
   - Error message display

4. Create app/auth/signup/page.tsx:
   - Two tabs: Join as Creator | Join as Brand
   - Creator tab: first name, last name, email, password
   - Brand tab: company name, email, password
   - Calls signUpCreator or signUpBrand based on active tab
   - Link to /auth/login
   - Error message display

5. Create app/auth/callback/route.ts:
   - Handles OAuth callback (for future Google OAuth)
   - Exchanges code for session
   - Redirects based on role

6. Update middleware.ts:
   - Protected routes: /dashboard/*, /onboarding/*
   - If accessing protected route while unauthenticated,
     redirect to /auth/login with returnUrl param
   - If accessing /auth/* while authenticated,
     redirect to appropriate dashboard

7. Create app/dashboard/creator/page.tsx (shell only):
   - requireCreator() at top
   - Return: <div>Creator Dashboard — coming soon</div>

8. Create app/dashboard/brand/page.tsx (shell only):
   - requireBrand() at top
   - Return: <div>Brand Dashboard — coming soon</div>

Acceptance criteria:
- [ ] Unauthenticated user hitting /dashboard/creator 
      redirects to /auth/login
- [ ] Creator login redirects to /dashboard/creator
- [ ] Brand login redirects to /dashboard/brand
- [ ] Signup passes role in auth metadata
- [ ] getUser() returns correct role from user_roles table
- [ ] npx tsc --noEmit passes with zero errors

DO NOT:
- Do not store role in localStorage or cookie manually —
  always fetch from user_roles table
- Do not use client-side redirects for auth — use server actions
- Do not expose SUPABASE_SERVICE_ROLE_KEY in client components" "/path/to/sokohuru-web"
```

---

## Task 1.4 — Design Token System + Global Styles

**Priority:** P1 · **Estimate:** S · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Set up the Sokohuru design token system as CSS variables and 
Tailwind config extensions.

Rules:
- Branch from main as feature/design-tokens
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: design token system and global styles'
- Push branch, open PR, merge to main
- Report: files created, token names listed, PR link

Project context:
Sokohuru uses a dark-mode-first design system with a deep confident
pink primary colour. Display font is Clash Display, body font is
Plus Jakarta Sans — both from Google Fonts. All values come from
the Sokohuru design system, never hardcoded in components.

Task:
1. Install Google Fonts in app/layout.tsx:
   - Import { Clash_Display, Plus_Jakarta_Sans } — 
     NOTE: Clash Display may not be in next/font/google,
     use @fontsource/clash-display instead:
     npm install @fontsource/clash-display
     npm install @fontsource/plus-jakarta-sans
   - Import both in app/layout.tsx

2. Create app/globals.css — define CSS custom properties:

:root {
  /* Primary */
  --sk-pink: #C8185A;
  --sk-pink-light: #E8509A;
  --sk-pink-dark: #3A0E22;
  --sk-pink-50: #3A0E22;
  --sk-pink-100: #5C1636;
  --sk-pink-200: #7D1240;
  --sk-pink-400: #A8164F;
  --sk-pink-600: #C8185A;
  --sk-pink-800: #E8509A;
  --sk-pink-900: #F9B8D4;

  /* Surfaces */
  --sk-base: #0C0B14;
  --sk-surface-1: #111018;
  --sk-surface-2: #1A1826;
  --sk-surface-3: #1E1C2A;
  --sk-border: #2E2B40;
  --sk-muted: #4A4760;

  /* Text */
  --sk-text-primary: #F0EEF8;
  --sk-text-secondary: #8E8AA8;
  --sk-text-muted: #6B6880;
  --sk-text-disabled: #4A4760;

  /* Semantic */
  --sk-success: #0F6E56;
  --sk-success-surface: #0B2318;
  --sk-success-text: #5DCAA5;
  --sk-warning: #854F0B;
  --sk-warning-surface: #2A1A04;
  --sk-warning-text: #FAC775;
  --sk-error: #A32D2D;
  --sk-error-surface: #2A0A0A;
  --sk-error-text: #F09595;
  --sk-info: #185FA5;
  --sk-info-surface: #0A1A2E;
  --sk-info-text: #85B7EB;

  /* Light mode (website sections) */
  --sk-light-bg: #FFFFFF;
  --sk-light-surface: #F7F6FB;
  --sk-light-subtle: #EEEDF7;
  --sk-light-border: #C8C4E0;
  --sk-light-text: #111018;
  --sk-light-text-secondary: #4A4760;

  /* Spacing */
  --sk-space-xs: 4px;
  --sk-space-sm: 8px;
  --sk-space-md: 12px;
  --sk-space-lg: 16px;
  --sk-space-xl: 20px;
  --sk-space-2xl: 24px;
  --sk-space-3xl: 32px;
  --sk-space-4xl: 48px;

  /* Radius */
  --sk-radius-xs: 4px;
  --sk-radius-sm: 8px;
  --sk-radius-md: 12px;
  --sk-radius-lg: 16px;
  --sk-radius-xl: 20px;
  --sk-radius-full: 9999px;

  /* Fonts */
  --sk-font-display: 'Clash Display', sans-serif;
  --sk-font-body: 'Plus Jakarta Sans', sans-serif;
}

body {
  background: var(--sk-base);
  color: var(--sk-text-primary);
  font-family: var(--sk-font-body);
}

3. Extend tailwind.config.ts with Sokohuru tokens:
   colors:
     sk-pink: var(--sk-pink)
     sk-pink-light: var(--sk-pink-light)
     sk-pink-dark: var(--sk-pink-dark)
     sk-base: var(--sk-base)
     sk-surface-1: var(--sk-surface-1)
     sk-surface-2: var(--sk-surface-2)
     sk-surface-3: var(--sk-surface-3)
     sk-border: var(--sk-border)
     sk-text-primary: var(--sk-text-primary)
     sk-text-secondary: var(--sk-text-secondary)
     sk-text-muted: var(--sk-text-muted)
     sk-success: var(--sk-success)
     sk-success-surface: var(--sk-success-surface)
     sk-success-text: var(--sk-success-text)
     sk-warning-text: var(--sk-warning-text)
     sk-error: var(--sk-error)
     sk-error-text: var(--sk-error-text)
   fontFamily:
     display: var(--sk-font-display)
     body: var(--sk-font-body)
   borderRadius:
     sk-sm: var(--sk-radius-sm)
     sk-md: var(--sk-radius-md)
     sk-lg: var(--sk-radius-lg)
     sk-xl: var(--sk-radius-xl)

4. Create lib/cn.ts — className utility:
   import { clsx, type ClassValue } from 'clsx'
   import { twMerge } from 'tailwind-merge'
   npm install clsx tailwind-merge
   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs))
   }

Acceptance criteria:
- [ ] CSS variables defined in globals.css
- [ ] Tailwind config extended with sk-* colour names
- [ ] Both fonts load in browser
- [ ] cn() utility works
- [ ] npx tsc --noEmit passes

DO NOT:
- Do not hardcode hex values in any component —
  always use CSS variables or Tailwind sk-* classes
- Do not use arbitrary Tailwind values like text-[#C8185A] —
  use text-sk-pink instead" "/path/to/sokohuru-web"
```

---

## Task 1.5 — Shared UI Components (Leaf Components)

**Priority:** P1 · **Estimate:** M · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Build the Sokohuru leaf UI component library — buttons, inputs,
badges, and avatars. These are used by every screen.

Rules:
- Branch from main as feature/ui-components
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: sokohuru ui component library'
- Push branch, open PR, merge to main
- Report: components created, PR link

Project context:
sokohuru-web uses a custom component library with NO external UI
libraries (no shadcn, no MUI, no Radix). All components use
Sokohuru design tokens via CSS variables. All components are
TypeScript with explicit prop interfaces.

Task:
1. Create components/ui/Button.tsx:
   Props interface:
   - variant: 'primary' | 'secondary' | 'ghost' | 'destructive'
   - size: 'sm' | 'md' | 'lg'
   - loading?: boolean (shows spinner, disables click)
   - disabled?: boolean
   - fullWidth?: boolean
   - children: React.ReactNode
   - onClick?: () => void
   - type?: 'button' | 'submit' | 'reset'
   - className?: string

   Variants (use CSS vars not hardcoded hex):
   primary:     bg var(--sk-pink), text white, hover darken 10%
   secondary:   bg var(--sk-surface-2), text var(--sk-text-primary),
                border 0.5px var(--sk-border)
   ghost:       bg transparent, text var(--sk-pink),
                border 0.5px var(--sk-pink)
   destructive: bg var(--sk-error-surface), text var(--sk-error-text),
                border 0.5px var(--sk-error)

   Sizes:
   sm: padding 7px 14px, font-size 12px, border-radius var(--sk-radius-sm)
   md: padding 10px 20px, font-size 14px, border-radius var(--sk-radius-md)
   lg: padding 14px 28px, font-size 16px, border-radius var(--sk-radius-lg)

   Loading state: show inline spinner SVG, reduce opacity to 0.7
   Font: var(--sk-font-body), font-weight 500

2. Create components/ui/Input.tsx:
   Props interface:
   - label?: string
   - placeholder?: string
   - type?: string
   - value?: string
   - onChange?: (e) => void
   - error?: string
   - hint?: string
   - disabled?: boolean
   - required?: boolean
   - name?: string
   - id?: string
   - className?: string

   Styles:
   Container: flex column, gap 5px
   Label: font-size 12px, font-weight 500, color var(--sk-text-secondary)
   Input: bg var(--sk-surface-2), border 0.5px var(--sk-border),
          border-radius var(--sk-radius-md), padding 11px 14px,
          font-size 13px, color var(--sk-text-primary),
          width 100%, outline none
   Focus: border-color var(--sk-pink)
   Error state: border-color var(--sk-error)
   Hint: font-size 11px, color var(--sk-text-muted)
   Error message: font-size 11px, color var(--sk-error-text)

3. Create components/ui/Badge.tsx:
   Props:
   - variant: 'pink' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
   - children: React.ReactNode
   - className?: string

   All badges: padding 3px 9px, border-radius var(--sk-radius-full),
               font-size 11px, font-weight 500, border 0.5px

   Variants:
   pink:    bg #3A0E22, color #F472A8, border #7D1240
   success: bg var(--sk-success-surface), color var(--sk-success-text),
            border var(--sk-success)
   warning: bg var(--sk-warning-surface), color var(--sk-warning-text),
            border var(--sk-warning)
   error:   bg var(--sk-error-surface), color var(--sk-error-text),
            border var(--sk-error)
   info:    bg var(--sk-info-surface), color var(--sk-info-text),
            border var(--sk-info)
   neutral: bg var(--sk-surface-2), color var(--sk-text-secondary),
            border var(--sk-border)

4. Create components/ui/Avatar.tsx:
   Props:
   - initials: string (max 2 chars)
   - size: 'xs'(24) | 'sm'(32) | 'md'(40) | 'lg'(56) | 'xl'(72)
   - src?: string (image URL)
   - alt?: string
   - className?: string

   Circle shape. Background var(--sk-pink-dark).
   Text color var(--sk-pink-light). Font weight 600.
   If src provided, show image. Else show initials.

5. Create components/ui/Toggle.tsx:
   Props:
   - checked: boolean
   - onChange: (checked: boolean) => void
   - label?: string
   - sublabel?: string
   - disabled?: boolean

   Track: width 36px, height 20px, border-radius 10px
   On:  background var(--sk-pink)
   Off: background var(--sk-border)
   Thumb: width 16px, height 16px, white circle, transition left .2s

6. Create components/ui/Chip.tsx:
   Props:
   - label: string
   - selected: boolean
   - onClick: () => void
   - className?: string

   Base: padding 5px 11px, border-radius var(--sk-radius-full),
         border 0.5px, font-size 12px, cursor pointer
   Unselected: bg var(--sk-surface-2), color var(--sk-text-secondary),
               border var(--sk-border)
   Selected:   bg #0B2318, color var(--sk-success-text),
               border var(--sk-success)

   Pink variant (for primary selections):
   Selected: bg var(--sk-pink-dark), color var(--sk-pink-light),
             border var(--sk-pink)

7. Create components/ui/index.ts — export all components

Acceptance criteria:
- [ ] Button renders all 4 variants and 3 sizes correctly
- [ ] Input shows focus ring and error states
- [ ] Badge renders all 6 variants
- [ ] Avatar shows initials or image
- [ ] Toggle animates on state change
- [ ] Chip toggles selected state
- [ ] All props are fully typed — no any types
- [ ] npx tsc --noEmit passes

DO NOT:
- Do not use any external UI library
- Do not hardcode hex values — use CSS variables
- Do not use Tailwind arbitrary values like text-[#C8185A]" "/path/to/sokohuru-web"
```

---

## Task 1.6 — Nav Component

**Priority:** P1 · **Estimate:** S · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Build the Sokohuru Nav component for the marketing website.

Rules:
- Branch from main as feature/nav-component
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: navigation component'
- Push branch, open PR, merge to main
- Report: what was built, responsive behaviour described, PR link

Project context:
This is the top navigation for the sokohuru.co marketing website.
All pages import this component. Sticky on scroll. Dark background.
Logo on left, nav links in centre, auth buttons on right.

Task:
1. Create components/layout/Nav.tsx:

   Define nav links as const array at top of file:
   const NAV_LINKS = [
     { label: 'Products', href: '/products' },
     { label: 'Solutions', href: '/solutions' },
     { label: 'Pricing', href: '/pricing' },
     { label: 'Resources', href: '/resources' },
     { label: 'Company', href: '/company' },
   ]

   Desktop layout (≥768px):
   - Height: 72px
   - Background: var(--sk-surface-1)
   - Border bottom: 0.5px solid var(--sk-border)
   - Position: sticky, top: 0, z-index: 50
   - Padding: 0 80px
   - Flex row, space-between, items-center

   Left — Logo:
   - Logo mark: 28×28px div, bg var(--sk-pink),
     border-radius var(--sk-radius-sm)
   - Inside: letter 'S', Inter Bold 14px, white, centered
   - Wordmark: 'soko' + 'huru' span
   - 'soko': Inter Bold 18px, var(--sk-text-primary)
   - 'huru': Inter Bold 18px, var(--sk-pink)
   - Gap between mark and wordmark: 10px
   - Entire logo wraps in Next.js Link href='/'

   Centre — Nav links:
   - Display: flex, gap: 40px
   - Each link: Inter Regular 14px, var(--sk-text-secondary)
   - Hover: color var(--sk-text-primary), transition 150ms
   - Use Next.js Link component

   Right — Auth buttons:
   - 'Log in': Inter Regular 14px, var(--sk-text-secondary),
     href='/auth/login'
   - 'Get Started': Button component, variant='primary', size='sm'
     href='/auth/signup'
   - Gap: 24px

   Mobile layout (<768px):
   - Height: 60px
   - Padding: 0 20px
   - Logo left, hamburger menu right
   - Hamburger: 3 horizontal lines, 20×16px, var(--sk-text-secondary)
   - Nav links hidden by default
   - On hamburger click: slide-in drawer from right
   - Drawer: full height, width 280px, bg var(--sk-surface-1),
     border-left 0.5px var(--sk-border)
   - Drawer contains: nav links stacked vertically + Get Started button
   - Close on outside click or X button

2. Add Nav to app/layout.tsx above {children}

Acceptance criteria:
- [ ] Nav renders at 1440px with all links visible
- [ ] Nav renders at 390px with hamburger only
- [ ] Sticky — stays at top on scroll
- [ ] Logo links to /
- [ ] Get Started links to /auth/signup
- [ ] Mobile drawer opens and closes
- [ ] No hardcoded colours — CSS variables only
- [ ] npx tsc --noEmit passes

DO NOT:
- Do not add the Nav to dashboard pages — 
  only layout.tsx for public pages
- Do not use state management libraries for drawer —
  useState is fine" "/path/to/sokohuru-web"
```

---

## Task 1.7 — Footer Component

**Priority:** P2 · **Estimate:** S · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Build the Sokohuru Footer component for the marketing website.

Rules:
- Branch from main as feature/footer-component
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: footer component'
- Push branch, open PR, merge to main
- Report: PR link

Project context:
Footer appears on all public marketing pages. Dark background.
4-column layout on desktop, stacked on mobile.

Task:
1. Create components/layout/Footer.tsx:

   Define footer columns as const:
   const FOOTER_LINKS = [
     { title: 'Products', links: [
       { label: 'Campaigns', href: '/campaigns' },
       { label: 'Payouts', href: '/payouts' },
       { label: 'Analytics', href: '/analytics' },
       { label: 'Subscriptions', href: '/pricing' },
     ]},
     { title: 'Solutions', links: [
       { label: 'For Creators', href: '/for-creators' },
       { label: 'For Brands', href: '/for-brands' },
       { label: 'For Agencies', href: '/for-agencies' },
       { label: 'Enterprise', href: '/enterprise' },
     ]},
     { title: 'Resources', links: [
       { label: 'Docs', href: '/docs' },
       { label: 'Blog', href: '/blog' },
       { label: 'Help Center', href: '/help' },
       { label: 'Status', href: '/status' },
     ]},
     { title: 'Company', links: [
       { label: 'About Us', href: '/about' },
       { label: 'Careers', href: '/careers' },
       { label: 'Partners', href: '/partners' },
       { label: 'Contact', href: '/contact' },
     ]},
   ]

   Layout:
   Background: var(--sk-surface-1)
   Border top: 0.5px solid var(--sk-border)
   Padding desktop: 48px 80px 32px
   Padding mobile: 32px 20px 24px

   Top section: flex row (desktop), flex col (mobile)
   Left: logo + tagline 'The creator marketplace for East Africa'
         + social icons row (placeholder divs for now)
   Right: 4-column grid of footer links

   Bottom section:
   Border top: 0.5px solid var(--sk-border), margin-top 32px
   Flex row, space-between
   Left: '© 2026 Sokohuru. All rights reserved.'
         font-size 12px, var(--sk-text-muted)
   Right: 'Privacy · Terms · Status'
          font-size 12px, var(--sk-text-muted)

   Column headings: Inter Bold 13px, var(--sk-text-primary)
   Links: Inter Regular 12px, var(--sk-text-muted), 
          hover var(--sk-text-secondary), line-height 2

2. Add Footer to app/layout.tsx below {children}

Acceptance criteria:
- [ ] 4-column layout on desktop
- [ ] Stacked layout on mobile
- [ ] All links use Next.js Link
- [ ] Copyright year is dynamic (new Date().getFullYear())
- [ ] npx tsc --noEmit passes" "/path/to/sokohuru-web"
```

---

## Task 1.8 — Homepage

**Priority:** P1 · **Estimate:** L · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Build the Sokohuru homepage at app/page.tsx.

Rules:
- Branch from main as feature/homepage
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: homepage'
- Push branch, open PR, merge to main
- Report: sections built, any issues, PR link

Project context:
sokohuru.co homepage. Dark mode. Targets both creators and brands.
Converts visitors to signups. Sections top to bottom:
Nav (already built), Hero, TrustedBy, Features, Stats,
Testimonial, SplitCTA, CTABanner, Footer (already built).

Task:
1. Create components/sections/Hero.tsx:

   Background: var(--sk-surface-1)
   Height: 100vh min, padding 0 80px
   Layout: 2 columns, 50/50

   Left column (content):
   - Eyebrow: 'A PRODUCT OF SOKOHURU'
     font-size 11px, font-weight 500, letter-spacing .1em,
     color var(--sk-pink-light), text-transform uppercase
   - H1: 'Smart solutions.' newline 'Real '
     + span 'impact.' in var(--sk-pink)
     font: var(--sk-font-display), font-size clamp(36px,5vw,56px),
     font-weight 600, color var(--sk-text-primary), line-height 1.1
   - Subtext: 'We empower businesses with modern technology
     to move faster, operate smarter, and grow beyond limits.'
     font-size 18px, var(--sk-text-secondary), max-width 520px,
     margin-top 20px, line-height 1.6
   - Button row: margin-top 32px, gap 12px
     Button 1: 'Get Started →' variant=primary size=lg
               href='/auth/signup'
     Button 2: 'Explore Solutions' variant=secondary size=lg
               href='/for-brands'
   - Trust line below buttons:
     Shield icon + 'Enterprise-grade security · Built for trust'
     font-size 13px, var(--sk-text-muted)

   Right column (dashboard preview mockup):
   - Rounded card, bg var(--sk-surface-1), 
     border 0.5px var(--sk-border), border-radius var(--sk-radius-xl)
   - Sidebar (left 180px): bg var(--sk-surface-2)
     Items: Overview (active, pink bg), Campaigns, Creators,
     Analytics, Payouts, Settings
   - Main area: Total Revenue label + '$128,430' value
   - Simple bar chart (CSS bars, no chart library):
     10 bars, varying heights, last bar in var(--sk-pink),
     others in var(--sk-surface-3)
   - Stats row below chart: 4 metrics in a grid
     24,890 Active Users / 58,294 Transactions /
     99.99% Success Rate / 320ms Avg Response
   Note: This is a visual mockup, not real data

   Mobile (< 768px):
   - Single column, content top, mockup hidden
   - H1 font-size 36px
   - Buttons full width, stacked

2. Create components/sections/TrustedBy.tsx:
   Background: var(--sk-surface-1)
   Border top + bottom: 0.5px solid var(--sk-border)
   Padding: 28px 80px
   Layout: flex row, space-between, items-center
   Left: 'TRUSTED BY INNOVATIVE COMPANIES'
         font-size 11px, var(--sk-text-muted), uppercase
   Right: 6 brand name placeholders as text
   ['Vertex','Nexora','Pocket','Cloudage','Layers','Fluxor']
   font-size 15px, font-weight 500, var(--sk-text-muted)
   Mobile: scroll horizontally, brand names in a row

3. Create components/sections/Features.tsx:
   Background: var(--sk-base)
   Padding: 80px 80px
   Eyebrow: 'BUILT FOR GROWTH' in var(--sk-pink-light)
   H2: 'Everything you need to scale with confidence'
   Subtext paragraph, max-width 560px
   4-card grid (2×2 on desktop, 1 col on mobile):

   Cards: bg var(--sk-surface-1), border-radius var(--sk-radius-lg),
          padding 28px, border 0.5px var(--sk-border)

   Card 1: ⚡ Fast & Reliable
   Card 2: 🔒 Secure by Design
   Card 3: 📊 Powerful Insights
   Card 4: 🔗 Easy Integration

   Each card: icon (32px), title (Inter Bold 18px, var(--sk-text-primary)),
   description (Inter Regular 14px, var(--sk-text-secondary)),
   'Learn more →' link in var(--sk-pink)

4. Create components/sections/Stats.tsx:
   Background: gradient from var(--sk-surface-1) to var(--sk-base)
   Padding: 80px
   Eyebrow: 'PERFORMANCE THAT MATTERS'
   H2: 'Built to deliver results that scale.'
   Left column: heading + subtext
   Right column: 4 stats in 2×2 grid
   Stats: '10K+' Active Businesses / '250M+' Transactions /
          '120+' Countries Served / '99.99%' Platform Uptime
   Stat value: font-display, font-size 40px, var(--sk-pink)
   Stat label: font-size 14px, var(--sk-text-muted)

5. Create components/sections/Testimonial.tsx:
   Background: var(--sk-surface-1)
   Padding: 64px 80px
   Border top + bottom: 0.5px var(--sk-border)
   Quote mark: large ' " ' in var(--sk-pink-light)
   Quote text: 16px, var(--sk-text-secondary), max-width 900px,
   font-style italic
   Quote: 'Sokohuru has transformed the way we manage creator
   partnerships. The platform is reliable, secure, and incredibly
   easy to use.'
   Attribution: Avatar (initials 'AK') + name 'Amina Karimi' +
   role 'CEO, Nexora · Nairobi' + 5 star rating

6. Create components/sections/SplitCTA.tsx:
   Two panels side by side (50/50)
   Left panel — For Creators:
     Background: var(--sk-pink-dark)
     Eyebrow: 'FOR CREATORS' in var(--sk-pink-light)
     H2: 'Get discovered. Get paid.'
     Description text
     Button: 'Join as Creator →' variant=primary
     href='/auth/signup?role=creator'
   Right panel — For Brands:
     Background: var(--sk-surface-2)
     Eyebrow: 'FOR BRANDS' in var(--sk-success-text)
     H2: 'Find creators. Drive results.'
     Description text
     Button: 'Post a Campaign →' style=success green background
     href='/auth/signup?role=brand'
   Mobile: stacked, full width each

7. Create components/sections/CTABanner.tsx:
   Background: var(--sk-pink) (solid pink band)
   Padding: 64px 80px
   H2: 'Ready to build the future?'
     font-display, font-size 40px, white
   Subtext: white 70% opacity
   Button: 'Get Started Today →' 
     bg white, color var(--sk-pink), variant custom
   Layout: text left, button right
   Mobile: stacked, button full width

8. Assemble app/page.tsx:
   Import and render all sections in order:
   Hero → TrustedBy → Features → Stats →
   Testimonial → SplitCTA → CTABanner
   (Nav and Footer come from layout.tsx)

Acceptance criteria:
- [ ] All 7 sections render
- [ ] Mobile responsive at 390px
- [ ] Lighthouse performance score > 80
- [ ] No hardcoded colours — CSS variables only
- [ ] All buttons link to correct routes
- [ ] npx tsc --noEmit passes

DO NOT:
- Do not use any chart library — CSS bars only for the mockup
- Do not fetch real data on the homepage — static content only
- Do not add animations (separate task)" "/path/to/sokohuru-web"
```

---

## Task 1.9 — For Creators Page

**Priority:** P1 · **Estimate:** M · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Build the /for-creators marketing page.

Rules:
- Branch from main as feature/for-creators-page
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: for-creators marketing page'
- Push branch, open PR, merge to main
- Report: PR link

Project context:
Target audience: creators considering joining Sokohuru.
SEO target keywords: 'brand deals for influencers Kenya',
'how to get paid for content East Africa', 'UGC campaigns Africa'.
Page should explain the creator journey, show collaboration types,
and convert to signup.

Task:
1. Create app/for-creators/page.tsx with metadata:
   export const metadata = {
     title: 'For Creators — Sokohuru',
     description: 'Join East Africa\'s fastest growing creator
     marketplace. Connect with top brands and earn real income.'
   }

2. Page sections (top to bottom):

   Hero:
   - Background: var(--sk-pink-dark), full width
   - Eyebrow: 'FOR CREATORS'
   - H1: 'Get discovered. Get paid. Be yourself.'
     font-display, font-size clamp(36px,5vw,56px), white
   - Subtext about the platform
   - Two buttons: 'Download iOS' + 'Download Android'
     Both link to process.env.NEXT_PUBLIC_APP_URL + '/download'
   - Mobile: full width buttons stacked

   HowItWorks section:
   - White eyebrow 'HOW IT WORKS'
   - H2: 'Your journey as a creator'
   - 5 numbered steps, vertical timeline layout
   - Step dot (circle with number), vertical line connector,
     title + description on right
   - Steps:
     01 Sign up & build your profile
     02 Discover campaigns
     03 Apply & get selected
     04 Create & submit content
     05 Get paid

   StatsBar:
   - Pink background band
   - 4 stats: 10K+ Creators / 500+ Campaigns / 
              $2M+ Earned / 4.8★ App Rating

   CollabTypes section:
   - H2: 'Your rules, your deals'
   - 6 cards in 3-column grid (2-col tablet, 1-col mobile)
   - UGC / Affiliate / Ambassador / Gifting / Commission / Pay per view
   - Each card: icon dot, type name, description, 
     bg var(--sk-surface-1), border var(--sk-border)

   DownloadCTA:
   - Pink background
   - H2: 'Ready to start creating?'
   - App Store + Google Play buttons

Acceptance criteria:
- [ ] metadata title and description set correctly for SEO
- [ ] Page renders at 390px and 1440px
- [ ] All 5 steps render in how it works section
- [ ] All 6 collab types render
- [ ] npx tsc --noEmit passes" "/path/to/sokohuru-web"
```

---

## Task 1.10 — For Brands Page

**Priority:** P1 · **Estimate:** M · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Build the /for-brands marketing page.

Rules:
- Branch from main as feature/for-brands-page
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: for-brands marketing page'
- Push branch, open PR, merge to main
- Report: PR link

Project context:
Target audience: marketing managers and brand owners.
SEO target keywords: 'influencer marketing platform Africa',
'find UGC creators Kenya', 'affiliate marketing for brands Africa'.

Task:
1. Create app/for-brands/page.tsx with metadata:
   export const metadata = {
     title: 'For Brands — Sokohuru',
     description: 'Access a curated pool of verified East African
     creators. Launch campaigns in minutes, track ROI in real time.'
   }

2. Page sections:

   Hero:
   - Background gradient var(--sk-surface-1) to var(--sk-base)
   - Eyebrow: 'FOR BRANDS' in var(--sk-success-text)
   - H1: 'Find creators. Drive results.'
   - Subtext about ROI and campaign management
   - CTA: 'Post your first campaign →' variant=primary
     href='/auth/signup?role=brand'
   - Secondary: 'Talk to sales' variant=secondary
     href='/contact'

   HowItWorks (brand perspective):
   - 5 steps:
     01 Create your brand profile
     02 Create a campaign — brief, budget, deliverables
     03 Receive applications from matched creators
     04 Review profiles, approve your shortlist
     05 Content delivered, pay on approval

   CampaignTypes section:
   - H2: 'Every type of collaboration, one platform'
   - 6 cards: UGC / Affiliate / Ambassador / 
              Gifting / Commission / Pay per view
   - Each with brand-perspective description

   Stats section:
   - 284K Avg campaign reach / 4.7% Avg engagement /
     45 Avg sales per campaign / 3.2× Average ROI

   TrustSection:
   - H2: 'Trusted by brands across East Africa'
   - 6 brand name placeholders
   - Testimonial quote from a brand perspective

   PricingTeaser:
   - H2: 'Simple, transparent pricing'
   - 3 plan cards: Starter / Growth / Enterprise
   - Starter: Free to post, pay per campaign
   - Growth: $99/mo, unlimited campaigns
   - Enterprise: Custom pricing
   - Note: link to /pricing for full details

   FinalCTA:
   - Green success background var(--sk-success)
   - 'Ready to find your creators?'
   - 'Post your first campaign →' button

Acceptance criteria:
- [ ] metadata correct
- [ ] Brand-perspective language throughout
- [ ] 3 pricing cards render
- [ ] Responsive at 390px and 1440px
- [ ] npx tsc --noEmit passes" "/path/to/sokohuru-web"
```

---

## Task 1.11 — Public Campaign Listings (SEO page)

**Priority:** P1 · **Estimate:** M · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Build the /campaigns public SEO page showing live campaigns.
This page is server-rendered for SEO — no client-side fetching.

Rules:
- Branch from main as feature/public-campaigns-page
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: public campaign listings SEO page'
- Push branch, open PR, merge to main
- Report: PR link

Project context:
Public page listing active campaigns from Supabase. Server
component — fetches directly from Supabase on the server.
ISR revalidation every 60 seconds (campaigns update frequently).
Each campaign links to /campaigns/[slug] for the detail page.
Unauthenticated visitors see the page but 'Apply' button
links to app download or auth signup.

Task:
1. Create app/campaigns/page.tsx:

   export const revalidate = 60

   export const metadata = {
     title: 'Open Campaigns — Sokohuru',
     description: 'Browse live brand campaigns on Sokohuru.
     Apply through the app to earn from UGC, affiliate, and
     ambassador deals with top East African brands.'
   }

   Server component — fetch campaigns:
   const supabase = createClient() // server client
   const { data: campaigns } = await supabase
     .from('campaigns')
     .select(\`
       id, campaign_image, campaign_type, start_date,
       end_date, budget, status, about_project, project_perks,
       activity, created_at,
       brand_profile (
         id, company_name, logo_url, city, country, account_slug
       ),
       campaign_deliverables (
         platform, content_type, due_date
       )
     \`)
     .eq('status', 'active')
     .order('created_at', { ascending: false })

2. Create components/campaigns/CampaignCard.tsx:
   Props:
   - campaign: Campaign type (derive from Supabase query)
   - showApplyButton: boolean

   Card layout (same as design system):
   - Hero image area (campaign_image or brand colour gradient)
   - 'New' badge if created in last 7 days
   - Brand logo + brand name + campaign title
   - Badge row: campaign_type + collab badge + platform badges
   - Description (about_project truncated to 120 chars)
   - Footer: budget or 'Gifting' + closes in X days + Apply button
   - Apply button: links to app download page (not auth)
     with campaign deep link in URL params

   bg: var(--sk-surface-2), border-radius: var(--sk-radius-lg)
   border: 0.5px var(--sk-border)
   hover: border-color var(--sk-border) lightened 10%

3. Page layout:
   - Hero band: 'Open Campaigns' H1 + subtext
   - Filter pills row (client component for interactivity):
     All / UGC / Affiliate / Ambassador / Gifting
   - 3-column grid on desktop, 2-col tablet, 1-col mobile
   - CampaignCard for each campaign
   - If no campaigns: empty state 'No active campaigns right now.
     Check back soon.' with illustration placeholder

4. Create app/campaigns/[slug]/page.tsx:

   export async function generateStaticParams() {
     // fetch all active campaign slugs
     // return array of { slug } objects
   }

   Individual campaign detail page:
   - Full campaign detail matching our mockup
   - OG tags for social sharing (campaign image, title, brand)
   - 'Apply in the Sokohuru app' CTA with app store links
   - Structured data (JSON-LD) for Google rich results

5. Create app/campaigns/loading.tsx:
   Skeleton cards — 6 cards with pulsing grey blocks
   Same dimensions as CampaignCard

Acceptance criteria:
- [ ] Page fetches from Supabase on server (no useEffect)
- [ ] revalidate = 60 set for ISR
- [ ] metadata and OG tags correct
- [ ] CampaignCard renders correctly with all badge variants
- [ ] Empty state renders when no campaigns
- [ ] Loading skeleton renders
- [ ] [slug] page has generateStaticParams
- [ ] npx tsc --noEmit passes

DO NOT:
- Do not use useEffect or client-side fetch for campaign data
- Do not show the Apply flow on web — link to app download" "/path/to/sokohuru-web"
```

---

## Task 1.12 — Creator Signup Flow (4 steps)

**Priority:** P1 · **Estimate:** L · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Build the 4-step creator signup flow.

Rules:
- Branch from main as feature/creator-signup
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: creator signup 4-step flow'
- Push branch, open PR, merge to main
- Report: PR link

Project context:
Creators sign up in 4 steps. Each step is a separate URL so
users can share/bookmark. State persists in URL params until
final submission. On completion, writes to creator_profile and
social_accounts tables in Supabase.

Steps:
  /auth/signup/creator/1 — Account details
  /auth/signup/creator/2 — Personal info
  /auth/signup/creator/3 — Social accounts
  /auth/signup/creator/4 — Content preferences

Task:
1. Create components/signup/StepIndicator.tsx:
   Props: totalSteps, currentStep, stepLabels[]
   Renders step dots connected by lines
   Done: var(--sk-success) filled circle with checkmark
   Active: var(--sk-pink) filled circle with step number
   Future: var(--sk-border) outline circle
   Step label below each dot, font-size 10px
   Line connector between dots — done lines in success colour

2. Create app/auth/signup/creator/[step]/page.tsx:
   Dynamic route for steps 1-4

   Step 1 — Account details:
   Fields: First name, Last name, Email, Password, Confirm password
   Role selector: 4 cards (Founder/Creator/Talent Manager/Other)
   CTA: 'Continue'
   Validation: all required, email format, password min 8 chars,
   passwords match

   Step 2 — Personal info:
   Fields: Date of birth (day/month/year selects),
   City (text), Country (select — African countries first),
   Languages (multi-select chips from predefined list),
   Bio (textarea, max 300 chars with char counter)
   CTA: 'Continue'

   Step 3 — Social accounts:
   4 platform rows: Instagram, TikTok, YouTube, Facebook
   Each row: platform icon colour block + username text input +
   checkbox to include
   Notice: 'Your stats will be shared with brands when you apply'
   CTA: 'Continue' (at least 1 platform required)

   Step 4 — Content preferences:
   Label: 'What kind of content do you make?'
   Grid of Chip components (multi-select):
   ['Get ready with me','Tutorial / how-to','Product review',
   'Storytime','Challenges / trends','Day in the life',
   'Hauls','Behind the scenes','Sketch comedy','Dance','Q&A',
   'Live streams']
   
   Collab types (multi-select chips):
   ['UGC','Affiliate','Ambassador','Gifting','Commission',
   'Pay per view']
   
   CTA: 'Finish setup'

   On Step 4 submit:
   - Call signUpCreator server action with all collected data
   - Server action calls supabase.auth.signUp with role=creator
   - On success, insert creator_profile row with all fields
   - Insert social_accounts rows for each connected platform
   - Insert content_aesthetic rows for each selected format
   - Insert general_settings rows for each selected platform
   - Redirect to /onboarding/creator (welcome screen)

3. State management between steps:
   Use URL search params to carry form data between steps
   (encrypted or base64 encoded — no sensitive data in URL)
   Or use server-side session (cookies) between steps

4. Create app/onboarding/creator/page.tsx:
   requireCreator() — must be logged in
   'Welcome to Sokohuru, [first_name]!' heading
   3 next-step cards:
   1. Complete your profile → /dashboard/creator/profile
   2. Browse campaigns → /campaigns
   3. Set your availability → /dashboard/creator/settings
   CTA: 'Go to dashboard' → /dashboard/creator

Acceptance criteria:
- [ ] All 4 steps render with correct fields
- [ ] Step indicator shows correct state at each step
- [ ] Back button works on steps 2-4
- [ ] Form validation shows inline errors
- [ ] Step 4 submit creates auth user + profile rows in Supabase
- [ ] Redirect to /onboarding/creator after signup
- [ ] npx tsc --noEmit passes

DO NOT:
- Do not store password in URL params
- Do not skip Supabase row creation — all tables must be written
- Do not use a single-page form with useState — use route-per-step" "/path/to/sokohuru-web"
```

---

## Task 1.13 — Brand Signup Flow (4 steps)

**Priority:** P1 · **Estimate:** M · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Build the 4-step brand signup flow.

Rules:
- Branch from main as feature/brand-signup
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: brand signup 4-step flow'
- Push branch, open PR, merge to main
- Report: PR link

Project context:
Brands sign up in 4 steps. On completion, writes to brand_profile,
brand_contacts, brand_industry_tags, and brand_settings tables.

Steps:
  /auth/signup/brand/1 — Account details
  /auth/signup/brand/2 — Brand profile
  /auth/signup/brand/3 — Industry & collabs
  /auth/signup/brand/4 — Team contacts

Task:
1. Create app/auth/signup/brand/[step]/page.tsx:

   Step 1 — Account details:
   Fields: Work email, Password, Confirm password
   Role selector: Founder / Marketing Manager /
   Partnerships Lead / Agency (representing a brand)
   Notice: 'Use your work email for verified brand identity'
   CTA: 'Continue'

   Step 2 — Brand profile:
   Fields:
   - Logo upload (Supabase Storage, bucket: brand-assets)
   - Cover photo upload (same bucket)
   - Brand/company name (text)
   - Account slug (text, auto-generated from company name,
     editable, validated unique against brand_profile table)
   - Website URL (text)
   - Bio (textarea, max 400 chars)
   - City, Country (text + select)
   CTA: 'Continue'

   Step 3 — Industry & collabs:
   Industry chips (single-select primary + multi-select categories):
   Primary: ['Beauty & Skincare','Fashion & Style','Food & Beverage',
   'Tech & Electronics','Health & Fitness','Home & Lifestyle',
   'Travel','Finance','Entertainment','Education','Sports']
   
   Subcategories appear based on primary selection
   
   Collab types (multi-select):
   ['UGC','Affiliate','Ambassador','Gifting','Commission',
   'Pay per view']
   
   Notice: 'Creators filter campaigns by collab type'
   CTA: 'Continue'

   Step 4 — Team contacts:
   Primary contact block:
   First name, Last name, Role at brand, Phone (optional)
   (email pre-filled from Step 1, not editable here)

   Secondary contact block (optional, collapsible):
   Same fields, marked optional

   Profile settings toggles:
   - Discoverable (default: true)
   - Open to applications (default: true)
   - Show past campaigns (default: false)
   - Email notifications (default: true)

   On submit:
   - signUpBrand server action
   - supabase.auth.signUp with role=brand
   - Insert brand_profile row
   - Insert brand_contacts rows
   - Insert brand_industry_tags rows
   - Insert brand_settings row
   - Redirect to /onboarding/brand

2. Create app/onboarding/brand/page.tsx:
   requireBrand() check
   'Welcome to Sokohuru, [company_name]!'
   3 next steps:
   1. Complete brand profile → /dashboard/brand/profile
   2. Create your first campaign → /dashboard/brand/campaigns/new
   3. Add payment method → /dashboard/brand/billing
   CTA: 'Go to dashboard' → /dashboard/brand

Acceptance criteria:
- [ ] All 4 steps render
- [ ] Logo and cover photo upload to Supabase Storage
- [ ] Account slug validated for uniqueness
- [ ] All Supabase rows created on submit
- [ ] Redirect to /onboarding/brand
- [ ] npx tsc --noEmit passes" "/path/to/sokohuru-web"
```

---

## Task 1.14 — Dashboard Shells (Creator + Brand)

**Priority:** P1 · **Estimate:** M · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Build the dashboard shell layouts for creator and brand.
These are the authenticated app experiences — not the marketing site.

Rules:
- Branch from main as feature/dashboard-shells
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: creator and brand dashboard shells'
- Push branch, open PR, merge to main
- Report: PR link

Project context:
After login, creators go to /dashboard/creator and brands go to
/dashboard/brand. These have different navigation and layouts
from the marketing site. They use a sidebar on desktop and
bottom navigation on mobile.

Task:
1. Create app/dashboard/creator/layout.tsx:
   requireCreator() at top of layout
   
   Desktop layout (≥768px): sidebar + main content
   Sidebar (240px wide, fixed):
   - Background: var(--sk-surface-1)
   - Border right: 0.5px var(--sk-border)
   - Logo at top (same as Nav)
   - Nav items with icons:
     Discover (/dashboard/creator)
     Campaigns (/dashboard/creator/campaigns)  
     Inbox (/dashboard/creator/inbox)
     Earnings (/dashboard/creator/earnings)
     Profile (/dashboard/creator/profile)
     Settings (/dashboard/creator/settings)
   - Active item: bg var(--sk-surface-2), 
     text var(--sk-pink), left border 2px var(--sk-pink)
   - Inactive: text var(--sk-text-muted)
   - User info at bottom: avatar + name + 'Creator' badge
   - Sign out button

   Mobile layout (<768px): bottom tab bar
   - 5 tabs: Discover, Campaigns, Inbox, Earnings, Profile
   - Background: var(--sk-surface-1)
   - Border top: 0.5px var(--sk-border)
   - Active tab: icon + label in var(--sk-pink)
   - Inactive: icon + label in var(--sk-text-muted)
   - Active background pill: var(--sk-surface-2)

   Top bar (both mobile and desktop):
   - Height 56px, bg var(--sk-surface-1)
   - Border bottom: 0.5px var(--sk-border)
   - Page title (dynamic based on current route)
   - Right side: search icon + notification bell
     (notification dot if unread notifications exist)

2. Create app/dashboard/brand/layout.tsx:
   requireBrand() at top
   Same structure as creator but different nav items:
   Sidebar items:
   Overview (/dashboard/brand)
   Campaigns (/dashboard/brand/campaigns)
   Creators (/dashboard/brand/creators)
   Inbox (/dashboard/brand/inbox)
   Reports (/dashboard/brand/reports)
   Billing (/dashboard/brand/billing)
   Settings (/dashboard/brand/settings)

3. Update app/dashboard/creator/page.tsx:
   Overview stats:
   - Active applications count (from campaign_submissions)
   - Pending payments total (from content_submission)
   - Profile completion % (computed)
   - Campaigns available matching profile (from campaigns)
   All fetched server-side from Supabase

4. Update app/dashboard/brand/page.tsx:
   Overview stats:
   - Active campaigns count
   - Pending applications count
   - Content awaiting review count
   - Total paid out
   All fetched server-side

Acceptance criteria:
- [ ] requireCreator/requireBrand gates both dashboards
- [ ] Sidebar visible on desktop, hidden on mobile
- [ ] Bottom tabs visible on mobile, hidden on desktop
- [ ] Active route highlighted in nav
- [ ] Stats fetch from Supabase server-side
- [ ] Sign out works and redirects to /
- [ ] npx tsc --noEmit passes

DO NOT:
- Do not show the marketing Nav in dashboard layouts
- Do not put real-time subscriptions in the layout —
  that comes in a later task" "/path/to/sokohuru-web"
```

---

## Task 1.15 — SEO + Metadata + OG Tags

**Priority:** P1 · **Estimate:** S · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Add SEO metadata, Open Graph tags, and sitemap to all pages.

Rules:
- Branch from main as feature/seo-metadata
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: SEO metadata and Open Graph tags'
- Push branch, open PR, merge to main
- Report: PR link

Task:
1. Update app/layout.tsx with default metadata:
   export const metadata: Metadata = {
     metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
     title: {
       default: 'Sokohuru — Creator Marketplace for East Africa',
       template: '%s | Sokohuru'
     },
     description: 'Connect brands with the right creators.
     Authentic campaigns, real results, East Africa first.',
     keywords: ['creator marketplace', 'influencer marketing',
     'East Africa', 'Kenya', 'UGC', 'brand deals', 'affiliate'],
     authors: [{ name: 'Sokohuru' }],
     creator: 'Sokohuru',
     openGraph: {
       type: 'website',
       locale: 'en_KE',
       url: process.env.NEXT_PUBLIC_APP_URL,
       siteName: 'Sokohuru',
       images: [{ url: '/og-default.png', width: 1200, height: 630 }]
     },
     twitter: {
       card: 'summary_large_image',
       site: '@sokohuru',
       creator: '@sokohuru'
     },
     robots: {
       index: true,
       follow: true,
       googleBot: { index: true, follow: true }
     }
   }

2. Create app/sitemap.ts:
   Returns all static pages + dynamic campaign pages
   Static: /, /for-creators, /for-brands, /campaigns,
           /pricing, /about, /blog, /contact
   Dynamic: fetch all active campaign slugs from Supabase,
            return /campaigns/[slug] for each

3. Create app/robots.ts:
   Allow all crawlers
   Disallow: /dashboard/*, /auth/*, /api/*
   Sitemap: process.env.NEXT_PUBLIC_APP_URL + '/sitemap.xml'

4. Create public/og-default.png placeholder:
   (1200×630px, can be a coloured rectangle with text for now)
   Add note for developer to replace with real OG image

5. Add JSON-LD structured data to app/page.tsx:
   Organization schema with name, url, logo, sameAs social links

6. Create app/not-found.tsx:
   Custom 404 page matching Sokohuru design
   'Page not found' heading, link back to homepage

Acceptance criteria:
- [ ] /sitemap.xml returns valid XML
- [ ] /robots.txt disallows dashboard routes
- [ ] Default OG image referenced correctly
- [ ] metadata.metadataBase uses env var not hardcoded URL
- [ ] 404 page renders with Sokohuru styling
- [ ] npx tsc --noEmit passes" "/path/to/sokohuru-web"
```

---

## Task 1.16 — Vercel Analytics + Speed Insights

**Priority:** P2 · **Estimate:** S · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Add Vercel Analytics and Speed Insights to the project.

Rules:
- Branch from main as feature/analytics
- npx tsc --noEmit must pass before commit
- git add, git commit -m 'feat: Vercel Analytics and Speed Insights'
- Push branch, open PR, merge to main
- Report: PR link

Task:
1. Add to app/layout.tsx:
   import { Analytics } from '@vercel/analytics/react'
   import { SpeedInsights } from '@vercel/speed-insights/next'
   Add <Analytics /> and <SpeedInsights /> inside body

2. Create lib/analytics.ts:
   Export trackEvent function wrapping Vercel's track():
   export function trackEvent(name: string, props?: Record<string, string>) {
     // import track from @vercel/analytics
   }
   
   Export predefined events as constants:
   EVENTS.CREATOR_SIGNUP_STARTED
   EVENTS.CREATOR_SIGNUP_COMPLETED
   EVENTS.BRAND_SIGNUP_STARTED
   EVENTS.BRAND_SIGNUP_COMPLETED
   EVENTS.CAMPAIGN_VIEWED
   EVENTS.CAMPAIGN_APPLY_CLICKED

3. Add trackEvent calls in signup flows:
   On Step 1 load: CREATOR_SIGNUP_STARTED or BRAND_SIGNUP_STARTED
   On final submit success: CREATOR_SIGNUP_COMPLETED or BRAND_SIGNUP_COMPLETED

Acceptance criteria:
- [ ] Analytics component in layout
- [ ] SpeedInsights component in layout
- [ ] trackEvent utility exported
- [ ] Event constants defined
- [ ] npx tsc --noEmit passes" "/path/to/sokohuru-web"
```

---

## Task 1.17 — Production Deploy + Domain Config

**Priority:** P1 · **Estimate:** S · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Final production deploy, domain configuration, and environment
variable setup on Vercel.

Rules:
- Work on main branch directly for this task
- git add, git commit -m 'chore: production config and env setup'
- Push to main → triggers Vercel auto-deploy
- Report: production URL, any errors, checklist complete

Task:
1. Verify all env vars are set in Vercel dashboard:
   Run: npx vercel env ls
   Confirm all vars from .env.local are present in production
   (developer must add actual values manually in Vercel dashboard)

2. Configure custom domain:
   Run: npx vercel domains add sokohuru.co
   Add www redirect: npx vercel domains add www.sokohuru.co
   Note: DNS changes must be made by developer in domain registrar

3. Update next.config.ts:
   Add security headers:
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - Referrer-Policy: strict-origin-when-cross-origin
   - Permissions-Policy: camera=(), microphone=(), geolocation=()
   - Content-Security-Policy (permissive for now, tighten later)

4. Add vercel.json at root:
   {
     'buildCommand': 'next build',
     'outputDirectory': '.next',
     'framework': 'nextjs',
     'regions': ['iad1', 'cdg1'],
     'crons': []
   }
   Note: crons array will be populated in Sprint 2

5. Run final checks:
   npx tsc --noEmit
   npx eslint . --ext .ts,.tsx
   next build (verify zero build errors)
   
6. Verify in production:
   - sokohuru.co loads
   - sokohuru.co/for-creators loads
   - sokohuru.co/for-brands loads
   - sokohuru.co/campaigns loads
   - sokohuru.co/auth/signup loads
   - sokohuru.co/sitemap.xml returns XML
   - sokohuru.co/robots.txt returns correct rules

Acceptance criteria:
- [ ] next build completes with zero errors
- [ ] Security headers present (verify with securityheaders.com)
- [ ] All 6 pages load in production
- [ ] sitemap.xml and robots.txt work
- [ ] Vercel deploy triggers on git push to main

DO NOT:
- Do not commit actual API keys or secrets to git
- Do not hardcode the domain — always use env var" "/path/to/sokohuru-web"
```

---

---

# SPRINT 1B — sokohuru-api setup (Middleware — all secrets live here)

---

## Task 1.18 — sokohuru-api Project Setup + Vercel Deploy

**Priority:** P1 · **Estimate:** S · **Target:** sokohuru-api

```
Kim here. Run this command and return the full output:

"Set up the sokohuru-api middleware project — a Next.js 15 app
with API routes only. No pages, no UI. Deploys to api.sokohuru.com.

Rules:
- Work in the sokohuru-api directory
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: sokohuru-api middleware project setup'
- Push to main
- Report: files created, Vercel deploy URL, any errors

Project context:
sokohuru-api is a standalone Next.js 15 project that serves ONLY
API routes. No pages directory. No UI components. No Tailwind.
All secret keys (Stripe, M-Pesa, Supabase service role) live
ONLY in this project — never in sokohuru-web or sokohuru-mobile.
Deployed to api.sokohuru.com as a separate Vercel project.
Called by sokohuru-mobile (Flutter) via HTTP with JWT auth.
Called by Supabase webhooks with webhook secret verification.

Task:
1. Initialise Next.js 15 project:
   npx create-next-app@latest . --typescript --eslint --app
   --no-tailwind --no-src-dir --import-alias='@/*'

2. Delete all non-API files:
   - Delete app/page.tsx
   - Delete app/globals.css
   - Delete public/ directory contents
   - Keep app/layout.tsx as minimal shell (no UI)

3. Install dependencies:
   npm install @supabase/supabase-js zod resend stripe
   npm install -D @types/node

4. Create .env.local from sokohuru-api ENV template
   (all values as placeholders — developer fills actual values)

5. Create lib/config.ts (server-only — ALL env vars):
   export const config = {
     supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
     supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
     supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
     supabaseJwtSecret: process.env.SUPABASE_JWT_SECRET!,
     supabaseWebhookSecret: process.env.SUPABASE_WEBHOOK_SECRET!,
     mpesaConsumerKey: process.env.MPESA_CONSUMER_KEY!,
     mpesaConsumerSecret: process.env.MPESA_CONSUMER_SECRET!,
     mpesaShortcode: process.env.MPESA_SHORTCODE!,
     mpesaPasskey: process.env.MPESA_PASSKEY!,
     mpesaCallbackUrl: process.env.MPESA_CALLBACK_URL!,
     stripeSecretKey: process.env.STRIPE_SECRET_KEY!,
     stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
     resendApiKey: process.env.RESEND_API_KEY!,
     resendFromEmail: process.env.RESEND_FROM_EMAIL!,
     cronSecret: process.env.CRON_SECRET!,
     allowedOrigins: process.env.ALLOWED_ORIGINS!.split(','),
     appUrl: process.env.APP_URL!,
     apiUrl: process.env.API_URL!,
   }
   Throw descriptive error if any value is undefined.
   Add comment: THIS FILE IS SERVER-ONLY. NEVER IMPORT IN CLIENT CODE.

6. Create lib/supabase/admin.ts:
   import { createClient } from '@supabase/supabase-js'
   import { Database } from '@/types/database'
   import { config } from '@/lib/config'
   export const supabaseAdmin = createClient<Database>(
     config.supabaseUrl,
     config.supabaseServiceRoleKey
   )
   Comment: Uses service role key — bypasses RLS.
   Only used server-side in API routes.

7. Create lib/supabase/verify-jwt.ts:
   Verifies JWT from Flutter/web Authorization header:
   import { createClient } from '@supabase/supabase-js'
   export async function verifyJwt(token: string) {
     const client = createClient(config.supabaseUrl, config.supabaseAnonKey)
     const { data: { user }, error } = await client.auth.getUser(token)
     if (error || !user) throw new Error('Invalid token')
     return user
   }

8. Create lib/cors.ts:
   export function corsHeaders(origin: string | null) {
     const allowed = config.allowedOrigins
     const isAllowed = origin && allowed.includes(origin)
     return {
       'Access-Control-Allow-Origin': isAllowed ? origin : allowed[0],
       'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
       'Access-Control-Max-Age': '86400',
     }
   }
   export function withCors(response: Response, origin: string | null) {
     const headers = corsHeaders(origin)
     Object.entries(headers).forEach(([k, v]) =>
       response.headers.set(k, v)
     )
     return response
   }

9. Create app/api/health/route.ts:
   GET handler — returns { status: 'ok', timestamp: ISO string }
   No auth required. Used to verify deployment is live.
   Apply CORS headers.

10. Create types/database.ts placeholder (same as sokohuru-web)

11. Update next.config.ts:
    No image domains needed (no UI).
    Add comment: API-only project — no pages configured.

12. Create vercel.json:
    {
      'buildCommand': 'next build',
      'outputDirectory': '.next',
      'framework': 'nextjs',
      'regions': ['iad1', 'cdg1'],
      'crons': []
    }

13. Deploy to Vercel as a NEW project:
    npx vercel --prod
    Note in report: this is a separate Vercel project from sokohuru-web

Acceptance criteria:
- [ ] npx tsc --noEmit passes
- [ ] npx eslint . passes
- [ ] No pages/ or UI files exist
- [ ] GET /api/health returns { status: 'ok' }
- [ ] CORS headers present on /api/health response
- [ ] lib/config.ts throws if any env var missing
- [ ] Deployed to Vercel — URL returned in report

DO NOT:
- Do not add any UI components or pages
- Do not use NEXT_PUBLIC_ prefix for secret keys
- Do not import lib/config.ts in any client component
  (there are no client components — this is API only)" "/path/to/sokohuru-api"
```

---

## Task 1.19 — CORS + JWT Auth Middleware (sokohuru-api)

**Priority:** P1 · **Estimate:** S · **Target:** sokohuru-api

```
Kim here. Run this command and return the full output:

"Add request authentication and CORS middleware to sokohuru-api.
Every protected route uses these utilities.

Rules:
- Branch from main as feature/cors-jwt-middleware
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: CORS and JWT auth middleware'
- Push branch, open PR, merge to main
- Report: PR link

Task:
1. Create lib/middleware/with-auth.ts:
   Higher-order function that wraps route handlers:

   type AuthenticatedHandler = (
     request: Request,
     context: { userId: string; params?: Record<string, string> }
   ) => Promise<Response>

   export function withAuth(handler: AuthenticatedHandler) {
     return async (request: Request, context?: unknown) => {
       const origin = request.headers.get('origin')

       // Handle CORS preflight
       if (request.method === 'OPTIONS') {
         return new Response(null, {
           status: 204,
           headers: corsHeaders(origin)
         })
       }

       // Extract and verify JWT
       const authHeader = request.headers.get('authorization')
       if (!authHeader?.startsWith('Bearer ')) {
         return withCors(
           Response.json({ error: 'Missing authorization header' },
           { status: 401 }),
           origin
         )
       }

       const token = authHeader.split(' ')[1]
       try {
         const user = await verifyJwt(token)
         const response = await handler(request, {
           userId: user.id,
           params: (context as any)?.params
         })
         return withCors(response, origin)
       } catch {
         return withCors(
           Response.json({ error: 'Invalid or expired token' },
           { status: 401 }),
           origin
         )
       }
     }
   }

2. Create lib/middleware/with-webhook.ts:
   Verifies Supabase webhook signature:

   export function withWebhook(
     handler: (request: Request, body: unknown) => Promise<Response>
   ) {
     return async (request: Request) => {
       const signature = request.headers.get('x-supabase-signature')
       const body = await request.text()

       // HMAC-SHA256 verification
       const encoder = new TextEncoder()
       const key = await crypto.subtle.importKey(
         'raw',
         encoder.encode(config.supabaseWebhookSecret),
         { name: 'HMAC', hash: 'SHA-256' },
         false,
         ['verify']
       )
       const sigBytes = Buffer.from(signature ?? '', 'hex')
       const bodyBytes = encoder.encode(body)
       const valid = await crypto.subtle.verify('HMAC', key, sigBytes, bodyBytes)

       if (!valid) {
         return Response.json({ error: 'Invalid webhook signature' },
           { status: 401 })
       }

       return handler(request, JSON.parse(body))
     }
   }

3. Create lib/middleware/with-cron.ts:
   Verifies Vercel cron secret:

   export function withCron(
     handler: (request: Request) => Promise<Response>
   ) {
     return async (request: Request) => {
       const auth = request.headers.get('authorization')
       if (auth !== \`Bearer \${config.cronSecret}\`) {
         return Response.json({ error: 'Unauthorized' }, { status: 401 })
       }
       return handler(request)
     }
   }

4. Update app/api/health/route.ts to use withCors:
   Apply CORS to OPTIONS preflight + GET response

5. Create lib/utils/response.ts:
   Helper for consistent JSON responses:
   export const ok = (data: unknown) =>
     Response.json({ success: true, data })
   export const err = (message: string, status = 400) =>
     Response.json({ success: false, error: message }, { status })

Acceptance criteria:
- [ ] withAuth returns 401 for missing Authorization header
- [ ] withAuth returns 401 for invalid JWT
- [ ] withAuth passes userId to handler for valid JWT
- [ ] withWebhook returns 401 for invalid signature
- [ ] withCron returns 401 for wrong secret
- [ ] OPTIONS requests return 204 with CORS headers
- [ ] npx tsc --noEmit passes

DO NOT:
- Do not use any third-party auth library — use Supabase JWT verification
- Do not skip CORS on any route — withAuth applies it automatically" "/path/to/sokohuru-api"
```

---

# SPRINT 2 — sokohuru-api Middleware Routes

---

## Task 2.1 — Supabase Webhook Receiver

**Priority:** P1 · **Estimate:** S · **Target:** sokohuru-api

```
Kim here. Run this command and return the full output:

"Build the Supabase database webhook receiver endpoint.

Rules:
- Branch from main as feature/webhook-receiver
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: supabase webhook receiver'
- Push branch, open PR, merge to main
- Report: PR link

Project context:
sokohuru-api receives Supabase database webhooks. All secret
verification logic lives here — never in sokohuru-web.
Uses withWebhook middleware from Task 1.19 for signature verification.

Tables that fire webhooks:
- campaign_submissions (INSERT → notify brand, UPDATE → notify creator)
- contracts (INSERT → notify creator, UPDATE → notify brand)
- content_submission (INSERT → notify brand, UPDATE → notify creator)
- notifications (INSERT → send email)

Task:
1. Create app/api/webhooks/supabase/route.ts:

   POST handler:
   - Verify webhook signature:
     const signature = request.headers.get('x-supabase-signature')
     Compare with HMAC-SHA256 of request body using 
     process.env.SUPABASE_WEBHOOK_SECRET
     Return 401 if invalid
   
   - Parse body: { type, table, record, old_record, schema }
   
   - Route to handler based on table + type:
     table=campaign_submissions, type=INSERT → handleNewSubmission(record)
     table=campaign_submissions, type=UPDATE → handleSubmissionUpdate(record, old_record)
     table=contracts, type=INSERT → handleContractIssued(record)
     table=contracts, type=UPDATE → handleContractUpdate(record, old_record)
     table=content_submission, type=INSERT → handleContentSubmitted(record)
     table=content_submission, type=UPDATE → handleContentUpdate(record, old_record)
   
   - Return 200 on success, 500 on error

2. Create lib/webhooks/handlers.ts:
   Each handler fetches related data from Supabase admin client
   and inserts a notifications row:

   handleNewSubmission(record):
   - Fetch campaign → get brand_id
   - Insert notifications row:
     { brand_id, type: 'submission_pending',
       title: 'New application received',
       body: 'A creator has applied to [campaign name]',
       meta: { campaign_id, profile_id } }

   handleSubmissionUpdate(record, old_record):
   - If status changed to 'approved':
     Insert notification for creator:
     { profile_id, type: 'submission_approved',
       title: 'You\'ve been approved!',
       body: 'Brand approved your application to [campaign]' }
   - If status changed to 'rejected':
     Insert notification for creator:
     { profile_id, type: 'submission_rejected', ... }

   handleContractIssued(record):
   - Insert notification for creator:
     { type: 'contract_issued', title: 'Contract ready to sign' }

   handleContractUpdate(record, old_record):
   - If status changed to 'signed':
     Insert notification for brand:
     { type: 'contract_signed', title: '[creator] signed the contract' }

   handleContentSubmitted(record):
   - Insert notification for brand:
     { type: 'content_approved' ... }
     (name is misleading — this is submission, rename handler)

   handleContentUpdate(record, old_record):
   - If payment_status changed to 'pending':
     Insert notification for creator:
     { type: 'payment_queued', title: 'Payment is being processed' }
   - If payment_status changed to 'paid':
     Insert notification for creator:
     { type: 'payment_sent', title: 'Payment sent!' }

3. Add SUPABASE_WEBHOOK_SECRET to .env.local

Acceptance criteria:
- [ ] POST /api/webhooks/supabase returns 401 for invalid signature
- [ ] POST /api/webhooks/supabase returns 200 for valid payload
- [ ] Each table+type combo routes to correct handler
- [ ] Notification rows created correctly in Supabase
- [ ] npx tsc --noEmit passes" "/path/to/sokohuru-web"
```

---

## Task 2.2 — Notification Dispatch + Email (/api/notify)

**Priority:** P1 · **Estimate:** M · **Target:** sokohuru-api

```
Kim here. Run this command and return the full output:

"Build the notification dispatch system — in-app and email.

Rules:
- Branch from main as feature/notification-dispatch
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: notification dispatch and email system'
- Push branch, open PR, merge to main
- Report: PR link

Project context:
When a notification row is inserted in Supabase, the webhook
fires to /api/webhooks/supabase which calls handlers that insert
notification rows. A separate Supabase webhook on the notifications
table then calls /api/notify to send emails.
Email provider: Resend (npm install resend already done).
From address: from process.env.RESEND_FROM_EMAIL

Task:
1. Create app/api/notify/route.ts:
   POST handler — called by Supabase webhook on notifications INSERT
   
   Verify webhook signature (same as Task 2.1)
   Parse notification record from body
   
   Route to email sender based on notification.type:
   - submission_pending → sendBrandNotificationEmail
   - submission_approved → sendCreatorApprovedEmail
   - submission_rejected → sendCreatorRejectedEmail
   - contract_issued → sendContractIssuedEmail
   - contract_signed → sendBrandContractSignedEmail
   - content_approved → sendPaymentQueuedEmail
   - payment_sent → sendPaymentSentEmail

2. Create lib/email/templates.ts:
   Each template returns { subject, html, text }
   
   sendCreatorApprovedEmail({ creatorName, campaignName, brandName }):
   Subject: 'You\'ve been approved by [brandName]!'
   HTML: Simple branded email
   - Sokohuru logo (text-based, no image dependency)
   - Heading: 'You\'re in, [creatorName]!'
   - Body: 'Congratulations! [brandName] has approved your
     application for [campaignName]. Sign into the app to
     review and sign your contract.'
   - CTA button: 'Open Sokohuru App'
     href = process.env.NEXT_PUBLIC_APP_URL + '/dashboard/creator'
   - Footer: unsubscribe link

   sendCreatorRejectedEmail({ creatorName, campaignName, brandName, reason }):
   Subject: 'Application update from [brandName]'
   Tone: supportive, not harsh
   Body: 'Thank you for applying. Unfortunately [brandName]
   has filled their creator spots for [campaignName].
   There are other campaigns waiting for you.'
   CTA: 'Browse campaigns'

   sendContractIssuedEmail({ creatorName, campaignName, brandName }):
   Subject: 'Your contract is ready to sign'
   Body: explain they need to sign in the app
   CTA: 'Review & sign contract'

   sendPaymentSentEmail({ creatorName, amount, method }):
   Subject: 'Payment sent — $[amount]'
   Body: 'Your payment of $[amount] has been sent to your [method].'

   sendBrandNotificationEmail({ brandContact, campaignName, creatorName }):
   Subject: 'New application — [creatorName]'
   Body: 'A creator has applied to [campaignName]. 
   Review their profile in the dashboard.'
   CTA: 'Review application'

3. Create lib/email/send.ts:
   import { Resend } from 'resend'
   const resend = new Resend(process.env.RESEND_API_KEY)

   export async function sendEmail({ to, subject, html, text }) {
     return resend.emails.send({
       from: process.env.RESEND_FROM_EMAIL!,
       to, subject, html, text
     })
   }

4. All emails must:
   - Work in plain text fallback
   - Include unsubscribe link (legal requirement)
   - Never hardcode URLs — use NEXT_PUBLIC_APP_URL env var
   - Be mobile-responsive HTML

Acceptance criteria:
- [ ] POST /api/notify returns 200 for each notification type
- [ ] Each notification type triggers correct email template
- [ ] Resend API called with correct from address from env
- [ ] All URLs in emails use env vars
- [ ] npx tsc --noEmit passes" "/path/to/sokohuru-web"
```

---

## Task 2.3 — Fit Score Engine (/api/fit-score)

**Priority:** P1 · **Estimate:** M · **Target:** sokohuru-api

```
Kim here. Run this command and return the full output:

"Build the creator-campaign fit score engine.

Rules:
- Branch from main as feature/fit-score-engine
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: fit score engine API route'
- Push branch, open PR, merge to main
- Report: scoring algorithm explained, PR link

Project context:
The fit score (0-100) rates how well a creator matches a campaign.
Used to rank creators in the brand submissions inbox and to show
creators their match strength on campaign cards.
Called from both web and Flutter via POST /api/fit-score.

Supabase tables used:
- creator_profile (basics)
- social_accounts (followers, engagement)
- demographics (region, age, gender)
- content_aesthetic (formats)
- general_settings (platform availability)
- campaign_requirements (min/max followers, region, age, formats)
- campaigns (type, platforms)

Task:
1. Create app/api/fit-score/route.ts:

   POST handler:
   - Authenticate: verify JWT from Authorization header
   - Validate body with Zod:
     schema: { campaignId: string, profileId: string }
   - Fetch creator data and campaign requirements from Supabase
   - Run scoring algorithm
   - Return { score, breakdown, matched, failed }
   - Also update campaign_submissions.fit_score in Supabase

2. Create lib/scoring/fitScore.ts:

   export function calculateFitScore(
     creator: CreatorData,
     campaign: CampaignData,
     requirements: CampaignRequirements
   ): FitScoreResult

   Algorithm — weighted scoring (total = 100 points):

   a. Content format match (25 points):
      Check creator.content_aesthetic against campaign required formats
      Full match (all required formats): 25 pts
      Partial match (some): proportional
      No match: 0 pts

   b. Platform availability (20 points):
      Check creator.general_settings.available for each campaign platform
      All platforms available: 20 pts
      Some available: proportional
      None: 0 pts

   c. Follower range (20 points):
      Check creator.social_accounts.followers against
      requirements.min_followers and max_followers
      Within range: 20 pts
      Outside range: 0 pts
      No requirement set: 20 pts (full score)

   d. Engagement rate (15 points):
      Check creator.social_accounts.engagement against
      requirements.min_engagement
      Meets or exceeds: 15 pts
      Below: scale 0-15 proportionally
      No requirement: 15 pts

   e. Audience region (10 points):
      Check creator.demographics.region against requirements.region
      Match: 10 pts
      No match: 0 pts
      No requirement: 10 pts

   f. Collab type preference (10 points):
      Check if creator has campaign collab type in their preferences
      Match: 10 pts
      No match: 0 pts

   Return:
   {
     score: number (0-100),
     breakdown: {
       contentFormat: number,
       platformAvailability: number,
       followerRange: number,
       engagementRate: number,
       audienceRegion: number,
       collabPreference: number
     },
     matched: string[] (list of passing checks),
     failed: string[] (list of failing checks)
   }

3. Create Zod schemas in lib/scoring/schemas.ts:
   FitScoreRequestSchema, CreatorDataSchema, CampaignDataSchema

4. This endpoint is called by:
   - Web: when brand opens submissions inbox
   - Flutter: when creator views a campaign card
   Both pass JWT in Authorization header

Acceptance criteria:
- [ ] POST /api/fit-score with valid JWT returns score 0-100
- [ ] Returns 401 without valid JWT
- [ ] Returns 400 for invalid body (Zod validation)
- [ ] Breakdown sums to total score correctly
- [ ] campaign_submissions.fit_score updated in Supabase
- [ ] npx tsc --noEmit passes" "/path/to/sokohuru-web"
```

---

## Task 2.4 — Affiliate Link Tracker (Edge Function)

**Priority:** P1 · **Estimate:** S · **Target:** sokohuru-api

```
Kim here. Run this command and return the full output:

"Build the affiliate link tracking edge function.
This must run at the CDN edge for sub-millisecond response.

Rules:
- Branch from main as feature/affiliate-tracker
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: affiliate link tracker edge function'
- Push branch, open PR, merge to main
- Report: PR link

Project context:
When a creator posts their affiliate link (e.g. sokohuru.co/t/maya-zara),
clicks must be tracked instantly and the user redirected to the brand's
product URL. This must be fast (edge runtime, not Node.js runtime).
The affiliate_links table has: id, profile_id, campaign_id, slug,
clicks, sales, earned, expires_at.

Task:
1. Create app/api/track/[slug]/route.ts:

   export const runtime = 'edge'

   GET handler:
   - Get slug from params
   - Fetch affiliate_links row where slug = slug
     using Supabase (edge-compatible fetch, not SDK)
   - If not found: redirect to NEXT_PUBLIC_APP_URL (homepage)
   - If found but expires_at < now: redirect to homepage
     with ?expired=1 param
   - If valid:
     - Increment clicks by 1 (fire-and-forget, don't await)
     - Get brand product URL from campaigns table
     - Redirect 302 to product URL
   
   Supabase REST API call (edge-compatible):
   Use fetch() with Supabase REST endpoint directly:
   fetch(`${SUPABASE_URL}/rest/v1/affiliate_links?slug=eq.${slug}`, {
     headers: {
       apikey: SUPABASE_ANON_KEY,
       Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
     }
   })

   Increment clicks (fire-and-forget):
   fetch(`${SUPABASE_URL}/rest/v1/affiliate_links?slug=eq.${slug}`, {
     method: 'PATCH',
     headers: { ... },
     body: JSON.stringify({ clicks: record.clicks + 1 })
   })

2. Add to vercel.json:
   No special config needed — edge runtime declared in route file

3. URL format: sokohuru.co/t/[slug]
   Update next.config.ts with redirect:
   source: '/t/:slug', destination: '/api/track/:slug'
   permanent: false

Acceptance criteria:
- [ ] GET /api/track/valid-slug redirects to product URL
- [ ] GET /api/track/invalid-slug redirects to homepage
- [ ] GET /api/track/expired-slug redirects with ?expired=1
- [ ] Clicks incremented in affiliate_links table
- [ ] runtime = 'edge' declared — no Node.js APIs used
- [ ] Response time < 50ms
- [ ] npx tsc --noEmit passes" "/path/to/sokohuru-web"
```

---

## Task 2.5 — Contract Signing Verification (/api/contracts/sign)

**Priority:** P1 · **Estimate:** M · **Target:** sokohuru-api

```
Kim here. Run this command and return the full output:

"Build the contract signing verification API route.

Rules:
- Branch from main as feature/contract-signing
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: contract signing verification endpoint'
- Push branch, open PR, merge to main
- Report: PR link

Project context:
When a creator signs a contract, the Flutter app or web app sends
a POST to this endpoint. Server validates:
1. The contract belongs to this creator (not spoofed)
2. The sign_by deadline hasn't passed
3. Both checkboxes were submitted (brief accepted + exclusivity)
4. The contract is still in 'pending' status (not already signed)
Only then does it update the contracts table.
Never trust client-side — all validation is server-side.

Task:
1. Create app/api/contracts/[id]/sign/route.ts:

   POST handler:
   - Authenticate JWT from Authorization header
   - Extract userId from JWT
   
   - Validate request body with Zod:
     schema: {
       contractId: string (UUID),
       acceptedBrief: boolean (must be true),
       acceptedExclusivity: boolean (must be true),
       signatureTimestamp: number (unix timestamp)
     }
   
   - Fetch contract from Supabase using supabaseAdmin:
     SELECT * FROM contracts WHERE id = contractId
   
   - Validate ownership:
     If contract.profile_id !== userId: return 403
   
   - Validate status:
     If contract.status !== 'pending': 
     return 400 { error: 'Contract already signed or cancelled' }
   
   - Validate deadline:
     If contract.sign_by < new Date():
     return 400 { error: 'Contract signing deadline has passed' }
     Also update contract status to 'expired'
   
   - Validate checkboxes:
     If !acceptedBrief || !acceptedExclusivity:
     return 400 { error: 'Both terms must be accepted' }
   
   - All checks pass → update contract:
     UPDATE contracts SET
       status = 'signed',
       signed_date = NOW()
     WHERE id = contractId
   
   - Return 200 { success: true, contract: updatedContract }

2. Create lib/contracts/validate.ts:
   Export individual validation functions:
   validateOwnership(contract, userId) → boolean
   validateDeadline(contract) → { valid: boolean, expired: boolean }
   validateStatus(contract) → boolean
   validateCheckboxes(body) → boolean

3. This endpoint is called identically from Flutter and web.
   Flutter passes: Authorization: Bearer {jwt}
   Web passes: Authorization: Bearer {jwt} (from supabase session)

Acceptance criteria:
- [ ] Returns 403 if creator doesn't own contract
- [ ] Returns 400 if sign_by deadline passed
- [ ] Returns 400 if checkboxes not both true
- [ ] Returns 400 if contract not in pending status
- [ ] Returns 200 and updates DB on valid request
- [ ] Works with JWT from both Flutter and web
- [ ] npx tsc --noEmit passes" "/path/to/sokohuru-web"
```

---

## Task 2.6 — M-Pesa Payment Integration

**Priority:** P1 · **Estimate:** L · **Target:** sokohuru-api

```
Kim here. Run this command and return the full output:

"Build M-Pesa STK Push payment integration for creator payouts.

Rules:
- Branch from main as feature/mpesa-integration
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: M-Pesa STK push payout integration'
- Push branch, open PR, merge to main
- Report: PR link

Project context:
Creators in Kenya request payouts via M-Pesa. This is the primary
payout method. Uses Safaricom Daraja API (sandbox for now).
Flow: creator requests payout → we initiate B2C payment →
M-Pesa sends result to callback URL → we update payout status.
All env vars: MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET,
MPESA_SHORTCODE, MPESA_PASSKEY, MPESA_CALLBACK_URL.

Task:
1. Create lib/payments/mpesa.ts:

   getAccessToken():
   - POST to https://sandbox.safaricom.co.ke/oauth/v1/generate
     (production: api.safaricom.co.ke)
   - Basic auth: base64(CONSUMER_KEY:CONSUMER_SECRET)
   - Returns access_token string
   - Cache token for its lifetime (expires in 3600s)
   - Use in-memory cache (Map), not Redis (keeping it simple)

   initiateB2CPayment({ phone, amount, payoutId }):
   - Get access token
   - POST to Daraja B2C endpoint
   - Body: {
       InitiatorName: 'Sokohuru',
       SecurityCredential: (encrypted, see Daraja docs),
       CommandID: 'BusinessPayment',
       Amount: amount,
       PartyA: MPESA_SHORTCODE,
       PartyB: phone (format: 2547XXXXXXXX),
       Remarks: 'Sokohuru creator payout',
       QueueTimeOutURL: MPESA_CALLBACK_URL + '/timeout',
       ResultURL: MPESA_CALLBACK_URL + '/result'
     }
   - Return { ConversationID, OriginatorConversationID }

   formatPhone(phone: string): string
   - Accepts: 07XXXXXXXX, +2547XXXXXXXX, 2547XXXXXXXX
   - Returns: 2547XXXXXXXX (always 12 digits)
   - Throws if not a valid Kenyan number

2. Create app/api/payments/mpesa/initiate/route.ts:
   POST handler (authenticated):
   - Verify JWT
   - Validate body: { payoutMethodId: string, amount: number }
   - Fetch payout_method from Supabase (verify belongs to user)
   - Validate amount > 0 and user has sufficient balance
   - Create payouts row with status='requested'
   - Call initiateB2CPayment
   - Update payouts row with M-Pesa ConversationID
   - Return 200 { success: true, payoutId }

3. Create app/api/webhooks/mpesa/route.ts:
   POST handler (no auth — M-Pesa calls this):
   - Parse M-Pesa callback body
   - ResultCode 0 = success, anything else = failure
   - Find payout by ConversationID
   - If success: UPDATE payouts SET status='sent', processed_at=NOW()
     Also UPDATE content_submission payment_status rows to 'paid'
   - If failure: UPDATE payouts SET status='failed'
   - Insert notifications row for creator
   - Return { ResultCode: 0, ResultDesc: 'Accepted' }

4. Create app/api/payments/mpesa/timeout/route.ts:
   POST handler for timeout callbacks:
   - Update payout status to 'failed'
   - Notify creator via notification row

Acceptance criteria:
- [ ] formatPhone handles all Kenyan phone formats correctly
- [ ] getAccessToken returns valid token from Safaricom sandbox
- [ ] POST /api/payments/mpesa/initiate creates payout row
- [ ] Webhook callback updates payout status correctly
- [ ] Returns 403 for unauthenticated initiate requests
- [ ] npx tsc --noEmit passes

DO NOT:
- Do not use production Safaricom URL — sandbox only until launch
- Do not log M-Pesa credentials or phone numbers
- Do not hardcode shortcode or any credentials" "/path/to/sokohuru-web"
```

---

## Task 2.7 — Campaign Expiry + Contract Expiry Crons

**Priority:** P2 · **Estimate:** S · **Target:** sokohuru-api

```
Kim here. Run this command and return the full output:

"Build Vercel cron jobs for campaign expiry and contract expiry.

Rules:
- Branch from main as feature/cron-jobs
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: campaign and contract expiry cron jobs'
- Push branch, open PR, merge to main
- Report: PR link

Project context:
Two automated cleanup jobs needed:
1. Expire campaigns past their end_date (active → completed)
2. Expire unsigned contracts past their sign_by date (pending → expired)
Both run daily. Vercel Cron calls a GET endpoint with a secret header.

Task:
1. Add to .env.local:
   CRON_SECRET=random_32_char_string_generate_it

2. Create lib/cron/auth.ts:
   export function verifyCronSecret(request: Request): boolean {
     const secret = request.headers.get('authorization')
     return secret === \`Bearer \${process.env.CRON_SECRET}\`
   }

3. Create app/api/cron/expire-campaigns/route.ts:
   GET handler:
   - Verify cron secret
   - Use supabaseAdmin
   - UPDATE campaigns
     SET status = 'completed'
     WHERE status = 'active'
     AND end_date < NOW()
     AND end_date IS NOT NULL
   - Return { count: updatedCount }

4. Create app/api/cron/expire-contracts/route.ts:
   GET handler:
   - Verify cron secret
   - UPDATE contracts
     SET status = 'expired'
     WHERE status = 'pending'
     AND sign_by < NOW()
     AND sign_by IS NOT NULL
   - For each expired contract, insert notification for creator:
     type: 'contract_issued' (reuse), body: 'Contract expired unsigned'
   - Return { count: updatedCount }

5. Update vercel.json crons array:
   {
     'crons': [
       {
         'path': '/api/cron/expire-campaigns',
         'schedule': '0 0 * * *'
       },
       {
         'path': '/api/cron/expire-contracts',
         'schedule': '0 1 * * *'
       }
     ]
   }

6. Add CRON_SECRET to Vercel environment variables instruction:
   Add comment in vercel.json: 
   // Add CRON_SECRET env var in Vercel dashboard

Acceptance criteria:
- [ ] GET /api/cron/expire-campaigns returns 401 without secret
- [ ] GET /api/cron/expire-campaigns updates status correctly
- [ ] GET /api/cron/expire-contracts returns 401 without secret
- [ ] vercel.json has both cron schedules
- [ ] npx tsc --noEmit passes" "/path/to/sokohuru-web"
```

---

# SPRINT 2 — Flutter Bootstrap (Week 2, parallel)

---

## Task 2.8 — Flutter Project Setup + Supabase Client

**Priority:** P1 · **Estimate:** S · **Target:** sokohuru-mobile

```
Kim here. Run this command and return the full output:

"Set up the Sokohuru Flutter project with Supabase client,
environment config, and base navigation shell.

Rules:
- Work in sokohuru-mobile directory
- flutter analyze must pass before commit
- flutter test must pass before commit
- git add, git commit -m 'feat: flutter project setup with supabase client'
- Push to main
- Report: files created, flutter pub get output, any errors

Project context:
sokohuru-mobile is the Flutter app for Sokohuru creator marketplace.
Targets iOS, Android, and Web (Flutter Web for early access).
Uses Supabase for auth and data. Calls sokohuru.co/api/* for
complex operations. Dark mode by default matching Sokohuru design.

Task:
1. Create new Flutter project:
   flutter create sokohuru_mobile --org co.sokohuru --platforms ios,android,web
   cd sokohuru_mobile

2. Add to pubspec.yaml dependencies:
   supabase_flutter: ^2.0.0
   flutter_dotenv: ^5.0.0
   go_router: ^13.0.0
   riverpod: ^2.0.0 (flutter_riverpod)
   freezed_annotation: ^2.0.0
   json_annotation: ^4.0.0
   http: ^1.0.0
   cached_network_image: ^3.0.0
   shimmer: ^3.0.0
   intl: ^0.19.0

   dev_dependencies:
   build_runner: ^2.0.0
   freezed: ^2.0.0
   json_serializable: ^6.0.0
   flutter_lints: ^3.0.0

3. Create .env in project root (not committed to git):
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_anon_key
   API_BASE_URL=https://sokohuru.co/api

4. Add .env to .gitignore

5. Create lib/core/config/app_config.dart:
   class AppConfig {
     static late final String supabaseUrl;
     static late final String supabaseAnonKey;
     static late final String apiBaseUrl;

     static Future<void> load() async {
       await dotenv.load(fileName: '.env');
       supabaseUrl = dotenv.env['SUPABASE_URL']!;
       supabaseAnonKey = dotenv.env['SUPABASE_ANON_KEY']!;
       apiBaseUrl = dotenv.env['API_BASE_URL']!;
     }
   }
   Never hardcode values. Always read from AppConfig.

6. Update lib/main.dart:
   - Load AppConfig before runApp
   - Initialise Supabase:
     await Supabase.initialize(
       url: AppConfig.supabaseUrl,
       anonKey: AppConfig.supabaseAnonKey
     )
   - Wrap app in ProviderScope (Riverpod)
   - Set theme to dark (ThemeData.dark())

7. Create lib/core/supabase/supabase_client.dart:
   final supabase = Supabase.instance.client;
   Simple export — used throughout the app

8. Create lib/core/theme/app_theme.dart:
   ThemeData darkTheme with Sokohuru tokens:
   - scaffoldBackgroundColor: Color(0xFF0C0B14)
   - cardColor: Color(0xFF1A1826)
   - colorScheme.primary: Color(0xFFC8185A)
   - colorScheme.surface: Color(0xFF111018)
   - textTheme with Plus Jakarta Sans
   - All colours from Sokohuru design system

9. Create lib/core/theme/app_colors.dart:
   abstract class AppColors {
     static const pink = Color(0xFFC8185A);
     static const pinkLight = Color(0xFFE8509A);
     static const pinkDark = Color(0xFF3A0E22);
     static const base = Color(0xFF0C0B14);
     static const surface1 = Color(0xFF111018);
     static const surface2 = Color(0xFF1A1826);
     static const surface3 = Color(0xFF1E1C2A);
     static const border = Color(0xFF2E2B40);
     static const textPrimary = Color(0xFFF0EEF8);
     static const textSecondary = Color(0xFF8E8AA8);
     static const textMuted = Color(0xFF6B6880);
     static const success = Color(0xFF0F6E56);
     static const successSurface = Color(0xFF0B2318);
     static const successText = Color(0xFF5DCAA5);
     static const warning = Color(0xFF854F0B);
     static const warningSurface = Color(0xFF2A1A04);
     static const warningText = Color(0xFFFAC775);
     static const error = Color(0xFFA32D2D);
     static const errorSurface = Color(0xFF2A0A0A);
     static const errorText = Color(0xFFF09595);
   }

10. Create lib/core/constants/app_spacing.dart:
    abstract class AppSpacing {
      static const xs = 4.0;
      static const sm = 8.0;
      static const md = 12.0;
      static const lg = 16.0;
      static const xl = 20.0;
      static const xxl = 24.0;
      static const xxxl = 32.0;
      static const xxxxl = 48.0;
    }

Acceptance criteria:
- [ ] flutter pub get succeeds
- [ ] flutter analyze passes with zero issues
- [ ] App launches on iOS simulator, Android emulator, Chrome
- [ ] Supabase initialises without error
- [ ] AppColors has all Sokohuru tokens
- [ ] No hardcoded colours in any file
- [ ] .env is in .gitignore" "/path/to/sokohuru-mobile"
```

---

## Task 2.9 — Flutter Auth + Role Routing

**Priority:** P1 · **Estimate:** M · **Target:** sokohuru-mobile

```
Kim here. Run this command and return the full output:

"Build Flutter authentication with role-based routing using GoRouter.

Rules:
- Branch from main as feature/flutter-auth-routing
- flutter analyze must pass before commit
- flutter test must pass before commit
- git add, git commit -m 'feat: flutter auth and role-based routing'
- Push branch, open PR, merge to main
- Report: PR link

Project context:
Auth uses Supabase Auth (email + password). Role stored in
public.user_roles table. On login, fetch role and route to
correct navigation shell (creator or brand). GoRouter handles
navigation. Riverpod manages auth state.

Task:
1. Create lib/core/auth/auth_provider.dart:
   Using Riverpod:
   
   authStateProvider: StreamProvider<AuthState>
   - Listens to supabase.auth.onAuthStateChange
   
   userRoleProvider: FutureProvider<String?>
   - Fetches role from user_roles table
   - Returns 'creator', 'brand', or null
   
   currentUserProvider: Provider<User?>
   - Returns supabase.auth.currentUser

2. Create lib/core/auth/auth_service.dart:
   class AuthService:
   
   Future<void> signUpCreator({
     required String email,
     required String password,
     required String firstName,
     required String lastName,
   })
   - supabase.auth.signUp with data: {'role': 'creator', ...}
   
   Future<void> signUpBrand({
     required String email,
     required String password,
     required String companyName,
   })
   - supabase.auth.signUp with data: {'role': 'brand', ...}
   
   Future<void> signIn({
     required String email,
     required String password,
   })
   - supabase.auth.signInWithPassword
   
   Future<void> signOut()
   - supabase.auth.signOut
   
   Future<String?> getUserRole()
   - SELECT role FROM user_roles WHERE id = currentUser.id

3. Create lib/core/router/app_router.dart:
   Using GoRouter with redirect logic:

   Routes:
   / → SplashScreen
   /auth/login → LoginScreen
   /auth/signup → SignupTypeScreen (choose creator or brand)
   /auth/signup/creator → CreatorSignupScreen
   /auth/signup/brand → BrandSignupScreen
   /creator → CreatorShell (navigation shell)
   /creator/discover → DiscoverScreen
   /creator/campaigns → CreatorCampaignsScreen
   /creator/inbox → CreatorInboxScreen
   /creator/earnings → EarningsScreen
   /creator/profile → CreatorProfileScreen
   /brand → BrandShell (navigation shell)
   /brand/dashboard → BrandDashboardScreen
   /brand/campaigns → BrandCampaignsScreen
   /brand/inbox → BrandInboxScreen
   /brand/reports → BrandReportsScreen
   /brand/profile → BrandProfileScreen

   Redirect logic:
   - If not authenticated → /auth/login
   - If authenticated + role=creator + going to /brand → /creator
   - If authenticated + role=brand + going to /creator → /brand
   - If authenticated + going to /auth/* → role-based home

4. Create lib/features/splash/splash_screen.dart:
   - Shows Sokohuru logo + pink background for 2 seconds
   - Checks auth state
   - Redirects to /creator, /brand, or /auth/login

5. Create shell widgets:
   lib/features/creator/shell/creator_shell.dart:
   - Bottom navigation bar (5 tabs: Discover, Campaigns, 
     Inbox, Earnings, Profile)
   - Active tab in AppColors.pink
   - Background AppColors.surface1
   - Border top 0.5px AppColors.border

   lib/features/brand/shell/brand_shell.dart:
   - Bottom nav: Dashboard, Campaigns, Inbox, Reports, Profile
   - Same styling as creator shell

Acceptance criteria:
- [ ] Unauthenticated user sees splash then /auth/login
- [ ] Creator login shows creator bottom nav
- [ ] Brand login shows brand bottom nav
- [ ] GoRouter redirect prevents cross-role access
- [ ] flutter analyze passes
- [ ] No hardcoded strings for routes — use AppRoutes constants" "/path/to/sokohuru-mobile"
```

---

## Task 2.10 — Flutter API Service (Middleware Client)

**Priority:** P1 · **Estimate:** M · **Target:** sokohuru-mobile

```
Kim here. Run this command and return the full output:

"Build the Flutter API service that calls sokohuru.co/api middleware.

Rules:
- Branch from main as feature/flutter-api-service
- flutter analyze must pass before commit
- git add, git commit -m 'feat: flutter API service for middleware calls'
- Push branch, open PR, merge to main
- Report: PR link

Project context:
Flutter calls sokohuru.co/api/* for operations that need server-side
logic (fit score, contract signing, payments). Simple Supabase
CRUD goes directly to Supabase. This service handles the middleware
calls with JWT auth headers.

Task:
1. Create lib/core/api/api_service.dart:

   class ApiService:
   - Base URL from AppConfig.apiBaseUrl
   - Gets JWT from supabase.auth.currentSession?.accessToken
   
   Future<Map<String, dynamic>> post(
     String path,
     Map<String, dynamic> body
   ):
   - POST to AppConfig.apiBaseUrl + path
   - Headers:
     Content-Type: application/json
     Authorization: Bearer {jwt}
   - Parse JSON response
   - Throw ApiException on non-200 status

   Future<Map<String, dynamic>> get(
     String path, {
     Map<String, String>? queryParams
   }):
   - GET to AppConfig.apiBaseUrl + path
   - Same auth header
   - Parse JSON response

2. Create lib/core/api/api_exception.dart:
   class ApiException implements Exception:
   - statusCode: int
   - message: String
   - toString() → 'ApiException($statusCode): $message'

3. Create lib/core/api/api_endpoints.dart:
   abstract class ApiEndpoints:
   static const fitScore = '/fit-score';
   static const contractSign = '/contracts'; // + /{id}/sign
   static const mPesaInitiate = '/payments/mpesa/initiate';
   static const trackAffiliate = '/track'; // + /{slug}
   static const reports = '/reports'; // + /{id}/pdf
   // All routes resolve to api.sokohuru.com/{endpoint}
   // AppConfig.apiBaseUrl = https://api.sokohuru.com

4. Create lib/features/campaigns/services/fit_score_service.dart:
   class FitScoreService:
   
   Future<FitScoreResult> getScore({
     required String campaignId,
     required String profileId,
   }):
   - POST ApiEndpoints.fitScore
   - Body: { campaignId, profileId }
   - Parse response into FitScoreResult model

5. Create lib/features/contracts/services/contract_service.dart:
   class ContractService:
   
   Future<void> signContract({
     required String contractId,
     required bool acceptedBrief,
     required bool acceptedExclusivity,
   }):
   - POST ApiEndpoints.contractSign + '/$contractId/sign'
   - Body: { contractId, acceptedBrief, acceptedExclusivity,
             signatureTimestamp: DateTime.now().millisecondsSinceEpoch }
   - Throw ApiException on failure

6. Create lib/features/payments/services/payment_service.dart:
   class PaymentService:
   
   Future<String> initiatePayoutMpesa({
     required String payoutMethodId,
     required double amount,
   }):
   - POST ApiEndpoints.mPesaInitiate
   - Returns payoutId string

7. Create Riverpod providers for each service:
   apiServiceProvider, fitScoreServiceProvider,
   contractServiceProvider, paymentServiceProvider

Acceptance criteria:
- [ ] ApiService attaches JWT to all requests
- [ ] ApiException thrown on non-200 responses
- [ ] All service classes use AppConfig.apiBaseUrl not hardcoded URL
- [ ] Providers registered correctly
- [ ] flutter analyze passes" "/path/to/sokohuru-mobile"
```

---

# SPRINT 3 — Campaign Flow (Week 3)

> Tasks 3.1–3.10 follow the same format.
> The pattern is established — here are the task definitions:

---

## Task 3.1 — Campaign Discovery Feed (Web)

**File:** `app/dashboard/creator/page.tsx` + `components/campaigns/DiscoveryFeed.tsx`  
**Depends on:** Tasks 1.2, 1.3, 1.5, 1.11  
**Brief:** Server-fetches active campaigns, renders filter pills (All/UGC/Affiliate/etc), search input, sorted campaign cards grid. Filter pills are client component. Cards use CampaignCard component. Fit score shown on each card (call /api/fit-score for each). Pagination: load 12 at a time.

---

## Task 3.2 — Campaign Detail Page (Web)

**File:** `app/dashboard/creator/campaigns/[id]/page.tsx`  
**Depends on:** Task 3.1  
**Brief:** Full campaign detail — hero, brand info, badges, stat grid, about, perks, deliverables, timeline, fit banner, sticky apply bar. Apply button opens modal that calls POST /api/campaigns/[id]/apply (new route needed — inserts campaign_submissions row).

---

## Task 3.3 — Application Flow (Web, Creator)

**File:** `app/dashboard/creator/inbox/page.tsx`  
**Depends on:** Task 3.2  
**Brief:** My Applications screen — stat filter tabs, application cards with status badges, expandable timeline per application. Reads from campaign_submissions + campaigns + contracts joined. Real-time updates via Supabase Realtime subscription on campaign_submissions.

---

## Task 3.4 — Submissions Inbox (Web, Brand)

**File:** `app/dashboard/brand/inbox/page.tsx`  
**Depends on:** Tasks 1.3, 2.3  
**Brief:** Brand's inbox. Campaign selector dropdown. Stat filter tabs (All/Pending/Shortlisted/Approved). Sorted by fit_score desc. Expandable creator cards with 3-tab panel (Fit check / Demographics / Note). Approve/Shortlist/Reject action buttons calling PATCH campaign_submissions.

---

## Task 3.5 — Campaign Creation (Web, Brand, 5 steps)

**File:** `app/dashboard/brand/campaigns/new/[step]/page.tsx`  
**Depends on:** Task 1.13  
**Brief:** 5-step campaign creation. Step 1: basics (name, image, type, platforms, dates, priority). Step 2: brief (about, formats, deliverables — dynamic add/remove, captions, guidelines). Step 3: creator requirements (followers, region, age, formats, engagement). Step 4: budget + perks (flat fee, commission rate, window, add/remove perks). Step 5: review + publish settings. On submit: insert campaigns + campaign_deliverables + campaign_requirements rows. status='draft' until publish toggled to 'active'.

---

## Task 3.6 — Campaign Discovery Screen (Flutter)

**File:** `lib/features/campaigns/screens/discover_screen.dart`  
**Depends on:** Tasks 2.8, 2.9, 2.10  
**Brief:** Flutter equivalent of Task 3.1. Fetches from Supabase directly. FilterPill widget row. CampaignCard widget. Pull-to-refresh. Infinite scroll. Calls ApiService for fit scores. Uses AppColors throughout.

---

## Task 3.7 — Campaign Detail Screen (Flutter)

**File:** `lib/features/campaigns/screens/campaign_detail_screen.dart`  
**Depends on:** Task 3.6  
**Brief:** Flutter equivalent of Task 3.2. Scrollable screen. Hero area. Fit score ring widget. Sticky bottom apply bar. Apply triggers POST to campaign_submissions via Supabase directly (not middleware — simple insert).

---

## Task 3.8 — My Applications Screen (Flutter)

**File:** `lib/features/applications/screens/applications_screen.dart`  
**Depends on:** Task 3.7  
**Brief:** Flutter equivalent of Task 3.3. Stat filter tabs. Application cards. Timeline expansion. Real-time via Supabase stream on campaign_submissions filtered by profile_id.

---

## Task 3.9 — Creator Profile Setup (Flutter)

**File:** `lib/features/profile/screens/profile_setup_screen.dart`  
**Depends on:** Task 2.9  
**Brief:** 5-step profile setup matching our mockup. Step 1: cover + avatar (Supabase Storage upload) + display name + slug + bio + website. Step 2: personal (DOB, location, languages, ethnicity). Step 3: social accounts (platform + username inputs). Step 4: collab preferences (multi-select chips). Step 5: platform availability (toggles per platform). Writes to all relevant Supabase tables on completion.

---

## Task 3.10 — Brand Profile Setup (Flutter)

**File:** `lib/features/brand/screens/brand_profile_setup_screen.dart`  
**Depends on:** Task 2.9  
**Brief:** Flutter equivalent of Task 1.13. 5-step brand profile. Logo + cover upload to Supabase Storage. Industry chips. Collab type chips. Contact details. Settings toggles. Writes to brand_profile + brand_contacts + brand_industry_tags + brand_settings.

---

# SPRINT 4 — Payments + Contracts (Week 4)

> Task definitions follow same format. Key tasks:

**Task 4.1** — Content submission form (web + Flutter) → writes content_submission rows  
**Task 4.2** — Contract signing screen (Flutter) → calls /api/contracts/[id]/sign  
**Task 4.3** — Contract review screen (web, brand) → shows contract terms, approve button  
**Task 4.4** — Payout request screen (web + Flutter) → M-Pesa form, calls /api/payments/mpesa/initiate  
**Task 4.5** — Payment status real-time (web + Flutter) → Supabase Realtime on payouts table  
**Task 4.6** — Commission tracker screen (web + Flutter) → reads affiliate_links  
**Task 4.7** — Notification bell (web) → reads notifications, marks read, real-time badge  
**Task 4.8** — Push notifications setup (Flutter) → FCM integration  

---

# SPRINT 5 — Content Review + Reports (Week 5–6)

**Task 5.1** — Brand content review screen (web + Flutter)  
**Task 5.2** — Post metrics manual entry (brand can enter reach/likes)  
**Task 5.3** — Revision request flow (web + Flutter)  
**Task 5.4** — Campaign report screen (web + Flutter)  
**Task 5.5** — Creator earnings dashboard full (web + Flutter)  
**Task 5.6** — Instagram Basic Display API metrics sync cron  
**Task 5.7** — TikTok API metrics sync cron  

---

# SPRINT 6 — Polish + App Store (Week 7–8)

**Task 6.1** — Sentry error monitoring (web + Flutter)  
**Task 6.2** — Deep links website → app (universal links iOS, app links Android)  
**Task 6.3** — App Store Connect setup + assets  
**Task 6.4** — Google Play Console setup + assets  
**Task 6.5** — Flutter web PWA config (manifest, service worker)  
**Task 6.6** — Lighthouse audit + performance fixes  
**Task 6.7** — Flutter DevTools performance audit  
**Task 6.8** — App Store submission  
**Task 6.9** — Google Play submission  
**Task 6.10** — Launch checklist + smoke test production  

---

## DEPENDENCY MAP

```
sokohuru-web (SEO website):
1.1 → 1.2 → 1.3 → 1.4 → 1.5
                ↓         ↓
              1.6       1.7
                ↓
              1.8 → 1.9 → 1.10 → 1.11
                ↓
              1.12 → 1.13 → 1.14 → 1.15 → 1.16 → 1.17

sokohuru-api (middleware — independent repo, parallel track):
1.18 → 1.19 → 2.1 → 2.2
                     2.3
                     2.4
                     2.5
                     2.6
                     2.7

sokohuru-mobile (Flutter — starts week 2):
2.8 → 2.9 → 2.10
               ↓
3.6 → 3.7 → 3.8 → 3.9 → 3.10
               ↓
4.1 → 4.2 → 4.3 → 4.4 → 4.5 → 4.6 → 4.7 → 4.8
               ↓
5.1 → 5.2 → 5.3 → 5.4 → 5.5 → 5.6 → 5.7
               ↓
6.1 → 6.2 → 6.3 → 6.4 → 6.5 → 6.6 → 6.7 → 6.8 → 6.9 → 6.10

Cross-repo dependency:
sokohuru-api must be deployed (Task 1.18) before
sokohuru-mobile can call api.sokohuru.com (Task 2.10+)
```

---

## COMMIT CONVENTION

```
feat:     new feature
fix:      bug fix
chore:    config, deps, tooling
refactor: code restructure, no behaviour change
test:     adding tests
docs:     documentation only
style:    formatting, no logic change
```

## BRANCH NAMING

```
feature/[task-id]-[kebab-description]
fix/[task-id]-[kebab-description]
chore/[description]
```