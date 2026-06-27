"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

type ServiceTier = "s" | "l" | "sr";
type PriceEntry = {
  d?: number | string;
  s?: number | string;
  l?: number | string;
  sr?: number | string;
};

type StandardService = { n: string; p: PriceEntry };
type PackageService = { t: string; inc: string[]; pr: Record<string, number> };

export type Category = {
  id: string;
  num: string;
  title: string;
  type: "tiered" | "standard" | "package";
  note?: string;
  services?: StandardService[];
  packages?: PackageService[];
};

const CATS: Category[] = [
  {
    id: "haircut",
    num: "01",
    title: "Haircut & Beard",
    type: "tiered",
    note: "Prices shown per session.",
    services: [
      { n: "Undercut", p: { s: 700, l: 1000, sr: 1500 } },
      { n: "Simple / Fade Cut", p: { s: 1200, l: 1800, sr: 2500 } },
      { n: "Razor Cut", p: { s: 1500, l: 2000, sr: 3000 } },
      { n: "Express Haircut Detailing", p: { s: 800, l: 1000, sr: 1500 } },
      { n: "Beard", p: { s: 500, l: 800, sr: 1000 } },
      { n: "Threading", p: { s: "—", l: 300, sr: 500 } },
      { n: "Makeup", p: { s: "—", l: 2500, sr: 3500 } },
    ],
  },
  {
    id: "styling",
    num: "02",
    title: "Styling",
    type: "tiered",
    note: "Head Wash add-on: +PKR 200.",
    services: [
      { n: "Styling", p: { s: 500, l: 800, sr: 1000 } },
      { n: "Beard Styling", p: { s: 500, l: 800, sr: 1000 } },
      { n: "Hair Straightening", p: { s: 1000, l: 1500, sr: 2000 } },
      { n: "Fiber Application", p: { s: 800, l: 1000, sr: 1200 } },
      { n: "Head Wash", p: { d: 200 } },
    ],
  },
  {
    id: "facial",
    num: "03",
    title: "Facial Services",
    type: "standard",
    services: [
      { n: "Janssen Plus", p: { d: 10000 } },
      { n: "Janssen", p: { d: 8000 } },
      { n: "Hydra", p: { d: 7000 } },
      { n: "Dermacos", p: { d: 6000 } },
      { n: "Charcoal", p: { d: 5000 } },
      { n: "Dr. Shazil", p: { d: 4500 } },
      { n: "Deep Cleansing", p: { d: 2000 } },
      { n: "Cleansing", p: { d: 1000 } },
      { n: "Charcoal Mask", p: { d: 1000 } },
      { n: "Face Polisher", p: { d: 1000 } },
      { n: "Nose Strip", p: { d: 700 } },
    ],
  },
  {
    id: "body",
    num: "04",
    title: "Body Care",
    type: "standard",
    services: [
      { n: "Full Body Scrub", p: { d: 6000 } },
      { n: "Full Body Polisher", p: { d: 4000 } },
      { n: "Body Massage 20 Min", p: { d: 2000 } },
      { n: "Body Massage 40 Min", p: { d: 3000 } },
      { n: "Body Massage 60 Min", p: { d: 4000 } },
      { n: "Head Massage 15 Min", p: { d: 500 } },
      { n: "Back & Shoulder Massage", p: { d: 1000 } },
      { n: "Head, Back & Shoulder", p: { d: 1500 } },
      { n: "Foot Massage 15 Min", p: { d: 1000 } },
      { n: "Half Leg Massage", p: { d: 1000 } },
      { n: "Full Leg Massage", p: { d: 1500 } },
    ],
  },
  {
    id: "hair",
    num: "05",
    title: "Hair Treatments",
    type: "standard",
    services: [
      { n: "Hair Mask", p: { d: 1500 } },
      { n: "Hair Mask w/ Oil (Dandruff)", p: { d: 2000 } },
      { n: "Hair Mask Plus (Damaged)", p: { d: 2500 } },
      { n: "Protein Treatment (Frizzy)", p: { d: 3000 } },
      { n: "Hair Streaking", p: { d: 7000 } },
      { n: "Hair Polish", p: { d: 2500 } },
      { n: "Beard Colour", p: { d: 1000 } },
      { n: "Keratin Straightening", p: { d: 10000 } },
      { n: "Hair Perming", p: { d: 10000 } },
      { n: "Colour Application", p: { d: 1000 } },
      { n: "Hair Colour (Freecia/Keune/L'Oréal)", p: { d: 3500 } },
      { n: "Fashion Colour", p: { d: 10000 } },
    ],
  },
  {
    id: "waxing",
    num: "06",
    title: "Waxing / Hair Removal",
    type: "standard",
    services: [
      { n: "Full Body", p: { d: 12000 } },
      { n: "Half Body", p: { d: 6000 } },
      { n: "Full Legs", p: { d: 6000 } },
      { n: "Half Legs", p: { d: 4000 } },
      { n: "Face", p: { d: 1000 } },
      { n: "Ears", p: { d: 500 } },
      { n: "Nose", p: { d: 500 } },
    ],
  },
  {
    id: "mani",
    num: "07",
    title: "Manicure & Pedicure",
    type: "standard",
    services: [
      { n: "Manicure & Pedicure", p: { d: 4500 } },
      { n: "Manicure", p: { d: 2500 } },
      { n: "Pedicure", p: { d: 2500 } },
      { n: "Nail Cut & Buff", p: { d: 1500 } },
      { n: "Nail Cut", p: { d: 1000 } },
    ],
  },
  {
    id: "pkgs",
    num: "08",
    title: "Grooming Packages",
    type: "package",
    note: "Prices vary by facial product chosen.",
    packages: [
      {
        t: "Express Self Care",
        inc: ["Hair Cut", "Beard", "Styling", "Face Cleansing (2 Steps)"],
        pr: { s: 2500, c: 3000, d: 3500, h: 4000, j: 5500 },
      },
      {
        t: "Self Care Package 01",
        inc: ["Hair Cut", "Beard", "Styling", "Facial"],
        pr: { s: 4500, c: 5000, d: 6500, h: 8500, j: 10000 },
      },
      {
        t: "Full Grooming Package",
        inc: [
          "Hair Cut",
          "Beard",
          "Styling",
          "Facial",
          "Mani + Pedi",
          "Hair Treatment",
          "Head & Shoulder Massage",
          "Head Massage",
        ],
        pr: { s: 8500, c: 10000, d: 11500, h: 13500, j: 15000 },
      },
    ],
  },
];

