"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

const directionMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  const initial = { opacity: 0, ...directionMap[direction] };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: initial,
        visible: { opacity: 1, x: 0, y: 0 },
      }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerRevealProps {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
  direction?: "up" | "left" | "none";
}

export function StaggerReveal({
  children,
  className,
  itemClassName,
  staggerDelay = 0.1,
  direction = "up",
}: StaggerRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: staggerDelay },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, ...directionMap[direction] },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children.map((child, i) => (
        <motion.div key={i} className={cn(itemClassName)} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
