"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle, ChevronDown } from "lucide-react";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { TypeWriter } from "@/components/effects/TypeWriter";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { WA_LINKS } from "@/lib/utils";

const floatingCards = [
  {
    id: "code",
    label: "Clean Code",
    sub: "Next.js + TypeScript",
    icon: "💻",
    color: "#0F75BC",
    rotate: -6,
    x: "5%",
    y: "8%",
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    sub: "iOS & Android",
    icon: "📱",
    color: "#ED1C24",
    rotate: 5,
    x: "55%",
    y: "5%",
  },
  {
    id: "analytics",
    label: "Analytics",
    sub: "Real-time insights",
    icon: "📊",
    color: "#0F75BC",
    rotate: -4,
    x: "10%",
    y: "55%",
  },
  {
    id: "sms",
    label: "Bulk SMS",
    sub: "98% delivery rate",
    icon: "💬",
    color: "#ED1C24",
    rotate: 6,
    x: "60%",
    y: "60%",
  },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-paper"
      aria-label="Hero"
    >
      {/* Background effects */}
      <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true">
        {/* Radial fade */}
        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-paper" />
      </div>

      <GradientBlob color="blue" size="xl" className="-top-32 -left-32" opacity={0.07} />
      <GradientBlob color="red" size="lg" className="-top-16 right-0" opacity={0.05} />
      <GradientBlob color="blue" size="md" className="bottom-0 left-1/3" opacity={0.06} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text */}
          <motion.div style={{ y, opacity }} className="relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-brand-red/8 border border-brand-red/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-brand-red text-sm font-semibold">Building Digital Futures</span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-ink leading-[1.05] tracking-tight mb-4"
            >
              We Build{" "}
              <span className="block">
                <TypeWriter
                  words={["Websites", "Software", "Solutions", "Mobile Apps"]}
                  className="gradient-text"
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-ink-soft leading-relaxed mb-8 max-w-xl"
            >
              From code to cloud — AnasTech delivers enterprise solutions that scale. Trusted by 80+ businesses across Bangladesh and 10+ countries.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton>
                <a
                  href={WA_LINKS.general}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-red text-white px-7 py-3.5 rounded-button font-semibold hover:bg-brand-red-dark transition-all duration-200 shadow-red hover:shadow-lg hover:-translate-y-0.5"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp Us
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="/services"
                  className="inline-flex items-center gap-2 border-2 border-brand-blue text-brand-blue px-7 py-3.5 rounded-button font-semibold hover:bg-brand-blue hover:text-white transition-all duration-200"
                >
                  Our Services
                  <ArrowRight className="size-4" />
                </a>
              </MagneticButton>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-8 mt-10 pt-10 border-t border-border"
            >
              {[
                { value: "150+", label: "Projects" },
                { value: "80+", label: "Clients" },
                { value: "10+", label: "Countries" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-mono text-2xl font-bold text-brand-blue">{stat.value}</div>
                  <div className="text-sm text-ink-muted">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[420px] lg:h-[520px] hidden lg:block"
          >
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.id}
                className="absolute bg-white rounded-2xl p-4 shadow-card border border-border cursor-default"
                style={{
                  left: card.x,
                  top: card.y,
                  rotate: card.rotate,
                  width: 160,
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.04, rotate: 0 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-2"
                  style={{ backgroundColor: card.color + "15" }}
                >
                  {card.icon}
                </div>
                <p className="font-semibold text-ink text-sm">{card.label}</p>
                <p className="text-ink-muted text-xs mt-0.5">{card.sub}</p>
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl"
                  style={{ backgroundColor: card.color }}
                />
              </motion.div>
            ))}

            {/* Center decorative element */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-brand-blue to-brand-red flex items-center justify-center shadow-blue">
                  <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
                    <polygon points="20,2 38,34 2,34" fill="white" opacity="0.9" />
                    <polygon points="20,10 35,36 5,36" fill="white" opacity="0.6" />
                  </svg>
                </div>
                {/* Orbit rings */}
                <div className="absolute inset-[-24px] rounded-full border border-brand-blue/20 animate-spin" style={{ animationDuration: "8s" }} />
                <div className="absolute inset-[-48px] rounded-full border border-brand-red/10 animate-spin" style={{ animationDuration: "14s", animationDirection: "reverse" }} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs text-ink-muted font-medium">Scroll to explore</span>
        <ChevronDown className="size-4 text-ink-muted" />
      </motion.div>
    </section>
  );
}
