"use client";

import { motion, AnimatePresence } from "motion/react";
import { CloseIcon } from "./Icons";

interface ServiceDetailModalProps {
  isOpen: boolean;
  activeServiceDetail: { name: string; price: string; catName: string } | null;
  onClose: () => void;
  onBookClick: (serviceName: string) => void;
}

export default function ServiceDetailModal({
  isOpen,
  activeServiceDetail,
  onClose,
  onBookClick,
}: ServiceDetailModalProps) {
  return (
    <AnimatePresence>
      {isOpen && activeServiceDetail && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-[#050203]/90 z-[70] flex items-center justify-center p-4 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ y: 20, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="bg-[#0D0102] border border-[#F1E194]/20 w-full max-w-[340px] sm:max-w-[500px] flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.8)] font-poppins"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-[#F1E194]/30 text-[#F1E194] hover:bg-[#F1E194] hover:text-[#0D0102] transition-colors duration-300 z-10"
            >
              <CloseIcon />
            </button>
            
            <div className="p-6 sm:p-10 border-b border-[#5B0E14]/30">
              <p className="text-[9px] sm:text-[11px] font-semibold tracking-[0.4em] text-[#F1E194] uppercase mb-[10px] sm:mb-[14px]">
                {activeServiceDetail.catName}
              </p>
              <h3 className="text-[20px] sm:text-[clamp(24px,5vw,36px)] font-light uppercase tracking-wide text-white leading-none pr-6 sm:pr-0" style={{ fontFamily: 'var(--font-playfair)' }}>
                {activeServiceDetail.name}
              </h3>
            </div>

            <div className="p-6 sm:p-10">
              <div className="text-[28px] sm:text-[clamp(32px,6vw,44px)] font-light text-[#F1E194] uppercase tracking-wide leading-none mb-2 sm:mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                {activeServiceDetail.price.replace("From ", "")}
              </div>
              <div className="text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] text-[#F1E194] uppercase mb-6 sm:mb-10">
                {activeServiceDetail.price.includes("From") || activeServiceDetail.price.includes("Package") ? "STARTING PRICE" : "SINGLE PRICE"}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button 
                  onClick={() => {
                    onBookClick(activeServiceDetail.name);
                  }}
                  className="flex-1 bg-[#F1E194] text-[#0D0102] font-semibold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase py-3 sm:py-[18px] px-4 hover:bg-white transition-colors duration-300 text-center"
                >
                  Book This Service
                </button>
                <button 
                  onClick={onClose}
                  className="flex-1 border border-[#F1E194]/40 text-[#F1E194] font-semibold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase py-3 sm:py-[18px] px-4 hover:bg-[#F1E194]/10 transition-colors duration-300 text-center"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
