# AnasTech Solutions — Full Website Redesign Plan (Next.js)

**Target site:** https://anastechsolutions.com
**Stack:** Next.js 14+ (App Router) · TypeScript · TailwindCSS · Framer Motion · shadcn/ui
**Design vibe:** INSANE premium, white-based, asymmetric/curved sections, advanced-engineer feel. The design should make people stop scrolling — every section must feel like a different visual experience. Accent colors from logo (red + blue) on white canvas.

---

## 1. Brand & Design System

### Colors (from logo)

```
--brand-red:      #ED1C24   /* primary accent — CTAs, highlights */
--brand-blue:     #0F75BC   /* secondary accent — links, icons, gradients */
--ink:            #0B0B0F   /* headings */
--ink-soft:       #2B2B35   /* body text */
--paper:          #FFFFFF   /* base background */
--paper-2:        #F7F8FB   /* section alt bg */
--paper-3:        #EEF1F6   /* card bg / dividers */
--border:         #E5E8EF
--gradient-hero:  linear-gradient(135deg, #0F75BC 0%, #ED1C24 100%)
--gradient-soft:  linear-gradient(180deg, #FFFFFF 0%, #F7F8FB 100%)
```

Rule: **White dominates (~70%)**, blue for trust/structure (~20%), red for action/emphasis (~10%). Never mix red and blue at equal weight on the same section.

### Typography

- **Display/Headings:** `Space Grotesk` (variable weight 500–700)
- **Body:** `Inter` (variable, 400/500)
- **Mono (code / numbers):** `JetBrains Mono`
- Load via `next/font` for zero CLS.

### Spacing & Grid

- 12-column grid, container max-width 1280px, gutter 24px.
- Section vertical rhythm: `py-24 md:py-32` on desktop, `py-16` on mobile.
- Rounded corners: `rounded-2xl` default, `rounded-[32px]` for hero cards.

### Motion (CRITICAL — this is what makes the site feel premium)

- `framer-motion` for scroll-reveal, stagger, magnetic buttons, page transitions.
- `lenis` for butter-smooth scroll.
- `GSAP ScrollTrigger` for complex curve-morph sections, pinned animations, horizontal scroll sections.

### "Pagol-kora" Visual Effects — USE ALL OF THESE

1. **Asymmetric bento grids** — no two cards the same size, overlapping edges, broken grid layouts.
2. **Curved SVG section dividers** — every section transition uses a unique wave/blob/diagonal/organic shape. NO straight horizontal lines between sections.
3. **Animated gradient mesh blobs** — large soft blobs (blue + red at low opacity) floating behind hero text, slowly morphing with CSS animation.
4. **Dot grid / line grid backgrounds** — subtle geometric patterns with radial fade, different per section.
5. **Noise texture overlay** — 3-5% opacity grain on every section for that premium print feel.
6. **3D floating cards** — multi-layer shadows, slight perspective rotate-y on hover, glass borders.
7. **Magnetic cursor buttons** — buttons that pull toward the cursor as you approach them.
8. **Tilt cards** — react-parallax-tilt on all product/service cards, subtle 3D depth.
9. **Number counters** — animated count-up on scroll into view, JetBrains Mono font.
10. **Typing effect** — hero subtitle types out letter by letter.
11. **Marquee strips** — infinite scrolling logo/text bands at different speeds.
12. **Parallax layers** — elements move at different scroll speeds for depth.
13. **Stagger reveals** — elements animate in one-by-one with delay when scrolling into view.
14. **Text gradient animation** — headings with animated gradient that shifts on scroll.
15. **Horizontal scroll sections** — at least 1 section that scrolls horizontally while you scroll vertically (pinned scroll).
16. **Morphing shapes** — SVG shapes that transform as you scroll between sections.
17. **Glow effects** — subtle red/blue glow halos behind key elements.
18. **Cursor trail / custom cursor** — custom circular cursor on desktop that scales on interactive elements.
19. **Page transition** — smooth fade/slide between routes using framer-motion AnimatePresence.
20. **Loading screen** — logo animation on first load (quick, 1.5s max).

