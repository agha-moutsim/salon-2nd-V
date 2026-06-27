"use client";

import { motion, AnimatePresence } from "motion/react";
import { Category, ServiceTier, PL } from "@/data/services";
import { ChevronIcon, CloseIcon } from "./Icons";

interface CategoryModalProps {
  isOpen: boolean;
  activeCat: Category | null;
  activeTier: ServiceTier;
  setActiveTier: (tier: ServiceTier) => void;
  onClose: () => void;
  onServiceClick: (name: string, price: string, catName: string) => void;
}

export default function CategoryModal({
  isOpen,
  activeCat,
  activeTier,
  setActiveTier,
  onClose,
  onServiceClick,
}: CategoryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && activeCat && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 bg-[#050203]/[0.78] z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
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
                onClick={onClose}
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
                      <div key={idx} onClick={() => !na && onServiceClick(s.n, priceStr, activeCat.title)} className={`flex items-center justify-between py-[14px] border-b border-[#5B0E14]/[0.22] gap-4 last:border-b-0 ${na ? "cursor-default" : "cursor-pointer hover:bg-[#5B0E14]/10 transition-colors px-2"}`}>
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
                      <div key={idx} onClick={() => onServiceClick(s.n, `From PKR ${Number(v).toLocaleString()}`, activeCat.title)} className="flex items-center justify-between py-[14px] border-b border-[#5B0E14]/[0.22] gap-4 cursor-pointer hover:bg-[#5B0E14]/10 transition-colors px-2 last:border-b-0">
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
                    <div key={idx} onClick={() => onServiceClick(p.t, "Custom Package Price", activeCat.title)} className="border border-[#5B0E14]/40 p-[18px] px-5 bg-[#5B0E14]/[0.06] cursor-pointer hover:bg-[#5B0E14]/15 transition-colors">
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
  );
}
