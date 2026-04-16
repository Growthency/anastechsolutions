import { waLink } from "@/lib/utils";

export interface Product {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  features: { title: string; description: string; icon: string }[];
  modules: string[];
  screenshots: string[];
  whatsappMessage: string;
  faqs: { q: string; a: string }[];
}

export const products: Product[] = [
  {
    slug: "khdimatul-ummah",
    title: "Khdimatul Ummah",
    tagline: "Islamic community & charity management platform",
    description:
      "A comprehensive platform for mosques, madrasas, and Islamic organizations to manage donations, members, events, and financial reporting with full transparency.",
    icon: "Heart",
    color: "#0F75BC",
    bgColor: "rgba(15, 117, 188, 0.08)",
    features: [
      { title: "Donation Management", description: "Track zakat, sadaqah, and waqf donations with donor receipts and annual reports.", icon: "HandHeart" },
      { title: "Member Directory", description: "Manage community members, families, and contact information in one place.", icon: "Users" },
      { title: "Event Management", description: "Plan and promote Islamic events, programs, and educational courses.", icon: "Calendar" },
      { title: "Financial Reporting", description: "Full transparency reports for donors and trustees with expense tracking.", icon: "FileText" },
      { title: "SMS Notifications", description: "Automated SMS alerts for events, donation receipts, and announcements.", icon: "MessageSquare" },
      { title: "Multi-branch Support", description: "Manage multiple mosque branches or chapters from a single dashboard.", icon: "Building" },
    ],
    modules: [
      "Donation & Zakat Manager",
      "Donor Portal & Receipts",
      "Member CRM",
      "Event & Program Scheduler",
      "Expense & Budget Tracker",
      "Financial Transparency Reports",
      "SMS & WhatsApp Notifications",
      "Admin Dashboard",
    ],
    screenshots: [],
    whatsappMessage: waLink("Hi AnasTech, I'm interested in a demo of Khdimatul Ummah. Can we connect?"),
    faqs: [
      { q: "Is Khdimatul Ummah cloud-based or installed?", a: "Cloud-based. Access it from any device, anywhere — no installation required." },
      { q: "Can donors view how their money is used?", a: "Yes. We have a donor-facing transparency portal where they can see expense breakdowns and project updates." },
      { q: "Is it suitable for small mosques?", a: "Absolutely. We have plans for small community mosques up to large Islamic organizations." },
    ],
  },
  {
    slug: "ebusiness",
    title: "eBusiness",
    tagline: "Complete business management SaaS for SMEs",
    description:
      "An all-in-one business management platform covering invoicing, inventory, HR, CRM, and accounting — built for small and medium businesses in Bangladesh.",
    icon: "BarChart3",
    color: "#ED1C24",
    bgColor: "rgba(237, 28, 36, 0.08)",
    features: [
      { title: "Invoicing & Billing", description: "Create, send, and track professional invoices with automated payment reminders.", icon: "Receipt" },
      { title: "Inventory Management", description: "Real-time stock tracking, low-stock alerts, and purchase order management.", icon: "Package" },
      { title: "HR & Payroll", description: "Employee records, attendance, leave management, and automated payroll.", icon: "UserCheck" },
      { title: "CRM", description: "Lead tracking, deal pipeline, and customer relationship history.", icon: "Users" },
      { title: "Accounting", description: "Double-entry bookkeeping, VAT reports, and financial statements.", icon: "Calculator" },
      { title: "Analytics Dashboard", description: "Real-time business insights with charts, KPIs, and custom reports.", icon: "TrendingUp" },
    ],
    modules: [
      "Sales & Invoicing",
      "Purchase & Procurement",
      "Inventory & Warehouse",
      "HR & Payroll",
      "CRM & Lead Management",
      "Accounting & Finance",
      "VAT & Tax Reports",
      "Multi-user Role Management",
      "Mobile App (Android & iOS)",
      "API for integrations",
    ],
    screenshots: [],
    whatsappMessage: waLink("Hi AnasTech, I'm interested in a demo of eBusiness. Can we connect?"),
    faqs: [
      { q: "Is there a mobile app?", a: "Yes. eBusiness has Android and iOS apps for on-the-go access to sales, inventory, and reports." },
      { q: "Can I import my existing data?", a: "Yes. We support Excel/CSV import for products, customers, vendors, and opening balances." },
      { q: "Does it support multiple currencies?", a: "Yes. Multi-currency support for international transactions with automatic exchange rate updates." },
    ],
  },
  {
    slug: "hospital-care",
    title: "Hospital Care",
    tagline: "Complete hospital management system",
    description:
      "A full-featured hospital management system covering patient registration, OPD/IPD management, doctor scheduling, pharmacy, lab, and billing — designed for Bangladeshi healthcare facilities.",
    icon: "Stethoscope",
    color: "#0F75BC",
    bgColor: "rgba(15, 117, 188, 0.08)",
    features: [
      { title: "Patient Management", description: "Registration, medical history, digital prescriptions, and appointment scheduling.", icon: "UserPlus" },
      { title: "OPD & IPD", description: "Outpatient and inpatient ward management with bed allocation and nursing notes.", icon: "Building2" },
      { title: "Doctor Portal", description: "Doctor schedules, consultation history, and patient queue management.", icon: "Stethoscope" },
      { title: "Pharmacy Module", description: "Medicine inventory, dispensing, expiry alerts, and pharmacy billing.", icon: "Pill" },
      { title: "Lab & Diagnostics", description: "Test requests, result entry, and report delivery to doctors and patients.", icon: "FlaskConical" },
      { title: "Billing & Insurance", description: "Itemized billing, insurance claim processing, and payment collection.", icon: "CreditCard" },
    ],
    modules: [
      "Patient Registration & EMR",
      "OPD Appointment Management",
      "IPD & Ward Management",
      "Doctor & Staff Portal",
      "Pharmacy & Medicine Inventory",
      "Laboratory & Radiology",
      "Billing & Payment",
      "Insurance & Claims",
      "Reporting & Analytics",
      "SMS Notifications",
    ],
    screenshots: [],
    whatsappMessage: waLink("Hi AnasTech, I'm interested in a demo of Hospital Care. Can we connect?"),
    faqs: [
      { q: "Is the system HIPAA compliant?", a: "Yes. Patient data is encrypted at rest and in transit. Role-based access ensures only authorized staff can view sensitive records." },
      { q: "Can it handle multiple departments?", a: "Yes. Hospital Care supports unlimited departments, wards, and branches from a single admin panel." },
      { q: "Is training included?", a: "Yes. We provide on-site training for all staff roles — admin, doctors, nurses, pharmacists, and billing team." },
    ],
  },
  {
    slug: "bulk-sms",
    title: "Bulk SMS Platform",
    tagline: "Enterprise SMS gateway for Bangladesh",
    description:
      "A powerful SMS management platform for businesses to send bulk promotional messages, transactional OTPs, and automated campaigns through a web dashboard or API — covering all operators in Bangladesh.",
    icon: "Zap",
    color: "#ED1C24",
    bgColor: "rgba(237, 28, 36, 0.08)",
    features: [
      { title: "Bulk Campaigns", description: "Send thousands of SMS in seconds with scheduled delivery and contact list management.", icon: "Send" },
      { title: "Developer API", description: "RESTful API with SDKs for PHP, Python, and Node.js to integrate into any app.", icon: "Code2" },
      { title: "OTP Service", description: "Sub-second OTP delivery for authentication, verification, and transactions.", icon: "ShieldCheck" },
      { title: "Masking / Sender ID", description: "Send SMS from your brand name instead of a number (BTRC approved).", icon: "Tag" },
      { title: "Delivery Reports", description: "Real-time delivery status with per-message tracking and campaign analytics.", icon: "BarChart3" },
      { title: "Contact Management", description: "Upload and manage contact groups with opt-out handling and blacklist.", icon: "Users" },
    ],
    modules: [
      "Web Dashboard",
      "Bulk SMS Sender",
      "Campaign Scheduler",
      "OTP API",
      "Masking Setup",
      "Contact Group Manager",
      "Delivery Report Analytics",
      "Invoice & Credit Management",
      "REST API & Webhooks",
      "Developer SDKs",
    ],
    screenshots: [],
    whatsappMessage: waLink("Hi AnasTech, I'm interested in your Bulk SMS Platform. Can we connect?"),
    faqs: [
      { q: "How quickly can I get started?", a: "Non-masking (numeric sender) accounts are activated within 2 hours. Masking requires BTRC approval which takes 3–7 business days." },
      { q: "What is the pricing?", a: "We offer competitive per-SMS pricing with volume discounts. Contact us on WhatsApp for the latest rate card." },
      { q: "Can I use the API for OTP in my app?", a: "Yes. Our OTP API delivers in under 3 seconds with a 99.9% delivery rate across all operators." },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