---

## 2. Tech Stack & Dependencies

```bash
npx create-next-app@latest anastech --ts --tailwind --app --eslint --src-dir
```

Core:

```
framer-motion lenis gsap @gsap/react
lucide-react class-variance-authority clsx tailwind-merge
@radix-ui/react-* (via shadcn/ui)
next-themes
react-parallax-tilt
sonner
```

shadcn install: `button card input dialog sheet accordion tabs tooltip toast navigation-menu`

NO backend deps needed. NO resend, no upstash, no nodemailer, no database. Pure frontend.

---

## 3. Project Structure

```
src/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx              # root layout with Navbar, Footer, WhatsAppFab, CustomCursor, Lenis
│   │   ├── page.tsx                # Home
│   │   ├── services/
│   │   │   ├── page.tsx            # services list
│   │   │   └── [slug]/page.tsx     # dynamic service detail
│   │   ├── products/
│   │   │   ├── page.tsx            # products list
│   │   │   └── [slug]/page.tsx     # per-product landing
│   │   ├── blog/
│   │   │   ├── page.tsx            # blog list
│   │   │   └── [slug]/page.tsx     # blog detail
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── support/page.tsx
│   ├── globals.css
│   ├── loading.tsx                 # logo loading animation
│   └── not-found.tsx               # custom 404
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              # sticky glassmorphic navbar
│   │   ├── Footer.tsx              # mega footer
│   │   ├── MobileMenu.tsx          # full-screen sheet menu
│   │   └── PageTransition.tsx      # AnimatePresence wrapper
│   ├── sections/                   # home page sections
│   │   ├── Hero.tsx
│   │   ├── TrustedBy.tsx           # marquee logos
│   │   ├── ServicesGrid.tsx        # bento grid
│   │   ├── ProductsCarousel.tsx    # horizontal scroll-snap
│   │   ├── HowWeWork.tsx           # 4-step curved path
│   │   ├── Stats.tsx               # animated counters
│   │   ├── Testimonials.tsx        # masonry
│   │   ├── BlogPreview.tsx         # 3 latest posts
│   │   └── CtaBand.tsx             # final CTA
│   ├── ui/                         # shadcn components
│   ├── effects/
│   │   ├── CustomCursor.tsx        # magnetic cursor
│   │   ├── GradientBlob.tsx        # animated mesh gradient
│   │   ├── NoiseOverlay.tsx        # grain texture
│   │   ├── DotGrid.tsx             # dot/line grid background
│   │   ├── SectionDivider.tsx      # curved SVG transitions
│   │   ├── MagneticButton.tsx      # pull-toward-cursor button
│   │   ├── ScrollReveal.tsx        # reusable scroll reveal wrapper
│   │   ├── StaggerReveal.tsx       # stagger children animation
│   │   ├── TextGradient.tsx        # animated gradient text
│   │   ├── TypeWriter.tsx          # typing effect
│   │   ├── CountUp.tsx             # number counter
│   │   ├── Marquee.tsx             # infinite scroll strip
│   │   ├── GlowEffect.tsx         # subtle glow halo
│   │   └── HorizontalScroll.tsx    # pinned horizontal scroll section
│   └── shared/
│       ├── WhatsAppFab.tsx         # floating WhatsApp button + chat popover
│       ├── Logo.tsx                # brand logo component
│       └── SmoothScroll.tsx        # Lenis provider
├── lib/
│   ├── data/
│   │   ├── services.ts            # all 7 services data
│   │   ├── products.ts            # all 4 products data
│   │   ├── team.ts                # team members
│   │   ├── faqs.ts                # FAQ data
│   │   ├── testimonials.ts        # client testimonials
│   │   └── blog-posts.ts          # blog metadata
│   ├── seo.ts                     # metadata helpers
│   └── utils.ts                   # cn(), misc helpers
└── public/
    ├── logo.svg
    ├── logo-white.svg
    ├── og/                         # OG images
    └── images/                     # static images
```

