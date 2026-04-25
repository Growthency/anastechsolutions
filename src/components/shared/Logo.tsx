import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

/**
 * AnasTech Solutions brand logo.
 * Uses /public/newlogo.png served via next/image.
 */
export function Logo({ size = 36, className, priority = false }: LogoProps) {
  return (
    <Image
      src="/newlogo.png"
      alt="AnasTech Solutions"
      width={size}
      height={size}
      priority={priority}
      className={cn("object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}
