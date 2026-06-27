"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Experience", href: "#experience" },
  { name: "Services", href: "#services" },
  { name: "Reviews", href: "#reviews" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ onBookClick }: { onBookClick?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <>
      {/* ─── Fixed Header ─── */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 flex justify-between items-center px-6 md:px-14 py-3 md:py-4 ${
          scrolled
            ? "bg-[#0D0102]/85 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.6)] border-b border-[#5B0E14]/30"
            : "bg-transparent"
        }`}
      >
        {/* Logo – left */}
        <a href="#home" onClick={(e) => handleSmoothScroll(e, "#home")} className="flex items-center shrink-0">
          <img
            src="/logo/logo.png"
            alt="Zayn's Salon"
            className="h-14 md:h-20 w-auto object-contain drop-shadow-lg"
          />
        </a>

        {/* Desktop nav links – centre */}
        <nav className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="relative inline-block text-[13px] font-bold tracking-[0.2em] uppercase text-[#F1E194] transition-all duration-400 group overflow-hidden"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {/* Visible text that slides up on hover */}
              <span className="relative block transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                {link.name}
              </span>
              {/* Hidden duplicate that slides up into view on hover — creates the rolling reveal */}
              <span
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] text-white"
                aria-hidden
              >
                {link.name}
              </span>
              {/* gold glow underline */}
              <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#F1E194] to-transparent origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA – right */}
        <div className="hidden md:flex items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (onBookClick) onBookClick();
            }}
            className="relative overflow-hidden group inline-flex items-center gap-2 border border-[#F1E194]/60 text-[#F1E194] text-[10px] font-semibold tracking-[0.25em] uppercase px-6 py-2.5 transition-colors duration-300 hover:text-[#0D0102]"
          >
            {/* fill sweep on hover */}
            <span className="absolute inset-0 bg-[#F1E194] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            <span className="relative z-10">Book Now</span>
            {/* animated arrow */}
            <svg
              className="relative z-10 w-3 h-3 stroke-current fill-none stroke-2 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 12 12"
            >
              <line x1="2" y1="10" x2="10" y2="2" strokeLinecap="round" />
              <polyline points="4,2 10,2 10,8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Mobile hamburger – only on small screens */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-[#F1E194] p-2 group"
          aria-label="Open Menu"
        >
          <Menu size={30} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
        </button>
      </header>

      {/* ─── Mobile Full-Screen Overlay ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-gradient-to-b from-[#0D0102] via-[#2B0508] to-[#0D0102] flex flex-col items-center justify-center md:hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-[#F1E194] hover:text-white transition-colors duration-300 p-2 group"
              aria-label="Close Menu"
            >
              <X size={38} strokeWidth={1.5} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Logo inside mobile menu */}
            <img src="/logo/logo.png" alt="Zayn's Salon" className="h-20 w-auto mb-8 opacity-90" />

            <nav className="flex flex-col items-center gap-5">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-[clamp(28px,7vw,42px)] font-bold tracking-[0.1em] uppercase text-white hover:text-[#F1E194] transition-colors duration-300 relative group"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#F1E194] scale-x-0 origin-center group-hover:scale-x-100 transition-transform duration-500" />
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Mobile CTA */}
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                if (onBookClick) onBookClick();
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="mt-10 border border-[#F1E194]/60 text-[#F1E194] text-[10px] font-semibold tracking-[0.25em] uppercase px-8 py-3"
            >
              Book Now
            </motion.button>


          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