---

## 4. Page-by-Page Spec

### 4.1 Home (`/`)

Every section MUST use a unique curved SVG divider to transition to the next. No two transitions should look the same.

1. **Loading screen** — Logo mark (the red+blue triangle) draws itself with SVG stroke animation (1.5s), then page fades in.

2. **Navbar** — sticky, starts transparent, becomes glassmorphic on scroll (`backdrop-blur-xl bg-white/70`). Logo left, menu center (Home, Services, Products, Blog, About), "WhatsApp Us" red button right. Mobile: hamburger → full-screen overlay menu with stagger animation.

3. **Hero** (full viewport, asymmetric split):
   - Left 55%:
     - Small red pill badge: "Building Digital Future"
     - H1 large (56-72px): "We Build" + animated word cycle ["Websites", "Software", "Mobile Apps", "Business Solutions"] with gradient text (blue→red).
     - Subtitle typing animation: "From code to cloud — AnasTech delivers enterprise solutions that scale."
     - Two CTAs: "WhatsApp Us" (red, magnetic button → opens wa.me) + "Our Services" (ghost blue outline, magnetic).
   - Right 45%:
     - Floating 3D bento of 4 mini-cards that parallax on mouse move:
       - Code editor snippet card (with syntax highlighting colors)
       - Mobile phone mockup card
       - Analytics dashboard card
       - Chat/SMS notification card
     - Cards float at different Z-depths, subtle rotate on hover.
   - Background: animated blue+red gradient mesh blob (low opacity), dot grid pattern with radial fade, noise overlay.
   - Bottom: organic wave SVG divider.

4. **Trusted-by / Clients marquee** — two rows scrolling in opposite directions, grayscale logos that colorize on hover. Faded edges.

5. **Services overview** — asymmetric bento grid layout:
   - 1 large flagship card (Website Development) taking 2 columns + 2 rows
   - 6 smaller cards in varying sizes
   - Each card: icon (lucide), title, one-line description, arrow indicator
   - Hover: card tilts (react-parallax-tilt) + red underline sweep animation + shadow deepens
   - Stagger reveal on scroll
   - "View All Services" link at bottom

6. **Products showcase** — HORIZONTAL SCROLL SECTION (pinned):
   - As user scrolls vertically, 4 product cards scroll horizontally.
   - Each product card is large (80vw width) with:
     - Product name + tagline
     - 3 key features with icons
     - Mockup/screenshot
     - "Learn More" button → WhatsApp or product page
   - Blue gradient backdrop that shifts per card
   - Products: Khdimatul Ummah, Ebusiness, Hospital Care, Bulk SMS

7. **How We Work** — 4-step process with curved SVG path connecting them:
   - Discover → Design → Develop → Deliver
   - Animated path draws on scroll (GSAP ScrollTrigger)
   - Each step: numbered circle, icon, title, description
   - Path uses brand-blue stroke

8. **Stats band** — full-width with subtle blue-tinted background:
   - 4 counters: "150+ Projects", "80+ Clients", "5+ Years", "10+ Countries"
   - Numbers animate (count up) when scrolled into view
   - JetBrains Mono font for numbers
   - Red accent on the numbers

9. **Testimonials** — Masonry-style grid with varying card heights:
   - Large quotation mark SVG in brand-blue
   - Client name, company, role
   - Cards have slight random rotation (-2deg to 2deg)
   - Stagger reveal

10. **Blog/News preview** — 3 latest posts:
    - Featured post (large, left) + 2 smaller (right stack)
    - Each: image, date, category tag, title, excerpt
    - Hover: image zoom + shadow

11. **CTA band** — Big gradient panel (blue→red diagonal):
    - "Ready to Build Something Amazing?"
    - Subtitle: "Let's talk about your next project"
    - Big "Chat on WhatsApp" white button (magnetic)
    - Floating decorative shapes/dots

