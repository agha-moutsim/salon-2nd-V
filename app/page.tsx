"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ZaynSalonSection from "@/components/ZaynSalonSection";
import ServicesSection from "@/components/ServicesSection";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import ScrollVelocityMarquee from "@/components/ScrollVelocityMarquee";

export default function ServicesPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>("");

  const handleBookClick = (serviceName: string = "") => {
    setSelectedServiceForBooking(serviceName);
    setIsBookingOpen(true);
  };

  return (
    <main>
      <Navbar onBookClick={() => handleBookClick("")} />
      <HeroSection onBookClick={() => handleBookClick("")} />
      
      <div id="experience">
        <ZaynSalonSection />
      </div>

      <ServicesSection onBookClick={handleBookClick} />
      
      <div id="reviews">
        <SocialProof />
      </div>

      <ScrollVelocityMarquee />

      <div id="faq">
        <FAQ />
      </div>
      <div id="contact">
        <Footer />
      </div>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        initialService={selectedServiceForBooking} 
      />
    </main>
  );
}
