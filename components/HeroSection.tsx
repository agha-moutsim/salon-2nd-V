"use client";

import React from 'react';

interface HeroSectionProps {
  onBookClick: () => void;
}

export default function HeroSection({ onBookClick }: HeroSectionProps) {
  return (
    <section id="home" className="relative w-full h-[100dvh] bg-black">
      <video 
        src="https://github.com/agha-moutsim/salon-2nd-V/releases/download/untagged-f4327a45f27a3ef5e32c/hero%20vedio.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
        disableRemotePlayback
        className="absolute inset-0 w-full h-full object-cover transform-gpu"
        style={{ transform: "translateZ(0)" }}
      />
      
      {/* Overlay CTA Button */}
      <div className="absolute inset-x-0 bottom-[12%] sm:bottom-[15%] z-20 flex flex-col items-center justify-center pointer-events-none">
        <div className="pointer-events-auto relative group">
          {/* Ambient intense glow behind the button */}
          <div className="absolute -inset-[2px] bg-gradient-to-r from-[#F1E194] to-[#5B0E14] rounded-sm blur-[14px] opacity-30 group-hover:opacity-100 transition duration-700 animate-pulse"></div>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              onBookClick();
            }}
            className="relative overflow-hidden inline-flex items-center justify-center gap-4 bg-[#0D0102]/60 backdrop-blur-md border border-[#F1E194]/40 text-[#F1E194] text-[13px] sm:text-[15px] font-bold tracking-[0.3em] uppercase px-12 py-[22px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-2 hover:border-[#F1E194]"
            style={{
              WebkitMaskImage: 'radial-gradient(circle at 0 0, transparent 12px, black 13px), radial-gradient(circle at 100% 0, transparent 12px, black 13px), radial-gradient(circle at 0 100%, transparent 12px, black 13px), radial-gradient(circle at 100% 100%, transparent 12px, black 13px)',
              WebkitMaskPosition: 'top left, top right, bottom left, bottom right',
              WebkitMaskSize: '51% 51%',
              WebkitMaskRepeat: 'no-repeat',
              maskImage: 'radial-gradient(circle at 0 0, transparent 12px, black 13px), radial-gradient(circle at 100% 0, transparent 12px, black 13px), radial-gradient(circle at 0 100%, transparent 12px, black 13px), radial-gradient(circle at 100% 100%, transparent 12px, black 13px)',
              maskPosition: 'top left, top right, bottom left, bottom right',
              maskSize: '51% 51%',
              maskRepeat: 'no-repeat'
            }}
          >
            {/* Continuous Sweeping Light / Glare */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2 animate-shimmer" />
            
            {/* Hover Fill Sweep */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#F1E194] to-[#e6d070] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
            
            <span className="relative z-10 transition-colors duration-700 group-hover:text-[#5B0E14] drop-shadow-md">Book a Chair</span>
            
            <svg
              className="relative z-10 w-5 h-5 stroke-current fill-none stroke-2 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-2 group-hover:text-[#5B0E14]"
              viewBox="0 0 12 12"
            >
              <line x1="2" y1="10" x2="10" y2="2" strokeLinecap="round" />
              <polyline points="4,2 10,2 10,8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {/* Decorative Corner Dots */}
            <div className="absolute top-[6px] left-[6px] w-[3px] h-[3px] rounded-full bg-[#F1E194] opacity-40 group-hover:bg-[#5B0E14] group-hover:opacity-80 transition-colors duration-700"></div>
            <div className="absolute top-[6px] right-[6px] w-[3px] h-[3px] rounded-full bg-[#F1E194] opacity-40 group-hover:bg-[#5B0E14] group-hover:opacity-80 transition-colors duration-700"></div>
            <div className="absolute bottom-[6px] left-[6px] w-[3px] h-[3px] rounded-full bg-[#F1E194] opacity-40 group-hover:bg-[#5B0E14] group-hover:opacity-80 transition-colors duration-700"></div>
            <div className="absolute bottom-[6px] right-[6px] w-[3px] h-[3px] rounded-full bg-[#F1E194] opacity-40 group-hover:bg-[#5B0E14] group-hover:opacity-80 transition-colors duration-700"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
