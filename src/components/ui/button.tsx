"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, href, target, rel, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-button transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none";

    const variants = {
      primary: "bg-brand-red text-white hover:bg-brand-red-dark shadow-red hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
      secondary: "bg-brand-blue text-white hover:bg-brand-blue-dark shadow-blue hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
      outline: "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white",
      ghost: "text-ink-soft hover:text-brand-blue hover:bg-paper-2",
      white: "bg-white text-ink hover:bg-paper-2 shadow-sm hover:shadow-md hover:-translate-y-0.5",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    const cls = cn(base, variants[variant], sizes[size], className);

    if (href) {
      return (
        <a href={href} target={target} rel={rel} className={cls}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={cls} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
