export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
  socials: { linkedin?: string; twitter?: string; github?: string };
}

export const team: TeamMember[] = [
  {
    name: "Anas Ahmed",
    role: "CEO & Founder",
    bio: "Visionary entrepreneur with 7+ years building digital solutions for businesses across Asia, the Middle East, and Europe.",
    initials: "AA",
    color: "#ED1C24",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Rakibul Hasan",
    role: "CTO",
    bio: "Full-stack architect specializing in Next.js, cloud infrastructure, and scalable SaaS systems.",
    initials: "RH",
    color: "#0F75BC",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Fatema Khanam",
    role: "Head of Design",
    bio: "UI/UX designer passionate about creating interfaces that delight users and drive business results.",
    initials: "FK",
    color: "#ED1C24",
    socials: { linkedin: "#" },
  },
  {
    name: "Mehedi Islam",
    role: "Lead Developer",
    bio: "Mobile and web developer with expertise in React Native, Flutter, and enterprise software architecture.",
    initials: "MI",
    color: "#0F75BC",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Nusrat Jahan",
    role: "Project Manager",
    bio: "PMP-certified project manager ensuring every project is delivered on time, on budget, and beyond expectations.",
    initials: "NJ",
    color: "#ED1C24",
    socials: { linkedin: "#" },
  },
  {
    name: "Sabbir Rahman",
    role: "Head of Accounting",
    bio: "CA-qualified accountant with deep expertise in VAT compliance, tax planning, and financial reporting under NBR.",
    initials: "SR",
    color: "#0F75BC",
    socials: { linkedin: "#" },
  },
];

export const timeline = [
  { year: "2018", title: "Founded", description: "AnasTech Solutions established in Dhaka with a team of 3." },
  { year: "2019", title: "First Product", description: "Launched eBusiness, our flagship business management SaaS." },
  { year: "2020", title: "SMS Gateway", description: "Built the Bulk SMS Platform, now serving 500+ businesses." },
  { year: "2021", title: "International Expansion", description: "First international clients from UAE, UK, and West Africa." },
  { year: "2022", title: "Hospital Care", description: "Launched Hospital Care, now deployed in 15+ hospitals." },
  { year: "2023", title: "150+ Projects", description: "Crossed 150 delivered projects across 10+ countries." },
  { year: "2024", title: "New Horizons", description: "Expanding into AI-powered features across all products." },
];
