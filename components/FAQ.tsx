"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItemProps {
  num: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ num, question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div
      onClick={onToggle}
      className={`faq-item group relative cursor-pointer overflow-hidden transition-all duration-500 hover:bg-[#F1E194]/[0.02] ${
        isOpen ? "bg-[#F1E194]/[0.04]" : ""
      }`}
    >
      {/* Accent left border glow */}
      <div
        className={`absolute left-0 top-0 w-[3px] bg-gradient-to-b from-[#F1E194] to-[#7A1520] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isOpen ? "h-full" : "h-0 group-hover:h-full"
        }`}
      />

      <div className="flex items-start justify-between gap-5 p-7 sm:gap-6 sm:p-9 sm:pl-11">
        <span className="faq-q-num mt-[4px] shrink-0 font-poppins text-[10px] font-semibold tracking-[0.15em] text-[#C8BC6A] opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:text-[#F1E194]">
          {num}
        </span>
        
        <span
          className={`faq-q-text flex-1 transition-all duration-300 text-[#FAF7EE] group-hover:text-[#F1E194]`}
          style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 400, fontSize: "clamp(20px, 2.2vw, 26px)", letterSpacing: "0.02em", lineHeight: 1.3 }}
        >
          {question}
        </span>

        <span
          className={`faq-toggle mt-[6px] flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-[#F1E194]/20 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isOpen ? "rotate-45 border-[#F1E194] bg-[#F1E194]" : "group-hover:border-[#F1E194]/50"
          }`}
        >
          <svg
            viewBox="0 0 12 12"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            className={`h-[14px] w-[14px] transition-colors duration-300 ${
              isOpen ? "stroke-[#3D0A0E]" : "stroke-[#F1E194]"
            }`}
          >
            <line x1="6" y1="1" x2="6" y2="11" />
            <line x1="1" y1="6" x2="11" y2="6" />
          </svg>
        </span>
      </div>

      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden transform-gpu ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="mx-8 sm:mx-12 border-t border-[#F1E194]/10 pb-9 pt-6">
          <p className="text-[14px] sm:text-[15px] font-light leading-[1.8] text-[#FAF7EE]/70 font-poppins tracking-wide">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      num: "01",
      question: "How far in advance should I book my appointment?",
      answer:
        "We recommend booking at least 1–2 weeks in advance for colour services and 3–5 days for cuts and styling. Peak season and weekends fill up fast — if you have a special occasion, we suggest reaching out a month ahead to secure your ideal time.",
    },
    {
      num: "02",
      question: "What happens if I need to cancel or reschedule?",
      answer:
        "We kindly ask for at least 48 hours notice for cancellations or changes. Cancellations made within 24 hours may incur a 30% service fee. We understand life happens — just give us a call and we'll do our best to accommodate you.",
    },
    {
      num: "03",
      question: "Do you offer consultations before a major colour service?",
      answer:
        "Absolutely. For significant transformations — such as balayage, bleach and tone, or going from dark to light — we offer complimentary 15-minute consultations. We'll assess your hair's current condition, discuss your vision, and create a realistic plan with honest timelines.",
    },
    {
      num: "04",
      question: "Which products do you use and are they safe for sensitive skin?",
      answer:
        "We partner exclusively with premium, professional-grade lines that are free from harsh sulfates and parabens. All colour services use ammonia-free formulas where possible. If you have known sensitivities, please let us know and we'll perform a patch test 48 hours prior to your visit.",
    },
    {
      num: "05",
      question: "How should I prepare my hair before a colour appointment?",
      answer:
        "Come with clean, dry hair — or hair washed 24 hours prior. Avoid heavy styling products and oils before your visit. Wearing a comfortable top that's easy to change into is also helpful. If you're coming for a balayage or lightening service, natural oils on the scalp can actually protect it during the process.",
    },
  ];

  return (
    <section className="relative px-6 py-32 sm:py-40 font-poppins text-[#FAF7EE] overflow-hidden" style={{ background: "linear-gradient(180deg, #0D0102 0%, #150204 35%, #2B0508 75%, #0D0102 100%)" }} aria-label="Frequently Asked Questions">
      {/* Seamless blend layers - Top mask & ambient bleed */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-[250px] bg-gradient-to-b from-[#0D0102] via-[#0D0102]/60 to-transparent z-0" />
      <div className="pointer-events-none absolute -top-[200px] left-1/2 -translate-x-1/2 w-[120vw] max-w-[1500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(241,225,148,0.06)_0%,_rgba(126,27,34,0.15)_45%,_transparent_75%)] blur-[90px] z-0 mix-blend-screen opacity-80" />
      
      {/* Background glow effects */}
      <div className="pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_rgba(122,21,32,0.15)_0%,_transparent_70%)] blur-[100px] z-0" />
      
      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* FAQ Header */}
        <div className="text-center mb-16 relative z-10">
          <span className="inline-block px-[18px] py-[6px] border border-[#F1E194]/25 rounded-full font-poppins text-[11px] font-medium tracking-[0.22em] text-[#C8BC6A] uppercase mb-5">
            Questions &amp; Answers
          </span>
          <h2 className="text-[clamp(42px,6vw,72px)] font-extrabold leading-[1.05] tracking-[-0.01em] text-[#F1E194] mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Everything you<br />
            <em className="not-italic text-[#FAF7EE]">need to know</em>
          </h2>
          <p className="text-[15px] font-light leading-[1.7] text-[#F1E194]/55 max-w-[420px] mx-auto">
            From bookings to aftercare — all your questions answered before you even have to ask.
          </p>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 my-12 max-w-[300px] mx-auto" aria-hidden="true">
          <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent to-[#C8BC6A]" />
          <div className="h-[5px] w-[5px] rounded-full bg-[#C8BC6A]" />
          <div className="h-[5px] w-[5px] rounded-full bg-[#C8BC6A]" />
          <div className="h-[5px] w-[5px] rounded-full bg-[#C8BC6A]" />
          <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent to-[#C8BC6A]" />
        </div>

        {/* FAQ List - Single Column */}
        <div className="flex flex-col border border-[#F1E194]/10 bg-[#120709]/30 backdrop-blur-sm divide-y divide-[#F1E194]/10 max-w-[860px] mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.num}
              num={faq.num}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* FAQ CTA */}
        <div className="text-center mt-20 relative z-10">
          <p className="text-[clamp(20px,3vw,28px)] font-bold italic text-[#FAF7EE]/45 mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Still have questions? We&apos;d love to hear from you.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-[10px] px-9 py-[14px] bg-[#F1E194] text-[#3D0A0E] font-poppins text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:bg-[#FAF5D4] hover:-translate-y-[2px]"
          >
            Get In Touch
            <svg
              viewBox="0 0 14 14"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[14px] h-[14px] stroke-[#3D0A0E] transition-transform duration-300 hover:translate-x-1"
            >
              <line x1="1" y1="7" x2="13" y2="7" />
              <polyline points="7,1 13,7 7,13" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
