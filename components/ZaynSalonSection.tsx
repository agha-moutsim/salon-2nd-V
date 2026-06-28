"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

export default function ZaynSalonSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isInView = useInView(containerRef, { margin: "1000px 0px" });
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Track scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Apply a physics-based spring to smooth out any jittery mouse wheel scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scale the text progressively to create the cinematic zoom effect.
  // Using an exponential curve makes the visual zooming speed feel constant and very smooth.
  const scale = useTransform(
    smoothProgress, 
    [0, 0.2, 0.4, 0.6, 0.8], 
    [1, 3, 10, 30, 100]
  );
  
  // To ensure the transition to the full grid is smooth, we fade out the 
  // solid mask overlay in the last 20% of the scroll.
  const overlayOpacity = useTransform(smoothProgress, [0.8, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-gradient-to-b from-[#2B0508] via-[#5B0E14] to-[#0D0102] text-white">
      {/* Sticky container holds the layout while we scroll through the 400vh section */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-transparent">
        
        {/* 
          Background Layer: Videos Grid 
          This is always rendering but initially hidden by the black overlay below.
        */}
        <div className="absolute inset-0 z-0 w-full h-full p-2 md:p-4 lg:p-6">
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-5 md:grid-rows-3 lg:grid-rows-2 gap-2 md:gap-4">
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-900 transform-gpu" style={{ transform: "translateZ(0)" }}>
              {isInView && <video src="https://res.cloudinary.com/dk5wfrjyt/video/upload/v1782665542/048A1859_ggx7kh.mp4" autoPlay loop muted playsInline preload="none" disableRemotePlayback className="absolute inset-0 w-full h-full object-cover" />}
            </div>
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-900 transform-gpu" style={{ transform: "translateZ(0)" }}>
              {isInView && <video src="https://res.cloudinary.com/dk5wfrjyt/video/upload/v1782665619/048A1871_udgbaw.mp4" autoPlay loop muted playsInline preload="none" disableRemotePlayback className="absolute inset-0 w-full h-full object-cover" />}
            </div>
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-900 transform-gpu" style={{ transform: "translateZ(0)" }}>
              {isInView && <video src="https://res.cloudinary.com/dk5wfrjyt/video/upload/v1782665645/048A1995_bbepfe.mp4" autoPlay loop muted playsInline preload="none" disableRemotePlayback className="absolute inset-0 w-full h-full object-cover" />}
            </div>
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-900 transform-gpu" style={{ transform: "translateZ(0)" }}>
              {isInView && <video src="https://res.cloudinary.com/dk5wfrjyt/video/upload/v1782665144/048A2080_p17kqt.mp4" autoPlay loop muted playsInline preload="none" disableRemotePlayback className="absolute inset-0 w-full h-full object-cover" />}
            </div>
            
            {/* The 5th video spans 2 columns on tablet and desktop to balance the grid beautifully */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-900 md:col-span-2 lg:col-span-2 transform-gpu" style={{ transform: "translateZ(0)" }}>
              {isInView && <video src="/salon-grid-5.mp4" autoPlay loop muted playsInline preload="none" disableRemotePlayback className="absolute inset-0 w-full h-full object-cover" />}
            </div>

          </div>
        </div>

        {/* 
          Foreground Layer: SVG Text Mask Overlay 
          This black overlay covers the screen. The SVG mask punches a transparent hole
          in the shape of the text, revealing the video grid underneath.
        */}
        <motion.div
          className="absolute inset-0 z-10 w-full h-full pointer-events-none"
          style={{ 
            opacity: overlayOpacity,
            willChange: "opacity" 
          }}
        >
          <svg width="100%" height="100%" className="w-full h-full">
            <defs>
              <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2B0508" />
                <stop offset="50%" stopColor="#5B0E14" />
                <stop offset="100%" stopColor="#0D0102" />
              </linearGradient>
              <mask id="text-mask">
                {/* 
                  The white rectangle represents the opaque part of the mask.
                  Everything drawn in white will remain visible (the gradient overlay).
                */}
                <rect width="100%" height="100%" fill="white" />
                
                {/* 
                  The black text represents the transparent hole in the mask.
                  This reveals the videos underneath. It is animated to scale up.
                */}
                <motion.text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="black"
                  className="font-bold tracking-tighter"
                  style={{
                    scale,
                    transformOrigin: "50% 50%",
                    fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
                    fontSize: isMobile ? "20vw" : "15vw",
                    willChange: "transform"
                  }}
                >
                  {isMobile ? (
                    <>
                      <tspan x="50%" dy="-0.6em">ZAYN&apos;S</tspan>
                      <tspan x="50%" dy="1.2em">SALON</tspan>
                    </>
                  ) : (
                    <tspan x="50%" dy="0">ZAYN&apos;S SALON</tspan>
                  )}
                </motion.text>
              </mask>
            </defs>
            
            {/* The solid gradient overlay that receives the mask */}
            <rect width="100%" height="100%" fill="url(#bg-gradient)" mask="url(#text-mask)" />
          </svg>
        </motion.div>
        
      </div>
    </section>
  );
}