const PL: Record<string, string> = {
  s: "Dr. Shazil",
  c: "Charcoal",
  d: "Dermacos",
  h: "Hydra",
  j: "Janssen",
};

function getMinPrice(cat: Category): number {
  if (cat.type === "package" && cat.packages) {
    let m = Infinity;
    cat.packages.forEach((p) =>
      Object.values(p.pr).forEach((v) => {
        if (v < m) m = v;
      })
    );
    return m;
  }
  let m = Infinity;
  if (cat.services) {
    cat.services.forEach((s) => {
      Object.values(s.p).forEach((v) => {
        if (typeof v === "number" && v < m) m = v;
      });
    });
  }
  return m === Infinity ? 0 : m;
}

const ArrowIcon = ({ className = "stroke-[#F1E194]" }: { className?: string }) => (
  <svg viewBox="0 0 12 12" className={`w-3 h-3 fill-none stroke-2 transition-transform duration-300 ${className}`}>
    <line x1="2" y1="10" x2="10" y2="2" strokeLinecap="round" />
    <polyline points="4,2 10,2 10,8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 16 16" className="w-full h-full stroke-[#F1E194]/35 fill-none stroke-[1.5px] shrink-0">
    <polyline points="5,7 8,10 11,7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 14 14" className="w-[14px] h-[14px] stroke-[#F1E194] fill-none stroke-2">
    <line x1="1" y1="1" x2="13" y2="13" strokeLinecap="round" />
    <line x1="13" y1="1" x2="1" y2="13" strokeLinecap="round" />
  </svg>
);