12. **Footer** — mega footer, dark background (#0B0B0F):
    - 4 columns: Brand (logo + about text), Services (7 links), Products (4 links), Contact (phone, email, address, socials)
    - Social icons: Facebook, LinkedIn, Twitter/X, Instagram
    - Bottom bar: copyright + "Powered by AnasTech"
    - WhatsApp number: +880 1743-656066

### 4.2 Services (`/services`)

- Page hero with gradient headline "Our Services" + breadcrumb.
- 7 service blocks, alternating layout (image left / content right, then flip). Each block:
  - Service icon (large, brand-colored)
  - Title + tagline
  - 3-4 bullet features
  - Tech stack tags
  - "Get Started" button → WhatsApp with pre-filled message about that service
- Scroll-reveal stagger on each block.
- Each links to `/services/[slug]` detail page.

Service detail page (`/services/[slug]`):

- Hero with service name + description
- Problem section: "Challenges you face"
- Solution section: "How we solve it"
- Tech stack used (logo icons)
- Deliverables list
- Process timeline
- FAQ accordion
- CTA: "Start This Service" → WhatsApp

Service slugs & data:

- `website-development` — Next.js, React, WordPress, e-commerce, custom
- `software-development` — SaaS, ERP, CRM, custom software
- `mobile-app-development` — Android & iOS, React Native, Flutter
- `business-development` — strategy, consulting, market research, growth
- `accounting-services` — VAT, Tax, Return filing, bookkeeping
- `sms-solutions` — bulk SMS, OTP, marketing SMS, API
- `call-center-solutions` — inbound, outbound, IVR, CRM integration

### 4.3 Products (`/products`)

- Grid of 4 product cards with large visual presence.
- Each card: product logo/icon, name, tagline, 3 key features, "Learn More" button.
- Tilt effect on hover.

Product detail page (`/products/[slug]`):

- Hero with product name, tagline, hero screenshot/mockup
- Feature list with icons (grid layout)
- Screenshots gallery (lightbox on click)
- Modules / capabilities section
- "Request Demo" button → WhatsApp with pre-filled message
- FAQ accordion

Products:

- `khdimatul-ummah` — Islamic community / charity management platform
- `ebusiness` — complete business management SaaS
- `hospital-care` — hospital management system (patients, doctors, pharmacy, billing)
- `bulk-sms` — SMS gateway platform (send bulk SMS, OTP, campaigns)

### 4.4 Blog/News (`/blog`)

- Static data in `lib/data/blog-posts.ts` for v1 (title, date, category, excerpt, content, coverImage).
- List page: featured post (large top) + grid of posts below.
- Detail page: reading progress bar at top, content, related posts, "Chat with us" CTA.
- Category filtering.

### 4.5 About Us (`/about`)

- Company story with timeline (curved SVG path, animated on scroll).
- Mission / Vision / Values — 3 cards with icons, stagger reveal.
- Team grid — cards with photo, name, role. Hover reveals social links overlay.
- Office/workspace photo with parallax effect.
- "Join Us" CTA → WhatsApp.

### 4.6 Contact (`/contact`)

- Split layout:
  - Left: visual info cards — address, phone (+880 1743-656066), email, working hours. Each card with icon + subtle hover.
  - Right: embedded Google Maps.
- Big "Chat on WhatsApp" CTA button.
- NO contact form needed — all communication via WhatsApp.

### 4.7 Support / Customer Care (`/support`)

- 4 product-specific support cards (Khdimatul Ummah, Ebusiness, Hospital Care, Bulk SMS) — click to see FAQs for that product.
- General FAQ accordion section.
- Big "Get Support on WhatsApp" button.
- Support hours info.

---

## 5. WhatsApp Integration (THE MAIN CTA — EVERYWHERE)

**WhatsApp Number:** +880 1743-656066
**wa.me link:** `https://wa.me/8801743656066`

### 5.1 Floating WhatsApp FAB (`WhatsAppFab.tsx`)

- Fixed position: bottom-right (bottom-6 right-6).
- Green circular button (#25D366) with WhatsApp icon, 56px.
- Pulsing ring animation (infinite).
- On click: opens a small chat-style popover above the button:
  - Header: "Hi! How can we help?" with AnasTech logo.
  - Quick-reply chip buttons:
    - "Website Development" → `https://wa.me/8801743656066?text=Hi%20AnasTech%2C%20I%27m%20interested%20in%20Website%20Development`
    - "Mobile App" → `https://wa.me/8801743656066?text=Hi%20AnasTech%2C%20I%27m%20interested%20in%20Mobile%20App%20Development`
    - "Software" → `https://wa.me/8801743656066?text=Hi%20AnasTech%2C%20I%27m%20interested%20in%20Software%20Development`
    - "Other Inquiry" → `https://wa.me/8801743656066?text=Hi%20AnasTech%2C%20I%20have%20an%20inquiry`
  - "Or type your message" text input → opens wa.me with custom text.
- Popover has smooth scale/fade animation.
- Show on all pages.

### 5.2 All CTAs point to WhatsApp

Every "Book a Meeting", "Get Started", "Contact Us", "Request Demo", "Get Support" button across the entire site should open WhatsApp with a relevant pre-filled message. Examples:

- Navbar CTA: `?text=Hi%20AnasTech%2C%20I%27d%20like%20to%20discuss%20a%20project`
- Service page: `?text=Hi%20AnasTech%2C%20I%27m%20interested%20in%20[Service%20Name]`
- Product page: `?text=Hi%20AnasTech%2C%20I%27d%20like%20a%20demo%20of%20[Product%20Name]`
- Support page: `?text=Hi%20AnasTech%2C%20I%20need%20support%20with%20[Product%20Name]`

---

## 6. SEO, Performance, Accessibility

- `app/sitemap.ts`, `app/robots.ts`, per-page `generateMetadata`.
- JSON-LD: Organization, WebSite, Service, Product, BreadcrumbList, FAQ, Article.
- OG images via `@vercel/og` dynamic route.
- `next/image` everywhere, AVIF/WebP, proper `sizes`.
- Font: `next/font` with `display: swap`.
- Lighthouse target: 95+ all categories.
- `prefers-reduced-motion` — disable all motion/Lenis/GSAP for users who prefer reduced motion.
- ARIA labels on every interactive element, skip-to-content link, focus rings in brand blue.
- Keyboard-navigable everywhere (focus trap in modals via Radix).

---

## 7. Content Data Model

All data is static TypeScript files — NO database, NO CMS, NO API routes needed.

`lib/data/services.ts`:

```ts
export interface Service {
  slug: string;
  title: string;
  tagline: string;
  icon: string; // lucide icon name
  description: string;
  features: string[];
  techStack: string[];
  deliverables: string[];
  faqs: { q: string; a: string }[];
  whatsappMessage: string; // pre-filled wa.me message
}
```

`lib/data/products.ts`:

```ts
export interface Product {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: { title: string; description: string; icon: string }[];
  modules: string[];
  whatsappMessage: string;
}
```

Same pattern for `team.ts`, `testimonials.ts`, `faqs.ts`, `blog-posts.ts`.

---

## 8. No .env needed!

This is a **pure static/SSG frontend**. No API keys, no secrets, no backend. The only "dynamic" thing is WhatsApp links which are just URLs.

Optional (for analytics only, not required for launch):

```
NEXT_PUBLIC_GA_ID=G-XXXXXXX
```

---

## 9. Deployment

- **Vercel** (recommended) — `vercel deploy`, auto-preview per branch.
- Can also do `next export` for pure static hosting anywhere (Netlify, Cloudflare Pages, etc.).
- Domain: `anastechsolutions.com` → point to Vercel, TLS auto.
- Zero env config needed for core functionality.

---

## 10. Build Order (for Claude Code — follow this exact sequence)

### Phase 1: Foundation

1. Scaffold Next.js app, install ALL deps, set up Tailwind tokens + custom colors + fonts in `tailwind.config.ts` and `globals.css`.
2. Create all effect components: `CustomCursor`, `GradientBlob`, `NoiseOverlay`, `DotGrid`, `SectionDivider` (multiple variants), `MagneticButton`, `ScrollReveal`, `StaggerReveal`, `TextGradient`, `TypeWriter`, `CountUp`, `Marquee`, `GlowEffect`, `HorizontalScroll`.
3. Create `Logo`, `SmoothScroll` (Lenis provider), `PageTransition`.

### Phase 2: Layout

4. Build `Navbar` (glassmorphic, responsive, mobile menu).
5. Build `Footer` (mega footer, dark bg).
6. Build `WhatsAppFab` (floating button + chat popover with quick replies).
7. Build loading screen (logo draw animation).

### Phase 3: Home Page (section by section — MOST IMPORTANT, spend the most effort here)

8. Hero section (full viewport, asymmetric, typing effect, floating cards, gradient blob, dot grid).
9. Trusted-by marquee (dual-direction logo scroll).
10. Services bento grid (asymmetric, tilt cards, stagger reveal).
11. Products horizontal scroll (pinned scroll section, GSAP).
12. How We Work (SVG path animation, GSAP ScrollTrigger).
13. Stats band (animated counters).
14. Testimonials (masonry, random rotation).
15. Blog preview (featured + grid).
16. CTA band (gradient, magnetic button).

### Phase 4: Inner Pages

17. Services list page + `/services/[slug]` dynamic detail pages (7 services).
18. Products list page + `/products/[slug]` dynamic detail pages (4 products).
19. Blog list + `/blog/[slug]` detail pages.
20. About page (timeline, team grid).
21. Contact page (info cards + map + WhatsApp CTA).
22. Support page (product support cards + FAQ).

### Phase 5: Polish

23. Custom 404 page.
24. SEO: sitemap, robots, JSON-LD, OG images, metadata.
25. Dark mode toggle (optional).
26. Accessibility audit + performance audit.
27. Test all WhatsApp links work correctly.
28. Deploy to Vercel.

---

## 11. Prompt to paste into Claude Code

```
Build a production-grade marketing website for AnasTech Solutions using Next.js 14 App Router + TypeScript + TailwindCSS + Framer Motion + GSAP + shadcn/ui. Follow the spec in anastech-redesign-plan.md at repo root.

Brand colors: primary red #ED1C24, primary blue #0F75BC, on white-dominant canvas. Logo at /public/logo.svg (red+blue triangular mark).

DESIGN IS EVERYTHING — the site must look so premium and advanced that people think a team of 10 senior engineers built it. Use: asymmetric bento grids, curved SVG section dividers (unique per section), animated gradient mesh blobs, dot-grid backgrounds, noise overlay, 3D floating cards, magnetic cursor buttons, tilt cards (react-parallax-tilt), animated number counters, typing effect, dual-direction marquee, parallax layers, stagger reveals, text gradient animation, at least 1 horizontal scroll pinned section, morphing SVG shapes, glow effects, custom cursor on desktop, page transitions (framer-motion AnimatePresence), and a logo-draw loading screen.

Pages: Home (12 sections), Services (list + 7 dynamic detail), Products (list + 4 dynamic: Khdimatul Ummah, Ebusiness, Hospital Care, Bulk SMS), Blog (static data), About, Contact, Support.

NO BACKEND. No API routes. No email subscription. No booking system. No database. Pure frontend/SSG.

ALL CTAs point to WhatsApp: https://wa.me/8801743656066 with context-specific pre-filled messages. Floating WhatsApp FAB on every page with chat popover and quick-reply chips.

Start with foundation (design tokens, effect components, layout), then build Home page section-by-section with INSANE attention to design detail, then inner pages, then SEO + polish + deploy.

Keep Lighthouse >= 95, respect prefers-reduced-motion, WCAG AA. Use lenis for smooth scroll, sonner for toasts. Commit after each major section.
```

---

**Done. Zero backend, zero API keys, zero complexity. Pure frontend fire.**
