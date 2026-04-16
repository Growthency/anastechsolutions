"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(hover: none)").matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    const onMouseEnterInteractive = () => {
      if (dotRef.current) dotRef.current.style.cssText += "width:12px;height:12px;background:var(--brand-blue);";
      if (ringRef.current) ringRef.current.style.cssText += "width:52px;height:52px;border-color:var(--brand-red);";
    };

    const onMouseLeaveInteractive = () => {
      if (dotRef.current) dotRef.current.style.cssText += "width:8px;height:8px;background:var(--brand-red);";
      if (ringRef.current) ringRef.current.style.cssText += "width:36px;height:36px;border-color:var(--brand-blue);";
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    animate();

    const interactives = document.querySelectorAll("a, button, [data-cursor-hover]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring hidden md:block" aria-hidden="true" />
    </>
  );
}
