"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "motion/react";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-3, 3]);

  // Adjust wrap bounds based on how many duplicates we have
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax overflow-hidden flex whitespace-nowrap flex-nowrap m-0 leading-[0.9]">
      <motion.div className="scroller flex whitespace-nowrap flex-nowrap items-center font-black uppercase text-[clamp(60px,10vw,140px)] tracking-tight text-[#5B0E14] opacity-50" style={{ x, skewX: skewVelocity, fontFamily: 'var(--font-playfair)' }}>
        <span className="block mr-10">{children}</span>
        <span className="block mr-10">{children}</span>
        <span className="block mr-10">{children}</span>
        <span className="block mr-10">{children}</span>
        <span className="block mr-10">{children}</span>
        <span className="block mr-10">{children}</span>
        <span className="block mr-10">{children}</span>
        <span className="block mr-10">{children}</span>
      </motion.div>
    </div>
  );
}

export default function ScrollVelocityMarquee() {
  return (
    <section className="bg-[#0D0102] py-16 sm:py-24 overflow-hidden relative z-10">
      {/* Top and Bottom Fade Overlays for blend */}
      <div className="absolute top-0 left-0 w-full h-[80px] bg-gradient-to-b from-[#0D0102] to-transparent z-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-[80px] bg-gradient-to-t from-[#0D0102] to-transparent z-20 pointer-events-none"></div>
      
      <div className="flex flex-col gap-2">
        <ParallaxText baseVelocity={-1.5}>
          <span className="text-[#F1E194] opacity-20">ZAYN&apos;S SALON</span> — PREMIUM GROOMING — <span className="text-white opacity-10">LUXURY STUDIO</span> —
        </ParallaxText>
        <ParallaxText baseVelocity={1.5}>
          AWARD WINNING EXPERIENCE — <span className="text-[#F1E194] opacity-20" style={{ WebkitTextStroke: "1px #F1E194", color: "transparent" }}>THE FINEST GENTLEMEN</span> —
        </ParallaxText>
      </div>
    </section>
  );
}
