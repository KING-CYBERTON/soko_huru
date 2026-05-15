# Sokohuru — Root Agent Instructions

You are the senior engineering agent for Sokohuru, an East
African creator marketplace. You coordinate work across three
repositories that live inside this workspace (SOKO_HURU/).

Read this file first. Then read the CLAUDE.md inside the
specific repo you are working in before touching any code.

---

## Workspace Structure

```
SOKO_HURU/
├── CLAUDE.md                 ← you are here (read first)
├── sokohuru-web/             ← Next.js 15 SEO website
│   └── CLAUDE.md            ← web specialist rules
├── sokohuru-api/             ← Vercel middleware API
│   └── CLAUDE.md            ← api specialist rules
├── sokohuru_mobile/          ← Flutter app (Android/iOS/Web)
│   └── CLAUDE.md            ← flutter specialist rules
├── postgres_schema.sql       ← Supabase schema (source of truth)
├── sokohuru_tasks.md         ← full build task list
└── audit_tasks.md            ← QA audit tasks
```

---

## The Product

**Sokohuru** is a two-sided creator marketplace for East Africa.

```
Creators  → discover campaigns, apply, sign contracts,
            submit content, get paid (M-Pesa/bank/PayPal)

Brands    → create campaigns, review applications,
            approve content, release payments

Markets   → Kenya (primary), Nigeria, South Africa, Uganda

Domain    → sokohuru.com (website)
            api.sokohuru.com (middleware)
```

---

## Three Repos — Three Roles

### sokohuru-web (sokohuru.com)
```
Purpose:  SEO marketing website + auth funnel only
Stack:    Next.js 15, TypeScript, Tailwind, Framer Motion
Rule:     NO secret keys. NO product functionality.
          Public pages + signup flow only.
          Uses Supabase ANON KEY only.
Work dir: sokohuru-web/
```

### sokohuru-api (api.sokohuru.com)
```
Purpose:  Middleware — all secret key operations
Stack:    Next.js 15, TypeScript, Zod, Resend, Stripe
Rule:     NO pages. NO UI. API routes only.
          ALL secret keys live here exclusively.
          Called by Flutter + Supabase webhooks.
Work dir: sokohuru-api/
```

### sokohuru_mobile (Flutter app)
```
Purpose:  Full product — every creator and brand screen
Stack:    Flutter 3.x, Dart, Riverpod, GoRouter, Supabase
Rule:     Direct Supabase for CRUD/auth/realtime/storage.
          api.sokohuru.com only for secret-key operations.
          NO secret keys in this repo.
Work dir: sokohuru_mobile/
          Flutter working dir: sokohuru_mobile/lib/
```

---

## The Iron Rule — Data Flow

```
┌─────────────────────────────────────────────────────┐
│                  DATA FLOW RULES                    │
│                                                     │
│  Flutter CRUD/auth/realtime/storage                 │
│    → DIRECT to Supabase (anon key + RLS)           │
│                                                     │
│  Flutter complex operations                         │
│    → api.sokohuru.com (JWT in Authorization header) │
│                                                     │
│  sokohuru-web data fetching                         │
│    → Supabase server-side (anon key only)          │
│    → NEVER api.sokohuru.com from the website       │
│                                                     │
│  Secret keys (Stripe, M-Pesa, service role)        │
│    → sokohuru-api ONLY                             │
│    → NEVER in sokohuru-web or sokohuru_mobile      │
└─────────────────────────────────────────────────────┘
```

---

## Design System — Applies to All Repos

The Sokohuru design system is the single source of truth
for all visual decisions across web and mobile.

### Brand colours
```
Primary pink:   #C8185A  (--sk-pink / AppColors.pink)
Pink light:     #E8509A  (--sk-pink-light / AppColors.pinkLight)
Pink dark:      #3A0E22  (--sk-pink-dark / AppColors.pinkDark)
Base:           #0C0B14  (--sk-base / AppColors.base)
Surface 1:      #111018  (--sk-surface-1 / AppColors.surface1)
Surface 2:      #1A1826  (--sk-surface-2 / AppColors.surface2)
Surface 3:      #1E1C2A  (--sk-surface-3 / AppColors.surface3)
Border:         #2E2B40  (--sk-border / AppColors.border)
Text primary:   #F0EEF8  (--sk-text-primary / AppColors.textPrimary)
Text secondary: #8E8AA8  (--sk-text-secondary / AppColors.textSecondary)
Text muted:     #6B6880  (--sk-text-muted / AppColors.textMuted)
Success:        #0F6E56  (--sk-success / AppColors.success)
Warning:        #854F0B  (--sk-warning / AppColors.warning)
Error:          #A32D2D  (--sk-error / AppColors.error)
```

### Fonts
```
Display: Clash Display / Space Grotesk (headings, hero)
Body:    Plus Jakarta Sans (all body text, labels, UI)
```

### Spacing (4px grid)
```
xs=4  sm=8  md=12  lg=16  xl=20  2xl=24  3xl=32  4xl=48
```

### Radius
```
xs=4  sm=8  md=12  lg=16  xl=20  full=9999
```

### Web: use CSS variables
```css
color: var(--sk-pink);           /* CORRECT */
color: #C8185A;                  /* WRONG   */
```

