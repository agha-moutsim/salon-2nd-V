"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Soft trailing dot — very light spring so it feels natural
  const cursorX = useSpring(mouseX, { damping: 30, stiffness: 250, mass: 0.4 });
  const cursorY = useSpring(mouseY, { damping: 30, stiffness: 250, mass: 0.4 });

  useEffect(() => {
    // Only run on pointer (non-touch) devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX - 4);
      mouseY.set(e.clientY - 4);
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [mouseX, mouseY]);

  return (
    // Small gold trailing accent dot — default cursor is kept visible
    <motion.div
      className="fixed top-0 left-0 w-2 h-2 bg-[#F1E194] rounded-full pointer-events-none z-[9999] hidden md:block opacity-70"
      style={{ x: cursorX, y: cursorY }}
    />
  );
}
