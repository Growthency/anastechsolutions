import { cn } from "@/lib/utils";

interface SectionDividerProps {
  variant?: "wave" | "diagonal" | "blob" | "arrow" | "curve";
  color?: string;
  flip?: boolean;
  className?: string;
}

const paths = {
  wave: "M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,90.7C672,75,768,85,864,96C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
  diagonal: "M0,160L1440,0L1440,320L0,320Z",
  blob: "M0,160L60,176C120,192,240,224,360,218.7C480,213,600,171,720,165.3C840,160,960,192,1080,197.3C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
  arrow: "M0,192L720,64L1440,192L1440,320L0,320Z",
  curve: "M0,256L120,240C240,224,480,192,720,192C960,192,1200,224,1320,240L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z",
};

export function SectionDivider({
  variant = "wave",
  color = "#F7F8FB",
  flip = false,
  className,
}: SectionDividerProps) {
  return (
    <div
      className={cn("w-full overflow-hidden leading-none", flip && "-scale-y-100", className)}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-24"
      >
        <path fill={color} fillOpacity="1" d={paths[variant]} />
      </svg>
    </div>
  );
}
