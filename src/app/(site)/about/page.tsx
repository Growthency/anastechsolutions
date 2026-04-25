import type { Metadata } from "next";
import { MessageCircle, Users, Globe, Award, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { SectionDivider } from "@/components/effects/SectionDivider";
import { CountUp } from "@/components/effects/CountUp";
import { CtaBand } from "@/components/sections/CtaBand";
import { team, timeline } from "@/lib/data/team";
import { WA_LINKS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about AnasTech Solutions — our story, mission, values, and the team behind Bangladesh's leading digital agency.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | AnasTech Solutions",
    description: "Learn about AnasTech Solutions — our story, mission, values, and the team behind Bangladesh's leading digital agency.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | AnasTech Solutions",
    description: "Learn about AnasTech Solutions — our story, mission, values, and the team behind Bangladesh's leading digital agency.",
  },
};

const values = [
  { icon: Award, title: "Excellence", description: "We don't ship until it's great. Every line of code, every pixel, every interaction is held to the highest standard.", color: "#0F75BC" },
  { icon: Heart, title: "Client First", description: "Your success is our success. We treat every project like it's our own business on the line.", color: "#ED1C24" },
  { icon: Globe, title: "Impact", description: "We build things that matter — software that helps businesses grow, communities thrive, and people live better lives.", color: "#0F75BC" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-paper overflow-hidden">
        <GradientBlob color="blue" size="xl" className="-top-32 -left-32" opacity={0.06} />
        <GradientBlob color="red" size="md" className="top-0 right-0" opacity={0.04} />
        <div className="dot-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="text-brand-blue text-sm font-semibold uppercase tracking-widest mb-3">Our Story</p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-ink mb-5">
              Building Digital Futures <span className="gradient-text">Since 2018</span>
            </h1>
            <p className="text-ink-soft text-lg leading-relaxed">
              From a small team in Dhaka with a big vision — we've grown into a full-service digital agency serving businesses across Bangladesh and 10+ countries worldwide.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider variant="wave" color="#F7F8FB" />

      {/* Stats */}
      <section className="py-16 bg-paper-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 150, suffix: "+", label: "Projects Delivered" },
              { value: 80, suffix: "+", label: "Happy Clients" },
              { value: 10, suffix: "+", label: "Countries Served" },
              { value: 5, suffix: "+", label: "Years of Excellence" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1} className="text-center">
                <div className="font-mono text-4xl lg:text-5xl font-bold text-brand-red mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-ink-soft text-sm font-medium">{stat.label}</div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-pad bg-paper">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            <ScrollReveal>
              <div className="bg-gradient-to-br from-brand-blue/8 to-brand-blue/4 border border-brand-blue/20 rounded-2xl p-8 h-full">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/15 flex items-center justify-center mb-5">
                  <span className="text-2xl">🎯</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-ink mb-3">Our Mission</h2>
                <p className="text-ink-soft leading-relaxed">
                  To democratize access to world-class digital solutions for businesses in Bangladesh and emerging markets — so that every entrepreneur, regardless of size, can compete on a global stage with powerful technology behind them.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="bg-gradient-to-br from-brand-red/8 to-brand-red/4 border border-brand-red/20 rounded-2xl p-8 h-full">
                <div className="w-12 h-12 rounded-2xl bg-brand-red/15 flex items-center justify-center mb-5">
                  <span className="text-2xl">🌟</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-ink mb-3">Our Vision</h2>
                <p className="text-ink-soft leading-relaxed">
                  To be the most trusted technology partner for businesses across South Asia and beyond — known for delivering solutions that don't just work, but genuinely transform how our clients operate and grow.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-paper-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-ink mb-3">Our Values</h2>
            <p className="text-ink-soft">The principles that guide every decision we make.</p>
          </ScrollReveal>
          <div className="grid lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <ScrollReveal key={v.title} delay={i * 0.1}>
                  <div className="bg-paper border border-border rounded-2xl p-7 text-center hover:shadow-card hover:-translate-y-1 transition-all duration-300">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: v.color + "15" }}>
                      <Icon className="size-7" style={{ color: v.color }} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-ink mb-3">{v.title}</h3>
                    <p className="text-ink-soft text-sm leading-relaxed">{v.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad bg-paper">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-ink mb-3">Our Journey</h2>
            <p className="text-ink-soft">From a small office in Dhaka to clients across 10 countries.</p>
          </ScrollReveal>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-blue via-brand-red to-brand-blue" aria-hidden="true" />
            <div className="flex flex-col gap-10">
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <ScrollReveal key={item.year} delay={i * 0.08}>
                    <div className={`flex gap-6 lg:gap-0 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"} items-center`}>
                      {/* Content */}
                      <div className={`flex-1 ${isLeft ? "lg:pr-12 lg:text-right" : "lg:pl-12"}`}>
                        <div className="bg-paper-2 border border-border rounded-2xl p-5 hover:border-brand-blue/30 hover:shadow-card transition-all">
                          <span className="font-mono font-bold text-brand-blue text-sm">{item.year}</span>
                          <h3 className="font-display font-bold text-ink text-lg mt-1 mb-1">{item.title}</h3>
                          <p className="text-ink-soft text-sm">{item.description}</p>
                        </div>
                      </div>
                      {/* Dot */}
                      <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full border-4 border-white flex items-center justify-center font-mono text-xs font-bold text-white shadow-md"
                        style={{ backgroundColor: i % 2 === 0 ? "#0F75BC" : "#ED1C24" }}>
                        {item.year.slice(-2)}
                      </div>
                      {/* Spacer for opposite side */}
                      <div className="hidden lg:block flex-1" />
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad bg-paper-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-ink mb-3">Meet the Team</h2>
            <p className="text-ink-soft">The people behind every project we build.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.08}>
                <div className="group bg-paper border border-border rounded-2xl p-6 text-center hover:border-brand-blue/30 hover:shadow-card hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
                  {/* Avatar */}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-display font-bold text-2xl shadow-md"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.initials}
                  </div>
                  <h3 className="font-display font-bold text-ink text-lg mb-0.5">{member.name}</h3>
                  <p className="text-sm font-medium mb-3" style={{ color: member.color }}>{member.role}</p>
                  <p className="text-ink-muted text-sm leading-relaxed">{member.bio}</p>

                  {/* Social links overlay */}
                  <div className="absolute inset-0 bg-paper/95 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                    {member.socials.linkedin && (
                      <a href={member.socials.linkedin} aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-[#0077B5]/15 hover:bg-[#0077B5] hover:text-white text-[#0077B5] flex items-center justify-center transition-colors">
                        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                      </a>
                    )}
                    {member.socials.github && (
                      <a href={member.socials.github} aria-label="GitHub" className="w-10 h-10 rounded-full bg-ink/10 hover:bg-ink hover:text-white text-ink flex items-center justify-center transition-colors">
                        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a href={member.socials.twitter} aria-label="Twitter" className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2] hover:text-white text-[#1DA1F2] flex items-center justify-center transition-colors">
                        <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="curve" color="#0B0B0F" />
      <CtaBand />
    </>
  );
}
