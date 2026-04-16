"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  q: string;
  a: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-border", className)}>
      {items.map((item, i) => (
        <div key={i}>
          <button
            className="w-full flex items-center justify-between py-4 text-left gap-4 group"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-semibold text-ink group-hover:text-brand-blue transition-colors">
              {item.q}
            </span>
            <ChevronDown
              className={cn(
                "shrink-0 size-5 text-ink-muted transition-transform duration-300",
                open === i && "rotate-180 text-brand-blue"
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              open === i ? "max-h-96 pb-4" : "max-h-0"
            )}
          >
            <p className="text-ink-soft leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
