"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";

function CountUp({ target, duration = 2000, suffix = "", decimals = 0 }: { target: number, duration?: number, suffix?: string, decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (!isInView) return;
    let start: number;
    let animationFrame: number;

    const tick = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Custom easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(target * eased);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };
    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString()}{suffix}
    </span>
  );
}

function TiltCard({ children, className, delay = 0, initialY = 40 }: { children: React.ReactNode, className?: string, delay?: number, initialY?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    
    e.currentTarget.style.setProperty("--x", `${mouseX}px`);
    e.currentTarget.style.setProperty("--y", `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      className={`sp-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03, y: -6 }}
    >
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d", height: "100%", display: "flex", flexDirection: "column", justifyContent: "inherit" }}>
        {children}
      </div>
    </motion.article>
  );
}

function Magnetic({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 14 });
  const springY = useSpring(y, { stiffness: 120, damping: 14 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

export default function SocialProof() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      phase: number;
    }> = [];

    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      initParticles(rect.width, rect.height);
    };

    const initParticles = (width: number, height: number) => {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 20000), 60);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 2.2 + 1,
          color: i % 3 === 0 ? "241, 225, 148" : "251, 245, 230", // gold and cream
          alpha: Math.random() * 0.4 + 0.2,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const section = canvas.parentElement;
    const handleMouseMove = (e: MouseEvent) => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.active = false;
    };

    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseleave", handleMouseLeave);
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            p.x += (dx / dist) * force * 1.2;
            p.y += (dy / dist) * force * 1.2;
          }
        }

        p.phase += 0.008;
        const currentAlpha = p.alpha + Math.sin(p.phase) * 0.15;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0.1, currentAlpha)})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = `rgba(${p.color}, 0.4)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 110) {
            const alpha = ((110 - dist) / 110) * 0.14;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, `rgba(${p1.color}, ${alpha})`);
            grad.addColorStop(1, `rgba(${p2.color}, ${alpha})`);
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    const pillsRow1 = [
      { img: 5, name: "Hina R.", text: "Best balayage I've ever had." },
      { img: 12, name: "Zara M.", text: "The vibe alone is worth it." },
      { img: 23, name: "Daniel F.", text: "Sharpest beard line, every time." },
      { img: 8, name: "Noor A.", text: "My go-to before every event." },
      { img: 15, name: "Yusuf K.", text: "Consistent quality, zero complaints." },
      { img: 29, name: "Mahnoor S.", text: "Left feeling like a new person." },
    ];
    const pillsRow2 = [
      { img: 44, name: "Fatima T.", text: "They actually listen to what you want." },
      { img: 56, name: "Ali H.", text: "Worth every rupee, every visit." },
      { img: 67, name: "Areeba N.", text: "My curls have never looked better." },
      { img: 21, name: "Bilal S.", text: "Clean, professional, and friendly." },
      { img: 36, name: "Komal Z.", text: "This is luxury without the attitude." },
      { img: 9, name: "Hassan M.", text: "Booked my next appointment immediately." },
    ];

    function buildTrack(elId: string, data: typeof pillsRow1) {
      const el = document.getElementById(elId);
      if (!el) return;
      const html = data
        .map(
          (p) => `
        <div class="pill">
          <img src="https://i.pravatar.cc/100?img=${p.img}" alt="${p.name}">
          <span><strong>${p.name}</strong> — ${p.text}</span>
        </div>`
        )
        .join("");
      el.innerHTML = html + html; 
    }
    buildTrack("track1", pillsRow1);
    buildTrack("track2", pillsRow2);
  }, []);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const scissorRotate = useTransform(scrollYProgress, [0, 1], ["-18deg", "220deg"]);
  const scissorY = useTransform(scrollYProgress, [0, 1], ["0px", "400px"]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root{
          --burgundy: #5B0E14;
          --burgundy-deep: #3A080C;
          --burgundy-light: #7E1B22;
          --gold: #F1E194;
          --gold-soft: #F8EFC9;
          --gold-deep: #C9A227;
          --cream: #FBF5E6;
          --ink: #2A0508;
          --shadow: rgba(43,5,8,0.5);
        }
        
        .social-proof{
          position:relative;
          background:
            radial-gradient(ellipse 80% 60% at 15% 0%, rgba(241,225,148,0.15), transparent 60%),
            radial-gradient(ellipse 70% 50% at 100% 100%, rgba(126,27,34,0.35), transparent 60%),
            linear-gradient(180deg, #0D0102 0%, #2B0508 30%, #5B0E14 60%, #0D0102 100%);
          color:var(--cream);
          overflow:hidden;
          padding:clamp(80px, 11vw, 150px) 0 clamp(80px, 9vw, 120px);
          isolation:isolate;
        }
      
        .social-proof::before{
          content:"";
          position:absolute;
          inset:0;
          background-image:radial-gradient(rgba(255,255,255,0.55) 0.6px, transparent 0.6px);
          background-size:24px 24px;
          opacity:0.04;
          pointer-events:none;
          z-index:0;
        }
      
        .sp-blob{
          position:absolute;
          border-radius:50%;
          filter:blur(60px);
          z-index:0;
          pointer-events:none;
        }
        .sp-blob-1{
          width:clamp(300px,40vw,520px);
          height:clamp(300px,40vw,520px);
          top:-12%;
          right:-8%;
          background:radial-gradient(circle, rgba(241,225,148,0.45), transparent 70%);
          animation:float1 14s ease-in-out infinite alternate;
        }
        .sp-blob-2{
          width:clamp(260px,32vw,420px);
          height:clamp(260px,32vw,420px);
          bottom:-10%;
          left:-10%;
          background:radial-gradient(circle, rgba(241,225,148,0.25), transparent 70%);
          animation:float2 16s ease-in-out infinite alternate;
        }
        @keyframes float1{ from{transform:translate(0,0) scale(1)} to{transform:translate(-40px,40px) scale(1.05)} }
        @keyframes float2{ from{transform:translate(0,0) scale(1)} to{transform:translate(35px,-35px) scale(1.1)} }

        .scissor-mark{
          position:absolute;
          top:8%;
          left:6%;
          width:clamp(20px,2vw,36px);
          opacity:0.25;
          transform:rotate(-18deg);
          z-index:0;
          pointer-events:none;
          filter: drop-shadow(0 0 10px rgba(241,225,148, 0.3));
          animation: floatScissor 10s ease-in-out infinite alternate;
        }
        @keyframes floatScissor {
          from { transform: translateY(0) rotate(-18deg); }
          to { transform: translateY(-20px) rotate(-10deg); }
        }
      
        .sp-container{
          position:relative;
          z-index:1;
          width:100%;
          max-width:1240px;
          margin:0 auto;
          padding:0 clamp(20px,5vw,48px);
        }
      
        .sp-header{
          max-width:760px;
          margin-bottom:clamp(50px,7vw,80px);
        }
      
        .eyebrow{
          display:inline-flex;
          align-items:center;
          gap:8px;
          font-size:13px;
          font-weight:600;
          letter-spacing:0.25em;
          text-transform:uppercase;
          color:var(--gold);
          margin-bottom:20px;
        }
        .eyebrow::before{
          content:"";
          width:6px;height:6px;
          border-radius:50%;
          background:var(--gold);
          box-shadow:0 0 0 4px rgba(241,225,148,0.2);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(241,225,148,0.4); }
          70% { box-shadow: 0 0 0 8px rgba(241,225,148,0); }
          100% { box-shadow: 0 0 0 0 rgba(241,225,148,0); }
        }
      
        .sp-title{
          font-size:clamp(36px, 5.5vw, 64px);
          line-height:1.05;
          font-weight:800;
          letter-spacing:-0.02em;
          margin-bottom:20px;
          text-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .sp-title span{
          color:var(--gold);
          font-style:italic;
          font-weight:600;
        }
      
        .sp-sub{
          font-size:clamp(16px,1.8vw,19px);
          font-weight:300;
          line-height:1.6;
          color:rgba(251,245,230,0.85);
          max-width:500px;
          margin-bottom:32px;
        }
      
        .rating-row{
          display:flex;
          flex-wrap:wrap;
          align-items:center;
          gap:16px;
        }
      
        .rating-pill{
          display:inline-flex;
          align-items:center;
          gap:12px;
          padding:12px 20px 12px 16px;
          border-radius:999px;
          background:rgba(241,225,148,0.08);
          border:1px solid rgba(241,225,148,0.3);
          backdrop-filter:blur(8px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
        .rating-pill:hover {
          background:rgba(241,225,148,0.12);
          border-color: rgba(241,225,148,0.5);
          transform: translateY(-2px);
        }
        .sp-stars{display:flex;gap:3px;}
        .sp-stars svg{width:16px;height:16px;fill:var(--gold);}
        .sp-stars.small svg{width:14px;height:14px;}
        .rating-text{font-size:14px;font-weight:400;color:var(--cream);}
        .rating-text strong{font-weight:700;color:var(--gold);}
      
        .award-chip{
          display:inline-flex;
          align-items:center;
          gap:8px;
          font-size:13px;
          font-weight:500;
          padding:10px 18px;
          border-radius:999px;
          border:1px dashed rgba(241,225,148,0.5);
          color:rgba(251,245,230,0.9);
          transition: all 0.3s ease;
        }
        .award-chip:hover {
          background:rgba(241,225,148,0.05);
          border-style: solid;
        }
      
        @media (min-width: 1024px) {
          .bento{
            display:grid;
            grid-template-columns:repeat(4, 1fr);
            grid-template-rows:auto auto;
            gap:20px;
            grid-template-areas:
              "feature feature stat1 stat2"
              "feature feature stat3 mini";
          }
        }
      
        .sp-card{
          position:relative;
          padding:clamp(28px,3vw,38px);
          border-radius: 20px;
          transform-origin: center;
          will-change: transform, box-shadow;
          overflow: hidden;
          border: 1px solid rgba(241,225,148,0.1);
        }
        
        .sp-card::before {
          content: "";
          position: absolute;
          top: var(--y, 0);
          left: var(--x, 0);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(241,225,148,0.15) 0%, transparent 60%);
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 1;
        }

        .sp-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.5px;
          background: radial-gradient(circle 220px at var(--x, 0px) var(--y, 0px), rgba(241,225,148,0.45) 0%, transparent 65%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 4;
        }
        
        .sp-card:hover::before, .sp-card:hover::after {
          opacity: 1;
        }
      
        .card-feature{
          grid-area:feature;
          background:linear-gradient(145deg, var(--gold-soft), var(--gold) 80%);
          color:var(--burgundy-deep);
          border-radius:36px 16px 36px 16px;
          box-shadow:0 30px 60px -20px var(--shadow);
          display:flex;
          flex-direction:column;
          justify-content:space-between;
          overflow:hidden;
          min-height:340px;
          z-index: 2;
        }
        
        .quote-glyph{
          position:absolute;
          top:-10px;
          left:24px;
          font-size:180px;
          font-weight:800;
          color:var(--burgundy);
          opacity:0.08;
          line-height:1;
          font-family:Georgia,serif;
          pointer-events:none;
        }
        .card-feature .sp-stars svg{fill:var(--burgundy);}
        .feature-quote{
          position:relative;
          font-size:clamp(20px,2.2vw,28px);
          font-weight:600;
          line-height:1.45;
          margin:24px 0 32px;
          max-width:94%;
          letter-spacing: -0.01em;
        }
        .client-row{display:flex;align-items:center;gap:16px;}
        .sp-avatar{
          width:58px;height:58px;
          border-radius:50%;
          object-fit:cover;
          border:3px solid var(--burgundy);
          box-shadow: 0 4px 12px rgba(91, 14, 20, 0.2);
        }
        .sp-avatar.small{width:42px;height:42px;border:2px solid var(--gold);}
        .client-name{font-weight:700;font-size:16px; margin-bottom: 2px;}
        .client-role{font-size:14px;font-weight:500;opacity:0.75;}
      
        .card-stat{
          display:flex;
          flex-direction:column;
          justify-content:center;
          gap:8px;
          min-height:145px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .stat-gold{
          grid-area:stat1;
          background:linear-gradient(135deg, var(--gold), #D4B952);
          color:var(--burgundy-deep);
          box-shadow:0 20px 40px -15px var(--shadow);
        }
        .stat-dark{
          grid-area:stat2;
          background:linear-gradient(160deg, var(--burgundy-light), var(--burgundy-deep));
          color:var(--gold-soft);
          box-shadow:0 20px 40px -15px var(--shadow);
          border: 1px solid rgba(241,225,148,0.1);
        }
        .stat-outline{
          grid-area:stat3;
          background:rgba(251,245,230,0.02);
          border:1.5px solid rgba(241,225,148,0.3);
          color:var(--cream);
          backdrop-filter: blur(10px);
        }
        .stat-num{
          font-size:clamp(34px,4vw,48px);
          font-weight:800;
          letter-spacing:-0.03em;
          line-height: 1;
        }
        .stat-label{
          font-size:14px;
          font-weight:600;
          text-transform:uppercase;
          letter-spacing:0.1em;
          opacity:0.9;
        }
      
        .card-mini{
          grid-area:mini;
          background:rgba(251,245,230,0.04);
          border:1px solid rgba(241,225,148,0.15);
          backdrop-filter:blur(10px);
          display:flex;
          flex-direction:column;
          justify-content:space-between;
          min-height:145px;
        }
        .mini-quote{
          font-size:14px;
          font-weight:400;
          line-height:1.6;
          color:rgba(251,245,230,0.9);
          margin:10px 0 16px;
        }
        .mini-client{display:flex;align-items:center;gap:12px;}
        .mini-name{font-size:14px;font-weight:600;color:var(--cream);}
      
        .marquee-wrap{
          margin-top:clamp(60px,8vw,100px);
          display:flex;
          flex-direction:column;
          gap:24px;
          perspective: 1500px;
          transform-style: preserve-3d;
        }
      
        .marquee{
          position:relative;
          overflow:hidden;
          -webkit-mask-image:linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
          mask-image:linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
          transform: rotateX(15deg) rotateY(-6deg) rotateZ(1deg) translateZ(0);
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          transform-style: preserve-3d;
          will-change: transform;
        }
        .marquee:hover {
          transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateZ(45px);
        }
        .marquee-track{
          display:flex;
          gap:16px;
          width:max-content;
          animation:scrollLeft 45s linear infinite;
        }
        .marquee-track.reverse{
          animation:scrollRight 40s linear infinite;
        }
        .marquee:hover .marquee-track{animation-play-state:paused;}
      
        .pill{
          flex:0 0 auto;
          display:flex;
          align-items:center;
          gap:12px;
          padding:10px 22px 10px 10px;
          border-radius:999px;
          background:rgba(251,245,230,0.05);
          border:1px solid rgba(241,225,148,0.2);
          white-space:nowrap;
          transition: all 0.3s ease;
        }
        .pill:hover {
          background:rgba(251,245,230,0.1);
          border-color:rgba(241,225,148,0.4);
          transform: translateY(-2px);
        }
        .pill img{width:34px;height:34px;border-radius:50%;object-fit:cover;}
        .pill span{font-size:14px;font-weight:400;color:rgba(251,245,230,0.9);}
        .pill strong{font-weight:600;color:var(--gold);}
      
        @media (min-width: 640px) and (max-width: 1024px){
          .bento{
            display: grid;
            grid-template-columns:repeat(2, 1fr);
            grid-template-rows:auto auto auto;
            grid-template-areas:
              "feature feature"
              "stat1 stat2"
              "stat3 mini";
          }
          .card-feature { min-height: 300px; }
        }
      
        @media (max-width: 640px){
          .sp-header{margin-bottom:40px;}
          .sp-title{font-size:clamp(32px,9vw,42px);}
          .sp-sub { margin-bottom: 24px; font-size: 15px; }
      
          .card-feature{ min-height:280px; padding: 24px; }
          .feature-quote { font-size: 18px; margin: 16px 0 20px; }
          
          /* Make stats a clean grid on mobile instead of horizontal scroll for better premium feel */
          .mobile-stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 16px;
          }
          
          .stat-gold { grid-area: auto; min-height: 100px; padding: 14px 12px; }
          .stat-dark { grid-area: auto; min-height: 100px; padding: 14px 12px; }
          .stat-outline { grid-area: auto; grid-column: span 2; min-height: 90px; padding: 14px 12px; }
          .mobile-stats-grid .stat-num { font-size: 26px !important; }
          .mobile-stats-grid .stat-label { font-size: 11px !important; }
          
          .card-mini{ grid-area: auto; padding: 20px; }
          
          .rating-row { gap: 12px; }
          .rating-pill { padding: 10px 16px 10px 12px; }
          .marquee { transform: none !important; }
        }
      ` }} />
      <section ref={containerRef} className="social-proof font-poppins" id="social-proof">
        {/* Seamless blend layers - Top mask & ambient bleed from Services section */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-[250px] bg-gradient-to-b from-[#0D0102] via-[#0D0102]/60 to-transparent z-[2]" />
        <div className="pointer-events-none absolute -top-[200px] left-1/2 -translate-x-1/2 w-[120vw] max-w-[1500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(241,225,148,0.06)_0%,_rgba(126,27,34,0.15)_45%,_transparent_75%)] blur-[90px] z-[2] mix-blend-screen opacity-80" />

        <motion.div className="sp-blob sp-blob-1" style={{ y: blob1Y }}></motion.div>
        <motion.div className="sp-blob sp-blob-2" style={{ y: blob2Y }}></motion.div>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40" />
        
        {/* Floating Sparks */}
        {[
          { id: 1, size: 4, top: "15%", left: "12%", duration: 6, delay: 0 },
          { id: 2, size: 5, top: "28%", left: "85%", duration: 8, delay: 1.2 },
          { id: 3, size: 3, top: "62%", left: "8%", duration: 7, delay: 2.5 },
          { id: 4, size: 6, top: "78%", left: "92%", duration: 9, delay: 0.5 },
          { id: 5, size: 4, top: "42%", left: "55%", duration: 10, delay: 1.8 },
          { id: 6, size: 5, top: "85%", left: "20%", duration: 7.5, delay: 3.1 },
        ].map((spark) => (
          <motion.div
            key={spark.id}
            className="absolute bg-[#F1E194] rounded-full opacity-30 pointer-events-none"
            style={{
              width: spark.size,
              height: spark.size,
              top: spark.top,
              left: spark.left,
              filter: "blur(1px) drop-shadow(0 0 6px #F1E194)",
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: spark.duration,
              delay: spark.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.svg
          className="scissor-mark"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F1E194"
          strokeWidth="1.2"
          style={{ rotate: scissorRotate, y: scissorY }}
        >
          <circle cx="6" cy="6" r="3"></circle>
          <circle cx="6" cy="18" r="3"></circle>
          <line x1="20" y1="4" x2="8.5" y2="14"></line>
          <line x1="8.5" y1="10" x2="20" y2="20"></line>
        </motion.svg>

        <div className="sp-container">
          <motion.header 
            className="sp-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="eyebrow">✦ Wall of Love</span>
            <h1 className="sp-title flex flex-wrap gap-x-[0.25em]">
              {"Trusted by Thousands".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
              <div className="w-full h-0"></div>
              {"of Radiant Clients".split(" ").map((word, i) => (
                <motion.span 
                  key={i}
                  style={i > 0 ? { fontFamily: 'var(--font-playfair)' } : undefined}
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <p className="sp-sub">
              Real transformations, real words — straight from the chairs of our studio to yours.
            </p>

            <div className="rating-row">
              <Magnetic>
                <div className="rating-pill">
                  <div className="sp-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} viewBox="0 0 20 20">
                        <path d="M10 0l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L10 15.2 3.9 18.5l1.5-6.8L.2 7l6.9-.7z" />
                      </svg>
                    ))}
                  </div>
                  <span className="rating-text">
                    <strong>4.9</strong>/5 from 2,300+ reviews
                  </span>
                </div>
              </Magnetic>
              
              <Magnetic>
                <span className="award-chip">🏆 Best Boutique Salon — 2025</span>
              </Magnetic>
            </div>
          </motion.header>

          <div className="bento sm:grid hidden">
            <TiltCard className="card-feature" delay={0.1}>
              <div>
                <span className="quote-glyph">“</span>
                <div className="sp-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20">
                      <path d="M10 0l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L10 15.2 3.9 18.5l1.5-6.8L.2 7l6.9-.7z" />
                    </svg>
                  ))}
                </div>
                <p className="feature-quote">
                  I walked in for a trim and walked out feeling like an entirely new person. The team listened, took their time, and the result was better than anything I pictured. This is the only chair I trust now.
                </p>
              </div>
              <div className="client-row">
                <img
                  className="sp-avatar"
                  src="https://i.pravatar.cc/150?img=47"
                  alt="Amara K. portrait"
                />
                <div>
                  <p className="client-name">Amara Khan</p>
                  <p className="client-role">Bridal Makeover Client</p>
                </div>
              </div>
            </TiltCard>

            <TiltCard className="card-stat stat-gold" delay={0.2} initialY={30}>
              <p className="stat-num">
                <CountUp target={12400} suffix="+" />
              </p>
              <p className="stat-label">Happy Clients</p>
            </TiltCard>

            <TiltCard className="card-stat stat-dark" delay={0.3} initialY={30}>
              <p className="stat-num">
                <CountUp target={4.9} decimals={1} />
              </p>
              <p className="stat-label">Average Rating</p>
            </TiltCard>

            <TiltCard className="card-stat stat-outline" delay={0.4} initialY={30}>
              <p className="stat-num">
                <CountUp target={15} suffix="+" />
              </p>
              <p className="stat-label">Years of Excellence</p>
            </TiltCard>

            <TiltCard className="card-mini" delay={0.5} initialY={30}>
              <div>
                <div className="sp-stars small">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20">
                      <path d="M10 0l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L10 15.2 3.9 18.5l1.5-6.8L.2 7l6.9-.7z" />
                    </svg>
                  ))}
                </div>
                <p className="mini-quote">
                  &ldquo;Booked last minute and they still made me feel like a priority. Obsessed with my color.&rdquo;
                </p>
              </div>
              <div className="mini-client">
                <img
                  className="sp-avatar small"
                  src="https://i.pravatar.cc/150?img=32"
                  alt="Sara A. portrait"
                />
                <p className="mini-name">Sara Ali</p>
              </div>
            </TiltCard>
          </div>
          
          {/* Mobile Layout */}
          <div className="sm:hidden block">
            <motion.article 
              className="sp-card card-feature mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(43,5,8,0.7)" }}
            >
              <div>
                <span className="quote-glyph">“</span>
                <div className="sp-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20">
                      <path d="M10 0l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L10 15.2 3.9 18.5l1.5-6.8L.2 7l6.9-.7z" />
                    </svg>
                  ))}
                </div>
                <p className="feature-quote">
                  I walked in for a trim and walked out feeling like an entirely new person. The team listened, took their time, and the result was better than anything I pictured.
                </p>
              </div>
              <div className="client-row">
                <img
                  className="sp-avatar"
                  src="https://i.pravatar.cc/150?img=47"
                  alt="Amara K. portrait"
                />
                <div>
                  <p className="client-name">Amara Khan</p>
                  <p className="client-role">Bridal Makeover Client</p>
                </div>
              </div>
            </motion.article>

            <motion.div 
              className="mobile-stats-grid"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <motion.div className="sp-card card-stat stat-gold" whileHover={{ scale: 1.03 }}>
                <p className="stat-num"><CountUp target={12400} suffix="+" /></p>
                <p className="stat-label">Clients</p>
              </motion.div>
              <motion.div className="sp-card card-stat stat-dark" whileHover={{ scale: 1.03 }}>
                <p className="stat-num"><CountUp target={4.9} decimals={1} /></p>
                <p className="stat-label">Rating</p>
              </motion.div>
              <motion.div className="sp-card card-stat stat-outline" whileHover={{ scale: 1.03 }}>
                <p className="stat-num"><CountUp target={15} suffix="+" /></p>
                <p className="stat-label">Years of Excellence</p>
              </motion.div>
            </motion.div>

            <motion.article 
              className="sp-card card-mini"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <div className="sp-stars small">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20">
                      <path d="M10 0l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L10 15.2 3.9 18.5l1.5-6.8L.2 7l6.9-.7z" />
                    </svg>
                  ))}
                </div>
                <p className="mini-quote">
                  &ldquo;Booked last minute and they still made me feel like a priority. Obsessed with my color.&rdquo;
                </p>
              </div>
              <div className="mini-client">
                <img
                  className="sp-avatar small"
                  src="https://i.pravatar.cc/150?img=32"
                  alt="Sara A. portrait"
                />
                <p className="mini-name">Sara Ali</p>
              </div>
            </motion.article>
          </div>

          <motion.div 
            className="marquee-wrap"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="marquee">
              <div className="marquee-track" id="track1"></div>
            </div>
            <div className="marquee">
              <div className="marquee-track reverse" id="track2"></div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
