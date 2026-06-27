"use client";

import { useState, useEffect } from "react";
import { Category, ServiceTier, CATS, getMinPrice } from "@/data/services";
import { ArrowIcon } from "./Icons";
import CategoryModal from "./CategoryModal";
import ServiceDetailModal from "./ServiceDetailModal";

interface ServicesSectionProps {
  onBookClick: (serviceName: string) => void;
}

export default function ServicesSection({ onBookClick }: ServicesSectionProps) {
  const [activeCat, setActiveCat] = useState<Category | null>(null);
  const [activeTier, setActiveTier] = useState<ServiceTier>("s");
  const [activeServiceDetail, setActiveServiceDetail] = useState<{name: string, price: string, catName: string} | null>(null);

  // Prevent background scrolling when a modal is open
  useEffect(() => {
    if (activeCat || activeServiceDetail) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeCat, activeServiceDetail]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeServiceDetail) {
          setActiveServiceDetail(null);
        } else if (activeCat) {
          setActiveCat(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCat, activeServiceDetail]);

  const openModal = (cat: Category) => {
    setActiveTier("s");
    setActiveCat(cat);
  };

  const handleServiceClick = (name: string, price: string, catName: string) => {
    setActiveServiceDetail({ name, price, catName });
  };

  const handleBookClick = (serviceName: string) => {
    setActiveServiceDetail(null);
    setActiveCat(null);
    onBookClick(serviceName);
  };

  return (
    <>
      <section id="services" className="bg-gradient-to-b from-[#0D0102] via-[#2B0508] to-[#0D0102] text-[#E8D9C0] py-[70px] pb-[90px] relative font-poppins min-h-screen overflow-hidden">
        {/* Ambient Light Bleed from Experience */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-[250px] bg-gradient-to-b from-[#0D0102] via-[#0D0102]/60 to-transparent z-0" style={{ transform: "translateZ(0)" }} />
        <div className="pointer-events-none absolute -top-[200px] left-1/2 -translate-x-1/2 w-[120vw] max-w-[1500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(241,225,148,0.08)_0%,_rgba(126,27,34,0.15)_45%,_transparent_75%)] z-0 opacity-80 blur-3xl transform-gpu" style={{ transform: "translateZ(0)" }} />
        
        <div className="text-center mb-[70px] px-5 relative z-10">
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
      </section>

      <CategoryModal 
        isOpen={!!activeCat && !activeServiceDetail} 
        activeCat={activeCat}
        activeTier={activeTier}
        setActiveTier={setActiveTier}
        onClose={() => setActiveCat(null)}
        onServiceClick={handleServiceClick}
      />

      <ServiceDetailModal 
        isOpen={!!activeServiceDetail}
        activeServiceDetail={activeServiceDetail}
        onClose={() => setActiveServiceDetail(null)}
        onBookClick={handleBookClick}
      />
    </>
  );
}