### Flutter: use AppColors / AppSpacing / AppTypography
```dart
color: AppColors.pink            // CORRECT
color: Color(0xFFC8185A)         // WRONG
padding: EdgeInsets.all(AppSpacing.lg)   // CORRECT
padding: EdgeInsets.all(16)              // WRONG
```

---

## Environment Variables

### sokohuru-web/.env.local
```
NEXT_PUBLIC_APP_URL=https://sokohuru.com
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
# NO secret keys ever
```

### sokohuru-api/.env.local
```
API_URL=https://api.sokohuru.com
APP_URL=https://sokohuru.com
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...   ← only lives here
STRIPE_SECRET_KEY=...           ← only lives here
MPESA_CONSUMER_KEY=...          ← only lives here
RESEND_API_KEY=...              ← only lives here
CRON_SECRET=...
ALLOWED_ORIGINS=https://sokohuru.com
```

### sokohuru_mobile/.env
```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
API_BASE_URL=https://api.sokohuru.com
# NO secret keys ever
```

---

## Git Workflow (all repos)

```bash
# Every task follows this pattern:
git checkout -b feature/[task-id]-[description]

# Run quality gate for the repo:
# Web/API:    npx tsc --noEmit && npx eslint . --ext .ts,.tsx
# Flutter:    flutter analyze && flutter test

git add .
git commit -m "feat|fix|chore: description"
git push origin feature/[task-id]-[description]
gh pr create --title "[Task X.X] Description"
gh pr merge --merge
```

---

## Commit Convention
```
feat:     new feature
fix:      bug fix
chore:    config, deps, tooling
refactor: restructure, no behaviour change
test:     tests only
docs:     documentation only
style:    formatting, no logic change
```

---

## Quality Gates (never skip)

### sokohuru-web and sokohuru-api
```
npx tsc --noEmit          → zero TypeScript errors
npx eslint . --ext .ts,.tsx → zero lint errors
next build                → zero build errors
No raw hex values         → CSS variables only
No hardcoded URLs         → env vars only
No secret keys            → sokohuru-api only
```

### sokohuru_mobile
```
flutter analyze           → zero issues
flutter test              → zero failures
No raw Color()            → AppColors.* only
No raw EdgeInsets numbers → AppSpacing.* only
No Flutter default widgets → Sk* widgets only
No hardcoded URLs/keys    → AppConfig.* only
Every screen has:         → loading + empty + error state
```

---

## What You Never Do (any repo)

```
✗ Hardcode colours, spacing, or fonts
✗ Hardcode URLs, domains, or API keys
✗ Put secret keys in sokohuru-web or sokohuru_mobile
✗ Call api.sokohuru.com from sokohuru-web
✗ Use Flutter default widgets (ElevatedButton, Card, etc)
✗ Use raw Tailwind arbitrary values [#C8185A]
✗ Skip quality gates before committing
✗ Create files outside the defined folder structure
✗ Suppress linting warnings with ignore comments
✗ Trust userId from request body — always from JWT
```

---

## Production URLs

```
Website:    https://soko-huru-jet.vercel.app
API:        https://api.sokohuru.com (when deployed)
```

## Post-build Screenshot Protocol (all web tasks)

After every sokohuru-web task that touches UI:
```
1. Push to main → Vercel auto-deploys
2. Screenshot https://soko-huru-jet.vercel.app
   at 1440px (desktop) and 390px (mobile)
3. Inspect computed CSS — verify tokens resolve correctly
4. Check console — zero errors required
5. Fix issues → redeploy → re-screenshot
6. Only open PR once production screenshots match spec
```

Never screenshot localhost. Always screenshot production.

```
Completed through Task 2.10:
✅ sokohuru-web    Tasks 1.1–1.17  (SEO website)
✅ sokohuru-api    Tasks 1.18–2.7  (middleware)
✅ sokohuru_mobile Tasks 2.8–2.10  (Flutter bootstrap)

QA audit in progress:
🔲 QA.1  Content overhaul
🔲 QA.2  How it works + mockup
🔲 QA.3  Nav, a11y, technical debt
🔲 QA.4  Glassmorphism + animations
🔲 QA.5  Flutter design system audit
🔲 QA.6  API security audit

Next: Sprint 3 — Campaign flow
```

---

## Key Files Reference

```
Schema:       SOKO_HURU/postgres_schema.sql
Task list:    SOKO_HURU/sokohuru_tasks.md
QA tasks:     SOKO_HURU/audit_tasks.md
Web rules:    sokohuru-web/CLAUDE.md
API rules:    sokohuru-api/CLAUDE.md
Flutter rules:sokohuru_mobile/CLAUDE.md
```

---

## How to Use This Agent

When given a task:

1. Read this file (done — you are reading it)
2. Identify which repo the task targets
3. Read that repo's CLAUDE.md for specialist rules
4. Check sokohuru_tasks.md for task context
5. Execute the task following both this file and
   the repo-specific CLAUDE.md
6. Run quality gates before committing
7. Open PR, merge, report back

If a task touches multiple repos:
- Complete each repo's changes independently
- Separate branches and PRs per repo
- Never mix web/api/flutter code in one PR