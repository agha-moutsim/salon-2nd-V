"use client";

import { motion } from "motion/react";
import { Scissors, Instagram, Send, ArrowRight, ChevronUp, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer relative bg-[#0D0102] overflow-hidden text-[#FAF7EE] font-poppins" id="footer">
      <style dangerouslySetInnerHTML={{ __html: `
        .footer::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 10% 0%, rgba(91,14,20,0.55) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 90% 100%, rgba(91,14,20,0.35) 0%, transparent 55%);
          pointer-events: none;
          z-index: 0;
        }

        .ghost-text {
          position: absolute;
          bottom: -0.12em;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-playfair), serif;
          font-size: clamp(9rem, 22vw, 22rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(241, 225, 148, 0.05);
          white-space: nowrap;
          pointer-events: none;
          z-index: 0;
          user-select: none;
        }

        .scissors-divider {
          position: relative;
          display: flex;
          align-items: center;
          padding: 0 clamp(1.5rem, 5vw, 5rem);
          z-index: 2;
        }

        .scissors-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #F1E194, transparent);
          opacity: 0.7;
        }

        .scissors-icon-container {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          margin: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(241, 225, 148, 0.18);
          border-radius: 50%;
          background: rgba(91, 14, 20, 0.4);
        }

        .footer-body {
          position: relative;
          z-index: 2;
          padding: clamp(3rem, 7vw, 5.5rem) clamp(1.5rem, 5vw, 5rem) clamp(2rem, 4vw, 3.5rem);
          display: grid;
          grid-template-columns: 1.25fr 0.75fr 0.85fr 0.95fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: start;
        }

        .col-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #F1E194;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid rgba(241, 225, 148, 0.18);
        }

        .hours-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.85rem;
          border: 1px solid rgba(241, 225, 148, 0.18);
          border-radius: 999px;
          background: rgba(91, 14, 20, 0.3);
          font-size: 0.75rem;
          color: #F1E194;
          letter-spacing: 0.02em;
          margin-top: 0.5rem;
        }

        .hours-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4cff91;
          box-shadow: 0 0 6px #4cff91;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }

        @media (max-width: 900px) {
          .footer-body {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem 2rem;
          }
          .brand-col { grid-column: 1 / -1; }
        }

        @media (max-width: 580px) {
          .footer-body {
            grid-template-columns: 1fr;
            gap: 2.2rem;
            padding: 2.5rem 1.4rem 2rem;
          }
          .brand-col { grid-column: 1; }
        }
      ` }} />

      {/* Seamless blend layers - Ambient bleed from FAQ section */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-[250px] bg-gradient-to-b from-[#0D0102] via-[#0D0102]/60 to-transparent z-[1]" />
      <div className="pointer-events-none absolute -top-[200px] left-1/2 -translate-x-1/2 w-[120vw] max-w-[1500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(241,225,148,0.06)_0%,_rgba(126,27,34,0.15)_45%,_transparent_75%)] blur-[90px] z-[1] mix-blend-screen opacity-80" />

      {/* Ghost watermark */}
      <div className="ghost-text" aria-hidden="true">
        ZAYN&apos;S
      </div>

      {/* Scissors divider with animations */}
      <div className="scissors-divider">
        <motion.div
          className="scissors-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ originX: 0 }}
        />
        <motion.div
          className="scissors-icon-container"
          initial={{ rotate: -45, scale: 0.5, opacity: 0 }}
          whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.3 }}
        >
          <Scissors className="w-5 h-5 text-[#F1E194] transform -rotate-90" />
        </motion.div>
        <motion.div
          className="scissors-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ originX: 1 }}
        />
      </div>

      {/* Main footer content */}
      <div className="footer-body">
        {/* Brand column */}
        <motion.div
          className="brand-col flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <img src="/logo/logo.png" alt="Zayn's Salon Logo" className="w-40 md:w-48 h-auto -mb-2 pointer-events-none" />
          <div className="flex flex-col gap-1">
            <span className="brand-eyebrow text-[0.6rem] font-semibold tracking-[0.28em] text-[#F1E194] uppercase opacity-85">
              — The Hair Heaven
            </span>
            <div
              className="text-[clamp(2.6rem,5vw,3.8rem)] font-extrabold leading-[0.92] text-[#FAF7EE] tracking-[-0.025em]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Zayn&apos;s<em className="block not-italic text-[#F1E194]">Salon.</em>
            </div>
          </div>
          <p
            className="text-[clamp(0.85rem,1.3vw,1rem)] font-light italic leading-relaxed text-[#FAF7EE]/60 max-w-[22ch] border-l-[1.5px] border-[#F1E194] pl-[0.9rem] -mt-1"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Modern grooming, timeless style — crafted in the heart of Lahore.
          </p>

          <form className="email-form flex items-center border border-[#F1E194]/18 rounded-full overflow-hidden bg-white/5 backdrop-blur-[4px] transition-all focus-within:border-[#F1E194]/45 focus-within:shadow-[0_0_0_3px_rgba(241,225,148,0.07)] max-w-sm mt-1" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email address"
              className="flex-1 bg-transparent border-none outline-none py-3 px-[1.1rem] text-[0.78rem] text-[#FAF7EE] placeholder-[#FAF7EE]/30 tracking-wider"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="shrink-0 w-9 h-9 m-1 rounded-full bg-[#F1E194] flex items-center justify-center transition-all hover:bg-[#FAF5D4] hover:scale-105 active:scale-95"
            >
              <Send className="w-3.5 h-3.5 text-[#0D0102]" />
            </button>
          </form>

          {/* Social Row */}
          <div className="flex gap-3 mt-1">
            <a
              href="https://www.instagram.com/zayns_thehairheaven1?igsh=MWw3NjkzODhiNXo1Mw=="
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-10 h-10 rounded-full border border-[#F1E194]/18 bg-white/5 flex items-center justify-center text-[#FAF7EE]/60 transition-all duration-300 hover:border-[#F1E194] hover:text-[#F1E194] hover:-translate-y-1 overflow-hidden"
              aria-label="Instagram"
            >
              <span className="absolute inset-0 rounded-full bg-[#F1E194]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Instagram className="w-[18px] h-[18px] relative z-10" />
            </a>
            <a
              href="https://www.tiktok.com/@zayns013?_r=1&_t=ZS-97N5aXc0gEx"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-10 h-10 rounded-full border border-[#F1E194]/18 bg-white/5 flex items-center justify-center text-[#FAF7EE]/60 transition-all duration-300 hover:border-[#F1E194] hover:text-[#F1E194] hover:-translate-y-1 overflow-hidden"
              aria-label="TikTok"
            >
              <span className="absolute inset-0 rounded-full bg-[#F1E194]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {/* Custom elegant SVG inline Tiktok since Lucide might not contain it */}
              <svg className="w-[18px] h-[18px] fill-current relative z-10" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.78a4.84 4.84 0 01-1.02-.09z"/>
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Explore Column */}
        <motion.div
          className="flex flex-col gap-[1.2rem]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="col-label">Explore</span>
          <ul className="flex flex-col gap-2.5">
            {[
              { name: "Home", href: "#" },
              { name: "About Us", href: "#" },
              { name: "Gallery", href: "#" },
              { name: "Pricing", href: "#" },
              { name: "Book Now", href: "#" }
            ].map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="group relative inline-flex items-center gap-[0.45rem] text-[clamp(0.82rem,1.1vw,0.92rem)] text-[#FAF7EE]/60 transition-all duration-300 hover:text-[#F1E194] hover:gap-[0.7rem]"
                >
                  {link.name}
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  <span className="absolute bottom-[-1px] left-0 w-0 h-[1px] bg-[#F1E194] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Services Column */}
        <motion.div
          className="flex flex-col gap-[1.2rem]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span className="col-label">Services</span>
          <ul className="flex flex-col gap-2.5">
            {[
              { name: "Haircut & Styling", href: "#" },
              { name: "Hair Coloring", href: "#" },
              { name: "Beard Grooming", href: "#" },
              { name: "Bridal Makeover", href: "#" },
              { name: "Spa & Treatment", href: "#" }
            ].map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="group relative inline-flex items-center gap-[0.45rem] text-[clamp(0.82rem,1.1vw,0.92rem)] text-[#FAF7EE]/60 transition-all duration-300 hover:text-[#F1E194] hover:gap-[0.7rem]"
                >
                  {link.name}
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  <span className="absolute bottom-[-1px] left-0 w-0 h-[1px] bg-[#F1E194] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Visit Us Column */}
        <motion.div
          className="flex flex-col gap-[1.2rem]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <span className="col-label">Visit Us</span>

          <div className="flex flex-col gap-1">
            <span className="text-[0.62rem] font-semibold tracking-[0.18em] text-[#F1E194]/50 uppercase">
              Address
            </span>
            <span className="text-[0.88rem] text-[#FAF7EE]/60 leading-[1.55] flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-[#F1E194] shrink-0 mt-0.5" />
              <span>37A Sector C, Chambeli Block<br />1st Floor, Lahore</span>
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[0.62rem] font-semibold tracking-[0.18em] text-[#F1E194]/50 uppercase">
              Phone
            </span>
            <span className="text-[0.88rem] text-[#FAF7EE]/60 leading-[1.55] flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#F1E194] shrink-0" />
              <a href="tel:+923214894075" className="transition-colors hover:text-[#F1E194]">
                +92 321 4894075
              </a>
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[0.62rem] font-semibold tracking-[0.18em] text-[#F1E194]/50 uppercase">
              Email
            </span>
            <span className="text-[0.88rem] text-[#FAF7EE]/60 leading-[1.55] flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-[#F1E194] shrink-0" />
              <a href="mailto:hello@zayns.com" className="transition-colors hover:text-[#F1E194]">
                hello@zayns.com
              </a>
            </span>
          </div>

          <div className="hours-badge self-start">
            <span className="hours-dot" />
            Open · 11 AM – 11 PM Daily
          </div>
        </motion.div>
      </div>

      {/* Footer bottom bar */}
      <div className="relative z-10 px-[1.5rem] md:px-[5rem] py-[1.2rem] border-t border-[#F1E194]/18 flex flex-wrap justify-between items-center gap-4 text-xs">
        <span className="text-[#FAF7EE]/30 tracking-wider">
          &copy; {currentYear} Zayn&apos;s Salon. All rights reserved.
        </span>
        
        <div className="flex gap-8">
          <a href="#" className="text-[#FAF7EE]/30 tracking-wider hover:text-[#F1E194] transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-[#FAF7EE]/30 tracking-wider hover:text-[#F1E194] transition-colors">
            Terms of Service
          </a>
        </div>

        <a
          href="#footer"
          onClick={handleScrollToTop}
          className="w-[38px] h-[38px] rounded-full border border-[#F1E194]/18 bg-[#5B0E14]/30 flex items-center justify-center text-[#F1E194] transition-all duration-300 hover:bg-[#5B0E14]/70 hover:border-[#F1E194] hover:-translate-y-1"
          aria-label="Back to top"
        >
          <ChevronUp className="w-4 h-4 text-[#F1E194]" />
        </a>
      </div>
    </footer>
  );
}
