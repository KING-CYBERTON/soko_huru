# Sokohuru Web — Quality Audit Tasks
> Run these before Sprint 3. All target sokohuru-web.

## Screenshot Protocol (applies to QA.1, QA.2, QA.3, QA.4)

After every task that changes UI:
```
Production URL: https://soko-huru-jet.vercel.app
1. Push to main → wait for Vercel deploy
2. Screenshot desktop: viewport 1440×900
3. Screenshot mobile:  viewport 390×844
4. Save screenshots to SOKO_HURU/screenshots/QA1-desktop.png
   and SOKO_HURU/screenshots/QA1-mobile.png
5. Check computed styles via DevTools
6. Check browser console — zero errors
7. Fix → redeploy → re-screenshot if needed
```
Never use localhost. Always use production URL.

--- — Content & Copy Overhaul

**Priority:** P1 · **Estimate:** M · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Update all landing page copy to be creator marketplace-specific.
Replace all placeholder content with Sokohuru-accurate messaging.

Rules:
- Branch from main as fix/content-copy-overhaul
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'fix: replace placeholder content with
  sokohuru-specific copy'
- Push branch, open PR, merge to main
- Report: every file changed, PR link

Project context:
sokohuru-web is the marketing website for Sokohuru, an East African
creator marketplace. The current site has generic SaaS copy
('Smart solutions. Real impact.', 'We empower businesses with
modern technology') that doesn't communicate the creator marketplace
value proposition. All placeholder brand names, stats, and
testimonials need replacing.

Task:

1. Update components/sections/Hero.tsx:
   Eyebrow: 'THE EAST AFRICAN CREATOR MARKETPLACE'
   H1 line 1: 'Connect brands with'
   H1 line 2: 'the right creators.'
   H1 accent word: 'creators.' in var(--sk-pink)
   Subtext: 'Authentic campaigns, real results. Brands find
   verified East African creators. Creators earn real income
   from partnerships they believe in.'
   Primary CTA: 'Start for free →' → href='/auth/signup'
   Secondary CTA: 'See how it works' → scrolls to #how-it-works
   Trust line: '🛡️ No subscription required · Pay per campaign'
   Replace emoji shield with lucide-react ShieldCheck icon

2. Update components/sections/TrustedBy.tsx:
   Left label: 'TRUSTED BY BRANDS ACROSS EAST AFRICA'
   Replace fake brand names with:
   ['Jumia', 'Safaricom', 'KCB Group', 'Nation Media',
    'Equity Bank', 'Uber Eats Kenya']
   Add note in code: // Replace with real logos when available

3. Update components/sections/Features.tsx:
   Eyebrow: 'BUILT FOR EAST AFRICA'
   H2: 'Everything you need to run creator campaigns'
   Subtext: 'From discovery to payment — Sokohuru handles
   the entire creator campaign lifecycle in one platform.'
   
   Card 1: 
   Icon: Users (lucide-react)
   Title: 'Verified creator network'
   Desc: 'Browse thousands of verified creators across Kenya,
   Nigeria, South Africa, and Uganda. Filter by platform,
   audience, engagement rate, and content format.'
   
   Card 2:
   Icon: Shield (lucide-react)  
   Title: 'Contracts & compliance'
   Desc: 'Every collaboration covered by a digital contract.
   Deliverables, timelines, usage rights, and exclusivity
   terms — all handled automatically.'
   
   Card 3:
   Icon: BarChart3 (lucide-react)
   Title: 'Real-time campaign tracking'
   Desc: 'Track reach, engagement, clicks, and sales as
   they happen. Know your ROI before the campaign ends.'
   
   Card 4:
   Icon: Wallet (lucide-react)
   Title: 'Instant creator payouts'
   Desc: 'Creators paid via M-Pesa, bank transfer, or PayPal
   within 14 days of content approval. No invoice chasing.'
   
   Replace all emoji icons (⚡🔒📊🔗) with lucide-react imports.
   Import individually: import { Users } from 'lucide-react'

4. Update components/sections/Stats.tsx:
   Eyebrow: 'PERFORMANCE THAT MATTERS'
   H2: 'Built to deliver results that scale.'
   Subtext: 'Trusted by brands running campaigns across
   East Africa, from Nairobi to Lagos to Cape Town.'
   
   Stats:
   '10K+' → 'Verified creators'
   '500+' → 'Brand campaigns run'
   '120+' → label: 'Countries reached'  
   '99.99%' → 'Platform uptime'
   
   Add disclaimer below stats:
   '* Stats represent platform targets for Year 1'
   font-size 11px, var(--sk-text-muted), text-center
   (honest — do not claim these as current real numbers)

5. Update components/sections/Testimonial.tsx:
   Replace with a placeholder that's honest:
   
   Option: Show a 'Coming soon' version that's still designed well:
   - Keep the quote mark design
   - Quote: 'We launched our first Sokohuru campaign and
     had 12 verified creators apply within 48 hours.
     The platform made the whole process effortless.'
   - Attribution: 'Early access brand partner · Nairobi, Kenya'
   - No name, no company — honest about early stage
   - Add note in code: // Replace with real testimonial
     when first brand completes a campaign

6. Update components/sections/SplitCTA.tsx:
   Left panel (Creators):
   Eyebrow: 'FOR CREATORS'
   H2: 'Get discovered. Get paid.'
   Body: 'Join thousands of creators earning from brand
   partnerships. UGC, affiliate, ambassador deals —
   you negotiate, we handle the rest.'
   CTA: 'Start creating →'
   
   Right panel (Brands):
   Eyebrow: 'FOR BRANDS'
   H2: 'Find creators. Drive results.'
   Body: 'Access a curated pool of verified East African
   creators. Launch a campaign in minutes, track ROI
   in real time, pay only when content is approved.'
   CTA: 'Post a campaign →'

7. Update components/sections/CTABanner.tsx:
   H2: 'Ready to launch your first campaign?'
   Subtext: 'Join brands and creators already growing
   with Sokohuru. No subscription required.'
   CTA: 'Get started free →'

8. Update app/layout.tsx — default metadata:
   title: 'Sokohuru — Creator Marketplace for East Africa'
   description: 'Connect with verified East African creators.
   Launch UGC, affiliate, and ambassador campaigns in minutes.
   Trusted by brands across Kenya, Nigeria, and South Africa.'
   keywords include: creator marketplace, influencer marketing
   Kenya, UGC campaigns Africa, brand deals East Africa

9. Update app/page.tsx — page-level metadata:
   title: 'Sokohuru — Where Brands Meet Creators'
   description: same as above with slight variation

Acceptance criteria:
- [ ] Zero mentions of 'Smart solutions' or 'Real impact'
- [ ] Zero mentions of 'We empower businesses with modern technology'
- [ ] Zero fake brand names (Vertex, Nexora, Pocket, etc)
- [ ] All emoji icons replaced with lucide-react SVG icons
- [ ] Stats disclaimer added
- [ ] Metadata updated — no Next.js defaults
- [ ] npx tsc --noEmit passes
- [ ] Production screenshot at 1440px shows updated copy
- [ ] Production screenshot at 390px shows correct mobile layout
- [ ] Zero browser console errors on production URL

DO NOT:
- Do not claim real user numbers as fact without disclaimer
- Do not use emoji as icons — use lucide-react only
- Do not remove sections — update copy in place
- Do not change any design tokens or styling" "/path/to/sokohuru-web"
```

---

## Task QA.2 — How It Works + Dashboard Mockup

**Priority:** P1 · **Estimate:** M · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Add a 'How it works' section and replace the generic dashboard
mockup in the hero with a creator marketplace-specific mockup.

Rules:
- Branch from main as feature/how-it-works-section
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: how it works section and
  updated hero mockup'
- Push branch, open PR, merge to main
- Report: PR link

Task:

1. Create components/sections/HowItWorks.tsx:

   id='how-it-works' (scroll target from hero secondary CTA)
   Background: var(--sk-surface-1)
   Padding: 80px (desktop), 48px 20px (mobile)
   
   Eyebrow: 'HOW IT WORKS'
   H2: 'From discovery to payment in four steps'
   
   Two tabs: 'For Creators' | 'For Brands'
   Active tab: border-bottom var(--sk-pink), text var(--sk-pink)
   Inactive: text var(--sk-text-muted)
   
   Creator steps (shown when 'For Creators' active):
   
   Step 1: Create your profile
   Icon: User (lucide-react)
   Desc: 'Sign up, connect your social accounts, and set
   your content preferences. Takes under 5 minutes.'
   
   Step 2: Discover campaigns
   Icon: Search (lucide-react)
   Desc: 'Browse live campaigns from verified brands.
   Your fit score tells you how well you match before
   you even apply.'
   
   Step 3: Apply & get selected
   Icon: CheckCircle (lucide-react)
   Desc: 'Submit your application with a personal pitch.
   Brands review your profile and approve their shortlist.'
   
   Step 4: Create, submit & get paid
   Icon: Wallet (lucide-react)
   Desc: 'Create your content, submit the post link,
   and receive payment within 14 days of approval
   via M-Pesa, bank, or PayPal.'

   Brand steps (shown when 'For Brands' active):
   
   Step 1: Create your campaign
   Icon: Plus (lucide-react)
   Desc: 'Set your brief, budget, deliverables, and
   creator requirements. Campaign goes live in minutes.'
   
   Step 2: Receive applications
   Icon: Inbox (lucide-react)
   Desc: 'Creators matching your requirements apply.
   Each profile includes audience demographics,
   engagement rates, and past brand work.'
   
   Step 3: Approve your creators
   Icon: Users (lucide-react)
   Desc: 'Review profiles, shortlist candidates,
   and approve your final selection. Digital contracts
   issued automatically.'
   
   Step 4: Review content & pay
   Icon: CreditCard (lucide-react)
   Desc: 'Content submitted for your review. Approve
   posts you love and release payment. Track ROI
   in real time.'

   Layout desktop: 4 steps in a row connected by arrow
   Layout mobile: vertical list, no arrow connector

   Use tab state with useState — client component
   'use client' at top of file

2. Update components/sections/Hero.tsx dashboard mockup:
   
   Replace generic sidebar items and chart with
   creator marketplace-specific content:
   
   Sidebar items (left panel of mockup):
   - Overview (active — pink background)
   - Campaigns
   - Creators
   - Inbox (with notification dot)
   - Payouts
   - Settings
   
   Main panel (right side of mockup):
   
   Row 1 — Campaign stats:
   'Active Campaigns' label + '3' value
   'Applications received' label + '47' value
   
   Row 2 — Mini campaign card:
   Campaign: 'Back to school haul'
   Brand: Zara Kenya
   Status badge: 'Active' (green)
   Creators: '5 approved'
   
   Row 3 — Creator payout row:
   'Maya R.' · 'Content approved' · '$800' in pink
   'Zoe N.'  · 'Under review'    · '$160' muted
   
   Row 4 — Stat chips:
   '284K' Reach · '4.7%' Engagement · '3.2×' ROI
   
   Keep all existing glassmorphism card styling.
   Keep existing floating animation.
   This is a CSS mockup — no real data, no API calls.

3. Add HowItWorks to app/page.tsx:
   Insert between TrustedBy and Features sections.
   
   Updated section order:
   Hero → TrustedBy → HowItWorks → Features →
   Stats → Testimonial → SplitCTA → CTABanner

Acceptance criteria:
- [ ] HowItWorks section renders with two tabs
- [ ] Tab switching works (useState)
- [ ] All 4 steps render for each tab
- [ ] Scroll from hero 'See how it works' CTA reaches section
- [ ] Dashboard mockup shows campaign data not generic SaaS
- [ ] Mobile layout stacks correctly
- [ ] npx tsc --noEmit passes

DO NOT:
- Do not fetch real data in the mockup
- Do not use emoji icons — lucide-react only
- Do not add animations to the tab switch yet" "/path/to/sokohuru-web"
```

---

## Task QA.3 — Navigation, Accessibility & Technical Debt

**Priority:** P1 · **Estimate:** M · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Fix navigation dead links, accessibility issues, metadata,
and technical debt identified in the UI audit.

Rules:
- Branch from main as fix/accessibility-technical-debt
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'fix: navigation, accessibility,
  and technical debt'
- Push branch, open PR, merge to main
- Report: every fix applied, PR link

Task:

1. Fix navigation dead links in components/layout/Nav.tsx:
   
   Replace NAV_LINKS with only implemented pages:
   const NAV_LINKS = [
     { label: 'For Creators', href: '/for-creators' },
     { label: 'For Brands',   href: '/for-brands' },
     { label: 'Campaigns',    href: '/campaigns' },
     { label: 'Pricing',      href: '#pricing' },
   ]
   
   Note: #pricing scrolls to a pricing preview section
   we will add in QA.4. For now point to '#' with a
   comment: // TODO: implement /pricing page in Sprint 3

   Add 'For Creators' and 'For Brands' as distinct entry
   points — creators and brands have different nav journeys.

2. Fix footer dead links in components/layout/Footer.tsx:
   
   Only include links that have pages:
   Products: Campaigns (/campaigns), Pricing (#pricing)
   Solutions: For Creators (/for-creators),
              For Brands (/for-brands)
   Company: About (/about — create stub),
            Contact (/contact — create stub)
   Resources: Blog (/blog — create stub)
   
   Create stub pages for About, Contact, Blog:
   app/about/page.tsx — 'Coming soon' page
   app/contact/page.tsx — Simple contact form stub
   app/blog/page.tsx — 'Coming soon' page
   
   Each stub: proper metadata + centered message +
   link back to homepage. Styled with Sokohuru tokens.
   No broken pages.

   Add App Store and Google Play placeholder buttons
   in footer (href='#' for now — native app not yet live):
   import { Smartphone } from 'lucide-react'
   Two buttons: 'App Store' + 'Google Play'
   variant secondary, small size

3. Fix accessibility issues:
   
   a. Add skip navigation link to app/layout.tsx:
      First element inside <body>:
      <a href='#main-content'
         className='sr-only focus:not-sr-only focus:fixed
                    focus:top-4 focus:left-4 focus:z-50
                    focus:px-4 focus:py-2 focus:bg-sk-pink
                    focus:text-white focus:rounded-sk-md'>
        Skip to main content
      </a>
      Add id='main-content' to the <main> element.
   
   b. Add aria-label to all icon-only buttons:
      Nav hamburger: aria-label='Open menu'
      Nav close: aria-label='Close menu'
      Notification bell (if present): aria-label='Notifications'
   
   c. Add role='img' and aria-label to dashboard mockup:
      <div role='img' aria-label='Sokohuru dashboard showing
      campaign overview with 3 active campaigns and creator
      analytics'>
   
   d. Add prefers-reduced-motion to all animations:
      In globals.css add:
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
   
   e. Add alt text pattern for all next/image usage:
      Every <Image> must have descriptive alt prop.
      Never use alt='' except for purely decorative images.

4. Fix metadata — update app/layout.tsx:
   
   Verify these are NOT the Next.js defaults:
   - title.default: 'Sokohuru — Creator Marketplace for East Africa'
   - title.template: '%s | Sokohuru'
   - description: creator marketplace specific
   - openGraph.siteName: 'Sokohuru'
   - openGraph.locale: 'en_KE'
   - twitter.site: '@sokohuru'
   - robots: index + follow
   
   Add canonical URL:
   alternates: { canonical: process.env.NEXT_PUBLIC_APP_URL }

5. Fix font consistency:
   
   Search all component files for any usage of:
   fontFamily: 'Inter, sans-serif'
   font-family: Inter
   
   Replace ALL with CSS variables:
   fontFamily: var(--sk-font-body)     (Plus Jakarta Sans)
   fontFamily: var(--sk-font-display)  (Clash Display)
   
   Or Tailwind classes:
   className='font-body'   (body text)
   className='font-display' (headings)

6. Fix stats grid mobile layout:
   
   In components/sections/Stats.tsx stats grid:
   Current: grid-cols-2 on all sizes (too cramped on mobile)
   Fix:     grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
   
   Each stat needs more vertical breathing room on mobile.

7. Add pricing preview section to app/page.tsx:
   
   id='pricing' (nav anchor target)
   
   Create components/sections/PricingPreview.tsx:
   Background: var(--sk-base)
   Eyebrow: 'SIMPLE PRICING'
   H2: 'No subscription required'
   Subtext: 'Pay per campaign. Scale as you grow.'
   
   3 cards side by side (desktop), stacked (mobile):
   
   Card 1 — Starter (for brands):
   Price: 'Free to post'
   Subtitle: 'Pay per campaign'
   Features:
   - Post unlimited campaigns
   - Pay creators on approval
   - Basic analytics
   - Email support
   CTA: 'Post a campaign →' variant=primary
   
   Card 2 — Growth (highlighted — recommended):
   Badge: 'Most popular'
   Price: '$99/mo'
   Subtitle: 'For growing brands'
   Features:
   - Everything in Starter
   - Priority creator matching
   - Advanced analytics & ROI
   - Dedicated account manager
   - Custom campaign briefs
   CTA: 'Start free trial →' variant=primary
   Pink border highlight
   
   Card 3 — Enterprise:
   Price: 'Custom'
   Subtitle: 'For large brands'
   Features:
   - Everything in Growth
   - Multi-market campaigns
   - White-label reporting
   - SLA guarantee
   - API access
   CTA: 'Contact us →' variant=secondary

   Add pricing note below cards:
   'Creator accounts are always free. Brands pay only when
   content is approved — no upfront costs.'
   font-size 13px, var(--sk-text-muted), centered

   Add PricingPreview to app/page.tsx between
   Testimonial and SplitCTA.

Acceptance criteria:
- [ ] Nav has no dead links
- [ ] Footer has no dead links
- [ ] Stub pages exist for About, Contact, Blog
- [ ] Skip navigation link works with keyboard Tab
- [ ] All icon-only buttons have aria-label
- [ ] Dashboard mockup has role=img and aria-label
- [ ] prefers-reduced-motion CSS added to globals.css
- [ ] No 'Inter, sans-serif' in any component file
- [ ] Stats grid is 1-col on mobile
- [ ] Pricing section renders with 3 cards
- [ ] Pricing anchor works from nav
- [ ] Page metadata is Sokohuru-specific (not Next.js defaults)
- [ ] npx tsc --noEmit passes

DO NOT:
- Do not implement full pricing page — stub only
- Do not add real payment flows to pricing cards
- Do not use emoji in any new content" "/path/to/sokohuru-web"
```

---

## Task QA.4 — Glassmorphism Hero Refactor + Animations

**Priority:** P1 · **Estimate:** L · **Target:** sokohuru-web

```
Kim here. Run this command and return the full output:

"Refactor the hero section with glassmorphism, mesh gradient
background, Framer Motion animations, and a single focused CTA.
This is the most visible improvement on the site.

Rules:
- Branch from main as feature/hero-glassmorphism-animations
- npm install framer-motion (if not already installed)
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'feat: hero glassmorphism and
  framer motion animations'
- Push branch, open PR, merge to main
- Report: PR link, Lighthouse score before/after

Task:

1. Update app/globals.css — add mesh gradient and glass:

   .hero-mesh-bg {
     background:
       radial-gradient(ellipse at 15% 50%,
         rgba(200,24,90,0.18) 0%, transparent 60%),
       radial-gradient(ellipse at 85% 15%,
         rgba(83,74,183,0.14) 0%, transparent 55%),
       radial-gradient(ellipse at 60% 85%,
         rgba(15,110,86,0.10) 0%, transparent 50%),
       var(--sk-base);
   }

   .glass-card {
     background: rgba(255,255,255,0.04);
     backdrop-filter: blur(12px);
     -webkit-backdrop-filter: blur(12px);
     border: 1px solid rgba(255,255,255,0.08);
     box-shadow:
       0 8px 32px rgba(0,0,0,0.3),
       inset 0 1px 0 rgba(255,255,255,0.06);
     border-radius: var(--sk-radius-xl);
   }

   .glass-nav {
     background: rgba(17,16,24,0.85);
     backdrop-filter: blur(20px);
     -webkit-backdrop-filter: blur(20px);
     border-bottom: 0.5px solid rgba(46,43,64,0.8);
   }

   .grain-overlay::after {
     content: '';
     position: absolute;
     inset: 0;
     background-image: url("data:image/svg+xml,%3Csvg
       viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E
       %3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise'
       baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E
       %3C/filter%3E%3Crect width='100%25' height='100%25'
       filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
     pointer-events: none;
     z-index: 1;
   }

2. Install Framer Motion:
   npm install framer-motion
   
3. Update components/sections/Hero.tsx:
   Add 'use client' at top
   
   Import from framer-motion:
   import { motion, useInView, useAnimation } from 'framer-motion'

   Apply mesh gradient to hero section:
   <section className='hero-mesh-bg grain-overlay relative'>

   Apply glass-card to dashboard mockup wrapper:
   <div className='glass-card relative'>

   Apply glass-nav class to Nav when scrolled
   (add scroll listener in Nav.tsx — apply glass-nav
   class when window.scrollY > 20, remove when 0)

   Animation variants:
   const fadeUp = {
     hidden:  { opacity: 0, y: 32 },
     visible: { opacity: 1, y: 0,
       transition: { duration: 0.6, ease: [0.22,1,0.36,1] }}
   }
   const staggerContainer = {
     hidden:  {},
     visible: { transition: { staggerChildren: 0.12 }}
   }
   const floatAnim = {
     animate: {
       y: [0, -14, 0],
       transition: { duration: 5, repeat: Infinity,
                     ease: 'easeInOut' }
     }
   }

   Wrap left column in:
   <motion.div variants={staggerContainer}
     initial='hidden' animate='visible'>
     <motion.p variants={fadeUp}>{eyebrow}</motion.p>
     <motion.h1 variants={fadeUp}>{headline}</motion.h1>
     <motion.p variants={fadeUp}>{subtext}</motion.p>
     <motion.div variants={fadeUp}>{buttons}</motion.div>
     <motion.p variants={fadeUp}>{trustLine}</motion.p>
   </motion.div>

   Wrap right column (dashboard mockup) in:
   <motion.div
     initial={{ opacity: 0, x: 40 }}
     animate={{ opacity: 1, x: 0 }}
     transition={{ duration: 0.8, delay: 0.3,
                   ease: [0.22,1,0.36,1] }}>
     <motion.div animate='animate' variants={floatAnim}>
       {dashboardMockup}
     </motion.div>
   </motion.div>

4. Add scroll animations to all other sections:
   
   Wrap each section's heading + content in:
   <motion.div
     initial={{ opacity: 0, y: 24 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true, margin: '-80px' }}
     transition={{ duration: 0.5, ease: 'easeOut' }}>

   Apply to: Features cards, Stats numbers,
   Testimonial, HowItWorks steps

5. Add count-up animation to Stats numbers:
   
   Create components/ui/CountUp.tsx:
   'use client'
   Uses useInView + useEffect to count from 0 to target
   when element enters viewport.
   Duration: 1800ms, easing: easeOut
   Format: add '+' or '%' suffix from props
   
   Usage:
   <CountUp target={10} suffix='K+' />
   <CountUp target={99.99} suffix='%' decimals={2} />

6. Add hover effects to feature cards:
   <motion.div
     whileHover={{ scale: 1.02, y: -4 }}
     transition={{ duration: 0.2 }}>
   
   And on card border — animate to pink on hover:
   whileHover changes border to rgba(200,24,90,0.3)

7. Single CTA update:
   Hero primary: 'Get started free →' (pink, large)
   Hero secondary: 'See how it works' (ghost, with
   ChevronDown icon, onClick scrolls to #how-it-works)
   Remove 'Explore Solutions' button entirely.

8. Verify Lighthouse after animations:
   next build && npx lighthouse http://localhost:3000
   --output json --only-categories performance
   Performance score must stay above 80.
   If below 80: add loading='lazy' to non-critical
   animations, wrap Framer Motion in dynamic import.

Acceptance criteria:
- [ ] Mesh gradient visible in hero background
- [ ] Glass card effect on dashboard mockup
- [ ] Nav applies glass-nav class on scroll
- [ ] Hero text animates in on page load (stagger)
- [ ] Dashboard mockup fades + slides in from right
- [ ] Dashboard mockup floats continuously
- [ ] All sections animate in on scroll (once)
- [ ] Stats count up when scrolled into view
- [ ] Feature cards scale on hover
- [ ] Single primary CTA in hero
- [ ] prefers-reduced-motion respected
- [ ] Lighthouse performance > 80
- [ ] npx tsc --noEmit passes

DO NOT:
- Do not animate on every scroll tick — use whileInView once:true
- Do not use animation duration > 800ms
- Do not forget prefers-reduced-motion
- Do not import all of framer-motion — named imports only" "/path/to/sokohuru-web"
```

---

## Task QA.5 — Flutter Code Quality Audit

**Priority:** P1 · **Estimate:** M · **Target:** sokohuru-mobile

```
Kim here. Run this command and return the full output:

"Run a comprehensive code quality audit on sokohuru-mobile
and fix all violations of the Sokohuru design system.

Rules:
- Branch from main as fix/flutter-design-system-audit
- flutter analyze must pass with zero issues before commit
- flutter test must pass before commit
- git add, git commit -m 'fix: flutter design system
  audit and consistency fixes'
- Push branch, open PR, merge to main
- Report: every violation found, every fix applied, PR link

Task:

1. Run design token audit:
   Search all .dart files in lib/ for:
   - Color(0x...) → replace with AppColors.*
   - Colors.grey, Colors.white, Colors.black → AppColors.*
   - EdgeInsets.all([0-9]) → replace with AppSpacing.*
   - SizedBox(height: [0-9]) → replace with AppSpacing.*
   - BorderRadius.circular([0-9]) → replace with AppRadius.*
   - TextStyle(fontSize: ...) → replace with AppTypography.*
   
   Report every file and line where violations found.
   Fix every violation.

2. Run widget audit:
   Search all .dart files for:
   - ElevatedButton( → replace with SkButton(
   - TextButton( → replace with SkButton.ghost(
   - OutlinedButton( → replace with SkButton.secondary(
   - Card( → replace with SkCard(
   - TextField( → replace with SkInput(
   - TextFormField( → replace with SkInput(
   - CircleAvatar( → replace with SkAvatar(
   - Chip( → replace with SkChip(
   - FilterChip( → replace with SkChip(
   - Switch( → replace with SkToggle(
   - Scaffold( → replace with SkScaffold(
   
   Report every violation, fix every one.

3. Run hardcoded string audit:
   Search for any hardcoded URLs:
   - 'https://sokohuru' → replace with AppConfig.*
   - 'https://api.sokohuru' → replace with AppConfig.apiBaseUrl
   - 'supabase.co' → replace with AppConfig.supabaseUrl
   
   Search for any hardcoded credentials:
   - any string starting with 'eyJ' (JWT token)
   - any string containing 'key' or 'secret'
   Report if found — these are critical security issues.

4. Run flutter analyze:
   flutter analyze --no-fatal-infos
   Fix every warning and error.
   Do not suppress warnings with // ignore: — fix them.

5. Run flutter test:
   flutter test
   If tests fail, fix the failures.
   If no tests exist, create basic widget tests for:
   - SkButton renders correctly
   - SkInput shows error state
   - SkBadge renders correct variant colour

6. Check for missing states:
   Open each screen file in lib/features/
   Verify each screen has:
   - Loading state (Shimmer or CircularProgressIndicator)
   - Empty state (placeholder + message)
   - Error state (error message + retry button)
   
   Add missing states where absent.
   Report which screens were missing which states.

7. Check AppConfig usage:
   Verify lib/core/config/app_config.dart exists.
   Verify all API calls use AppConfig.apiBaseUrl.
   Verify no .env values are hardcoded anywhere.

Acceptance criteria:
- [ ] flutter analyze passes with zero issues
- [ ] flutter test passes with zero failures
- [ ] Zero raw Color() values in any file
- [ ] Zero raw padding numbers in any file
- [ ] Zero Flutter default widgets in any screen
- [ ] Zero hardcoded URLs or credentials
- [ ] Every screen has loading + empty + error state
- [ ] AppConfig used for all env values

DO NOT:
- Do not use // ignore: to suppress warnings
- Do not skip fixing any violation — fix all of them
- Do not add new features in this task — audit only" "/path/to/sokohuru-mobile"
```

---

## Task QA.6 — API Security Audit

**Priority:** P1 · **Estimate:** S · **Target:** sokohuru-api

```
Kim here. Run this command and return the full output:

"Run a security audit on sokohuru-api and fix all
authentication, validation, and CORS issues.

Rules:
- Branch from main as fix/api-security-audit
- npx tsc --noEmit must pass before commit
- npx eslint . --ext .ts,.tsx must pass before commit
- git add, git commit -m 'fix: api security audit fixes'
- Push branch, open PR, merge to main
- Report: every issue found, every fix applied, PR link

Task:

1. Verify every route uses correct middleware:
   List all files in app/api/
   For each route file verify:
   - Protected routes use withAuth (check JWT present)
   - Webhook routes use withWebhook (check signature)
   - Cron routes use withCron (check secret)
   - Public routes (health, track/[slug]) have CORS headers
   
   Fix any route missing its middleware wrapper.

2. Verify Zod validation on every POST/PATCH route:
   Every route that accepts a body must have:
   const schema = z.object({...})
   const body = schema.parse(await req.json())
   
   This must be INSIDE the withAuth handler, AFTER auth.
   Fix any route missing Zod validation.

3. Verify userId always from JWT, never from body:
   Search for req.json() results being used as userId.
   The pattern should ALWAYS be:
   withAuth(async (req, { userId }) => {
     // userId comes from JWT — verified
     const body = schema.parse(await req.json())
     // body.userId should NEVER be used as the real userId
   })
   
   Fix any route using body userId instead of JWT userId.

4. Verify CORS on all routes:
   Every route response must include corsHeaders.
   Every route must handle OPTIONS preflight returning 204.
   
   Check ALLOWED_ORIGINS is read from config, not hardcoded.

5. Check for secret leaks in responses:
   Search all route files for any response that returns:
   - process.env values
   - config.* values
   - supabaseAdmin credentials
   - Full error objects (error.message, error.stack)
   
   Fix any that expose internals.

6. Verify GET /api/health returns correct response:
   { status: 'ok', timestamp: new Date().toISOString() }
   No auth required. CORS headers present.
   Confirm with: curl https://api.sokohuru.com/api/health

Acceptance criteria:
- [ ] Every protected route uses withAuth
- [ ] Every webhook route uses withWebhook
- [ ] Every cron route uses withCron
- [ ] Every POST body validated with Zod
- [ ] userId always from JWT context, never body
- [ ] CORS headers on all responses
- [ ] No env vars or secrets in any response
- [ ] GET /api/health returns 200
- [ ] npx tsc --noEmit passes

DO NOT:
- Do not add new routes in this task
- Do not change business logic — security audit only
- Do not skip any route file" "/path/to/sokohuru-api"
```

---

## Execution Order

```
QA.1  Content overhaul          → sokohuru-web  (day 1 morning)
QA.2  How it works + mockup     → sokohuru-web  (day 1 afternoon)
QA.3  Nav, a11y, technical debt → sokohuru-web  (day 2 morning)
QA.4  Glassmorphism + animations→ sokohuru-web  (day 2 afternoon)
QA.5  Flutter audit             → sokohuru-mobile (day 3)
QA.6  API security audit        → sokohuru-api  (day 3)
```

After these 6 tasks:
- Website is production-ready for launch
- Flutter codebase is design-system compliant
- API is security-audited
- All three repos pass their quality gates