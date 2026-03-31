import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MentorshipTiersSection from "../components/MentorshipTiersSection";  
import BookingFlowSection from "../components/BookingFlowSection";
import MentorshipLogisticsSection from "../components/MentorshipLogisticsSection";
import logoSymbol from "../assets/Home/oamorexiste-logo.png";

export default function MentorshipPage() {
  return (
    <div className="relative bg-[#F4F4F4] pt-14 sm:pt-16 lg:pt-18">
      <Header logoSrc={logoSymbol} />

      <main
        style={{ fontFamily: "Inter, sans-serif" }}
        className="bg-[#F4F4F4] text-[#1F1F1F]"
      >
        <MentorshipTiersSection />
        <BookingFlowSection />
        {/*<MentorshipLogisticsSection /> */}

      </main>

      <Footer logoSrc={logoSymbol} />
    </div>
  );
}