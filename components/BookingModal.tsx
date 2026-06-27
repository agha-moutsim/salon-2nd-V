"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function BookingModal({ isOpen, onClose, initialService = "" }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    service: initialService,
    notes: "",
  });

  // Update formData if initialService changes
  useEffect(() => {
    if (initialService) {
      // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  // Prevent scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSmartBooking = () => {
    // Format message for WhatsApp
    const msg = `Hello! I would like to book an appointment.%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Date:* ${formData.date}%0A*Time:* ${formData.time}%0A*Service:* ${formData.service}%0A*Notes:* ${formData.notes}`;
    window.open(`https://wa.me/923214894075?text=${msg}`, "_blank");
  };

  const handleEmailBooking = () => {
    const subject = encodeURIComponent("New Appointment Booking");
    const body = encodeURIComponent(`Hello! I would like to book an appointment.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nDate: ${formData.date}\nTime: ${formData.time}\nService: ${formData.service}\nNotes: ${formData.notes}`);
    window.open(`mailto:info@zaynsalon.com?subject=${subject}&body=${body}`);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050203]/80 backdrop-blur-sm p-4 sm:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ y: 20, scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 20, scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="bg-[#0D0102] border border-[#F1E194]/20 w-full max-w-[600px] max-h-[90vh] flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.8)] font-poppins"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-[#5B0E14]/40 shrink-0 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center border border-[#F1E194]/30 text-[#F1E194] hover:bg-[#F1E194] hover:text-[#0D0102] transition-colors duration-300"
            >
              <svg viewBox="0 0 14 14" className="w-[10px] h-[10px] stroke-current fill-none stroke-2">
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            </button>
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.4em] text-[#F1E194] uppercase mb-2">
              Reserve Your Chair
            </p>
            <h2 
              className="text-[clamp(28px,6vw,42px)] font-light uppercase tracking-wide text-white leading-none"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Book A Chair
            </h2>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#5B0E14]/60">
            
            {/* Location Details */}
            <div className="mb-8">
              <h3 className="text-[#F1E194] text-[18px] sm:text-[22px] font-normal uppercase tracking-widest mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                Zayn&apos;s Salon
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 border-b border-[#5B0E14]/20 pb-4">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[#F1E194] uppercase min-w-[80px] pt-[2px]">Address</span>
                  <span className="text-[13px] text-white font-light tracking-wide">37A sector C chambeli block, 1st floor</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 border-b border-[#5B0E14]/20 pb-4">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[#F1E194] uppercase min-w-[80px] pt-[2px]">Hours</span>
                  <span className="text-[13px] text-white font-light tracking-wide">11:00 am – 11:00 pm</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 border-b border-[#5B0E14]/20 pb-4">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[#F1E194] uppercase min-w-[80px] pt-[2px]">Phone</span>
                  <span className="text-[13px] text-white font-light tracking-wide">+92 321 4894075</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 border-b border-[#5B0E14]/20 pb-4">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[#F1E194] uppercase min-w-[80px] pt-[2px]">Email</span>
                  <span className="text-[13px] text-white font-light tracking-wide">info@zaynsalon.com</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-semibold tracking-[0.2em] text-[#F1E194] uppercase">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-transparent border border-[#5B0E14]/40 text-white text-[13px] p-3 focus:outline-none focus:border-[#F1E194]/60 transition-colors placeholder-[#F1E194]/30 font-light"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-semibold tracking-[0.2em] text-[#F1E194] uppercase">Phone</label>
                  <input 
                    type="text" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="03xx-xxxxxxx"
                    className="bg-transparent border border-[#5B0E14]/40 text-white text-[13px] p-3 focus:outline-none focus:border-[#F1E194]/60 transition-colors placeholder-[#F1E194]/30 font-light"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-semibold tracking-[0.2em] text-[#F1E194] uppercase">Preferred Date</label>
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="bg-transparent border border-[#5B0E14]/40 text-white text-[13px] p-3 focus:outline-none focus:border-[#F1E194]/60 transition-colors font-light [color-scheme:dark]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-semibold tracking-[0.2em] text-[#F1E194] uppercase">Preferred Time</label>
                  <input 
                    type="time" 
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="bg-transparent border border-[#5B0E14]/40 text-white text-[13px] p-3 focus:outline-none focus:border-[#F1E194]/60 transition-colors font-light [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-semibold tracking-[0.2em] text-[#F1E194] uppercase">Service</label>
                <input 
                  type="text" 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  placeholder="e.g. Haircut, Beard trim"
                  className="bg-transparent border border-[#5B0E14]/40 text-white text-[13px] p-3 focus:outline-none focus:border-[#F1E194]/60 transition-colors placeholder-[#F1E194]/30 font-light"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-semibold tracking-[0.2em] text-[#F1E194] uppercase">Notes (Optional)</label>
                <textarea 
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Anything we should know"
                  rows={3}
                  className="bg-transparent border border-[#5B0E14]/40 text-white text-[13px] p-3 focus:outline-none focus:border-[#F1E194]/60 transition-colors placeholder-[#F1E194]/30 font-light resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleSmartBooking}
                className="flex-1 bg-[#F1E194] text-[#0D0102] font-semibold text-[11px] tracking-[0.2em] uppercase py-4 hover:bg-white transition-colors duration-300 flex justify-center items-center gap-2"
              >
                {/* WhatsApp Icon */}
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Smart Booking
              </button>
              <button 
                onClick={handleEmailBooking}
                className="flex-1 border border-[#F1E194]/40 text-[#F1E194] font-semibold text-[11px] tracking-[0.2em] uppercase py-4 hover:bg-[#F1E194]/10 transition-colors duration-300"
              >
                Email Booking
              </button>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-[10px] tracking-[0.2em] text-[#C4A882]/60 uppercase">
                Or call <a href="tel:+923214894075" className="text-[#F1E194] font-semibold hover:underline">+92 321 4894075</a> directly
              </p>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
