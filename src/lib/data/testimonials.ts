export interface Testimonial {
  name: string;
  role: string;
  company: string;
  country: string;
  content: string;
  rating: number;
  rotation: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Rafiqul Islam",
    role: "CEO",
    company: "DigitalBD Commerce",
    country: "Bangladesh",
    content: "AnasTech delivered our e-commerce platform in just 3 weeks. The design quality is exceptional — our conversion rate increased by 42% after launch. Highly recommend!",
    rating: 5,
    rotation: -1.5,
  },
  {
    name: "Sarah Mitchell",
    role: "Operations Manager",
    company: "GreenLeaf Logistics",
    country: "UK",
    content: "The custom ERP they built for us replaced 5 different tools. Our team saves 20+ hours a week on manual work. Best investment we made this year.",
    rating: 5,
    rotation: 1.2,
  },
  {
    name: "Abdullah Al-Rashid",
    role: "Director",
    company: "Masjid Al-Noor",
    country: "UAE",
    content: "Khdimatul Ummah transformed how we manage our community. Donation tracking is now transparent and donors love the reports. JazakAllah Khair to the team.",
    rating: 5,
    rotation: -0.8,
  },
  {
    name: "Tanvir Hossain",
    role: "Founder",
    company: "ShopBD",
    country: "Bangladesh",
    content: "Our Android app was built in 10 weeks and now has 50,000+ downloads. AnasTech's attention to UI detail is world-class. The app feels like a premium product.",
    rating: 5,
    rotation: 2.0,
  },
  {
    name: "Dr. Nazma Begum",
    role: "Medical Director",
    company: "Lifeline Hospital",
    country: "Bangladesh",
    content: "Hospital Care has completely digitized our patient records. Billing errors dropped to near zero and our staff love the intuitive interface. Outstanding work.",
    rating: 5,
    rotation: -1.8,
  },
  {
    name: "Karim Ouedraogo",
    role: "Marketing Head",
    company: "AfriTech Solutions",
    country: "Burkina Faso",
    content: "We use AnasTech's bulk SMS platform for all our marketing campaigns. 95% delivery rate, real-time reports, and excellent API documentation. 10/10.",
    rating: 5,
    rotation: 0.9,
  },
  {
    name: "Sumaiya Rahman",
    role: "HR Director",
    company: "BuildCore BD",
    country: "Bangladesh",
    content: "eBusiness manages our 200-employee payroll flawlessly. The VAT reports alone save us 3 days every month. The AnasTech team is responsive and professional.",
    rating: 5,
    rotation: -2.1,
  },
];