import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  const [activeCat, setActiveCat] = useState<Category | null>(null);
  const [activeTier, setActiveTier] = useState<ServiceTier>("s");

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeCat) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeCat]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCat(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openModal = (cat: Category) => {
    setActiveTier("s");
    setActiveCat(cat);
  };

  const closeModal = () => {
    setActiveCat(null);
  };

  return (
    <main>
      {/* Hero Video */}
      <section className="relative w-full h-[100dvh] bg-black">
        <video 
          src="/hero-vedio.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        />
      </section>

      <section className="bg-gradient-to-b from-[#2B0508] via-[#5B0E14] to-[#0D0102] text-[#E8D9C0] py-[70px] pb-[90px] relative font-poppins min-h-screen">
        <div className="text-center mb-[70px] px-5">
        <p className="text-[10px] font-medium tracking-[0.35em] text-[#F1E194] uppercase mb-[18px] opacity-65">
          Premium Grooming Studio
        </p>
        <h2 
          className="text-[clamp(36px,8vw,68px)] font-black uppercase tracking-normal leading-[0.92] text-white"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Our <em className="not-italic text-[#F1E194]" style={{ WebkitTextStroke: "1px #F1E194" }}>Services</em>
        </h2>
        <p className="text-[12px] font-light tracking-[0.18em] text-[#F1E194] mt-[18px] uppercase opacity-55">
          Crafted for the discerning gentleman
        </p>
        <div className="w-[50px] h-[1px] bg-[#F1E194] mx-auto mt-[22px] opacity-40"></div>
      </div>

      <div className="px-4 max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {CATS.map((cat) => {
             const mn = getMinPrice(cat);
             const fr = mn > 0 ? `From PKR ${mn.toLocaleString()}` : "Custom Packages";

             return (
               <div
                 key={cat.id}
                 onClick={() => openModal(cat)}
                 className="relative bg-[#F1E194] cursor-pointer max-w-[240px] sm:max-w-none w-full mx-auto min-h-[220px] sm:min-h-[320px] flex flex-col justify-center items-center text-center p-6 sm:p-8 transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(43,5,8,0.5)] group"
                 style={{
                   WebkitMaskImage: 'radial-gradient(circle at 0 0, transparent 20px, black 21px), radial-gradient(circle at 100% 0, transparent 20px, black 21px), radial-gradient(circle at 0 100%, transparent 20px, black 21px), radial-gradient(circle at 100% 100%, transparent 20px, black 21px)',
                   WebkitMaskPosition: 'top left, top right, bottom left, bottom right',
                   WebkitMaskSize: '51% 51%',
                   WebkitMaskRepeat: 'no-repeat',
                   maskImage: 'radial-gradient(circle at 0 0, transparent 20px, black 21px), radial-gradient(circle at 100% 0, transparent 20px, black 21px), radial-gradient(circle at 0 100%, transparent 20px, black 21px), radial-gradient(circle at 100% 100%, transparent 20px, black 21px)',
                   maskPosition: 'top left, top right, bottom left, bottom right',
                   maskSize: '51% 51%',
                   maskRepeat: 'no-repeat'
                 }}
               >
                 {/* Modern Fast Red Hover Fill */}
                 <div className="absolute inset-0 bg-[#5B0E14] origin-bottom scale-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-y-100"></div>
                
                 <div className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center transition-all duration-[400ms] z-10 group-hover:-rotate-45">
                   <ArrowIcon className="stroke-[#5B0E14] group-hover:stroke-[#F1E194] transition-colors duration-[400ms]" />
                 </div>
                 
                 <div className="relative z-10 flex flex-col items-center justify-center w-full">
                   <div className="text-[10px] font-semibold tracking-[0.3em] text-[#5B0E14] mb-[12px] uppercase opacity-90 transition-colors duration-[400ms] group-hover:text-[#F1E194]">
                     {cat.num}
                   </div>
                   <div 
                     className="text-[clamp(24px,3vw,34px)] font-black uppercase tracking-normal text-[#5B0E14] leading-[1.1] mb-[16px] transition-colors duration-[400ms] group-hover:text-white"
                     style={{ fontFamily: 'var(--font-playfair)' }}
                   >
                     {cat.title}
                   </div>
                   <div className="text-[11px] font-medium tracking-[0.18em] text-[#5B0E14]/70 uppercase transition-colors duration-[400ms] group-hover:text-[#F1E194]/80">
                     {fr}
                   </div>
                 </div>
               </div>
             );
           })}
        </div>
      </div>

      {/* Modal Overlay via AnimatePresence */}
      <AnimatePresence>
        {activeCat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 bg-[#050203]/[0.78] z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ y: 18, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 18, scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="bg-[#120709] border border-[#F1E194]/15 w-full max-w-[640px] relative max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-7 pb-5 border-b border-[#5B0E14]/35 shrink-0">
                <p className="text-[9px] font-semibold tracking-[0.35em] text-[#5B0E14] uppercase mb-[10px]">
                  {activeCat.title}
                </p>
                <h3 className="text-[clamp(22px,5vw,36px)] font-extrabold uppercase tracking-[-0.01em] text-white leading-none">
                  Our Services
                </h3>
                <button
                  onClick={closeModal}
                  aria-label="Close"
                  className="absolute top-5 right-5 w-9 h-9 border border-[#F1E194]/20 bg-transparent cursor-pointer flex items-center justify-center transition-all duration-250 p-0 hover:border-[#F1E194] hover:bg-[#F1E194]/[0.08]"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Tier Switcher (If Applicable) */}
              {activeCat.type === "tiered" && (
                <div className="flex mx-7 mt-4 border border-[#5B0E14]/50 overflow-hidden shrink-0">
                  <button
                    onClick={() => setActiveTier("s")}
                    className={`flex-1 py-[9px] px-[6px] text-[9px] font-semibold tracking-[0.2em] uppercase border-none transition-all duration-200 font-poppins ${
                      activeTier === "s"
                        ? "bg-[#5B0E14] text-[#F1E194]"
                        : "bg-transparent text-[#F1E194]/40 hover:bg-[#5B0E14]/35 hover:text-[#F1E194]/75"
                    }`}
                  >
                    Stylist
                  </button>
                  <button
                    onClick={() => setActiveTier("l")}
                    className={`flex-1 py-[9px] px-[6px] text-[9px] font-semibold tracking-[0.2em] uppercase border-none transition-all duration-200 font-poppins ${
                      activeTier === "l"
                        ? "bg-[#5B0E14] text-[#F1E194]"
                        : "bg-transparent text-[#F1E194]/40 hover:bg-[#5B0E14]/35 hover:text-[#F1E194]/75"
                    }`}
                  >
                    Lead Stylist
                  </button>
                  <button
                    onClick={() => setActiveTier("sr")}
                    className={`flex-1 py-[9px] px-[6px] text-[9px] font-semibold tracking-[0.2em] uppercase border-none transition-all duration-200 font-poppins ${
                      activeTier === "sr"
                        ? "bg-[#5B0E14] text-[#F1E194]"
                        : "bg-transparent text-[#F1E194]/40 hover:bg-[#5B0E14]/35 hover:text-[#F1E194]/75"
                    }`}
                  >
                    Senior
                  </button>
                </div>
              )}

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#5B0E14]/60">
                {activeCat.type === "tiered" && (
                  <div className="p-3 px-7 pb-7">
                    {activeCat.services?.map((s, idx) => {
                      const v = s.p.d !== undefined ? s.p.d : s.p[activeTier as keyof typeof s.p];
                      const na = v === "—" || v === undefined;
                      const priceStr = na ? "N/A" : `From PKR ${Number(v).toLocaleString()}`;
                      return (
                        <div key={idx} className="flex items-center justify-between py-[14px] border-b border-[#5B0E14]/[0.22] gap-4 cursor-default last:border-b-0">
                          <span className="text-[12px] font-normal tracking-[0.08em] uppercase text-[#C4A882] flex-1">
                            {s.n}
                          </span>
                          <span className="flex items-center gap-[10px]">
                            <span className={`text-[12px] uppercase whitespace-nowrap tracking-[0.05em] ${na ? "text-[#F1E194]/20 font-light" : "font-semibold text-[#F1E194]"}`}>
                              {priceStr}
                            </span>
                            <span className="w-4 h-4 shrink-0">
                              <ChevronIcon />
                            </span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {activeCat.type === "standard" && (
                  <div className="p-3 px-7 pb-7">
                    {activeCat.services?.map((s, idx) => {
                      const v = s.p.d;
                      return (
                        <div key={idx} className="flex items-center justify-between py-[14px] border-b border-[#5B0E14]/[0.22] gap-4 cursor-default last:border-b-0">
                          <span className="text-[12px] font-normal tracking-[0.08em] uppercase text-[#C4A882] flex-1">
                            {s.n}
                          </span>
                          <span className="flex items-center gap-[10px]">
                            <span className="text-[12px] font-semibold text-[#F1E194] whitespace-nowrap tracking-[0.05em] uppercase">
                              From PKR {Number(v).toLocaleString()}
                            </span>
                            <span className="w-4 h-4 shrink-0">
                              <ChevronIcon />
                            </span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {activeCat.type === "package" && (
                  <div className="p-3 px-7 pb-7 flex flex-col gap-4">
                    {activeCat.packages?.map((p, idx) => (
                      <div key={idx} className="border border-[#5B0E14]/40 p-[18px] px-5 bg-[#5B0E14]/[0.06]">
                        <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#F1E194] mb-[10px]">
                          {p.t}
                        </div>
                        <div className="flex flex-wrap gap-[5px] mb-[14px]">
                          {p.inc.map((incItem, i) => (
                            <span key={i} className="text-[9px] font-medium tracking-[0.1em] uppercase text-[#C4A882] border border-[#5B0E14]/55 py-[3px] px-[9px]">
                              {incItem}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-col gap-0">
                          {Object.entries(p.pr).map(([k, v]) => (
                            <div key={k} className="flex justify-between items-center py-[6px] border-t border-[#5B0E14]/25">
                              <span className="text-[10px] text-[#C4A882]/60 tracking-[0.1em] uppercase">
                                {PL[k]}
                              </span>
                              <span className="text-[11px] font-semibold text-[#F1E194]">
                                PKR {v.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Modal Note */}
                {activeCat.note && (
                  <div className="text-[10px] italic text-[#C4A882]/50 px-7 pb-5 tracking-[0.05em] border-t border-[#5B0E14]/20 pt-[12px]">
                    {activeCat.note}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    <SocialProof />
    <FAQ />
    <Footer />
    </main>
  );
}
