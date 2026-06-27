export const ArrowIcon = ({ className = "stroke-[#F1E194]" }: { className?: string }) => (
  <svg viewBox="0 0 12 12" className={`w-3 h-3 fill-none stroke-2 transition-transform duration-300 ${className}`}>
    <line x1="2" y1="10" x2="10" y2="2" strokeLinecap="round" />
    <polyline points="4,2 10,2 10,8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronIcon = () => (
  <svg viewBox="0 0 16 16" className="w-full h-full stroke-[#F1E194]/35 fill-none stroke-[1.5px] shrink-0">
    <polyline points="5,7 8,10 11,7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CloseIcon = () => (
  <svg viewBox="0 0 14 14" className="w-[14px] h-[14px] stroke-[#F1E194] fill-none stroke-2">
    <line x1="1" y1="1" x2="13" y2="13" strokeLinecap="round" />
    <line x1="13" y1="1" x2="1" y2="13" strokeLinecap="round" />
  </svg>
);
