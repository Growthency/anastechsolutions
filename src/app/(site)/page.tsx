import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProductsShowcase } from "@/components/sections/ProductsShowcase";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionDivider } from "@/components/effects/SectionDivider";

export const metadata: Metadata = {
  title: { absolute: "AnasTech Solutions — Digital Agency Bangladesh" },
  description:
    "Enterprise websites, software, mobile apps, bulk SMS & call center solutions. Trusted by 80+ businesses in 10+ countries. Chat with us on WhatsApp.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider variant="wave" color="#F7F8FB" />
      <TrustedBy />
      <SectionDivider variant="diagonal" color="#FFFFFF" flip />
      <ServicesGrid />
      <SectionDivider variant="curve" color="#F7F8FB" />
      <ProductsShowcase />
      <SectionDivider variant="blob" color="#F7F8FB" />
      <HowWeWork />
      <Stats />
      <SectionDivider variant="wave" color="#FFFFFF" flip />
      <Testimonials />
      <SectionDivider variant="diagonal" color="#F7F8FB" />
      <BlogPreview />
      <SectionDivider variant="curve" color="#0B0B0F" />
      <CtaBand />
    </>
  );
}
