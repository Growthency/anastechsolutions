import { cn } from "@/lib/utils";

interface MarqueeStripProps {
  items: React.ReactNode[];
  direction?: "left" | "right";
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

export function MarqueeStrip({ items, direction = "left", className }: MarqueeStripProps) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className={cn("overflow-hidden relative", className)}>
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-paper to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-paper to-transparent z-10 pointer-events-none" />

      <div
        className={cn(
          "flex gap-8 w-max",
          direction === "left" ? "marquee-left" : "marquee-right"
        )}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
