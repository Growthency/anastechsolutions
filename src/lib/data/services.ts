import { waLink } from "@/lib/utils";

export interface ServicePackage {
  name: string;          // "Frontend Website"
  price: string;         // "৳25,000"
  priceNote?: string;    // e.g. "one-time" or "starting at"
  description: string;   // short tagline below name
  features: string[];    // bullet list of what's included
  highlight?: boolean;   // featured / recommended badge
  ctaLabel?: string;     // CTA button text (default: "Contact Now")
  ctaHref?: string;      // CTA destination (default: "/contact")
}

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  icon: string;
  description: string;
  features: string[];
  techStack: string[];
  deliverables: string[];
  challenges: string[];
  solutions: string[];
  process: { step: number; title: string; description: string }[];
  faqs: { q: string; a: string }[];
  whatsappMessage: string;
  color: string;
  bgColor: string;
  packages?: ServicePackage[];
}

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    tagline: "Modern, fast websites that convert visitors into customers",
    icon: "Globe",
    color: "#0F75BC",
    bgColor: "rgba(15, 117, 188, 0.08)",
    description:
      "We build high-performance websites using Next.js, React, and WordPress — from e-commerce stores to corporate portals. Every site is optimized for speed, SEO, and conversions.",
    features: [
      "Next.js & React for lightning-fast performance",
      "WordPress for easy content management",
      "Custom e-commerce with Shopify or WooCommerce",
      "Mobile-first, fully responsive design",
      "SEO optimized from day one",
      "99.9% uptime guarantee",
    ],
    techStack: ["Next.js", "React", "TypeScript", "WordPress", "Shopify", "TailwindCSS", "MySQL", "PostgreSQL"],
    deliverables: ["Source code", "Admin panel access", "SEO setup", "3 months free support", "Training session", "Deployment on your server"],
    challenges: [
      "Outdated website losing credibility with potential clients",
      "Slow loading times driving visitors away",
      "Poor mobile experience losing mobile traffic",
      "Low search engine ranking missing organic traffic",
    ],
    solutions: [
      "Modern tech stack for blazing fast load times",
      "Strategic UX/UI design built to convert",
      "Mobile-first approach for all screen sizes",
      "On-page SEO baked in from the start",
    ],
    process: [
      { step: 1, title: "Discovery", description: "We study your business, competitors, and goals to craft the right strategy." },
      { step: 2, title: "Design", description: "Figma wireframes and mockups reviewed with you before a single line of code." },
      { step: 3, title: "Development", description: "Clean, documented code with weekly progress updates." },
      { step: 4, title: "Launch", description: "QA testing, performance audit, deployment, and hand-off." },
    ],
    faqs: [
      { q: "How long does it take to build a website?", a: "A standard business website takes 2–4 weeks. Complex e-commerce or custom web apps take 6–12 weeks depending on scope." },
      { q: "Do you provide hosting?", a: "We can recommend and set up hosting for you, or deploy on your existing server. We work with Vercel, cPanel, VPS, and cloud platforms." },
      { q: "Can I update the website myself?", a: "Yes. We build WordPress sites with intuitive admin panels so you can update content without any coding knowledge." },
      { q: "Do you redesign existing websites?", a: "Absolutely. We can redesign and migrate your existing website while preserving your SEO rankings." },
    ],
    whatsappMessage: waLink("Hi AnasTech, I'm interested in Website Development. Can we discuss?"),
    packages: [
      {
        name: "Frontend Website",
        price: "৳25,000",
        priceNote: "one-time",
        description: "A polished, mobile-first marketing site.",
        features: [
          "Up to 5 pages (Home, About, Services, Blog, Contact)",
          "Mobile-first responsive design",
          "Modern Next.js / React frontend",
          "Contact form with email notifications",
          "Basic on-page SEO setup",
          "1 month free support",
        ],
        ctaLabel: "Contact Now",
        ctaHref: "/contact",
      },
      {
        name: "Backend Website",
        price: "৳50,000",
        priceNote: "one-time",
        description: "Dynamic site with admin panel & database.",
        features: [
          "Everything in Frontend Website",
          "Custom admin dashboard",
          "Database integration (PostgreSQL / MySQL)",
          "User authentication & role management",
          "REST / API endpoints for your data",
          "Image upload & media management",
          "Advanced SEO + sitemap + structured data",
          "2 months free support",
        ],
        highlight: true,
        ctaLabel: "Contact Now",
        ctaHref: "/contact",
      },
      {
        name: "Full Stack + Mobile App",
        price: "৳1,00,000",
        priceNote: "one-time",
        description: "Complete web platform with companion mobile app.",
        features: [
          "Everything in Backend Website",
          "Simple mobile app (Android + iOS)",
          "Shared backend API between web & app",
          "Push notifications support",
          "Payment gateway integration (bKash / SSLCommerz / Stripe)",
          "App store / Play Store deployment",
          "Analytics dashboard",
          "3 months free support + priority WhatsApp line",
        ],
        ctaLabel: "Contact Now",
        ctaHref: "/contact",
      },
    ],
  },
  {
    slug: "software-development",
    title: "Software Development",
    tagline: "Custom SaaS, ERP & business software built to scale",
    icon: "Code2",
    color: "#ED1C24",
    bgColor: "rgba(237, 28, 36, 0.08)",
    description:
      "From SaaS platforms to enterprise ERP and CRM systems — we design, build, and deploy custom software that automates your operations and drives growth.",
    features: [
      "Custom SaaS platform development",
      "ERP & CRM systems from scratch",
      "API integrations & microservices",
      "Cloud deployment on AWS/GCP/Azure",
      "Scalable architecture for growing businesses",
      "Ongoing maintenance & feature updates",
    ],
    techStack: ["Next.js", "Node.js", "Python", "PostgreSQL", "Redis", "Docker", "AWS", "REST API"],
    deliverables: ["Full source code", "System architecture docs", "API documentation", "Admin dashboard", "User manual", "6 months support"],
    challenges: [
      "Manual processes wasting hours of staff time every day",
      "Data scattered across spreadsheets and tools",
      "No real-time visibility into business performance",
      "Off-the-shelf software not fitting your exact workflow",
    ],
    solutions: [
      "Automated workflows that eliminate repetitive tasks",
      "Centralized data with role-based access control",
      "Real-time dashboards and analytics",
      "Tailor-built to match your exact business process",
    ],
    process: [
      { step: 1, title: "Requirements", description: "Deep-dive sessions to map every workflow and data point." },
      { step: 2, title: "Architecture", description: "System design, database schema, and tech stack selection." },
      { step: 3, title: "Development", description: "Agile sprints with demos every 2 weeks." },
      { step: 4, title: "Deployment", description: "Staged rollout, staff training, and go-live support." },
    ],
    faqs: [
      { q: "How much does custom software cost?", a: "Pricing depends on complexity. Small tools start from $2,000. Enterprise systems range from $10,000–$50,000+. We provide a detailed quote after the discovery call." },
      { q: "How long does development take?", a: "Simple tools: 4–8 weeks. Full ERP/CRM: 3–6 months. We break it into milestones so you see progress throughout." },
      { q: "Who owns the code?", a: "You do. 100%. We hand over all source code and documentation at project completion." },
      { q: "Can you integrate with our existing systems?", a: "Yes. We specialize in API integrations with accounting software, payment gateways, SMS providers, and more." },
    ],
    whatsappMessage: waLink("Hi AnasTech, I'm interested in custom Software Development. Can we discuss?"),
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    tagline: "Android & iOS apps that users love to open",
    icon: "Smartphone",
    color: "#0F75BC",
    bgColor: "rgba(15, 117, 188, 0.08)",
    description:
      "We build cross-platform mobile apps with React Native and Flutter — shipping to both Google Play and App Store from a single codebase without sacrificing performance.",
    features: [
      "React Native & Flutter cross-platform apps",
      "Native Android & iOS development",
      "Supabase & Firebase backend integration",
      "Push notifications, offline mode, biometrics",
      "App Store & Google Play submission",
      "Post-launch analytics and crash reporting",
    ],
    techStack: ["React Native", "Flutter", "Expo", "Firebase", "Supabase", "Node.js", "TypeScript", "RevenueCat"],
    deliverables: ["App source code", "Published app on stores", "Admin dashboard", "Push notification setup", "Analytics integration", "3 months support"],
    challenges: [
      "No mobile presence while competitors have apps",
      "Reaching customers who prefer mobile over web",
      "Complex native development requiring two codebases",
      "High cost of separate Android and iOS teams",
    ],
    solutions: [
      "Cross-platform development saves 40% vs native",
      "Near-native performance with React Native/Flutter",
      "Single codebase for iOS and Android",
      "In-app purchases and subscription management built-in",
    ],
    process: [
      { step: 1, title: "Wireframing", description: "User flow diagrams and interactive prototypes before any code." },
      { step: 2, title: "UI Design", description: "Pixel-perfect Figma designs following platform guidelines." },
      { step: 3, title: "Development", description: "Biweekly builds delivered to TestFlight and Play Console for your testing." },
      { step: 4, title: "Launch", description: "Store submission, review support, and launch announcement." },
    ],
    faqs: [
      { q: "React Native or Flutter — which is better?", a: "Both are excellent. We recommend React Native for teams already using JavaScript/TypeScript, and Flutter for highly custom UI requirements. We'll advise based on your project." },
      { q: "How long does app development take?", a: "MVP: 8–12 weeks. Full-featured app: 4–6 months. We can deliver a working beta in 6 weeks." },
      { q: "Do you handle App Store submission?", a: "Yes. We handle the entire submission process for both Google Play and Apple App Store, including screenshots, descriptions, and compliance." },
      { q: "Can you add features to my existing app?", a: "Yes, we can take over and continue development on any existing React Native, Flutter, or native Android/iOS app." },
    ],
    whatsappMessage: waLink("Hi AnasTech, I'm interested in Mobile App Development. Can we discuss?"),
  },
  {
    slug: "business-development",
    title: "Business Development",
    tagline: "Strategic consulting to accelerate your business growth",
    icon: "TrendingUp",
    color: "#ED1C24",
    bgColor: "rgba(237, 28, 36, 0.08)",
    description:
      "From market entry strategy to growth consulting — we help businesses identify opportunities, build systems, and scale sustainably in competitive markets.",
    features: [
      "Market research & competitive analysis",
      "Business model design and optimization",
      "Go-to-market strategy",
      "Digital transformation roadmap",
      "Partnership and channel development",
      "Investor pitch deck preparation",
    ],
    techStack: ["Market Analysis", "Financial Modeling", "CRM Strategy", "Digital Marketing", "Data Analytics", "Process Automation"],
    deliverables: ["Strategy document", "Market research report", "Competitor analysis", "90-day action plan", "Financial projections", "Monthly advisory calls"],
    challenges: [
      "Unclear path to growth despite having a good product",
      "Wasted marketing spend with low ROI",
      "Losing deals to competitors without understanding why",
      "No structured process for business development",
    ],
    solutions: [
      "Data-driven strategy based on real market research",
      "Optimized sales funnel and conversion process",
      "Competitive positioning to win more deals",
      "Systemized BD process your team can execute",
    ],
    process: [
      { step: 1, title: "Audit", description: "We analyze your current business model, market position, and growth blockers." },
      { step: 2, title: "Strategy", description: "Custom growth strategy with clear KPIs and timelines." },
      { step: 3, title: "Implementation", description: "Hands-on support to execute the strategy alongside your team." },
      { step: 4, title: "Review", description: "Monthly reviews to measure, learn, and iterate." },
    ],
    faqs: [
      { q: "What industries do you consult for?", a: "Technology, retail, healthcare, education, financial services, and manufacturing. We've worked across 10+ countries." },
      { q: "How is this different from a regular consultant?", a: "We don't just give advice — we help you implement. Our team includes technologists who can build the systems your strategy requires." },
      { q: "What's the engagement model?", a: "Project-based or monthly retainer. Most clients start with a 3-month strategy engagement, then continue with advisory support." },
    ],
    whatsappMessage: waLink("Hi AnasTech, I'm interested in Business Development consulting. Can we discuss?"),
  },
  {
    slug: "accounting-services",
    title: "Accounting Services",
    tagline: "VAT, tax, and bookkeeping handled by certified professionals",
    icon: "Calculator",
    color: "#0F75BC",
    bgColor: "rgba(15, 117, 188, 0.08)",
    description:
      "Stay compliant and financially healthy with our certified accounting team. We handle VAT registration, tax returns, annual reports, and day-to-day bookkeeping for businesses across Bangladesh.",
    features: [
      "VAT registration and monthly returns",
      "Income tax filing for individuals and companies",
      "Monthly bookkeeping and financial statements",
      "Payroll processing",
      "Audit support and financial compliance",
      "Business registration with RJSC",
    ],
    techStack: ["QuickBooks", "Tally", "NBR eTax", "VAT Online", "Excel Financial Modeling", "RJSC Portal"],
    deliverables: ["Monthly P&L statement", "VAT return filing", "Tax return submission", "Balance sheet", "Payroll reports", "Compliance certificates"],
    challenges: [
      "Fear of NBR audits due to incorrect filings",
      "Missing deadlines and paying penalties",
      "No clear picture of business profitability",
      "Wasting hours on manual accounting tasks",
    ],
    solutions: [
      "Certified accountants who know NBR requirements inside-out",
      "Automated reminders and deadline management",
      "Monthly financial reports you can actually understand",
      "Cloud-based bookkeeping for real-time visibility",
    ],
    process: [
      { step: 1, title: "Onboarding", description: "We collect your existing financial records and set up your chart of accounts." },
      { step: 2, title: "Cleanup", description: "We reconcile and organize any backlog of transactions." },
      { step: 3, title: "Monthly Cycle", description: "Ongoing bookkeeping, VAT filing, and financial reporting." },
      { step: 4, title: "Year-end", description: "Annual tax return, audit support, and financial close." },
    ],
    faqs: [
      { q: "Do you handle VAT for both small and large businesses?", a: "Yes. We serve sole proprietors, SMEs, and large companies. VAT complexity scales with your business size." },
      { q: "How do you collect documents from us?", a: "Via WhatsApp, email, or our secure document portal. We make it as easy as possible for you." },
      { q: "Are your accountants certified?", a: "Yes. Our team includes CA (Chartered Accountants) and CMA professionals with experience in NBR compliance." },
    ],
    whatsappMessage: waLink("Hi AnasTech, I'm interested in your Accounting Services. Can we discuss?"),
  },
  {
    slug: "sms-solutions",
    title: "SMS Solutions",
    tagline: "Bulk SMS, OTP & marketing campaigns delivered instantly",
    icon: "MessageSquare",
    color: "#ED1C24",
    bgColor: "rgba(237, 28, 36, 0.08)",
    description:
      "Reach your customers instantly with our enterprise SMS gateway. Send bulk promotional SMS, transactional OTPs, and automated marketing campaigns across all operators in Bangladesh.",
    features: [
      "Bulk SMS to all Bangladesh operators",
      "OTP & transactional SMS API",
      "Masking (branded sender name)",
      "Campaign scheduling and automation",
      "Real-time delivery reports",
      "REST API with SDKs for developers",
    ],
    techStack: ["REST API", "Webhook", "PHP SDK", "Python SDK", "Node.js SDK", "Web Dashboard"],
    deliverables: ["API credentials", "API documentation", "Web dashboard access", "Developer SDK", "Delivery reports", "24/7 technical support"],
    challenges: [
      "Low email open rates missing your audience",
      "Need for instant OTP delivery for your app",
      "Manual SMS sending wasting staff time",
      "No visibility into message delivery status",
    ],
    solutions: [
      "98%+ SMS open rate vs 20% for email",
      "Sub-second OTP delivery for any app",
      "Scheduled campaigns and API automation",
      "Real-time delivery tracking dashboard",
    ],
    process: [
      { step: 1, title: "Registration", description: "Submit business documents for operator approval (for masking)." },
      { step: 2, title: "Integration", description: "API keys issued and SDK documentation shared within 24 hours." },
      { step: 3, title: "Testing", description: "Free test credits to verify delivery before going live." },
      { step: 4, title: "Scale", description: "Volume pricing as your usage grows." },
    ],
    faqs: [
      { q: "What operators do you cover?", a: "Grameenphone, Robi, Banglalink, Teletalk — all 4 major operators in Bangladesh." },
      { q: "What is masking?", a: "Masking lets you send SMS from your brand name (e.g., 'AnasTech') instead of a number. Requires BTRC approval which we handle." },
      { q: "How fast is delivery?", a: "Transactional SMS delivers in 1–3 seconds. Bulk campaigns vary by volume but typically complete within minutes." },
      { q: "Is there a minimum order?", a: "No minimum for API usage. Prepaid credit bundles start from as low as 500 BDT." },
    ],
    whatsappMessage: waLink("Hi AnasTech, I'm interested in your SMS Solutions. Can we discuss?"),
  },
  {
    slug: "call-center-solutions",
    title: "Call Center Solutions",
    tagline: "IVR, inbound & outbound call center setup for your business",
    icon: "Phone",
    color: "#0F75BC",
    bgColor: "rgba(15, 117, 188, 0.08)",
    description:
      "Set up a professional call center from scratch — IVR systems, cloud PBX, agent dashboards, CRM integration, and outbound campaign dialing — all managed by AnasTech.",
    features: [
      "Cloud PBX and IVR setup",
      "Inbound customer support center",
      "Outbound sales & telemarketing campaigns",
      "CRM integration (Zoho, Salesforce, custom)",
      "Call recording and quality monitoring",
      "Real-time agent performance dashboard",
    ],
    techStack: ["FreeSWITCH", "Asterisk", "VoIP", "WebRTC", "CRM API", "Call Analytics"],
    deliverables: ["PBX system setup", "IVR menu design", "Agent portal", "CRM integration", "Call recording system", "Monthly reports"],
    challenges: [
      "Missing customer calls and losing business",
      "No structured process for handling support tickets",
      "High cost of on-premise phone systems",
      "No data on call volumes, resolution times, or agent performance",
    ],
    solutions: [
      "Cloud PBX — no hardware, accessible from anywhere",
      "IVR to route calls to the right agent first time",
      "CRM integration for full customer context on every call",
      "Analytics dashboard to track every KPI",
    ],
    process: [
      { step: 1, title: "Assessment", description: "Map your call flows, team size, and integration requirements." },
      { step: 2, title: "Setup", description: "Cloud PBX provisioning, IVR design, and agent onboarding." },
      { step: 3, title: "Integration", description: "Connect with your CRM, ticketing, or billing system." },
      { step: 4, title: "Training", description: "Agent and supervisor training with live monitoring." },
    ],
    faqs: [
      { q: "Do agents need special hardware?", a: "No. Agents just need a headset and a browser. Our system is 100% cloud-based." },
      { q: "Can I record calls for quality purposes?", a: "Yes. All calls are automatically recorded and stored with searchable transcripts." },
      { q: "How many agents can the system support?", a: "Our system scales from 5 to 500+ concurrent agents with no performance degradation." },
      { q: "Do you provide the agents too?", a: "We can provide trained customer service agents on request, or just the technology if you have your own team." },
    ],
    whatsappMessage: waLink("Hi AnasTech, I'm interested in Call Center Solutions. Can we discuss?"),
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
