"use client";

import { cn } from "@/lib/utils";

interface GradientBlobProps {
  color?: "blue" | "red" | "mixed";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  opacity?: number;
}

const sizes = {
  sm: "w-48 h-48",
  md: "w-72 h-72",
  lg: "w-96 h-96",
  xl: "w-[600px] h-[600px]",
};

const colors = {
  blue: "bg-brand-blue",
  red: "bg-brand-red",
  mixed: "bg-gradient-to-br from-brand-blue to-brand-red",
};

export function GradientBlob({ color = "blue", size = "lg", className, opacity = 0.08 }: GradientBlobProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full blur-3xl pointer-events-none blob",
        sizes[size],
        colors[color],
        className
      )}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
